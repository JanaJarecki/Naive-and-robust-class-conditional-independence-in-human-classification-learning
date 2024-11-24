# Read in the subject files and generate three data filed
# DI#_data.csv (holds the choice data for the learning phase)
# DI#_data_knowledge.csv (holds the open-ended knowledge questions)
# DI#_data_estimates.csv (holds the estimates of the occurrency probabilities)
rm(list=ls(all=T))
odir="../../4-Data"
source("preprocessData.r")

for (which in 1:2){
    # Directory from which to load the raw data
    ddir = paste0("E:/09 Data/DI/DI",which,"_Experiment",which)
    # Subject ids for the preprocessing function
    if (which == 1){ ids = 2106:2135
    } else { ids = c(2141,2144,2146:2149,2150:2154,2156,2158:2165,2167,2168,2170:2172,2175,2176,2178,2179)
    }

    # Preprocess
    # Extract learning, clicking, probability estimates, strategy knowledge answers, and start-middle-end timings
    # From the subject files (subject####.txt)
    d = preprocessData(ids)

    # Learning data (the one we simulate with Bayesian models)
    write.table(d$learning, file.path(odir,paste0("DI",which,"_data.csv")), sep=";", row.names=F)
    # Clicking data (not used here)
    write.table(d$clicking, file.path(odir,paste0("DI",which,"_data_click.csv")), sep=";", row.names=F)
    # Data with estimation of probabilities after the experiment
    write.table(d$estimates, file.path(odir,paste0("DI",which,"_data_estimates.csv")), sep=";", row.names=F)
    # Data with open-ended strategy and knowledge answers
    write.table(d$knowledge, file.path(odir,paste0("DI",which,"_data_knowledge.csv")), sep=";", row.names=F)
    # Data with start, middle, end-time of the experiment
    write.table(d$times, file.path(odir,paste0("DI",which,"_data_totalduration.csv")), sep=";", row.names=F)
}