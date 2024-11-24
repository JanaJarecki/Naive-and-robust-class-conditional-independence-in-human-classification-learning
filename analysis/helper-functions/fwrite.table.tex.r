library("xtable")
# Options for xtable
options(xtable.include.rownames = F) #never write row number in table

write.table.tex <- function(x, fn, digits, caption){ #write table to tex-table
   print(xtable(x, digits=digits, caption=caption),
      floating = T,
      file = fn     
      )
}