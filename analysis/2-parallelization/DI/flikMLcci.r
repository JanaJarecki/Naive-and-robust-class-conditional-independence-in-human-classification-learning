# Function to compute the likelihood P(stimulus|class) according to class-conditional independence (cci)
# P(stimulus|class) = prod_i P(feature_i|class) i = <1,2,3>
library("R.utils")

flikMLcci <- function(x){
   #x := Marginal likelihoods [vector of 3, <P(feature1=1|class),P(feature2=1|class),P(feature3=1|class)>]
   # Initialize
   t_j.c = as.data.table(matrix(x,,3))
   # Calculate P(stimulus|class)
   t_j.c[, intToBin(0:7) := list(
      a = (1.-V1) * (1.-V2) * (1.-V3),   #stimulus "000"
      b = (1.-V1) * (1.-V2) * V3,        #stimulus "001"
      c = (1.-V1) * V2  * (1.-V3),       #stimulus "010"
      d = (1.-V1) * V2 * V3,             #stimulus "011"
      e = V1 * (1.-V2) * (1.-V3),        #stimulus "100"
      f = V1 * (1.-V2) * V3,             #stimulus "101"
      g = V1 * V2 * (1.-V3),             #stimulus "110"
      h = V1 * V2 * V3)]                 #stimulus "111"
   #Return only P(stimulus|class)
   t_j.c[, intToBin(0:7), with=F]
}