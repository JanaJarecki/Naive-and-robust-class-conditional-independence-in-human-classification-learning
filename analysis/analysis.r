###############################################################################
# Main data analysis code
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################

#rm(list=ls(all=T))
# Packages
library(data.table); library(R.utils); library(ggplot2); library(scales); library(grid); library(pwr); library(lsr)
source("utils/ffit.r")
# source("../../../../96-Resources/R/demographics.r") #comment this out
# source("../../../../96-Resources/R/graphics_jj.r") #comment this out
# source("../../../../96-Resources/R/theme_jj.r") #comment this out
col = c("grey66","grey33")
# Directories
ddir = "../data" #where the data is stored
idir = "../img" #where to write images
savePlots = F


###############################################################################
# Demographics
# Note the demographics daa is NOT shared publically
# to avoid risk of de-identification
# therefore this code won't work
for (which in 1:2){ # Switch between experiment 1 and 2
    rm(d)
    d = fread(file.path(ddir,paste0("study",which,"_data_demographics.csv"))) # Load data
    demographics(d, paste0("experiment",which,"_demographics.tex"), "the Center for Adaptive Behavior and Cognition laboratory", 12)
}
###############################################################################


###############################################################################
# How many trials did participant need?
d1 = fread(file.path(ddir,"study1_data.csv")) #Exp 1
d2 = fread(file.path(ddir,"study2_data.csv")) #Exp 2
d1 = unlist(d1[, list(trials=max(t)), by=i]$trials)
d2 = unlist(d2[, list(trials=max(t)), by=i]$trials)
# Summary statistics of needed trials
round(c(min=min(d1), max=max(d1), mdn=median(d1), mean=mean(d1), sd=sd(d1)),0)
round(c(min=min(d2), max=max(d2), mdn = median(d2), mean=mean(d2), sd=sd(d2)),0)
# Test if study 2 took more trials than study 1
var.test(d1,d2) # --> unequal variances
t.test(d1,d2, var.equal=FALSE, paired=FALSE) # Wel.-Satt. corected / uneq. var.
cohensD(d1,d2, method="unequal")

###############################################################################


###############################################################################
# Distribution of first choices
for (which in 1:2){ # Switch between experiment 1 and 2
    rm(d)
    # Load participant's data
    dh = fread(file.path(ddir,paste0("study",which,"_data.csv")))
    # Is the distribution of choices random in the first trial?
    print(dh[t==1, binom.test(table(ch))]) # exact binomial test against p(class1)=.5
    print(dh[t==1, ES.h(mean(ch=="A"),.5)])
}
###############################################################################


###############################################################################
# Knowledge question (inference vs. diagnostic)
for (which in 1:2){ # Switch between experiment 1 and 2
    rm(d)
    # Load participant's data
    d = fread(file.path(ddir,paste0("study",which,"_data_knowledge.csv")))
    # Are participants' first choices different from 0.50? Do they have a class prior?
    print(d[, binom.test(table(cauMod))]) # exact binomial test against p(class1)=.5
    print(d[, ES.h(mean(cauMod=="diagnostic"),.5)])
    print(d[, .N, by=cauMod])
}


###############################################################################
# Machine-learning model performance
for (which in 1:2){ # Switch between experiment 1 and 2
    if (exists("d")) rm(d)
    # Load data
    dm = fread(file.path(ddir,paste0("study",which,"_simulation.csv")))
    dh = fread(file.path(ddir,paste0("study",which,"_data.csv")))

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
    cat("\n priors ", priors,"\n deltas ", deltas, "\n\n")

    # Calculate best combination of delta and prior
    setkey(d,t,i,prior,delta)
    # Round prediction to four digits 57.43 %
    d[, p_c1_4 := round(p_c1,4)]

    ###########################################################################
    # Fit values for full dataset
    df = d[prior %in% priors & delta %in% deltas][,list(
            mse = ffit(chHum, p_c1_4, "MSE", k=2),
            acc = ffit(chHum, p_c1_4, "ACC", k=2)
            ),  by=c("i","prior","delta")]
    # uncomment this if you want only critical trials
    #df <- d[prior %in% priors & delta %in% deltas & !grepl("111",e)][,list(
    #        mse = ffit(chHum, p_c1_4, "MSE", k=2),
    #        acc = ffit(chHum, p_c1_4, "ACC", k=2)
    #        ),  by=c("i","prior","delta")]

    # Get maximum fit prior (in case of ties we get duplicate values)
    setkey(df,i,prior,delta)
    df[, rank := rank(mse, ties.method="max"), by=i]      # rank the mse
    max.rank = df[, max(rank)]         # max(rank)
    dm = df[rank == max.rank]          # prior, delra, mse, and acc values

    # In case of ties, select the smallest prior value (which speaks against our hypothesis) 
    if( dm[, sum(duplicated(i))] > 0) {
        cat("There are ties in the best-fitting values, for n =", dm[, sum(duplicated(i))], "people \n")
        
        dm = dm[, .SD[prior==min(prior)], by=i]
    }

    # Add participant 2126 (the one with 200 trials we excluded)
    if (which==1) {
        dm = rbind(
          dm, 
          data.table(i=2129,prior=0,delta=1,mse=NA,acc=NA,rank=1))
    }
  
    
    # Goodnes of fit ----------------------------------------------------------
    # Get goodness of fit for best parameter combination
    mseBestPriorDelta = df[rank==max.rank][!duplicated(i), round(mean(1-mse),4)]
    accBestPriorDelta = df[rank==max.rank][!duplicated(i), round(mean(acc),4)]
    mseBestPriorDelta
    # And for a Baserate model (pick class with highest base rate)
    accBaserate = d[delta==1 & prior==1, list(acc=ffit(chHum, rep(1,.N), measure="ACC", 1)), by=i][, round(mean(acc),4)]
    # And for a Prior (pi) = 0 + best delta model
    msePriorZero = df[prior==0][, max(mse), by=i][, round(mean(1-V1), 4)]
    accPriorZero = df[prior==0][, acc[mse==max(mse)], by=i][, round(mean(V1), 4)]

    # Model accuracy ----------------------------------------------------------
    # Accuracy difference ACC(best) - Acc(prior==0)
    accDiff <- df[rank==max.rank][!duplicated(i), acc, keyby=i]$acc - 
    df[prior==0][, acc[mse==max(mse)], keyby=i]$V1
    # uncomment this if you need to see it
    # ggplot(data.table(accDiff), aes(x=1,y=accDiff)) +geom_violin() +geom_point() +stat_summary(fun.y = "mean", geom = "point", size=7, color="grey50")
    cat("Accuracy differences between prior=0 and best-fitting model\n")
    t.test(accDiff)

    # Second best value combination
    mseBestPriorDelta2 = df[rank==max.rank-1][!duplicated(i), round(mean(1-mse),4)]
    accBestPriorDelta2 = df[rank==max.rank-1][!duplicated(i), round(mean(acc),4)]
    # Third best value combination
    mseBestPriorDelta3 = df[rank==max.rank-2][!duplicated(i), round(mean(1-mse),4)]
    accBestPriorDelta3 = df[rank==max.rank-2][!duplicated(i), round(mean(acc),4)]
    options(digits = 4)
    cat("\nAccuracy",
        "\n ACC (baserate model)=",                 accBaserate,
        "\n ACC (best prior-delta combination)=",   accBestPriorDelta,
        "\n ACC (prior=0 + best-delta)=",           accPriorZero,
        #"\n ACC (2. best prior-delta combination)=",accBestPriorDelta2,
        #"\n ACC (3. best prior-delta combination)=",accBestPriorDelta3,
        "\n\nMean-squared Error",
        "\n MSE (best prior-delta combination)=",   mseBestPriorDelta,
        "\n MSE (prior=0 + best-delta)=",           msePriorZero,  
        "\n MSE (2. best prior-delta combination)=",mseBestPriorDelta2,
        "\n MSE (3. best prior-delta combination)=",mseBestPriorDelta3,"\n")
    

    # Initial beliefs in class-conditional independence -----------------------
    # those best accounted for by a model with prior belief in 
    # class-conditional independence of at least .99
    tab <- dm[!duplicated(i),
       table(cut(prior, c(0,.7,.99,1), include.lowest=T, right=F))]
    print(tab)
}
