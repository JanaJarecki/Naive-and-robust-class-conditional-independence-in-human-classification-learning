<!--
/*****
This file has functions desired for the plankton study
*****/
// JJ added code for assessing prob. knowledge in know.php on separate pages, for the frequency, likelihoodA/B, and counterfactuals in randomized order

// set lang to 'en', 'de', or 'all' to test
// we assume this is done in individual web pages as follows:
// I think individual pages can override this.
var lang='all';

///////////////////////////////////////////////////////////////////////////////
// FUNCTIONS
function c(en,de) {
   this.en= en;
   this.de= de;
   this.all= this.text= '<br>[en] ' +en +'<br>[de] ' +de  +'<br>'; 
   if(lang=='en') {this.text= en; }
   if(lang=='de') {this.text= de; }
   if(lang=='all') {this.text= '<br>[en] ' +en +'<br>[de] ' +de  +'<br>'; }
}

function getC(aC,whichLang){
   if (whichLang=='en')  {return aC.en; }
   if (whichLang=='de')  {return aC.de; }
   if (whichLang=='all') {return aC.all; }
}

function writeC(aC,whichLang){
   if (whichLang=='en')  {document.writeln(aC.en); }
   if (whichLang=='de')  {document.writeln(aC.de); }
   if (whichLang=='all') {document.writeln(aC.all); }		
}




///////////////////////////////////////////////////////////////////////////////
// BUTTONS
cStartButtonText= new c("Start","Weiter");
cNextButtonText= new c("Next","Weiter");
cSubmitButtonText= new c("Submit","Fertig stellen");



///////////////////////////////////////////////////////////////////////////////
// INSTRUCTIONS
var pleaseClickEn= 'please change each feature at least ';
var pleaseClickDe= 'Klicken Sie bitte auf jedes Merkmal mindestens ';
var cPleaseClick= new c(pleaseClickEn,pleaseClickDe);
var cTimes= new c(" times."," mal.");

var preInstrEn= "\
   Thank you for volunteering to do this study.  Here and throughout the \
   experiment, please read carefully! If you don\'t read the instructions \
   carefully, you will end up being frustrated or wasting a lot of time, \
   unnecessarily, during the experiment.  If the instructions are \
   unclear, or if the experiment is not working properly, please tell the \
   experimenter right away.   When you are ready to see the instructions, \
   select your version of the experiment from the list below, and then \
   click \"Instructions\". ";
var preInstrDe= "\
   Vielen Dank f&uuml;r Ihre freiwillige Teilnahme an dieser Studie. Bitte \
   lesen Sie die Instruktionen aufmerksam durch! Wenn Sie die \
   Instruktionen nicht genau durchlesen, kann es passieren, dass Sie \
   w&auml;hrend des Experimentes unn&ouml;tigerweise frustriert sind und viel Zeit \
   verschwenden. Sollten die Instruktionen einmal unklar sein, oder \
   sollte das Experiment einmal nicht richtig funktionieren, geben Sie \
   bitte sofort dem Studienleiter Bescheid. Wenn Sie bereit sind, die \
   Instruktionen zu sehen, w&auml;hlen Sie Ihre zugewiesene Version des \
   Experimentes von der unteren Liste und klicken Sie auf \
   &#132;Instruktionen&#148;. ";  
cPreInstr= new c(preInstrEn,preInstrDe);

var studyInvolves_j_En= "\
   This study involves learning to classify simulated plankton images \
   according to which species (A or B) they are. In each trial, a \
   plankton is chosen at random. The plankton all look extremely similar. \
   Actually, the features can vary, but the differences between the two \
   versions of each feature are very subtle.\
   <p>\
   Your job is to correctly guess what species (A or B) each plankton is, \
   by pressing the left arrow for A, and the right arrow for B.  \
   If you are right, you will see a smiley \
   face.  (Otherwise you will see a frowny face.)  When you are ready to \
   go to the next trial, press the \"up\" arrow. \
   <p>" ;
var studyInvolves_j_De= "\
   In dieser Studie geht es darum zu lernen, verschiedene Exemplare von Plankton \
   in zwei Arten (A oder B) einzuordnen. In jedem Durchgang wird Ihnen ein \
   zuf&auml;llig ausgew&auml;hltes Plankton gezeigt. Die Plankton-Exemplare sehen \
   sich sehr &auml;hnlich. Sie unterscheiden sich aber leicht in Merkmalen mit je zwei Merkmalsauspr&auml;gungen.\
   <p>\
   Ihre Aufgabe ist es, richtig zu erraten, welcher Art (A oder B) das \
   jeweilige Plankton angeh&ouml;rt, indem Sie entweder auf den Pfeil nach links f&uuml;r A \
   oder auf den nach rechts f&uuml;r B dr&uuml;cken. Wenn Sie richtig getippt haben, erscheint \
   ein freundlicher Smiley. (Wenn nicht, erscheint ein trauriges \
   Gesicht.) Wenn Sie eine Entscheidung getroffen haben, dr&uuml;cken Sie \
   auf die Pfeiltaste &#132;aufw&auml;rts&#148; f&uuml;r den n&auml;chsten Durchgang. \
   <p>" ;
var cStudyInvolves_j= new c(studyInvolves_j_En,studyInvolves_j_De);

var ifYouChoseAright_En ="Suppose you chose Species A and the plankton specimen belongs to Species A. Then you will see the face shown at left. The smiley indicates that you were right and the A indicates the true species A.";
var ifYouChoseAright_De ="Nehmen wir an, Sie haben Spezies A getippt und das Plankton-Exemplar geh&ouml;rt auch zur Spezies A. Dann erscheint das links dargestellte Gesicht. Ein Smiley, da Ihre Klassifikation zutraf und ein A, da die wahre Spezies A ist.";
var cIfYouChoseAright = new c(ifYouChoseAright_En, ifYouChoseAright_De);

var ifYouChoseAwrong_En ="Suppose you chose Species A but the plankton specimen belongs to Species B. Then you will see the face shown at left. The frowny indicates that you were wrong and the B indicates the true species B.";
var ifYouChoseAwrong_De ="Nehmen wir an, Sie haben Spezies A getippt aber das Plankton-Exemplar geh&ouml;rt zur Spezies B. Dann erscheint das links dargestellte Gesicht. Ein trauriges Gesicht, da Ihre Klassifikation nicht zutraf und ein B, da die wahre Spezies B ist.";
var cIfYouChoseAwrong = new c(ifYouChoseAwrong_En, ifYouChoseAwrong_De);

var ifYouChoseBright_En ="Suppose you chose Species B and the plankton specimen belongs to Species B. Then you will see the face shown at left. The smiley indicates that you were right and the B indicates the true species B.";
var ifYouChoseBright_De ="Nehmen wir an, Sie haben Spezies B getippt und das Plankton-Exemplar geh&ouml;rt auch zur Spezies B. Dann erscheint das links dargestellte Gesicht. Ein Smiley, da Ihre Klassifikation zutraf und ein B, da die wahre Spezies B ist.";
var cIfYouChoseBright = new c(ifYouChoseBright_En, ifYouChoseBright_De);

var ifYouChoseBwrong_En ="Suppose you chose Species B but the plankton specimen belongs to Species A. Then you will see the face shown at left. The frowny indicates that you were wrong and the A indicates the true species B.";
var ifYouChoseBwrong_De ="Nehmen wir an, Sie haben Spezies B getippt aber das Plankton-Exemplar geh&ouml;rt zur Spezies A. Dann erscheint das links dargestellte Gesicht. Ein trauriges Gesicht, da Ihre Klassifikation nicht zutraf und ein A, da die wahre Spezies A ist.";
var cIfYouChoseBwrong = new c(ifYouChoseBwrong_En, ifYouChoseBwrong_De);



var remember_En= "\
   <p>Remember that your job is to choose the most likely species for \
   each plankton specimen. In some cases plankton of different species \
   look the same. In this case, choose the species that the specimen most \
   likely belongs to. It might not be possible to be correct on every single trial. \
   <p>Good luck! \
   <p>" ;
var remember_De= "\
   <p>Denken Sie daran, dass es Ihre Aufgabe ist, f&uuml;r jedes \
   Plankton-Exemplar konsequent die Spezies zu w&auml;hlen, zu \
   der es am wahrscheinlichsten geh&ouml;rt.  Es kann sein, dass ein Plankton verschiedener \
   Spezies gleich aussieht. In diesem Fall m&uuml;ssen Sie einsch&auml;tzen, \
   zu welcher Spezies es am wahrscheinlichsten geh&ouml;rt. Das hei&szlig;t, dass es manchmal \
   nicht m&ouml;glich ist, in jedem einzelnen Durchgang die korrekte \
   Spezies zu w&auml;hlen. \
   <p>Viel Spass! \
   <p>" ;
var cRemember= new c(remember_En,remember_De);

var familiarizeFeatures_En ="\
   Before starting we would like you to get familiar with the plankton specimen. \
   The next page will show you a sample plankton specimen.";
var familiarizeFeatures_De ="\
   Bevor es losgeht, machen Sie sich bitte mit den Merkmalen des Planktons vertraut. \
   Auf der folgenden Seite sehen Sie ein Beispiel f&uuml;r ein Plankton-Exemplar.";
var cFamiliarizeFeatures= new c(familiarizeFeatures_En,familiarizeFeatures_De);
	
var studyInvolves_n_En= "\<p>\
   This study involves learning to classify simulated plankton images \
   according to which species (A or B) they are. In each trial, a \
   plankton is chosen at random. The plankton all look extremely similar. \
   Actually, the features can vary, but the differences between the two \
   versions of each feature are very subtle. \
   Your job is to correctly guess what species (A or B) each plankton is, \
   by pressing the left arrow for A, and the right arrow for B.  \
   If you are right, you will see a smiley \
   face.  (Otherwise you will see a frowny face.)  When you are ready to \
   go to the next trial, press the \"up\" arrow. \
   <p>Remember that your job is to choose the most likely species for \
   each plankton specimen. In some cases plankton of different species \
   look the same. In this case, choose the species that the specimen most \
   likely belongs to. It isn\'t possible to be correct on every single trial. \
   Before each trial, a plus sign will appear in the middle of the screen. \
   Please look at it until the next plankton specimen appears. \
   <p>Good luck! \
   <p>" ;
var studyInvolves_n_De= "\<p>\
   In dieser Studie geht es darum zu lernen, \
   verschiedene Plankton-Exemplare in zwei \
   Arten (A und B) zu klassifizieren. In \
   jedem Durchgang wird Ihnen ein \
   zuf&auml;llig ausgew&auml;hltes Plankton \
   gezeigt. Die Plankton-Exemplare sehen \
   sich alle sehr &auml;hnlich. Sie \
   unterscheiden sich aber in zwei \
   Merkmalen. \
   Ihre Aufgabe ist es, richtig zu erraten, welcher Art (A oder B) das \
   jeweilige Plankton angeh&ouml;rt, indem Sie entweder auf den Pfeil nach A oder  auf den nach B klicken. \
   Wenn Sie richtig getippt haben, erscheint \
   ein freundlicher Smiley. Wenn nicht, erscheint ein trauriges \
   Gesicht. Wenn Sie eine Entscheidung getroffen haben, klicken Sie \
   auf &#132;aufw&auml;rts&#148; f&uuml;r den n&auml;chsten Durchgang. \
   <p>Denken Sie daran, dass es Ihre Aufgabe ist, f&uuml;r jedes \
   Plankton-Exemplar konsequent die Spezies zu w&auml;hlen, zu \
   der es am wahrscheinlichsten geh&ouml;rt.  So kann es zum \
   Beispiel sein, dass in manchen F&auml;llen Plankton verschiedener \
   Spezies gleich aussieht. In diesem Fall m&uuml;ssen Sie einsch&auml;tzen, \
   zu welcher Spezies es am wahrscheinlichsten geh&ouml;rt. Das hei&szlig;t, dass es \
   nicht m&ouml;glich ist, in jedem einzelnen Durchgang die korrekte \
   Spezies zu erraten. \
   Vor jedem Versuch wird sich ein Pluszeichen in der Mitte des Bildschirms \
   erscheinen. Bitte schauen Sie auf das Pluszeichen bis das n&auml;chste Bild kommt. \
   <p>Viel Spass! \
   <p>" ;
var cStudyInvolves_n= new c(studyInvolves_n_En,studyInvolves_n_De);

//the variable is in the alert like this:
//learnCongratsOrig_j1, a number which is the number of clicks allowed, learnCongratsOrig_j2
var learnCongratsOrig_j1_En= unescape("\
Congratulations! You have learned the different species of plankton very well.\
\n\n\
In the next part of the experiment the features are completely blurred, in the beginning of each trial. You can select up to ");
var learnCongratsOrig_j1_De= unescape("\
Herzlichen Gl%FCckwunsch! Sie haben die unterschiedlichen Plankton-Spezies erfolgreich gelernt.\
\n\n\
Im folgenden Teil des Experimentes sind die Merkmale am Anfang jedes Durchgangs komplett verdeckt. Um zu entscheiden, zu welcher Spezies das gezeigte Plankton-Exemplar geh%F6rt, k%F6nnen Sie sich bis zu ");
var cLearnCongratsOrig_j1= new c(learnCongratsOrig_j1_En,learnCongratsOrig_j1_De);

var learnCongratsOrig_j2_En= unescape("\
 features to reveal by clicking on them, to help you learn the true species. You need not select all features.\
The kinds of plankton are the same as before. The only change is that the features are blurred. \
\n\n\
Please click on the feature(s) of your choice, in each trial and classify the plankton afterwards.");
var learnCongratsOrig_j2_De= unescape("\
 der Merkmale ansehen, indem Sie sie anklicken. Sie m%FCssen nicht alle Merkmale ansehen. \
 \n\n\
Die Plankton-Spezies sind die gleichen wie zuvor. Der einzige Unterschied ist, dass die Merkmale verdeckt sind. \
Bitte klicken Sie in jedem Durchgang auf die Merkmale Ihrer Wahl und klassifizieren Sie danach die Spezies.");
var cLearnCongratsOrig_j2= new c(learnCongratsOrig_j2_En,learnCongratsOrig_j2_De);



////////////////////////////////////////////////////////////////////////////////////////////
// Know
var clickEndKnowTest_j_En= "\
   Congratulations on learning so well! \
   <br><br> \
   ***Please let the experimenter know that you have finished the first parts of the \
   experiment.*** \
   <br> \
   <br> \
   We would now like to ask you to answer a few \
   more questions.  Please try to remember the learning phase, \
   in which the features were not blurred, when completing this test. \
   Please be careful and give your best estimate of what you experienced. " ;
var clickEndKnowTest_j_De= "\
   Gratulation zu Ihrem Lernerfolg! \
   <br><br> \
   ***  Bitte lassen Sie den Studienleiter wissen, dass Sie den ersten Teil \
   des Experiments beendet haben. *** \
   <br><br> \
   Wir bitten Sie nun, noch ein paar weitere Fragen zu beantworten. \
   Bitte versuchen Sie sich w&auml;hrend der Beantwortung der \
   Fragen an die Lernphase zu erinnern, in \
   der alle Merkmale sichtbar waren. Bitte denken Sie gut nach. \
   Versuchen Sie, so genau wie m&ouml;glich wiederzugeben, was Sie in dieser Phase gelernt haben." ;  
cClickEndKnowTest_j= new c(clickEndKnowTest_j_En,clickEndKnowTest_j_De);

var whichFeatureMoreUsefulEn= "\
   -- Which feature was most useful to determine whether the plankton specimens were \
   Species A or Species B? \
   <br><input type=text name='whichFeatUse' id='whichFeatUse' size=30 value=' '>  \
   <br><br>Please explain why this feature was more useful: \
   <br><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
var whichFeatureMoreUsefulDe= "\
   -- Welches Merkmal war das n&uuml;tzlichste, um zu bestimmen, \
   ob die Plankton-Exemplare Spezies A oder Spezies B waren? \
   <br><input type=text name='whichFeatUse' id='whichFeatUse' size=30 value=' '>  \
   <br><br>Bitte schreiben Sie, warum dieses Merkmal das n&uuml;tzlichste war: \
   <br><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
var cWhichFeatureMoreUseful= new c(whichFeatureMoreUsefulEn,whichFeatureMoreUsefulDe);

//JJ describing usefulness and reasons for it for 1 feat. OR a feature combination
var whichFeatureMoreUseful_j_En= "\
   -- Which feature (which combination of features) was most useful \
   to determine whether the plankton specimens were Species A or Species B? \
   <br><span style='margin-left:1.5eM;'><input type=text name='whichFeatUse' id='whichFeatUse' size=150 value=' '>  \
   <br><br>\
	 -- Please explain why this feature (combination) was most useful: \
   <br><span style='margin-left:1.5eM;'><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
var whichFeatureMoreUseful_j_De= "\
   -- Welches Merkmal (welche Merkmalskombination) war am n&uuml;tzlichsten, \
   um die Plankton-Exemplare der Spezies A oder B zuzuordnen? \
   <br><span style='margin-left:1.5eM;'><input type=text name='whichFeatUse' id='whichFeatUse' size=150 value=' '>  \
   <br><br>\
	 -- Bitte erl&auml;utern Sie, warum dieses Merkmal (diese Merkmalskombination) am n&uuml;tzlichsten war: \
   <br><span style='margin-left:1.5eM;'><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
var cWhichFeatureMoreUseful_j= new c(whichFeatureMoreUseful_j_En,whichFeatureMoreUseful_j_De);

//JJ (8/2012) changed values from 'Species A' to 'left'
var selectSpeciesEn= "\
   <br><span style='margin-left:1.5eM;'><select name='species' id='species'> \
   <option value=''> (choose)	<option value='A'>Species A (Left arrow)	<option value='B'>Species B (Right arrow) \
   </select> ";
var selectSpeciesDe= "\
   <br><span style='margin-left:1.5eM;'><select name='species' id='species'> \
   <option value=''> (bitte w&auml;hlen)	<option value='A'>Spezies A (linke Pfeiltaste)	<option value='B'>Spezies B (rechte Pfeiltaste) \
   </select> ";
var cSelectSpecies= new c(selectSpeciesEn,selectSpeciesDe);

// Default value for select-options-field in know.php
var optionDefault_En= "Choose";
var optionDefault_De= "Bitte w&auml;hlen";
var cOptionDefault= new c(optionDefault_En,optionDefault_De);
// Attention: the value of the Species is hard-coded to depend the type-var within know.php

var whichSpeciesMostEn= "-- Which species was most frequent overall? " ; 
var whichSpeciesMostDe= "-- Welche Spezies kam insgesamt am h&auml;ufigsten vor? " ; 
var cWhichSpeciesMost= new c(whichSpeciesMostEn,whichSpeciesMostDe) ;  

var whichSpeciesKeys_j_En= "(A was the left, B the right arrow key)" ;
var whichSpeciesKeys_j_De= "(A war die linke, B die rechte Pfeiltaste)" ;
var cWhichSpeciesKeys_j = new c(whichSpeciesKeys_j_En,whichSpeciesKeys_j_De) ;

var propEachSpeciesEn= "\
   -- Overall, what percent of plankton belonged to each species? " ;  
var propEachSpeciesDe= "\
   -- Wie viel Prozent des Planktons geh&ouml;rten insgesamt zu jeder Spezies? " ;
var cPropEachSpecies=  new  c(propEachSpeciesEn, propEachSpeciesDe)

var ofPlanktonLikeThisEn= "Of \
   the plankton that look exactly like the one below, about \
   what percent are each species? " ;  
var ofPlanktonLikeThisDe= "\
   Bez&uuml;glich des unten gezeigten \
   Plankton-Exemplars: Wieviel \
   Prozent der Exemplare, die Sie mit genau diesen Merkmalen gesehen haben, \
   geh&ouml;ren zu welcher \
   Spezies? " ;  
var cOfPlanktonLikeThis= new c(ofPlanktonLikeThisEn,ofPlanktonLikeThisDe);

//JJ (8/2012): Frequency question
var ofPlanktonLikeThisFreq_En= "\
   How often do plankton specimens with the following features occur overall? About ";  
var ofPlanktonLikeThisFreq_De= "\
   Wie h&auml;ufig kommt das Plankton-Exemplar mit folgenden Merkmalen insgesamt vor? ";  
var cOfPlanktonLikeThisFreq= new c(ofPlanktonLikeThisFreq_En,ofPlanktonLikeThisFreq_De);

var of100times_En="\n\
	times of 100 planktons. (All values need to sum up to 100.)";
var of100times_De="\n\
	Mal aus 100 Planktons. (Insgesamt muss 100 herauskommen.)";
var cOf100times = new c(of100times_En,of100times_De);

//JJ (8/2012) counterfactual to-which-species question
var ofUnseenLikeThisEn= "\
   Of plankton like the one below, about \
   what percent do you think are each species?" ;  
var ofUnseenLikeThisDe= "\
   Bez&uuml;glich des unten gezeigten Plankton-Exemplars: \
   Wie viel Prozent sch&auml;tzen Sie geh&ouml;ren zu welcher Spezies?" ;  
var cOfUnseenLikeThis= new c(ofUnseenLikeThisEn,ofUnseenLikeThisDe);

// JJ added know pages for frequencies and species likelihoods
var knowTheNextPage_En="\
   The next pages will show you plankton specimen again. We will ask you about ";
var knowTheNextPage_De="\
   Die n&auml;chsten Seiten zeigen Ihnen wieder Bilder der Plankton-Exemplare. Wir werden Sie bitten, uns mitzuteilen ";
var cKnowTheNextPage =new c(knowTheNextPage_En,knowTheNextPage_De);

var knowSpec_En ="\
   To which of the Species the plankton specimen you have learned belong to.";
var knowSpec_De ="\
   Zu welcher Spezies die Ihnen bekannten Plankton-Exemplare geh&ouml;ren.";
var cKnowSpec =new c(knowSpec_En,knowSpec_De);

var knowFreq_En ="\
   How often the plankton specimen you have learned occurred.";
var knowFreq_De ="\
   Wie h&auml;ufig die Ihnen bekannten Plankton-Exemplare vorkamen.";
var cKnowFreq =new c(knowFreq_En,knowFreq_De);

var knowCountFac_En ="\
   To which Species various new plankton specimen belong, which you have not seen before.";
var knowCountFac_De ="\
   Zu welcher Spezies verschiedene neue Plankton-Exemplare geh&ouml;ren k&ouml;nnten, die Sie zuvor noch nicht gesehen haben.";
var cKnowCountFac =new c(knowCountFac_En,knowCountFac_De);

var infoSpec_En ="\
   Below you will see the different plankton specimens. \
   <br><br> \
   Please indicate <b>how many of each</b> belong to Species A or Species B. \
   Chose the answer for each plankton specimen seperately. \
   (That is: How often does the plankton specimen shown here belong to which species?) \
   <br><br> Please think carefully. \
   Try to be as accurate as possible about what you have learned about the classification of the plankton specimen.";
var infoSpec_De ="\
	Weiter unten sehen Sie die verschiedenen Plankton-Exemplare. \
   <br><br> \
	Geben Sie bitte an <b>wie viele davon</b> zur Spezies A bzw. zur Spezies B geh&ouml;ren. \
	W&auml;hlen Sie die Zugeh&ouml;rigkeit zu den Spezies f&uuml;r jedes der Plankton-Exemplare einzeln. \
	(Also: Wie oft geh&ouml;rt genau das angezeigte Plankton-Exemplar zu welcher Spezies?) \
	<br><br> Bitte denken Sie gut nach. \
	Versuchen Sie, so genau wie m&ouml;glich wiederzugeben, was Sie \&uuml;ber die Klassifizierung der Plankton-Exemplare gelernt haben.";
var cInfoSpec =new c(infoSpec_En,infoSpec_De);

var infoFreq_En ="\
   Below you will see the different plankton specimen. \
   <br><br> \
   Please indicate <b>how often</b> each plankton specimen occurred <b>overall</b>. \
   (That is: How many of all plankton correspond to the plankton specimen shown here?) \
   <br><br> Please think carefully. \
   Try to be as accurate as possible about what you have learned about the classification of the plankton specimen.";;
var infoFreq_De ="\
	Weiter unten sehen Sie die verschiedenen Plankton-Exemplare. \
   <br><br> \
	Geben Sie bitte an <b>wie h&auml;ufig</b> jedes dieser Exemplare <b>insgesamt</b> vorkam. \
	(Also: Welcher Anteil aller Plankton-Exemplare entsprechen dem angezeigten Exemplar?)\
	<br><br> Bitte denken Sie gut nach. \
	Versuchen Sie, so genau wie m&ouml;glich wiederzugeben, was Sie &uuml;ber die Klassifizierung der Plankton-Exemplare gelernt haben.";
var cInfoFreq =new c(infoFreq_En,infoFreq_De);

var infoCounFac_En ="\
   Below you will see new plankton specimens with feature values that you have not seen before. \
   <br><br> \
   Please indicate what you think about <b>how many of each</b> belong to Species A or Species B. \
   Chose the answer for each plankton specimen seperately. \
   (That is: How often does the plankton specimen shown here belong to which species?)";
var infoCounFac_De ="\
	Weiter unten sehen Sie <b>neue</b> Plankton-Exemplare mit Merkmalskombinationen, sie zuvor noch nicht gesehen haben. \
   <br><br> \
	Geben Sie bitte Ihre Einsch&auml;tzung an, <b>wie viele davon</b> zur Spezies A bzw. zur Spezies B geh&ouml;ren. \
	W&auml;hlen Sie die Zugeh&ouml;rigkeit zu den Spezies f&uuml;r jedes der Plankton-Exemplare einzeln \
	(Also: Wie oft geh&ouml;rt das angezeigte Plankton-Exemplar zu welcher Spezies?)";
var cInfoCounFac =new c(infoCounFac_En,infoCounFac_De);


// JJ added question about underlying causal mental model
var whichCausalModelEn="\
   -- Please remember the classification of the plankton exemplars. Which statement best describes \
	 <br><span style='margin-left:1.5eM;'>how you think plankton and species are connected? \
  (Please think about your personal imagination, there is no right or wrong answer.)";
var whichCausalModelDe="\
   -- Bitte denken Sie an die Einordnung der Plankton-Exemplare zur&uuml;ck. Welche Aussage entspricht am ehesten Ihrer Vorstellung davon, \
   <br><span style='margin-left:1.5eM;'>wie die Plankton-Exemplare und die Spezies zusammenh&auml;ngen? (Bitte denken Sie an Ihre pers&ouml;nliche Vorstellung, es gibt keine \
   richtige oder falsche Antwort hier.)";
var cWhichCausalModel=new c(whichCausalModelEn,whichCausalModelDe);

var selectDiagnosticEn ="\
   <input type='radio' style='vertical-align:bottom;' name='causalmodel' id='causalmodel' value='diagnostic'> The species (A or B) \
   influences which color the claw, tail, and eye of a plankton exemplar has.";
var selectDiagnosticDe ="\
   <input type='radio' style='vertical-align:bottom;' name='causalmodel' id='causalmodel' value='diagnostic'> Die Spezies (A oder B) \
   beeinflusst welche Farbe die Klaue, der Schwanz und das Auge des Plankton-Exemplars hat.";
var cSelectDiagnostic =new c(selectDiagnosticEn,selectDiagnosticDe)
var selectInferenceEn ="\
   <input type='radio' style='vertical-align:bottom;' name='causalmodel' id='causalmodel' value='inference'> The color of claw, tail, and eye \
   of a plankton exemplar determine to which species (A or B) it belongs.";
var selectInferenceDe ="\
   <input type='radio' style='vertical-align:bottom;' name='causalmodel' id='causalmodel' value='inference'> Die Farbe von Klaue, Schwanz und Auge \
   des Plankton-Exemplars beeinflussen zu welcher Spezies (A oder B) das Plankton geh&ouml;rt.";
var cSelectInference =new c(selectInferenceEn,selectInferenceDe);

// JJ just changed the format a bit, old-formatted faq are in the former versions of the doc
var faq_j_En= "\
	Please read the experiment FAQ: \
	<p>\
	<table border=0>\
	<tr>\
		<td valign='top'>Q:</td><td> \
		Do the proportion of plankton exemplars that are Species A and Species B \
		change through the experiment?  Among plankton with a particular set \
		of features, do the proportion that are Species A and B change? \</td><td></td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>A:  No. The proportion of plankton within the species is constant. It is as if every plankton is chosen at random from a pond \
		with trillions of plankton specimens.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>Q:</td><td>Is speed or accuracy more important? </td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Speed doesn\'t matter at all. Concentrate on learning every \
		combination of features.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>Q:</td><td>I have figured out how every combination of features relates to the species. When does the \
		software detect that I\'ve learned?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>If you consistently pick the most probable species for each \
		combination of features, it usually takes 300-400 trials for the \
		software to detect that you\'ve learned (and respond optimally).</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>Q:</td><td>What does it mean to respond optimally?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Imagine a slightly head-biased coin. \
		The optimal strategy would be to always guess heads. \
		Even though it doesn't predict every single toss, the \
		optimal strategy maximizes the number of correct predictions over the long run.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>Q:</td><td>How many trials are there?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>It depends how quickly you learn, and consistently respond \
		optimally.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>Q:</td><td>I have a question that isn\'t on the FAQ.  I don\'t understand \
		the FAQ.</td>\
	</tr>\
	<tr>\
		<td>A:</td><td>Please ask!</td>\
	</tr>\
	</table>\
   <p><br><br>\
	To continue to the next plankton exemplar, please press the arrow-upwards key.";
var faq_j_De= "\
	Bitte lesen Sie die FAQ zur Studie:\
	<p>\<table border=0>\
	<tr>\
		<td valign='top'>F:</td><td> \
		&Auml;ndert sich der Anteil an Plankton-Exemplaren, der zu Spezies A und \
		zu Spezies B geh&ouml;rt, w&auml;hrend des Experimentes? &Auml;ndert \
		sich der Anteil, der zu Spezies A und B geh&ouml;rt, innerhalb der \
		Plankton mit einer bestimmten Merkmalskombination? </td><td></td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Nein. Wie viele Plankton-Exemplare insgesamt zu den beiden Spezies geh&ouml;ren ist konstant. Es ist so als w&uuml;rde jedes Plankton \
		zuf&auml;llig aus einem Pool von Trillionen von Plankton-Exemplaren gezogen werden.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>F:</td><td>Ist Geschwindigkeit oder Trefferquote wichtiger?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Die Geschwindigkeit ist &uuml;berhaupt nicht wichtig. \
		Konzentrieren Sie sich darauf, jede Merkmalskombination zu lernen.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>F:</td><td>Ich habe gelernt welche Merkmalskombinationen am wahrscheinlichsten zu welcher Spezies geh&ouml;ren. Wann bemerkt \
		die Software, dass ich die Spezies gelernt habe?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Wenn Sie konsistent die wahrscheinlichste Spezies f&uuml;r jede Merkmalskombination ausw&auml;hlen, dauert es normalerweise \
		300-400 Durchg&auml;nge bis die Software bemerkt, dass Sie die beiden Spezies gelernt haben (und konsistent optimal antworten).</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>F:</td><td>Was hei&szlig;t &#132;optimal antworten&#148;?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Stellen Sie sich vor, Sie werfen eine M&uuml;nze, die eine \
		Tendenz hat, beim Wurf Kopf zu zeigen. Optimal \
		antworten hie&szlig;e hier, immer auf Kopf zu tippen. Auch \
		wenn man mit dieser Strategie nicht jeden einzelnen M&uuml;nzwurf \
		richtig vorhersagen kann, maximiert man so auf lange Sicht die Anzahl \
		der korrekten Vorhersagen.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>F:</td><td>Wie viele Durchg&auml;nge gibt es?</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Es kommt darauf an, wie schnell Sie lernen, konsistent optimal \
		zu antworten.</td>\
	</tr>\
	<tr><td style='height:2em'></td></tr>\
	<tr>\
		<td valign='top'>F:</td><td>Ich habe eine Frage, die nicht in den FAQ enthalten ist. Ich \
		verstehe die FAQ nicht.</td>\
	</tr>\
	<tr>\
		<td valign='top'>A:</td><td>Bitte fragen Sie nach! \
	</table>\
	<p><br><br>\
   Um zum n&auml;chsten Plankton-Exemplar zu gelangen, dr&uuml;cken Sie die Pfeil-Aufw&auml;rts Taste.";
cFaq_j= new c(faq_j_En,faq_j_De);

//////////////////////////////////////////////////////////////////////////////////////
// RealWorld Scenario
var studyInvolves_rwa_En= "\
   This study involves learning to classify a person according to his or her \
   income level (low or high). In each trial, a person is chosen at random and you \
   can see information the person provided about him or herself in a questionnaire.\
   <p>\
   Your job is to \
   correctly guess to which income group the person belongs (low or high), by pressing \
   the left-arrow key for low, and the right-arrow key for high. If you are right, you will \
   see a smiley face. (Otherwise you will see a frowny face.) When you are \
   ready to go to the next trial, press the \"up-arrow\" key. \
   <p> \
   ";
//Before each trial, a plus sign will appear in the middle of the screen. Please \
//look at it until the next person appears. \
var studyInvolves_rwa_De= "\
   In dieser Studie geht es darum zu lernen, Personen in eine \
   Einkommensklasse (niedrig oder hoch) einzuordnen. In jedem Durchgang \
   wird eine Person zuf&auml;llig ausgew&auml;hlt und Sie sehen einige Informationen &uuml;ber \
   diese Person aus einem ausgef&uuml;llten Fragebogen. \
   <p>\
   Ihre Aufgabe ist es, richtig zu erraten, welcher \
   Einkommensklasse (niedrig oder hoch) die jeweilige Person angeh&ouml;rt, indem \
   Sie auf die Pfeiltaste nach links f&uuml;r niedrig oder auf die nach rechts f&uuml;r hoch \
   dr&uuml;cken. Wenn Sie richtig getippt haben, erscheint ein freundlicher Smiley. \
   (Wenn nicht, erscheint ein trauriges Gesicht.) Wenn Sie eine Entscheidung \
   getroffen haben, dr&uuml;cken Sie auf die Pfeiltaste Ñaufw&auml;rtsî f&uuml;r den n&auml;chsten \
   Durchgang. \
   <p> \
   ";
var cStudyInvolves_rwa= new c(studyInvolves_rwa_En,studyInvolves_rwa_De);

var remember_rwa_En= "\
   <p>Remember that your job is to choose the most likely income category for \
   each person. In some cases people with different income categories \
   look the same. In this case, choose the income category that the person most \
   likely belongs to. It might not be possible to be correct on every single trial. \
   <p>Good luck! \
   <p>" ;
var remember_rwa_De= "\
   <p>Denken Sie daran, dass es Ihre Aufgabe ist, f&uuml;r jede \
   Person konsequent die Einkommenskategorie zu w&auml;hlen, zu \
   der sie am wahrscheinlichsten geh&ouml;rt.  Es kann sein, dass Personen mit verschiedenem \
   Einkommen gleich aussehen. In diesem Fall m&uuml;ssen Sie einsch&auml;tzen, \
   zu welcher Einkommenskategorie sie am wahrscheinlichsten geh&ouml;rt. Das hei&szlig;t, dass es manchmal \
   nicht m&ouml;glich ist, in jedem einzelnen Durchgang die korrekte \
   Kategorie zu w&auml;hlen. \
   <p>Viel Spass! \
   <p>" ;
var cRemember_rwa= new c(remember_rwa_En,remember_rwa_De);

var pleaseClickFeature_rwa_En= "Please click on a feature before choosing a category." ;
var pleaseClickFeature_rwa_De= unescape("Bitte klicken Sie auf eines der Merkmale, bevor Sie eine Kategorie w%E4hlen.");
var cPleaseClickFeature_rwa= new c(pleaseClickFeature_rwa_En,pleaseClickFeature_rwa_De)

var learnCongrats_rwa1_En= unescape("\
   Congratulations! You have learned the different income categories \
   very well.  In this part of the experiment part of the person%27s features are completely \
   blurred, in the beginning of each trial. You can select ") ;
var learnCongrats_rwa1_De= unescape("\
   Herzlichen Gl%FCckwunsch! Sie haben die unterschiedlichen \
   Einkommensklassen erfolgreich gelernt. Im folgenden Teil des \
   Experiments sind anfangs einige der Merkmale einer Personen ganz\
   verdeckt. Sie k%F6nnen sich ") ;
cLearnCongrats_rwa1= new c(learnCongrats_rwa1_En,learnCongrats_rwa1_De);

var learnCongrats_rwa2_En= unescape("\
    of the characteristics to reveal by clicking on them, to help you learn the true income category. \
   The only change is that the features are blurred. \
   The kinds of people are the same as before. \
   Please click on the feature(s) of your choice, in each trial and classify the person%27s income afterwards. ") ;
var learnCongrats_rwa2_De= unescape("\
    der Merkmale ansehen, um zu entscheiden zu welcher Einkommensklasse die Person geh%F6rt. \
   Klicken Sie dazu auf die Merkmale. Die Personen sind die gleichen wie zuvor. \
   Der einzige Unterschied ist, dass die Merkmale verdeckt sind. \
   Bitte klicken Sie in jedem Durchgang auf die Merkmale Ihrer Wahl und klassifizieren Sie danach das Einkommen der gezeigten Person.") ;
cLearnCongrats_rwa2= new c(learnCongrats_rwa2_En,learnCongrats_rwa2_De);

var whichFeatureMoreUseful_rwa_En= "\
   Which feature (which combination of features) was most useful \
   to determine whether the person belongs to the high or low income group? \
   <br><input type=text name='whichFeatUse' id='whichFeatUse' size=60 value=' '>  \
   <br><br>Please explain why this feature (combination) was most useful: \
   <br><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
var whichFeatureMoreUseful_rwa_De= "\
   Welches Merkmal (welche Merkmalskombination) war am n&uuml;tzlichsten, \
   um die Personen in die hohe oder niedrige Einkommensklasse einzuordnen? \
   <br><input type=text name='whichFeatUse' id='whichFeatUse' size=60 value=' '>  \
   <br><br>Bitte erl&auml;utern Sie, warum dieses Merkmal (diese Merkmalskombination) am n&uuml;tzlichsten war: \
   <br><input type=text name='explFeatUse' id='explFeatUse' size=150 value=' '> " ;
cWhichFeatureMoreUseful_rwa= new c(whichFeatureMoreUseful_rwa_En,whichFeatureMoreUseful_rwa_De);

var selectSpecies_rwa_En= "\
   <select name='species' id='species'> \
   <option value=''> (choose)	<option value='A'>Low income <option value='B'>High income\
   </select> ";
var selectSpecies_rwa_De= "\
   <select name='species' id='species'> \
   <option value=''> (bitte w&auml;hlen)	<option value='A'>Niedriges Einkommen	<option value='B'>Hohes Einkommen\
   </select> " ;
var cSelectSpecies_rwa= new c(selectSpecies_rwa_En,selectSpecies_rwa_De);

var whichSpeciesMost_rwa_En= "-- Which income group was most frequent overall? " ;
var whichSpeciesMost_rwa_De= "-- Welche Einkommensklasse kam insgesamt am h&auml;ufigsten vor? " ;
cWhichSpeciesMost_rwa = new c(whichSpeciesMost_rwa_En,whichSpeciesMost_rwa_De);

var whichSpeciesKeys_rwa_En= "(Left-arrow represented low, right-arrow high)" ;
var whichSpeciesKeys_rwa_De= "(Linke Pfeiltaste stand f&uuml;r niedrig, rechte f&uuml;r hoch)" ;
cWhichSpeciesKeys_rwa= new c(whichSpeciesKeys_rwa_En,whichSpeciesKeys_rwa_De);

var propEachSpecies_rwa_En= "\
   -- Overall, what percent of persons belonged to each income category? " ;
var propEachSpecies_rwa_De= "\
   -- Wie viel Prozent der Personen geh&ouml;rten insgesamt zu jeder Einkommensklasse? " ;
cPropEachSpecies_rwa= new c(propEachSpecies_rwa_En,propEachSpecies_rwa_De);

var ofPlanktonLikeThis_rwa_En= "Of \
   people like the one below, about \
   what percent belong to each income group? " ;
var ofPlanktonLikeThis_rwa_De= "\
   Bez&uuml;glich der unten gezeigten \
   Personen: Wie viel \
   Prozent geh&ouml;ren zu welcher \
   Einkommensklasse? " ;  
cOfPlanktonLikeThis_rwa= new c(ofPlanktonLikeThis_rwa_En,ofPlanktonLikeThis_rwa_De);

var learnManyFeat_rwa_En= "Mini-FAQ: \
   \nQ: I've only learned one feature. Is that okay?  \
   \nA: No.  More than one feature matters. \
   You must learn all the features, to be able to learn \
   to categorize the person. " ;
var learnManyFeat_rwa_De= "Mini-FAQ: \n\
   \nF: Ich habe nur ein Merkmal gelernt.  Reicht das?  \
   \nA: Leider nicht!  Mehr als ein Merkmal ist wichtig.  \
   Sie muessen alle Merkmale lernen, um die Personen \
   erfolgreich zu klassifizieren. " ;
var cLearnManyFeat_rwa= new c(learnManyFeat_rwa_En,learnManyFeat_rwa_De);

var faq_rwa_En= "\
   Please read the experiment FAQ: \
   <p>\
   <table border=0>\
   <tr>\
      <td valign='top'>Q:</td><td>Do the proportion of  people within the high income level and low \
      income level  change through the experiment? Among  people with a \
      particular set of features, do the proportion that are high income level and low \
      income level change?</td><td></td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>No. It is as if every person is chosen at random from the German population.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>Q:</td><td>Is speed or accuracy more important? </td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Speed doesn\'t matter at all.  Concentrate on learning every \
      combination of features.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>Q:</td><td>I have figured out every combination of features.  When does the \
      software detect that I\'ve learned?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>If you consistently pick the most probable income level for each \
      combination of features, it usually takes 300-400 trials for the \
      software to detect that you\'ve learned (and respond optimally).</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>Q:</td><td>What does it mean to respond optimally?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Imagine a slightly head-biased coin. \
      The optimal strategy would be to always guess heads. \
      Even though it doesn't predict every single toss, the \
      optimal strategy maximizes the number of correct predictions over the long run.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>Q:</td><td>How many trials are there?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>It depends how quickly you learn, and consistently respond \
      optimally.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>Q:</td><td>I have a question that isn\'t on the FAQ.  I don\'t understand \
      the FAQ.</td>\
   </tr>\
   <tr>\
      <td>A:</td><td>Please ask!</td>\
   </tr>\
   </table>";
var faq_rwa_De= "\
   Bitte lesen Sie die FAQ zur Studie:\
   <p>\<table border=0>\
   <tr>\
      <td valign='top'>F:</td><td>&Auml;ndert sich der Anteil an Personen, die in die hohe und \
      niedrige Einkommenskategorie geh&ouml;ren, w&auml;hrend des \
      Experimentes? &Auml;ndert sich der Anteil, der zur hohen und niedrigen \
      Einkommensgruppe geh&ouml;rt, innerhalb der \
      Personen mit einer bestimmten Merkmalskombination?</td><td></td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Nein. Es ist so als w&uuml;rde jede einzelne Person zuf&auml;llig\
      aus der deutschen Bev&ouml;lkerung gew&auml;hlt.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>F:</td><td>Ist Geschwindigkeit oder Trefferquote wichtiger?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Die Geschwindigkeit ist &uuml;berhaupt nicht wichtig. \
      Konzentrieren Sie sich darauf, jede Merkmalskombination zu lernen.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>F:</td><td>Ich habe jede Merkmalskombination herausgefunden. Wann bemerkt \
      die Software, dass ich die Einkommenskategorien gelernt habe?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Wenn Sie konsistent die wahrscheinlichste Einkommensklasse f&uuml;r jede Merkmalskombination ausw&auml;hlen, dauert es normalerweise \
      300-400 Durchg&auml;nge bis die Software bemerkt, dass Sie die beiden Einkommenskategorien gelernt haben (und konsistent optimal antworten).</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>F:</td><td>Was hei&szlig;t &#132;optimal antworten&#148;?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Stellen Sie sich vor, Sie werfen eine M&uuml;nze, die eine \
      Tendenz hat, beim Wurf Kopf zu zeigen. Optimal \
      antworten hie&szlig;e hier, immer auf Kopf zu tippen. Auch \
      wenn man mit dieser Strategie nicht jeden einzelnen M&uuml;nzwurf \
      richtig vorhersagen kann, maximiert man so auf lange Sicht die Anzahl \
      der korrekten Vorhersagen.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>F:</td><td>Wie viele Durchg&auml;nge gibt es?</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Es kommt darauf an, wie schnell Sie lernen, konsistent optimal \
      zu antworten.</td>\
   </tr>\
   <tr><td style='height:2em'></td></tr>\
   <tr>\
      <td valign='top'>F:</td><td>Ich habe eine Frage, die nicht in den FAQ enthalten ist. Ich \
      verstehe die FAQ nicht.</td>\
   </tr>\
   <tr>\
      <td valign='top'>A:</td><td>Bitte fragen Sie nach! \
   </table> ";
cFaq_rwa= new c(faq_rwa_En,faq_rwa_De);

var pleaseWriteSnumEn= "Before \
   continuing, please write down this subject number: ";
var pleaseWriteSnumDe= "Bevor \
   Sie fortfahren, schreiben Sie bitte diese TeilnehmerIn-Nummer auf: ";
var cPleaseWriteSnum= new c(pleaseWriteSnumEn,pleaseWriteSnumDe);

var cThanks_n_En= "\
   Thank you for volunteering to do this study. \
   Here and throughout the experiment, please read carefully! \
   If you don't read the instructions carefully, you will end \
   up being frustrated or wasting a lot of time, unnecessarily, \
   during the experiment.  If the instructions are unclear, or \
   if the experiment is not working properly, please tell the \
   experimenter right away. \ " ;
var cThanks_n_De= "\
   Vielen Dank f&uuml;r Ihre freiwillige Teilnahme an dieser Studie. Bitte \
   lesen Sie die Instruktionen aufmerksam durch! Wenn Sie die \
   Instruktionen nicht genau lesen, kann es passieren, dass Sie \
   w&auml;hrend des Experimentes unn&ouml;tig frustriert sind und viel Zeit \
   verschwenden. Sollten die Instruktionen unklar sein oder \
   sollte das Experiment nicht richtig funktionieren, geben Sie \
   bitte sofort dem Studienleiter Bescheid.\ " ;
var cThanks_n= new c(cThanks_n_En, cThanks_n_De);

var canVaryPleaseClickEn= " \
   by clicking on them in the random \
   plankton image below.   \
   You can't succeed on the \
   experiment unless you have mastered the two different \
   kinds of each feature so take some time to learn them \
   now.   Please click on each feature " ; 
canVaryPleaseClickDe= ". \
   Die Unterschiede \
   zwischen den beiden Auspr&auml;gungen \
   der Merkmale sind allerdings <span class='firstWord'>sehr subtil.</span> \
   Sie k&ouml;nnen sich die beiden Auspr&auml;gungen \
   jetzt anschauen, indem Sie in dem Planktonbild \
   auf das jeweilige Merkmal klicken. \
   Da Sie das \
   Experiment nicht erfolgreich beenden \
   k&ouml;nnen, ohne die Merkmale und ihre \
   Auspr&auml;gungen zu unterscheiden, sollten \
   Sie sich die Merkmalsauspr&auml;gungen jetzt in Ruhe anschauen. Bitte \
   klicken Sie auf jedes Merkmal, " ;  
var cCanVaryPleaseClick= new c(canVaryPleaseClickEn,canVaryPleaseClickDe);

var cAtLeastTen= new c("at least ten times.",", mindestens zehn mal.");

var noteUncertStartEn= "\
   Note that each species includes \
   plankton with several different \
   features. In some cases, plankton \
   from different species look the \
   same, so you have to use your best \
   guess about the true species. When \
   you have learned all the features, \
   click Start: " ;  
var noteUncertStartDe= "\
   Beachten Sie bitte, dass jede \
   Spezies Plankton mit verschiedenen \
   Merkmalsauspr&auml;gungen beinhaltet. \
   In manchen F&auml;llen kann Plankton \
   verschiedener Spezies sogar gleich \
   aussehen. In diesem Fall m&uuml;ssen \
   Sie einsch&auml;tzen, zu welcher \
   Spezies es am wahrscheinlichsten \
   geh&ouml;rt. Wenn Sie alle Merkmale \
   und ihre Auspr&auml;gungen gelernt \
   haben, klicken Sie bitte auf \
   Weiter. " ;  
var cNoteUncertStart= new c(noteUncertStartEn,noteUncertStartDe);

var yourJobEn= " \
   Your job \
   is to correctly guess what species (A or B) each plankton is, \
   by clicking on A or B.  If you are right, the \"?\" turns into a smiley \
   face.  (Otherwise it turns into a frowny face.)  When you are ready to \
   go to the next trial, click \"Next.\" \
   <p>Remember that your job is to choose the most likely species for \
   each plankton specimen. In some cases plankton of different species \
   look the same. In this case, choose the species that the specimen most \
   likely belongs to. It isn\'t possible to be correct on every single trial." ;  
var yourJobDe= "\
   Ihre Aufgabe ist es, richtig zu erraten, welcher Art (A oder B) das \
   jeweilige Plankton angeh&ouml;rt, indem Sie entweder auf A oder B klicken. \
   Wenn Sie richtig getippt haben, verwandelt sich das Fragezeichen in \
   einen fr&ouml;hlichen Smiley. Wenn nicht, wird aus dem Fragezeichen ein trauriges \
   Gesicht. Wenn Sie eine Entscheidung getroffen haben, klicken Sie \
   auf &#132;Weiter&#148; f&uuml;r den n&auml;chsten Durchgang. \
   <p>Denken Sie daran das es Ihre Aufgabe ist, f&uuml;r jedes \
   Plankton-Exemplar konsequent die Spezies zu w&auml;hlen, zu \
   der es am wahrscheinlichsten geh&ouml;rt.  So kann es zum \
   Beispiel sein, dass in manchen F&auml;llen Plankton verschiedener \
   Spezies gleich aussieht. In diesem Fall m&uuml;ssen Sie einsch&auml;tzen, \
   zu welcher Spezies es am wahrscheinlichsten geh&ouml;rt. Das hei&szlig;t dass es \
   nicht m&ouml;glich ist, in jedem einzelnen Durchgang die korrekte \
   Spezies zu erraten. " ;  
var cYourJob= new c(yourJobEn,yourJobDe);

var bePatientEn= "\
   It takes several hundred trials to start to learn about the different \
   species, so please be patient. " ; 
var bePatientDe= "\
   Es dauert mehrere hundert Durchg&auml;nge, bis man anf&auml;ngt etwas &uuml;ber die \
   verschiedenen Spezies zu lernen, also haben Sie bitte etwas Geduld. " ; 
var cBePatient= new c(bePatientEn, bePatientDe);

var shortcutsEn= "\
   You can use arrows as shortcut keys: Left for Species A, Up for Next, \
   and Right for Species B. " ;  
var shortcutsDe= "\
   Sie k&ouml;nnen die Pfeiltastene als &#132;Abk&uuml;rzung&#148; (Shortcut) verwenden: \
   Dr&uuml;cken Sie einfach Links f&uuml;r Spezies A, Oben f&uuml;r Weiter, und Rechts \
   f&uuml;r Spezies B. " ; 
var cShortcuts= new c(shortcutsEn,shortcutsDe);  

var learnCongratsOrigPlEn= "\
Congratulations!  You have learned the different species of plankton \
very well.  In this part of the experiment the features are completely \
blurred, in the beginning of each trial.  You can select a feature to \
reveal by clicking on it, to help you learn the true species.  The \
only change is that the features are blurred.  The kinds of plankton \
are the same as before. Please click on the feature of your choice, in \
each trial. " ;
var learnCongratsOrigPlDe= "\
Herzlichen Glueckwunsch! Sie haben die unterschiedlichen Plankton-Spezies erfolgreich gelernt. \
In diesem Teil des Experimentes sind die Merkmale zu Anfang des Durchgangs komplett verschwommen. \
Um zu entscheiden, zu welcher Spezies \
das gezeigte Plankton-Exemplar gehoert, koennen sich \
EIN Merkmal zeigen lassen, indem Sie es anklicken. \
Die Plankton-Spezies \
sind die gleichen wie zuvor. Der einzige Unterschied ist, dass die \
Merkmale verschwommen sind. Bitte klicken Sie in jedem Durchgang auf \
ein Merkmal Ihrer Wahl. " ;
var cLearnCongratsOrigPl= new c(learnCongratsOrigPlEn,learnCongratsOrigPlDe);




var learnCongratsOe2En= "\
Congratulations!  You have learned the different species of plankton \
very well.  In this part of the experiment the features are completely \
blurred, in the beginning of each trial.  You can select a feature to \
reveal by clicking on it, to help you learn the true species.  The \
only change is that the features are blurred.  The kinds of plankton \
are the same as before. Please click on the feature of your choice, in \
each trial. \
Important: in this part of the experiment you will not see smiley \
or frowny face feedback, but rather a face with a question mark as feedback.\
After the question mark appears, click the up arrow to go on to the next\
 trial.  This part of the experiment has 10 trials" ;
var learnCongratsOe2De= "\
Herzlichen Glueckwunsch! Sie haben die unterschiedlichen Plankton-Spezies erfolgreich gelernt. \
In folgenden Teil des Experimentes sind die Merkmale am Anfang jedes Durchgangs komplett verdeckt. \
Um zu entscheiden, zu welcher Spezies \
das gezeigte Plankton-Exemplar gehoert, koennen Sie sich \
EIN Merkmal zeigen lassen, indem Sie es anklicken. \
Die Plankton-Spezies \
sind die gleichen wie zuvor. Der einzige Unterschied ist, dass die \
Merkmale verdeckt sind. Bitte klicken Sie in jedem Durchgang auf \
ein Merkmal Ihrer Wahl. \
<p>Wichtig: in dieser Phase des Experimentes kriegen Sie kein Smiley oder \
trauriges Gesicht, sondern ein Gesicht mit einem Fragezeichen als \
Feedback. Nachdem das Fragezeichen erscheint, klicken Sie auf die \
Pfeiltaste 'oben' um fortzufahren und um auf das nächste Merkmal zu \
klicken. Dieser Teil des Experimentes beträgt 10 Durchgänge." ;
var cLearnCongratsOe2= new c(learnCongratsOe2En,learnCongratsOe2De);






function learnCongrats(lang,k,l) {
var learnCongratsEn= "\
<p>Congratulations!  You have learned the different species of plankton very well.  \
In this part of the experiment we will show you ten randomly selected exemplars. \
However, the features are completely blurred in the beginning of each trial.  You \
can select a feature to reveal by clicking on it, to help you learn the true species.  \
The only change is that the features are blurred.  The kinds of plankton are the \
same as before. Please click on the feature of your choice, in each trial.\
<p>For a correct classification of a species A plankton you will receive ";
learnCongratsEn= learnCongratsEn +k +" Euro. <p>For a correct classification of a \
species B plankton you will receive " ; 
learnCongratsEn= learnCongratsEn +l +" Euro. <p>Thus, if you say that the shown \
exemplar is of species A and this is indeed the case, you receive " ;
learnCongratsEn= learnCongratsEn +k +" Euro, but if the exemplar is of species B you \
will not receive any money. If you decide that the shown exemplar is of species B \
and this is true, you will receive " ;
learnCongratsEn= learnCongratsEn +l +" Euro, but if the exemplar is in fact of \
species A you will not receive any money.\
<p>After the experiment we will show you how many correct decisions you made and \
how much money you have earned. You will receive this money on top of the normal \
reimbursement." ; 
var learnCongratsDe= "\
<p>Herzlichen Gl&uuml;ckwunsch! Sie haben die unterschiedlichen Plankton-Spezies \
erfolgreich gelernt. In diesem Teil des Experimentes werden wir Ihnen zehn weitere, \
zuf&auml;llig ausgew&auml;hlte Plankton-Exemplare zeigen. Allerdings sind die Merkmale \
der Exemplare zu Anfang des Durchgangs komplett verschwommen. Um zu entscheiden, zu \
welcher Spezies das gezeigte Plankton-Exemplar geh&ouml;rt, k&ouml;nnen sich \
<span class='firstWord'>ein</span> Merkmal zeigen lassen, indem Sie es anklicken. \
Die Plankton-Spezies sind die gleichen wie zuvor.\
<p>F&uuml;r jede richtige Klassifikation eines Plankton der Spezies A erhalten Sie " ;
learnCongratsDe= learnCongratsDe +k +" Euro.\
<p>F&uuml;r jede richtige Klassifikation eines Plankton der Spezies B erhalten Sie " ;
learnCongratsDe= learnCongratsDe +l +" Euro. \
<p>Das hei&szlig;t: wenn Sie entscheiden, dass das gezeigte Exemplar zu Spezies A \
geh&ouml;rt und das tats&auml;chlich so ist, erhalten Sie " ;
learnCongratsDe= learnCongratsDe +k +" Euro. Geh&ouml;rt das \
Exemplar allerdings zu Spezies B, kriegen Sie kein Geld.\
<p>Wenn Sie entscheiden, dass das gezeigte Exemplar zu Spezies B geh&ouml;rt und das \
tats&auml;chlich so ist, erhalten Sie " ;
learnCongratsDe= learnCongratsDe +l +" Euro. Geh&ouml;rt das Exemplar allerdings zu \
Spezies A, kriegen Sie kein Geld.\
<p>Am Ende des Experimentes werden wir Ihnen mitteilen, wie viele richtige \
Entscheidungen Sie getroffen haben und wie viel Geld Sie verdient haben. Dieses Geld \
wird Ihnen zus&auml;tzlich zur normalen Entlohnung f&uuml;r die Teilnahme an dieser \
Studie ausgezahlt." ;
if (lang=='en') { var learnCongrats= learnCongratsEn; }
if (lang=='de') { var learnCongrats= learnCongratsDe; }
return learnCongrats;
}
//var cLearnCongrats= new c(learnCongratsEn,learnCongratsDe);


//////////////////////////////////////////////////////////////////////////////////
// ALERTS
var startFamiliarizing_En ="The features are at the eye, claw, and tail of the plankton. There are two versions of each feature.\
If you click on one of the features the feature appearence will change.\
 To ensure that you have seen both versions of each feature, please click on each feature ";
var startFamiliarizing_De =unescape("\Die Merkmale sind das Auge, die Klaue und der Schwanz des Planktons. Sie haben je zwei Auspr%E4gungen. \
Wenn Sie auf eines der Merkmale klicken, %E4ndert sich die Merkmalsauspr%E4gung. \
Um sicherzugehen, dass Sie von jedem Merkmal beide Auspr%E4gungen gesehen haben, klicken Sie bitte auf jedes Merkmal ");
var cStartFamiliarizing= new c(startFamiliarizing_En,startFamiliarizing_De);

var endFamiliarizingEye_En="The experiment will start now. You will chose which species a plankton specimen belongs to. \
Use the arrow keys from now on. (Reminder: left indicates Species A and right indicates Species B. The up arrow advances to the next trial.) \
\n\n\
You can close your eyes to relax during the experiment. The software will recognize your eyes again afterwards. What is important is that you keep your head at the same position.\
\n\n\
After clicking OK you will see one plankton specimen with randomly chosen features. Please classify it according to which species it is by using the left or right arrow key.";
var endFamiliarizingEye_De=unescape("Nun beginnt das Experiment. Sie werden ausw%E4hlen, zu welcher Spezies ein Plankton-Exemplar geh%F6rt. \
Benutzen Sie dazu ab jetzt die Pfeiltasten. (Zur Erinnerung: Der Pfeil nach links steht f%FCr Spezies A und der Pfeil nach rechts f%FCr B. Der Pfeil aufw%E4rts startet den n%E4chsten Durchgang.) \
\n\n\
Sie k%F6nnen Ihre Augen w%E4hrend des Experiments zur Entspannung  schlie%DFen. Die Software erfasst Ihre Augen danach wieder. Wichtig ist, dass Sie Ihren Kopf in etwa an der gleichen Position behalten. \
\n\n\
Nachdem Sie auf OK geklickt haben, wird ein Plankton mit zuf%E4lligen Merkmalen angezeigt. Bitte klassifizieren Sie es mittels Tastendruck als zu einer Spezies zugeh%F6rig.");
var cEndFamiliarizingEye =new c(endFamiliarizing_En,endFamiliarizing_De);

var endFamiliarizing_En="The experiment will start now. You will chose which species a plankton specimen belongs to. \
Use the arrow keys from now on. (Reminder: left indicates Species A and right indicates Species B. The up arrow advances to the next trial.) \
\n\n\
After clicking OK you will see one plankton specimen with randomly chosen features. Please classify it according to which species it is by using the left or right arrow key.";
var endFamiliarizing_De=unescape("Nun beginnt das Experiment. Sie werden ausw%E4hlen, zu welcher Spezies ein Plankton-Exemplar geh%F6rt. \
Benutzen Sie dazu ab jetzt die Pfeiltasten. (Zur Erinnerung: Der Pfeil nach links steht f%FCr Spezies A und der Pfeil nach rechts f%FCr B. Der Pfeil aufw%E4rts startet den n%E4chsten Durchgang.) \
\n\n\
Nachdem Sie auf OK geklickt haben, wird ein Plankton mit zuf%E4lligen Merkmalen angezeigt. Bitte klassifizieren Sie es mittels Tastendruck als zu einer Spezies zugeh%F6rig.");
var cEndFamiliarizing =new c(endFamiliarizing_En,endFamiliarizing_De);
















var pleaseChooseSpeciesEn= "Please choose a category before clicking Next." ;  
var pleaseChooseSpeciesDe= "Bitte treffen Sie eine Entscheidung, bevor Sie auf Weiter klicken." ;
var cPleaseChooseSpecies= new c(pleaseChooseSpeciesEn,pleaseChooseSpeciesDe);

var pleaseClickFeatureEn= "Please click on a feature before choosing a species." ;
var pleaseClickFeatureDe= unescape("Bitte klicken Sie auf eines der Merkmale, bevor Sie eine Spezies w%E4hlen.") ;
var cPleaseClickFeature= new c(pleaseClickFeatureEn,pleaseClickFeatureDe);

var clickedTooMuch_En= "You have already clicked on the allowed number of features: ";
var clickedTooMuch_De= "Sie haben bereits die maximal erlaubte Merkmalsanzahl angeklickt: ";
var cClickedTooMuch= new c(clickedTooMuch_En,clickedTooMuch_De);

var alreadyChosenSpecies_En= "You have already chosen a species. You may click Next.";
var alreadyChosenSpecies_De= "Sie haben bereits eine Spezies gew&auml;hlt. Bitte machen Sie mit dem n&auml;chsten Exemplar weiter.";
var cAlreadyChosenSpecies= new c(alreadyChosenSpecies_En, alreadyChosenSpecies_De);

var howDoing1En= "\
How are you doing? If you continue responding like \
in the last 200 trials, you would average about " ;
var howDoing1De= "\
Hier ein Zwischenstand zu Ihrem Lernerfolg. \
Wenn Sie weiterhin so antworten wie in den \
letzten 200 Durchgaengen, erreichen Sie eine \
Trefferquote von ca.  " ;  
var cHowDoing1= new c(howDoing1En,howDoing1De);

var howDoing2En= "\
correct. The optimal strategy achieves about " ;
var howDoing2De= "\
. Die optimale Antwortstrategie wuerde eine \
Trefferquote von ca. " ;  
var cHowDoing2= new c(howDoing2En,howDoing2De);
var cHowDoing3= new c(" correct."," erreichen.");

var forgotToAnswer_En =unescape("You did not answer the following question: %22");
var forgotToAnswer_De =unescape("Die haben folgende Frage noch nicht beantwortet: %22");
var cForgotToAnswer =new c(forgotToAnswer_En, forgotToAnswer_De);

var forgotToAnswerPic1_En =unescape("You did not yet state something about plankton specimen number ");
var forgotToAnswerPic1_De =unescape("Sie haben noch keine Angabe zum ");
var cForgotToAnswerPic1 =new c(forgotToAnswerPic1_En, forgotToAnswerPic1_De);

var forgotToAnswerPic2_En =unescape(". Please answer the question. \n\n Thank you.");
var forgotToAnswerPic2_De =unescape(". Plankton-Exemplar gemacht. Bitte antworten Sie auf die Frage. \n\n Danke.");
var cForgotToAnswerPic2 =new c(forgotToAnswerPic2_En, forgotToAnswerPic2_De);

var ifYouSum_En ="If you sum up all the frequencies of the plankton specimen you get ";
var ifYouSum_De =unescape("Wenn man alle H%E4ufigkeiten der Plankton-Exemplare zusammenz%E4hlt, ergibt sich ");
var cIfYouSum = new c(ifYouSum_En,ifYouSum_De);

var butItShould_En =". This sum should equal 100. Please change your answers. \n\n Thank you.";
var butItShould_De=unescape(". Diese Summe sollte 100 ergeben. Bitte %E4ndern Sie Ihre Angaben. \n\n Danke.");
var cButItShould = new c(butItShould_En,butItShould_De);

var pleaseAnswer_En =unescape("%22 Please provide an answer to it. \n\n Thank you.");
var pleaseAnswer_De =unescape("%22 Bitte antworten Sie darauf. \n\n Danke.");
var cPleaseAnswer =new c(pleaseAnswer_En, pleaseAnswer_De);

var alertWhichFeatureMoreUseful_En= "Which feature (which combination of features) was most useful to determine whether the plankton specimens were Species A or Species B?";
var alertWhichFeatureMoreUseful_De= unescape("Welches Merkmal (welche Merkmalskombination) war am n%FCtzlichsten, um die Plankton-Exemplare der Spezies A oder B zuzuordnen?");
var cAlertWhichFeatureMoreUseful= new c(alertWhichFeatureMoreUseful_En,alertWhichFeatureMoreUseful_De);

var alertExplFeatureUse_En= unescape("Please explain why this feature (combination) was most useful:");
var alertExplFeatureUse_De= unescape("Bitte erl%E4utern Sie, warum dieses Merkmal (diese Merkmalskombination) am n%FCtzlichsten war:");
var cAlertExplFeatureUse= new c(alertExplFeatureUse_En,alertExplFeatureUse_De);

var alertWhichSpeciesMost_En= "Which species was most frequent overall?"; 
var alertWhichSpeciesMost_De= unescape("Welche Spezies kam insgesamt am h%E4ufigsten vor?");
var cAlertWhichSpeciesMost= new c(alertWhichSpeciesMost_En,alertWhichSpeciesMost_De);

var alertWhichSpeciesProp_En= "Overall, what percent of plankton belonged to each species?"; 
var alertWhichSpeciesProp_De= unescape("Wie viel Prozent des Planktons geh%F6rten insgesamt zu jeder Spezies?");
var cAlertWhichSpeciesProp= new c(alertWhichSpeciesProp_En,alertWhichSpeciesProp_De);


var alertWhichCausalModel_En="Which statement best describes how you think plankton and species are connected?";
var alertWhichCausalModel_De=unescape("Welche Aussage entspricht am ehesten Ihrer Vorstellung davon, wie die Plankton-Exemplare und die Spezies zusammenh%E4ngen?");
var cAlertWhichCausalModel=new c(alertWhichCausalModel_En,alertWhichCausalModel_De);






////////////////////////////////////////////////////////////////////////////
// END OF PAGES
var finishSubmitEn= "\
--When you have completed the questions, click \"Submit\". " ;  
var finishSubmitDe= "\
--Wenn Sie die Fragen beanwortet \
haben, klicken Sie auf &#132;Weiter&#148;. " ;  
var cFinishSubmit= new c(finishSubmitEn,finishSubmitDe);




////////////////////////////////////////////////////////////////////////////
// FAQ
var faqOldEn= "\
Please read the plankton experiment FAQ: \
<p>\
<br>Q:  Which features matter? \
<br>A:  Both features matter.  You must learn both features, or you won\'t \
be able to correctly classify the plankton. \
<p>\
<br>Q:  Do the proportion of plankton that are Species A and Species B \
change through the experiment?  Among plankton with a particular set \
of features, do the proportion that are Species A and B change? \
<br>A:  No.  It is as if every plankton is chosen at random from a pond \
with trillions of plankton specimens. \
<p>\
<br>Q:  Is speed or accuracy more important? \
<br>A:  Speed doesn\'t matter at all.  Concentrate on learning every \
combination of features. \
<p>\
<br>Q:  Are there shortcut keys? \
<br>A:  You can use arrows as shortcut keys: Left for Species A, Up for \
Next, and Right for Species B. \
<p>\
<br>Q:  I have figured out every combination of features.  When does the \
software detect that I\'ve learned? \
<br>A:  If you consistently pick the most probable species for each \
combination of features, it usually takes 300-400 trials for the \
software to detect that you\'ve learned. \
<p>\
<br>Q:  How many trials are there? \
<br>A:  It depends how quickly you learn, and consistently respond \
optimally.\
<p>\
Q:  What does it mean to respond optimally? \
Imagine a slightly head-biased coin. \
The optimal strategy would be to always guess heads. \
Even though it doesn't predict every single toss, the \
optimal strategy maximizes the number of correct predictions over the long run.\
<p>\
<br>Q:  I have a question that isn\'t on the FAQ.  I don\'t understand the FAQ. \
<br>A:  Please ask! " ; 
var faqOldDe= "\
Bitte lesen Sie die Plankton-Studie FAQ:\
<p>\
<br>F: Welche Merkmale sind wichtig?\
<br>A: Beide Merkmale sind wichtig. Sie m&uuml;ssen beide Merkmale \
lernen, sonst k&ouml;nnen Sie nicht erfolgreich lernen, die \
Plankton-Exemplare zu klassifizieren. \
<p>\
<br>F: &Auml;ndert sich der Anteil an Plankton, der zu Spezies A und \
zu Spezies B geh&ouml;rt, w&auml;hrend des Experimentes? &Auml;ndert \
sich der Anteil, der zu Spezies A und B geh&ouml;rt, innerhalb des \
Plankton mit einer bestimmten Merkmalskombination? \
<br>A: Nein. Es ist so als w&uuml;rde jedes Plankton zuf&auml;llig aus \
einem Pool von Trillionen von Plankton-Exemplaren gezogen werden. \
<p>\
<br>F: Ist Geschwindigkeit oder Trefferquote wichtiger? \
<br>A: Die Geschwindigkeit ist &uuml;berhaupt nicht wichtig. \
Konzentrieren Sie sich darauf, jede Merkmalskombination zu lernen. \
<p>\
<br>F:  Gibt es Shortcuts? \
<br>A:  Ja. Sie k&ouml;nnen auch die Pfeiltasten benutzen: \
Dr&uuml;cken Sie einfach &#132;Links&#148; f&uuml;r \
Spezies A, &#132;Oben&#148; f&uuml;r \
Weiter, und &#132;Rechts&#148; f&uuml;r Spezies B. \
<p>\
<br>F: Ich habe jede Merkmalskombination herausgefunden. Wann bemerkt \
die Software, dass ich die Spezies gelernt habe? \
<br>A: Wenn Sie konsistent die wahrscheinlichste Spezies f&uuml;r jede \
Merkmalskombination ausw&auml;hlen, dauert es normalerweise 300-400 \
Durchg&auml;nge bis die Software bemerkt, dass Sie die beiden Spezies \
gelernt haben. \
<p>\
<br>F: Wie viele Durchg&auml;nge gibt es? \
<br>A: Es kommt darauf an, wie schnell Sie lernen, konsistent optimal \
zu antworten. \
<p>\
<br>F: Was hei&szlig;t &#132;optimal antworten&#148;?\
<br>A: Stellen Sie sich vor, Sie werfen eine M&uuml;nze, die eine \
leichte Tendenz hat, bei einem Wurf eher Kopf zu zeigen. Optimal \
antworten hie&szlig;e in dem Fall, dass man immer Kopf sagt. Auch \
wenn man mit dieser Strategie nicht jeden einzelnen M&uuml;nzwurf \
richtig vorhersagen kann, maximiert man so auf lange Sicht die Anzahl \
der korrekten Vorhersagen.\
<p>\
<br>F: Ich habe eine Frage, die nicht in den FAQ enthalten ist. Ich \
verstehe die FAQ nicht. \
<br>A: Bitte fragen Sie nach! "  
var cFaqOld= new c(faqOldEn,faqOldDe) ;

var learnManyFeatEn= "mini-FAQ: \nQ: \
I've only learned one feature. Is that okay?  \
\nA: No.  More than one feature matters. \
You must learn all the features, to be able to learn \
to categorize the plankton. " ;
var learnManyFeatDe= "mini-FAQ: \n\
F: Ich habe nur ein Merkmal gelernt.  Reicht das?  \
\nA: Leider nicht!  Mehr als ein Merkmal ist wichtig.  \
Sie muessen alle Merkmale lernen, um die Plankton-\
Exemplare erfolgreich zu klassifizieren. " ;
var cLearnManyFeat= new c(learnManyFeatEn,learnManyFeatDe);




/////////////////////////////////////////////////////////////////////////////////
// Vuma
var cVumaTitle= new c("Vuma experiment","Vuma-Studie");

var plankEndStartVumaEn= "\
Thank you for doing the experiment: you have finished it. We \
would now like you to do a different experiment that will take 5-10 \
minutes. " ;  
var plankEndStartVumaDe= "\
Vielen Dank f&uuml;r Ihre Teilnahme an der Studie: Sie haben es \
geschafft. Wir bitten Sie nun, noch ein anderes Experiment zu \
bearbeiten, welches ca. 5-10 Minuten dauert. " ;  
var cPlankEndStartVuma= new c(plankEndStartVumaEn,plankEndStartVumaDe);

var vumaImagineVisitEn= "\
Imagine you are visiting the planet Vuma. There are 1 million \
creatures on Vuma; " ; 
var vumaImagineVisitDe= "\
Stellen Sie sich vor, Sie \
besuchen den Planeten Vuma. \
Es gibt 1 Million Lebewesen auf Vuma; " ;  
var cVumaImagineVisit= new c(vumaImagineVisitEn,vumaImagineVisitDe);

var cVumaRemember= new c("Remember that","Denken Sie daran: ");

var vumaInvisibleMetEn= "\
All creatures are \
invisible to the human eye, so you cannot learn about them by looking \
at them, but only by asking them questions. \
<p>Suppose you have just met a creature from Vuma. Your job is to tell \
which of the two kinds of creatures it is. The table below gives \
information about the percent of Gloms, and the percent of Fizos, with \
certain characteristics. (The characteristics are listed in a random \
order.) ";



var vumaInvisibleMetDe= "\
Alle Lebewesen sind f&uuml;r das menschliche \
Auge unsichtbar. Daher k&ouml;nnen Sie nichts &uuml;ber die Lebewesen lernen, \
indem Sie sie anschauen, sondern nur, indem Sie ihnen Fragen stellen. \
<p>Nehmen Sie an, Sie h&auml;tten gerade ein Lebewesen von Vuma \
getroffen. Es ist Ihre Aufgabe zu entscheiden, ob dieses Lebewesen \
ein Glom oder ein Fizo ist. Die untere \
Tabelle enth&auml;lt Informationen &uuml;ber den prozentualen Anteil der Gloms und Fizos \
mit bestimmten Eigenschaften. (Die Eigenschaften sind in zuf&auml;lliger \
Reihenfolge aufgelistet.) " ;
var cVumaInvisibleMet= new c(vumaInvisibleMetEn,vumaInvisibleMetDe) ;



var vumaImagineRankEn= "\
Imagine that to help \
you find out the identity of the creature, you could ask it one yes or \
no question, about one of its characteristics. For instance, if \"swims \
fast\" were a characteristic, you could ask \"Do you swim fast?\". The \
creature answers truthfully.    \
<p>Considering the information given, which of the possible questions \
would be most useful to help you learn whether the creature is a Glom \
or Fizo? Please rank the questions below, choosing \"1\" for the \
most-useful question, \"2\" for the next-most-useful question, and \"3\" \
for the least-useful question. If two questions are equally useful, \
give them the same rank.</p>" ;          
var vumaImagineRankDe= "\
Stellen Sie sich vor, dass Sie eine Ja-oder-Nein Frage &uuml;ber eine der \
Eigenschaften stellen k&ouml;nnen, um die Identit&auml;t des \
Lebewesen herauszufinden. Wenn zum Beispiel &#132;schwimmt schnell&#148; \
eine Eigenschaft w&auml;re, k&ouml;nnten Sie fragen &#132;Schwimmst Du schnell?&#148;. Die \
Lebewesen antwortet immer wahrheitsgetreu. \
<p>Wenn Sie die gegebenen Informationen \
ber&uuml;cksichtigen: Welche der m&ouml;glichen Fragen w&auml;re f&uuml;r Sie am \
n&uuml;tzlichsten, um herauszufinden, ob ein Lebewesen ein Glom oder ein Fizo \
ist? Bitte bringen Sie die unten stehenden Fragen in eine Rangordnung, indem \
Sie &#132;1&#148; f&uuml;r die n&uuml;tzlichste Frage, &#132;2&#148; f&uuml;r die zweitn&uuml;tzlichste, und \
&#132;3&#148; f&uuml;r die am wenigsten n&uuml;tzlichste Frage verwenden. Sollten zwei \
Fragen gleich n&uuml;tzlich sein, geben Sie ihnen den gleichen Rangplatz.</p>" ;  
var cVumaImagineRank= new c(vumaImagineRankEn,vumaImagineRankDe);



var cVumaF1= new c("drinks&nbsp;tea","Trinkt&nbsp;Tee");
var cVumaF2= new c("wears&nbsp;a&nbsp;hula-hoop","Tr&auml;gt&nbsp;einen Hula-Hoop Reifen");
var cVumaF3= new c("gurgles&nbsp;a&nbsp;lot","Gurgelt Viel");



var cVumaPropGloms= new c("proportion of Gloms","% der Gloms");
var cVumaPropFizos= new c("proportion of Fizos","% der Fizos");



var vumaResponseTableEn= "\
<table class='usual' cellpadding=10>\
<tr>\
<td>\
Question\
</td>\
<td>\
&nbsp;\
Rank\
&nbsp;\
</td>\
<td>\
&nbsp;&nbsp;\
Please explain why you made each choice\
</td>\
</tr>\
<tr>\
<td>\
Do you drink tea?\
</td>\
<td> \
  <select name='drink' id='drink'>\
  <option value='0'> (choose)\
  <option value='1'>1 (most useful)\
  <option value='2'>2 \
  <option value='3'>3 (least useful)\
  </select>\
</td>\
<td>\
  <input type=text name='drinkExplain' id='drinkExplain' size=45 value=' '>\
</td>\
</tr>\
<tr>\
<td>\
Do you wear a hula-hoop?&nbsp;\
</td>\
<td>\
  <select name='hula' id='hula'>\
  <option value='0'> (choose)\
  <option value='1'>1 (most useful)\
  <option value='2'>2 \
  <option value='3'>3 (least useful)\
  </select>\
</td>\
<td>\
  <input type=text name='hulaExplain' id='hulaExplain' size=45 value=' '>\
</td>\
</tr>\
<tr>\
<td>\
Do you gurgle a lot?\
</td>\
<td>\
  <select name='gurgle' id='gurgle'>\
  <option value='0'> (choose)\
  <option value='1'>1 (most useful)\
  <option value='2'>2 \
  <option value='3'>3 (least useful)\
  </select>\
</td>\
<td>\
  <input type=text name='gurgleExplain' id='gurgleExplain' size=45 value=' '>\
</td>\
</tr>\
</table>" ;  

var vumaResponseTableDe= "\
<table class='usual' cellpadding=10>\
<tr>\
<td>\
Frage\
</td>\
<td>\
&nbsp;\
Rang\
&nbsp;\
</td>\
<td>\
&nbsp;&nbsp;\
Bitte erkl&auml;ren Sie, warum Sie die jeweilige\
Entscheidung getroffen haben.\
</td>\
</tr>\
<tr>\
<td>\
Trinkst Du Tee?\
</td>\
<td> \
  <select name='drink' id='drink'>\
  <option value='0'> (w&auml;hlen)\
  <option value='1'>1 (am n&uuml;tzlichsten)\
  <option value='2'>2 \
  <option value='3'>3 (am wenigsten n&uuml;tzlich)\
  </select>\
</td>\
<td>\
  <input type=text name='drinkExplain' id='drinkExplain' size=45 value=' '>\
</td>\
</tr>\
<tr>\
<td>\
Tr&auml;gst Du einen Hula-Hoop?&nbsp;\
</td>\
<td>\
  <select name='hula' id='hula'>\
  <option value='0'> (w&auml;hlen)\
  <option value='1'>1 (am n&uuml;tzlichsten)\
  <option value='2'>2 \
  <option value='3'>3 (am wenigsten n&uuml;tzlich)\
  </select>\
</td>\
<td>\
  <input type=text name='hulaExplain' id='hulaExplain' size=45 value=' '>\
</td>\
</tr>\
<tr>\
<td>\
Gurgelst Du viel?\
</td>\
<td>\
  <select name='gurgle' id='gurgle'>\
  <option value='0'> (w&auml;hlen)\
  <option value='1'>1 (am n&uuml;tzlichsten)\
  <option value='2'>2 \
  <option value='3'>3 (am wenigsten n&uuml;tzlich)\
  </select>\
</td>\
<td>\
  <input type=text name='gurgleExplain' id='gurgleExplain' size=45 value=' '>\
</td>\
</tr>\
</table>" ;   
var cVumaResponseTable= new c(vumaResponseTableEn,vumaResponseTableDe);



var vumaClickSubmitEn= "\
When you have competed the Vuma experiment, click \"Submit:\" ";  
var vumaClickSubmitDe= "\
Wenn Sie das \
Vuma-Experiment beendet haben, klicken Sie auf &#132;Fertigstellen:&#148; "; 
var cVumaClickSubmit= new c(vumaClickSubmitEn,vumaClickSubmitDe) ; 



var thanksEn= "Thank you for participating in this study. <p> \
The aim of this experiment is to investigate probabilistic learning. \
It might be the case that for instance, certain feature combinations only probabilistically \
imply the species of a plankton specimen.  <p>If you would like to \
learn more, please contact Jonathan Nelson (nelson@mpib-berlin.mpg.de) \
and Jana Jarecki (jarecki@mpib-berlin.mpg.de). " ; 
var thanksDe= "Vielen Dank f&uuml;r die Teilnahme an dieser Studie. <p>\
Ziel dieses Experimentes ist es zu untersuchen, wie Menschen \
probabilistische, d.h. wahrscheinlichkeitstheoretische Informationen lernen und nutzen. \
Es kann sein, dass es nicht m&ouml;glich war f&uuml;r bestimmte Merkmalskombinationen immer \
eine definitive Entscheidung zu treffen, welcher Spezies ein \
bestimmtes Plankton-Exemplar angeh&ouml;rt. Man kann aber lernen - \
und das haben Sie erfolgreich getan - dass es mit einer \
bestimmten Wahrscheinlichkeit zu Spezies A oder B geh&ouml;rt. <p> \
Wenn Sie an weiteren Informationen interessiert sind oder Fragen \
haben, k&ouml;nnen Sie sich gerne an einen der beiden Projektleiter \
wenden: Jonathan  Nelson (nelson@mpib-berlin.mpg.de) und \
Jana Jarecki (jarecki@mpib-berlin.mpg.de)." ;  
var cThanks= new c(thanksEn,thanksDe);



function testMessages() {
   document.writeln("<br>lang is " +lang);
   document.writeln("<br><br><hr><br> cPreInstr.text: <br>" +cPreInstr.text);
   document.writeln("<br><br><hr><br> cYourJob.text: <br>" +cYourJob.text);
   document.writeln("<br><br><hr><br> cBePatient.text: <br>" +cBePatient.text);
   document.writeln("<br><br><hr><br> cShortcuts.text: <br>" +cShortcuts.text);
   document.writeln("<br><br><hr><br> cLearnCongratsOrig.text: <br>" +cLearnCongratsOrig.text);
   document.writeln("<br><br><hr><br> cPlankEndStartVuma.text: <br>" +cPlankEndStartVuma.text);
   document.writeln("<br><br><hr><br> cClickEndKnowTest.text: <br>" +cClickEndKnowTest.text);
   document.writeln("<br><br><hr><br> cWhichSpeciesMost.text: <br>" +cWhichSpeciesMost.text);
   document.writeln("<br><br><hr><br> cPropEachSpecies.text: <br>" +cPropEachSpecies.text); 
   document.writeln("<br><br><hr><br> cVumaImagineVisit: <br>" +cVumaImagineVisit.text);
   document.writeln("<br><br><hr><br> cVumaImagineRank.text: <br>" +cVumaImagineRank.text); 
   document.writeln("<br><br><hr><br> cVumaResponseTable.text: <br>" +cVumaResponseTable.text); 
   document.writeln("<br><br><hr><br> cVumaClickSubmit.text: <br>" +cVumaClickSubmit.text);
   document.writeln("<br><br><hr><br> cVumaInvisibleMet: <br>" +cVumaInvisibleMet.text);
   //document.writeln("<br><br><hr><br> : <br>" +.text);
   //document.writeln("<br><br><hr><br> : <br>" +.text);
}

 
 
var alertPractice= "Your job is to correctly guess what species (A or B) each plankton is, "
alertPractice= alertPractice + "by clicking A or B. "
alertPractice= alertPractice + "If you are right, the ? turns into a smiley face. "
alertPractice= alertPractice + "(Otherwise it turns into a frowny face.) "
alertPractice= alertPractice + "When you are ready to go to the next trial, click Next."



//var alertRealExptNow= "The real experiment is beginning now.  "
//alertRealExptNow= alertRealExptNow + "It is okay (and a good idea) to take short breaks during the experiment.  "



var alertHard= "Remember that in some cases, plankton from the different species are visually identical, "
alertHard= alertHard + "so it is not always possible to know the true species for sure.  "
alertHard= alertHard + "Also note that each species includes plankton with several different combinations of features.  "
alertHard= alertHard + "When you aren't sure the true species, make your best guess.  "



var alertPatience= "It takes several hundred trials to start to learn about the different species, so please be patient. "



//alertShortcut=  "You can use arrows as shortcut keys: left for A,  "
//alertShortcut= alertShortcut + "up for Next,  and right for B. "

alertOneClick= '';
alertOneClick= alertOneClick + "Congratulations on learning so well! \n\n" ;
alertOneClick= alertOneClick + "*** Please tell the experimenter that you have finished the first parts of the experiment. ***\n\n"
alertOneClick= alertOneClick + "In this part of the experiment the features are completely blurred, in the beginning of each trial.  " ;
alertOneClick= alertOneClick + "You can select a feature to reveal by clicking on it, to help you learn the true species.  " ;
alertOneClick= alertOneClick + "The only change is that the features are blurred.  The kinds of plankton are the same as before.  " ;
alertOneClick= alertOneClick + "Please click on the feature of your choice, in each trial.  "

alertVuma= "Thank you for doing the plankton experiment: you have finished it.  " 
alertVuma= alertVuma +"We would now like you to do a different experiment that will take 5-10 minutes. "


// I'll put this text below info on the page, when needed
var spacerText= "<br><br><br><hr><br><br></p>" ;








function disp(someString) {  
   alert(someString) ;  
}

function roundArr(inputArr, places) {
   // assume inputArr = new Array(1.23, 4.56, 7.8901)
   // roundArray(inputArr, 1) will return (1.2, 4.6, 7.9)
   items= inputArr.length ;
   outputArr= new Array(items);
   for( i=0; i<items; ++i ) {
      outputArr[i]= roundNum(inputArr[i], places);
   }
   return outputArr;
}

function roundNum(input, places) {
   // roundJN( .12345, 2 ) returns .12
   // I assume the input is a single number
   wnum= input * Math.pow(10,places) ;
   wnum= Math.round(wnum) ;
   wnum= wnum / Math.pow(10,places) ;
   return wnum ;
}


function openRandomPlankton() {
  // get info from url; process values
  var locn= location.href;  
  var longArr= locn.split("?");
  var preUrl= longArr[0];  
  // make sure the location includes appended stuff.  
  if(longArr[1]==undefined) {
     alert(' specific info not provided; using subject number 0 for experiment');
     var subjNum= 0 ;
  }
  else {
     var subjNum= jp('S',longArr[1]) ; 
  }
  nextUrl= 'http://cnl.salk.edu/~jnelson/stimuli/random.html'  +jm('S', subjNum) ;
  window.location= nextUrl;
}


function randomizeInfo(preInfo) {
// june 2009 note: added lang info to info array
//   randomizes several aspects of probabilities
//   to balance which species is most probable,
//   what probabilities pair with tail/eye/claw,
//   and polarity of each feature
//   returns a comma-delimited string
//   we have [pa p1ia p1ib p2ia p2ia p3ia p3ib lang]
// JJ 2010-10 now we have [pa p1p2p3ia p1p2p3ib p1p2pn3ia p1p2pn3ib p1pn2p3ia p1pn2p3ib p1pn2pn3ia p1pn2pn3ib pn1p2p3ia pn1p2p3ib pn1p2np3ia pn1p2np3ib pn1pn2p3ia pn1pn2p3ib pn1pn2pn3ia pn1pn2pn3ib  lang]
   if( preInfo.length> 18)  { 
      s= 'problem with preInfo.length: should be 17 or 18 (for dependent probabilities) but is ';
      s= s + preInfo.length;
      disp(s)
   } // i'm not doing error checking to make sure each element is a probability

   // pick whether species A or B will be most probable & set feature probs accordingly
   if (Math.random()<0.5)  { 
      pA    =preInfo[0];
      pf1_a =preInfo[1];
      pf1_b =preInfo[2];
      pf2_a =preInfo[3];
      pf2_b =preInfo[4];
      pf3_a =preInfo[5];
      pf3_b =preInfo[6];
   }
   else {
      pA    =1 - preInfo[0] ; 
      pf1_a =preInfo[2];
      pf1_b =preInfo[1];
      pf2_a =preInfo[4];
      pf2_b =preInfo[3];
      pf3_a =preInfo[6];
      pf3_b =preInfo[5];
   }

   // randomize the polarity of every feature probability
   if (Math.random()>0.5)  { pf1_a= 1 - pf1_a ;  pf1_b= 1 - pf1_b ; }
   if (Math.random()>0.5)  { pf2_a= 1 - pf2_a ;  pf2_b= 1 - pf2_b ; }
   if (Math.random()>0.5)  { pf3_a= 1 - pf3_a ;  pf3_b= 1 - pf3_b ; }

   // randomize the order of features 1 through 3
   whichOrder= Math.random();
   if(whichOrder<(1/6))          // 1 2 3
      workingInfo= new Array(pA, pf1_a, pf1_b, pf2_a, pf2_b, pf3_a, pf3_b );
   else if(whichOrder<(2/6))     // 1 3 2
      workingInfo= new Array(pA, pf1_a, pf1_b, pf3_a, pf3_b, pf2_a, pf2_b );
   else if(whichOrder<(3/6))     // 2 1 3
      workingInfo= new Array(pA, pf2_a, pf2_b, pf1_a, pf1_b, pf3_a, pf3_b );
   else if(whichOrder<(4/6))     // 2 3 1
      workingInfo= new Array(pA, pf2_a, pf2_b, pf3_a, pf3_b, pf1_a, pf1_b );
   else if(whichOrder<(5/6))     // 3 1 2
      workingInfo= new Array(pA, pf3_a, pf3_b, pf1_a, pf1_b, pf2_a, pf2_b );
   else if(whichOrder<1)         // 3 2 1
      workingInfo= new Array(pA, pf3_a, pf3_b, pf2_a, pf2_b, pf1_a, pf1_b );
   else
      disp('trouble nhy67ujm in randomizeInfo in plankton.js');

   workingInfo= roundArr( workingInfo, 4 )
   return workingInfo.join(',') ;
} 


function randomizeInfo_n(preInfo) {
//n new randomizeInfo doesnt randomize the order of the features
// returns a comma-delimited string
   // we have [pa p1ia p1ib p2ia p2ia p3ia p3ib lang]
   if( preInfo.length!=8 & preInfo.length!=7)  { 
      s= 'problem with preInfo.length.  should be 7 or 8 but is ';
      s= s + preInfo.length;
      disp(s)
   } // i'm not doing error checking to make sure each element is a probability

   // pick whether species A or B will be most probable, 
   //  and set feature probs accordingly
   if (Math.random()<0.5)  { 
      pA= preInfo[0];
      pf1_a= preInfo[1];
      pf1_b= preInfo[2];
      pf2_a= preInfo[3];
      pf2_b= preInfo[4];
      pf3_a= preInfo[5];
      pf3_b= preInfo[6];
   }
   else  {
      pA= 1 - preInfo[0] ; 
      pf1_a= preInfo[2];
      pf1_b= preInfo[1];
      pf2_a= preInfo[4];
      pf2_b= preInfo[3];
      pf3_a= preInfo[6];
      pf3_b= preInfo[5];
   }

   // randomize the polarity of every feature probability
   if (Math.random()>0.5)  {  pf1_a= 1 - pf1_a ;  pf1_b= 1 - pf1_b ;  }
   if (Math.random()>0.5)  {  pf2_a= 1 - pf2_a ;  pf2_b= 1 - pf2_b ;  }
   if (Math.random()>0.5)  {  pf3_a= 1 - pf3_a ;  pf3_b= 1 - pf3_b ;  }

	workingInfo= new Array(pA, pf1_a, pf1_b, pf2_a, pf2_b, pf3_a, pf3_b );

   workingInfo= roundArr( workingInfo, 4 )
   return workingInfo.join(',') ;
} 	

function randomizeInfo_j(preInfo) {
//JJ 17-digit input randomization
//returns a string w randomized polarities and order of features

   // The info is [pa p1p2p3ia p1p2p3ib p1p2pn3ia p1p2pn3ib p1pn2p3ia p1pn2p3ib p1pn2pn3ia 
   // pn1p2p3ia pn1p2p3ib pn1p2np3ia pn1p2np3ib pn1pn2p3ia pn1pn2p3ib pn1pn2pn3ia pn1pn2pn3ib  lang]
   // no error checking to make sure each element is a probability
   if(preInfo.length>18)  {
      s= 'problem with preInfo.length.  should be 17 or 18 but is ';
      s= s + preInfo.length;
      disp(s)
   }

   // pick whether species A or B will be most probable, set feature probs accordingly
   if (Math.random()<0.5)  { 
      pA          =preInfo[0];
      pf111_awork =preInfo[1];
      pf111_bwork =preInfo[2];
      pf112_awork =preInfo[3];
      pf112_bwork =preInfo[4];
      pf121_awork =preInfo[5];
      pf121_bwork =preInfo[6];
	    pf122_awork =preInfo[7];
	    pf122_bwork =preInfo[8];
	    pf211_awork =preInfo[9];
      pf211_bwork =preInfo[10];
      pf212_awork =preInfo[11];
      pf212_bwork =preInfo[12];
      pf221_awork =preInfo[13];
      pf221_bwork =preInfo[14];
	    pf222_awork =preInfo[15];
	    pf222_bwork =preInfo[16];
   } else  {
      pA          =1-preInfo[0];
      pf111_awork =preInfo[2];
      pf111_bwork =preInfo[1];
      pf112_awork =preInfo[4];
      pf112_bwork =preInfo[3];
      pf121_awork =preInfo[6];
      pf121_bwork =preInfo[5];
	    pf122_awork =preInfo[8];
	    pf122_bwork =preInfo[7];
	    pf211_awork =preInfo[10];
      pf211_bwork =preInfo[9];
      pf212_awork =preInfo[12];
      pf212_bwork =preInfo[11];
      pf221_awork =preInfo[14];
      pf221_bwork =preInfo[13];
	    pf222_awork =preInfo[16];
	    pf222_bwork =preInfo[15];
   }
   
   // randomize the polarity of every feature probability
	 var randomNr =Math.random();
   if (randomNr<1/8)  {	//changing nothing
		var pf111_awork2 =pf111_awork ;  var pf111_bwork2 =pf111_bwork ;  
		var pf112_awork2 =pf112_awork ;  var pf112_bwork2 =pf112_bwork ; 
		var pf121_awork2 =pf121_awork ;  var pf121_bwork2 =pf121_bwork ; 
		var pf122_awork2 =pf122_awork ;  var pf122_bwork2 =pf122_bwork ; 
		var pf211_awork2 =pf211_awork ;  var pf211_bwork2 =pf211_bwork ; 
		var pf212_awork2 =pf212_awork ;  var pf212_bwork2 =pf212_bwork ; 
		var pf221_awork2 =pf221_awork ;  var pf221_bwork2 =pf221_bwork ; 
		var pf222_awork2 =pf222_awork ;  var pf222_bwork2 =pf222_bwork ; 
	}	else if (randomNr<2/8)  {	//just first feature (f)
		var pf111_awork2 =pf211_awork ;  var pf111_bwork2= pf211_bwork  ;  
		var pf112_awork2 =pf212_awork ;  var pf112_bwork2= pf212_bwork  ; 
		var pf121_awork2 =pf221_awork ;  var pf121_bwork2= pf221_bwork  ; 
		var pf122_awork2 =pf222_awork ;  var pf122_bwork2= pf222_bwork  ; 
		var pf211_awork2 =pf111_awork ;  var pf211_bwork2= pf111_bwork  ; 
		var pf212_awork2 =pf112_awork ;  var pf212_bwork2= pf112_bwork  ; 
		var pf221_awork2 =pf121_awork ;  var pf221_bwork2= pf121_bwork  ; 
		var pf222_awork2 =pf122_awork ;  var pf222_bwork2= pf122_bwork  ; 
	} else if (randomNr<3/8)  {	//just second feature (g)
		var pf111_awork2= pf121_awork ;  var pf111_bwork2= pf121_bwork  ;  
		var pf112_awork2= pf122_awork ;  var pf112_bwork2= pf122_bwork  ; 
		var pf121_awork2= pf111_awork ;  var pf121_bwork2= pf111_bwork  ; 
		var pf122_awork2= pf112_awork ;  var pf122_bwork2= pf112_bwork  ; 
		var pf211_awork2= pf221_awork ;  var pf211_bwork2= pf221_bwork  ; 
		var pf212_awork2= pf222_awork ;  var pf212_bwork2= pf222_bwork  ; 
		var pf221_awork2= pf211_awork ;  var pf221_bwork2= pf211_bwork  ; 
		var pf222_awork2= pf212_awork ;  var pf222_bwork2= pf212_bwork  ; 
	} else if (randomNr<4/8)  {	//just third feature (h)
		var pf111_awork2= pf112_awork ;  var pf111_bwork2= pf112_bwork  ;  
		var pf112_awork2= pf111_awork ;  var pf112_bwork2= pf111_bwork  ; 
		var pf121_awork2= pf122_awork ;  var pf121_bwork2= pf122_bwork  ; 
		var pf122_awork2= pf121_awork ;  var pf122_bwork2= pf121_bwork  ; 
		var pf211_awork2= pf212_awork ;  var pf211_bwork2= pf212_bwork  ; 
		var pf212_awork2= pf211_awork ;  var pf212_bwork2= pf211_bwork  ; 
		var pf221_awork2= pf222_awork ;  var pf221_bwork2= pf222_bwork  ; 
		var pf222_awork2= pf221_awork ;  var pf222_bwork2= pf221_bwork  ; 
	} else if (randomNr<5/8)  {	//first and second (fg)
		var pf111_awork2= pf221_awork ;  var pf111_bwork2= pf221_bwork  ;  
		var pf112_awork2= pf222_awork ;  var pf112_bwork2= pf222_bwork  ; 
		var pf121_awork2= pf211_awork ;  var pf121_bwork2= pf211_bwork  ; 
		var pf122_awork2= pf212_awork ;  var pf122_bwork2= pf212_bwork  ; 
		var pf211_awork2= pf121_awork ;  var pf211_bwork2= pf121_bwork  ; 
		var pf212_awork2= pf122_awork ;  var pf212_bwork2= pf122_bwork  ; 
		var pf221_awork2= pf111_awork ;  var pf221_bwork2= pf111_bwork  ; 
		var pf222_awork2= pf112_awork ;  var pf222_bwork2= pf112_bwork  ; 
	} else if (randomNr<6/8)  {	//first and third (fh)
		var pf111_awork2= pf212_awork ;  var pf111_bwork2= pf212_bwork  ;  
		var pf112_awork2= pf211_awork ;  var pf112_bwork2= pf211_bwork  ; 
		var pf121_awork2= pf222_awork ;  var pf121_bwork2= pf222_bwork  ; 
		var pf122_awork2= pf221_awork ;  var pf122_bwork2= pf221_bwork  ; 
		var pf211_awork2= pf112_awork ;  var pf211_bwork2= pf112_bwork  ; 
		var pf212_awork2= pf111_awork ;  var pf212_bwork2= pf111_bwork  ; 
		var pf221_awork2= pf122_awork ;  var pf221_bwork2= pf122_bwork  ; 
		var pf222_awork2= pf121_awork ;  var pf222_bwork2= pf121_bwork  ;
	} else	if (randomNr<7/8)  {	//second and third (gh)
		var pf111_awork2= pf122_awork ;  var pf111_bwork2= pf122_bwork  ;  
		var pf112_awork2= pf121_awork ;  var pf112_bwork2= pf121_bwork  ; 
		var pf121_awork2= pf112_awork ;  var pf121_bwork2= pf112_bwork  ; 
		var pf122_awork2= pf111_awork ;  var pf122_bwork2= pf111_bwork  ; 
		var pf211_awork2= pf222_awork ;  var pf211_bwork2= pf222_bwork  ; 
		var pf212_awork2= pf221_awork ;  var pf212_bwork2= pf221_bwork  ; 
		var pf221_awork2= pf212_awork ;  var pf221_bwork2= pf212_bwork  ; 
		var pf222_awork2= pf211_awork ;  var pf222_bwork2= pf211_bwork  ;
	}	else if (randomNr<1)  {	//first, second, third (fgh)
		var pf111_awork2= pf222_awork ;  var pf111_bwork2= pf222_bwork  ;  
		var pf112_awork2= pf221_awork ;  var pf112_bwork2= pf221_bwork  ; 
		var pf121_awork2= pf212_awork ;  var pf121_bwork2= pf212_bwork  ; 
		var pf122_awork2= pf211_awork ;  var pf122_bwork2= pf211_bwork  ; 
		var pf211_awork2= pf122_awork ;  var pf211_bwork2= pf122_bwork  ; 
		var pf212_awork2= pf121_awork ;  var pf212_bwork2= pf121_bwork  ; 
		var pf221_awork2= pf112_awork ;  var pf221_bwork2= pf112_bwork  ; 
		var pf222_awork2= pf111_awork ;  var pf222_bwork2= pf111_bwork  ;
	}

	// workingInfo= new Array(pA, pf111_a, pf111_b, pf112_a, pf112_b, pf121_a, pf121_b,
		// pf122_a, pf122_b, pf211_a, pf211_b, pf212_a, pf212_b, pf221_a, pf221_b, pf222_a,
		// pf222_b);
  
   // randomize the order of features 1 through 3
   var whichOrder= Math.random();
   if(whichOrder<(1/6)) {         // f,g,h
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf112_awork2, pf112_bwork2, 
         pf121_awork2, pf121_bwork2, 
         pf122_awork2, pf122_bwork2,
         pf211_awork2, pf211_bwork2, 
         pf212_awork2, pf212_bwork2, 
         pf221_awork2, pf221_bwork2, 
         pf222_awork2,	pf222_bwork2);
   } else if(whichOrder<(2/6)) {    // f,h,g
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf121_awork2, pf121_bwork2, 
         pf112_awork2, pf112_bwork2, 
         pf122_awork2, pf122_bwork2,
         pf211_awork2, pf211_bwork2, 
         pf221_awork2, pf221_bwork2, 
         pf212_awork2, pf212_bwork2, 
         pf222_awork2,	pf222_bwork2);
   } else if(whichOrder<(3/6)) {    // g,f,h
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf112_awork2, pf112_bwork2, 
         pf211_awork2, pf211_bwork2, 
         pf212_awork2, pf212_bwork2,
         pf121_awork2, pf121_bwork2, 
         pf122_awork2, pf122_bwork2, 
         pf221_awork2, pf221_bwork2, 
         pf222_awork2,	pf222_bwork2);
   } else if(whichOrder<(4/6)) {    // g,h,f
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf121_awork2, pf121_bwork2, 
         pf211_awork2, pf211_bwork2, 
         pf221_awork2, pf221_bwork2,
         pf112_awork2, pf112_bwork2, 
         pf122_awork2, pf122_bwork2, 
         pf212_awork2, pf212_bwork2, 
         pf222_awork2,	pf222_bwork2);
   } else if(whichOrder<(5/6)) {    // h,f,g
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf211_awork2, pf211_bwork2, 
         pf112_awork2, pf112_bwork2, 
         pf212_awork2, pf212_bwork2,
         pf121_awork2, pf121_bwork2, 
         pf221_awork2, pf221_bwork2, 
         pf122_awork2, pf122_bwork2, 
         pf222_awork2,	pf222_bwork2);
   } else if(whichOrder<1) {        // h,g,f
      workingInfo= new Array(pA,
         pf111_awork2, pf111_bwork2, 
         pf211_awork2, pf211_bwork2, 
         pf121_awork2, pf121_bwork2, 
         pf221_awork2, pf221_bwork2,
         pf112_awork2, pf112_bwork2, 
         pf212_awork2, pf212_bwork2, 
         pf122_awork2, pf122_bwork2, 
         pf222_awork2, pf222_bwork2);
   } else {
      disp('trouble nhy67ujm in randomizeInfo in plankton.js');
   };
   workingInfo= roundArr( workingInfo, 4 );
   return workingInfo.join(',') ;
} 			



var infoEachSubj= new Array(

// S0  sanity check if I want
[ .5,  0,1,      0, 0,   0, 0 ], 

// S1  last minute i did probabiliyg gain vs info gain
[ .7,  1, .76,  .57, 0,  0,0 ], 

// S2  probability gain vs impact
[ 0.7,  0,0.29,   0.43, 1,  0,0 ], 

// S3  info gain vs impact
[ 0.7,  0, 0.40,  0.27, 0.78,  0,0 ], 

// S4  pgainIgainImpact vs dpc
[ .7,  .43, 1,  0.05, 0.95,  0,0 ],

// added August 24,  V5 where fdiff is equal
//[ .7,  0, .57,  .57, 0,      0,0 ],  
[ .7,  .57, 0,   0,.57,     0,0 ],

// S6 what do subjects do if features are equally useful?
[ .5,  0, .50,   0,.50,     0,0 ],

// S7 what do subjects do if two features have high pgain, 
//    but only one feature has high extremity?
[ .5,  0, .50,  .25,.75,   0,0 ],

// S8, S9: checking Sept 2007 to see if 
//  there is any sense in words-and-numbers responses
[ 0.7,  0, .15,   .57,0,   0,0 ],
[ 0.7,  0, .70,   .57,0,   0,0 ],

// S10, Jan, 2008: falsification study: fair test
[ 0.67, 0, .45,   .95,0,   0,0 ],

// S11, Jan, 2008: falsification: pgain indifferent:
[ 0.67, 0, 0.81,  .95,0,   0,0 ], 

// S12, April-May 2009: igain vs pgain, *both feats matter*
//[ 0.7,  .10,.49,  .57,0,   0,0 ],
[.7,    0.04, 0.37,   0.57,0,        0, 0   ],

// S13, July 2009, pgain vs certainty
[.7,    0.04, 0.60,   0.57,0,        0, 0   ],

// S14, pilot with Bjoern, pgain vs 2100
[.44,   0.56, 0.3,    1, 0.78,       1, 1   ],

// S15 is identical as S14, but we'll use 1100 reward structure
[.44,   0.56, 0.3,    1, 0.78,       1, 1   ],

// S16, pilot with Bjoern, 10-1-0-0 reward structure vs pgain
[0.36,  0.86, 0.2,    1.0, 0.56,     1, 1   ],

// S17 is identical to S16, but with 1100 reward structure
[0.36,  0.86, 0.2,    1.0, 0.56,     1, 1   ],

// tested stats for fMRI study, with some pilot subjs
[ 0.7,  0.18, 0.65,    0, 0,         0, 0   ],
[ 0.7,  0.77, 0.2,     0, 0,         0, 0   ],


// added March, 2007; possible plankton fMRI stats
[ 0.5,  0.467,0.867,   0.5, 0.5,     0, 0   ], 


// old possible stats for fMRI study
[ 0.5,   0.15, 0.85,   0.35, 0.65,   0, 0   ],

// to check what feature value is marked
[ 0.60,   1, 0,      0, 1,         0, 0     ],

// Sim 2, info gain vs impact, 81.26%
[ 0.7,   1, .6247,   .2770, .7791,   0, 0   ],

// This one holds prefstr constant for igain and pgain,
// but has full extremity for one of each, 82%
[ 0.70,  0.615, 0,   1,0.60,         0, 0   ],
 
// Sim 2, info gain vs pgain, 81.81%
[ 0.7,   .5714, 0,   .9525, .5587,   0, 0   ],

//Sim 2, impact vs pgain, 79.10%
[ 0.7,   .5714, 0,   1, .6966,       0, 0   ],

// Vuma expt, Useful Qs: igain vs impact-pgain, 74.5%
[ 0.5,   .3, .0001,     0.7, 0.3,    0, 0   ],

// Do these ones check pgain vs igain, 
//  where each feature is fully extreme?
[ 0.70,  0.615, 0,   1,0.60,         0, 0   ],
[ 0.70,  0,.572,     .572, 0,        0, 0   ],

// these are scenarios I studied by hand as i considered
//   the relationship of extremity to feature usefulness
[ 0.70,  0, .3,     0, .3,         0, .3    ],
[ 0.70,  .35,.65,  .35,.65,       .35,.65   ], 
[ 0.70,  .3, 0,    .3, 0,         .3, 0     ]


);



function switchFeat(featID, ver1, ver2) {
   featSrc= document.getElementById(featID).src
   a= featSrc.lastIndexOf('/')+1;
   currentFeat= featSrc.substring(a);
   if (currentFeat == ver1)       { document.getElementById(featID).src= ver2 ;  }
   else if (currentFeat == ver2)  {  document.getElementById(featID).src= ver1 ;  }
   else {  alert('problem in switchFeature(featID)  '  +document.getElementById(featID).src )   }
}



function whichButton(event, tf)   {  
  if(tf==1) {
    keyPressed= event.keyCode ;  
    //alert(keyPressed);
    
    // left arrow for Species A
    // or 'r' button
    if(keyPressed==37 || keyPressed==82)  { 
       checkAnswer('A');  } 
       
    // right arrow for species B
    // or 'b' button
    else if(keyPressed==39 || keyPressed==66)  { 
       checkAnswer('B');  }
       
    // up arrow for next trial
    // or 'y' button
    else if (keyPressed==38 || keyPressed==89)  {  
    nextTrial();  }
  }
	//for hitting learning criterion
	if(subjID==777){
		if(event.keyCode==49){ //press 1
			hitCritToTest =1;
			nextTrial();
		};
	}
}



// new version to write and test
function numOf(inputArr, elem) {
   // numOf(['a', 's', 'd', 'f', 'a', 'a', 'd', 'f', 'd'], 'f') returns 2
   // make sure you have an array;
   inputLength= inputArr.length ;
   newArr= new Array(inputLength);
   for(i=0; i<inputLength; ++i) { newArr[i]= inputArr.charAt(i); }
   newArr= newArr.sort(); 
   newArrLength= newArr.length ;
   strippedArrLength= arrSansElem(newArr, elem).length ;
   //document.writeln('\n<br> newArr Length '  +newArrLength  +',   strippedArrLength '  +strippedArrLength );
   return (newArrLength-strippedArrLength)
}


function propElemInLastN( preArr, elem, n ) {
   preArrLength= preArr.length
   if(preArrLength==0)  return NaN ;
   // insufficient data
   else if(preArrLength<n)  return NaN ;	
   else
   
   var shortArr= new Array(n);
   for(i=0; i<n; i++)  shortArr[i]=  preArr[i+preArrLength-n];
   elemCount= numOf( shortArr.join(","), elem );
   propElem= elemCount / n ;
   return propElem;
}


//  added November, 2008
function graphicElemInLastN( preArr, elem, n ) {
   // graphicElemInLastN( 'qqqqqrqwer', 'q', 7) ;
   // returns **.*...
   preArrLength= preArr.length
   if(preArrLength==0)  return NaN ;
   // insufficient data
   else if(preArrLength==0) return 'preArrLength0';
   else if(preArrLength<n)  return graphicElemInLastN( preArr, elem, preArrLength ) ;	
   else
   
   var shortArr= new Array(n);
   for(i=0; i<n; i++)  {
      shortArr[i]=  preArr[i+preArrLength-n];
   }
   var arrToReturn= new Array(n);
   for(i=0; i<n; i++)  {
      if(shortArr[i]==elem) { arrToReturn[i]='1' }
      else { arrToReturn[i]='0'}
   }   
   return arrToReturn.join("");
}



function arrSansElem(inputArr, elem) {
   // arrSansElem(['a', 's', 'd', 'f', 'a', 'a', 'd', 'f', 'd'], 'f') 
   // returns ['a', 's', 'd', 'a', 'a', 'd', 'd'], 

   // make sure you have an array;
   inputLength= inputArr.length ;
   newArr= new Array(inputLength);
   for(i=0; i<inputLength; ++i) { newArr[i]= inputArr[i]; }

   newArr= newArr.sort();
   inputLength= newArr.length ;
   outputArr= new Array();
   outputArrInd= 0;
   for( i=0; i<inputLength; ++i)  {
      if(newArr[i]!=elem) {   
          outputArr[outputArrInd]= newArr[i];
          outputArrInd++;
      }
   }
   // holy smokes the msg variable is screwed up later if it's set here, so i'm changing to msg332!
   msg332= 'inputArr '  +inputArr  +' e.g. newArr '  +newArr  +' sans '  +elem  +' is outputArr ' +outputArr ;
   //alert( msg332 );
   return outputArr
}
 
 

// this creates a jHistory object with all sorts of useful properties
function jHistory(info, preHist, indices, messageToDisplay)  {

  var hplank= new planktonObject(info);

  if(indices=='all') {
     var hist= preHist ;
     //alert('indices '  +indices  +',  hist.length '  +hist.length );
     }
  else if(indices.substr(0,4)=='last') {
     trialsToKeep= indices.substr(4,indices.length)-0 + 1; 
     //alert('trialsToKeep= '  +trialsToKeep );
     if( preHist.length > trialsToKeep ) {
        lengthHist= preHist.length;
        if(lengthHist>trialsToKeep) {
           var shortHist= new Array(trialsToKeep) ;
           for( i=0; i<trialsToKeep; i++ ) {
              shortHist[i]= preHist[lengthHist - trialsToKeep + i] ;
           }
        } 
        var hist= shortHist ;
     }
     else if( preHist.length <= trialsToKeep ) {
        var hist= preHist ;
     }
     else  {
        alert('problem bgt54rfcd setting hist');
     }
  }

  totalTrials= hist.length;  
  //alert('indices '  +indices  +',  hist.length '  +hist.length  +',  hist '  +hist );

  firstClicks= '';   secondClicks= '';   thirdClicks= '';   allClicks= '';  
  ponds=    '';   
  feedback= '';
  trueStims=  new Array(totalTrials) ;
  trialNums=  new Array(totalTrials) ;
  dTimes=     new Array(totalTrials) ;
  nTimes=     new Array(totalTrials) ;
  fmoChoices= new Array();
  fmcChoices= new Array();
  ffoChoices= new Array();
  ffcChoices= new Array();
  bmoChoices= new Array();
  bmcChoices= new Array();
  bfoChoices= new Array();
  bfcChoices= new Array();
  bestChoices= new Array(totalTrials) ;
  for( t=0 ; t<totalTrials-1 ;  t++ ) { 
     thisTrialArr= hist[t].split('&');  
     firstClicks=  firstClicks  +thisTrialArr[0].charAt(0)  ;  
     secondClicks=  secondClicks  +thisTrialArr[0].charAt(1)  ;  
     thirdClicks=  thirdClicks  +thisTrialArr[0].charAt(2)  ;  
     allClicks=  allClicks  +thisTrialArr[0].substr(0,3) ;
     thisChoice= thisTrialArr[0].charAt(3) ;
     ponds=    ponds    +thisChoice;
     feedback= feedback +thisTrialArr[0].charAt(4) ;
     thisStim =    thisTrialArr[1] ;
     trueStims[t]= thisStim;   
     trialNums[t]= thisTrialArr[2] ;
     dTimes[t]=    thisTrialArr[3] ;
     nTimes[t]=    thisTrialArr[4] ;
     if(thisStim=='fmo')  { fmoChoices[fmoChoices.length]= thisChoice;  thisBestChoice= hplank.fmoBest;  }  
     if(thisStim=='fmc')  { fmcChoices[fmcChoices.length]= thisChoice;  thisBestChoice= hplank.fmcBest;  }  
     if(thisStim=='ffo')  { ffoChoices[ffoChoices.length]= thisChoice;  thisBestChoice= hplank.ffoBest;  }  
     if(thisStim=='ffc')  { ffcChoices[ffcChoices.length]= thisChoice;  thisBestChoice= hplank.ffcBest;  }  
     if(thisStim=='bmo')  { bmoChoices[bmoChoices.length]= thisChoice;  thisBestChoice= hplank.bmoBest;  }  
     if(thisStim=='bmc')  { bmcChoices[bmcChoices.length]= thisChoice;  thisBestChoice= hplank.bmcBest;  }  
     if(thisStim=='bfo')  { bfoChoices[bfoChoices.length]= thisChoice;  thisBestChoice= hplank.bfoBest;  }  
     if(thisStim=='bfc')  { bfcChoices[bfcChoices.length]= thisChoice;  thisBestChoice= hplank.bfcBest;  }  
     if(thisChoice==thisBestChoice)  { bestChoices[t]= 1; }
     else {bestChoices[t]= 0; }
  }   
  
  // how many times out of last however many was the best choice made, coded with 1
  this.propLast100=  propElemInLastN( bestChoices, 1, 100 ) ;
  this.propLast200=  propElemInLastN( bestChoices, 1, 200 ) ;
  this.propLast400=  propElemInLastN( bestChoices, 1, 400 ) ;
    
  // how many times do you want to consider choice on those features?
  // the function returns NaN if there is insufficient data to judge
  lookBackCount= 20 ;
  minProp= .95 ; 
  fmoProp= propElemInLastN( fmoChoices, hplank.fmoBest, lookBackCount ) ; 
  fmcProp= propElemInLastN( fmcChoices, hplank.fmcBest, lookBackCount ) ;
  ffoProp= propElemInLastN( ffoChoices, hplank.ffoBest, lookBackCount ) ;
  ffcProp= propElemInLastN( ffcChoices, hplank.ffcBest, lookBackCount ) ;
  bmoProp= propElemInLastN( bmoChoices, hplank.bmoBest, lookBackCount ) ;
  bmcProp= propElemInLastN( bmcChoices, hplank.bmcBest, lookBackCount ) ;
  bfoProp= propElemInLastN( bfoChoices, hplank.bfoBest, lookBackCount ) ;
  bfcProp= propElemInLastN( bfcChoices, hplank.bfcBest, lookBackCount ) ; 
    
  if( ( fmoProp>=minProp || hplank.pfmo==0 ) &&
      ( fmcProp>=minProp || hplank.pfmc==0 ) &&
      ( ffoProp>=minProp || hplank.pffo==0 ) &&
      ( ffcProp>=minProp || hplank.pffc==0 ) &&
      ( bmoProp>=minProp || hplank.pbmo==0 ) &&
      ( bmcProp>=minProp || hplank.pbmc==0 ) &&
      ( bfoProp>=minProp || hplank.pbfo==0 ) &&
      ( bfcProp>=minProp || hplank.pbfc==0 ) )  
      this.itemAccuracyOk= true;

  this.eachStimAccuracy=new Array(fmoProp, fmcProp, ffoProp, ffcProp, bmoProp, bmcProp, bfoProp, bfcProp ) ;
  
  // (added April, 2009)
  // We also check whether the subject has responded optimally
  //  in a recent history, of each stimulus item
  // For now, we ask whether they have achieved 100% optimal
  //  choices in the most recent 5 exposures to each configuration
  
  recentLookBackCount= 5 ;
  minRecentProp= 1 ; 
  fmoRecentProp= propElemInLastN( fmoChoices, hplank.fmoBest, recentLookBackCount ) ; 
  fmcRecentProp= propElemInLastN( fmcChoices, hplank.fmcBest, recentLookBackCount ) ;
  ffoRecentProp= propElemInLastN( ffoChoices, hplank.ffoBest, recentLookBackCount ) ;
  ffcRecentProp= propElemInLastN( ffcChoices, hplank.ffcBest, recentLookBackCount ) ;
  bmoRecentProp= propElemInLastN( bmoChoices, hplank.bmoBest, recentLookBackCount ) ;
  bmcRecentProp= propElemInLastN( bmcChoices, hplank.bmcBest, recentLookBackCount ) ;
  bfoRecentProp= propElemInLastN( bfoChoices, hplank.bfoBest, recentLookBackCount ) ;
  bfcRecentProp= propElemInLastN( bfcChoices, hplank.bfcBest, recentLookBackCount ) ;
      
  if( ( fmoRecentProp>=minRecentProp || hplank.pfmo==0 ) &&
      ( fmcRecentProp>=minRecentProp || hplank.pfmc==0 ) &&
      ( ffoRecentProp>=minRecentProp || hplank.pffo==0 ) &&
      ( ffcRecentProp>=minRecentProp || hplank.pffc==0 ) &&
      ( bmoRecentProp>=minRecentProp || hplank.pbmo==0 ) &&
      ( bmcRecentProp>=minRecentProp || hplank.pbmc==0 ) &&
      ( bfoRecentProp>=minRecentProp || hplank.pbfo==0 ) &&
      ( bfcRecentProp>=minRecentProp || hplank.pbfc==0 ) )  
      this.itemRecentAccuracyOk= true;
  
  fmoPropAll= roundNum( 100*propElemInLastN( fmoChoices, hplank.fmoBest, fmoChoices.length ), 2) ; 
  fmcPropAll= roundNum( 100*propElemInLastN( fmcChoices, hplank.fmcBest, fmcChoices.length ), 2) ;
  ffoPropAll= roundNum( 100*propElemInLastN( ffoChoices, hplank.ffoBest, ffoChoices.length ), 2) ;
  ffcPropAll= roundNum( 100*propElemInLastN( ffcChoices, hplank.ffcBest, ffcChoices.length ), 2) ;
  bmoPropAll= roundNum( 100*propElemInLastN( bmoChoices, hplank.bmoBest, bmoChoices.length ), 2) ;
  bmcPropAll= roundNum( 100*propElemInLastN( bmcChoices, hplank.bmcBest, bmcChoices.length ), 2) ;
  bfoPropAll= roundNum( 100*propElemInLastN( bfoChoices, hplank.bfoBest, bfoChoices.length ), 2) ;
  bfcPropAll= roundNum( 100*propElemInLastN( bfcChoices, hplank.bfcBest, bfcChoices.length ), 2) ; 
  
  // right now i want all choices to be included 
  tempLookBack= 10000 ;  
  fmoRecChoices= graphicElemInLastN( fmoChoices, hplank.fmoBest, tempLookBack ) ;
  fmcRecChoices= graphicElemInLastN( fmcChoices, hplank.fmcBest, tempLookBack ) ;
  ffoRecChoices= graphicElemInLastN( ffoChoices, hplank.ffoBest, tempLookBack ) ;
  ffcRecChoices= graphicElemInLastN( ffcChoices, hplank.ffcBest, tempLookBack ) ;
  bmoRecChoices= graphicElemInLastN( bmoChoices, hplank.bmoBest, tempLookBack ) ;
  bmcRecChoices= graphicElemInLastN( bmcChoices, hplank.bmcBest, tempLookBack ) ;
  bfoRecChoices= graphicElemInLastN( bfoChoices, hplank.bfoBest, tempLookBack ) ;
  bfcRecChoices= graphicElemInLastN( bfcChoices, hplank.bfcBest, tempLookBack ) ;
  
  // new stuff to try to understand what subjs should do
  var rounda= 4;
  var roundb= 4;
  newi= '' ;
  if( hplank.pfmo>0 )  newi= newi +'\n<BR>P(fmo)= '  +roundNum(hplank.pfmo,rounda)  +', prop '  +fmoProp  +' ('  +hplank.fmoBest  +', '  +fmoPropAll  +'% of '  +fmoChoices.length +' ' +fmoRecChoices +'), psi '  +roundNum(hplank.psifmo,roundb)  ; 
  if( hplank.pfmc>0 )  newi= newi +'\n<BR>P(fmc)= '  +roundNum(hplank.pfmc,rounda)  +', prop '  +fmcProp  +' ('  +hplank.fmcBest  +', '  +fmcPropAll  +'% of '  +fmcChoices.length +' ' +fmcRecChoices +'), psi '  +roundNum(hplank.psifmc,roundb)  ; 
  if( hplank.pffo>0 )  newi= newi +'\n<BR>P(ffo)= '  +roundNum(hplank.pffo,rounda)  +', prop '  +ffoProp  +' ('  +hplank.ffoBest  +', '  +ffoPropAll  +'% of '  +ffoChoices.length +' ' +ffoRecChoices +'), psi '  +roundNum(hplank.psiffo,roundb)  ; 
  if( hplank.pffc>0 )  newi= newi +'\n<BR>P(ffc)= '  +roundNum(hplank.pffc,rounda)  +', prop '  +ffcProp  +' ('  +hplank.ffcBest  +', '  +ffcPropAll  +'% of '  +ffcChoices.length +' ' +ffcRecChoices +'), psi '  +roundNum(hplank.psiffc,roundb)  ; 
  if( hplank.pbmo>0 )  newi= newi +'\n<BR>P(bmo)= '  +roundNum(hplank.pbmo,rounda)  +', prop '  +bmoProp  +' ('  +hplank.bmoBest  +', '  +bmoPropAll  +'% of '  +bmoChoices.length +' ' +bmoRecChoices +'), psi '  +roundNum(hplank.psibmo,roundb)  ; 
  if( hplank.pbmc>0 )  newi= newi +'\n<BR>P(bmc)= '  +roundNum(hplank.pbmc,rounda)  +', prop '  +bmcProp  +' ('  +hplank.bmcBest  +', '  +bmcPropAll  +'% of '  +bmcChoices.length +' ' +bmcRecChoices +'), psi '  +roundNum(hplank.psibmc,roundb)  ; 
  if( hplank.pbfo>0 )  newi= newi +'\n<BR>P(bfo)= '  +roundNum(hplank.pbfo,rounda)  +', prop '  +bfoProp  +' ('  +hplank.bfoBest  +', '  +bfoPropAll  +'% of '  +bfoChoices.length +' ' +bfoRecChoices +'), psi '  +roundNum(hplank.psibfo,roundb)  ; 
  if( hplank.pbfc>0 )  newi= newi +'\n<BR>P(bfc)= '  +roundNum(hplank.pbfc,rounda)  +', prop '  +bfcProp  +' ('  +hplank.bfcBest  +', '  +bfcPropAll  +'% of '  +bfcChoices.length +' ' +bfcRecChoices +'), psi '  +roundNum(hplank.psibfc,roundb)  ; 
  
  // what average accuracy would a subject achieve with this kind of responding?
  var subjHypPropCorr= 0;
  // totalTrials is off by 1, so we correct:
  var numT= totalTrials-1 ;
  if (hplank.pfmo>0) { var subjHypPropCorr_fmo= (fmoPropAll/100)*hplank.psifmo +(1-(fmoPropAll/100))*(1-hplank.psifmo);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_fmo*hplank.pfmo);  }
  if (hplank.pfmc>0) { var subjHypPropCorr_fmc= (fmcPropAll/100)*hplank.psifmc +(1-(fmcPropAll/100))*(1-hplank.psifmc);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_fmc*hplank.pfmc);  }
  if (hplank.pffo>0) { var subjHypPropCorr_ffo= (ffoPropAll/100)*hplank.psiffo +(1-(ffoPropAll/100))*(1-hplank.psiffo);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_ffo*hplank.pffo);  }
  if (hplank.pffc>0) { var subjHypPropCorr_ffc= (ffcPropAll/100)*hplank.psiffc +(1-(ffcPropAll/100))*(1-hplank.psiffc);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_ffc*hplank.pffc);  }
  if (hplank.pbmo>0) { var subjHypPropCorr_bmo= (bmoPropAll/100)*hplank.psibmo +(1-(bmoPropAll/100))*(1-hplank.psibmo);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_bmo*hplank.pbmo);  }
  if (hplank.pbmc>0) { var subjHypPropCorr_bmc= (bmcPropAll/100)*hplank.psibmc +(1-(bmcPropAll/100))*(1-hplank.psibmc);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_bmc*hplank.pbmc);  }
  if (hplank.pbfo>0) { var subjHypPropCorr_bfo= (bfoPropAll/100)*hplank.psibfo +(1-(bfoPropAll/100))*(1-hplank.psibfo);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_bfo*hplank.pbfo);  }
  if (hplank.pbfc>0) { var subjHypPropCorr_bfc= (bfcPropAll/100)*hplank.psibfc +(1-(bfcPropAll/100))*(1-hplank.psibfc);  subjHypPropCorr= subjHypPropCorr -0 +(subjHypPropCorr_bfc*hplank.pbfc);  }
  this.subjHypPropCorr= roundNum(subjHypPropCorr,3)
    
  this.optHypPropCorr= hplank.targetAcc;  

  // added January, 2009, to help with basicInfo.html
  var roundPlaces= 4;
  var smInfo= '' ;
  if( hplank.pfmo>0 )    smInfo= smInfo +'\n<BR>P(f1,g1,h2)= '  +roundNum(hplank.pfmo,roundPlaces)   +', P('  +hplank.fmoBest   +')='  +roundNum(hplank.psifmo,roundPlaces)  ; 
  if( hplank.pfmc>0 )    smInfo= smInfo +'\n<BR>P(f1,g1,h2)= '  +roundNum(hplank.pfmc,roundPlaces)   +', P('  +hplank.fmcBest   +')='  +roundNum(hplank.psifmc,roundPlaces)  ; 
  if( hplank.pffo>0 )    smInfo= smInfo +'\n<BR>P(f1,g2,h2)= '  +roundNum(hplank.pffo,roundPlaces)   +', P('  +hplank.ffoBest   +')='  +roundNum(hplank.psiffo,roundPlaces)  ; 
  if( hplank.pffc>0 )    smInfo= smInfo +'\n<BR>P(f1,g2,h2)= '  +roundNum(hplank.pffc,roundPlaces)   +', P('  +hplank.ffcBest   +')='  +roundNum(hplank.psiffc,roundPlaces)  ; 
  if( hplank.pbmo>0 )    smInfo= smInfo +'\n<BR>P(f2,g1,h2)= '  +roundNum(hplank.pbmo,roundPlaces)   +', P('  +hplank.bmoBest   +')='  +roundNum(hplank.psibmo,roundPlaces)  ; 
  if( hplank.pbmc>0 )    smInfo= smInfo +'\n<BR>P(f2,g1,h2)= '  +roundNum(hplank.pbmc,roundPlaces)   +', P('  +hplank.bmcBest   +')='  +roundNum(hplank.psibmc,roundPlaces)  ; 
  if( hplank.pbfo>0 )    smInfo= smInfo +'\n<BR>P(f2,g2,h2)= '  +roundNum(hplank.pbfo,roundPlaces)   +', P('  +hplank.bfoBest   +')='  +roundNum(hplank.psibfo,roundPlaces)  ; 
  if( hplank.pbfc>0 )    smInfo= smInfo +'\n<BR>P(f2,g2,h2)= '  +roundNum(hplank.pbfc,roundPlaces)   +', P('  +hplank.bfcBest   +')='  +roundNum(hplank.psibfc,roundPlaces)  ; 
  this.smInfo= smInfo ; 
  
  // new info for making sense of results in the klmn conditions
  // we want the probability of species a for each stimulus configuration
  var sInfo= '' ;
  if( hplank.pfmo>0 )    sInfo= sInfo +'\n<BR>P(fmo)= '  +roundNum(hplank.pfmo,roundPlaces)   +', P('  +hplank.fmoBest   +')='  +roundNum(hplank.psifmo,roundPlaces)  ; 
  if( hplank.pfmc>0 )    sInfo= sInfo +'\n<BR>P(fmc)= '  +roundNum(hplank.pfmc,roundPlaces)   +', P('  +hplank.fmcBest   +')='  +roundNum(hplank.psifmc,roundPlaces)  ; 
  if( hplank.pffo>0 )    sInfo= sInfo +'\n<BR>P(ffo)= '  +roundNum(hplank.pffo,roundPlaces)   +', P('  +hplank.ffoBest   +')='  +roundNum(hplank.psiffo,roundPlaces)  ; 
  if( hplank.pffc>0 )    sInfo= sInfo +'\n<BR>P(ffc)= '  +roundNum(hplank.pffc,roundPlaces)   +', P('  +hplank.ffcBest   +')='  +roundNum(hplank.psiffc,roundPlaces)  ; 
  if( hplank.pbmo>0 )    sInfo= sInfo +'\n<BR>P(bmo)= '  +roundNum(hplank.pbmo,roundPlaces)   +', P('  +hplank.bmoBest   +')='  +roundNum(hplank.psibmo,roundPlaces)  ; 
  if( hplank.pbmc>0 )    sInfo= sInfo +'\n<BR>P(bmc)= '  +roundNum(hplank.pbmc,roundPlaces)   +', P('  +hplank.bmcBest   +')='  +roundNum(hplank.psibmc,roundPlaces)  ; 
  if( hplank.pbfo>0 )    sInfo= sInfo +'\n<BR>P(bfo)= '  +roundNum(hplank.pbfo,roundPlaces)   +', P('  +hplank.bfoBest   +')='  +roundNum(hplank.psibfo,roundPlaces)  ; 
  if( hplank.pbfc>0 )    sInfo= sInfo +'\n<BR>P(bfc)= '  +roundNum(hplank.pbfc,roundPlaces)   +', P('  +hplank.bfcBest   +')='  +roundNum(hplank.psibfc,roundPlaces)  ; 
  this.sInfo= sInfo ; 

  // the following text is to try to get something that just has 
  //   the bare minimum info on individual item accuracy
  var itemMisc= ''
  if( hplank.pfmo>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pfmo,rounda)  +'&'  +fmoRecChoices   +', '  +fmoPropAll   +', '  +roundNum(hplank.psifmo,roundb)  +' '  ; 
  if( hplank.pfmc>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pfmc,rounda)  +'&'  +fmcRecChoices   +', '  +fmcPropAll   +', '  +roundNum(hplank.psifmc,roundb)  +' '  ; 
  if( hplank.pffo>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pffo,rounda)  +'&'  +ffoRecChoices   +', '  +ffoPropAll   +', '  +roundNum(hplank.psiffo,roundb)  +' '  ; 
  if( hplank.pffc>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pffc,rounda)  +'&'  +ffcRecChoices   +', '  +ffcPropAll   +', '  +roundNum(hplank.psiffc,roundb)  +' '  ; 
  if( hplank.pbmo>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pbmo,rounda)  +'&'  +bmoRecChoices   +', '  +bmoPropAll   +', '  +roundNum(hplank.psibmo,roundb)  +' '  ; 
  if( hplank.pbmc>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pbmc,rounda)  +'&'  +bmcRecChoices   +', '  +bmcPropAll   +', '  +roundNum(hplank.psibmc,roundb)  +' '  ; 
  if( hplank.pbfo>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pbfo,rounda)  +'&'  +bfoRecChoices   +', '  +bfoPropAll   +', '  +roundNum(hplank.psibfo,roundb)  +' '  ; 
  if( hplank.pbfc>0 )   itemMisc= itemMisc +'\n<BR>'  +roundNum(hplank.pbfc,rounda)  +'&'  +bfcRecChoices   +', '  +bfcPropAll   +', '  +roundNum(hplank.psibfc,roundb)  +' '  ; 
  this.itemMisc= itemMisc;                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                 
  this.firstClicks= firstClicks;                                                                                                                              
  this.secondClicks= secondClicks;                                                                                                                            
  this.thirdClicks= thirdClicks;
  this.allClicks= allClicks;
  this.ponds= ponds;
  this.feedback= feedback;

  // numOf is the number of instances of arg2 in the array or string arg1
  // ** mmm  this will look similae but just be aClicks not tclicks / eClicks etc
  tailEyeClaw= new Array( numOf(allClicks, 't'), numOf(allClicks, 'e'), numOf(allClicks, 'c') ) ;
  tailEyeClawFirst= new Array( numOf(firstClicks, 't'), numOf(firstClicks, 'e'), numOf(firstClicks, 'c') ) ;
  this.tailEyeClawFirst= tailEyeClawFirst;
  tailEyeClawSecond= new Array( numOf(secondClicks, 't'), numOf(secondClicks, 'e'), numOf(secondClicks, 'c') ) ;
  tailEyeClawThird= new Array( numOf(thirdClicks, 't'), numOf(thirdClicks, 'e'), numOf(thirdClicks, 'c') ) ;
  aB= new Array( numOf(ponds, 'A'), numOf(ponds, 'B') ) ;
  percentA= Math.round(aB[0]*100/(aB[0]+aB[1])) ;
  sF= new Array( numOf(feedback, 's'), numOf(feedback, 'f') ) ;
  percentS= 100* sF[0]/(sF[0]+sF[1]) ;  
  percentS= roundNum( percentS, 1 ) ;  
  
  msg= "<p class='usualLeft'>" ;
  msg= msg + "<br>"  +messageToDisplay  +" ("  +(totalTrials-1)  +"):<br>" ;
  msg= msg + percentS  +'% correct'  ;
  msg= msg + ', smileFrown '  +sF     ;  
  //msg= msg + '\n<br>eachStimAccuracy '  +this.eachStimAccuracy ;
  msg= msg + '\n<br>propLast1,2,400 best choice  '  +this.propLast100 ;
  msg= msg + '  '  +this.propLast200 + '  '  +this.propLast400 ; 
  // mmm trying to get info on optimal proportion, etc.
  msg= msg+ '\n<br>Target achievalbe performance: ' +hplank.targetAcc  ;
  msg= msg+ '\n<br>subject hyp overall perfomance: ' +this.subjHypPropCorr  ;  
  msg= msg + '\n<br>itemRecentAccuracy: ' +this.itemRecentAccuracyOk ; 
  msg= msg + newi ;
  msg= msg + '\n<br>tailEyeClaw '  +tailEyeClaw    ; 
  msg= msg + '\n<br>species A chosen '  +percentA  +'%'  ;
  msg= msg + ', aB '  +aB  ;
  this.msg= msg ;

  this.totalTrials= totalTrials;
  this.accuracy= percentS;
}


function rewardObject(info,hist) {
   // we use this for the klmn versions to keep track of subject performance
   // I think 'hist' is the same thing that gets passed for jHistory objects, etc.
   var thisPlank= new planktonObject(info);
   hist=hist.join(",");
   hist=getTestPhaseText(hist);
   if (type=='1100')  { var pre_k=2; var pre_l=2; }
   if (type=='2100')  { var pre_k=2; var pre_l=1; }
   if (type=='10100') { var pre_k=2; var pre_l=0.2; }
   if (thisPlank.pa<=0.5) { var k=pre_k; var l=pre_l; }
   if (thisPlank.pa>0.5)  { var k=pre_l; var l=pre_k; }
   this.AsCount= countOccurences(hist, "As&");
   this.BsCount= countOccurences(hist, "Bs&");
   this.AfCount= countOccurences(hist, "Af&");
   this.BfCount= countOccurences(hist, "Bf&");
   this.testPhaseTrialCount= this.AsCount + this.BsCount + this.AfCount + this.BfCount; 
   this.correctCount= this.AsCount + this.BsCount ;
   this.winnings= this.AsCount*k  +this.BsCount*l
   this.explEn= "How did you do in the test phase? <p>You correctly classified " 
                +this.correctCount +" plankton specimens, "
                +this.AsCount +" Species A and "  +this.BsCount +" Species B, for a bonus of " 
                +this.winnings +" euro!" ;
   this.explDe= "Wie gut waren Sie in der Testphase? <p>Sie haben in der Testphase "
                +this.correctCount +" Plankton-Exemplare korrekt klassifiziert, "
                +this.AsCount +" mal Spezies A und "  +this.BsCount +" mal Spezies B. "
                + " Daf&uuml;r erhalten Sie einen zus&auml;tzlichen Bonus von "
                +this.winnings +" Euro." ;
}



function tenthsecs() {
   // returns number of tenths of seconds since start time
   // this only makes sense if you get a difference, to a later time.
   // note: always use 'var' or else you get screwy global vars
   var now= new Date();
   now= now.getTime()
   now= Math.round(now/100);
   return now;
}


function milisecs() {
   // returns current time in ms
   var now= new Date();
   now= now.getTime()
   return now;
}


function jp(name,text) {
   // jp('info','info:1,2,3') returns [1, 2, 3]
   // this needs error checking added
   // alert(text.indexOf(name))
   if(text==undefined) { alert('problem undefined text in jp: name: ' +name +',  text: ' +text); }
   lookfor= name +':'
   var arr1= text.replace(lookfor,'')
   arr1= arr1.split(",")
   //alert(name +' ' +arr1)
   return arr1
}


function jm(name,arr2) {
   // jm('info',[1, 2, 3]) returns '?info:1,2,3'
   var ss= '?' +name +':' +arr2 
   return ss
}


function charRep( initStr, newChar, index ) {
  // charRep( 'vvv', 't', 0 ) returns 'tvv'

  var strLength= initStr.length;
  var initStrArr= new Array(strLength);
  var localMsg= '' ;

  // strLength better be > 1
  if (strLength<=1)  {
     localMsg= localMsg + 'problem in charRep: strLength '  +strLength  +'.  initStr== '  +initStr;
  }

  // newChar length better be exactly 1
  if (newChar.length>1)  {
     localMsg= localMsg + 'problem in charRep: newChar.length should be 1 but is '  +newChar.length  +'  ' ;
  }

  // index better be a nonnegative number less than strLength
  // javascript array indices start at zero so these numbers are a bit weird
  // this apparently does not check if index is actually a number
  if ( index>(strLength-1) | index<0 )  {
     localMsg= localMsg + 'problem in charRep: index>(strLength-1) or index<0.  index: '  
     localMsg= localMsg + index  +'.  initStr '  +initStr ;
  }

  for( i=0; i<strLength; ++i) {
     initStrArr[i]= initStr.charAt(i) ;
  }
  var newStr= ''
  for( i=0; i<strLength; ++i) {
     if(i!=index)  {
        newStr= newStr.concat(initStrArr[i]);
     }
     else if(i==index)  {
        newStr= newStr.concat(newChar);
     }
     else  {
        localMsg= localMsg + '<br> problem in replaceStrChar' ;
     }   
  }
  if (localMsg!='')  {
     localMsg= localMsg + 'charRep: initStr '  +initStr  +',  newChar '  +newChar  +',  index '  +index ;
     localMsg= localMsg + ',  newStr '  +newStr ;
     alert(localMsg) ;
  }
  return newStr
}


function strContains( strA, strB ) {
   // checks if strB occurs inside strA
   // strContains('asdf1234', '12') returns 1
   
   if( strA==undefined ) {
      alert('problem in strContains( strA, strB ): strA==undefined.  strB is '  +strB );	
      alert('will return false');
      return 0;
   }

   var msg= ''

   if( strA.length < strB.length ) {
       msg= msg + 'problem with strContains, strA should be longer than strB. ' ;
   } 
   if( !(strA.length>0) || !(strB.length>0) )
       msg= msg + '\n strA.length is '  +strA.length  +' and strB.length is '  +strB.length

   // returns -1 if no occurrence, otherwise I think it 
   // returns the index in strA of the first occurrence of strB
   answer= strA.search(strB) ;

   if(answer==-1)  {  
      var toReturn= 0;
   }
   else if(answer>=0) { 
      var toReturn= 1;
   }  
   else { 
      msg= msg + '\n problem with strContains: no output set'
   }

   if(msg.length>0) {
     msg= msg +'\n strA '  +strA  +',  strB '  +strB ;
     alert(msg);
   }
    
   return toReturn ;
}


function countOccurences(bigString,pattern) {
// case sensitive.  
// returns count of occurences of pattern in bigString
// thanks to http://www.js-x.com/
   var repCount = 0; // count
   for (var i=0;i<bigString.length;i++) {
      if (pattern == bigString.substr(i,pattern.length))
         repCount++;
   }
   return repCount;
}


function getTestPhaseText(histStr) {
   // take the text history from the plankton experiment
   // return just the text after "oneClick," and before "&timeClickFinish"
   //   e.g. the information acquisition / test phase
   // note that 'histStr' vacillates between a string and an array here
   histStr= histStr.split("oneClick,")
   histStr= histStr[1];
   histStr= histStr.split("&timeClickFinish");
   histStr= histStr[0];
   //histStr= histStr.split(",");
   return histStr;
}


function preloadPlanktonPics() {
   // preload images:
   var imageList= new Array( 'smiley.png', 'frowny.png', 'qface.png', 
     'blunt.png', 'fine.png', 'male.png', 'fem.png', 'conn.png', 'orig.png',
     'qtail.qeye.qclaw.png', 'qtail.qeye.conn.png', 'qtail.qeye.orig.png', 'qtail.fem.qclaw.png', 
     'qtail.fem.conn.png', 'qtail.fem.orig.png', 'qtail.male.qclaw.png', 'qtail.male.conn.png', 'qtail.male.orig.png', 
     'blunt.qeye.qclaw.png', 'blunt.qeye.conn.png', 'blunt.qeye.orig.png', 'blunt.fem.qclaw.png', 'blunt.fem.conn.png', 
     'blunt.fem.orig.png', 'blunt.male.qclaw.png', 'blunt.male.conn.png', 'blunt.male.orig.png', 'fine.qeye.qclaw.png', 
     'fine.qeye.conn.png', 'fine.qeye.orig.png', 'fine.fem.qclaw.png', 'fine.fem.conn.png', 'fine.fem.orig.png', 
     'fine.male.qclaw.png', 'fine.male.conn.png', 'fine.male.orig.png' );
   numPreloads= imageList.length;
   document.write("<p>")
   for(i=0; i<numPreloads; i++) {  
   	document.write("<img height=0 src='http://cnl.salk.edu/~jnelson/stimuli/"  +imageList[i]  +"'> ");  
   }
}

function preloadPlanktonPics_Sal() {
	var imageList= new Array( 'blunt5.fem3.conn3.jpg', 
		'blunt5.fem3.conn5.jpg', 
		'blunt5.fem3.conn7.jpg', 
		'blunt5.fem3.orig3.jpg', 
		'blunt5.fem3.orig5.jpg', 
		'blunt5.fem3.orig7.jpg', 
		'blunt5.fem5.conn3.jpg', 
		'blunt5.fem5.conn5.jpg', 
		'blunt5.fem5.conn7.jpg', 
		'blunt5.fem5.orig3.jpg', 
		'blunt5.fem5.orig5.jpg', 
		'blunt5.fem5.orig7.jpg', 
		'blunt5.fem5.qclaw.jpg', 
		'blunt5.fem7.conn3.jpg', 
		'blunt5.fem7.conn5.jpg', 
		'blunt5.fem7.conn7.jpg', 
		'blunt5.fem7.orig3.jpg', 
		'blunt5.fem7.orig5.jpg', 
		'blunt5.fem7.orig7.jpg', 
		'blunt5.male3.conn3.jpg', 
		'blunt5.male3.conn5.jpg', 
		'blunt5.male3.conn7.jpg', 
		'blunt5.male3.orig3.jpg', 
		'blunt5.male3.orig5.jpg', 
		'blunt5.male3.orig7.jpg', 
		'blunt5.male5.conn3.jpg', 
		'blunt5.male5.conn5.jpg', 
		'blunt5.male5.conn7.jpg', 
		'blunt5.male5.orig3.jpg', 
		'blunt5.male5.orig5.jpg', 
		'blunt5.male5.orig7.jpg', 
		'blunt5.male5.qclaw.jpg', 
		'blunt5.male7.conn3.jpg', 
		'blunt5.male7.conn5.jpg', 
		'blunt5.male7.conn7.jpg', 
		'blunt5.male7.orig3.jpg', 
		'blunt5.male7.orig5.jpg', 
		'blunt5.male7.orig7.jpg', 
		'blunt5.qeye.conn3.jpg', 
		'blunt5.qeye.conn5.jpg', 
		'blunt5.qeye.conn7.jpg', 
		'blunt5.qeye.orig3.jpg', 
		'blunt5.qeye.orig5.jpg', 
		'blunt5.qeye.orig7.jpg', 
		'blunt5.qeye.qclaw.jpg', 
		'fine5.fem3.conn3.jpg', 
		'fine5.fem3.conn5.jpg', 
		'fine5.fem3.conn7.jpg', 
		'fine5.fem3.orig3.jpg', 
		'fine5.fem3.orig5.jpg', 
		'fine5.fem3.orig7.jpg', 
		'fine5.fem5.conn3.jpg', 
		'fine5.fem5.conn5.jpg', 
		'fine5.fem5.conn7.jpg', 
		'fine5.fem5.orig3.jpg', 
		'fine5.fem5.orig5.jpg', 
		'fine5.fem5.orig7.jpg', 
		'fine5.fem5.qclaw.jpg', 
		'fine5.fem7.conn3.jpg', 
		'fine5.fem7.conn5.jpg', 
		'fine5.fem7.conn7.jpg', 
		'fine5.fem7.orig3.jpg', 
		'fine5.fem7.orig5.jpg', 
		'fine5.fem7.orig7.jpg', 
		'fine5.male3.conn3.jpg', 
		'fine5.male3.conn5.jpg', 
		'fine5.male3.conn7.jpg', 
		'fine5.male3.orig3.jpg', 
		'fine5.male3.orig5.jpg', 
		'fine5.male3.orig7.jpg', 
		'fine5.male5.conn3.jpg', 
		'fine5.male5.conn5.jpg', 
		'fine5.male5.conn7.jpg', 
		'fine5.male5.orig3.jpg', 
		'fine5.male5.orig5.jpg', 
		'fine5.male5.orig7.jpg', 
		'fine5.male5.qclaw.jpg', 
		'fine5.male7.conn3.jpg', 
		'fine5.male7.conn5.jpg', 
		'fine5.male7.conn7.jpg', 
		'fine5.male7.orig3.jpg', 
		'fine5.male7.orig5.jpg', 
		'fine5.male7.orig7.jpg', 
		'fine5.qeye.conn3.jpg', 
		'fine5.qeye.conn5.jpg', 
		'fine5.qeye.conn7.jpg', 
		'fine5.qeye.orig3.jpg', 
		'fine5.qeye.orig5.jpg', 
		'fine5.qeye.orig7.jpg', 
		'fine5.qeye.qclaw.jpg', 
		'qtail.fem3.conn3.jpg', 
		'qtail.fem3.conn5.jpg', 
		'qtail.fem3.conn7.jpg', 
		'qtail.fem3.orig3.jpg', 
		'qtail.fem3.orig5.jpg', 
		'qtail.fem3.orig7.jpg', 
		'qtail.fem3.qclaw.jpg', 
		'qtail.fem5.conn3.jpg', 
		'qtail.fem5.conn5.jpg', 
		'qtail.fem5.conn7.jpg', 
		'qtail.fem5.orig3.jpg', 
		'qtail.fem5.orig5.jpg', 
		'qtail.fem5.orig7.jpg', 
		'qtail.fem5.qclaw.jpg', 
		'qtail.fem7.conn3.jpg', 
		'qtail.fem7.conn5.jpg', 
		'qtail.fem7.conn7.jpg', 
		'qtail.fem7.orig3.jpg', 
		'qtail.fem7.orig5.jpg', 
		'qtail.fem7.orig7.jpg', 
		'qtail.fem7.qclaw.jpg', 
		'qtail.male3.conn3.jpg', 
		'qtail.male3.conn5.jpg', 
		'qtail.male3.conn7.jpg', 
		'qtail.male3.orig3.jpg', 
		'qtail.male3.orig5.jpg', 
		'qtail.male3.orig7.jpg', 
		'qtail.male3.qclaw.jpg', 
		'qtail.male5.conn3.jpg', 
		'qtail.male5.conn5.jpg', 
		'qtail.male5.conn7.jpg', 
		'qtail.male5.orig3.jpg', 
		'qtail.male5.orig5.jpg', 
		'qtail.male5.orig7.jpg', 
		'qtail.male5.qclaw.jpg', 
		'qtail.male7.conn3.jpg', 
		'qtail.male7.conn5.jpg', 
		'qtail.male7.conn7.jpg', 
		'qtail.male7.orig3.jpg', 
		'qtail.male7.orig5.jpg', 
		'qtail.male7.orig7.jpg', 
		'qtail.male7.qclaw.jpg', 
		'qtail.qeye.conn3.jpg', 
		'qtail.qeye.conn5.jpg', 
		'qtail.qeye.conn7.jpg', 
		'qtail.qeye.orig3.jpg', 
		'qtail.qeye.orig5.jpg', 
		'qtail.qeye.orig7.jpg', 
		'qtail.qeye.qclaw.jpg', 
		'noise_1_1.png',  'noise_1_3.png',  'noise_2_1.png',  'noise_2_3.png',
		'noise_1_2.png',  'noise_1_4.png',  'noise_2_2.png',  'noise_2_4.png');
	numPreloads= imageList.length;
	document.write("<p>")
	for(i=0; i<numPreloads; i++) {  
		document.write("<img height=0 src='./images/n_images/"  +imageList[i]  +"'> ");  
	}
}

function preloadPlanktonPics_Sal2() {
	var imageList= new Array(
		'noise_1_1.png',  'noise_1_3.png',  'noise_2_1.png',  'noise_2_3.png',
		'noise_1_2.png',  'noise_1_4.png',  'noise_2_2.png',  'noise_2_4.png');
	numPreloads= imageList.length;
	document.write("<p>")
	for(i=0; i<numPreloads; i++) {  
		document.write("<img height=0 src='./images/n_images/"  +imageList[i]  +"'> ");  
	}
}
	


	
function planktonObject(info) {
   // note June 2009: adding language, en/de, and condition (oed-1100-2100,etc)
   // to info array makes it length 9
   // info should be an array like [0.7,0.3,0.7,0.3,0,1,1]
   // JJ 2010-09: changing max length from 9 to 19, info should be an array like [0.7,0.3,0.7,0.3,0,1,1,0.7,0.3,0.7,0.3,0,1,1,0.2,0.5]
   if(info.length>19) {
		document.writeln('problem with info in planktonObject: info.length>19');
		document.writeln('\n<br>info is '  +info  +' and info.length is '  +info.length  +',');  
		document.writeln('\n so splitting into an array');   	
		info= info.split(",");
	}
	
	if(info.length==7 || info.length==6){				
		 // note June 2009: adding language, en/de, and condition (oed-1100-2100,etc)
		 // to info array makes it length 9
		 // info should be an array like [0.7,  0.3, 0.7,  0.3, 0,  1, 1 ]
		 // JJ that is just the old function to generate the plankton object
		 if(info.length>9) {
			document.writeln('\n problem with info in planktonObject: info.length>9');
			document.writeln('\n<br>info is '  +info  +' and info.length is '  +info.length  +',');  
			document.writeln('\n so splitting into an array');   	
			info= info.split(",");
		 }
		 
		 i=0;
		 this.pa=   info[i++];  var pa= this.pa;
		 this.p1ia= info[i++];
		 this.p1ib= info[i++];
		 this.p2ia= info[i++];
		 this.p2ib= info[i++];
		 this.p3ia= info[i++];
		 this.p3ib= info[i++];
		 
		 // relevant feature info
		 this.tailRelevant= this.p1ia != this.p1ib ;
		 this.eyeRelevant=  this.p2ia != this.p2ib ;
		 this.clawRelevant= this.p3ia != this.p3ib ;  
		 
		 // new properties added just to check if feature *changes*
		 //   not necessarily while providing useful information
		 this.tailChanges= this.tailRelevant  ||  ((this.p1ia!=0) && (this.p1ia!=1))  ||  ((this.p1ib!=0) && (this.p1ib!=1)) ;
		 this.eyeChanges=  this.eyeRelevant   ||  ((this.p2ia!=0) && (this.p2ia!=1))  ||  ((this.p2ib!=0) && (this.p2ib!=1)) ;
		 this.clawChanges= this.clawRelevant  ||  ((this.p3ia!=0) && (this.p3ia!=1))  ||  ((this.p3ib!=0) && (this.p3ib!=1)) ;
		 
		 numFeaturesChange= this.tailChanges + this.eyeChanges + this.clawChanges ;
		 
		 // In most conditions one feature never changes. 
		 // Note the number of that feature: tail(1), eye(2), or claw(3)
		 this.uniqueUnchangingFeat= NaN ;
		 if( !this.tailChanges &  this.eyeChanges &  this.clawChanges )  this.uniqueUnchangingFeat= 1 ;
		 if(  this.tailChanges & !this.eyeChanges &  this.clawChanges )  this.uniqueUnchangingFeat= 2 ;
		 if(  this.tailChanges &  this.eyeChanges & !this.clawChanges )  this.uniqueUnchangingFeat= 3 ;
		 
			if(numFeaturesChange==1) {
				this.verbalDescriptor= '(';
				if(this.tailChanges)
					 this.verbalDescriptor=this.verbalDescriptor+'tail';
				if(this.eyeChanges)
					 this.verbalDescriptor=this.verbalDescriptor+'eye';
				if(this.clawChanges) 
					 this.verbalDescriptor=this.verbalDescriptor+'claw'; 
				this.verbalDescriptor=this.verbalDescriptor+')';
		 }   
		 if(numFeaturesChange==2) {
				this.verbalDescriptor= '(';
				if(this.tailChanges)
					 this.verbalDescriptor=this.verbalDescriptor+'tail';
				if(this.verbalDescriptor.length>1)
					 this.verbalDescriptor=this.verbalDescriptor+' and ' ;      
				if(this.eyeChanges)
					 this.verbalDescriptor=this.verbalDescriptor+'eye';
				if(this.verbalDescriptor.length<7)
					 this.verbalDescriptor=this.verbalDescriptor+' and ' ;        
				if(this.clawChanges) 
					 this.verbalDescriptor=this.verbalDescriptor+'claw'; 
				this.verbalDescriptor=this.verbalDescriptor+')';
		 }
		 if(numFeaturesChange==3) {
				this.verbalDescriptor= '(eye, claw and tail)';
		 }
			 
		 // here we have German text for verbal description of the features
			if(numFeaturesChange==1) {
				this.verbalDescriptorDe= '';
				if(this.tailChanges)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Schwanz';
				if(this.eyeChanges)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Auge';
				if(this.clawChanges) 
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Klaue'; 
				this.verbalDescriptorDe=this.verbalDescriptorDe+'';
		 }   
		 if(numFeaturesChange==2) {
				this.verbalDescriptorDe= '';
				if(this.tailChanges)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Schwanz';
				if(this.verbalDescriptorDe.length>1)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+' und ' ;      
				if(this.eyeChanges)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Auge';
				if(this.verbalDescriptorDe.length<7)
					 this.verbalDescriptorDe=this.verbalDescriptorDe+' und ' ;        
				if(this.clawChanges) 
					 this.verbalDescriptorDe=this.verbalDescriptorDe+'Klaue'; 
				this.verbalDescriptorDe=this.verbalDescriptorDe+'';
		 }
		 if(numFeaturesChange==3) {
				this.verbalDescriptorDe= 'Schwanz, Auge, und Klaue';
		 }
			
		 //    fmo    are present vals
		 //    bfc    are absent vals
		 var pfmoia=  this.p1ia*      this.p2ia*      this.p3ia;     this.pfmoia = pfmoia;
		 var pfmcia=  this.p1ia*      this.p2ia*     (1-this.p3ia);  this.pfmcia = pfmcia;
		 var pffoia=  this.p1ia*     (1-this.p2ia)*   this.p3ia;     this.pffoia = pffoia;
		 var pffcia=  this.p1ia*     (1-this.p2ia)*  (1-this.p3ia);  this.pffcia = pffcia;
		 var pbmoia= (1-this.p1ia)*  this.p2ia*       this.p3ia;     this.pbmoia = pbmoia;
		 var pbmcia= (1-this.p1ia)*  this.p2ia*      (1-this.p3ia);  this.pbmcia = pbmcia;
		 var pbfoia= (1-this.p1ia)* (1-this.p2ia)*    this.p3ia;     this.pbfoia = pbfoia;
		 var pbfcia= (1-this.p1ia)* (1-this.p2ia)*   (1-this.p3ia);  this.pbfcia = pbfcia;
		 
		 var pfmoib=  this.p1ib*      this.p2ib*      this.p3ib;     this.pfmoib = pfmoib;
		 var pfmcib=  this.p1ib*      this.p2ib*     (1-this.p3ib);  this.pfmcib = pfmcib;
		 var pffoib=  this.p1ib*     (1-this.p2ib)*   this.p3ib;     this.pffoib = pffoib;
		 var pffcib=  this.p1ib*     (1-this.p2ib)*  (1-this.p3ib);  this.pffcib = pffcib;
		 var pbmoib= (1-this.p1ib)*  this.p2ib*       this.p3ib;     this.pbmoib = pbmoib;
		 var pbmcib= (1-this.p1ib)*  this.p2ib*      (1-this.p3ib);  this.pbmcib = pbmcib;
		 var pbfoib= (1-this.p1ib)* (1-this.p2ib)*    this.p3ib;     this.pbfoib = pbfoib;
		 var pbfcib= (1-this.p1ib)* (1-this.p2ib)*   (1-this.p3ib);  this.pbfcib = pbfcib;
		 
		 var pb= (1-this.pa);  this.pb= pb;
		 var pfmo= pfmoia*this.pa + pfmoib*pb;  this.pfmo= pfmo;
		 var pfmc= pfmcia*this.pa + pfmcib*pb;  this.pfmc= pfmc;
		 var pffo= pffoia*this.pa + pffoib*pb;  this.pffo= pffo;
		 var pffc= pffcia*this.pa + pffcib*pb;  this.pffc= pffc;
		 var pbmo= pbmoia*this.pa + pbmoib*pb;  this.pbmo= pbmo;
		 var pbmc= pbmcia*this.pa + pbmcib*pb;  this.pbmc= pbmc;
		 var pbfo= pbfoia*this.pa + pbfoib*pb;  this.pbfo= pbfo;
		 var pbfc= pbfcia*this.pa + pbfcib*pb;  this.pbfc= pbfc;

		 //  this should be 1
		 var panyfeat= pfmo+pfmc+pffo+pffc+pbmo+pbmc+pbfo+pbfc ;
		 if(roundNum( panyfeat,14) != 1) {
			 alert('panyfeat should be 1 but is '  +panyfeat);	
		 }
		 
		 this.p1= this.p1ia*this.pa + this.p1ib*this.pb ;  pn1= 1 - this.p1 ;
		 this.p2= this.p2ia*this.pa + this.p2ib*this.pb ;  pn2= 1 - this.p2 ;
		 this.p3= this.p3ia*this.pa + this.p3ib*this.pb ;  pn3= 1 - this.p3 ; 
		 maxpapb= max(this.pa, this.pb)

		 this.pai1= (this.p1ia * this.pa)  /  this.p1 ;  pain1= ((1-this.p1ia) * this.pa) / pn1 ;
		 pcorri1= max(this.pai1,1-this.pai1) ;  pcorrin1= max(pain1,1-pain1) ;
		 this.pg1= this.p1*pcorri1 +  pn1*pcorrin1  - maxpapb ;
		 
		 this.pai2= (this.p2ia * this.pa)  /  this.p2 ;  pain2= ((1-this.p2ia) * this.pa) / pn2 ;
		 pcorri2= max(this.pai2,1-this.pai2) ;  pcorrin2= max(pain2,1-pain2) ;
		 this.pg2= this.p2*pcorri2 +  pn2*pcorrin2  - maxpapb ;

		 this.pai3= (this.p3ia * this.pa)  /  this.p3 ;  pain3= ((1-this.p3ia) * this.pa) / pn3 ;
		 pcorri3= max(this.pai3,1-this.pai3) ;  pcorrin3= max(pain3,1-pain3) ;
		 this.pg3= this.p3*pcorri3 +  pn3*pcorrin3  - maxpapb ;
		 
		 if (this.pg1>this.pg2 & this.pg1>this.pg3)  this.highestPgainFeat= 1 ;
		 if (this.pg2>this.pg1 & this.pg2>this.pg3)  this.highestPgainFeat= 2 ;
		 if (this.pg3>this.pg1 & this.pg3>this.pg2)  this.highestPgainFeat= 3 ;

		 // In most conditions one feature provides information, 
		 //   e.g. is relevant-- this is a stronger condition than simply changing sometimes--
		 //   but has either zero pgain, or less pgain than the highest pgain feature.
		 this.uniqueOtherFeat= NaN ;
		 if (!(this.highestPgainFeat==1) & !(this.uniqueUnchangingFeat==1) & this.tailRelevant)  this.uniqueOtherFeat= 1;  
		 if (!(this.highestPgainFeat==2) & !(this.uniqueUnchangingFeat==2) & this.eyeRelevant)   this.uniqueOtherFeat= 2;  
		 if (!(this.highestPgainFeat==3) & !(this.uniqueUnchangingFeat==3) & this.clawRelevant)  this.uniqueOtherFeat= 3;  

		 // i'm adding variables so we know P(a) and P(b) for each feature combination  
		 if(pfmo>0)  this.paifmo= pfmoia*pa / pfmo;  else paifmo= NaN;  this.pbifmo= 1-this.paifmo
		 if(pfmc>0)  this.paifmc= pfmcia*pa / pfmc;  else paifmc= NaN;  this.pbifmc= 1-this.paifmc 
		 if(pffo>0)  this.paiffo= pffoia*pa / pffo;  else paiffo= NaN;  this.pbiffo= 1-this.paiffo
		 if(pffc>0)  this.paiffc= pffcia*pa / pffc;  else paiffc= NaN;  this.pbiffc= 1-this.paiffc
		 if(pbmo>0)  this.paibmo= pbmoia*pa / pbmo;  else paibmo= NaN;  this.pbibmo= 1-this.paibmo
		 if(pbmc>0)  this.paibmc= pbmcia*pa / pbmc;  else paibmc= NaN;  this.pbibmc= 1-this.paibmc
		 if(pbfo>0)  this.paibfo= pbfoia*pa / pbfo;  else paibfo= NaN;  this.pbibfo= 1-this.paibfo
		 if(pbfc>0)  this.paibfc= pbfcia*pa / pbfc;  else paibfc= NaN;  this.pbibfc= 1-this.paibfc   
		
		 // this is the beginning of code to calculate 
		 //   probability of smile assuming optimal responding
		 var psifmo= max(this.paifmo,this.pbifmo); this.psifmo= psifmo; 
		 var psifmc= max(this.paifmc,this.pbifmc); this.psifmc= psifmc; 
		 var psiffo= max(this.paiffo,this.pbiffo); this.psiffo= psiffo; 
		 var psiffc= max(this.paiffc,this.pbiffc); this.psiffc= psiffc; 
		 var psibmo= max(this.paibmo,this.pbibmo); this.psibmo= psibmo; 
		 var psibmc= max(this.paibmc,this.pbibmc); this.psibmc= psibmc; 
		 var psibfo= max(this.paibfo,this.pbibfo); this.psibfo= psibfo; 
		 var psibfc= max(this.paibfc,this.pbibfc); this.psibfc= psibfc; 
		 
		 var psmile= 0;
		 if(pfmo>0) psmile= psmile+psifmo*pfmo ;
		 if(pfmc>0) psmile= psmile+psifmc*pfmc ;
		 if(pffo>0) psmile= psmile+psiffo*pffo ;
		 if(pffc>0) psmile= psmile+psiffc*pffc ;
		 if(pbmo>0) psmile= psmile+psibmo*pbmo ;
		 if(pbmc>0) psmile= psmile+psibmc*pbmc ;
		 if(pbfo>0) psmile= psmile+psibfo*pbfo ;
		 if(pbfc>0) psmile= psmile+psibfc*pbfc ;
		 this.targetAcc= roundNum(psmile,14) ; 

		 // find out the best response for each feature combination
		 // if the combination is impossible store 'X'
		 this.fmoBest='X' ;   if(pfmo>0)   if(this.paifmo>0.5) this.fmoBest='A';  else this.fmoBest='B';    
		 this.fmcBest='X' ;   if(pfmc>0)   if(this.paifmc>0.5) this.fmcBest='A';  else this.fmcBest='B';
		 this.ffoBest='X' ;   if(pffo>0)   if(this.paiffo>0.5) this.ffoBest='A';  else this.ffoBest='B';
		 this.ffcBest='X' ;   if(pffc>0)   if(this.paiffc>0.5) this.ffcBest='A';  else this.ffcBest='B';
		 this.bmoBest='X' ;   if(pbmo>0)   if(this.paibmo>0.5) this.bmoBest='A';  else this.bmoBest='B';
		 this.bmcBest='X' ;   if(pbmc>0)   if(this.paibmc>0.5) this.bmcBest='A';  else this.bmcBest='B';
		 this.bfoBest='X' ;   if(pbfo>0)   if(this.paibfo>0.5) this.bfoBest='A';  else this.bfoBest='B';
		 this.bfcBest='X' ;   if(pbfc>0)   if(this.paibfc>0.5) this.bfcBest='A';  else this.bfcBest='B';      
				
		 if( (this.paifmo==.5)||(this.paifmc==.5)||(this.paiffo==.5)||(this.paiffc==.5)||(this.paibmo==.5)||(this.paibmc==.5)||(this.paibfo==.5)||(this.paibfc==.5) )
			 alert(' in some feature combination either species is equally probable') ;
		 
		 // this variable keeps info on what is best to do
		 var msg= '\n<br>';
		 msg= msg + 'fmoBest '  +this.fmoBest  +'\n<br>'
		 msg= msg + 'fmcBest '  +this.fmcBest  +'\n<br>'
		 msg= msg + 'ffoBest '  +this.ffoBest  +'\n<br>'
		 msg= msg + 'ffcBest '  +this.ffcBest  +'\n<br>'
		 msg= msg + 'bmoBest '  +this.bmoBest  +'\n<br>'
		 msg= msg + 'bmcBest '  +this.bmcBest  +'\n<br>'
		 msg= msg + 'bfoBest '  +this.bfoBest  +'\n<br>'
		 msg= msg + 'bfcBest '  +this.bfcBest  +'\n<br>'
		 
		 // info for page to test explicit knowledge, added May, 2009
		 var rounda= 2;
		 var sstr= 'Env' ;
		 if( pfmo>0 )  sstr=sstr  +'~fmo~'  +roundNum(pfmo,rounda)  +'~'  +this.fmoBest  +'~'  +roundNum(psifmo,rounda)  ; 
		 if( pfmc>0 )  sstr=sstr  +'~fmc~'  +roundNum(pfmc,rounda)  +'~'  +this.fmcBest  +'~'  +roundNum(psifmc,rounda)  ; 
		 if( pffo>0 )  sstr=sstr  +'~ffo~'  +roundNum(pffo,rounda)  +'~'  +this.ffoBest  +'~'  +roundNum(psiffo,rounda)  ; 
		 if( pffc>0 )  sstr=sstr  +'~ffc~'  +roundNum(pffc,rounda)  +'~'  +this.ffcBest  +'~'  +roundNum(psiffc,rounda)  ; 
		 if( pbmo>0 )  sstr=sstr  +'~bmo~'  +roundNum(pbmo,rounda)  +'~'  +this.bmoBest  +'~'  +roundNum(psibmo,rounda)  ; 
		 if( pbmc>0 )  sstr=sstr  +'~bmc~'  +roundNum(pbmc,rounda)  +'~'  +this.bmcBest  +'~'  +roundNum(psibmc,rounda)  ; 
		 if( pbfo>0 )  sstr=sstr  +'~bfo~'  +roundNum(pbfo,rounda)  +'~'  +this.bfoBest  +'~'  +roundNum(psibfo,rounda)  ; 
		 if( pbfc>0 )  sstr=sstr  +'~bfc~'  +roundNum(pbfc,rounda)  +'~'  +this.bfcBest  +'~'  +roundNum(psibfc,rounda)  ; 
		 this.testStimInfo= sstr;
		 
		 // more info for page to test explicit knowledge, May, 2009
		 var whichStimsStr= '' ;
		 if( pfmo>0 )  whichStimsStr=whichStimsStr   +'fine.male.orig~' 
		 if( pfmc>0 )  whichStimsStr=whichStimsStr   +'fine.male.conn~' 
		 if( pffo>0 )  whichStimsStr=whichStimsStr   +'fine.fem.orig~'  
		 if( pffc>0 )  whichStimsStr=whichStimsStr   +'fine.fem.conn~'  
		 if( pbmo>0 )  whichStimsStr=whichStimsStr   +'blunt.male.orig~'
		 if( pbmc>0 )  whichStimsStr=whichStimsStr   +'blunt.male.conn~'
		 if( pbfo>0 )  whichStimsStr=whichStimsStr   +'blunt.fem.orig~' 
		 if( pbfc>0 )  whichStimsStr=whichStimsStr   +'blunt.fem.conn~' 
		 this.whichStimsStr= whichStimsStr;

		 //  try to match statistic of this subject to experiment stats
		 var condition= NaN;   
		 coreInfoThisSubj= coreInfo(info).join("~") ;
		 for(condToCheck=0; condToCheck<=10; ++condToCheck ) {
					coreInfoCondI= coreInfo(infoEachSubj[condToCheck]).join("~") ;
		if( coreInfoCondI == coreInfoThisSubj ) {  condition= condToCheck ;  }
		 }  
		 this.condition= condition;
	} else {
	//alert('info in PLANKTON is ' +info +'- Type: ' +typeof(info));
	// JJ: putting the 17 conditional probabilities first
	// fmo    are present vals
	// bfc    are absent vals
   i=0;
   this.pa=   info[i++]-0;  var pa= this.pa;
   var pfmoia= info[i++]-0; this.pfmoia= pfmoia;
   var pfmoib= info[i++]-0; this.pfmoib= pfmoib;
   var pfmcia= info[i++]-0; this.pfmcia= pfmcia;
   var pfmcib= info[i++]-0; this.pfmcib= pfmcib; 
   var pffoia= info[i++]-0; this.pffoia= pffoia;
   var pffoib= info[i++]-0; this.pffoib= pffoib;
   var pffcia= info[i++]-0; this.pffcia= pffcia;
   var pffcib= info[i++]-0; this.pffcib= pffcib;
   var pbmoia= info[i++]-0; this.pbmoia= pbmoia;
   var pbmoib= info[i++]-0; this.pbmoib= pbmoib;
   var pbmcia= info[i++]-0; this.pbmcia= pbmcia;
   var pbmcib= info[i++]-0; this.pbmcib= pbmcib;
   var pbfoia= info[i++]-0; this.pbfoia= pbfoia;
   var pbfoib= info[i++]-0; this.pbfoib= pbfoib;
   var pbfcia= info[i++]-0; this.pbfcia= pbfcia;
   var pbfcib= info[i++]-0; this.pbfcib= pbfcib;
   
   var pb= (1-this.pa);  this.pb= pb;
   var pfmo= pfmoia*this.pa + pfmoib*pb;  this.pfmo= pfmo;
   var pfmc= pfmcia*this.pa + pfmcib*pb;  this.pfmc= pfmc;
   var pffo= pffoia*this.pa + pffoib*pb;  this.pffo= pffo;
   var pffc= pffcia*this.pa + pffcib*pb;  this.pffc= pffc;
   var pbmo= pbmoia*this.pa + pbmoib*pb;  this.pbmo= pbmo;
   var pbmc= pbmcia*this.pa + pbmcib*pb;  this.pbmc= pbmc;
   var pbfo= pbfoia*this.pa + pbfoib*pb;  this.pbfo= pbfo;
   var pbfc= pbfcia*this.pa + pbfcib*pb;  this.pbfc= pbfc;
  
   //  this should be 1
   var panyfeat= pfmo+pfmc+pffo+pffc+pbmo+pbmc+pbfo+pbfc; this.panyfeat= panyfeat;
   // JJ set this to only 4 digits for the rw-probabilities
   if(roundNum( this.panyfeat,4) != 1 & info.length>9) { //JJ need to fix that, does not check anymore!
     alert('% panyfeat should be 1 but is '  +this.panyfeat);	
   }
   
   // for just one feature
   var p1ia=(pfmoia*this.pa + pfmcia*pa + pffoia*pa + pffcia*pa)/pa; this.p1ia = p1ia;
   var p1ib=(pfmoib*this.pb + pfmcib*pb + pffoib*pb + pffcib*pb)/pb; this.p1ib = p1ib;
   var p2ia=(pfmoia*this.pa + pfmcia*pa + pbmoia*pa + pbmcia*pa)/pa; this.p2ia = p2ia;  
   var p2ib=(pfmoib*this.pb + pfmcib*pb + pbmoib*pb + pbmcib*pb)/pb; this.p2ib = p2ib;
   var p3ia=(pfmoia*this.pa + pffoia*pa + pbmoia*pa + pbfoia*pa)/pa; this.p3ia = p3ia;
   var p3ib=(pfmoib*this.pb + pffoib*pb + pbmoib*pb + pbfoib*pb)/pb; this.p3ib = p3ib;
	 //alert("pfmoia " +pfmoia +" this.pa " +this.pa +" pfmcia " +pfmcia +" pffcia " +pffcia +" pa " +pa); 

	// [just copied from oldPlanktonFuncts]
	// elevant feature info [just copied from oldPlanktonFuncts]
	this.tailRelevant= this.p1ia != this.p1ib ;
	this.eyeRelevant=  this.p2ia != this.p2ib ;
	this.clawRelevant= this.p3ia != this.p3ib ;  
   
	// [just copied from oldPlanktonFuncts]
	// new properties added just to check if feature *changes*
	// not necessarily while providing useful information
	this.tailChanges= this.tailRelevant  ||  ((this.p1ia!=0) && (this.p1ia!=1))  ||  ((this.p1ib!=0) && (this.p1ib!=1)) ;
	this.eyeChanges=  this.eyeRelevant   ||  ((this.p2ia!=0) && (this.p2ia!=1))  ||  ((this.p2ib!=0) && (this.p2ib!=1)) ;
	this.clawChanges= this.clawRelevant  ||  ((this.p3ia!=0) && (this.p3ia!=1))  ||  ((this.p3ib!=0) && (this.p3ib!=1)) ;
   numFeaturesChange= this.tailChanges + this.eyeChanges + this.clawChanges ;  
	
	// [just copied from oldPlanktonFuncts]
	//In most conditions one feature never changes. 
	// Note the number of that feature: tail(1), eye(2), or claw(3)
	this.uniqueUnchangingFeat= NaN ;
	if( !this.tailChanges &  this.eyeChanges &  this.clawChanges )  this.uniqueUnchangingFeat= 1 ;
	if(  this.tailChanges & !this.eyeChanges &  this.clawChanges )  this.uniqueUnchangingFeat= 2 ;
	if(  this.tailChanges &  this.eyeChanges & !this.clawChanges )  this.uniqueUnchangingFeat= 3 ;

	if(numFeaturesChange==1) {
      this.verbalDescriptor= '(';
      if(this.tailChanges)
         this.verbalDescriptor=this.verbalDescriptor+'tail';
      if(this.eyeChanges)
         this.verbalDescriptor=this.verbalDescriptor+'eye';
      if(this.clawChanges) 
         this.verbalDescriptor=this.verbalDescriptor+'claw'; 
      this.verbalDescriptor=this.verbalDescriptor+')';
   }   
   if(numFeaturesChange==2) {
      this.verbalDescriptor= '(';
      if(this.tailChanges)
         this.verbalDescriptor=this.verbalDescriptor+'tail';
      if(this.verbalDescriptor.length>1)
         this.verbalDescriptor=this.verbalDescriptor+' and ' ;      
      if(this.eyeChanges)
         this.verbalDescriptor=this.verbalDescriptor+'eye';
      if(this.verbalDescriptor.length<7)
         this.verbalDescriptor=this.verbalDescriptor+' and ' ;        
      if(this.clawChanges) 
         this.verbalDescriptor=this.verbalDescriptor+'claw'; 
      this.verbalDescriptor=this.verbalDescriptor+')';
   }
   if(numFeaturesChange==3) {
      this.verbalDescriptor= '(eye, claw and tail)';
   }
     
	// [just copied from oldPlanktonFuncts]
	// here we have German text for verbal description of the features
    if(numFeaturesChange==1) {
      this.verbalDescriptorDe= '';
      if(this.tailChanges)
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Schwanz';
      if(this.eyeChanges)
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Auge';
      if(this.clawChanges) 
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Klaue'; 
      this.verbalDescriptorDe=this.verbalDescriptorDe+'';
   }   
   if(numFeaturesChange==2) {
      this.verbalDescriptorDe= '';
      if(this.tailChanges)
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Schwanz';
      if(this.verbalDescriptorDe.length>1)
         this.verbalDescriptorDe=this.verbalDescriptorDe+' und ' ;      
      if(this.eyeChanges)
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Auge';
      if(this.verbalDescriptorDe.length<7)
         this.verbalDescriptorDe=this.verbalDescriptorDe+' und ' ;        
      if(this.clawChanges) 
         this.verbalDescriptorDe=this.verbalDescriptorDe+'Klaue'; 
      this.verbalDescriptorDe=this.verbalDescriptorDe+'';
   }
   if(numFeaturesChange==3) {
      this.verbalDescriptorDe= 'Schwanz, Auge, und Klaue';
	}

	// [just copied from oldPlanktonFuncts]
	// creating probabilities for the single features
   this.p1= this.p1ia*this.pa + this.p1ib*this.pb ;  pn1= 1 - this.p1 ;
   this.p2= this.p2ia*this.pa + this.p2ib*this.pb ;  pn2= 1 - this.p2 ;
   this.p3= this.p3ia*this.pa + this.p3ib*this.pb ;  pn3= 1 - this.p3 ; 
   maxpapb= max(this.pa, this.pb)

   this.pai1= (this.p1ia * this.pa)  /  this.p1 ;  pain1= ((1-this.p1ia) * this.pa) / pn1 ;
   pcorri1= max(this.pai1,1-this.pai1) ;  pcorrin1= max(pain1,1-pain1) ;
   this.pg1= this.p1*pcorri1 +  pn1*pcorrin1  - maxpapb ;
   
   this.pai2= (this.p2ia * this.pa)  /  this.p2 ;  pain2= ((1-this.p2ia) * this.pa) / pn2 ;
   pcorri2= max(this.pai2,1-this.pai2) ;  pcorrin2= max(pain2,1-pain2) ;
   this.pg2= this.p2*pcorri2 +  pn2*pcorrin2  - maxpapb ;

   this.pai3= (this.p3ia * this.pa)  /  this.p3 ;  pain3= ((1-this.p3ia) * this.pa) / pn3 ;
   pcorri3= max(this.pai3,1-this.pai3) ;  pcorrin3= max(pain3,1-pain3) ;
   this.pg3= this.p3*pcorri3 +  pn3*pcorrin3  - maxpapb ;
   
   if (this.pg1>this.pg2 & this.pg1>this.pg3)  this.highestPgainFeat= 1 ;
   if (this.pg2>this.pg1 & this.pg2>this.pg3)  this.highestPgainFeat= 2 ;
   if (this.pg3>this.pg1 & this.pg3>this.pg2)  this.highestPgainFeat= 3 ;
   // JJ appended a case for which we have two features with the same prob. gain for the results page
   if (this.pg1==this.pg2 & this.pg1>this.pg3)  this.highestPgainFeat= ('1 as well as 2') ;
   if (this.pg1==this.pg3 & this.pg1>this.pg2)  this.highestPgainFeat= ('1 as well as 3') ;
   if (this.pg2==this.pg3 & this.pg2>this.pg1)  this.highestPgainFeat= ('2 as well as 3') ;	   

	
	// [just copied from oldPlanktonFuncts]	
	// In most conditions one feature provides information, 
	//   e.g. is relevant-- this is a stronger condition than simply changing sometimes--
	//   but has either zero pgain, or less pgain than the highest pgain feature.
   this.uniqueOtherFeat= NaN ;
   if (!(this.highestPgainFeat==1) & !(this.uniqueUnchangingFeat==1) & this.tailRelevant)  this.uniqueOtherFeat= 1;  
   if (!(this.highestPgainFeat==2) & !(this.uniqueUnchangingFeat==2) & this.eyeRelevant)   this.uniqueOtherFeat= 2;  
   if (!(this.highestPgainFeat==3) & !(this.uniqueUnchangingFeat==3) & this.clawRelevant)  this.uniqueOtherFeat= 3;  
   
	// [just copied from oldPlanktonFuncts]
   // i'm adding variables so we know P(a) and P(b) for each feature combination  
   if(pfmo>0)  this.paifmo= pfmoia*pa / pfmo;  else paifmo= NaN;  this.pbifmo= 1-this.paifmo
   if(pfmc>0)  this.paifmc= pfmcia*pa / pfmc;  else paifmc= NaN;  this.pbifmc= 1-this.paifmc 
   if(pffo>0)  this.paiffo= pffoia*pa / pffo;  else paiffo= NaN;  this.pbiffo= 1-this.paiffo
   if(pffc>0)  this.paiffc= pffcia*pa / pffc;  else paiffc= NaN;  this.pbiffc= 1-this.paiffc
   if(pbmo>0)  this.paibmo= pbmoia*pa / pbmo;  else paibmo= NaN;  this.pbibmo= 1-this.paibmo
   if(pbmc>0)  this.paibmc= pbmcia*pa / pbmc;  else paibmc= NaN;  this.pbibmc= 1-this.paibmc
   if(pbfo>0)  this.paibfo= pbfoia*pa / pbfo;  else paibfo= NaN;  this.pbibfo= 1-this.paibfo
   if(pbfc>0)  this.paibfc= pbfcia*pa / pbfc;  else paibfc= NaN;  this.pbibfc= 1-this.paibfc   
 
	// [just copied from oldPlanktonFuncts] 
   // this is the beginning of code to calculate 
   //   probability of smile assuming optimal responding
   var psifmo= max(this.paifmo,this.pbifmo); this.psifmo= psifmo; 
   var psifmc= max(this.paifmc,this.pbifmc); this.psifmc= psifmc; 
   var psiffo= max(this.paiffo,this.pbiffo); this.psiffo= psiffo; 
   var psiffc= max(this.paiffc,this.pbiffc); this.psiffc= psiffc; 
   var psibmo= max(this.paibmo,this.pbibmo); this.psibmo= psibmo; 
   var psibmc= max(this.paibmc,this.pbibmc); this.psibmc= psibmc; 
   var psibfo= max(this.paibfo,this.pbibfo); this.psibfo= psibfo; 
   var psibfc= max(this.paibfc,this.pbibfc); this.psibfc= psibfc; 
   
   var psmile= 0;
   if(pfmo>0) psmile= psmile+psifmo*pfmo ;
   if(pfmc>0) psmile= psmile+psifmc*pfmc ;
   if(pffo>0) psmile= psmile+psiffo*pffo ;
   if(pffc>0) psmile= psmile+psiffc*pffc ;
   if(pbmo>0) psmile= psmile+psibmo*pbmo ;
   if(pbmc>0) psmile= psmile+psibmc*pbmc ;
   if(pbfo>0) psmile= psmile+psibfo*pbfo ;
   if(pbfc>0) psmile= psmile+psibfc*pbfc ;
   this.targetAcc= roundNum(psmile,14) ; 

   	// [just copied from oldPlanktonFuncts]
   // find out the best response for each feature combination
   // if the combination is impossible store 'X'
   this.fmoBest='X' ;   if(pfmo>0)   if(this.paifmo>0.5) this.fmoBest='A';  else this.fmoBest='B';    
   this.fmcBest='X' ;   if(pfmc>0)   if(this.paifmc>0.5) this.fmcBest='A';  else this.fmcBest='B';
   this.ffoBest='X' ;   if(pffo>0)   if(this.paiffo>0.5) this.ffoBest='A';  else this.ffoBest='B';
   this.ffcBest='X' ;   if(pffc>0)   if(this.paiffc>0.5) this.ffcBest='A';  else this.ffcBest='B';
   this.bmoBest='X' ;   if(pbmo>0)   if(this.paibmo>0.5) this.bmoBest='A';  else this.bmoBest='B';
   this.bmcBest='X' ;   if(pbmc>0)   if(this.paibmc>0.5) this.bmcBest='A';  else this.bmcBest='B';
   this.bfoBest='X' ;   if(pbfo>0)   if(this.paibfo>0.5) this.bfoBest='A';  else this.bfoBest='B';
   this.bfcBest='X' ;   if(pbfc>0)   if(this.paibfc>0.5) this.bfcBest='A';  else this.bfcBest='B';      
      
   if( (this.paifmo==.5)||(this.paifmc==.5)||(this.paiffo==.5)||(this.paiffc==.5)||(this.paibmo==.5)||(this.paibmc==.5)||(this.paibfo==.5)||(this.paibfc==.5) )
     alert(' in some feature combination either species is equally probable') ;
 
	// [just copied from oldPlanktonFuncts] 
   // this variable keeps info on what is best to do
   var msg= '\n<br>';
   msg= msg + 'fmoBest '  +this.fmoBest  +'\n<br>'
   msg= msg + 'fmcBest '  +this.fmcBest  +'\n<br>'
   msg= msg + 'ffoBest '  +this.ffoBest  +'\n<br>'
   msg= msg + 'ffcBest '  +this.ffcBest  +'\n<br>'
   msg= msg + 'bmoBest '  +this.bmoBest  +'\n<br>'
   msg= msg + 'bmcBest '  +this.bmcBest  +'\n<br>'
   msg= msg + 'bfoBest '  +this.bfoBest  +'\n<br>'
   msg= msg + 'bfcBest '  +this.bfcBest  +'\n<br>'
	
   // [just copied from oldPlanktonFuncts] 
   // info for page to test explicit knowledge, added May, 2009
   var rounda= 2;
   var sstr= 'Env' ;
   if( pfmo>0 )  sstr=sstr  +'~fmo~'  +roundNum(pfmo,rounda)  +'~'  +this.fmoBest  +'~'  +roundNum(psifmo,rounda)  ; 
   if( pfmc>0 )  sstr=sstr  +'~fmc~'  +roundNum(pfmc,rounda)  +'~'  +this.fmcBest  +'~'  +roundNum(psifmc,rounda)  ; 
   if( pffo>0 )  sstr=sstr  +'~ffo~'  +roundNum(pffo,rounda)  +'~'  +this.ffoBest  +'~'  +roundNum(psiffo,rounda)  ; 
   if( pffc>0 )  sstr=sstr  +'~ffc~'  +roundNum(pffc,rounda)  +'~'  +this.ffcBest  +'~'  +roundNum(psiffc,rounda)  ; 
   if( pbmo>0 )  sstr=sstr  +'~bmo~'  +roundNum(pbmo,rounda)  +'~'  +this.bmoBest  +'~'  +roundNum(psibmo,rounda)  ; 
   if( pbmc>0 )  sstr=sstr  +'~bmc~'  +roundNum(pbmc,rounda)  +'~'  +this.bmcBest  +'~'  +roundNum(psibmc,rounda)  ; 
   if( pbfo>0 )  sstr=sstr  +'~bfo~'  +roundNum(pbfo,rounda)  +'~'  +this.bfoBest  +'~'  +roundNum(psibfo,rounda)  ; 
   if( pbfc>0 )  sstr=sstr  +'~bfc~'  +roundNum(pbfc,rounda)  +'~'  +this.bfcBest  +'~'  +roundNum(psibfc,rounda)  ; 
   this.testStimInfo= sstr;
   
   // [just copied from oldPlanktonFuncts] 
   // more info for page to test explicit knowledge, May, 2009
   var whichStimsStr= '' ;
   if( pfmo>0 )  whichStimsStr=whichStimsStr   +'fine.male.orig~' 
   if( pfmc>0 )  whichStimsStr=whichStimsStr   +'fine.male.conn~' 
   if( pffo>0 )  whichStimsStr=whichStimsStr   +'fine.fem.orig~'  
   if( pffc>0 )  whichStimsStr=whichStimsStr   +'fine.fem.conn~'  
   if( pbmo>0 )  whichStimsStr=whichStimsStr   +'blunt.male.orig~'
   if( pbmc>0 )  whichStimsStr=whichStimsStr   +'blunt.male.conn~'
   if( pbfo>0 )  whichStimsStr=whichStimsStr   +'blunt.fem.orig~' 
   if( pbfc>0 )  whichStimsStr=whichStimsStr   +'blunt.fem.conn~' 
   this.whichStimsStr= whichStimsStr;
	 
	 // JJ (8/2012) info for know page about coounterfactual (cf) inference
   var rounda= 2;
   var sstr= 'cfEnv' ;
   if( pfmo==0 )  sstr=sstr  +'~fmo~'  +roundNum(pfmo,rounda)  ; 
   if( pfmc==0 )  sstr=sstr  +'~fmc~'  +roundNum(pfmc,rounda)  ; 
   if( pffo==0 )  sstr=sstr  +'~ffo~'  +roundNum(pffo,rounda)  ; 
   if( pffc==0 )  sstr=sstr  +'~ffc~'  +roundNum(pffc,rounda)  ; 
   if( pbmo==0 )  sstr=sstr  +'~bmo~'  +roundNum(pbmo,rounda)  ; 
   if( pbmc==0 )  sstr=sstr  +'~bmc~'  +roundNum(pbmc,rounda)  ; 
   if( pbfo==0 )  sstr=sstr  +'~bfo~'  +roundNum(pbfo,rounda)  ; 
   if( pbfc==0 )  sstr=sstr  +'~bfc~'  +roundNum(pbfc,rounda)  ; 
   this.cfStimInfo= sstr;
   
   // JJ (8/2012) more info for know page to test counterfactual (cf) inference
   var cfStimStr= '' ;
   if( pfmo==0 )  cfStimStr=cfStimStr   +'fine.male.orig~' 
   if( pfmc==0 )  cfStimStr=cfStimStr   +'fine.male.conn~' 
   if( pffo==0 )  cfStimStr=cfStimStr   +'fine.fem.orig~'  
   if( pffc==0 )  cfStimStr=cfStimStr   +'fine.fem.conn~'  
   if( pbmo==0 )  cfStimStr=cfStimStr   +'blunt.male.orig~'
   if( pbmc==0 )  cfStimStr=cfStimStr   +'blunt.male.conn~'
   if( pbfo==0 )  cfStimStr=cfStimStr   +'blunt.fem.orig~' 
   if( pbfc==0 )  cfStimStr=cfStimStr   +'blunt.fem.conn~' 
   this.cfStimStr= cfStimStr;

	// [just copied from oldPlanktonFuncts] 
   //  try to match statistic of this subject to experiment stats
   var condition= NaN;   
   coreInfoThisSubj= coreInfo(info).join("~") ;
   for(condToCheck=0; condToCheck<=10; ++condToCheck ) {
        coreInfoCondI= coreInfo(infoEachSubj[condToCheck]).join("~") ;
	if( coreInfoCondI == coreInfoThisSubj ) {  condition= condToCheck ;  }
   }  
   this.condition= condition;

// JJ: define the input parameters for the independent case
   //that has to go to longArr[2] (hope it really is longArr)?
   //generate 16 parameters for the cc-indep-case -- this works, returns an object
   infoInd = new Array(16);
	   infoInd[0]= this.pa;
	   infoInd[1]= this.p1ia*this.p2ia*this.p3ia-0; 				//this.pfmoia= pfmoia;
	   infoInd[2]= this.p1ib*this.p2ib*this.p3ib-0; 				//this.pfmoib= pfmoib;
	   infoInd[3]= this.p1ia*this.p2ia*(1-this.p3ia)-0; 			//this.pfmcia= pfmcia;
	   infoInd[4]= this.p1ib*this.p2ib*(1-this.p3ib)-0; 			//this.pfmcib= pfmcib; 
	   infoInd[5]= this.p1ia*(1-this.p2ia)*this.p3ia-0; 			//this.pffoia= pffoia;
	   infoInd[6]= this.p1ib*(1-this.p2ib)*this.p3ib-0; 			//this.pffoib= pffoib;
	   infoInd[7]= this.p1ia*(1-this.p2ia)*(1-this.p3ia)-0; 		//this.pffcia= pffcia;
	   infoInd[8]= this.p1ib*(1-this.p2ib)*(1-this.p3ib)-0; 		//this.pffcib= pffcib;
	   infoInd[9]= (1-this.p1ia)*this.p2ia*this.p3ia-0; 			//this.pbmoia= pbmoia;
	   infoInd[10]= (1-this.p1ib)*this.p2ib*this.p3ib-0; 			//this.pbmoib= pbmoib;
	   infoInd[11]= (1-this.p1ia)*this.p2ia*(1-this.p3ia)-0; 		//this.pbmcia= pbmcia;
	   infoInd[12]= (1-this.p1ib)*this.p2ib*(1-this.p3ib)-0; 		//this.pbmcib= pbmcib;
	   infoInd[13]= (1-this.p1ia)*(1-this.p2ia)*this.p3ia-0; 		//this.pbfoia= pbfoia;
	   infoInd[14]= (1-this.p1ib)*(1-this.p2ib)*this.p3ib-0; 		//this.pbfoib= pbfoib;
	   infoInd[15]= (1-this.p1ia)*(1-this.p2ia)*(1-this.p3ia)-0; 	//this.pbfcia= pbfcia;
	   infoInd[16]= (1-this.p1ib)*(1-this.p2ib)*(1-this.p3ib)-0; 	//this.pbfcib= pbfcib;
	this.infoInd= infoInd
 }
}


// Check whether the highest pgain feature was given highest rank,
//   whether in fact all features were given any rank, etc
//   ranking is an array with 3 numbers, each 0, 1, 2, or 3.
// It should be that one feature has highest pgain,
//   one feature is informative (but zero or lower pgain),
//   and one feature is completely uninformative.
// I need error-checking, and to label what condition it is
function wordAndNumberRanking(aPlanktonObject, ranking) {
	wnrInfo= '' ;
	subjectRankOfHighestPgainFeat=     ranking[aPlanktonObject.highestPgainFeat-1] ;
	subjectRankOfOtherFeat=            ranking[aPlanktonObject.uniqueOtherFeat-1] ;
	subjectRankOfUniqueUnchangingFeat= ranking[aPlanktonObject.uniqueUnchangingFeat-1] ;
	vnr= '' +subjectRankOfHighestPgainFeat +subjectRankOfOtherFeat +subjectRankOfUniqueUnchangingFeat ;

	weirdCases= '111.222.333.121.131.132.211.221.231.232.311.312.321.322.331.332' ;
	pgainCases= '122.123.233.133' ;
	otherCases= '212.213.313.323' ;
	tieCases=   '112.113.223' ;	
	this.vrPattern= undefined;
	if( strContains(weirdCases,vnr) )  this.vrPattern= 'weird';
	if( strContains(pgainCases,vnr) )  this.vrPattern= 'pgain';
	if( strContains(otherCases,vnr) )  this.vrPattern= 'other';
	if( strContains(tieCases,vnr) )    this.vrPattern= 'tied';
	
	wnrInfo= wnrInfo+ 'vuma:' +this.vrPattern +", " ;
	wnrInfo= wnrInfo +"v:" +vnr +", " ;
	
        this.wnrInfo= wnrInfo ;	
}



// 'Un-randomize' the specifics of each subject so the true statistics are obvious.
// This seems to mostly work.  I use it to verify the condition of each subject.
// it had a hard time with these probs:  [ .7,  0,.57,  .57, 0,      0,0 ],  
// but these probs work better
function coreInfo(arr1) {
	 
	arr2= new Array(arr1[0],arr1[1],arr1[2],arr1[3],arr1[4],arr1[5],arr1[6]) ;
   	if(arr1[0]<0.5) {
   		arr2[0]= 1 - arr1[0] ;
   		arr2[1]= arr1[2] ;     arr2[2]= arr1[1] ;
   		arr2[3]= arr1[4] ;     arr2[4]= arr1[3] ;
   		arr2[5]= arr1[6] ;     arr2[6]= arr1[5] ;	
   	}
        //alert('arr2 point one '  +arr2 );
        
   	//if( ((arr2[1]-0)+(arr2[2]-0)) > 1 )  { arr2[1]=1-arr2[1]; arr2[2]=1-arr2[2]; }
   	//if( ((arr2[3]-0)+(arr2[4]-0)) > 1 )  { arr2[3]=1-arr2[3]; arr2[4]=1-arr2[4]; }
   	//if( ((arr2[5]-0)+(arr2[6]-0)) > 1 )  { arr2[5]=1-arr2[5]; arr2[6]=1-arr2[6]; }
   	
   	if( (((arr2[1]-0)+(arr2[2]-0))>1) | ( (((arr2[1]-0)+(arr2[2]-0))==1) & ((arr2[1]-0)>(arr2[2]-0))) )  { arr2[1]=1-arr2[1]; arr2[2]=1-arr2[2]; }
   	if( (((arr2[3]-0)+(arr2[4]-0))>1) | ( (((arr2[3]-0)+(arr2[4]-0))==1) & ((arr2[3]-0)>(arr2[4]-0))) )  { arr2[3]=1-arr2[3]; arr2[4]=1-arr2[4]; }
   	if( (((arr2[5]-0)+(arr2[6]-0))>1) | ( (((arr2[5]-0)+(arr2[6]-0))==1) & ((arr2[5]-0)>(arr2[6]-0))) )  { arr2[5]=1-arr2[5]; arr2[6]=1-arr2[6]; }
        //alert('arr2 point 2 '  +arr2 );
		
	sumF1= arr2[1]-(-arr2[2]);
	sumF2= arr2[3]-(-arr2[4]);
	sumF3= arr2[5]-(-arr2[6]);
	//sum123= new Array(sumF1, sumF2, sumF3);  alert('sum123 is '  +sum123);
	
	arr3= new Array(arr2[0],NaN,NaN,NaN,NaN,0,0) ;
	if( sumF1==0 ) {
	   if( (sumF2-0)>=(sumF3-0) ) { arr3[1]= arr2[3]; arr3[2]=arr2[4];   arr3[3]= arr2[5]; arr3[4]=arr2[6]; }
	   if( (sumF3-0)>(sumF2-0) ) { arr3[1]= arr2[5]; arr3[2]=arr2[6];   arr3[3]= arr2[3]; arr3[4]=arr2[4]; }  
	}
	if( sumF2==0 ) {
	   //alert('sumF2==0');
	   if( (sumF1-0)>=(sumF3-0) ) { arr3[1]= arr2[1]; arr3[2]=arr2[2];   arr3[3]= arr2[5]; arr3[4]=arr2[6]; }  
	   if( (sumF3-0)>(sumF1-0) ) { arr3[1]= arr2[5]; arr3[2]=arr2[6];   arr3[3]= arr2[1]; arr3[4]=arr2[2]; }  
	}
	if( sumF3==0 ) {
	   if( (sumF1-0)>=(sumF2-0) ) { arr3[1]= arr2[1]; arr3[2]=arr2[2];   arr3[3]= arr2[3]; arr3[4]=arr2[4]; }  
	   if( (sumF2-0)>(sumF1-0) ) { arr3[1]= arr2[3]; arr3[2]=arr2[4];   arr3[3]= arr2[1]; arr3[4]=arr2[2]; }  
	}
	//alert('arr3 point three '  +arr3 );
	
	decimals= 4;
	arr3[0]=roundNum(arr3[0],decimals);
	arr3[1]=roundNum(arr3[1],decimals);
	arr3[2]=roundNum(arr3[2],decimals);
	arr3[3]=roundNum(arr3[3],decimals);
	arr3[4]=roundNum(arr3[4],decimals);
	arr3[5]=roundNum(arr3[5],decimals);
	arr3[6]=roundNum(arr3[6],decimals);

	return arr3 ;  
}



function max(a,b) {
   if(a>b) return a; 
   else if(b>a) return b; 
   else if(b=a) {
      if(Math.random()>0.5) return a;
      else return b;
   }
   else if( isNaN(b) || isNaN(a) ) return 0;
   else alert('problem in max(a,b). a is ' +a  +',  b is ' +b);
}



// used by analysis.php and results.php
function parseColonComma( tokenToFind, histArray ) {
   histStr= histArray.join(',');
   temp= histStr.substr(histStr.indexOf(tokenToFind)).split(',')[0];	
   temp= temp.substr( temp.indexOf(':') + 1 ) ;
   //alert('temp is '  +temp) ;
   return temp;
}



function longResultsOneSubj(textFileContents, subjectID, longOrShort) {
   
   var longArr= textFileContents.split("?");
   var longDisp= 1;
   
   // ss is a string with all sorts of info
   // sc is a more concise string
   // sp is the very most concise string
   // sj is where i'm trying to get percent optimal for each configuration

   ss= "\n" ;
   sc= "\n<p>" ;
   sp= "\n"
   sj= "\n"
 
   // make sure the location includes appended stuff.  
   if(longArr[1]==undefined) {
 	return ('<br>S:' +subjectID +', c:notSubj') ;
 	//return ss;
	longArr= textFileContents.split("?");
   }

   var i=0
   var preUrl=  longArr[i++];  
   var subjID=  jp( 'S',    longArr[i++] ) ; 
   var info=    jp( 'info', longArr[i++] ) ; 
   var hist=    jp( 'hist', longArr[i++] ) ;  
   var didVuma= longArr.length>i ;
   if(didVuma) {
      //alert('didVuma. longArr.length '  +longArr.length  +',  i '  +i  );
      var vumaQ=   longArr[i++].split("&") ;
   }

   // JJ: for the independent case generated out of dependent case
   plankProps= new planktonObject(info);
	this.infoInd= plankProps.infoInd;		//works! Type so far is object
		//alert('plankProps.infoInd in plankton.js is '+this.infoInd +'\n'
		//+'Type of is plankProps.infoInd'  +typeof(this.infoInd) +'(ajnf43985)');	//works! type is object
	//getting the language and salience from the end of info string
	//alert('type of info: ' +typeof(info)); // = object
	//infoArr= info.split(",");
	postInfoArr= new Array(2);
	postInfoArr[0]= info[17];
	postInfoArr[1]= info[18];
	postInfo=postInfoArr.join(","); this.postInfo= postInfo;
	//alert('postInfo is: ' +this.postInfo +', should be sth. like de,sal537. Type: ' +typeof(this.postInfo) +' should be string.');

   ss= ss+ "\n<p>" ;
   ss= ss+ longArr[0]  +" <br> " ;
   ss= ss+ longArr[1]  +" <br> " ; 
   ss= ss+ longArr[2]  +" <br> " ; 
   ss= ss+ "</p>" ;
 
   sc= sc+ longArr[1]  +" <br> " ;   
   sc= sc+ " highest pgain plankton feature is "  +plankProps.highestPgainFeat  +" <br> " ;
   sc= sc+ longArr[2]  +" <br> " ; 
   //ss= ss+ longArr[3]  +" <br> " ;   // full history
  
   sp= sp+ longArr[1]  +", ";
   sp= sp+ "c:" +plankProps.condition  +", " ;
   sp= sp+ "i:" +coreInfo(info).join("_")  +", " ; 
   
   // display results broken-down by click trials, learning trials, and all trials
   if( didVuma  )  {
   	// mmm this is messed up for the testing of the klmn experiment
      //var clickTrials= new jHistory(info, hist, 'last101', 'click trials only');
      var clickTrials= new jHistory(info, hist, 'last10', 'click trials only (last 10)');
      ss= ss+ clickTrials.msg +" <br> " ; 
   }

   sc= sc+ 'pgains '  +roundNum(plankProps.pg1,3)  +', '  +roundNum(plankProps.pg2,3)  +', '  +roundNum(plankProps.pg3,3)  +" <br> " ;      
   
   if( didVuma  )  {
      sc= sc+ "clicks "  +clickTrials.tailEyeClawFirst +" <br> " ;
      clicksToHighestPgainFeature= clickTrials.tailEyeClawFirst[plankProps.highestPgainFeat-1] ;
      if( clicksToHighestPgainFeature > 50 ) {
         sp= sp+ "plank:pgain, "
      }
      if( clicksToHighestPgainFeature < 51 ) {
         sp= sp+ "plank:other, "
      }
      sp= sp+ "clicks:" +clicksToHighestPgainFeature +", " ;
   }

   if( strContains(hist.join(','),'oneClick') && longDisp ) {
      var histBeforeClick= hist.join(',').split('oneClick')[0];
      var b4click= new jHistory(info, histBeforeClick.split(','), 'all',  'learning trials');
      ss= ss+ b4click.msg ; 
      // Here I'm testing whether I can get the right items for learning history
      sj= sj+ b4click.itemMisc ;
   }

   if( longDisp ) {
      var overallHistory= new jHistory(info, hist, 'all', 'all trials')
      ss= ss+ overallHistory.msg ; 
      // I think this is basically a mistake.
      // I should be looking at pre-criterion item performance
      //sj= sj+ overallHistory.itemMisc ;
   }
   
   // extrapolate percent correct based on recent history; vs theoretical
   var histRecent= new jHistory(info, hist, 'last200', 'last 200 trials');
   var progRpt= '\n accExtrapLast300: ' 
   progRpt= progRpt +roundNum(histRecent.subjHypPropCorr*100,1) 
   progRpt= progRpt +'% (vs '
   progRpt= progRpt +roundNum(histRecent.optHypPropCorr*100,1) 
   progRpt= progRpt +'%).\n<br>' ;
   sc= sc +progRpt ;  
   
   var tsExpFinish= NaN ;
   ss= ss+ '</p><p><br>' ;
   if(didVuma) {
      ss= ss+ 'vumaQ[0]'  +vumaQ[0]  +" <br> " ;
      vumaInfo= jp('vumaInfo', vumaQ[0]); 
      vumaInfo= vumaInfo[0].split("~");
      ss= ss+ 'vumaInfo '  +vumaInfo  +' <br> ' ;
      sc= sc+ 'vumaInfo '  +vumaInfo  +' <br> ' ;
      vumaProps= new planktonObject(vumaInfo) ;
      sc= sc+ 'pgains '  +roundNum(vumaProps.pg1,3)  +', '  +roundNum(vumaProps.pg2,3)  +', '  +roundNum(vumaProps.pg3,3)  +" <br> " ;
      ss= ss+ 'vumaQ[1]'  +vumaQ[1]  +" <br> " ;  
      vumaRanking= jp('vumaRanking', vumaQ[1]);  vumaRanking= vumaRanking[0].split("~") ;
      sc= sc+ 'vumaRanking '  +vumaRanking  +'<br>';
      ss= ss+  vumaQ.join("\n<br>") ; 
      // for early subjects (for whom we don't have timestamps) 
      //  we need a condition something like the following:
      if( strContains(hist.join(','), 'timeExpFinish') ) {
         tsExpFinish= parseColonComma( 'timeExpFinish', vumaQ[5].split(',') ) ;
      }
      vumaRankObj= new wordAndNumberRanking(vumaProps, vumaRanking) ; 
      sp= sp+ vumaRankObj.wnrInfo ;
      // mmm the ss string is screwed-up here
   }
   //alert(tsExpFinish)
   
   // if you have timestamp data, e.g. for subjs beyond S87, get the info:
   hoursLearning= NaN ;
   if(  didVuma && strContains(hist.join(','), 'timeClickFinish') && longDisp ) {
      ss= ss+ '</p><p>' ;
      tsExpStart= parseColonComma( 'timeExpStart', hist); 
      tsClickStart= parseColonComma( 'timeClickStart', hist); 
      tsClickFinish= parseColonComma( 'timeClickFinish', hist);  
      hoursLearning= roundNum( (tsClickStart-tsExpStart)/(10*60*60), 2) ;
      hoursClicking= roundNum( (tsClickFinish-tsClickStart)/(10*60*60), 2) ;
      hoursVuma= roundNum( (tsExpFinish-tsClickFinish)/(10*60*60), 2) ;
      hoursExperiment= roundNum( (tsExpFinish-tsExpStart)/(10*60*60), 2) ;
      ss= ss+ '<br>hours total: '  +hoursExperiment ;
      ss= ss+ '<br>hours learning: '  +hoursLearning ;
      ss= ss+ '<br>hours clicking: '  +hoursClicking ;
      ss= ss+ '<br>hours vuma: '  +hoursVuma ;
      startDate= new Date(tsExpStart*100);
      ss= ss+  '<br>experiment on: '  +startDate.toUTCString() ;   
   }   
   
   if (didVuma) {
      sp= sp +"opt1:" +(b4click.propLast100) +", opt2:" +(b4click.propLast200) +", opt4:" +(roundNum(b4click.propLast400,3)) +", " ;
      sp= sp +"items:" +b4click.itemAccuracyOk +", " ;
      sp= sp +"h:" +hoursLearning +", " ;
   }
   
   //  do you want all info or just a bit?
   toReturn= "<br>" ;
   if( longOrShort=='short') {
      toReturn= toReturn + sp ;	
   }
   if( longOrShort=='long') {
      //toReturn= toReturn +sp +"<p>" +sc +ss ;
      toReturn= toReturn + '<p><hr noshade="noshade" width="300" size="1" align="left" /><p>\n' ;
      toReturn= toReturn + sp + sc + ss ;
   }
   if( longOrShort=='itemsOnly') {
      toReturn= toReturn + '<p><hr noshade="noshade" width="300" size="1" align="left" /><p>\n' ;
      toReturn= toReturn + sp + sj ;
   }
   return toReturn ;
   
}  // this is the end of the big mega function

// the previous big mega function will be repeated with the independent parameters as input
// giving it the nice name here:
//function longResultsOneSubjInd= longResultsOneSubj(textFileContents, subjectID, longOrShort);













	   
   //dont forget to make InfoInd a string and .join(",")



//-->
