###############################################################################
# Data visualization
# This is a wrapper code to generate the combined data visualization
# Generates: Fig. 5, Fig. 7
# Content: Results of Experiment 1 and Results of Experiment 2
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################
library(ggplot2); library(patchwork)

# Plot parameters
theme_set(theme_minimal(base_size=8))
col = c("black","white","white","white","grey")
source("data-visualization/fig4a_observed_errors.r")
source("data-visualization/fig4b_observed_learning_curves.r")
source("data-visualization/fig4c_observed_predictiveFitDifferences.r")
source("data-visualization/fig4de_observed_bestfitting_parameters.r")

# Print the paraeters that we used
for (which in 1:2){
  if (which==1) {
    priors = c(0, .7, .8, .9, .99, .999999, 1)
  } else {
    priors = c(0, .8,.9,.99,.999999,1)
  }

  # Set titles
  title <- paste("Results of Experiment",which)
  # Combine plots
  fig_ab <- figClaErr[[which]] + figLeaCur[[which]] + plot_layout(widths=c(33,64))
  fig_cde <- figFirLas[[which]] + figBesPri[[which]] + figBesPriDel[[which]]
  # Plot combined plot
  fig_ab / fig_cde + plot_annotation(title = title)
}