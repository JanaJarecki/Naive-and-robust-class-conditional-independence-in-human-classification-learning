# Function to calculate frequency counts of experience
# Counts occurrence of features|class
# Counts marginal or joint features
require("data.table")
require("R.utils")

fcounts <- function(DT,first,last,colname){ #count
   # DT :=      data.tabe object incl. experience [string "100B" ~ "feature1feature2feature3class"]
   # first :=   first position in string to count [e.g., 1 for feature1]
   # last :=    last position in string to count  [e.g., 1 for feature1]
   # colname := output column name                [e.g., "f1" for feature1]
   cn = rep(c("___A","___B"),each=(2^(last-first+1))) #get colnames & order
   substr(cn,first,last) <- intToBin(0:(2^(last-first+1)-1)) #get colnames & order
   if(colname=="c") cn = c("A","B") #switch colname for class count
   DT[, c(cn) := 0L] #initialize columns, one for each entry in 'cn'
   DT[, set(DT, i=.I, j=get(colname), value=1L), by=colname] 
   cn = unique(c(DT[,colname,with=F][[1]])) # rewrite 'cn'
   DT[, c(cn) := lapply(.SD, cumsum), by=i, .SDcols=cn]
   }