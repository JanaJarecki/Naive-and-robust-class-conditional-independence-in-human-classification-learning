# Packages
library(data.table)
library(R.utils)
library(ggplot2)
library(scales)
library(grid)
source("helper-functions/ffit.r")
# Directories
ddir = "../data" #where the data is stored

##############################################################################
# Best-predicting value of delta and prior
figBesPri = list()
figBesDel = list()
figBesPriDel = list()

for (which in 1:2) {
  # Switch between experiment 1 and 2
  if (exists("d")) {
    rm(d)
  }
  # Load data
  dm = fread(file.path(ddir, paste0("study", which, "_simulation.csv")))
  dh = fread(file.path(ddir, paste0("study", which, "_data.csv"))) #human data
  
  # Remove last 200 trials and first trial
  setkey(dm, i)
  dm = dm[dm[, .I[t <= max(t) - 200], by = c("i")]$V1][t > 1]
  setkey(dh, i)
  dh = dh[dh[, .I[t <= max(t) - 200], by = c("i")]$V1][t > 1]
  # Genrate numerical choices
  dm[, ch := ifelse(p_c1 > .5, 1, 0)]
  dh[, ch := ifelse(ch == "A", 1, 0)]
  dh[, i := as.numeric(i)]
  # Rename choice columns 'ch'
  setnames(dh, "ch", "chHum")
  setnames(dm, "ch", "chMod")
  # Combine
  setkey(dm, i, t, e)
  setkey(dh, i, t, e)
  d = dm[dh]
  rm(dh, dm)
  
  # Check for which priors the models make differing predictions
  d[t <= 100, 
    as.character(all.equal(d[t <= 100 & prior == 0, p_c1], p_c1, 
                           tolerance = 0.01)), 
    keyby = prior]
  priors = c(0, d[t <= 100, 
                  all.equal(d[t <= 100 & prior == 0, p_c1], p_c1,
                                      tolerance = 0.01) != TRUE, 
                  keyby = prior][, prior[V1 ==T]])
  d[t <= 100,
    as.character(all.equal(d[t <= 100 & delta == 1, p_c1], p_c1, 
                           tolerance = 0.01)),
    keyby = delta]
  deltas = c(1, d[t <= 100, 
                  all.equal(d[t <= 100 & delta == 1, p_c1], p_c1, 
                            tolerance = 0.01) != TRUE, 
                  keyby = delta][, delta[V1 == T]])
  cat("\n priors ", priors, "\n deltas ", deltas, "\n\n")
  
  # Calculate best combination of delta and prior
  setkey(d, t, i, prior, delta)
  # Round prediction to four digits 57.43 %
  d[, p_c1_4 := round(p_c1, 4)]
  
  # Fit values for full dataset
  df = d[prior %in% priors & delta %in% deltas][, list(
    mse = ffit(chHum, p_c1_4, "MSE", k = 2),
    acc = ffit(chHum, p_c1_4, "ACC", k = 2)
  ),  by = c("i", "prior", "delta")]
  
  # Get maximum fit prior (in case of ties we get duplicate values)
  setkey(df, i, prior, delta)
  # rank the mse
  df[, rank := rank(mse, ties.method = "max"), by = i]
  # highest rank
  max.rank = df[, max(rank)]
  # prior, delta, mse, and acc values
  dm = df[rank == max.rank] 
  
  # In case of ties, select the smallest prior value and report it
  # (which speaks against our hypothesis)
  if (dm[, sum(duplicated(i))] > 0) {
    cat("There are ties in the best-fitting values, for n =",
        dm[, sum(duplicated(i))],
        "people \n")
    
    dm = dm[, .SD[prior == min(prior)], by = i]
  }
  
  # Add participant 2126 (the one with 200 trials we excluded)
  if (which == 1) {
    dm = rbind(dm,
               data.table(
                 i = 2129,
                 prior = 0,
                 delta = 1,
                 mse = NA,
                 acc = NA,
                 rank = NA
               ))
  }
  
  # Plot CCI-prior values of best-fitting prior
  tit = "(d) Model Parameter"
  figBesPri[[which]] <-
    ggplot(dm, aes(
      x = factor(prior, levels = priors),
      y = ..count..,
      group = i
    )) + geom_bar(
      color = "white",
      fill = "grey40",
      width = 1,
      size = .5
    ) + 
    scale_y_continuous("Frequency", breaks = 1:30, expand = c(0, 0)) +
    scale_x_discrete(expression(Prior ~ belief ~ "in" ~ CCI ~ pi), drop = F) +
    theme(
      legend.direction = "horizontal",
      legend.position = "top",
      axis.text.x = element_text(angle = 90, hjust = 1)
    ) + 
    ggtitle(tit)

    # Plot delta values of best-fitting delta
  figBesDel[[which]] = ggplot(dm, aes(
    x = factor(delta, levels = deltas),
    y = ..count..,
    group = i
    )) + 
    geom_bar(
    color = "white",
    fill = "grey40",
    width = .5,
    size = .5
    ) + 
    scale_y_continuous("Number of participants with this value", 
                       breaks = 1:30) +
    scale_x_discrete(expression(Conservativism ~ delta), 
                     drop = F) +
    theme(
      legend.direction = "horizontal",
      legend.position = "top",
      axis.text.x = element_text(angle = 90, hjust = 1)
    ) + 
    ggtitle(tit)
  
  # Plot heatmap of best-fitting CCI-prior and delta
  tit = "(e) Joint Model Parameters"
  figBesPriDel[[which]] = ggplot(dm, aes(
    x = factor(prior, levels = priors), 
    y = factor(delta, levels = deltas))) +
    geom_bin2d(aes(fill = ..count..),
               colour = "white",
               size = .5) +
    scale_y_discrete(expression(Conservativism ~ delta),
                     drop = F,
                     expand = c(0, 0)) +
    scale_x_discrete(expression(Prior ~ belief ~ "in" ~ CCI ~ pi),
                     drop = F,
                     expand = c(0, 0)) +
    scale_fill_gradient("Count", low = "grey", high = "black") +
    theme(
      legend.direction = "horizontal",
      legend.position = "top",
      axis.text.x = element_text(angle = 90, hjust = 1),
      legend.key.height = unit(.5, "lines"),
      panel.grid.major = element_blank()
    ) +
    ggtitle(tit)
  
  # Plot CCI-prior values of second best-fitting prior
  tit = "Second Best Model Parameter"
  ggplot(df[rank == max.rank - 1], aes(
    x = factor(prior, levels = priors),
    y = ..count..,
    group = i
    )) + 
    geom_bar(
      color = "white",
      fill = "grey40",
      width = .5,
      size = .5
    ) + 
    scale_y_continuous("Frequency", breaks = 1:30) + 
    scale_x_discrete(expression(Parameter ~  pi), drop = F) +
    theme(
      legend.direction = "horizontal",
      legend.position = c(.25, .93),
      axis.text.x = element_text(
        angle = 35,
        hjust = .7,
        vjust = .5
        )
      ) + 
    ggtitle(tit)
  
  # 
  # # Plot delta values of second best-fitting delta
  # ggplot(df[rank == max.rank - 1], aes(
  #   x = factor(delta, levels = deltas),
  #   y = ..count..,
  #   group = i
  # )) + geom_bar(
  #   color = "white",
  #   fill = "grey40",
  #   width = .5,
  #   size = .5
  # ) + scale_y_continuous("Number of participants with this value", breaks =
  #                          1:30) + scale_x_discrete(expression(Conservativism ~ delta), drop = F) +
  #   theme(
  #     legend.direction = "horizontal",
  #     legend.position = c(.25, .93),
  #     axis.text.x = element_text(
  #       angle = 35,
  #       hjust = .7,
  #       vjust = .5
  #     )
  #   ) + ggtitle(tit)
  # 
  # # Plot CCI-prior values of third best-fitting prior
  # tit = "Second Best Model Parameter"
  # ggplot(df[rank == max.rank - 2], 
  #        aes(
  #   x = factor(prior, levels = priors),
  #   y = ..count..,
  #   group = i
  # )) + geom_bar(
  #   color = "white",
  #   fill = "grey40",
  #   width = .5,
  #   size = .5
  # ) + scale_y_continuous("Frequency",
  #                        breaks = 1:30) + scale_x_discrete(expression(Parameter ~ pi),
  #                                                          drop = F) + theme(
  #                                                            legend.direction = "horizontal",
  #                                                            legend.position = c(.25, .93),
  #                                                            axis.text.x = element_text(
  #                                                              angle = 35,
  #                                                              hjust = .7,
  #                                                              vjust = .5
  #                                                            )
  #                                                          ) + ggtitle(tit)
  # 
  # # Plot delta values of third best-fitting delta
  # ggplot(df[rank == max.rank - 2], aes(
  #   x = factor(delta, levels = deltas),
  #   y = ..count..,
  #   group = i
  # )) + geom_bar(
  #   color = "white",
  #   fill = "grey40",
  #   width = .5,
  #   size = 1.1
  # ) + scale_y_continuous("Number of participants with this value", breaks =
  #                          1:30) + scale_x_discrete(expression(Conservativism ~ delta), drop = F) +
  #   theme(
  #     legend.direction = "horizontal",
  #     legend.position = c(.25, .93),
  #     axis.text.x = element_text(
  #       angle = 35,
  #       hjust = .7,
  #       vjust = .5
  #     )
  #   ) + ggtitle(tit)
  
}