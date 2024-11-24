###############################################################################
# Helper functions
# Function to calculate the fit between model and data
# Author: Jana B. Jarecki
# Publixation: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################

# Returns a goodness of fit value
# Scaled such that 1 := best fit, 0 := worst fit
# Measures taken from Ferri, HernÃ¡ndez-Orallo, & Modroiu, (2009)

#library("ROCR");              #area under ROC curve
#library("TTR");               #moving average calculations SMA()


ffit <- function(true,estimate,measure,k) { #Five classifier fit metrics
   # true :=         correct class           [vector of 0s,1s, 1 := "class A"]
   # estimate :=     estimated P(class)      [vector of probabilities P(class A)]
   # measure :=      fit measure to use      [string]
   # k :=            number of fitted parameters [scalar]

   if(!is.numeric(true)) { stop("argument 'true' needs to be of type numeric")}
   if(!is.numeric(estimate)) { stop("argument 'estimate' needs to be of type numeric")}
   if(!all(unique(true)%in%0:1)) { stop("argument 'true' is allowed to hold only values 0 or 1")}
   if(length(estimate)!=length(true)) { stop("arguments 'estimate' and 'true' need to be of equal length")}
   if(max(estimate)>1|min(estimate)<0) { stop("argument 'estiamte' needs to be between 0 and 1 (including)")} 

   m = length(true)

   if (measure=="logLik") { #also: logistic loss/cross-entropy loss; Good (1952, p. 112)
      e = 0.000000001 #ensure 0 < estimate < 1
      estimate[estimate==0] = e
      estimate[estimate==1] = 1-e
      logLik = 1/m * ( sum( true*log(estimate,2) ) + sum( (1-true)*log((1-estimate),2) ) )
      logLik
   } else if (measure=="BIC") { #log likelihood-based measure BIC
      e = 0.000000001 #ensure 0 < estimate < 1
      estimate[estimate==0] = e
      estimate[estimate==1] = 1-e
      BIC = 2 * ( sum(log(estimate,2)*true) + sum(log((1-estimate),2)*(1-true)) ) - k * log(m,2)
      BIC
   } else if (measure=="calB") {
      n = (length(true)-length(true)%%10)/10 # binwidth N/10, see Ferri (2009)
      if (length(true)<10) {
         n = length(true)%%10
         warning("Too little trials for bins of width 10 in calB. I used a binwith of", n)       
         }
      f = ifelse(n > 1, SMA(true, n=n), mean(true))
      p = ifelse(n > 1, SMA(estimate, n=n), mean(estimate))
      calB = sum(abs(p[!is.na(f)]-f[!is.na(p)])) / m # see Caruana & Niculescu-Mizil (2004)
      1 - calB
   } else if (measure=="calL"){ # see Flach (2012)
      estimate = round(estimate,2)
      if(length(estimate) == length(unique(estimate))) {
         warning("No ties for segmentation in calL; calL=MSE in this case") }
      T = data.table(
         f = true,
         p = estimate,
         s = factor(estimate, labels=unique(estimate))
         )
      setkey(T,s)
      calL = 1/length(true) * sum( T[, .N * (mean(p) - mean(f))^2 , by=s]$V1 ) # Flach? p. 76
      1 - calL
   } else if (measure=="ACC"){
      d = 0.5 # decision rule threshhold
      estimate = ifelse(estimate>d,1, ifelse(estimate<d,0, sample(0:1,1)))
      mean(estimate==true) 
   } else if (measure=="MSE"){ #also: Brier score/Brier loss
      MSE = mean((true-estimate)^2)
      1 - MSE
   } else if (measure=="AUC"){ #see ROCR-Package http://rocr.bioinf.mpi-sb.mpg.de/
      true = factor(true, levels=0:1, ordered=T)
      if(length(unique(true)) == 2) {
         T = prediction(estimate, true)
         as.numeric(performance(T, "auc")@y.values)
         } else {
            NA
            }
   } else if (measure=="MAE"){
      MAE = mean(abs(true-estimate))
      1 - MAE   
   }
}
