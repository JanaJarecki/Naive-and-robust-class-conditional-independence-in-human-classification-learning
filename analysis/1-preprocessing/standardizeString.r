# Takes a string of the subject id and returns the same string in a standardized format
standardizeString <- function(string){
  # In the result
  # ?variableName~ = separator for variables; e.g., ?hist~, or ?cause
  # : separates variable names from content; e.g.: hist:xx,xx,xx
  # ,___ separates trials within the learning history part
  # ,tec separates trials within the clicking history part
  # & separates variables within trials in the learning and click part and env estimation part
  # ~ separates values within the estimation part; e.g., fmo~.11~A~1~ ...

  S = string

  # Replace some variables where the '?' is missing
  S = sub("hist:","histLearn:",S)
  S = sub("&oneClick,","?histClick:",S)
  S = sub("&timeExpStart:","&timeExpStart&",S)
  S = sub("&timeClickStart:","&timeClickStart&",S)
  S = sub("&timeClickFinish:","&timeClickFinish&",S)
  S = sub(",Env~","?env:",S)
  S = sub("KnowSpecies","?know:species&",S)
  S = sub("&whichFeatUse","&whichFeatUse&",S)
  S = sub("&explFeatUse","&explFeatUse&",S)
  S = sub("&causalModel","&causalModel&",S)
  S = sub("Diagnostic","&causOrder&Diagnostic",S)
  S = sub("&order","&freqOrder&",S)
  S = paste0(strsplit(S,"&Freq")[[1]][1],"?freq:",sub("~Spec|Spec","?spec:",strsplit(S,"&Freq")[[1]][2]))
  S = sub("&CfEnvcfEnv~","?envCf:",S)

  # Format the probability estimates for counterfactual environment according to the format 
  # e.g., ~ffo~0~A~.75~bmo~0~A~.11~bfc~0~A~.20
  # Store the first half of the string
  strPar1 = strsplit(S,"\\?envCf:")[[1]][1]
  # Generate the newly formatted estimates
    a = unlist(strsplit(strsplit(S,"\\?envCf:")[[1]][2],"~|A")) #original vector
    b = unlist(strsplit(strsplit(S,"\\?envCf:")[[1]][2],"~|A"))[6] #entry w numbers we want to separate
    if(nchar(b)==2) { #if e.g. b="00"
        b1 = substr(b,1,1); b2=substr(b,2,2)
      } else if(nchar(b)==4 & substr(b,2,4)=="100") { #if e.g. b="0100" or "1100"
        b1 = substr(b,1,1); b2="100"
      } else if(nchar(b)==3 & substr(b,1,1)=="0") { #if e.g., b="070" or "075"
        if(a[2]=="0" & a[4]=="0") { #if answered "0" to both frequency-questions before
          b1 = substr(b,1,1); b2=substr(b,2,3) 
        }
      } else {
        stop(paste("Error in splitting the part after envCf: for id=",subjId))
      }
      c = vector(length=12) #combine original and separated vector
      c[seq(1,12,4)] = a[c(1,3,5)] #names, e.g. bmo bfo 
      c[seq(2,12,4)] = as.numeric( c(a[c(2,4)],b1) ) / 100 # class probabilities
      c[seq(3,12,4)] = "A" 
      c[seq(4,12,4)] = as.numeric( c(b2,a[7:8]) ) / 100
      # Assign to second part of the string
      strPar2 = paste0(c,collapse="~")
    # Paste the parts together again
    S = paste0(strPar1,"?envCf:",strPar2)

    # Format the probability estimates for the environment according to the format of ?env
    # e.g., ~fmo~0.11~B~1~fmc~0.28~A~1~ffc~0.11~B~1~bmc~0.11~B~1~bfo~0.39~A~1
    # Stre the first and last part of the string
    strPar1 = strsplit(S,"\\?freq:|\\?envCf:")[[1]][1] #first
    strPar2 = strsplit(S,"\\?freq:|\\?envCf:")[[1]][2] #middle
    strPar3 = strsplit(S,"\\?freq:|\\?envCf:")[[1]][3] #last
      # Generate the nicely formatted middle-part of the string
      a = unlist(strsplit(unlist(strsplit(S,"\\?env:|\\?know:species&")[[1]][2]),"~")) #target-ordered vector
      b = unlist(strsplit(gsub("A","~A~",strPar2),"\\?spec:|~")) #separated entries we want to assign to 'a'
      c = a #combine target and separated vector
      nb = length(b)
      nc = length(c)
      c[seq(2,nc,4)] = as.numeric(b[1:5]) / 100 #overwrite frequency-positions in 'a'
      c[seq(3,nc,4)] =            b[seq(7,nb,2)] #overwrite class
      c[seq(4,nc,4)] = as.numeric(b[seq(6,nb,2)]) / 100 #overwrite class-positions in 'a'
      # Store the middle part of the string
      strPar2 = paste0(c,collapse="~")
    # Paste the parts together again
    S = paste0(strPar1,"?envEst:",strPar2,"?envCfest:",strPar3)

    # Return the string
    S
}