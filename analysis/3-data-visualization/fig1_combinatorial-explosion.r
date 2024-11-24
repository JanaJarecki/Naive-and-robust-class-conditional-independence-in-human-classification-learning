###############################################################################
# Data visualization code
# Figure 1
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################
library(ggplot2)

flex = function(x){2^(x+1) - 1}
cci = function(x){2*x + 1}

dflex = data.frame(x=1:8, Parameter = flex(1:8),
                   type="(a) Flexible dependencies")
dcci = data.frame(x=1:8, Parameter = cci(1:8),
                  type = "(b) Class-conditional independence")
d <- rbind(dflex, dcci)

ggplot(d, aes(x=x,y=Parameter)) +
  geom_line() +
  geom_point(size=3, color="white") +
  geom_point() +
  facet_wrap(~type, scales = "free") +
  scale_x_continuous("Number of features", breaks = 1:8) +
  scale_y_continuous("Number of parameters", limits = c(1,513)) +
  theme(aspect.ratio = 1, plot.margin = unit(c(0,7,0,7), "lines"))

ggsave("combinatorialExplosion.png")