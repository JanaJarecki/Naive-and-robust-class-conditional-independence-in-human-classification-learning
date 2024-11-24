require(data.table)

gcm <- function(formula, response.formula, data, fixed, parms, ntimes, discount = 0, tolerance = 1e-16, iterations = 3000) {

	# Default values
	nv <- length(all.vars(formula)) - 1
	if (missing(parms))
		parms <- list(w=rep(1L/nv,nv), r=1, q=1, lambda=1, gamma=1, bias=.5)
	if(is.null(parms$w))
		parms$w <- rep(1L/nv,nv)
	if (missing(fixed))
		fixed <- list(w=FALSE, r=TRUE, q=TRUE, lambda=FALSE, gamma=TRUE, bias=TRUE)
	if (all(fixed == "all"))
		fixed <- list(w=TRUE, r=TRUE, q=TRUE, lambda=TRUE, gamma=TRUE, bias=TRUE)
	if (missing(ntimes))
		ntimes <- makeNtimes(data = data)
	if (missing(response.formula))
		response.formula <- missingResponseVariable ~ 1


	# To avoid errors: otherwise formula searches in global env after not finding variables in data
	environment(formula) <- parent.env(globalenv())
	environment(response.formula) <- parent.env(globalenv())

	y  <- t(cbind(1-unlist(get_all_vars(formula[-3],data),use.names=F),unlist(get_all_vars(formula[-3],data),use.names=F)))
	ny <- nrow(y)
	x  <- t(get_all_vars(formula[-2],data))
	nx <- nrow(x)
	nt <- ncol(x)
	bt <- c(1, cumsum(head(ntimes,-1)) + 1)
	et <- cumsum(ntimes)
	lt <- length(ntimes)
	py <- matrix(0.0, ncol=nt,nrow=ny)
	sim  <- vector("double",length=ny)
	dist <- vector("double",length=nt)
	w <- parms$w
	r <- parms$r
	q <- parms$q
	lambda <- parms$lambda
	gamma <- parms$gamma
	bias <- parms$bias

	ydat <- getResponse(response.formula, data)

	if(inherits(ydat, "try-error")) {
		ydat <- NULL
	} else {
		ydat <- as.integer(unlist(ydat))
	}

	obj <- list(
		ydat=ydat,
		y=y,
		x=x,
		r=r,
		nx=nx,
		ny=ny,
		w=w,
		r=r,
		q=q,
		lambda=lambda,
		gamma=gamma,
		bias=bias,
		fixed=fixed,
		bt=bt,
		et=et,
		lt=lt,
		discount=discount,
		call=formula,
		ntimes=ntimes
		)
	class(obj) <- c(class(obj), "gcm")

	freeParm <- unlist(getFreeParm(obj))
	npar <- length(freeParm)

	if (npar == 0) {
		if(length(ydat) > 0) obj$logLik <- - loglik(obj = obj)
		return(obj)
	} else if (npar == 1) {
		tmp <- optim(par = freeParm, fn = loglik, gr = NULL, obj = obj, lower = 0, upper = 10, method = "L-BFGS-B")
			#, control = list(factr=1e-15, maxit=1000))
	} else if (npar > 1) {
		ui <- diag(npar)
		ci <- rep(0L, npar) # ensure that each parameter > 0
		tmp <- constrOptim(theta = freeParm, f = loglik, grad = NULL, ui = ui, ci = ci, obj = obj, method = "Nelder-Mead", control = list(reltol = tolerance, maxit = iterations))
	} else {
		tmp <- obj
		tmp$value <- - loglik(parms = parms, obj = obj)
	}

	obj <- setFreeParm(obj, tmp$par)
	obj$logLik <- - tmp$value

	obj
}


getResponse <- function(response.formula, data) {
	ydat <- tryCatch(expr = as.integer(unlist(get_all_vars(response.formula[-3], data))),
					 error = function(e) {
						message(paste0("Warning (getResponse): Data does not contain response variable, ", all.vars(response.formula)[1],". Are you simulating data?\n"))
						return(NULL)
					}
				)
	return(ydat)
}

setFreeParm <- function(obj, freeParms) {
	fixed <- obj$fixed
	freeID <- names(fixed[fixed==FALSE])
	freeParms <- sapply(freeID, function(x) freeParms[grepl(x, names(freeParms))], simplify=F)
	for (i in freeID) obj[i] <- freeParms[i]
	if ("w" %in% freeID & sum(obj$w != 1)) obj$w <- obj$w /sum(obj$w)
	obj
}

getFreeParm <- function(obj) {
	fixed <- obj$fixed
	freeID <- names(fixed[fixed==FALSE])
	out <- sapply(freeID, function(x) obj[[x]], simplify=FALSE)
	out	
}

loglik <- function(parms, obj) {
	if (!missing(parms)) obj <- setFreeParm(obj = obj, freeParms = parms)

	ydat <- obj$ydat
	y  <- obj$y
	ny <- nrow(y)
	x  <- obj$x
	nx <- nrow(x)
	nt <- ncol(x)
	bt <- obj$bt
	et <- obj$et
	lt <- obj$lt
	w  <- obj$w
	r  <- obj$r
	q  <- obj$q
	lambda <- obj$lambda
	gamma <- obj$gamma
	bias <- obj$bias
	py <- matrix(0.0,ncol=nt,nrow=ny)
	sim <- vector("double",length=ny)
	dist <- vector("double",length=nt)
	discount <- obj$discount

	if(lambda > 10) return(0) # constraint on lambda

	tmp <- .C("gcm_nominal",
		y=as.integer(y), 
		ny=as.integer(ny), 
		x=as.double(x), 
		nx=as.integer(nx), 
		bt=as.integer(bt),
		et=as.integer(et),
		lt=as.integer(lt), 
		w=as.double(w), 
		r=as.double(r), 
		q=as.double(q), 
		lambda=as.double(lambda), 
		gamma=as.double(gamma), 
		dist=as.double(dist), 
		sim=as.double(sim), 
		ypred=as.double(py)
	)

	ypred <- t(matrix(tmp$ypred,nrow=ny))[,2]
	eps <- 1e-16
	ypred <- ifelse(ypred==0, eps, ifelse(ypred==1, 1-eps, ypred))

	discount <- c(sapply(bt, function(x) x:(x+(discount-1))))

	ypred <- ypred[-discount]
	ydat <- ydat[-discount]

	ll <- - sum(dbinom(x = ydat, size = 1, p = ypred, log = TRUE))
	ll
}

predict.gcm <- function(obj, newdata, ntimes) {
	# Fixed parameters
	w  		<- obj$w
	r  		<- obj$r
	q  		<- obj$q
	lambda 	<- obj$lambda
	gamma 	<- obj$gamma
	bias 	<- obj$bias

	
	if (missing(newdata)) { # No new data
		y  <- obj$y
		ny <- nrow(y)
		x  <- obj$x
		nx <- nrow(x)
		nt <- ncol(x)
		bt <- obj$bt
		et <- obj$et
		lt <- obj$lt
		py <- matrix(0.0,ncol=nt,nrow=ny)
		sim <- vector("double",length=ny)
		dist <- vector("double",length=nt)
		ntimes <- obj$ntimes
	} else {	# With new data
		formula <- obj$call
		y  <- cbind(obj$y,
					t(cbind(1-unlist(get_all_vars(formula[-3],newdata),use.names=F),unlist(get_all_vars(formula[-3],newdata),use.names=F))))
		ny <- nrow(y)
		x  <- cbind(obj$x,
					t(get_all_vars(formula[-2],newdata)))
		nx <- nrow(x)
		nt <- ncol(x)
		ntimes <- obj$ntimes + makeNtimes(newdata,obj)
		bt <- c(1, cumsum(head(ntimes,-1)) + 1)
		et <- cumsum(ntimes)
		lt <- length(ntimes)
		py <- matrix(0.0,ncol=nt,nrow=ny)
		sim <- vector("double",length=ny)
		dist <- vector("double",length=nt)

		if(is.na(unlist(get_all_vars(formula[-3],tail(newdata, 1))))) { #last class NA?
			y[is.na(y)] <- -999
		}
	}

	tmp <- .C("gcm_nominal",
		y=as.integer(y), 
		ny=as.integer(ny), 
		x=as.double(x), 
		nx=as.integer(nx), 
		bt=as.integer(bt),
		et=as.integer(et),
		lt=as.integer(lt), 
		w=as.double(w), 
		r=as.double(r), 
		q=as.double(q), 
		lambda=as.double(lambda), 
		gamma=as.double(gamma), 
		dist=as.double(dist), 
		sim=as.double(sim), 
		ypred=as.double(py)
	)

	ypred <- t(matrix(tmp$ypred,nrow=ny))[,2]

	if (missing(newdata)) {
		return(ypred)
	} else {
		return(tail(ypred, nrow(newdata)))
	}
}

Constraints.gcm <- function(free) {
	if (!is.list(free)) stop("argument free needs to be a list.")

	nw <- length(free[["w"]])
	nb <- length(free[["bias"]])
	ns <- length(free[["lambda"]])
	nd <- length(free[["gamma"]])
	nn <- nw + nb + ns + nd
	ci <- NULL
	ui <- NULL
	

	if (nw > 0) {
		ui <- cbind( rbind(diag(nw), -diag(nw), rep(1L,each=nw), rep(-1L,each=nw)),
				     matrix(0L, 2*nw+2, nn-nw)
				)
		ci <- c(rep(c(0L,-1L), each=nw), 1L, -1L)
	}
	if (nb > 0) {
		ui <- rbind(ui,
				cbind( matrix(0L, 2*nb+1, nw), 
			   		   rbind(diag(nb), -diag(nb), rep(1L,each=nb), rep(-1L,each=nb)),
			   	       matrix(0L, 2*nb+2, nn-nw-nb))
			   	)
		ci <- c(ci, rep(c(0L,-1L), each=nb), 0L, -1L)
	}
	if (nd > 0) {
		ui <- rbind(ui,
				cbind( matrix(0L, 2, nw+nb), 
			   		   c(1L,-1L))
			   	)
		ci <- c(ci, 0L, -10L)
	}
	if (ns > 0) {
		ui <- rbind(ui,
				cbind( matrix(0L, 2, nw+nb+nd), 
			   		   c(1L,-1L))
			   	)
		ci <- c(ci, 0L, -10L)
	}

	ci <- ci - 1e-8
	
	list(ui=ui,ci=ci)
}

nobs.gcm <- function(obj) {
	obj$ntimes
}

BIC.gcm <- function(obj) {
	npar <- length(getFreeParm(obj)) + length(getFreeParm(obj)$w) - 2
	nobs <- nobs(obj)
	ll <- as.numeric(logLik(obj))
	bic <- - 2 * ll + npar * log(nobs)
	class(bic) <- NULL
	bic
}

logLik.gcm <- function(obj) {
	ll   <- obj$logLik
	npar <- length(getFreeParm(obj)) + length(getFreeParm(obj)$w) - 2
	attributes(ll) <- list(df = npar)
	class(ll) <- "logLik"
	ll
}

makeNtimes <- function(data, obj) {
	if (missing(obj)) ntimes <- nrow(data)

	if (!missing(obj)) {
		nt <- nrow(data)
		lt <- obj$lt

		if (nt %% lt == 0) {
			ntimes <- rep(nt/lt, lt)
		} else {
			stop("Number of data rows is not a multiple of the number of individuals (obj$lt) in the gcm object, and ntimes is not specified.")	
		}
	}
	return(ntimes)
}

print.gcm <-function(obj) {
	cat("\n")

	cat("Call:")
	call <- obj$call ; 	attributes(call) <- NULL
	print(call)
	cat("\n")

	parm <- getFreeParm(obj) ; 	names(parm) <- NULL ; 	parm <- unlist(parm)
	cat("Fitted parameter(s):")
	cat("\n")

	if(!is.null(parm)) print(round(parm, digits = 3)) else cat(" none")
	cat("\n")

	if(!is.null(parm)) print(logLik(obj)) else NULL
}