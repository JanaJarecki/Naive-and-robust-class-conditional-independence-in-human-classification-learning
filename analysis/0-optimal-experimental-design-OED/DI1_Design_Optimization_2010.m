function DepVsInd(iter,time)
% 	iter: max iterations, time: max time
%	
%	Optimization using DIFFERENTIALEVOLUTION.
%		DepVsIndep starts searching the minimum of the objective function called DepVsIndFitness,
%		It calculates the Difference between assuming class-conditional dependence
%		and class-conditional independence in the optimal response to classify an entity
%		which is onserved with any combination of three binary features f,g,h
%			
%
%		Jana Jarecki
%		Last modified 17.Sept.2010
%		The Evolutionary algorythm is by Markus Buehren


% set title
optimInfo.title = 'Dependence vs. Independence';

% specify objective function
objFctHandle = @DepVsIndFitness;

% define parameter names, ranges and quantization:
paramDefCell = {
	 'x1', [0 1], [0.01], [0.2]
	 'x2', [0 1], [0.01], [0.2]
	 'x3', [0 1], [0.01], [0.2]
	 'x4', [0 1], [0.01], [0.2]
	 'x5', [0 1], [0.01], [0.2]
	 'x6', [0 1], [0.01], [0.2]
	 'x7', [0 1], [0.01], [0.2]
	 'x8', [0 1], [0.01], [0.2]
	 'x9', [0 1], [0.01], [0.2]
	'x10', [0 1], [0.01], [0.2]
	'x11', [0 1], [0.01], [0.2]
	'x12', [0 1], [0.01], [0.2]
	'x13', [0 1], [0.01], [0.2]
	'x14', [0 1], [0.01], [0.2]
	'x15', [0 1], [0.01], [0.2]
	'x16', [0 1], [0.01], [0.2]
	};
% 1. column: parameter names
% 2. column: paramter ranges
% 3. column: paramter quantizations
% 4. column: initial values (optional)

% no vector of initial parameter values in struct objFctParams needed
objFctParams.x1 = [];
objFctParams.x2 = [];
objFctParams.x3 = [];
objFctParams.x4 = [];
objFctParams.x5 = [];
objFctParams.x6 = [];
objFctParams.x7 = [];
objFctParams.x8 = [];
objFctParams.x9 = [];
objFctParams.x10 = [];
objFctParams.x11 = [];
objFctParams.x12 = [];
objFctParams.x13 = [];
objFctParams.x14 = [];
objFctParams.x15 = [];
objFctParams.x16 = [];

% no additional single function parameter needed
objFctSettings = {};

% get default DE parameters
DEParams = getdefaultparams;

% set number of population members (often 10*D is suggested) 
DEParams.NP = 40;

% do not use slave process here
DEParams.feedSlaveProc = 0;

% set times
DEParams.maxiter       = iter;
DEParams.maxtime       = time;  % in seconds
DEParams.maxclock      = [];

% set display options
DEParams.refreshiter   = 1;
DEParams.refreshtime   = 10;  % in seconds
DEParams.refreshtime2  = 20;  % in seconds
DEParams.refreshtime3  = 40;  % in seconds

% do not send E-mails
emailParams = [];

% set random state in order to always use the same population members here
rand('state', 1);

% start differential evolution
[bestmem, bestval, bestFctParams] = ...
	differentialevolution(DEParams, paramDefCell, objFctHandle, ...
	objFctSettings, objFctParams, emailParams, optimInfo); %#ok

disp(' ');
disp('Best parameter set returned by function differentialevolution:');
disp(bestFctParams);

