#rm(list=ls(all=T))
# Packages
library("data.table"); library("R.utils"); library("ggplot2");
library("scales"); library("grid")
# Directory
ddir <- "../data"
# Color
col = c(`111`="black",`001`="white",`010`="white",`100`="white",`000`="grey")
# Initiate
figClaErr = list()

###############################################################################
# Error rates
# Switch between experiment 1 and 2
for(which in 1:2) {
    # Load data
  
    d = fread(file.path(ddir,paste0("study",which,"_data.csv")))
    d[, i := as.numeric(i)]
    d[, t := as.numeric(t)]
    d[, s := factor(substring(e,1,3), levels=c("000","001","010","100","111"))]
    setkey(d,i)
    d[, s := factor(substr(e,1,3), levels=intToBin(0:7)[c(8,2:6,1)])]
    d[, error := factor(smiley, levels=c("s","f"), labels=c("correct","error"))]
    d[, errorNum := ifelse(smiley=="f",1,0)]

    # If we were to use T-200 trials, __ people experiece at least one stimulus s less than 20 times
    d[, .SD[t<=max(t)-200], by=i][, .N, by=c("i","s")][N<20][!duplicated(i), .N] # 9 people below 100 trials
    d[, .SD[t<=max(t)-200], by=i][, mean(errorNum), by=c("i","s")][, round(median(V1),2), by=s][order(s)]
       
    #Plot the error rates
    de = d[, list(proErr=mean(errorNum)), by=c("s","i")]
    samplemean = function(x, d) { return(mean(x[d])) }
    library(boot)
    de = de[, list(MproError=mean(boot(proErr, samplemean, R=1000)$t), bootSE = sd(boot(proErr, samplemean, R=1000)$t)), by=s]
    de[, Type := ifelse(s=="111","Uncritical","Critical")]

    tit = paste0("(a) Classification Errors")
    figClaErr[[which]] = ggplot(de,  aes(x=s)) +
       geom_bar(aes(y=MproError,fill=s), stat="identity", width=.5, color="black") +
       geom_errorbar(aes(ymin=MproError-bootSE, ymax = MproError+bootSE), width=.2) +
       scale_fill_manual("", values=col, breaks=c("111","001","000"), labels=c("Uncritical    ","&","Critical")) +
       scale_y_continuous("Errors (mean,SE)", labels=percent, expand=c(0,0)) +
       scale_x_discrete("Stimulus") +
       theme(legend.direction = "horizontal", legend.position = "top") +
       ggtitle(tit)
}