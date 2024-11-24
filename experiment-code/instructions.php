<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<HTML><HEAD><META HTTP-EQUIV="Content-Type" CONTENT="text/html">
<TITLE>instructions</TITLE> 
<script src="http://www.jonathandnelson.com/jMisc.js"></script>
<script src="plankton.js"></script>
<link rel="stylesheet" type="text/css" href="http://www.jonathandnelson.com/jStyleNew.css">
<script>

///////////////////////////////////////////////////////////////////
//Functions
function nextUrl() {
   if(type.substring(0,3)!='did'){
      //uncomment this if you want to have them click multiple times
      clickedEnough =true;
      //clickedEnough= (tailClicks>=minClicks || !relevance.tailRelevant) & (eyeClicks>=minClicks || !relevance.eyeRelevant) & (clawClicks>=minClicks || !relevance.clawRelevant) ;
      if( clickedEnough ) { 
         window.location=experimentUrl;  
      }
      else { var pleaseClickAlert= getC(cPleaseClick,lang)  +minClicks  +getC(cTimes,lang) ;
         alert(pleaseClickAlert);
      };
   ;}
   else if(type.substring(0,3)=='did'){
      //refers to 'familiarize.php', from there mock.php is called
      window.location=experimentUrl;
   ;}
};   

function updateStim() {
		//html element id='tail claw eye'
		//element has value fine,blunt conn,orig fem,male
		var ppic= './images/n_images/' ;
		ppic= ppic + document.getElementById("tail").value;
		ppic= ppic + document.getElementById("eye").value;
		ppic= ppic + document.getElementById("claw").value + 'jpg';
		document.getElementById("stim").src= ppic;
};

function switchFeatValue(featID, ver1, ver2) {
   featSrc= document.getElementById(featID).value ;
   a= featSrc.lastIndexOf('/')+1;
   currentFeat= featSrc.substring(a);
   if (currentFeat == ver1)       { document.getElementById(featID).value= ver2 ; }
   else if (currentFeat == ver2)  { document.getElementById(featID).value= ver1 ; }
   else {  alert('problem in switchFeature(featID)  '  +document.getElementById(featID).src ) }
};



///////////////////////////////////////////////////////////////////
//Variables
<!--
var tt = location.href;
if (tt.substring(tt.length-6,tt.length-3)=='sal') {
//disp('show some text-instruction and wait for button to be pressed');
//n read the language..and load arrows_EN.png(or arrows_DE.png)
//n instead of the plankton..disable klicking then
};


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

//randomization depending on experimental type
if( (type.substring(0,3)=='rwa') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2') ) { //16 digit input
	if(reqInfo=='_') {
     infoThisSubj= randomizeInfo_j(infoEachSubj[reqVer]);
	   infoThisSubj= infoEachSubj[reqVer];
	   infoThisSubj= infoThisSubj.join(",");
	   //document.writeln(infoThisSubj);
	} else {
		infoThisSubj= reqInfo.split(",");
		//infoThisSubj= infoThisSubj.join(",");
    infoThisSubj= randomizeInfo_j(infoThisSubj) ;
		//alert(infoThisSubj +' ' +typeof(infoThisSubj));
   }
} else { //7 digit input
	if(reqInfo=='_') {
	   //we messed this up with quick fix for klmn 
	   infoThisSubj= randomizeInfo_n(infoEachSubj[reqVer]);
	   infoThisSubj= infoEachSubj[reqVer];
	   infoThisSubj= infoThisSubj.join(",");
	   //document.writeln(infoThisSubj);
	} else {
		//we messed this up with quick fix for klmn
		infoThisSubj= reqInfo.split(",");
		//infoThisSubj= infoThisSubj.join(",");
		infoThisSubj= randomizeInfo_n(infoThisSubj) ;
		//alert(infoThisSubj +' ' +typeof(infoThisSubj));
	};
};

//next page will be a page to familiarize w/ features only if type==did
if(type.substring(0,3)!='did') var experimentUrl='mock.php';
else if(type.substring(0,3)=='did')  var experimentUrl='familiarize.php';



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
if(type.substring(0,3)=='did' || type.substring(0,3)=='oe2' || type.substring(0,3)=='rwa') {
   //var currentURL = document.URL;
   experimentUrl='familiarize.php'  +'?reqVer=_&reqSubjID=' +'<?php echo $subjID; ?>'  +'&reqInfo='  +infoThisSubj  +'&reqLang=' +lang  +'&reqType='  +type ;
   //experimentUrl =currentURL;
} else if(type.substring(0,3)=='sal') {
  experimentUrl= experimentUrl  +'?S:<?php echo $subjID; ?>'  +'?info:'  +infoThisSubj  +',' +lang  +','  +type  +'?hist:';
}

// document.writeln("\n<br> variable experimentUrl " +experimentUrl ) ;  


// alert('Type of infoThisSubj is ' +typeof(infoThisSubj) +'\n'
//	+'Content infoThisSubj is ' +infoThisSubj);
// this object is used to alert the subject to only the features that matter
var relevance= new planktonObject(infoThisSubj.split(","));

var verbalDescriptor= '';
if (lang=='en')  {verbalDescriptor= relevance.verbalDescriptor; }
if (lang=='de')  {verbalDescriptor= relevance.verbalDescriptorDe; }
if (lang=='all') {verbalDescriptor= relevance.verbalDescriptor  +' '  +relevance.verbalDescriptorDe; }

//-->
</script>
</HEAD>









<body class='darker'>
<table class='pageTable'>
<tr><td>
<table>
<tr><td style="vertical-align:top">
   <?php
      // Open file $subjFName and add $earlyTextForSubjF, e.g. nothing, to it.
      // If file already exists, delete existing content
      //   and append its initial content to overwrite.txt
      $subjFName='../data/subject'.$subjID.'.txt' ;
      // this could be any text, but we just want nothing
      $earlyTextForSubjF = "" ;
      $overwriteFName= '../data/overwrite.txt' ;         
      // check that file exists, etc.
      $subjFExists= file_exists($subjFName) ;
      $subjFWritable= is_writable($subjFName) ;
      $subjFSize= filesize($subjFName) ;
      if (!$subjFExists) { echo "\n the file $subjFName does not exist.<br>\n"; }
      if (!$subjFWritable) { echo "\n the file $subjFName is not writable.<br>\n"; }
      //echo "\n file $subjFName is size $subjFSize.<br>\n";        
      // do stuff with file
      if ($subjFExists && $subjFWritable) {
         $subjFHandle= fopen($subjFName, 'a+') ;
         if ($subjFSize>1) {
           //echo "\nFile $subjFName already exists, $subjFSize chars.  Appending its contents to overwrite.txt<br>\n";
           $overwriteFHandle= fopen($overwriteFName, 'a') ;
           $existingContent= "\nContent from $subjFName:\n" . fread($subjFHandle, $subjFSize) ."\n" ;
           //echo fread($overwriteFHandle, $subjFSize);
           fwrite($overwriteFHandle, $existingContent) ;  
           // now try to clean out initial subj file, then reopen it to append
           fclose($subjFHandle);
           $subjFHandle= fopen($subjFName, 'w');
           fwrite($subjFHandle,' ');
           fclose($subjFHandle);
           $subjFHandle= fopen($subjFName, 'a+') ;
         }	
         fwrite($subjFHandle, $earlyTextForSubjF) ;
         fclose($subjFHandle); 
      }
      else  {
         echo "Did nothing with file $subjFName<br>\n";
      }
   ?>
   
   
<form>
	<input type='hidden' name='tail' id='tail' value='fine5.'>
	<input type='hidden' name='eye'  id='eye'  value='male5.'>
	<input type='hidden' name='claw' id='claw' value='orig5.'>
</form>


<p>
<script>
	//General instruction text
	writeC(cPleaseWriteSnum,lang);
	document.writeln(" S:<?php echo $subjID; ?>\n<br>");
</script> 
 
<p style="margin-top:0pt;">
<script>
		writeC(cThanks_n,lang);
		document.writeln("<br><br>");
		// type==sal
		if(type.substring(0,3)=='sal') {
			 if (lang=='en') { 
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrowsEn.png' align='top'>");
			 }
			 if (lang=='de') { 
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrowsDe.png' align='top'>");
			 }
			writeC(cStudyInvolves_n,lang);
		};
		// type==did
		if(type.substring(0,3)=='did' || type.substring(0,3)=='oe2') {
			 document.write("<table><tr><td width='40%'  align='center' valign='top'>");  //JJ layout table
			 if (lang=='en') { // arrows
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrowsEn.png' height='200'>");
			 }
			 if (lang=='de') { 
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrowsDe.png' height='200'>");
			 }
			 document.write("</td><td align='left'><p>");
			 writeC(cStudyInvolves_j,lang);
			 document.write("</td></tr><tr><td width='40%' height='70px' align='center' valign='center'>"); //smiley feedbacks
				 document.write("<img id='scheme' src='./images/j_images/feedback/happyA.png'></td><td><p>");
				 writeC(cIfYouChoseAright,lang);
			 document.write("</td></tr><tr><td width='40%' height='70px' align='center' valign='center'>");
				 document.write("<img id='scheme' src='./images/j_images/feedback/sadB.png'></td><td><p>");
				 writeC(cIfYouChoseAwrong,lang);
			 document.write("</td></tr><tr><td width='40%' height='70px' align='center' valign='center'>");
				 document.write("<img id='scheme' src='./images/j_images/feedback/happyB.png'></td><td><p>");
				 writeC(cIfYouChoseBright,lang);
			 document.write("</td></tr><tr><td width='40%' height='70px' align='center' valign='center'>");
				 document.write("<img id='scheme' src='./images/j_images/feedback/sadA.png'></td><td><p>");
				 writeC(cIfYouChoseBwrong,lang);
			 document.write("</td></tr></table>");
			 writeC(cRemember,lang);
			 writeC(cFamiliarizeFeatures,lang);
		 };
		 //type==rwa
		 if(type.substring(0,3)=='rwa') {
			 document.write("<table><tr><td width='40%'>");
			 if (lang=='en') { 
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrows_rwaEn.png' align='left' height='200'>");
			 }
			 if (lang=='de') { 
					document.writeln("<img id='scheme' src='./images/j_images/arrows/arrows_rwaDe.png' align='left' height='200'>");
			 }
			 document.write("</td><td><p>");
			 writeC(cStudyInvolves_rwa,lang);
			 document.write("</td></tr></table>")
			 writeC(cRemember_rwa,lang);         
		 };      
		document.writeln("<br><br>");
</script>

   
<!--<br><input type=button id='startButt' value='Start' onClick="javascript:nextUrl()" >-->
	<br><input type=button id='startButt' value='Start' onClick="javascript:nextUrl()" >
	<script>
		if(type.substring(0,3)!='did'){
			document.getElementById('startButt').value= getC(cStartButtonText,lang);
		}
		else if(type.substring(0,3)=='did' || type.substring(0,3)=='oe2'){ //'Next'-button because the text before the familiarize page says 'before starting ...'
			document.getElementById('startButt').value= getC(cNextButtonText,lang);
		}
	</script>
	</td>
	</tr>
	</table>
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
