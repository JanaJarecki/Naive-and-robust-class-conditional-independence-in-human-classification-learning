###############################################################################
# Helper function
# For parameter recovery
# Functions to compute the ML model parameter recovery 
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################


######################################################################################################
rm(list=ls(all=T))
library("data.table");        #for fast subsetting
library("ggplot2");           #plots
library("scales");            #plots
library("gridExtra");         #plots
library("reshape2");          #for melting and casting
library("reshape2")           #for tabulation
source("halper-functions/ffit.r")
# Directories
ddir = "../data"    #data directory


######################################################################################################
# Load data
for (which in 1:2) {
  rm(dm)
  d1 = fread(file.path(ddir,paste0("study",which,"_simulation.csv")))
  setkey(d1,prior,delta,i,t) #sort by prior, delta

  # Check for which priors the models make differing predictions
  p_c1_prior0 = unlist(d1[t<=100 & prior==0, p_c1])
  priors = c(0, d1[t<=100, all.equal(p_c1_prior0,p_c1,tolerance=0.01)!=TRUE, keyby=prior][, prior[V1==T]])
  d_c1_delta0 = unlist(d1[t<=100 & delta==1, p_c1])
  deltas = c(1, d1[t<=100, all.equal(d_c1_delta0,p_c1,tolerance=0.01)!=TRUE, keyby=delta][, delta[V1==T]])

  # If you want to constrain deltas to certain values
  deltas_constrained = deltas
  ########################################################################################################
  r = data.table()

  for(this_prior in priors) {
      for(this_delta in deltas) {
          df = NULL
          dm = NULL

          # Generate data
          dh = d1[delta==this_delta & prior==this_prior] #human data (to-be-inferred)
          set.seed(1245)
          dh[, ch := ifelse(p_c1>.5, 1, ifelse(p_c1<.5, 0, sample(0:1,.N,rep=T)))] # Binarize prediction to-be-recovered p.
          dh[t==1, ch := .5] #Get rid of MC error for 1st trial
          dh[, i := as.numeric(i)]
          dh[, c("p_c1","p_cci","prior","delta") := NULL]
          # Remove last 200 trials and first trial
          dm = d1[delta %in% deltas_constrained & prior %in% priors] #modelled data
          setkey(dm,i)
          dm = dm[dm[, .I[t<=max(t)-200], by=i]$V1][t>1]
          setkey(dh,i)
          dh = dh[dh[, .I[t<=max(t)-200], by=i]$V1][t>1]
          # Rename choice columns 'ch'
          setnames(dh,"ch","chHum")
          setnames(dm,"ch","chMod")
          # Combine
          setkey(dm,i,t,e)
          setkey(dh,i,t,e)
          d = dm[dh]
          rm(dh)
          # Round to four digits
          d[, p_c1_4 := round(p_c1,4)]

          # Calculate best combination of delta and prior
          df = d[, list(
                  MSE=    ffit(chHum, p_c1_4, "MSE", k=2),
                  LogLik= ffit(chHum, p_c1_4, "logLik", k=2),
                  BIC=    ffit(chHum, p_c1_4, "BIC", k=2),
                  MAE=    ffit(chHum, p_c1_4, "MAE", k=2)
                  ),
              by=c("i","prior","delta")]

          setkey(df,i,prior,delta)
          df[, rankMSE := rank(MSE, ties.method="max"), by=i]      # rank the mse
          df[, rankLogLik := rank(LogLik, ties.method="max"), by=i]      # rank the ll
          df[, rankBIC := rank(BIC, ties.method="max"), by=i]      # rank the bic
          df[, rankMAE := rank(MAE, ties.method="max"), by=i]      # rank the mae
          
          max.rankMSE    = df[, max(rankMSE)]   
          max.rankLogLik = df[, max(rankLogLik)]
          max.rankBIC    = df[, max(rankBIC)]   
          max.rankMAE    = df[, max(rankMAE)]   
          
          dm = rbind(
            df[rankMSE == max.rankMSE][, measure := "MSE"],
            df[rankLogLik == max.rankLogLik][, measure := "LogLik"],
            df[rankBIC == max.rankBIC][, measure := "BIC"],
            df[rankMAE == max.rankMAE][, measure := "MAE"])

  
          # Make long format
          # df = melt(df, id.vars=c("i","prior","delta"), variable.name="measure", value.name="fit")
          # Get maximum fit prior
          # setkey(df,i,measure,prior,delta)
          #dm = df[, list(prior=prior[fit==max(fit)], delta=delta[fit==max(fit)]), by=c("i","measure")]

          # In case of ties, select the smallest prior value (which speaks against our hypothesis)
          dm = dm[, .SD[prior==min(prior)], by=c("i","measure")]
          # Store true prior/delta
          dm[, true_prior := this_prior]
          dm[, true_delta := this_delta]
          # Result (append)
          r = rbind(dm,r)
    }
  }

  # Index for list
  r[, true_delta_f := factor(true_delta, levels=r[, sort(unique(true_delta))])]
  r[, true_prior_f := factor(true_prior, levels=r[, sort(unique(true_prior))])]
  r[, prior_f := factor(prior, levels=r[, sort(unique(true_prior))])]
  r[, delta_f := factor(delta, levels=r[, sort(unique(delta))])]



  recoveryPi <- r[, abs(mean(true_prior)-median(prior)), by=list(measure,true_delta)][, list(true_minus_medianEst=mean(V1), sd_diff=sd(V1)), by=measure][order(true_minus_medianEst)]
  print(xtable(recoveryPi, digits = 4))

  recoveryDelta <- r[, abs(mean(true_delta)-median(delta)), by=list(measure,true_prior)][, list(true_minus_medianEst=mean(V1), sd_diff=sd(V1)), by=measure][order(true_minus_medianEst)]
  print(xtable(recoveryDelta,digits = 4))
}