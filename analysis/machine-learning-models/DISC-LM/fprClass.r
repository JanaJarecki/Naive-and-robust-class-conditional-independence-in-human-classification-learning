# Function to calculate P(class|next stim;previous experience)
library("MCMCpack")
library("R.utils")           #to convert into binary numbers
library("reshape2")          #to convert into binary numbers
source("flikMLcci.r")

fprClass <-function(w, s, delta, h_j, h_m1.1, h_m2.1, h_m3.1, h_m1.0, h_m2.0, h_m3.0, h_c1, h_c2, n_r){
   # w :=      weight of P(class|next stim; CCI)               [scalar in 0-1]
   # s :=      next stim                                       [string, e.g. "000"]
   # delta :=      parameter conservativism                        [integer]
   # h_j :=    hyper-parameter of joint experience             [vector of 16 integers]
   # h_m1.1 := hyper-parameter of marginal feature1|class A    [vector of 2 integers]
   # h_m2.1 := hyper-parameter of marginal feature2|class A    [vector of 2 integers]
   # h_m3.1 := hyper-parameter of marginal feature3|class A    [vector of 2 integers]
   # h_m1.0 := hyper-parameter of marginal feature1|class B    [vector of 2 integers]
   # h_m2.0 := hyper-parameter of marginal feature1|class B    [vector of 2 integers]
   # h_m3.0 := hyper-parameter of marginal feature1|class B    [vector of 2 integers]
   # h_c1 :=   hyper-parameter of class A                      [integer]
   # h_c2 :=   hyper-parameter of class B                      [integer]
   # n_r :=    number of MC runs                               [integer]
   if(!is.character(s))
      stop("Item needs to be a string (e.g. '000' for s 000.")
   if(nchar(s) != 3)
      stop("Item string needs to be of length 3.")
   if(length(h_j) %% 2 !=0) {
      stop("Shape P length must be divisible by 2 (first half=given class1, second=class2)") }
   if(length(h_c1)!=1)
      stop("Alpha P for class must have length 1")
   if(length(h_c2)!=1)
      stop("Beta P for class must have length 1")
   if(n_r<=2)
      stop("Number of n_r must be at least 3")
   
   # 1. CONSERVATIVISM + COUNTS
   L <- data.table(
      delta + h_c1,			#V1 := c1 (class A)
      delta + h_c2,			#V2 := c0 (class B)
      delta + h_m1.1[1],		#V3,V4   := (marg1|c1) = 1, (marg1|c0) = 1
      delta + h_m1.1[2],
      delta + h_m2.1[1],		#V5,V6   := (marg2|c1) = 1, (marg2|c0) = 1
      delta + h_m2.1[2],		
      delta + h_m3.1[1],		#V7,V8   := (marg3|c1) = 1, (marg3|c0) = 1
      delta + h_m3.1[2],
      delta + h_m1.0[1],		#V9,V10  := (marg1|c1) = 0, (marg1|c0) = 0
      delta + h_m1.0[2],
      delta + h_m2.0[1],		#V11,V12 := (marg2|c1) = 0, (marg2|c0) = 0
      delta + h_m2.0[2],
      delta + h_m3.0[1],		#V13,V14 := (marg3|c1) = 0, (marg3|c0) = 0
      delta + h_m3.0[2],
      matrix(delta + rep(h_j, each=length(delta)), nrow=length(delta)),		#V15-V30 := 000|c1, 001|c1, - 110|c2, 111|c2
      delta = delta,
      key="delta"
   )
   setnames(L, 1:30, paste("V",1:30,sep=""))
   
   # 2. MC SIMULATION OF P(CLASS) -> theta
   t_c1 <- L[, rbeta(n_r, V1, V2), by=delta]$V1 
   
   # 3. MC SIMULATION OF P(FEATURES|CLASS) -> theta
   t_m.c1 <- c(L[, rbeta(n_r, V3, V9), by=delta]$V1,       #(marg1|c1) = 1, (marg1|c1) = 0
               L[, rbeta(n_r, V5, V11), by=delta]$V1,      #(marg2|c1) = 1, (marg2|c1) = 0
               L[, rbeta(n_r, V7, V13), by=delta]$V1)      #(marg3|c1) = 1, (marg3|c1) = 0
   t_m.c2 <- c(L[, rbeta(n_r, V4, V10), by=delta]$V1,      #(marg1|c0) = 1, (marg1|c0) = 0
               L[, rbeta(n_r, V6, V12), by=delta]$V1,      #(marg2|c0) = 1, (marg2|c0) = 0
               L[, rbeta(n_r, V8, V14), by=delta]$V1)      #(marg3|c0) = 1, (marg3|c0) = 0 
   t_j.c1 <- dcast(cbind(L[, rdirichlet(n_r,c(V15,V16,V17,V18,V19,V20,V21,V22)), by=delta],
               rep(1:8,length(delta),each=n_r), 1:n_r),
               delta+V3~V2, value.var="V1")[,c(3:10)]
   t_j.c2 <- dcast(cbind(L[, rdirichlet(n_r,c(V23,V24,V25,V26,V27,V28,V29,V30)), by=delta],
               rep(1:8,length(delta),each=n_r), 1:n_r),
               delta+V3~V2, value.var="V1")[,c(3:10)]  
  
   #Check
   # cat("\n mean of B(",L$V3,  L$V9,") != ", 1/(1+L$V9/L$V3),  " ~ ", mean(t_m.c1[1:n_r]))
   # cat("\n mean of B(",L$V5, L$V11,") != ", 1/(1+L$V11/L$V5), " ~ ", mean(t_m.c1[(1+n_r):(2*n_r)]))
   # cat("\n mean of B(",L$V7, L$V13,") != ", 1/(1+L$V13/L$V7), " ~ ", mean(t_m.c1[(1+2*n_r):(3*n_r)]))
   
   # cat("\n mean of B(",L$V4, L$V10,") != ", 1/(1+L$V10/L$V4), " ~ ", mean(t_m.c2[1:n_r]))
   # cat("\n mean of B(",L$V6, L$V12,") != ", 1/(1+L$V12/L$V6), " ~ ", mean(t_m.c2[(1+n_r):(2*n_r)]))
   # cat("\n mean of B(",L$V8, L$V14,") != ", 1/(1+L$V14/L$V8), " ~ ", mean(t_m.c2[(1+2*n_r):(3*n_r)]))
   # attach(L)
   # cat("\n mean of D(",V15,V16,V17,V18,V19,V20,V21,V22,") != ", c(V15,V16,V17,V18,V19,V20,V21,V22)/sum(V15,V16,V17,V18,V19,V20,V21,V22), " ~ ", colMeans(t_j.c1))
   # cat("\n mean of D(",V23,V24,V25,V26,V27,V28,V29,V30,") != ", c(V23,V24,V25,V26,V27,V28,V29,V30)/sum(V23,V24,V25,V26,V27,V28,V29,V30), " ~ ", colMeans(t_j.c2))
   # cat("\n")
   # detach(L)
   
   # 4. LIKELIHOODS P(EXPERIENCE|DATA;MODEL)
   DT <- data.table(
      flikMLcci(t_m.c1) * t_c1,         #P(stimuli,c1,cci)
      flikMLcci(t_m.c2) * (1-t_c1),     #P(stimuli,c2,cci)
      t_j.c1 * t_c1,                    #P(stimuli,c1,flex)
      t_j.c2 * (1-t_c1))                #P(stimuli,c2,flex)
   # rename rows: s1c1cci, ..., s1c2cci, ..., s1c1flex, ..., s1c2flex, ...,  s8c2flex
   setnames(DT, 1:32, paste("s",rep(1:8,4),rep(c("c1","c2"),each=8,2),rep(c("cci","flex"),each=16),sep=""))

   
   # 5. ESTIMATED CLASSIFICATION PROBABILITIES P(CLASS|NEXTSTIM;CCI), P(CLASS|NEXTSTIM;FLEX)
   # Stimulus
   s <- which(intToBin(0:7)==s) #transform string to numeric  := position in <000,001,010,...,101,110,111>
   # P(c1 | s; model) = P(s, c1; model) / P(s, model)
   # P(s, model) = P(s, model, c1) + P(s, model, c2)
   # flex
   p_c1.s.m  <- DT[, paste("s",s,"c1flex",sep=""), with=F]
   p_s.m     <- p_c1.s.m + DT[, paste("s",s,"c2flex",sep=""), with=F]
   p_c1.flex <- (p_c1.s.m / p_s.m)[[1]]
   # cci
   p_c1.s.m  <- DT[, paste("s",s,"c1cci",sep=""), with=F]
   p_s.m     <- p_c1.s.m + DT[, paste("s",s,"c2cci",sep=""), with=F]
   p_c1.cci  <- (p_c1.s.m / p_s.m)[[1]] 
   # split w.r.t. delta
   L <- data.table(delta=rep(delta,each=n_r), p_c1.flex=p_c1.flex, p_c1.cci=p_c1.cci, key="delta")
 
   # Estimate MW[p(c1|s;model)]
   pc1.hat.cci  = L[, mean(p_c1.cci), by=delta]$V1              #dim 1 x |delta|
   pc1.hat.flex = L[, mean(p_c1.flex), by=delta]$V1             #dim 1 x |delta|
   #print(pc1.hat.cci) 
   # CHECK ----------------------------------------------------------------------------------------#
   # Compute Pr(A|stimuli;flex) for all 8 stimuli
   #prClass1Stimuliflex <- list(
   #   colMeans(DT[, 18:25, with=F] / (DT[, 18:25, with=F] + DT[, 26:33, with=F])))
   #-----------------------------------------------------------------------------------------------#
   
   # 5. WEIGHTING W x P(CLASS|NEXTSTIM;CCI) + (1-W) x P(CLASS|NEXTSTIM;FLEX)
   # Incorporate priors via w = w * P(Model)
   pc1.hat.cci = rep(pc1.hat.cci, each=length(w)/length(delta))     #dim 1 x (|delta|x|p_cci|) 
   pc1.hat.flex = rep(pc1.hat.flex, each=length(w)/length(delta))   #dim 1 x (|delta|x|p_cci|)
   # We divide by |delta| because the length of argument w = |p_cci| * |delta|

   # Weight P(c1|s) = w P(c1|s;cci) + (1-w) P(c1|s;flex)
   pc1.hat = w * pc1.hat.cci  + (1-w) * pc1.hat.flex           #dim 1 x (|delta|x|p_cci|) 

   return(pc1.hat) #vector pc1.hat
}