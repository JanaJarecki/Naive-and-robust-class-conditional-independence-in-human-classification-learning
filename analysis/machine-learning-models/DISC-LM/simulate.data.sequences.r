# Simulate data from the environment 1 or environment 2
# For cases where CCI holds and CCI is violated
rm(list=ls(all=T))
# Packages
library("data.table");        #for fast subsetting (see datatable-intro.pdf)
library("R.utils");           #to convert into binary numbers
# Directories
ddir = "../../4-Data"

# 1. Parameter - to change if necessary
e =     2     # which environments to use (int. 1, 2, 3, or 4)
n_i =   1000   # how many agents (int)
n_t =   50    # how many trials (int)
s =     34    # seed for reproducibility (usually 34)
which = e

# Probabilities for environmental statistics in theoretical Simulation - don't change
f = paste(sep="",rep(intToBin(0:7),each=2),c("A","B"))
p = list(
    #p(000A)p(000B)p(001A)p(001B)p(010A)p(010B)p(011A)p(011B)p(100A)p(100B)p(101A)p(101B)p(110A)p(110B)p(111A)p(111B)
    # ex 1
    c(0.280, 0.000, 0.000, 0.110, 0.000, 0.110, 0.000, 0.000, 0.000, 0.110, 0.000, 0.000, 0.000, 0.000, 0.390, 0.000),
    # ex 2
    c(0.270, 0.018, 0.028, 0.084, 0.028, 0.084, 0.000, 0.000, 0.028, 0.084, 0.000, 0.000, 0.000, 0.000, 0.355, 0.021),
    # ex 1 if CCI holds
    c(0.050, 0.098, 0.068, 0.050, 0.068, 0.050, 0.094, 0.025, 0.068, 0.049, 0.094, 0.025, 0.094, 0.025, 0.130, 0.012),
    # ex 2 if CCI does not hold
    c(0.069, 0.076, 0.081, 0.043, 0.081, 0.043, 0.095, 0.024, 0.081, 0.043, 0.095, 0.024, 0.095, 0.024, 0.112, 0.014)
    )

# Generate simulated sequences for Experiment which
set.seed(s)
d = data.table(i=rep(1:n_i,each=n_t), t=rep(1:n_t,n_i), e=sample(f,n_t*n_i,replace=T,p[[which]]))
# # Check if the environment is OK -- see excel sheet "Environmental Properties"
# # P(A), P(B)
# d[, prop.table(table(substr(e,4,4)))]
# # P(stimuli)
# d[, prop.table(table(substr(e,1,3)))]
# # P(A | stimuli)
# d[, prop.table(table(substr(e,4,4), substr(e,1,3)))[1,]/prop.table(table(substr(e,1,3)))]
write.table(d, file.path(ddir,paste0("DI",which,"_simulation_N",n_i,".csv")),sep=";",row.names=F)
