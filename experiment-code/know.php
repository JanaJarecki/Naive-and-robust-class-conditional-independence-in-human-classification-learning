
<html>
<body>
<link rel="stylesheet" type="text/css" href="http://www.jonathandnelson.com/jStyleNew.css">
<script src="plankton.js"></script>
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
   alert('problem getting information within know.php');
}
var i=0
var preUrl= longArr[i++];  
var subjID= jp( 'S',    longArr[i++] ) ;  
//alert('javascript subjID '  +subjID );
if(longArr.length==4)  {
   var preInfo=    jp( 'info', longArr[i++] ) ; 
   // here i'm trying to get teh language info:
   var type= preInfo.pop();
   var lang= preInfo.pop();
   var hist= jp( 'hist', longArr[i++] );
}
else  {
   alert('trouble setting vars in know.php qwerasdf4321: ');
   alert('longArr.length is '  +longArr.length  +', but should be length 4' );
}
var myPlanktonObject= new planktonObject(preInfo) ;
infoAboutEnv= myPlanktonObject.testStimInfo ;
stringWithPics= myPlanktonObject.whichStimsStr;
tailSal=type.substring(3,4)
eyeSal=type.substring(4,5)
clawSal=type.substring(5,6)

if ((type.substring(0,3)=='sal') || (type.substring(0,3)=='did')  || (type.substring(0,3)=='oe2') ){
	stringWithPics= stringWithPics.replace(/fine/gi,'n_images/'+'fine'+tailSal);
	stringWithPics= stringWithPics.replace(/blunt/gi,'n_images/'+'blunt'+tailSal);
	stringWithPics= stringWithPics.replace(/fem/gi,'fem'+eyeSal);
	stringWithPics= stringWithPics.replace(/male/gi,'male'+eyeSal);
	stringWithPics= stringWithPics.replace(/orig/gi,'orig'+clawSal);
	stringWithPics= stringWithPics.replace(/conn/gi,'conn'+clawSal);
}
if (type.substring(0,3)=='rwa'){
	stringWithPics= stringWithPics.replace(/fine/gi,'rwa_images/rwa_'+'fine'+tailSal);
	stringWithPics= stringWithPics.replace(/blunt/gi,'rwa_images/rwa_'+'blunt'+tailSal);
	stringWithPics= stringWithPics.replace(/fem/gi,'fem'+eyeSal);
	stringWithPics= stringWithPics.replace(/male/gi,'male'+eyeSal);
	stringWithPics= stringWithPics.replace(/orig/gi,'orig'+clawSal);
	stringWithPics= stringWithPics.replace(/conn/gi,'conn'+clawSal);
}

arrWithPics= stringWithPics.split("~");
numPics= arrWithPics.length-1;
//layouting variables for the page
layoutVspace ="<br><br><br><hr><br>"						//vertical space for layouting html
layoutHspace ="<span style:'margin-left:2cm;'>" //horizontal indent for layouting html

document.writeln("<form name='knowForm' id='knowForm' method='post'  action='appendResults.php'>");



writeC(cClickEndKnowTest_j,lang);	//this needs no modification if we change environments
t(layoutVspace);


if(type.substring(0,3)=='rwa') {
	writeC(cWhichFeatureMoreUseful_rwa,lang);
	t(layoutVspace);
	writeC(cWhichSpeciesMost_rwa,lang);
	t(layoutHspace); writeC(cSelectSpecies_rwa,lang);
}
else{
	writeC(cWhichFeatureMoreUseful_j,lang);
	t(layoutVspace)
	writeC(cWhichSpeciesMost,lang);
	writeC(cSelectSpecies,lang);
};
t(layoutVspace)


function apic(picname) {
   var picStr= dirloc + picname +'.jpg';
   picStr= "\n<img src='./images/" +picStr +"'>" ;
   return picStr
};

// JJ get next page according to randomized order 
// returns an array of strings w/ the names for the next page
// in a random order according to the num input randOrder
function whichKnowNext(randOrder) {
   //the names of the next possible pages are
   nextKnow       =new Array();
   nextKnowTmp    =new Array();
   nextKnowTmp[0] ='knowSpec';
   nextKnowTmp[1] ='knowFreq';
   //the text to display is
   txtKnow        =new Array();
   txtKnowTmp     =new Array();
   txtKnowTmp[0]  =getC(cKnowSpec,lang);
   txtKnowTmp[1]  =getC(cKnowFreq,lang);
   if(randOrder<1/2) { //12
      nextKnow    =nextKnowTmp;     txtKnow =txtKnowTmp;
   } else if(randOrder<1) { //21
      nextKnow[0] =nextKnowTmp[1];  txtKnow[0] =txtKnowTmp[1];
      nextKnow[1] =nextKnowTmp[0];  txtKnow[1] =txtKnowTmp[0];
   } 
   return {nextKnow:nextKnow, txtKnow:txtKnow} ;
};



// JJ setting name of species-to-chose in the drop down menu according to type
if (type.substring(0,3)=='rwa'){
	if(lang=='en')		   { var optionSpeciesA= 'low';     var optionSpeciesB= 'high';}
	else if(lang=='de')	 { var optionSpeciesA= 'niedrig'; var optionSpeciesB= 'hoch';};
} else {                  var optionSpeciesA= 'A';      var optionSpeciesB= 'B';
};

function speciesPropText() {
   var aStr= '';
      aStr= aStr + "\n<option value=''>" +getC(cOptionDefault,lang)
      for(i=1;i<=101;i++) {
         thisPerc= i-1;
         aStr= aStr + "\n<br><option value='" +thisPerc +"A'>" +thisPerc +" %&nbsp;&nbsp;" +optionSpeciesA +",&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +(100-thisPerc) +" %&nbsp;&nbsp;" +optionSpeciesB ;
      }
      aStr= aStr +"\n</select>" ; 
      return aStr;
};

function t(textToWrite) {
   document.writeln(textToWrite);
};

function writeOnePlank(stimulus) {
   var ss= '<br><hr><br>';
   if(type.substring(0,3)=='rwa'){ss= ss+ getC(cOfPlanktonLikeThis_rwa,lang) ;}
   else {ss= ss+ getC(cOfPlanktonLikeThis,lang);}   
   ss= ss+ "\n<select name='" +stimulus +"' id='" +stimulus  +"'>"
   ss= ss+ speciesPropText()
   ss= ss+ '\n<br>'
   ss= ss+ apic(stimulus)
   ss= ss+ '\n<br>';
   return ss;
};

function nextUrl() {
   //alert('inside top of nextUrl() function');
   var ss= infoAboutEnv;
   if((type.substring(0,3)!='did') ){
      ss= ss +'KnowSpecies' +document.getElementById('species').value;
      ss= ss +'PercentA' +document.getElementById('speciesProp').value;
      for(i=0;i<numPics;i++) {
         ss= ss +document.getElementById(arrWithPics[i]).value;	
      };
      ss= ss+ '&'
      ss= ss+ '&whichFeatUse' +document.getElementById('whichFeatUse').value; //usefulness ratings
      ss= ss+ '&explFeatUse'  +document.getElementById('explFeatUse').value;
      ss= ss+ '&' ;
   } 
   else if((type.substring(0,3)=='did') ){ //the same without the percentA question
      ss= ss +'KnowSpecies' +document.getElementById('species').value;
      ss= ss+ '&whichFeatUse' +document.getElementById('whichFeatUse').value; //usefulness ratings
      ss= ss+ '&explFeatUse'  +document.getElementById('explFeatUse').value;
      ss= ss+ '&causalModel'  +document.getElementById('causalmodel').value + orderCausalModel ;//JJ (8/2012) causal reasoning question
      ss= ss+ '&order'  +document.getElementById('order').value //JJ (8/2012) knowMore question ordering
      ss =ss+ '&';
   } ;
   // existing code
   document.getElementById('thisTrialAppend').value= ss ;
   document.getElementById('knowForm').submit() ;         
};

// If it is not did, then standard know.php page, 
//   where we ask for posterior probabilities given each image.
if((type.substring(0,3)!='did')){
   var dirloc='' ;
   t('<br>')
   // this is just a minor switch for where to find the text, according to if rwa or not
   if(type.substring(0,3)=='rwa') { writeC(cPropEachSpecies_rwa,lang);}
   else                           { writeC(cPropEachSpecies,lang)    ;}
   t("\n<select name='speciesProp' id='speciesProp'>")
   t(speciesPropText());
   t('<br><br><br>') ;  
   for(jj=0;jj<numPics;jj++) {
      thisImage= arrWithPics[jj];
      t(writeOnePlank(thisImage));
   }
   t("<br>");
};


function validateForm(){
	//proceeds to nextUrl if all fields are filled out, alert otherwise
	//too lazy to make that a loop :)
	if((type.substring(0,3)=='did')){
		var x =document.forms["knowForm"]["whichFeatUse"].value ;
		if (x==null || x==" ") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichFeatureMoreUseful,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		x =document.forms["knowForm"]["explFeatUse"].value ;
		if (x==null || x==" ") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertExplFeatureUse,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		x =document.forms["knowForm"]["species"].value ;
		if (x==null || x=="") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichSpeciesMost,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		} 
		x =document.forms["knowForm"]["causalmodel"][0].checked ;
		y =document.forms["knowForm"]["causalmodel"][1].checked ;
		if (x==false && y==false) {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichCausalModel,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		} else {
			nextUrl();
		}
	} else {
	    // this is the error checking that we want for sal, oe2, etc
	    //alert('we are inside the else case of the validateForm() function, where we want to be for oe2, sal, etc')
		var x =document.forms["knowForm"]["whichFeatUse"].value ;
		if (x==null || x==" ") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichFeatureMoreUseful,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		x =document.forms["knowForm"]["explFeatUse"].value ;
		if (x==null || x==" ") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertExplFeatureUse,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		x =document.forms["knowForm"]["species"].value ;
		if (x==null || x=="") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichSpeciesMost,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		x =document.forms["knowForm"]["speciesProp"].value ;
		if (x==null || x=="") {
			ss= getC(cForgotToAnswer,lang) +getC(cAlertWhichSpeciesProp,lang) +getC(cPleaseAnswer,lang);
			alert(ss);
			return false;
		};
		n = numPics;
		arr =arrWithPics;
		for(jj=0;jj<n;jj++){
			var x =document.forms["knowForm"][arr[jj]].value;
			if (x==null || x=="") {
				ss= getC(cForgotToAnswerPic1,lang) +(roundNum(jj+1,1)) +getC(cForgotToAnswerPic2,lang);
				alert(ss);
				return false;
			}
		}
		nextUrl();
	}
};

// JJ, added 1. Aug. 2012 to ask about underlying causal model;
// only for 'did' or 'oe2' type experiment
// if((type.substring(0,3)!='did') && (type.substring(0,3)!='oe2')) {
if((type.substring(0,3)!='did')) {
   writeC(cFinishSubmit,lang);
} 
//else if((type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
else if((type.substring(0,3)=='did')){
		writeC(cWhichCausalModel,lang);
		t("<br><ul style='margin-bottom:-1eM;'>")
		//randomizing the order of the answer possibilities
		if(Math.random()>=0.5){
			writeC(cSelectInference,lang); t('<br>'); writeC(cSelectDiagnostic,lang);
			var orderCausalModel = 'InferenceFirst';
		}	else {
			writeC(cSelectDiagnostic,lang); t('<br>'); writeC(cSelectInference,lang);
			var orderCausalModel = 'DiagnosticFirst';
		}
		t('</ul>');
		t(layoutVspace);
		//randomize the order of the questions
   knowOrder   =Math.random();
   knowOrderObj=whichKnowNext(knowOrder);
   tmpTxt      =getC(cKnowTheNextPage,lang);
   tmpTxt      =tmpTxt +' (1)' +knowOrderObj.txtKnow[0];
   tmpTxt      =tmpTxt +' (2)' +knowOrderObj.txtKnow[1];
   tmpTxt      =tmpTxt +' (3)' +getC(cKnowCountFac,lang);
   t(tmpTxt);
   t('<p>');
}
</script>

<input type=hidden name='subject' id='subject' value='<?php echo $subjID; ?>'>
<input type=hidden name='thisTrialAppend' id='thisTrialAppend' value=''>
<input type=hidden name='order' id='order' value=''>
<input type=hidden name='whatPageNext' id='whatPageNext' name='whatPageNext' value='vuma'>
<input type=button id='submitButt' value='submit' onClick="javascript:validateForm()" >
  
<script>
   // sal, oed, perhaps oe2, other types by default behave differently, but are not explicitly coded here
   if((type.substring(0,3)=='did')){
        document.getElementById('whatPageNext').value ='knowMore';
        if(knowOrderObj.nextKnow[0]=='knowFreq') {document.getElementById('order').value ='1freq2spec';};
        if(knowOrderObj.nextKnow[0]=='knowSpec') {document.getElementById('order').value ='1spec2freq';};
   };
  document.getElementById('submitButt').value =getC(cNextButtonText,lang);
</script>
</form>

</body>
</html>
