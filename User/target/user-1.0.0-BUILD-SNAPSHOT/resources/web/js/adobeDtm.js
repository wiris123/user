var digitalData = {
		page:{
			pageInfo:{
				destinationURL : $(location).attr('pathname').substring(0, $(location).attr('pathname').search('.eds')),
				pageTitle : document.title
			}
		},
		siteType : 'PC',
		direct:{
			gender:'',
			age:'',
			prdtName:'',
			premium:'',
			payPeriod:'',
			insuPeriod:'',
			payType:'',
			annStartAge:'',
			downFileNm:'',
			mktAgreeNum:''
		}
};

//보험료계산수(e21)
function adbAnnuityCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbEsavingCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbIAnnuityCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbVariableSavingCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbCancerCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbTermCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbAccidentCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbMedicalCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료계산수(e21)
function adbDentalCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
	_satellite.track('premium_calc');
}

//보험료재계산수(e25)
function adbAnnuityReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.annStartAge = adobeTrackParam.annStartAge;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbEsavingReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbIAnnuityReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.annStartAge = adobeTrackParam.annStartAge;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbVariableSavingReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbCancerReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbTermReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbAccidentReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbMedicalReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험료재계산수(e25)
function adbDentalReCalc(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	digitalData.direct.payPeriod = adobeTrackParam.payPeriod;
	digitalData.direct.insuPeriod = adobeTrackParam.insuPeriod;
	
	_satellite.track('premium_reCalc');
}

//보험가입시작수(e26)
function adbSubscribeStart(insuType, adobeTrackParam){
	if(insuType == "1"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "2"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "3"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "4"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "5"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "6"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "7"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "8"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "9" || insuType == "10" || insuType == "11" || insuType == "12" || insuType == "13" || insuType == "14" 
		|| insuType == "16" || insuType == "17"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(insuType == "15"){
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}
	
	_satellite.track('step_start');
}

//신청수(e25)
function adbSendPlanMail(prdtType){
	if(prdtType == "1"){
		prdtType = "삼성생명 인터넷암보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "2"){
		prdtType = "삼성생명 인터넷정기보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "3"){
		prdtType = "삼성생명 인터넷상해보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "4"){
		prdtType = "삼성생명 인터넷저축보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "5"){
		prdtType = "삼성생명 인터넷연금저축보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "6"){
		
	}else if(prdtType == "7"){
		prdtType = "삼성생명 인터넷연금보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "8"){
		prdtType = "삼성생명 인터넷변액적립보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "9" || prdtType == "10" || prdtType == "11" || prdtType == "12" || prdtType == "13" || prdtType == "14"
		|| prdtType == "16" || prdtType == "17"){
		prdtType = "삼성생명 인터넷실손보험";
		digitalData.direct.planMailPrdtName = prdtType;
		
	}else if(prdtType == "15"){
		prdtType = "삼성생명 인터넷치아보험";
		digitalData.direct.planMailPrdtName = prdtType;
	}
	
	_satellite.track('application');
}

//어도비 보험가입완료수(e27)
function adbSubscribeComplete(adobeTrackParam){
	if(adobeTrackParam.prdtName == "1"){
		adobeTrackParam.prdtName = "삼성생명 인터넷암보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "2"){
		adobeTrackParam.prdtName = "삼성생명 인터넷정기보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "3"){
		adobeTrackParam.prdtName = "삼성생명 인터넷상해보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "4"){
		adobeTrackParam.prdtName = "삼성생명 인터넷저축보험";		
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
				
	}else if(adobeTrackParam.prdtName == "5"){
		adobeTrackParam.prdtName = "삼성생명 인터넷연금저축보험";		
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "6"){
		
	}else if(adobeTrackParam.prdtName == "7"){
		adobeTrackParam.prdtName = "삼성생명 인터넷연금보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "8"){
		adobeTrackParam.prdtName = "삼성생명 인터넷변액적립보험";		
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
		
	}else if(adobeTrackParam.prdtName == "9" || adobeTrackParam.prdtName == "10" || adobeTrackParam.prdtName == "11" ||
			adobeTrackParam.prdtName == "12" || adobeTrackParam.prdtName == "13" || adobeTrackParam.prdtName == "14" ||
			adobeTrackParam.prdtName == "16" || adobeTrackParam.prdtName == "17"){
		
		adobeTrackParam.prdtName = "삼성생명 인터넷실손보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
	}else if(adobeTrackParam.prdtName == "15"){
		adobeTrackParam.prdtName = "삼성생명 인터넷치아보험";
		digitalData.direct.gender = adobeTrackParam.gender;
		digitalData.direct.age = adobeTrackParam.age;
		digitalData.direct.prdtName = adobeTrackParam.prdtName;
		digitalData.direct.premium = adobeTrackParam.premium;
		digitalData.direct.payType = adobeTrackParam.payType;
	}
	
	_satellite.track('step_complete');
	if(typeof(_satellite) != "undefined" && _satellite){
		if(typeof(_satellite.readCookie) != "undefined" && _satellite.readCookie){
			
			var adbCookieId = unescape(_satellite.readCookie("AMCV_F93A97AE5992D29C0A495DC2%40AdobeOrg")).split("MCMID")[1].split("|")[1];
			var adbJson = '{"parameters" : {';
			adbJson += '"planId" : "' + adobeTrackParam.planId + '"';
			adbJson += ', "adbCookieId" : "' + adbCookieId + '"';
			adbJson += '}}';
			
			
			// 어도비 쿠키값 DB 저장
			jQuery.ajax({
				type : "POST",
				url : "/registAdbCookieId.eds",
				data : adbJson,
				dataType : 'json',
				async: false,
				success : function(result) {
					if (result.success) {
											
					} else {
						alert("어도비 실패");
					}
				},
				beforeSend: function() {
					
				},
				error:function(){
					
				}
			});
		}
	}
}

//어도비 마케팅동의수(e16)
function adbMarkettingAgreeNum(num){
	digitalData.direct.mktAgreeNum = num;
	
	_satellite.track('mkt_agreement');
}

//어도비 이벤트응모수(e64)
function adbEventApply(adobeTrackParam){
	//digitalData.direct.evtCustName = adobeTrackParam.name;
	//digitalData.direct.telNum = adobeTrackParam.tel1 + adobeTrackParam.phone;
	
	_satellite.track('event_entry');
}