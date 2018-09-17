var digitalData = {
		page:{
			pageInfo:{
				destinationURL : $(location).attr('pathname').substring(0, $(location).attr('pathname').search('.eds')),
				pageTitle : document.title
			}
		},
		siteType : 'Mobile',
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
function adbCalcPremium(adobeTrackParam, prdtType){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;	
	
	_satellite.track('premium_calc');
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


//어도비 보험가입완료수(e27)
function adbSubscribeComplete(adobeTrackParam){
	digitalData.direct.gender = adobeTrackParam.gender;
	digitalData.direct.age = adobeTrackParam.age;
	digitalData.direct.prdtName = adobeTrackParam.prdtName;
	digitalData.direct.premium = adobeTrackParam.premium;
	digitalData.direct.payType = adobeTrackParam.payType;
	
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