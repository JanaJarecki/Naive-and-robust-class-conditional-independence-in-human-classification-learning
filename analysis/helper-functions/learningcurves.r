# Function plotting the human and model learning curves
sha = c(21,22,22,22,23) #c(21,24,25,23,22)
lty = c(1,3,3,3,5)
lab = c("111: uncritical  ","001  ","010  ","100  ","000  ")
learningcurves = function(plot){
  plot + 
    geom_line(size=.3, position=pj, color="black") +
    geom_point(size=1, position=pj) +
    scale_x_discrete(paste0("Trial (bins of ",bw,")")) +
    scale_y_continuous("Mean accuracy", limits = c(-.01,1.01), breaks = c(0,.5,1), labels=percent) +
    scale_fill_manual("Stimulus", values = col, labels = lab) +
    scale_shape_manual("Stimulus", values = sha, labels = lab) +
    scale_linetype_manual("Stimulus", values = lty, labels = lab) +
    guides(Stimulus = guide_legend(reverse = TRUE)) +
    theme(axis.text.x = element_text(angle = 90, vjust = .3, hjust = 1)) +
    ggtitle(tit)
  }