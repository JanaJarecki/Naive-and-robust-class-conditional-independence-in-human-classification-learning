write.table.outputs = function(x, col.names, append=T) { #write descriptives to a txt-file
   write.table(x, file=file.path(odir,"DI_outputs.txt"),
               append=append, quote=F, row.names=F, col.names=paste("\n", col.names, sep="* "))
   }