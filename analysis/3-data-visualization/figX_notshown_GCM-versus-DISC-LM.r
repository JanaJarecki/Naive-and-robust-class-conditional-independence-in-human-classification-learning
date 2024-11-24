###############################################################################
# Data visualizatio code
# Not shown in paper
# Produces: fitting comparison of single-feature GCM model and DISC-LM model
# Author: Jana B. Jarecki
# Publication (plot not in publication!): Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################

rm(list=ls())
library(data.table); library(ggplot2); library(gridExtra)
dyn.load("machine-learning-models/GCM/gcm.dll")
source("machine-learning-models/GCM/gcm.r")
source("helper-functions/ffit.r")
ddir = "../data" #where the data is stored

plots <- list()

# GCM model predictions
for(which in 1:2) {
	dh <- fread(file.path(ddir,paste0("study",which,"_data.csv")), select=c("i","t","e","ch")) #human data
	setkey(dh,i)
	dh = dh[dh[, .I[t<=max(t)-200], by=c("i")]$V1] # remove last 200 trials
	dh[, f1 := as.numeric(substr(e,1,1))]
	dh[, f2 := as.numeric(substr(e,2,2))]
	dh[, f3 := as.numeric(substr(e,3,3))]
	dh[, cl := ifelse(substr(e,4,4) == "A", 1, 0)]
	dh[, ch := ifelse(ch=="A",1,0)]
	dh [, i := as.numeric(i)]
	nrep <- dh[, .N, by=i]$N
	setkey(dh,i,t)

	# Predict full gcm model
	dh[, gcm_w1 := predict(gcm(formula = cl ~ f1 + f2 + f3,
		response.formula = ch ~ .,
		data = data.frame(cbind(cl,f1,f2,f3,ch)),
		parms = list(w=c(1,0,0), lambda = 1, r = 1, q = 1, gamma = 1),
		fixed = list(w = TRUE, r = TRUE, q = TRUE, gamma = TRUE, bias = TRUE, lambda = FALSE),
		ntimes = .N,
		discount = ifelse(.N<=5, 0, 5)
		)), by=i]
	dh[, gcm_w2 := predict(gcm(formula = cl ~ f1 + f2 + f3,
		response.formula = ch ~ .,
		data = data.frame(cbind(cl,f1,f2,f3,ch)),
		parms = list(w=c(0,1,0), lambda = 1, r = 1, q = 1, gamma = 1),
		fixed = list(w = TRUE, r = TRUE, q = TRUE, gamma = TRUE, bias = TRUE, lambda = FALSE),
		ntimes = .N,
		discount = ifelse(.N<=5, 0, 5)
		)), by=i]
	dh[, gcm_w3 := predict(gcm(formula = cl ~ f1 + f2 + f3,
		response.formula = ch ~ .,
		data = data.frame(cbind(cl,f1,f2,f3,ch)),
		parms = list(w=c(0,0,1), lambda = 1, r = 1, q = 1, gamma = 1),
		fixed = list(w = TRUE, r = TRUE, q = TRUE, gamma = TRUE, bias = TRUE, lambda = FALSE),
		ntimes = .N,
		discount = ifelse(.N<=5, 0, 5)
		)), by=i]

	dm_gcm = dh[t>1, list(mse_gcm_w1 = ffit(ch, gcm_w1, "MSE", k=2),
					   mse_gcm_w2 = ffit(ch, gcm_w2, "MSE", k=2),
					   mse_gcm_w3 = ffit(ch, gcm_w3, "MSE", k=2)), by=i]
	dm_gcm[,  mse_gcm := base::max(.SD), by=i]


	# DISC-LM
	if (exists("d")) rm(d)
	# Load data
	dm = fread(file.path(ddir,paste0("study",which,"_simulation.csv")))
	dh = fread(file.path(ddir,paste0("study",which,"_data.csv"))) #human data

	# Remove last 200 trials and first trial
	setkey(dm,i)
	dm = dm[dm[, .I[t<=max(t)-200], by=c("i")]$V1][t>1]
	setkey(dh,i)
	dh = dh[dh[, .I[t<=max(t)-200], by=c("i")]$V1][t>1]
	# Genrate numerical choices
	dm[, ch := ifelse(p_c1>.5,1,0)]
	dh[, ch := ifelse(ch=="A",1,0)]
	dh[, i := as.numeric(i)]
	# Rename choice columns 'ch'
	setnames(dh,"ch","chHum")
	setnames(dm,"ch","chMod")
	# Combine
	setkey(dm,i,t,e)
	setkey(dh,i,t,e)
	d = dm[dh]
	rm(dh,dm)

	# Check for which priors the models make differing predictions
	d[t<=100, as.character(all.equal(d[t<=100 & prior==0, p_c1],p_c1,tolerance=0.01)), keyby=prior]
	priors = c(0, d[t<=100, all.equal(d[t<=100 & prior==0, p_c1],p_c1,tolerance=0.01)!=TRUE, keyby=prior][, prior[V1==T]])
	d[t<=100, as.character(all.equal(d[t<=100 & delta==1, p_c1],p_c1,tolerance=0.01)), keyby=delta]
	deltas = c(1, d[t<=100, all.equal(d[t<=100 & delta==1, p_c1],p_c1,tolerance=0.01)!=TRUE, keyby=delta][, delta[V1==T]])

	# Calculate best combination of delta and prior
	setkey(d,t,i,prior,delta)
	# Round prediction to four digits
	d[, p_c1_4 := round(p_c1,4)]

	# Fit values for full dataset
	df = d[prior %in% priors & delta %in% deltas][, list(
	        mse_disclm = ffit(chHum, p_c1_4, "MSE", k=2)
	        ),  by=c("i","prior","delta")]
	 # Get maximum fit prior (in case of ties we get duplicate values)
	setkey(df,i,prior,delta)
	df[, rank := rank(mse_disclm, ties.method="max"), by=i]      # rank the mse
	max.rank = df[, max(rank)]         # max(rank)
	dm_disclm = df[rank==max.rank]            # prior, delra, mse, and acc values

	# In case of ties, select the smallest prior value (which speaks against our hypothesis) 
	if(dm_disclm[, sum(duplicated(i))] > 0)
	    dm_disclm = dm_disclm[, .SD[prior==min(prior)], by=i]
	dm_disclm[, c("prior","delta")]



	setkey(dm_disclm,i)
	setkey(dm_gcm,i)
	dm <- dm_gcm[dm_disclm]
	iorder <- dm[order(-abs(mse_gcm-mse_disclm)), i]

	dm <- melt(dm, id.var="i", measure.var=c("mse_disclm","mse_gcm"), variable.name="Model", value.name="Fit")
	dm[, Model := factor(gsub("mse_","",Model), levels=c("gcm","disclm"), labels=c("Single feature GCM","DISC-LM"))]
	setkey(dm,i)
	dm <- dm[dm_disclm[, prior, by=i]]
	dm[Model=="Single feature GCM", prior := NA]
	dm[, i_f := factor(i, levels=iorder)]



	plots[[which]] <- ggplot(dm, aes(x=i_f,y=Fit)) +geom_point(aes(colour=Model)) +geom_line(aes(colour=Model,group=Model),stat="identity",size=.05) +scale_colour_grey() +xlab("Participants") +scale_y_continuous("Fit (1-MSE)", limits=c(0,1), expand=c(0,0.01)) +theme(axis.text.x = element_blank()) +ggtitle(paste("Experiment ",which)) +theme(legend.position = c(.2,.1))
	

	# Print t-test of fit
	tst <- t.test(dm_gcm$mse_gcm, dm_disclm$mse_disclm)
	# print(format.test(statistic = tst))

	n <- sum(dm_gcm$mse_gcm < dm_disclm$mse_disclm)
	cat(n, " of ", length(dm_gcm$mse_gcm))
}

plots[[1]] + plots[[2]] + plot_layout(guides = "collect")