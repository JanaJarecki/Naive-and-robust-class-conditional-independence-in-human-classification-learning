#rm(list=ls(all=T))
# Packages
library(ggplot2); library(scales); library(gridExtra)   #plotting
library(data.table)   #data conversion
source("helper-functions/learningcurves.r")
# Directories
ddir = "../data"



###############################################################################
# Repeat the same for the human behavior
###############################################################################
# Jitter settings for plots
set.seed(123)
pj = position_jitter(w=0.001, h=0)
# Save plots in ...
figLeaCur = list()

for(which in 1:2){
  # Load data, generate auxiliary variables for plotting
  d = fread(file.path(ddir,paste0("study",which,"_data.csv")))
  d[, s := substr(e,1,3)]        # Experienced stimuli
  d[, c := substr(e,4,4)]        # Correct class
  d[, a := ifelse(c==ch,1,0)]    # Correct class choice as numeric (1=correct,0==wrong)
  # Trials and bins
  nt = 100                       # How many trials to plot
  bw = nt/10                     # binwidth
  # Bin trials
  setkey(d,i)
  d = d[d[, .I[t<=max(t)-200], by=c("i")]$V1]
  # Uncomment those lines if the bins should be percentages
  #d[, tper := t/.N, by=i]
  #d[, bin := cut(tper,seq(0,1,.1),include.lowest=T,labels=F), by=i]
  #d[, bin_label := cut(tper,seq(0,1,.1),include.lowest=T), by=i]
  setkey(d,i,t)
  d[, "bin" := rep(1:ceiling(.N/bw),each=bw)[1:.N], by=i]
  setkey(d,bin,s,t)
  d = d[, list(a=mean(a)), by=c("bin","s")]
  d[, s_label := factor(s, levels=c("111","001","010","100","000"))]
  setkey(d,bin) #sort by bin
  d[, "bin_label" := factor(paste0("to ", bin*bw), levels=paste0("to ", sort(unique(bin))*bw))]

  # Plot aggregated human choices binned in bins of bw for nt trials
  tit = "(b) Learning Curves" # Title
  ph = ggplot(d[bin<=nt/bw], aes(x=bin_label, y=a, fill=s_label, group=s_label, shape=s_label, linetype=s_label)) # Plot
  ph = learningcurves(ph) # Plot lines
  ph = ph + theme(legend.position = "top", legend.key = element_rect(fill=NA, color = NA), legend.background = element_rect(fill=NA, color = NA))

  figLeaCur[[which]] = ph
}