# Packages
library(data.table); library(R.utils);
library(ggplot2); library(scales); library(grid);
source("helper-functions/ffit.r")
# Directories
ddir = "../data" #where the data is stored


###############################################################################
# Best-predicting value of delta and prior
figFirLas = list()
for (which in 1:2){ # Switch between experiment 1 and 2
    if (exists("d")) rm(d)
    # Load data
    dm = fread(file.path(ddir,paste0("study",which,"_simulation.csv")))
    dh = fread(file.path(ddir,paste0("study",which,"_data.csv")))

    # Remove last 200 trials and first trial
    setkey(dm,i)
    dm = dm[dm[, .I[t<=max(t)-200], by=c("i")]$V1][t>1]
    setkey(dh,i)
    dh = dh[dh[, .I[t<=max(t)-200], by=c("i")]$V1][t>1]
    # Genrate numerical choices
    dm[, ch := ifelse(p_c1>.5,1,0)]
    dh[, ch := ifelse(ch=="A",1,0)]
    dh[, i := as.numeric(i)]
    # Rename choice columns 'ch'
    setnames(dh,"ch","chHum")
    setnames(dm,"ch","chMod")
    # Combine
    setkey(dm,i,t,e)
    setkey(dh,i,t,e)
    d = dm[dh]
    rm(dh,dm)

    # Check for which priors the models make differing predictions
    d[t<=100, as.character(all.equal(d[t<=100 & prior==0, p_c1],p_c1,tolerance=0.01)), keyby=prior]
    priors = c(0, d[t<=100, all.equal(d[t<=100 & prior==0, p_c1],p_c1,tolerance=0.01)!=TRUE, keyby=prior][, prior[V1==T]])
    d[t<=100, as.character(all.equal(d[t<=100 & delta==1, p_c1],p_c1,tolerance=0.01)), keyby=delta]
    deltas = c(1, d[t<=100, all.equal(d[t<=100 & delta==1, p_c1],p_c1,tolerance=0.01)!=TRUE, keyby=delta][, delta[V1==T]])
    cat("\n priors ", priors,"\n deltas ", deltas, "\n\n")

    # Calculate best combination of delta and prior
    setkey(d,t,i,prior,delta)
    # Round prediction to four digits 57.43 %
    d[, p_c1_4 := round(p_c1,4)]

    # Goodness of fit for first and last j trials
    dfl = data.table() # initialize empty dt
    dfl.critical = data.table()
    for(j in c(5,10,20,40)) { # these are the trials we use
        dfl = rbind(dfl,d[, .SD[max(t)>= 2*j+1 & (t>max(t)-j | t<=(j+1)) & (prior %in% 0:1 & delta %in% deltas)], by=i][, list(prior=prior, i=i, delta=delta, chMod=chMod, chHum=chHum, p_c1_4=p_c1_4, period = ifelse(t<=(j+1), paste("First", j, "trials"), paste("Last", j, "trials")))][, list(mse = ffit(chHum, p_c1_4, "MSE", k=2)),  by=c("i","prior","delta","period")][, .SD[delta==delta[mse==max(mse)]], by=c("i","prior")][, trialsUsed := j])
        dfl.critical = rbind(dfl.critical,d[!grepl("111",e), .SD[max(t)>= 2*j+1 & (t>max(t)-j | t<=(j+1)) & (prior %in% 0:1 & delta %in% deltas)], by=i][, list(prior=prior, i=i, delta=delta, chMod=chMod, chHum=chHum, p_c1_4=p_c1_4, period = ifelse(t<=(j+1), paste0("First\n", j, " trials"), paste0("Last\n", j, " trials")))][, list(mse = ffit(chHum, p_c1_4, "MSE", k=2)),  by=c("i","prior","delta","period")][, .SD[delta==delta[mse==max(mse)]], by=c("i","prior")][, trialsUsed := j])
    }
    
    dfl.diff <- dfl[, list(mse.diff.cciMflex = mse[prior==1] - mse[prior==0]), by = c("trialsUsed","period","i")]

    cat("First vs. last 10 trials:\n")
    cat("CCI fit higher than FLEX for N=\n")
    print(
        dfl.diff[trialsUsed==10, sum(mse.diff.cciMflex > 0), by=period]
        )
    cat("of")
    print(
        dfl.diff[trialsUsed==10, .N, by=period]
        )

    figFirLas[[which]] <- ggplot(dfl.diff[trialsUsed==10], aes(x=period,y=mse.diff.cciMflex))  +
        geom_hline(yintercept=0, color="grey50", size = .5) +
        geom_violin(alpha=.3, size = .5) +
        geom_point(aes(fill=mse.diff.cciMflex <= 0),shape=21,size=1, position=position_jitter(w=.25,h=0),alpha=.7) +
        scale_y_continuous(expression("Fit ("~pi==1~")" - ~ "Fit ("~pi==0~")"), limits=c(-1,1)*dfl.diff[trialsUsed==10, max(abs(mse.diff.cciMflex))], expand=c(0,0)) +
        scale_fill_grey("", labels=c(expression("cci" > "flex"),expression("flex" >= "cci"))) +
        scale_x_discrete("Trial", expand=c(0.1,0), labels = c("First\n10 trials", "Last\n10 trials"))+
        theme(legend.position="top", strip.text=element_blank()) +
        ggtitle("(c) Goodness of Fit")
        
    if(savePlots) ggsavejj(paste0("first_last_trials_DI",which), format="pdf", w=10, h=7)
}