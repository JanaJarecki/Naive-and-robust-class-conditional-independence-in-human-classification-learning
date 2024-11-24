function fitness=DepVsIndFitness(params)
	% measure for best Differences in Response between class conditional independent and dependent environments
	% c1fgh_1 := p(c1| all combinations of fgh), "_1" := dependent, "_2" := independent

% parameter vectors from function 'environment'
[cfgh_1,cfgh_2,J_1]=DepVsIndEnvironment(params.x1,params.x2,params.x3,params.x4,params.x5,params.x6,params.x7,params.x8,params.x9,params.x10,params.x11,params.x12,params.x13,params.x14,params.x15,params.x16)	% (...) is the vector with 16 dependent prob's for the environment
	% they are scaled to sum to 1 in the function 'environment'

% calculate fitness
% weighted by the frequency of occurence
val = zeros(1,8)'
for j=1:8
	if ((cfgh_1(j,:,1)-0.5)*(cfgh_2(j,:,1)-0.5))>=0,
		val(j)=0;
	else ((cfgh_1(j,:,1)-0.5)*(cfgh_2(j,:,1)-0.5)),
		val(j)=(cfgh_1(j,:,1)-cfgh_2(j,:,1))^2 *(J_1(j))^2,
	end
end


% For weighting according to learnability use this
%val = zeros(1,8)'
% for j=1:8
	% if ((cfgh_1(j,:,1)-0.5)*(cfgh_2(j,:,1)-0.5))>=0,
		% val(j)=0;
	% else ((cfgh_1(j,:,1)-0.5)*(cfgh_2(j,:,1)-0.5)),
		% val(j)=((cfgh_1(j,:,1)-0.5)^3-(cfgh_2(j,:,1)-0.5)^3)^2,
	% end
% end
fitness=-sum(val)*2		%scaled by *2, => -1, hence minimiation problem in the evol. algorithm