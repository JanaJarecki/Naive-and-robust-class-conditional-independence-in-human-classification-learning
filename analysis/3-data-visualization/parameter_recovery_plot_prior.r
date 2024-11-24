###############################################################################
# Helper function
# For parameter recovery
# Function that can plot the prior parameter's recovery
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################

library("reshape2");          #for melting and casting

# Plots prior for the parameter recovery
plot.prior = function(p_c1, prior, delta, i, this_prior){
   DF = data.table(delta=delta,prior=prior,i=i,p_c1=p_c1,this_prior=this_prior,key="i,prior,delta") #sort by prior
   
   DF[, "choice_this_prior" :=   ifelse(p_c1[prior==this_prior]>.5,1L, #true choice given this_prior
                                 ifelse(p_c1[prior==this_prior]<.5,0L,
                                 sample(0L:1L,1))), by=i] 
   FIT = DF[, list(logLik = ffit(choice_this_prior,p_c1,"logLik"),
                   MSE    = ffit(choice_this_prior,p_c1,"MSE"),
                   MAE    = ffit(choice_this_prior,p_c1,"MAE")), by=c("i","prior","delta")]
   FIT = melt(FIT, id.var=c("i","prior","delta"), value.name="Fit", variable.name="Measure") #long format
   setkey(FIT,prior,i,delta,Measure) #sort
   
   best = FIT[, .I[Fit %in% max(Fit)], by=c("i","Measure","delta")]$V1 #best-fitting priors
   FIT  = FIT[best]

   setkey(FIT,delta,Measure) #sort to get the added variance right
   FIT[, "tmp" := ifelse(sd(prior)==0,1,0), by=c("delta","Measure")] #create variance for viol.pl.
   FIT[, "prior" := prior + tmp * rep(c(-1,1)/10^6, .N/2)]

   FIT[, "label" := this_prior] #label "this_prior" so ggplot finds it in DF's scope

   p = 
   ggplot(FIT, aes(x=factor(delta), y=prior, fill=Measure, color=Measure)) +
      geom_violin(alpha=0.01, position=pd) +
      geom_boxplot(width=.2, fill="gray", alpha=0.7, position=pd)  +
      stat_summary(fun.y="mean", geom="point", position=pd, shape=21, size=3)+
      geom_point(position=pd) +
      scale_x_discrete("True delta") +
      scale_y_continuous("Estimated prior", limits=range(priors)+c(-.1,.1), breaks=priors) +
      geom_hline(aes(yintercept=label[1])) +
      theme_bw() +
      ggtitle(paste0("True prior = ",FIT$label[1],"\n"))

   return(ggplot_gtable(ggplot_build(p)))
}