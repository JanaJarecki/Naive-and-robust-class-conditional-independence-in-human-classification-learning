###############################################################################
# Helper function
# For parameter recovery
# Function that can plot the delta parameter's recovery
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################
library("reshape2");          #for melting and casting

# plot delta rate for parameter recovery
plot.delta = function(p_c1, prior, delta, i, this_delta){
   DF = data.table(delta=delta,prior=prior,i=i,p_c1=p_c1,this_delta==this_delta,key="i,prior,delta") #sort by prior
   
   DF[, "choice_this_delta" :=   ifelse(p_c1[delta==this_delta]>.5,1L, #true choice given this_delta
                                    ifelse(p_c1[delta==this_delta]<.5,0L,
                                    sample(0L:1L,1))), by=i] 
   FIT = DF[, list(logLik = ffit(choice_this_delta,p_c1,"logLik"),
                  MSE     = ffit(choice_this_delta,p_c1,"MSE"),
                  MAE     = ffit(choice_this_delta,p_c1,"MAE")), by=c("i","prior","delta")]
   FIT = melt(FIT, id.var=c("i","delta","prior"), value.name="Fit", variable.name="Measure") #long format
   setkey(FIT,i,delta,prior,Measure) #sort
   
   best = FIT[, .I[Fit %in% max(Fit)], by=c("i","Measure","prior")]$V1 #best-fitting delta-rates
   FIT = FIT[best]

   setkey(FIT,prior,Measure) #sort to get the added variance right
   FIT[, "tmp" := ifelse(sd(delta)==0,1,0), by=c("prior","Measure")] #create variance for viol.pl.
   FIT[, "delta" := delta + tmp * rep(c(-1,1)/10^6, .N/2)]

   FIT[, "label" := this_delta]
   
   p = ggplot(FIT,aes(x=factor(prior),y=delta,color=Measure,fill=Measure)) +
      geom_violin(alpha=0.01, position=pd) +
      geom_boxplot(width=.2, fill="gray", alpha=0.7, position=pd)  +
      stat_summary(fun.y="mean", geom="point", position=pd, shape=21, size=3)+
      geom_point(position=pd) +
      scale_x_discrete("True prior") +
      scale_y_continuous("Estimated delta", limits=range(deltas)+c(-1,1)/10^5, breaks=deltas) +
      geom_hline(aes(yintercept=label[1])) +
      theme_bw() +
      ggtitle(paste0("True delta = ",FIT$label[1],"\n"))
   return(ggplot_gtable(ggplot_build(p)))
}