# Checks whether the more frequent class variable was labelled "B" instead of "A"
# If so changes both, the class A probability to 1-(class A)
# and the verbal reports from "B" to "A"

derandomizeClass = function(variable,info){
  # Check whether class is reversed (is the case if in the info variable p(class  A) < .5)
  if (as.numeric(strsplit(info,",")[[1]][1]) < .5) {
    # In text-strings, replace "B" and "b" with "A" and vice versa
    if (typeof(variable)=="character") {
      variable = gsub("\\<a\\>|\\<A\\>","Axxx123",variable) #text answers which...
      variable = gsub("\\<b\\>|\\<B\\>","A",variable)
      variable = gsub("Axxx123","B",variable)
    # In numerical strings, replace the probability with 1-probability
    } else if (max(variable) <= 1) {
      variable = 1-variable
    } else if (max(variable > 1)) {
      stop("'variable' is numeric but not between 0 and 1 (it is > 1, but needs to be a probability)")
    }
  } else {
    variable
  }
}