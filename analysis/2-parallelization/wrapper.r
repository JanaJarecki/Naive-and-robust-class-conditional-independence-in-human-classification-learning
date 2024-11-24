## load packages, functions, libraries, parameters
rm(list=ls(all=T))
options(warn=-1)
.libPaths(c("library",.libPaths())) #custom lib path
# Libs
library("R.utils")    #integer-binary-conversion
library("data.table") #faster group-wise operations
library("foreach")    #to run parallel processing
library("parallel")   #to detect number of cores
library("mail")       #to send emails from R
# Srcs
source("fsim.r")
source("fprClass.r")
source("fprModels.r")
source("flikMLcci.r")
source("fpresim.r")
source("fcounts.r")


# Parameter values
# doubt/learning = round(exp(seq(0,5,.5)))
# prior_cci = c(0, 10^-6, seq(.1,.9,.1), .99, 1-10^-6, 1)
# random seed = 34

# Experiment switch
# 1 = Exp. 1 (deterministic true class membership)
# 2 = Exp. 2 (probabilistic true class membership)
# 3 = Exp. 1 when CCI holds
# 4 = Exp. 2 when CCI holds
which = 1

## Parameter
P = list(
   e     = which,
   p_cci = c(0, 0.90, 0.99, 1-10^-6, 1), #c(0, 10^-6, seq(.1,.9,.1), .99, 1-10^-6, 1),  #prior on CCI
   delta = round(exp(seq(0,5,.5))),  #conservatism
   h     = 1,            #initial hyper parameter [scalar]
   n_r   = 100000,       #number of MC runs
   s     = 34            #random seed - for replicability
)
sprintf("%.6f",P$p_cci)

## set paths
ddir = "data" # alt: "//mnt//bigdata//janajaData", "../4-Data"
odir = ddir      #output directory
cat("odir: ", odir)


## assign cpu cores
nc = detectCores() #number of cores

## Platform switch
if(.Platform$OS.type == "windows"){
  library("doParallel")
  cl = makeCluster(nc)
  registerDoParallel(cl)
  cat("Registered ", nc, " Cores")
} else if(.Platform$OS.type %in% c("mac","unix")){
  library("doMC")
  #cl = makeCluster(nc) #dont know if doMC needs this
  registerDoMC(cores=nc)
  if(getDoParWorkers()!=nc) { stop("doMC does not work with all cores") }
  cat("Registered ", nc, " Cores")
}



## Data
# Data to simulate
# fn <- file.path(ddir,paste0("DI",which,"_data.csv")) # experimental data
fn <- file.path(ddir,paste0("DI",which,"_data_N200.csv"))
DT = as.data.table(fread(fn, select=c("i","t","e")))
setcolorder(DT,c("i","t","e"))
DT #print 5 rows to check
# Generate counts
DT = fpresim(DT)

## Index data-set by number of cores
ni    = length(unique(DT$i)) #number of individuals
ids   = DT[, max(t), by=i][order(V1)]$i #sort sbj. ids by number of trials
cores = tail(rep(c(1:nc,nc:1),ceiling(ni/nc)),ni) #to assign extreme # of trials to same core: <1,1,2,2,1>
ids   = lapply(1:nc, function(x) ids[cores==x])
for (j in 1:nc){  DT[i %in% ids[[j]], "cores" := j] } # variable cores
setkey(DT,cores,i,t) #sort by cores

# Paralell processing
finalRowOrderMatters = FALSE #FALSE can be faster
system.time(
  foreach(x = 1:nc, .combine="rbind", .inorder=finalRowOrderMatters) %dopar% {
    source("fsim.r")
    source("fprClass.r")
    source("fprModels.r")
    source("flikMLcci.r")
    library("R.utils")
    library("data.table")
    RES = fsim(DT[.(x)], P)
    write.table(RES, file.path(odir,paste(which,".",x,".csv",sep="")), row.names=F, sep=";")
  }
)

sendmail("jarecki.jana@gmail.com", subject=paste0("Project DI -- Simulation Notification -- ID ", which), message="", password="rmail")













rm(list=ls(all=T))
options(warn=-1)
.libPaths(c("library",.libPaths())) #custom lib path
# Libs
library("R.utils")    #integer-binary-conversion
library("data.table") #faster group-wise operations
library("foreach")    #to run parallel processing
library("parallel")   #to detect number of cores
library("mail")       #to send emails from R
# Srcs
source("fsim.r")
source("fprClass.r")
source("fprModels.r")
source("flikMLcci.r")
source("fpresim.r")
source("fcounts.r")
which = 4

## Parameter
P = list(
   e     = which,
   p_cci = c(0, 10^-6, seq(.1,.9,.1), .99, 1-10^-6, 1),  #prior on CCI
   delta = round(exp(seq(0,5,.5))),  #conservatism
   h     = 1,            #initial hyper parameter [scalar]
   n_r   = 100000,       #number of MC runs
   s     = 34            #random seed - for replicability
)
sprintf("%.6f",P$p_cci)

## set paths
ddir = "//mnt//bigdata//janajaData" # alternative: "../4-Data")
odir = ddir      #output directory
cat("odir: ", odir)


## assign cpu cores
nc = detectCores() #number of cores

## Platform switch
if(.Platform$OS.type == "windows"){
  library("doParallel")
  cl = makeCluster(nc)
  registerDoParallel(cl)
  cat("Registered ", nc, " Cores")
} else if(.Platform$OS.type %in% c("mac","unix")){
  library("doMC")
  #cl = makeCluster(nc) #dont know if doMC needs this
  registerDoMC(cores=nc)
  if(getDoParWorkers()!=nc) { stop("doMC does not work with all cores") }
  cat("Registered ", nc, " Cores")
}



## Data
# Data to simulate 
DT = as.data.table(fread(file.path(ddir,paste0("DI",which,"_data.csv")), select=c("i","t","e")))
setcolorder(DT,c("i","t","e"))
DT #print 5 rows to check
# Generate counts
DT = fpresim(DT)

## Index data-set by number of cores
ni    = length(unique(DT$i)) #number of individuals
ids   = DT[, max(t), by=i][order(V1)]$i #sort sbj. ids by number of trials
cores = tail(rep(c(1:nc,nc:1),ceiling(ni/nc)),ni) #to assign extreme # of trials to same core: <1,1,2,2,1>
ids   = lapply(1:nc, function(x) ids[cores==x])
for (j in 1:nc){  DT[i %in% ids[[j]], "cores" := j] } # variable cores
setkey(DT,cores,i,t) #sort by cores

# Paralell processing
finalRowOrderMatters = FALSE #FALSE can be faster
system.time(
  foreach(x = 1:nc, .combine="rbind", .inorder=finalRowOrderMatters) %dopar% {
    source("fsim.r")
    source("fprClass.r")
    source("fprModels.r")
    source("flikMLcci.r")
    library("R.utils")
    library("data.table")
    RES = fsim(DT[.(x)], P)
    write.table(RES, file.path(odir,paste(which,".",x,".csv",sep="")), row.names=F, sep=";")
  }
)

sendmail("jarecki.jana@gmail.com", subject=paste0("Project DI -- Simulation Notification -- ID ", which), message="", password="rmail")