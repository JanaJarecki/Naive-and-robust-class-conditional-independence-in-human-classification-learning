# Data preparation function
preprocessData <-function(ids){
  # Returns: list with hist and know data
  # subject ids as vector (from:to) or (#,#,#)
  # pool: name of items (000,001,...) as string-vector
  # prs: probabilities such that class A is first as vector
  # ass: probabilities of 000 and 111 (in this very order) = c(.29,.30 for DI1 and DI2)

  # Load functions
  require(data.table)
  source("standardizeString.r") #to make the text-string in the subject-files standardized
  source("derandomizeStimuli.r") #to derandomize stimuli, e.g. fmo to 111
  source("derandomizeClass.r") #to derandomize class from B to A

  # Initialize result
  resEst = NA
  resKno = NA
  resLea = NA
  resCli = NA
  resTim = NA

  # calculate
  for (subjId in ids){
    # Generate file id
    fileId = paste(sep="","subject",subjId,".txt")
    # Read the string
    S = scan(file.path(ddir,fileId), "character", sep="\n")
    # Standardize the string
    S = standardizeString(S)
    S = strsplit(S,"\\?")
    # Strip names from the vectors and assign the to the list as names
    names = sub(" http","http",unlist(lapply(unlist(S), FUN=function(x) { strsplit(x,":")[[1]][[1]] })))
    S = lapply(unlist(S), FUN=function(x) { strsplit(x,":")[[1]][2] } )
    names(S) = names
    # This are the objects and names of the list 'S'
    # http =      the url where the data was stored
    # S =         the subject id
    # histLearn = trial-by-trial learning data history
    # histClick = ten-trial clicking data history
    # env =       environmental parameter
    # know =      answers to the knowledge questions
    # envExt =    estimation of the evironmental parameter
    # envCfEst =  estimation of counterfactual (unseen) environmental parameters

    # Store answers to the probability estimates
    EST = as.data.table(t(matrix(unlist(strsplit(c(S$envEst,S$envCfest),"~")),4)))
    setnames(EST, c("form","estProStim","estCho","estProCla"))    
    EST[, s := derandomizeStimuli(form,S$env)] # Derandomize stimulus variables
    EST[, estProCla := derandomizeClass(as.numeric(estProCla), S$info)] # Derandomize class variable
    EST[, i := S$S] # store subject id
    setcolorder(EST, c("i","s","form","estProStim","estCho","estProCla"))
    # Append results
    if(is.na(resEst)) { resEst = EST } else { resEst = rbind(resEst, EST) }


    # Store answers to the knowledge questions
    KNO = as.data.table(as.list(unlist(strsplit(c(S$know),"&"))[seq(2,12,2)]))
    setnames(KNO,c("maxFreSpe","whichFeaUse","expFeaUse","cauMod","cauOrd","freOrd"))
    KNO[, c("maxFreSpe","whichFeaUse","expFeaUse") := lapply(.SD, derandomizeClass, info=S$info), .SDcol=c("maxFreSpe","whichFeaUse","expFeaUse")]
    KNO[, i := S$S]
    setcolorder(KNO, c("i","maxFreSpe","whichFeaUse","expFeaUse","cauMod","cauOrd","freOrd"))
    # Append results
    if(is.na(resKno)) { resKno = KNO } else { resKno = rbind(resKno, KNO) }


    # Store learning history
    # store start timing
    tSta = strsplit(S$histLearn,"&timeExpStart&|,")[[1]][2] # Store the 2nd entry, holding the start time
    # Generate learning data set
    LEA = unlist(strsplit(S$histLearn,"&timeExpStart&|,"))[-2] #Split the trials up and remove the 2nd entry
    LEA = as.data.table(t(matrix(unlist(strsplit(LEA,"&")),8)))
    setnames(LEA, c("ch","form","t","tdCh","tdNex","tStart","tCh","tNex"))
    LEA[, smiley := substr(ch,5,5)] # Generate smiley/frowny feedback variable
    LEA[, ch := substr(ch,4,4)] # Generate choice variable
    LEA[, ch := derandomizeClass(ch,S$info)]
    LEA[, e := derandomizeStimuli(form,S$env)] # Generate experience variable
    LEA[, e := paste0(e,ifelse(smiley=="s",ch,ifelse(ch=="A","B","A")))]
    LEA[, i := S$S]
    setcolorder(LEA, c("i","t","e","ch","smiley","tdCh","tdNex","tStart","tCh","tNex","form"))
    # Append results
    if(is.na(resLea)) { resLea = LEA } else { resLea = rbind(resLea, LEA) }


    # Store click history
    # store start-to-ckick timing
    tEndLearn = strsplit(S$histClick,"&timeClickStart&|,")[[1]][2] # Store the 2nd entry, holding the start time
    tEndClick = strsplit(S$histClick,"&timeClickFinish&|,")[[1]][11] # Store the 2nd entry, holding the start time
    # Generate clicking data set
    CLI = unlist(strsplit(S$histClick,"&timeClickStart&|&timeClickFinish&|,"))[-c(2,12)] #Split the trials up and remove the 2nd entry
    CLI = as.data.table(t(matrix(unlist(strsplit(CLI,"&")),8)))
    setnames(CLI, c("ch","form","t","tdCh","tdNex","tStart","tCh","tNex"))
    CLI[, smiley := substr(ch,5,5)] # Generate smiley/frowny feedback variable
    CLI[, ch := substr(ch,4,4)] # Generate choice variable
    CLI[, ch := derandomizeClass(ch,S$info)]
    CLI[, e := derandomizeStimuli(form,S$env)] # Generate experience variable
    CLI[, e := paste0(e,ifelse(smiley=="s",ch,ifelse(ch=="A","B","A")))]
    CLI[, i := S$S]
    setcolorder(CLI, c("i","t","e","ch","smiley","tdCh","tdNex","tStart","tCh","tNex","form"))
    # Append results
    if(is.na(resCli)) { resCli = CLI } else { resCLI = rbind(resCli, CLI) }

    # Append timings
    TIM = data.table(i=S$S, tStart=tSta, tLearned=tEndLearn, tEndClick=tEndClick)
    # Append results
    if(is.na(resTim)) { resTim = TIM } else { resTim = rbind(resTim, TIM) }

  }
  
  # Return
  res = list(estimates=resEst,knowledge=resKno,learning=resLea,clicking=resCli,times=resTim)
  return(res)
}