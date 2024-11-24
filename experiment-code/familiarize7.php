<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD><META HTTP-EQUIV="Content-Type" CONTENT="text/html">
<TITLE>familiarization</TITLE> 
<script src="http://www.jonathandnelson.com/jMisc.js"></script>
<script src="plankton.js"></script>
<link rel="stylesheet" type="text/css" href="http://www.jonathandnelson.com/jStyleNew.css">
<script>


///////////////////////////////////////////////////////////////////
//Variables
<!--
var tt = location.href;
if (tt.substring(tt.length-6,tt.length-3)=='sal') {
//disp('show some text-instruction and wait for button to be pressed');
//n read the language..and load arrows_EN.png(or arrows_DE.png)
//n instead of the plankton..disable klicking then
};
//disp(tt.substring(tt.length-6,tt.length-3));


// i'll need to fix this so they click a number of times, over enough minutes, etc.
var tailClicks= 0;
var eyeClicks=  0;
var clawClicks= 0;
<?php
   $minClicks= 10 ;
   echo "\n var minClicks=".$minClicks.";\n" ;
?>;

<?php
	// to use standard probs and the next subject ID
	// http://cnl.salk.edu/~jnelson/stimuli/instructions.php?reqVer=12&reqSubjID=nextID&reqInfo=_
	// 
	// to use specified probs and a specified subject number
	// http://cnl.salk.edu/~jnelson/stimuli/instructions.php?reqVer=asNoted&reqSubjID=777&reqInfo=0.7,0,0.57,0.57,0,1,1
	// 
	// to specify the subject number but use a standard version
	// http://cnl.salk.edu/~jnelson/stimuli/instructions.php?reqVer=12&reqSubjID=nextID&reqInfo=_   
	$reqVer= $_GET['reqVer'];
	$reqSubjID= $_GET['reqSubjID'];
	$reqInfo=   $_GET['reqInfo'];
	$reqLang=   $_GET['reqLang'];
	$reqType=   $_GET['reqType'];
	echo "var reqVer= '" . $reqVer . "' ; \n" ;
	echo "var reqSubjID= '" . $reqSubjID . "' ; \n" ;
	echo "var reqInfo= '"   . $reqInfo   . "' ; \n" ;   
	echo "var lang= '"      . $reqLang   . "' ; \n" ;   
	echo "var type= '"      . $reqType   . "' ; \n" ;  
	//echo "document.writeln('type '  +type); \n";
?>


//get the salience versions
var tailSal =type.substring(3,4);
var eyeSal  =type.substring(4,5);
var clawSal =type.substring(5,6);

//next url: create vars that determine what will be passed on
var infoThisSubj= reqInfo;
var experimentUrl='mock.php';

<?php
	// open file subjIDs.txt to find out what subjID to use
	// the idea is to use the next unique unused subject number
	// subject IDs are handed out 1, 2, 3, etc so we count and use the next number
	$sListFName= '../data/subjIDs.txt' ;
	$sListFExists= file_exists($sListFName) ;
	$sListFWritable= is_writable($sListFName) ;
	$sListFSize= filesize($sListFName) ;
	if (!$sListFExists) { echo "\n // the file $sListFName does not exist.<br>\n"; }
	if (!$sListFWritable) { echo "\n // the file $sListFName is not writable.<br>\n"; }
	echo "\n // file $sListFName is size $sListFSize.<br>\n";
	if ($sListFExists && $sListFWritable) {
	   $sListFHandle= fopen($sListFName, 'a+') ;
	   $existingContent= fread($sListFHandle, $sListFSize)  ;
	   //echo "\n alert('$existingContent');\n" ;
	   $subjectCountToDateArr= explode(",", $existingContent) ; 
	   $subjectCountToDate= count($subjectCountToDateArr) ;
	   //echo "\nalert('subjectCountToDate ".$subjectCountToDate."');\n";
	   // if specified, take the next subject number; else use specified number
	   if ( $reqSubjID == 'nextID' )  {  
		  $subjID= $subjectCountToDate + 1 ;
		  fwrite($sListFHandle, $subjID."," );
	   }
	   else  {
		   $subjID= $reqSubjID ; 
	   }
	   fclose($sListFHandle);	
	}
	else  {
	   echo "failed to create new subject id<br>\n";
	}
?> 
// note that here we try to add language, and expt type, info to 'info'
// experimentUrl= experimentUrl  +'?S:<?php echo $subjID; ?>'  +'?info:'  +infoThisSubj  +',en'  +'?hist:';
// experimentUrl= experimentUrl  +'?S:<?php echo $subjID; ?>'  +'?info:'  +infoThisSubj  +',' +lang  +'?hist:';
experimentUrl= experimentUrl  +'?S:<?php echo $subjID; ?>'  +'?info:'  +infoThisSubj  +',' +lang  +','  +type  +'?hist:';
// document.writeln("\n<br> variable experimentUrl " +experimentUrl ) ;  


// alert('Type of infoThisSubj is ' +typeof(infoThisSubj) +'\n'
//	+'Content infoThisSubj is ' +infoThisSubj);
// this object is used to alert the subject to only the features that matter
var relevance= new planktonObject(infoThisSubj.split(","));

var verbalDescriptor= '';
if (lang=='en')  {verbalDescriptor= relevance.verbalDescriptor; }
if (lang=='de')  {verbalDescriptor= relevance.verbalDescriptorDe; }
if (lang=='all') {verbalDescriptor= relevance.verbalDescriptor  +' '  +relevance.verbalDescriptorDe; };
//-->

////////////////////////////////////////////////////////////////////////////////
//Functions
function nextUrl() {
   clickedEnough= (tailClicks>=minClicks || !relevance.tailRelevant) & (eyeClicks>=minClicks || !relevance.eyeRelevant) & (clawClicks>=minClicks || !relevance.clawRelevant) ;
   if(clickedEnough) { 
   	window.location=experimentUrl;  
   }
   //else { alert('please change each feature at least '  +minClicks  +' times');  }
   else { var pleaseClickAlert= getC(cPleaseClick,lang)  +minClicks  +getC(cTimes,lang) ;
   	alert(pleaseClickAlert);
   }
};


function updateStim() {
        var ppic= './images/n_images/' ;
        ppic= ppic + document.getElementById("tail").value +tailSal +'.';
        ppic= ppic + document.getElementById("eye").value  +eyeSal +'.';
        ppic= ppic + document.getElementById("claw").value +clawSal +'.' + 'jpg';
        document.getElementById("stim").src= ppic;
        //document.writeln("<br>"  +ppic  +"</BR>")
        clickedEnough= (tailClicks>=minClicks || !relevance.tailChanges) & (eyeClicks>=minClicks || !relevance.eyeChanges) & (clawClicks>=minClicks || !relevance.clawChanges) ;
         if(clickedEnough){
         alert(getC(cEndFamiliarizing,lang));
         nextUrl();
         //document.getElementById('startButt').value= getC(cStartButtonText,lang)
   };
};


//html element id='tail claw eye'
//element has value fine,blunt conn,orig fem,male

function switchFeatValue(featID, ver1, ver2) {
   featSrc= document.getElementById(featID).value ;
   a= featSrc.lastIndexOf('/')+1;
   currentFeat= featSrc.substring(a);
   if (currentFeat == ver1)       { document.getElementById(featID).value= ver2 ; }
   else if (currentFeat == ver2)  { document.getElementById(featID).value= ver1 ; }
   else {  alert('problem in switchFeatureValue(featID)  '  +document.getElementById(featID).src )   }
};



function changeTail() { switchFeatValue('tail', 'blunt', 'fine'); tailClicks++; updateStim(); }
function changeEye()  { switchFeatValue('eye',  'fem'  , 'male'); eyeClicks++;  updateStim(); }
function changeClaw() { switchFeatValue('claw', 'conn' , 'orig'); clawClicks++; updateStim(); }
</script>
</HEAD>









<body>

<form>
   <input type='hidden' name='tail' id='tail' value='fine'>
   <input type='hidden' name='eye'  id='eye'  value='male'>
   <input type='hidden' name='claw' id='claw' value='orig'>
</form>

<div id="i1" style="width:800px; height:700px; position:absolute; top:0; left:0; frameBorder:0;">
   <script>
      if(type.substring(0,3)=='did' || type.substring(0,3)=='oe2' || type.substring(0,3)=='sal' ) {
            imageLocText= "<img src='images/n_images/"  +"qtail.qeye.qclaw.jpg'" +"usemap='#map1' border=0 id='stim'>" ;
            document.writeln(imageLocText);
            startFamiliarizingAlert =getC(cStartFamiliarizing,lang) +minClicks +getC(cTimes,lang);
            alert(startFamiliarizingAlert);
            document.writeln("<MAP name='map1'>");
               if(relevance.tailChanges) {
                  document.write("<area href='javascript:changeTail()' shape='rect' coords='300,536,422,656' hidefocus>"); 
               }
               if(relevance.eyeChanges) {
                  document.write("<area href='javascript:changeEye()' shape='rect' coords='642,144,770,266' hidefocus>");
               }
               if(relevance.clawChanges) {
                  document.write("<area href='javascript:changeClaw()' shape='rect' coords='838,652,962,768' hidefocus>");
               }
               updateStim();
           document.writeln("</MAP>");
       };
   </script>
</div>
</p>
 
 
 
<script>
	<!--
	// preload images.  make sure you get the right directory or url
	preloadPlanktonPics_Sal2() ;
	//-->
</script>
</td></tr></table>
</body>
</html>
