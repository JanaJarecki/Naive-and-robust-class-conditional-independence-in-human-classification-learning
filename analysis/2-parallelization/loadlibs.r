## load libraries

## set temporary path
.libPaths(c("library",.libPaths()))

## Set mirror
options(repos=structure(c(CRAN="http://stat.ethz.ch/CRAN/")))

## install packages
install.packages("R.utils")    #integer-binary-conversion
install.packages("data.table") #faster group-wise operations
install.packages("foreach")    #to run parallel processing
install.packages("parallel")   #to detect number of cores
install.packages("doMC")   #to detect number of cores
install.packages("mail")       #to send emails from R
install.packages("MCMCpack")
install.packages("R.utils");           #to convert into binary numbers
install.packages("reshape2");           #to convert into binary numbers