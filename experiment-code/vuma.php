<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD><META HTTP-EQUIV="Content-Type" CONTENT="text/html">
<TITLE>Vuma study</TITLE> 
<script src="http://www.jonathandnelson.com/jMisc.js"></script>
<script src="plankton.js"></script>
<link rel="stylesheet" type="text/css" href="http://www.jonathandnelson.com/jStyleNew.css">
</HEAD>
<body>
<table class='pageTable'><tr><td>
<table>
<tr>
<td style="vertical-align:top">
<script>
<!--
<?php
    $test = $HTTP_SERVER_VARS["HTTP_HOST"] . $HTTP_SERVER_VARS["REQUEST_URI"] ;
    echo "var locn= '" . $test . "'\n"  ;
    // get the subject number.  
    // this is kind of a hack because i'm just learning php
    $urlArray= explode("?", $test) ; 
    $subjIDText= $urlArray[1] ;
    $presubjID= explode(":", $subjIDText) ;
    $subjID= $presubjID[1] ;
    //echo "\n alert('subjID ' +'" . $subjID ."') ; \n" ; 
    
    //$fileToOpen= 'test2.txt' ;
    $fileToOpen= '../data/subject'.$subjID.'.txt' ;
    $fileHandle=fopen($fileToOpen,"r");
    if (!$fileHandle) {
        exit("Unable to open file.");
    }   
    // the first character looks like new line, so toss it
    fgetc($fileHandle) ;  
    $fileContents= "'" ; 
    while (!feof($fileHandle)) { 
       $currentChar=fgetc($fileHandle) ; 
       //echo $currentChar ;
       $fileContents= $fileContents . $currentChar ; 
    }
    fclose($fileHandle); 
    echo "var textFileContents= " . $fileContents . "' ;  \n"  ;
?>
locnArr= location.href.split("?") ;  
locnArrLength= locnArr.length ;

// all info should have been written already from mock.php
if(textFileContents.length>0  && locnArrLength==2) {
   var longArr= textFileContents.split("?");
}
else {
   alert('problem getting information within vuma.php');
}

var i=0
var preUrl= longArr[i++];  
var subjID= jp( 'S',    longArr[i++] ) ;  
//alert('javascript subjID '  +subjID );
if(longArr.length==4)  {
   var preInfo=    jp( 'info', longArr[i++] ) ; 
   var type= preInfo.pop();
   var lang= preInfo.pop();   
}
else  {
   alert('trouble setting vars in vuma.php qwerasdf4321: ');
   alert('longArr.length is '  +longArr.length  +', but should be length 4' );
}
document.writeln('<p>');
writeC(cPlankEndStartVuma,lang);
document.writeln(spacerText);
// JJ commented next line out hence the randomization might rely on cc-independent 7-number input
	//info= randomizeInfo(preInfo) ;
  //vuma= new planktonObject(info.split(","));
info= preInfo.toString(",")	//JJ info needs to be defined hence some code afterwards relies on it
if(typeof(info)!='string') {
	alert('Type of info in vuma.php is ' +typeof(info) +', but should be string (q0m2vprn)');
}
vuma= new planktonObject(preInfo);
//alert('Type of preInfo in vuma.php is ' +typeof(preInfo) +' is it an object? Need to make it a string I guess');
//alert('Type of info in vuma.php is ' +typeof(info) +' is it an array? Need to make it a string I guess');


//alert('Type of info in vuma.php is ' +typeof(info) +' should be string I guess');




function p2p(num) {
// proportion to percent
   wnum= Math.round(num*10000)/100;
   if(wnum<100) wnum= '&nbsp;' +wnum;
   if(wnum<10)  wnum= '&nbsp;' +wnum;
   wnum= ' ' +wnum +'%' ;
   return wnum
}
function propGlomFizo(vumaObj,lang) {
// we want % are gloms and % are fizos,
//   in English or in German according to lang
   glomsPerc= p2p(vumaObj.pa);
   fizosPerc= p2p(vumaObj.pb);
   var enText= glomsPerc +" are gloms and " +fizosPerc +" are fizos." ;
   var deText= glomsPerc +" dieser Wesen sind Gloms und " +fizosPerc +" der Wesen sind Fizos." ;    
   // if en, de, or all 
   // set outStr accordingly
   var outStr='';
   if (lang=='en') { outStr= enText; }
   if (lang=='de') { outStr= deText; }
   if (lang=='all') { outStr= '[en:] ' +enText +'; [de:]' +deText; }
   return outStr;
}
function nextUrl() {
   vumaInfo= '?vumaInfo:'  +info.split(",").join("~")
   ranking='&vumaRanking:' +document.getElementById('drink').value +'~'
              +document.getElementById('hula').value +'~'
              +document.getElementById('gurgle').value +'~' ;              
   expl= ' &drinkExplain:' +replChars(document.getElementById('drinkExplain').value) ;
   expl= expl +' &hulaExplain:' +replChars(document.getElementById('hulaExplain').value) ;
   expl= expl +' &gurgleExplain:' +replChars(document.getElementById('gurgleExplain').value) ;   
   var timeMarkerInfo= '&timeExpFinish:' +tenthsecs();        
   document.getElementById('thisTrialAppend').value= vumaInfo+ranking+expl+timeMarkerInfo ;
   document.getElementById('vumaForm').submit() ;         
}
function replChars(inputStr) {
// get rid of characters such as ,&^ and replace them with -
   // I add some space to make sure it doesn't freak out if no text is in inputStr
   inputStr= inputStr+' ';
   wstr= inputStr.replace(/,/g,"- ");
   wstr= wstr.replace(/&/g,"- ");
   wstr= wstr.replace(/~/g,"- ");
   wstr= wstr.replace(/'/g,"- ");
   wstr= wstr.replace(/;/g,"- ");
   wstr= wstr.replace(/"/g,"- ");
   wstr= wstr.replace(/\n/g,"- ");
   wstr= wstr.replace(/<br>/g,"- ");
   wstr= wstr.replace(/<p>/g,"- ");
   wstr= wstr.replace(/<tr>/g,"- ");
   wstr= wstr.replace(/\?/g,"- ");
   return wstr;
}
//-->
</script>
<p>
<p class='headingCenter'>
<script>
writeC(cVumaTitle,lang);
document.writeln('<p>');
writeC(cVumaImagineVisit,lang);
document.writeln(propGlomFizo(vuma,lang));
writeC(cVumaInvisibleMet,lang);
alert(vuma.p1ia);
</script>
<hr>
<p></p>  
<table class='usual' cellpadding=12>
<tr>
<td>&nbsp;</td>
<td>
<script>
writeC(cVumaF1,lang);
</script>
</td>
<td>
<script>
writeC(cVumaF2,lang);
</script>
</td>
<td>
<script>
writeC(cVumaF3,lang);
</script>
</td>
</tr>
<tr><td>
<script>
  writeC(cVumaPropGloms,lang);
</script>
</td><td>&nbsp;&nbsp;
<script>
  document.writeln(p2p(vuma.p1ia))
</script>
</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<script>
  document.writeln(p2p(vuma.p2ia))
</script>
</td><td>&nbsp;&nbsp;
<script>
  document.writeln(p2p(vuma.p3ia))
</script>
</td></tr><tr><td>  
<script>
  writeC(cVumaPropFizos,lang);
</script>
</td><td>&nbsp;&nbsp;
<script>
  document.writeln(p2p(vuma.p1ib))
</script>
</td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<script>
   document.writeln(p2p(vuma.p2ib))
</script>
</td><td>&nbsp;&nbsp;
<script>
   document.writeln(p2p(vuma.p3ib))
</script>
</td>
</tr>
</table>
<hr>
<p>
<script>
writeC(cVumaRemember,lang);
document.writeln(propGlomFizo(vuma,lang));
writeC(cVumaImagineRank,lang);
</script>
<p>
<hr>
<form name='vumaForm' id='vumaForm' method='post' action="appendResults.php" >
<p></p> 
<script>
writeC(cVumaResponseTable,lang);
</script>
<p>
<hr>
<p>
<p>
<input type=hidden name='vumaInfo' id='vumaInfo' value=''>
<input type=hidden name='subject' id='subject' value='<?php echo $subjID; ?>'>
<input type=hidden name='thisTrialAppend' id='thisTrialAppend' value=''>
<input type=hidden id='whatPageNext' name='whatPageNext' value='thanks'>
<script>
writeC(cVumaClickSubmit,lang);
</script>
<input type=button name='submitButton' id='submitButton' value='submit' onClick="javascript:nextUrl()" >
<script>
document.getElementById('submitButton').value= getC(cSubmitButtonText,lang);
</script> 
</form>
</td></tr></table>
<script>
<!--
// we take the info string, split it, join as in 0.3~0.5714~0~0.3~0.7 ...
document.getElementById('vumaInfo').value=info.split(",").join("~");
//alert(document.getElementById('vumaInfo').value)
//-->
</script>
</body>
</html>