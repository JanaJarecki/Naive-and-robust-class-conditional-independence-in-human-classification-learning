<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 transitional//EN">
<HTML><HEAD><META HTTP-EQUIV="Content-Type" CONTENT="text/html">
<LINK rel="stylesheet" type="text/css" 
href="some_style.css">
<TITLE>stimulus</TITLE> 

<!-- note that there is a subjID variable in php,
     and also a subjID variable in javascript,
     and a 'subject' field in a form that is passed to the next page.
--> 

<script src="http://www.jonathandnelson.com/jMisc.js"></script>
<script src="plankton.js"></script>

<script>
	<!-- 
	//set this variable early because body refers to it
	var shortcutsOn= 1;
	//disp(mock_start_time);
	//-->
</script>

</HEAD>


<body onkeyup="whichButton(event, shortcutsOn)" style="width:700px">
<!--<div id="i0" style="width: 800px; height: 700px; position: absolute; top: 0; left: 0;">
	 <img id="x" src="./images/n_images/other/x.jpg" alt="" />
</div>-->
<div id="i1" style="width:800px; height:700px; position:absolute; top:0; left:0; frameBorder:0;">
	 <img id="planki" src="" alt="" usemap='#map2' border=0 frameBorder=0/>
</div>
<!--<div id="i2" style="width: 800px; height: 700px; position: absolute; top: 0; left: 0;">
	<img id="noise" src="" 	alt="" usemap='#map2' border=0/>
</div>  
-->
<div id="i3" style="width:0px; height:0px; position:absolute; top:0; left:0; frameBorder:0;" >
	<img id="face" src=""	alt=""  border=0 frameBorder=0/>
</div>
<div id="i3" style="width:0px; height:0px; position:absolute; top:0; left:0; frameBorder:0;" >
	<img id="letter" src=""	alt=""  border=0 frameBorder=0/>
</div>



<!-- -->
<script language="javascript">
<!--

//var trialsBeforeAdvance= 4*trialsBeforeFeedback;
var timeMarkerInfo= '';
<?php
    $test = $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"] ;
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



// get info from url; process values
locnArr= location.href.split("?") ;  
locnArrLength= locnArr.length ;
var recentHistFromUrl= '' ;

if(textFileContents.length==0 && locnArrLength==4) {
   // this is for the beginning of the experiment
   var longArr= locnArr ; 
}
// for trials in which all the info comes from the text file
// the history information in this case is too short
else if(textFileContents.length>0  && locnArrLength==2) {
   var longArr= textFileContents.split("?");
}
// this case is for intermediate trials where the url stores recent history
else if(textFileContents.length>0  && locnArrLength==3) {  
   // preLongArr and recentHistFromUrl should be strings
   var preLongArr= textFileContents;
   recentHistFromUrl= jp('hist', locnArr[2]).join(',') ;
   var preLongArrString= preLongArr + recentHistFromUrl ;
   var longArr= preLongArrString.split('?') ;
   infoIsOk= 1;
	}
// catch errors:
else {
   alert('problem getting information within mock.html');
}

if (preLongArr){ 
	var start_time = preLongArr.split("?")[3].split(",")[0].split("timeExpStart:")[1];
	var now_is = tenthsecs();
	
	needsRecalibrated=0;
	if ((now_is - start_time > time_to_recalibrate*60*10) & 
		(now_is - start_time < (time_to_recalibrate+.5)*60*10)) {
		var needsRecalibrated=1;
		disp('time to recalibrate!'); }
}
//disp(jp('hist', preLongArr[2]))
//hist.join(",").split("timeExpStart:").split(",")[0]
//document.writeln("<br>textFileContents " +textFileContents );



var i=0
var preUrl= longArr[i++];  
var subjID= jp( 'S',    longArr[i++] ) ;  
//alert('javascript subjID '  +subjID );
if(longArr.length==4)  {
   var info=    jp( 'info', longArr[i++] ) ; 
   var type= info.pop();
   var lang= info.pop();
   //document.writeln('<br>type '  +type);
   var hist=    jp( 'hist', longArr[i++] ) ;  
   //document.writeln('<br>hist '  +hist);
}
else  {
   alert('trouble setting vars in mock.html yuiyui: ');
   alert('longArr.length is '  +longArr.length  +', but should be length 4' );
}


document.getElementById("face").style.visibility = "hidden";
document.getElementById("letter").style.visibility = "hidden";




//document.writeln('<div id="i0" style="width: 800px; height: 700px; position: absolute; top: 0; left: 0;">');
//document.writeln('<img id="x" src="./images/n_images/other/x.jpg" alt="" />');
//document.writeln('</div>')
//var t=setTimeout('document.getElementById("x").style.visibility = "hidden";',1000);
//n
// document.getElementById("noise").style.visibility = "hidden";
// document.getElementById("planki").src= './images/n_images/other/x.jpg';
 var pl_show_time = milisecs();
// var t=setTimeout('document.getElementById("planki").src= initialPic; document.getElementById("noise").style.visibility = "visible";', 500);
var cc = new Date()


millisecs = cc.getMilliseconds();
secs = cc.getSeconds();
mins = cc.getMinutes();
hours = cc.getHours();


//n some adjustment of the numberformat
if (millisecs<10) { millisecs = '00' +	millisecs}
else if (millisecs<100) { millisecs = '0' +	millisecs}
if (secs<10) { secs = '0' +	secs}
if (mins<10) { mins = '0' +	mins}
if (hours<10) { hours = '0' +	hours}
// this variable shows the time the trial begins
var time_str = '' + hours + mins + secs + millisecs
//disp(cc.getMilliseconds());

var noise_im = './images/n_images/noise_';
var smiley_im = './images/n_images/faces/happy.png';
var frowny_im = './images/n_images/faces/sad.png';
if((type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
	var A_im			= './images/j_images/feedback/A.png';
	var B_im			= './images/j_images/feedback/B.png';
	var smiley_im			= './images/j_images/feedback/happy.png';
	var frowny_im			= './images/j_images/feedback/sad.png';
	var question_im         = './images/j_images/feedback/question.png';
}; 
//n here we should randomize the noise images
// s1 determines the intensity of the noise; 1 low, 2 high
// s2 - a random noise of that intensity
// noise_1_3.png is a low intensity noise image
// noise_2_1.png is a high intensity noise image

var r1 = 2*Math.random();
var r2 = 4*Math.random();

if (r1<1){s1 = 1}
else if (r1<2){s1 = 2}

if (r2<1){s2 = 1}
else if (r2<2){s2 = 2}
else if (r2<3){s2 = 3}
else {s2 = 4}

noise_im= noise_im + s1 + '_' + s2 + '.png';
//disp(noise_im)



var answered= 0;
// trying to avoid two next clicks
var nextAdvancing= 0;
var decTime= -777;
var responseTime= -777;
var nexTime= -777;
var nextStim= '' ;
// I'm not sure if this causes the problem,
//   but I think the problem is with saving,
//   so instead of every 24 trials I'll make it every 101 trials
var textSaveFreq= 24 ;
//var pl_show_time = -777
var time_to_resp = -777
var time_to_next = -777

var time_to_recalibrate = 1000. // time in minutes

var trialsBeforeFeedback= 10000;
// we don't provide feedback after
//   saving results trials because it's screwy
var infoIsOk= 0;

// indicates if we hit 1, for hitting learning criterion in test cases
var hitCritToTest =0;





if ( type=='oed') {
   var numBlurTrials= 99 ;
}
else {
   var numBlurTrials= 9 ;  
}



//n plankton image extension- png or jpg
var im_extens = '.png';
if ((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='rwa') || (type.substring(0,3)=='oe2')){
	im_extens = '.jpg';
	}
	
	

// this object has properties like pa, p1ia, p1ib, ...p3ib, targetAcc
plank= new planktonObject(info) ;
//  get a couple of jHistory objects so you can keep track of
//    both overall and recent performance on the task
var histToDate=  new jHistory(info, hist, 'all',     'all trials') ;
halfTrials= 'last'  +Math.round( histToDate.totalTrials/2 ) ;
var histLastHalf= new jHistory(info, hist, halfTrials, 'last half of trials') ;
var trials= histToDate.totalTrials;

var histRecent= new jHistory(info, hist, 'last300', 'last 300 trials');
var progRpt= '\n<br> How are you doing?  If you continue responding \
              like in the last 300 trials, you would average about ' 
progRpt= progRpt +roundNum(histRecent.subjHypPropCorr*100,1) 
progRpt= progRpt +'% correct.  The optimal strategy achieves about ' 
progRpt= progRpt +roundNum(histRecent.optHypPropCorr*100,1) 
progRpt= progRpt +'% correct.' ;


// JJ moved this up before the next part because clicksAllowed determines the content of the learnCongrats message
// keep track of species chosen, A B,  and feedback, s f
var thisTrial= '' ;
if(aLearningTrial)  {
   var clickOrder= 'vvv';
}
else if(!aLearningTrial)  {
   var clickOrder= '___';
   if ((type.substring(0,3)=='did') || (type.substring(0,3)=='rwa') ){
   clicksAllowed= 3 ;
   }
   else {
   clicksAllowed= 1;
   }
}
else disp('trouble setting clickOrder variable in mock.html');




// we check and see if it's time to move to the vuma study
var planktonFinished= (hist.length-numBlurTrials-2>0) && strContains(hist[hist.length-numBlurTrials-2],'oneClick')
if(trials==1)  { timeMarkerInfo= '&timeExpStart:' + tenthsecs();  }
//if(trials==5)  { alert(alertRealExptNow + alertHard); }
// Because too many popups are annoying, and detract from key info,
//   I am moving alertShortcut, alertPatients, and one alertHard to the FAQ
//if(trials==8)  { alert(alertShortcut); }
//if(trials==38) { alert(alertPatience);  alert(alertHard);  }
//if(trials==68) { alert( '(reminder) ' +alertShortcut); }
//?
if( hist=='' || !strContains(hist.join(','),'oneClick')  ) {
   var aLearningTrial= 1 ;
}
else if( strContains(hist.join(','),'oneClick')) {
   var aLearningTrial= 0 ;
   //alert('hist.length '  +hist.length  );
   if( strContains(hist[hist.length-2],'oneClick')  )  {
      //alert(getC(cLearnCongrats,lang)); 
      if (type=='oed') {
      	  writeC(cLearnCongratsOrig_j,lang);
      }
	  else if ((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')) {
	      alert(getC(cLearnCongratsOrig_j1,lang) +clicksAllowed +getC(cLearnCongratsOrig_j2,lang));
	  }
	  else if (type.substring(0,3)=='rwa') {
	      alert(getC(cLearnCongrats_rwa1,lang) +clicksAllowed +getC(cLearnCongrats_rwa2,lang));
	  }
      else {
      	  //writeC(cLearnCongrats,lang);
      	  if (type=='1100')  { var k=2; var l=2; }
      	  if (type=='2100')  { var k=2; var l=1; }
      	  if (type=='10100') { var k=2; var l=0.2; }
//n      	  if (plank.pa<0.5)  { document.writeln(learnCongrats(lang,k,l)); }
//n      	  if (plank.pa>=0.5) { document.writeln(learnCongrats(lang,l,k)); }
      }
      document.writeln(spacerText);
      // modified May, 2009, to enhance subjects' attention:
      //win1= window.open("alertCongrats.html", "aTestWindow" );
      //win1.focus();
      timeMarkerInfo= '&timeClickStart:' +tenthsecs();
   }   
}
else {
   disp('trouble setting type of trial in mock.html') ;
};






// I moved this up several lines because we need to know P(a) for cLearnCongrats, above
// this object has properties like pa, p1ia, p1ib, ...p3ib, targetAcc
//JJ commented former feature randomization out for dealing with full distribution
	//n everywhere the feature names are changed from xx. to .xx
	//	uncomment this for using the old version with 8-numbers to be inserted

	// isSpeciesa=coinJN(plank.pa);
	// if(isSpeciesa) {
	  // var trueSpecies='A'
	  // if(Math.random()<plank.p1ia) var f1='fine'; else var f1='blunt';
	  // if(Math.random()<plank.p2ia) var f2='.male'; else var f2='.fem';
	  // if(Math.random()<plank.p3ia) var f3='.orig'; else var f3='.conn';
	  // }
	// else if(!isSpeciesa) {
	  // var trueSpecies='B'
	  // if(Math.random()<plank.p1ib) var f1='fine'; else var f1='blunt';
	  // if(Math.random()<plank.p2ib) var f2='.male'; else var f2='.fem';
	  // if(Math.random()<plank.p3ib) var f3='.orig'; else var f3='.conn';
	  // }
	// else {
	  // alert('trouble with species and feature randomization')
	  // }
  
  
// JJ feature chosing with full distribution
plank= new planktonObject(info) ;
isSpeciesa=coinJN(plank.pa);
var f1=''; var f2=''; var f3=''
if(isSpeciesa) {
	  var trueSpecies='A'
	  var featRandN = Math.random()
	  var cumLiksIfA= new Array(8);
		cumLiksIfA[0]= plank.pfmoia-0;
		cumLiksIfA[1]= cumLiksIfA[0]-0+plank.pfmcia-0;
		cumLiksIfA[2]= cumLiksIfA[1]-0+plank.pffoia-0;
		cumLiksIfA[3]= cumLiksIfA[2]-0+plank.pffcia-0;
		cumLiksIfA[4]= cumLiksIfA[3]-0+plank.pbmoia-0;
		cumLiksIfA[5]= cumLiksIfA[4]-0+plank.pbmcia-0;
		cumLiksIfA[6]= cumLiksIfA[5]-0+plank.pbfoia-0;
		cumLiksIfA[7]= cumLiksIfA[6]-0+plank.pbfcia-0;
	  if(featRandN<=cumLiksIfA[0]) {f1='fine'; f2='.male'; f3='.orig';}
	  else if(featRandN<cumLiksIfA[1]) {f1='fine'; f2='.male'; f3='.conn';}
	  else if(featRandN<cumLiksIfA[2]) {f1='fine'; f2='.fem'; f3='.orig';}
	  else if(featRandN<cumLiksIfA[3]) {f1='fine'; f2='.fem'; f3='.conn';}
	  else if(featRandN<cumLiksIfA[4]) {f1='blunt'; f2='.male'; f3='.orig';}
	  else if(featRandN<cumLiksIfA[5]) {f1='blunt'; f2='.male'; f3='.conn';}
	  else if(featRandN<cumLiksIfA[6]) {f1='blunt'; f2='.fem'; f3='.orig';}
	  else if(featRandN<cumLiksIfA[7]) {f1='blunt'; f2='.fem'; f3='.conn';}
	  else {alert
		('trouble with species and feature randomization in mock (jjquertz_A%)' +'\n' +'\n' 
		+'cummulative likelihood for being A, joined as a string, is ' +cumLiksIfA.join("-") +'\n'
		+'The random no. we got is ' +featRandN +'\n'
		+'The type of featRandN is ' +typeof(featRandN) +' (should be number)');
	}
}
 else if(!isSpeciesa) {
	  var trueSpecies='B' 
	  var featRandN = Math.random()
	  var cumLiksIfB= new Array(8);
		cumLiksIfB[0]= plank.pfmoib-0;
		cumLiksIfB[1]= cumLiksIfB[0]-0+plank.pfmcib-0;
		cumLiksIfB[2]= cumLiksIfB[1]-0+plank.pffoib-0;
		cumLiksIfB[3]= cumLiksIfB[2]-0+plank.pffcib-0;
		cumLiksIfB[4]= cumLiksIfB[3]-0+plank.pbmoib-0;
		cumLiksIfB[5]= cumLiksIfB[4]-0+plank.pbmcib-0;
		cumLiksIfB[6]= cumLiksIfB[5]-0+plank.pbfoib-0;
		cumLiksIfB[7]= cumLiksIfB[6]-0+plank.pbfcib-0;
	  if(featRandN<=cumLiksIfB[0]) {f1='fine'; f2='.male'; f3='.orig';}
	  else if(featRandN<cumLiksIfB[1]) {f1='fine'; f2='.male'; f3='.conn';}
	  else if(featRandN<cumLiksIfB[2]) {f1='fine'; f2='.fem'; f3='.orig';}
	  else if(featRandN<cumLiksIfB[3]) {f1='fine'; f2='.fem'; f3='.conn';}
	  else if(featRandN<cumLiksIfB[4]) {f1='blunt'; f2='.male'; f3='.orig';}
	  else if(featRandN<cumLiksIfB[5]) {f1='blunt'; f2='.male'; f3='.conn';}
	  else if(featRandN<cumLiksIfB[6]) {f1='blunt'; f2='.fem'; f3='.orig';}
	  else if(featRandN<cumLiksIfB[7]) {f1='blunt'; f2='.fem'; f3='.conn';} 
	  else {alert
		('trouble with species and feature randomization in mock (jjquertz_B%)' +'\n' +'\n' 
		+'cummulative likelihood for being B, joined as a string, is ' +cumLiksIfB.join("-") +'\n'
		+'The random no. we got is ' +featRandN +'\n'
		+'The type of featRandN is ' +typeof(featRandN) +' (should be number)');
	}
}
else {
	alert('trouble with species and feature randomization in mock')
	}

//n adding numbers at the end of the feature names
if((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
	f1 = f1 + type.substring(3,4);
	f2 = f2 + type.substring(4,5);
	f3 = f3 + type.substring(5,6);
	}
// JJ needs modification
if(type.substring(0,3)=='rwa'){
	f1 = f1 + type.substring(3,4);
	f2 = f2 + type.substring(4,5);
	f3 = f3 + type.substring(5,6);
	}
	
	
	
//n extract feature from the second char of the strings!
var stimShort= f1.charAt(0) +f2.charAt(1) +f3.charAt(1) ;



if(aLearningTrial){
   var tailOn= 1;
   var eyeOn= 1;
   var clawOn= 1;
   var clicksMade= 0;
   var clicksAllowed= 3; }
else if(!aLearningTrial) {
   var tailOn= 0;
   var eyeOn= 0;
   var clawOn= 0;
   // if a feature never changes, make it visible anyway:
   if( !plank.tailChanges ) tailOn= 1;
   if( !plank.eyeChanges )  eyeOn=  1;
   if( !plank.clawChanges ) clawOn= 1;
   var clicksMade= 0;
   if ((type.substring(0,3)=='did') || (type.substring(0,3)=='rwa') ){
   var clicksAllowed= 3 ;
   }
   else {
   var clicksAllowed= 1;
   }
}
else alert('trouble xdqvt in mock.html'); 



var initialPic= './images/';
//n sal, and I think did, and oe2, use other folder with blurry pics
//n not blurry features r always at 5
if((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
	initialPic =initialPic + 'n_images/';
}
if(type.substring(0,3)=='rwa'){
	initialPic =initialPic + 'rwa_images/rwa_';
}
//	if(!(tailOn & eyeOn & clawOn)){
//		f1 = f1.substring(0,f1.length-1) + '5';
//		f2 = f2.substring(0,f2.length-1) + '5';
//		f3 = f3.substring(0,f3.length-1) + '5';
//	}

	
if(tailOn) initialPic= initialPic+ f1; else initialPic= initialPic+'qtail';
if(eyeOn)  initialPic= initialPic+ f2; else initialPic= initialPic+'.qeye';
if(clawOn) initialPic= initialPic+ f3; else initialPic= initialPic+'.qclaw';
initialPic= initialPic + im_extens;


//document.getElementById("noise").style.visibility = "hidden";
//document.getElementById("planki").src= './images/n_images/other/x.jpg';
document.getElementById("planki").src= initialPic ;
//no
//document.getElementById("noise").src= noise_im ;


function updateStim(whichFeat) {
   if (clicksMade<clicksAllowed) {
      // set appropriate boolean to true
      if(whichFeat==1)      { tailOn= 1; clickOrder= charRep( clickOrder, 't', clicksMade ); }
      else if(whichFeat==2) { eyeOn= 1;  clickOrder= charRep( clickOrder, 'e', clicksMade ); }
      else if(whichFeat==3) { clawOn= 1; clickOrder= charRep( clickOrder, 'c', clicksMade ); }
      else disp('problem updating boolean in updateStim in mock.html');

	   //n some changes here
      var disp='./images/'
      if((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
          disp =disp + 'n_images/';
      }
	  if(type.substring(0,3)=='rwa'){disp =disp + 'rwa_images/rwa_'}
	  if(tailOn) { disp=disp+f1;                   } 
      else       { disp=disp+'qtail';              }
      if(eyeOn)  { disp=disp+f2;                   } 
      else       { disp=disp+'.qeye';              }
      if(clawOn) { disp=disp+f3+im_extens;         } 
      else       { disp=disp+'.qclaw' + im_extens; }
      //document.getElementById("stim").src=disp;
		document.getElementById("planki").src= disp; 
      clicksMade= clicksMade+1;  
   }
   else if (answered) {
      alert(getC(cAlreadyChosenSpecies,lang))
   }
   else if (clicksMade>=clicksAllowed) {
      //alert('You have already clicked on the allowed number of features: ' +clicksAllowed);
	  alert(getC(cClickedTooMuch,lang) +clicksAllowed)
   }
} // end updateStim()


//function aa()
//{
//	document.getElementById("planki").src= initialPic; 
//	document.getElementById("noise").src= noise_im; 
//}


function checkAnswer(response) {
	var t_time = milisecs();
	time_to_resp = t_time - pl_show_time
   // there seemed to be a server-side caching or not updating the page problem, wherein
   // the code is checkAnswer('A') but 'a' was still passed sometimes.
   // i try to handle that by enforcing that the response is uppercase
   response= response.toUpperCase() ;
   if(!answered & (clicksMade>0 | aLearningTrial) ) {
//		document.writeln(' <div id="i3" style="width: 0px; height: 0px; position: absolute; top: 0; left: 0;" >');
//		document.writeln(' <img id="face" src=""	alt="" />');
//		document.writeln(' </div>');
		
		
      responseTime= tenthsecs() ;
      decTime= responseTime - startTrial ;

      // keep track of what choice was made, to add to hist later
      if(response=='A') { thisTrial= thisTrial + 'A' ; }
      else if(response=='B') { thisTrial= thisTrial + 'B' ; }
      else { disp('trouble 67ijnmi ih mock.html, function checkAnswer'); }
   
      // set variables according to what is true species
      if(isSpeciesa) { var trueSpecies='A';  var wrongSpecies='B'; }
      else if(!isSpeciesa) {  var trueSpecies='B';  var wrongSpecies='A'; }
      else alert('problem with checkAnswer in mock.html; isSpeciesa is ' +isSpeciesa) ;
			// display true species as letter, if:
			// It's the oe2 type, and a learning trial,
			// or it's the did type, either learning or test (click) phase
            if((!aLearningTrial) && (type.substring(0,3)=='oe2')){
                // (donnot do anything in this case; we donnot want to see the feedback)
            }
			else if((type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')) {
			    // for type did, always give feedback in the test phase
			    // for type oe2, give feedback only in the learning phase.
			    //   (the if condition above should capture test trials for type oe2
				if(isSpeciesa)  { document.getElementById("letter").src= A_im; }
				if(!isSpeciesa) { document.getElementById("letter").src= B_im; }
				document.getElementById("letter").style.visibility = "visible";
				//document.writeln("<script>alert('inside did or learning-phase oe2 case')<--/script>") 
			}
      // check if answer was correct; update accordingly
      if(trueSpecies==response) {
         if ((!aLearningTrial) && (type.substring(0,3)=='oe2') ) {
             document.getElementById("face").src= question_im;
         }
      	 else if (aLearningTrial || (type.substring(0,3)=='oed') || (type.substring(0,3)=='sal' || type.substring(0,3)=='did') || (type.substring(0,3)=='oe2') || (type.substring(0,3)=='rwa')) {
		     document.getElementById("face").src= smiley_im;
         }
         thisTrial= thisTrial + 's' ;
      }
      if(wrongSpecies==response) {
         // for oe2 we do not give feedback in the test phase.
         if ((!aLearningTrial) && (type.substring(0,3)=='oe2')) {
             document.getElementById("face").src= question_im;         
         }
      	 else if (aLearningTrial || (type=='oed') || (type.substring(0,3)=='sal' || type.substring(0,3)=='did')  || (type.substring(0,3)=='oe2') || (type.substring(0,3)=='rwa')) {
		     document.getElementById("face").src= frowny_im; 
         }
         thisTrial= thisTrial + 'f' ;
       }
      if(trueSpecies!=response & wrongSpecies!=response) {
         alert('bogus argument to checkAnswer function: ' +response);
      }
      if (aLearningTrial || (type=='oed') ) {
         document.getElementById('trueSpecies').value= trueSpecies;
      }
      document.getElementById('sayA').disabled= true;
      document.getElementById('sayB').disabled= true;
      answered= 1; 
      // uncomment to display true pic after they decide
      //var truePic= f1 +f2 +f3 +'png';
      //document.getElementById("stim").src=truePic;   
	  document.getElementById("face").style.visibility = "visible";
	  if(trials==15) {
      //n hide the images so the user can read the faq
		document.getElementById("planki").style.visibility = "hidden";
		document.getElementById("face").style.visibility = "hidden";
		document.getElementById("letter").style.visibility = "hidden";
//no	document.getElementById("noise").style.visibility = "hidden";
//		document.getElementById("face").style.visibility = "hidden";
	  }
      nextStim= preUrl;
      nextStim= nextStim + jm('S', subjID)
      document.getElementById("nextLoc").value= nextStim;
   }
   if (clicksMade==0 & !aLearningTrial)  {  ;  
      if(type.substring(1,3)!='rwa'){ alert(getC(cPleaseClickFeature,lang)) ; }
      else                          { alert(getC(cPleaseClickFeature_rwa,lang)) ; }
   }
} 


function nextTrial() {
	// if the learning phase has successfully finished
   if(planktonFinished) { 
   	//document.getElementById('whatPageNext').value='vuma' ; 
   	//alert(alertVuma) ; 
   	document.getElementById('whatPageNext').value='know' ;
   	// you'll add the ms timestamp here +'&msEnd' +millisecs();
   	timeMarkerInfo= '&timeClickFinish:' +tenthsecs();
      }
   // I don't want to save results during the click trials
   var isDumpTrial= ( (trials%textSaveFreq==0) && aLearningTrial )  ||  planktonFinished  ;
   // store variables upon choice of participant
   if(answered) { 
      if (!nextAdvancing) {
         nextAdvancing= 1;
         nexTime= tenthsecs() - responseTime ;         
         var t_time = milisecs();
         time_to_next = t_time - pl_show_time
			//n 3 more variables added to the url address: time of the start of the trial
         // time period to the decision and time til next is pressed (since the brginning of the trial)
			//n `time_str` is the exact time, next times are ms intervals
         //n of decision making time compared with the beginning of the trial
         //n and next button pressed compared -II-
         thisTrial= clickOrder +thisTrial +'&' +stimShort +'&' +(trials-0) +'&'+decTime +'&' +nexTime +'&'+ time_str +'&'+ time_to_resp+'&'+ time_to_next
      // hard-code special behavior for one subjID
      // subjID 777 is our test subject, no real subject
		// can use a strong or weak learning criterion according to subject number,
		// perhaps something like the following, where 777 is for testing.
		// decide if the subject has mastered it
		if(subjID=='777') {
		startClick=  1                && histToDate.itemRecentAccuracyOk && !strContains(hist.join(','),'oneClick') ;
		//startClick=  1                           && true && !strContains(hist.join(','),'oneClick') ;
		}
		else {
		// as criterion for learning success require 
		// * 98% of last 200 trials, and
		// * 100% of last 5 of every stimulus type
		// option: 
		// you may require histToDate.itemAccuracyOk, for 19/20 for all stimuli
			startClick=  (histToDate.propLast200>=.98) && histToDate.itemRecentAccuracyOk && !strContains(hist.join(','),'oneClick') ; 
		}
		 //startClick=  (histToDate.propLast100>=.95) && histToDate.itemRecentAccuracyOk && !strContains(hist.join(','),'oneClick') ; 
        if(startClick || hitCritToTest==1) {
            thisTrial= thisTrial + '&oneClick'
         }
         // here I am trying to add time info, tenthsecs for beginning of expt, etc.
         thisTrial= thisTrial + timeMarkerInfo ;
         thisTrial= thisTrial +',' ;
         if(trials==1) {
            document.getElementById("thisTrialAppend").value= location.href + thisTrial ; 
            document.resultsForm.submit() ;
         }
         else if( trials>1 && isDumpTrial ) {
         	 document.getElementById("thisTrialAppend").value= recentHistFromUrl + thisTrial ;
         	 document.resultsForm.submit() ;
         }
         else if(trials>1 && !isDumpTrial ) {  
         	 updatedRecentHist= recentHistFromUrl + thisTrial ;
         	 updatedRecentHist= updatedRecentHist.split(',') ;
                 nextStim= nextStim + jm('hist', updatedRecentHist) ;
                 document.getElementById("nextLoc").value= nextStim;
         	 location=document.getElementById('nextLoc').value ; 
         	 // don't submit the form because you keep the info in the url
         }
         else {
            alert('trouble setting thisTrialAppend in mock.html');
         }
      }
   }  
   else if (!answered) {
		if (!hitCritToTest){
				if ((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')) { alert(getC(cPleaseChooseSpecies,lang)) ;  }
				if (type.substring(0,3)=='rwa') { alert(getC(cPleaseChooseSpecies_rwa,lang)) ; }
			}
	}
}
//-->
</script>


<!--<p class='tiny'  style='margin-top: 0pt; text-align: center;' > &nbsp;-->
<script>
<!--  
if( (trials>=trialsBeforeFeedback) && infoIsOk ) {  
	msg= trials  +' trials' ;
        avg= '';
        avg= avg + histToDate.accuracy  +'% overall, ' 
        avg= avg + histLastHalf.accuracy  +'% last half.' 
	msg= msg + ', '  +avg ;  
	//msg= msg + '&nbsp;  Goal: '  +roundNum(plank.targetAcc*100,1)  +'% ' ;
	msg= msg + '</p>' ;	
	// *NEVER GIVE PERCENT CORRECT INFORMATION*
	// *MODIFICATION MADE 24 JAN 2008*
	// This should be present, when matching Experience Matters experiments
	document.writeln(msg) ;  
}

//document.writeln("\n<br>lang: " +lang) ;  

//nif(trials==1)  {
//    document.writeln("<p class='usualLeft'>");
//    writeC(cYourJob,lang); 
//    document.writeln(spacerText); 
//    document.writeln("</p>");
//}
if(trials==15 && !strContains(hist.join(','),'oneClick')) {
	document.writeln("<p class='usualLeft'>");
	if(type.substring(0,3)=='rwa'){
		writeC(cFaq_rwa,lang); 
	}
	if((type.substring(0,3)=='did') || (type.substring(0,3)=='sal') || (type.substring(0,3)=='oe2')) {
      var FaqStartTime =new Date();
      //alert(FaqStartTime);
		writeC(cFaq_j,lang);
      if(event.keyCode==38){
         var FaqEndTime =new Date();
         //alert(FaqStartTime =" End: "  +FaqEndTime);     
      };
	}
	document.writeln(spacerText); 
	document.writeln("</p>");    	
}
if((trials>190) && (trials%100==0) && aLearningTrial ) {
	var feedStr='';
    // feedStr= feedStr+ "<p class='usualLeft'>";
    //document.writeln(progRpt);
    feedStr= feedStr +getC(cHowDoing1,lang);
    feedStr= feedStr +roundNum(histRecent.subjHypPropCorr*100,1) +"%" ;
    feedStr= feedStr +getC(cHowDoing2,lang);
    feedStr= feedStr +roundNum(histRecent.optHypPropCorr*100,1) +"%";
    feedStr= feedStr +getC(cHowDoing3,lang); 
	// adding a quick 'mini faq' to remind subjects to learn multiple features: }{
	//JJ different text for plankton vs rwa
	if(type.substring(0,3)=='rwa'){
		feedStr= feedStr +"\n\n" +getC(cLearnManyFeat_rwa,lang) ;
   }
	else {
		feedStr= feedStr +"\n\n" +getC(cLearnManyFeat,lang) ;
   };
   disp(feedStr);
}
//document.write("<p style='text-align: center'>")

//document.getElementById("planki").src= initialPic; 

//no document.getElementById("noise").src= noise_im; 
document.write("<div style='' id='menue'>");
   document.write("<MAP name='map2'>");
      if(plank.tailChanges && !aLearningTrial)
         //document.write("<area shape='rect' coords='187,585,499,672' href='javascript:if(!tailOn) updateStim(1)'/>") ;
         document.write("<area shape='rect' coords='300,536,422,656' href='javascript:if(!tailOn) updateStim(1)' hidefocus/>") ; //hidefocus hides the black rectangle when clicking on the map-points
      if(plank.eyeChanges && !aLearningTrial)
         //document.write("<area shape='rect' coords='550,177,862,264' href='javascript:if(!eyeOn) updateStim(2)'/>") ;
         document.write("<area shape='rect' coords='642,144,770,266' href='javascript:if(!eyeOn) updateStim(2)' hidefocus/>") ;
      if(plank.clawChanges && !aLearningTrial)
         //document.write("<area shape='rect' coords='734,682,1046,769' href='javascript:if(!clawOn) updateStim(3)'/>") ;
         document.write("<area shape='rect' coords='838,652,962,768' href='javascript:if(!clawOn) updateStim(3)' hidefocus/>") ;
   document.write("</MAP>") ;
document.write("</div>");


var startTrial= tenthsecs(); 
// this is to test the code
//document.writeln('\n<br> ' +histToDate.eachStimAccuracy.join("  .  ")  +'\n<br>' )
//document.writeln('\n<br> ' +hist  +'\n<br>' )
//-->

</script>            
<form name="resultsForm" id="resultsForm" action="appendResults.php" method="post">
	  <!--<p style="text-align: center">-->
	  
	  <input type=hidden  value='Species A '   id='sayA'  size=2  onClick="javascript:checkAnswer('A')" >&nbsp;
	  <input type=hidden  value='Next '  id='nextButt'    size=5  onClick="javascript:nextTrial()" >&nbsp;
	  <input type=hidden  value='Species B '   id='sayB'  size=2  onClick="javascript:checkAnswer('B')" >
      &nbsp;&nbsp;&nbsp;&nbsp;
	  <script>
		document.getElementById('nextButt').value= getC(cNextButtonText,lang);
	  </script>
<!--	  <img id='smiley' src='./images/qface.png' width=0 height=0 alignment=bottom>&nbsp;&nbsp;-->
	  <input type=hidden id='trueSpecies' size=2 disabled=true value='?'>&nbsp;&nbsp;
	  
	  <!--<p>-->
	  <input type=hidden id='nextLoc' name='nextLoc' value='' >
	  <input type=hidden id='thisTrialAppend' name='thisTrialAppend' value='' >
	  <input type=hidden id='subject' name='subject'  value=<?php echo $subjID; ?> >
	  <input type=hidden id='whatPageNext' name='whatPageNext' value='mock'>

</form>


<script>
	//n hide all the elements
	//n its not a good solution cause they still take place under the image
	//if(type.substring(0,3)=='sal' || type.substring(0,3)=='did'){
	//	document.getElementById("sayA").style.visibility = "hidden";
	//	document.getElementById("nextButt").style.visibility = "hidden";
	//	document.getElementById("sayB").style.visibility = "hidden";
	//	document.getElementById("smiley").style.visibility = "hidden";
	//	document.getElementById("trueSpecies").style.visibility = "hidden";
	//}

	//document.getElementById("planki").src= './images/n_images/other/x.jpg'; 
	//var t=setTimeout(aa(),3000);

	//document.getElementById("planki").src= initialPic; 
	//document.getElementById("noise").src= noise_im; 
</script>



</body>
</html>

