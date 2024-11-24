# Function to carry out the simulation of the DISC-LM fprModels
# It learns both, the belief in class-conditional independence (cci) P(CCI|experience,conservatism)
# and the classification choice P(class1|nextstim;experience,prior-parameter,conservatism-parameter)
# The output is in long format

library("R.utils")           #to convert into binary numbers

fsim <- function(DT,P) {
	# P :=	Parameter:   						[list]
	# 			e 		[environment 1/2]
	#			p_cci [pie: initial belief in cci parameter]
	#			delta [conservatism parameter]
	# 			s 		[random seed]
	# DT :=	experience to simulate 			[data.table]
	#			i 		[individual]
	# 			t 		[trials per individual]

	# 1. Simulate P(CCI|experience;p_cci,delta)
	# Generate column name
   nn = paste("p_cci",sprintf("%.2f",P$delta),sep="_cons")
   nn = paste(rep(nn,each=length(P$p_cci)),sprintf("%.6f",P$p_cci),sep="_prior")
   # Simulate
   DT[, c(nn) := as.list(fprModels(P$n_r, c(h000A,h001A,h010A,h011A,h100A,h101A,h110A,
		h111A,h000B,h001B,h010B,h011B,h100B,h101B,h110B,h111B), c(hA,hB), P$p_cci, P$delta)),
		by=c("i","t")]
	
	# 2. Simulate P(class1|nextstim;experience;p_cci,delta)
	# Generate column name
	cn = nn #update cn
	nn = paste("p_c1",sprintf("%.2f",P$delta),sep="_cons")
	nn = paste(rep(nn,each=length(P$p_cci)),sprintf("%.6f",P$p_cci),sep="_prior")
	# Simulate
	DT[, c(nn) := as.list(fprClass(
		sapply(cn, function(x) get(x)), substr(e,1,3), P$delta, c(h000A,h001A,h010A,h011A,h100A,h101A,h110A,
		h111A,h000B,h001B,h010B,h011B,h100B,h101B,h110B,h111B), c(h1__A,h1__B),	c(h_1_A,h_1_B),
		c(h__1A,h__1B), c(h0__A,h0__B), c(h_0_A,h_0_B),	c(h__0A,h__0B), hA, hB, P$n_r)),
		by = c("i","t")]
	
	# drop hyperparameter columns
	DT[,which(names(DT)=="f1"):which(names(DT)=="hB") := NULL]
	
	return(DT)
}




