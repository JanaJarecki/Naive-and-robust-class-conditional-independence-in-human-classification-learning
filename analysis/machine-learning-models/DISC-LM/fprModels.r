# Function to calculate P(Model|experience)

library("MCMCpack")
source("flikMLcci.r")

fprModels <-function(n_r, n_joints.c, n_c, p_cci, delta){ 
   # n_r :=          number of MC runs                     [integer]
   # n_joints.c :=   count of joint stimuli given class    [vector of 16 integers]
   # n_c :=          count of classes                      [vector of 2 integers]
   # p_cci :=        parameter P(CCI)                      [scalar in 0-1]
   # delta :=        parameter conservativism              [integer]
   if(n_r <= 2)
      stop("Number of n_r must be at least 3")
   if(length(n_c) %% 2 != 0)
      stop("Class count vector must be divisible by 2")
   if(length(n_joints.c) %% 2 != 0)
      stop("Length of feature count vector must be divisible by 2 (first half is given class 1, second half is given class 2)")
   
   # 1. Draw the proabbilities, P(class), P(stimuli|class), given the 
   n_l = length(delta)
   n_p = length(p_cci)
   
   TD = matrix(nrow=n_r*n_l,ncol=24,dimnames=list(NULL,c("delta","c",paste0("m",1:6),paste0("j",1:16)))) # Set up matrix with all parameter values
   # Fill with learning rate = delta parameter
   TD[,1]   = rep(delta,each=n_r)
   # Draw p(c; CCI) ~ Beta(delta,delta)
   TD[,2]   = sapply(delta, function(x) rbeta(n_r, x, x))
   # Draw p(f_j | c_1) and p(f_j | c_2) ~ Beta(delta_1,delta_2)
   for (i in 3:8) TD[,i] = sapply(delta, function(x) rbeta(n_r, x, x))
   # Draw p(joint f | c_1) ~ Dirichlet(delta_1, ..., delta_8)
   for(i in 1:n_l) TD[(1+n_r*(i-1)):(n_r*i), 9:16]  = rdirichlet(n_r, rep(delta[i],8))
   # Draw p(joint f | c_2) ~ Dirichlet(delta_9, ..., delta_16)
   for(i in 1:n_l) TD[(1+n_r*(i-1)):(n_r*i),17:24]  = rdirichlet(n_r, rep(delta[i],8))
   TD = as.data.table(TD)
   setkey(TD,delta)
   
   # 2. DENSITIES
   # P(experience; model) = P(e,c1;m) + P(e,c2;m) = P(e|c1;m) P(c1;m) + P(e|c2;m) P(c2;m)
   DT = data.table(
      delta = rep(delta,each=n_r),
      k = rep(1:n_r,n_l),
      TD[, as.list(flikMLcci(c(m1,m2,m3)) * c),     by=delta][,2:9,with=F],
      TD[, as.list(flikMLcci(c(m4,m5,m6)) * (1-c)), by=delta][,2:9,with=F],
      TD[, list(j1*c,j2*c,j3*c,j4*c,j5*c,j6*c,j7*c,j8*c), by=delta][,2:9,with=F],
      TD[, list(j9*(1-c),j10*(1-c),j11*(1-c),j12*(1-c),j13*(1-c),j14*(1-c),j15*(1-c),j16*(1-c)), by=delta][,2:9,with=F]
    )        
   setnames(DT, 3:34, paste("s",rep(1:8,4),rep(c("c1","c2"),each=8,2),rep(c("cci","flex"),each=16),sep=""))
   # ensure values > 0
   DT[DT==0] = 10^-60

   # POSTERIOR MEAN
   lik.cci = DT[,   # exp( log(P(c1,s1)) * n(s1,c1) + log(P(c1,s2)) * n(s2,c1) + ... )
      exp( log(c(s1c1cci,s2c1cci,s3c1cci,s4c1cci,s5c1cci,s6c1cci,s7c1cci,s8c1cci,
      s1c2cci,s2c2cci,s3c2cci,s4c2cci,s5c2cci,s6c2cci,s7c2cci,s8c2cci)) %*% n_joints.c )
      , by = c("delta","k")][, mean(V1), by="delta"]$V1
   lik.flex = DT[,   # exp( log(P(c1,s1)) * n(s1,c1) + log(P(c1,s2)) * n(s2,c1) + ... )
      exp( log(c(s1c1flex,s2c1flex,s3c1flex,s4c1flex,s5c1flex,s6c1flex,s7c1flex,s8c1flex,
      s1c2flex,s2c2flex,s3c2flex,s4c2flex,s5c2flex,s6c2flex,s7c2flex,s8c2flex)) %*% n_joints.c )
      , by = c("delta","k")][, mean(V1), by="delta"]$V1

   # weighted lik = lik.cci * prior P(model)
   p_cci    = rep(p_cci, n_l)
   lik.cci  = rep(lik.cci, each=n_p)   
   lik.flex = rep(lik.flex, each=n_p)   
   lik.cci  = p_cci * lik.cci                #dim runs x (|delta|x|p_cci|) l1p1, l1p2, l2p1, ...
   lik.flex = (1-p_cci) * lik.flex           #dim runs x (|delta|x|p_cci|)

   # Normalize likelihood via w = P(Data|Model)/P(Data| all Models)
   nor  = lik.cci + lik.flex     #normalizing constant = P(Data|all Models)
   nor[nor==0] = 10^-30          #ensure nor > 0
   w = lik.cci / nor             #dim run x (|delta|x|p_cci|)
   
   # Check if Pr(cci|e) = 1-Pr(flex|e)
   # if(!all.equal(mce, (1 - colMeans((DT$t_flex %*% (1-p_cci)) /
      # (DT$t_cci %*% p_cci + DT$t_flex %*% (1.-p_cci)))))
      # ) { stop("P(CCI | experience) != (1 - P(FLEX | experience) in MC simulation") }

   return(as.list(w))
   }