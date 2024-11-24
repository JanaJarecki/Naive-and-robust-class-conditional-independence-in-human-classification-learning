#rm(list=ls(all=T))
# Packages
library(egg); library(ggplot2); library(scales); library(gridExtra)   #plotting
library(data.table)   #data conversion
# Own functions
source("helper-functions/learningcurves.r")
# Directories
ddir = "../data"
# settings for plots
set.seed(123)
pj = position_jitter(w=0.001, h=0)
col = c("black","white","white","white","grey")


########################################################################
# Load data, generate auxiliary variables for plotting
########################################################################
for(which in 1:2){
  if (which == 1) {
    # initialize
    beliefplots = list()
    choiceplots = list()
  }
  if (which > 2) {
    col = c(col[1], rep(col[2],6), col[5])
    sha = c(21,24,25,23,26,27,28,22)
  }
  # Set values for the plot
  nt = 50                             # How many trials to plot
  bw = nt/10                          # binwidth
  val.prior = c(0,1,.9,.99,.999999)   # Which prior structural beliefs to plot
  val.delta = 1 #c(2,7,33)            # 1 or c(2,7,33)

  # Read data
  d = fread(file.path(ddir,paste0("study",which,"_simulation_N200.csv")))
  setkey(d,i)
  # Generate variables
  d[, s := substr(e,1,3)]
  d[, c := substr(e,4,4)]
  d[, p_c1 := round(p_c1,4)]
  d[, p_cci := round(p_cci,4)]
  d[,  b := ifelse(c=="A", p_c1, 1-p_c1)]
  set.seed(124)
  d[t>1,  a := ifelse(b>.5,1, ifelse(b<.5,0, sample(0:1,1)))]
  d[t==1, a := .50]                          # Erase MC error in trial 1
  setkey(d,prior,delta,i,t)
  d[, "bin" := rep(1:ceiling(.N/bw),each=bw)[1:.N], by=c("prior","delta","i")]
  setkey(d,bin,s,t)
  d = d[, lapply(.SD,mean), .SDcols=c("b","a","p_cci"), by=c("prior","delta","bin","s")]
  setkey(d,prior,delta)

  # Generate labels for plotting
  setkey(d,bin) #sort by bin
  d[, bin_label   := factor(paste0("to ", bin*bw), levels=paste0("to ", sort(unique(bin))*bw))]
  d[, prior_label := factor(prior, labels=paste("pi==",sort(unique(d$prior))))]
  d[, delta_label  := factor(delta, labels=paste("delta==",sort(unique(d$delta))))]
  d[, s_label := factor(s, levels=c("111","001","010","100","000"))]
  d[, Decision := ifelse(s!="111","Differs","Same")]


  # Select which parameter values and how many trials to plot
  d = d[prior %in% val.prior & delta %in% val.delta & bin<=nt/bw]


  # Plot two plots
  # 1. Plot the weight or belief in cci
  pb = ggplot(d[, lapply(.SD, mean), .SDcols="p_cci", by=c("prior","prior_label","delta_label","bin_label")], aes(x=bin_label, y=p_cci, group=prior)) +
    geom_line(aes(y = p_cci), linetype=3, size=.3, color="black") +
    facet_grid(delta_label~prior_label, labeller=label_parsed) +
    scale_y_continuous("Belief in CCI", limits=c(-.01,1.01), breaks=c(0,.5,1), labels=percent) +
    xlab(paste0("Trial (bins of ",bw,")")) +
    theme(axis.text.x = element_text(angle = 90, vjust = .3, hjust = 1), strip.text.x = element_blank())
    
    if (length(val.delta) == 1) {
      pb = pb + theme(strip.text.y = element_blank())
    }

  # 2. Plot binarized choices
  tit = paste0(ifelse(which==1,"(a)","(b)"), " Simulated Learning Curves in the ", ifelse(which==1,"Deterministic","Probabilistic")," Task") # Generate title
  pa = ggplot(d, aes(x=bin_label, y=a, fill=s_label, group=s_label, shape=s_label, linetype=s_label))
     # Generate plot
  if (length(val.delta)==1) {
    pa = pa + theme(strip.text.y = element_blank())
  }
  pa = learningcurves(pa) # Add lines
  pa = pa +facet_grid(delta_label~prior_label, labeller=label_parsed) + theme(legend.position = "top")

  choiceplots[[which]] <- pa +theme(axis.text.x = element_blank(), axis.ticks.x = element_blank(), axis.title.x = element_blank())
  beliefplots[[which]] <- pb

}

p <- egg::ggarrange(
  choiceplots[[1]] +theme(plot.margin = margin(0,-2,-.8,-1,"lines")),
  beliefplots[[1]]+theme(plot.margin = margin(0,-2,-.8,-1,"lines")),
  choiceplots[[2]] +theme(plot.margin = margin(2,0,-.8,-3,"lines")),
  beliefplots[[2]],
  ncol = 1)

grid.draw(p)

outfile <- paste0("simulation_illustration_N200", 
                  ifelse(length(val.delta) > 1, "deltas", ""))

ggsavejj(outfile, p = p, journal = "CognitiveScience", h = if (val.delta == 1) {6.4} else {3.2 * length(val.delta)})