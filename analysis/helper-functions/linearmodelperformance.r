###############################################################################
# # Performance of a linear model in our environment
# This ilustrates how a linear model cannot learn our task number 1
# Author: Jana B. Jarecki
# Publication: Jarecki, J. B., Meder, B., & Nelson, J. D. (2017). Naïve and Robust: Class-Conditional Independence in Human Classification Learning. Cognitive Science, 42(1), 4-42. https://doi.org/10.1111/cogs.12496
###############################################################################
library(data.table)

m <- matrix(c(
    1,1,1,1,.39,
    0,0,0,1,.29,
    1,0,0,0,.11,
    0,1,0,0,.11,
    0,0,1,0,.11),
    5,
    byrow=T,
    dimnames=list(NULL,c(paste0("f",1:3),"c","freq")))
m <- m[rep(1:nrow(m), m[,5] * 100),1:4]

data <- as.data.table(m)

glm.model <- glm(c ~ f1 + f2 + f3, data=data, family=binomial)
glm.model
data <- unique(data[, pre := predict(glm.model, type="response")])
data[, c.hat := ifelse(pre > .50, 1, ifelse(pre < .50, 0, sample(0:1)))]
round(data,2)