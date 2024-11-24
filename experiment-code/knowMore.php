<!--
knowMore.php
Created 				by Jana Jarecki	 		Aug 2012
Last modified 	by Jana Jarecki			Sept 2012
Contains:
	Three kinds of knowledge questions about the stimuli:
	1) How frequent each known stimulus occurred
	2) How often each known stimulus belongs to each category
	3) How often a set of counterfactual stimuli belongs to each category (hypothetically) 
	The order of 1) and 2) is randomized by a variable 'order' from the page before
	The three questions are loaded with this page by the function dispContent
	Further: I do error checking whether SBJs fill out each field and their answers to 1) sum up to 100 %
-->


<html>
<body>
<link rel="stylesheet" type="text/css" href="http://www.jonathandnelson.com/jStyleNew.css">
<script src="plankton.js">//todo</script>
<script>

<?php
    $test = $HTTP_SERVER_VARS["HTTP_HOST"] . $HTTP_SERVER_VARS["REQUEST_URI"] ;
    echo "var locn= '" . $test . "'\n"  ;
    // get the subject number.  
    $urlArray= explode("?", $test) ; 
    $subjIDText= $urlArray[1] ;
    $presubjID= explode(":", $subjIDText) ;
    $subjID= $presubjID[1] ;
    $fileToOpen= '../data/subject'.$subjID.'.txt' ;
    $fileHandle=fopen($fileToOpen,"r");
    if (!$fileHandle) { exit("Unable to open file.") ; }   
    fgetc($fileHandle) ;  //first character looks like new line, toss it
    $fileContents= "'" ; 
    while (!feof($fileHandle)) { 
       $currentChar=fgetc($fileHandle) ; 
       //echo $currentChar ;
       $fileContents= $fileContents . $currentChar ; 
    }
    fclose($fileHandle); 
    echo "var textFileContents= " . $fileContents . "' ;  \n"  ;
?>



////////////////////////////////////////////////////////////////////////////////
// Variables
locnArr        =location.href.split("?") ;  
locnArrLength  =locnArr.length ;
if(strContains(textFileContents, 'order1spec2freq')) { order ='1spec2freq' ;} ; //order of questions
if(strContains(textFileContents, 'order1freq2spec')) { order ='1freq2spec' ;} ;
// all info should have been written already from mock.php
if(textFileContents.length>0  && locnArrLength==2) {
   var longArr =textFileContents.split("?");
} else {
   alert('problem getting information within know.php');
}
var i          =0 ;                       	//initialize
var preUrl     =longArr[i++];             	//get url
var subjID     =jp('S',longArr[i++] );	   	//get subject ID
if(longArr.length==4)  { 										//get the language/type/sal info:
   var preInfo =jp('info', longArr[i++] );  //get environment info
   var type    =preInfo.pop();							//get type switch
   var lang    =preInfo.pop();							//get language
   var hist    =jp('hist', longArr[i++] );	//?
} else  {
   alert('trouble setting vars in know.php qwerasdf4321: ');
   alert('longArr.length is '  +longArr.length  +', but should be length 4' );
}
var myPlanktonObject= new planktonObject(preInfo) ;
tailSal           =type.substring(3,4);							//get salience of tail
eyeSal            =type.substring(4,5);							//get salience of eye
clawSal           =type.substring(5,6);							//get salience of claw
infoAboutEnv      =myPlanktonObject.testStimInfo  ; //env. that occurred
infoAboutCfEnv    =myPlanktonObject.cfStimInfo  ;	  //counterfactual env.
stringWithPics    =myPlanktonObject.whichStimsStr ; //feat.comb. that occurred
stringWithCfPics  =myPlanktonObject.cfStimStr ; 		//counterfactual feat.comb.
if ((type.substring(0,3)=='sal') || (type.substring(0,3)=='did') || (type.substring(0,3)=='oe2')){
  //feat.comb that occurred
	stringWithPics =stringWithPics.replace(/fine/gi,'n_images/'+'fine'+tailSal);
	stringWithPics =stringWithPics.replace(/blunt/gi,'n_images/'+'blunt'+tailSal);
	stringWithPics =stringWithPics.replace(/fem/gi,'fem'+eyeSal);
	stringWithPics =stringWithPics.replace(/male/gi,'male'+eyeSal);
	stringWithPics =stringWithPics.replace(/orig/gi,'orig'+clawSal);
	stringWithPics =stringWithPics.replace(/conn/gi,'conn'+clawSal);
  //counterfactual feat.comb.
   stringWithCfPics =stringWithCfPics.replace(/fine/gi, 'n_images/'+'fine'   +tailSal);
	stringWithCfPics =stringWithCfPics.replace(/blunt/gi,'n_images/'+'blunt'  +tailSal);
	stringWithCfPics =stringWithCfPics.replace(/fem/gi, 'fem' +eyeSal);
	stringWithCfPics =stringWithCfPics.replace(/male/gi,'male'+eyeSal);
	stringWithCfPics =stringWithCfPics.replace(/orig/gi,'orig'+clawSal);
	stringWithCfPics =stringWithCfPics.replace(/conn/gi,'conn'+clawSal);
} else if (type.substring(0,3)=='rwa'){
  //feat.comb that occurred
	stringWithPics  =stringWithPics.replace(/fine/gi,'rwa_images/rwa_'+'fine'+tailSal);
	stringWithPics  =stringWithPics.replace(/blunt/gi,'rwa_images/rwa_'+'blunt'+tailSal);
	stringWithPics  =stringWithPics.replace(/fem/gi,'fem'+eyeSal);
	stringWithPics  =stringWithPics.replace(/male/gi,'male'+eyeSal);
	stringWithPics  =stringWithPics.replace(/orig/gi,'orig'+clawSal);
	stringWithPics  =stringWithPics.replace(/conn/gi,'conn'+clawSal);
  //counterfactual feat.comb.
  stringWithCfPics  =stringWithCfPics.replace(/fine/gi,'rwa_images/rwa_'+'fine'   +tailSal);
	stringWithCfPics  =stringWithCfPics.replace(/blunt/gi,'rwa_images/rwa_'+'blunt' +tailSal);
	stringWithCfPics  =stringWithCfPics.replace(/fem/gi,   'fem'  +eyeSal);
	stringWithCfPics  =stringWithCfPics.replace(/male/gi,  'male' +eyeSal);
	stringWithCfPics  =stringWithCfPics.replace(/orig/gi,  'orig' +clawSal);
	stringWithCfPics  =stringWithCfPics.replace(/conn/gi,  'conn' +clawSal);
};
arrWithPics     	  =stringWithPics.split("~"); //occurred
arrWithCfPics   	  =stringWithCfPics.split("~"); //counterfactual
numPics         	  =arrWithPics.length-1;
numCfPics       	  =arrWithCfPics.length-1;
if (type.substring(0,3)=='rwa'){
	if(lang=='en'){
		var optionSpeciesA	='low' ;
		var optionSpeciesB	='high'; 
	} else if(lang=='de')	{
		var optionSpeciesA	='niedrig' ; 
		var optionSpeciesB	='hoch'; 
	};
} else {
	var optionSpeciesA	='A';
	var optionSpeciesB	='B';
};
var dirloc	='';
var which		=1;
arrToSave =new Array();


/////////////////////////////////////////////////////////////////////////////////////////////
// Functions
function apic(picname) {
   var picStr  =dirloc + picname +'.jpg' ;
   picStr      ="\n<img src='./images/" +picStr +"'>" ;
   return picStr
};

function t(textToWrite) {
   document.writeln(textToWrite);
};

function speciesPropText() {
   var aStr ='' ;
   aStr     =aStr +"\n<option value=''>" +getC(cOptionDefault,lang) ;
   for(i=1;i<=101;i++) {
      thisPerc =i-1;
      aStr     =aStr +"\n<br><option value='" +thisPerc +"A'>" +thisPerc +" %&nbsp;&nbsp;" +optionSpeciesA +",&nbsp&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +(100-thisPerc) +" %&nbsp;&nbsp;" +optionSpeciesB ;
   }
   aStr     =aStr +"\n</select>" ; 
   return aStr;
};

function exemplarFreqText() {
   var aStr ='' ;
   aStr     =aStr +"\n<option value=''>" +getC(cOptionDefault,lang) ;
   for(i=1;i<=101;i++) {
      thisPerc =i-1;
      aStr     =aStr +"\n<br><option value='" +thisPerc +"'>" +thisPerc;
   }
   aStr     =aStr +"\n</select>" ; 
   return aStr;
};

function writeOnePlank(stimulus, type) {
   //type is the type of text to retrieve from plankton.html:
   //cOfPlanktonLikeThisXXX, frequency=Freq, species=Spec, counterfactuals=CounFac
   var ss ='<br><br><hr><br>';
   if (type=='Freq')    { ss =ss +getC(cOfPlanktonLikeThisFreq,lang) }; //get text according to type
   if (type=='Spec')    { ss =ss +getC(cOfPlanktonLikeThis,lang) };
   if (type=='CounFac') { ss =ss +getC(cOfUnseenLikeThis,lang) };
   if (type=='Freq')    {
		ss =ss +"\n <select name='" +stimulus+"' id='"+stimulus +"'>" 
		ss =ss +exemplarFreqText() +getC(cOf100times,lang);
	 };
   if (type=='Spec')    { 
		ss =ss +"\n<select name='" +stimulus +"' id='" +stimulus  +"'>";
    ss =ss +speciesPropText();
   };
   if (type=='CounFac') { 
		ss =ss +"\n<select name='" +stimulus +"' id='" +stimulus  +"'>";
		ss =ss +speciesPropText();
   };
	 ss =ss +'\n<br>'
	 ss =ss +apic(stimulus)
	 ss =ss +'\n<br>';
   return ss ;
};

function writeAllPlank(type) {
	//JJ (8/2012) Returns pics of planki and questions about 'type'
	// type=Freq: Frequency question, type=Spec: species question, type=counFac: species question about unseen images
   if(type=='Freq')     { var ss =getC(cInfoFreq,lang); 		arr =arrWithPics;    n =numPics;};
   if(type=='Spec')     { var ss =getC(cInfoSpec,lang); 		arr =arrWithPics;    n =numPics;};
   if(type=='CounFac')  { var ss =getC(cInfoCounFac,lang); 	arr =arrWithCfPics;  n =numCfPics;};
   for(jj=0;jj<n;jj++) {
      thisImage =arr[jj];
      ss =ss +writeOnePlank(thisImage,type);
      ss =ss +'<br>' ;
   };
   return ss ;
};

function nextUrl() {
	if(order=='1freq2spec'){
		ss ='Freq' +arrToSave[0] +'Spec' +arrToSave[1];
	};
	if(order=='1spec2freq'){
		ss ='Freq' +arrToSave[1] +'Spec' +arrToSave[0];
	};
	ss =ss +'&CfEnv' +infoAboutCfEnv +arrToSave[2];
  document.getElementById('thisTrialAppend').value =ss;
  document.getElementById('knowForm').submit();
};

function saveAnswers(which){
	var ss ='';									//initialize
	if(which==1){
    if(order=="1freq2spec"){ //saving the freq-answers as #~#~#
      for(i=0;i<numPics;i++) {
				 ss =ss +document.getElementById(arrWithPics[i]).value +"~";
      };
    }else if(order=="1spec2freq") { //saving the spec-answers as #A#A#A
      for(i=0;i<numPics;i++) {
				 ss =ss +document.getElementById(arrWithPics[i]).value;
      };
    };
  }else if(which==2){
    if(order=="1freq2spec"){
      for(i=0;i<numPics;i++) {
				 ss =ss +document.getElementById(arrWithPics[i]).value;
      };
    }else if(order=="1spec2freq") {
      for(i=0;i<numPics;i++) {
				 ss =ss +document.getElementById(arrWithPics[i]).value +"~";
      };
    };  
	}else	if(which==3){
		 for(i=0;i<numCfPics;i++) { //counterfactuals
				ss  =ss +document.getElementById(arrWithCfPics[i]).value;
		 };
	};
	return ss;
};


// Write questions depending on the order variable
function dispCont() {
	//generate string with info to save later
	arrToSave[which-1] =saveAnswers(which);
	//Display next questions
	which =which+1;
	if(which==2){
		if(order=='1spec2freq'){
			cont =writeAllPlank('Freq');
		} else if (order=='1freq2spec'){
			cont =writeAllPlank('Spec');
		};
	} else if (which==3) {
		cont =writeAllPlank('CounFac') ;
	} else if (which==4) {
		document.getElementById('submitButt').onClick =nextUrl();
	}
	document.getElementById('content').innerHTML =cont;
	window.scrollTo(0,0);
};


function validateForm(){
	//proceeds to nextUrl if all fields are filled out, alert otherwise
	var y =0;						// initialize to build the sum later
	if(which<3){				//stimuli thato occurred
		n = numPics;
		arr =arrWithPics;
	} else if(which==3){ 	//counterfactual stimuli
		n = numCfPics;
		arr =arrWithCfPics;
	}
	for(jj=0;jj<n;jj++){
		var x =document.forms["knowForm"][arr[jj]].value;
		if (x==null || x=="") {
			ss= getC(cForgotToAnswerPic1,lang) +(roundNum(jj+1,1)) +getC(cForgotToAnswerPic2,lang);
			alert(ss);
			return false;
		} else {
			if (which==1) { if(order=='1freq2spec') { y =y+ parseInt(x); } else {y=100;} ;}
			if (which==2) { if(order=='1spec2freq') { y =y+ parseInt(x); } else {y=100;} ;}
		};
	};
	if(which<3 & y!=100){
		alert(getC(cIfYouSum,lang) +y +getC(cButItShould,lang));
		return false;
	};
	dispCont();
};



////////////////////////////////////////////////////////////////////////
//Text
t("<form name='knowForm' id='knowForm' method='post' action='appendResults.php' >");
//write the questions depending on the value of order
t("<div id='content'>");
if (order=='1spec2freq')        {	ss =writeAllPlank('Spec');
} else if (order=='1freq2spec') {	ss =writeAllPlank('Freq');
};
t(ss);
t("</div>")
writeC(cFinishSubmit,lang);
</script>


<input type=hidden name='subject' id='subject' value='<?php echo $subjID; ?>'>
<input type=hidden name='thisTrialAppend' id='thisTrialAppend' value=''> 
<input type=hidden id='whatPageNext' name='whatPageNext' value='thanks'> <!--JJ (8/2012) changed value from 'vuma'-->
<input type=button id='submitButt' value='submit' onClick="javascript:validateForm()" > <!--JJ (8/2012) changed onClick from 'nextUrl()'-->

<script>
document.getElementById('submitButt').value =getC(cNextButtonText,lang);
// 2012.11.08 Jonathan:
// if itis type oe2, we want vuma
// i have to check what currently happens with type sal
if(type.substring(0,3)=='oe2') {
    document.writeln('<br> next page to be vuma');
    document.getElementByID('whatPageNext').value= 'vuma';
}
</script>
</form>

</body>
</html>
