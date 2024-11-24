# Derandomizes the stimuli
# Labelling scheme we decided on (DI1 study)
# 111, 39%, 100% A, 91% A,  9%
# 100, 11%,   0% A, 58% A, 58%
# 010, 11%,   0% A, 58% A, 58%
# 001, 11%,   0% A, 58% A, 58%
# 000, 28%, 100% A, 33% A, 67% 

derandomizeStimuli = function(stimuli,environment) {
    # environment is the S$env string, e.g.:"fmo~0.11~B~1~fmc~0.28~A~1~ffc~0.11~B~1~bmc~0.11~B~1~bfo~0.39~A~1"
    # stimuli are the stimuli to be derandomized as vector of strings, e.g.; <"fmo", "fmc", "ffc", ...>
    # Start is that we know that in DI1 p(000) = 0.28, in DI2 p(000) = 0.29 (and this is a unique identifier)
    format000 = tail(strsplit(unlist(strsplit(environment,"~0.28|~0.29")[[1]][1]),"~")[[1]],1)
    result = paste0(
        ifelse(substr(stimuli,1,1) == substr(format000,1,1), 0, 1), #Is the 1st dimension 0?
        ifelse(substr(stimuli,2,2) == substr(format000,2,2), 0, 1), #Is the 2nd dimension 0?
        ifelse(substr(stimuli,3,3) == substr(format000,3,3), 0, 1) #Is the 3rd dimension 0?
        )
    # Return
    result
}