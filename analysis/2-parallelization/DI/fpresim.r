# Function to assign frequency counts|class
require("data.table")
source("fcounts.r")
fpresim <- function(DT) {
   #DT =:   Data to simulate, which has to hold the columns
   #        i [id]
   #        t [trial]
   #        e [experience as string "100B" ~ "feature1feature2feature3class"]
   if(!all.equal(names(DT)[1:3],c("i","t","e"))) { #check if relevant columns exist
      stop("Column names of DT need to be 'i','t','e'!")}
   # Generate helper columns
   DT[, "c" := substring(DT$e,4,4)]                    #class
   DT[, c("f1","f2","f3") := list(
      paste(substring(DT$e,1,1),"__",DT$c,sep=""),    #feature 1
      paste("_",substring(DT$e,2,2),"_",DT$c,sep=""), #feature 2
      paste("__",substring(DT$e,3,3),DT$c,sep="")     #feature 3
   )]
   setkey(DT,i,t)
   # Fill columns with counts|class
   DT <- fcounts(DT,1,1,"f1")    #count(feature1|classes)
   DT <- fcounts(DT,2,2,"f2")    #count(feature2|classes)
   DT <- fcounts(DT,3,3,"f3")    #count(feature3|classes)
   DT <- fcounts(DT,1,3,"e")     #count(stimuli|classes)
   DT <- fcounts(DT,4,4,"c")     #count(classes)
   # Remove unused helper columns
   cn <- names(DT)[(which(names(DT)=="f3")+1):length(names(DT))]
   setnames(DT, cn, paste("h",cn,sep=""))
   cn <- paste("h",cn,sep="") #update cn
   DT[2:nrow(DT), c(cn) := head(DT[, cn, with=F], -1L)]
   DT[J(unique(i)), c(cn) := list(0L), mult="first"]
}