# Function to transform simulation output
#     from wide-format [one column for each parameter combination cons x prior]
#     into long-format [variables cons and prior holding the parameters]
require("reshape2")

flong <- function(DT){ #original data to long format
   #DT :=   data-set
   # Determine if artificial or experimental-experience simulation
   if(1 %in% unique(DT$i)) #simulation data's id starts with 1
      humandata = FALSE else
      humandata = TRUE
   # the next for all simulations
   p_cci <- melt(DT, id.vars=c("i","t","e"), measure.vars=grep("p_cci", names(DT)), variable.name="prior", value.name="p_cci")
   p_cci[, c("prior","delta") := list(sub(".*_prior","",prior),sub("_prior.*","",sub(".*_cons","",prior)))]
   p_cci[, prior := as.numeric(prior)]
   p_c1  <- melt(DT, id.vars=c("i","t","e"), measure.vars=grep("p_c1", names(DT)), variable.name="prior", value.name="p_c1")
   p_c1[,  c("prior","delta") := list(sub(".*_prior","",prior),sub("_prior.*","",sub(".*_cons","",prior)))]
   p_c1[, prior := as.numeric(prior)]

   # for experimental experience
   if(humandata){
      DT <- merge(DT[,c("i","t","e","ch"),with=F], p_cci, by=c("i","t","e"))
      DT <- merge(DT, p_c1, by=c("prior","delta","i","t","e"))
      } else {
   # for artificial experience
      DT <- merge(DT[,c("i","t","e"),with=F],p_cci, by=c("i","t","e"))
      DT <- merge(DT,p_c1, by=c("prior","delta","i","t","e"))
      }
   DT[, "delta" := as.numeric(delta)]
   DT[, "prior" := as.numeric(prior)]
   DT
}

