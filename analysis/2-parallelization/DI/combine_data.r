# Combine or read data
# This file saves simulated data sets as DI1_simulation.csv or DI2_simulation.csv for experiment 1 or 2
# It takes as input the simulation output files in the data-folder, named 1.csv, ..., 16.csv 
# 
# Load packages

library("data.table")      #for data handling
source("flong.r")          #custom function to make  simulation into long format
ddir = "../4-Data"


###############################################################################################################
# Combine data from simulations
###############################################################################################################
# Read in csv-files from the simulation
# names 1.csv, 2.csv, ...., n.csv
n = 16                           #how many files? 
d = NULL                         #initialize
for (i in 1:n) d = rbind(d, read.table(file.path(ddir,paste0(i,".csv")), sep=";", head=T))
d$cores = NULL                   #delete cores variable
d$ch = 0                         #generate empty choice variable
d = flong(as.data.table(d))      #make long format
d[, prop.table(table(substr(e,4,4)))]    #check if class frequency is right for DI1 or DI2 (see folder "1-Design")


# Save (substitute 'rbind(d,d2)'' by 'd' if d is first simulation)
write.table(d, file.path(ddir,"DI2_simulation.csv"), sep=";", row.names=F, col.names=T)


# If this data is from simulating ADDITIONAL (not initial) set of parameters, combine with existing simulation
# d2 = fread(file.path(ddir,"DI1_simulation.csv")) #uncomment if d is first simulation, i.e. no existing simulation
# write.table(rbind(d,d2), file.path(ddir,"DI1_simulation.csv"), sep=";", row.names=F, col.names=T)



###############################################################################################################
# Combine data for both experiments with human data
###############################################################################################################
set.seed(223)                 #to make binarization in delta. 36 reproducible
d = NULL                      #initialize
for(which in 1:2){            #in 1 for experiment 1, in 1:2 for exp1 and exp2
   dmodel = fread(file.path(ddir,paste0("DI",which,"_simulation.csv")))
   dmodel[, "ch_model" := ifelse(p_c1>.5, "A", ifelse(p_c1<.5,"B", sample(c("A","B"),1)))]
   dhuman = fread(file.path(ddir,paste0("DI",which,"_data.csv")))
   setnames(dhuman,"ch","ch_human")
   setkey(dmodel,i,t,e)
   setkey(dhuman,i,t,e)
   d = rbind(d, merge(dmodel,dhuman)[, "ex" := which])
   rm(dmodel,dhuman)
}
write.table(d, file.path(ddir, "DI_combined.csv"), sep=";", row.names=F, col.names=T)

d1 = fread(file.path(ddir,paste0("DI",1,"_data.csv")))
d2 = fread(file.path(ddir,paste0("DI",2,"_data.csv")))