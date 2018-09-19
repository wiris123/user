
	//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5: 연금저축, 7: 연금, 8: 변액적립, 50: 제휴상해2종, 51: 제휴상해3종
	//	9: 실손_종합_표준, 10: 실손_종합_선택, 11: 실손_질병_표준, 12: 실손_질병_선택, 13: 실손_상해_표준, 14: 실손_상해_선택
	//  15: 치아
	var insuranceType = "";

	var M_PRODUCT_CANCER = "1";
	var M_PRODUCT_TERM = "2";
	var M_PRODUCT_ACCIDENT = "3";
	var M_PRODUCT_ESAVING = "4";
	var M_PRODUCT_ANNUITY = "5";
	var M_PRODUCT_IANNUITY = "7";
	var M_PRODUCT_VARIABLESAVING = "8";
	var M_PRODUCT_MEDICAL_A1 = "9";
	var M_PRODUCT_MEDICAL_A2 = "10";
	var M_PRODUCT_MEDICAL_B1 = "11";
	var M_PRODUCT_MEDICAL_B2 = "12";
	var M_PRODUCT_MEDICAL_C1 = "13";
	var M_PRODUCT_MEDICAL_C2 = "14";
	var M_PRODUCT_DENTAL = "15";
	var M_PRODUCT_MEDICAL_D1 = "16"; //실손개정 by syi
	var M_PRODUCT_MEDICAL_D2 = "17"; //실손개정 by syi
	var M_PRODUCT_P_ACCIDENT1 = "49";
	var M_PRODUCT_P_ACCIDENT2 = "50";
	var M_PRODUCT_P_ACCIDENT3 = "51";

	var popLoading;
	
	// 변액 마지막 조회 투자수익율
	var lastSelectRate = 1;
	// 변액 마지막 조회 투자수익율 예시 데이터
	var lastSelectArrayData = null;
	// 변액 투자수익율별 해지 환급금 예시갯수
	var returnDataArrayLength = 0;
	
	/*var resultShowCookie = false;
	if ($.cookie("resultShow") != null){
		resultShowCookie = $.cookie("resultShow") == "false" ? false : true;
	}*/
	
	//실손 개정
	var calc_mainPage_medical = false;
	
	$(document).ready(function(){
		/*숫자만 입력되도록 처리*/
		$('.numOnly').css('imeMode','disabled').keypress(function(event) { //ie처리
			if(event.which && (event.which < 48 || event.which > 57) && event.which != 8 ) {
				event.preventDefault();
			}
		}).keyup(function(){ //크롬, 파폭 처리
			if( $(this).val() != null && $(this).val() != '' ) {
				$(this).val( $(this).val().replace(/[^0-9]/g, '') );
			}
		});

		/*문자만 입력되도록 처리*/
		$('.txtOnly').keyup(function(){ //크롬, 파폭 처리
			if( $(this).val() != null && $(this).val() != '' ) {
				$(this).val( $(this).val().replace(/[0-9]/g, '') );
			}
		});

		// 추가 (숫자 + 특수문자 '.')
		$('.numAndText').css('imeMode','disabled').keypress(function(event) { //ie처리
			if(event.which && (event.which < 48 || event.which > 57) && event.which != 46 ) {
				event.preventDefault();
			}
		});
	});

	function showReCalcButton(obj, enable) {
		
        if (typeof(obj) != "undefined") {
            if (enable) {
                $(obj).addClass('reset');
            } else {
                $(obj).removeClass('reset');
            }
        }
    }

	function showCalcResult(enable) {
		var obj = $('.product-result');
		var $uiResultFloat = $('#uiResultFloat');
		
		if (enable) {
			//obj.show();
			obj.addClass('open');
			$uiResultFloat.show();
			ui.autoScroll($('.product-result'));
		} else {
			//obj.hide();
			$uiResultFloat.hide();
			obj.removeClass('open');
		}
	}
	
	function showSubscribe(enable) {
		var $bottomSubscribe = $('#bottomSubscribe');
		if (enable) {
			$bottomSubscribe.show();
		} else {
			$bottomSubscribe.hide();
		}
	}

	/*function showNavFloat(enable) {
		var obj = $('#uiNavFloat');
		if (enable) {
			obj.show();
		} else {
			obj.hide();
		}
	}*/
	
	function getPFJsonData2(type, date, slpCode, birth, gender, annuityAge) {
		var result = '{"parameters" : {';

		//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금
		//	테스트로 사용
//		switch (type) {
//			case "1" :
//				result += '"hptsPrdtReprCd" : "LQ_3OI2000L0000_G06"';
//				break;
//			case "2" :
//				result += '"hptsPrdtReprCd" : "LQ_BNA1000L0000_G05"';
//				break;
//			case "3" :
//				result += '"hptsPrdtReprCd" : "LQ_JXR1000L0000_G05"';
//				break;
//			case "4" :
//				result += '"hptsPrdtReprCd" : "LQ_TZK2000L0000_G09"';
//				break;
//			case "5" :
//				result += '"hptsPrdtReprCd" : "LQ_9JH0000L0000_G06"';
//				break;
//			case "7" :
//				result += '"hptsPrdtReprCd" : "LQ_MTO4TB5L0000_G03"';
//				break;
//		}
		result += '"hptsPrdtReprCd" : "' + slpCode + '"';		
		
		
		if (typeof(annuityAge) == "undefined") {
			result += ',"anutBgnAge" : "0"';
		} else {
			
			 var annAge = annuityAge == "" ? "45" : annuityAge;
			
			result += ',"anutBgnAge" : "' + annAge + '"';
		}

		result += ',"contGender" : "' + gender + '"';
		result += ',"insAge" : "' + getInsuAgeByYmd(birth) + '"';
		result += ',"fullAge" : "' + getFullAgeByYmd(birth) + '"';
		result += ',"insType" : "' + type + '"';
		result += '}}';
		
		return result;
	}
	
	function getPFJsonData(type, date, slpCode, birth, gender, annuityAge) {
		var result = '{"parameters" : {';

		result += '"stndYmd" : "' + date + '"';
		result += ',"hptsPrdtReprCd" : "' + slpCode + '"';

		switch (type) {
			case M_PRODUCT_CANCER:
				result += ',"hptsLineCd" : "14"';
				break;
			case M_PRODUCT_TERM:
				result += ',"hptsLineCd" : "01"';
				break;
			case M_PRODUCT_ACCIDENT:
				result += ',"hptsLineCd" : "79"';
				break;
			case M_PRODUCT_ESAVING:
				result += ',"hptsLineCd" : "18"';
				break;
			case M_PRODUCT_ANNUITY:
				var annAge = annuityAge == "" ? "45" : annuityAge;
				result += ',"hptsLineCd" : ""';
				result += ',"annuityAge" : "' + annAge + '"';
				break;
			case M_PRODUCT_IANNUITY:
				var annAge = annuityAge == "" ? "45" : annuityAge;
				result += ',"hptsLineCd" : "18"';
				result += ',"annuityAge" : "' + annAge + '"';
				break;
			case M_PRODUCT_VARIABLESAVING:
				result += ',"hptsLineCd" : "18"';
				break;
			case M_PRODUCT_MEDICAL_A1:
				result += ',"hptsLineCd" : "V1"';
				break;
			case M_PRODUCT_MEDICAL_A2:
				result += ',"hptsLineCd" : "V2"';
				break;
			case M_PRODUCT_MEDICAL_B1:
				result += ',"hptsLineCd" : "V3"';
				break;
			case M_PRODUCT_MEDICAL_B2:
				result += ',"hptsLineCd" : "V4"';
				break;
			case M_PRODUCT_MEDICAL_C1:
				result += ',"hptsLineCd" : "V5"';
				result += ',"padCylCd" : "12"';
				break;
			case M_PRODUCT_MEDICAL_C2:
				result += ',"hptsLineCd" : "V6"';
				result += ',"padCylCd" : "12"';
				break;
			case M_PRODUCT_MEDICAL_D1:
				result += ',"hptsLineCd" : "V7"';
				result += ',"padCylCd" : "12"';
				break;
			case M_PRODUCT_MEDICAL_D2:
				result += ',"hptsLineCd" : "V8"';
				result += ',"padCylCd" : "12"';
				break;
			case M_PRODUCT_P_ACCIDENT1:
				result += ',"hptsLineCd" : "07"';
				result += ',"padCylCd" : "99"';
				break;
			case M_PRODUCT_P_ACCIDENT2:
				result += ',"hptsLineCd" : "07"';
				result += ',"padCylCd" : "99"';
				break;
			case M_PRODUCT_P_ACCIDENT3:
				result += ',"hptsLineCd" : "07"';
				result += ',"padCylCd" : "99"';
				break;
		}

		result += ',"contBirth" : "' + birth + '"';
		result += ',"contGender" : "' + gender + '"';
		result += ',"insAge" : "' + getInsuAgeByYmd(birth) + '"';
		result += ',"fullAge" : "' + getFullAgeByYmd(birth) + '"';
		result += '}}';
		
		return result;
	}

	function getInsuAgeByYmd(ymd) {
	    if(ymd == "" || ymd.length != 8) return "";

	    var today  = new Date();
	    var tYear  = parseInt(today.getFullYear(),10);
	    var tMonth = parseInt(today.getMonth(),10) + 1;
	    var tDay   = parseInt(today.getDate(),10);

	    var year  = parseInt(ymd.substring(0,4),10);
	    var month = parseInt(ymd.substring(4,6),10);
	    var day   = parseInt(ymd.substring(6,8),10);

	    var dateChk = false;
		if (((tMonth == 1 || tMonth == 3 || tMonth == 5 || tMonth == 7 || tMonth == 8 || tMonth == 10 || tMonth == 12) && tDay == 31) ||
			((tMonth == 4 || tMonth == 6 || tMonth == 9 || tMonth == 11) && tDay == 30) ||
			(tMonth == 2 && (tDay == 28 || tDay == 29))) {
			dateChk = true;
		}

		var calDay = tDay - day;
		if (calDay < 0 && dateChk == false) {
			tMonth--;
		}

		var calMonth = tMonth - month;
		if (calMonth < 0) {
			tYear--;
			calMonth = calMonth + 12;
		}

		var age = 0;
		age = tYear - year;
		if (calMonth > 5) {
			age++;
		}

		return age;
	}

	function getFullAgeByYmd(ymd) {
	    if(ymd == "" || ymd.length != 8) return "";

		var today  = new Date();
	    var tYear  = parseInt(today.getFullYear(),10);
	    var tMonth = parseInt(today.getMonth(),10) + 1;
	    var tDay   = parseInt(today.getDate(),10);

	    var year  = parseInt(ymd.substring(0,4),10);
	    var month = parseInt(ymd.substring(4,6),10);
	    var day   = parseInt(ymd.substring(6,8),10);

		var age = 0;
		if((tMonth > month) || (tMonth == month && tDay >= day)) {
		    age = tYear - year;
		} else {
		    age = tYear - year - 1;
		}
		return age;
	}

	function chkDate(obj){

		if (obj.length > 8) return false;

		var input = obj.replace(/-/g,"");

		if (input == null || input == ''){ return false;}
		if (input.length < 8){ return false;}

		var inputYear = input.substr(0,4);
		var inputMonth = input.substr(4,2) - 1;
		var inputDate = input.substr(6,2);

		var resultDate = new Date(inputYear, inputMonth, inputDate);

		if ( resultDate.getFullYear() != inputYear ||
			resultDate.getMonth() != inputMonth ||
			resultDate.getDate() != inputDate) {
			return false;
		} else {
			return true;
		}
	}

	function addCommas(nStr) {
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	}

	function selPrdtCdInfoByPrcd(jsonData, callback, inputObj) {

		showLoadingDialog(true);
		$.ajax({
			type : "POST",
			url : "/product/rulePrdtCdInfoByPrcd2.eds",
			data : jsonData,
			async : true,
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					pITrtyListPrtElemVO = result.pITrtyListPrtElemVO;			//	보험정보
					pIPadPrdListElemVO = result.pIPadPrdListElemVO; 			//	보기납기정보
					pIMnInsrEntStndInfoPrtVO = result.pIMnInsrEntStndInfoPrtVO;	//	보험상품정보

					if (typeof(inputObj) == "undefined") {
						callback();
					} else {
						callback(inputObj);
					}

				} else {
					pITrtyListPrtElemVO = '';
					pIPadPrdListElemVO = '';
					pIMnInsrEntStndInfoPrtVO = '';
				}
			},
			error : function() {
				//alert("error");
			},
			complete : function(){
				showLoadingDialog(false);
			}
		});
	}

	function showLoadingDialog(enabled) {
		if (typeof(gv_popCalcLoading) != "undefined") {
			if (enabled) {
				if (!gv_popCalcLoading.openCheck()) gv_popCalcLoading.openOutput();
			} else {
				if (gv_popCalcLoading.openCheck())	gv_popCalcLoading.closeOutput();
			}
		}
	}

	/**
	 * 금액 억 표기
	 * @param amt
	 * @returns {String}
	 */
	function wonToStr(amt) {
		var result;
		if (amt >= 10000){
			var firstAmt = parseInt(amt / 10000, 10);
			var lastAmt = parseInt(String(amt).substring(1), 10);
			if (lastAmt == 0) {
				result = firstAmt + "억";
			} else {
				result = firstAmt + "억" + addCommas(lastAmt);
			}
		} else {
			result = addCommas(amt);
		}
		return result;
	}

	/**
	 * 금액 억 표기
	 * @param amt
	 * @returns {String}
	 */
	function wonToStr2(amt) {
		var result;
		if (amt >= 10000){
			var firstAmt = parseInt(amt / 10000, 10);
			var lastAmt = parseInt(String(amt).substring(1), 10);
			if (lastAmt == 0) {
				result = firstAmt + "억";
			} else {
				result = firstAmt + "억" + addCommas(lastAmt) +"만";
			}
		} else {
			result = addCommas(amt) +"만";
		}
		return result;
	}

	/**
	 * 금액 억 표기
	 * @param amt
	 * @returns {String}
	 */
	function wonToStr3(amt) {
		var result = amt;

		if (amt >= 100000000) {
			var firstAmt;
			var lastAmt;
			var cnt;

			firstAmt = parseInt(amt / 100000000, 10);
			cnt = String(firstAmt).length;
			lastAmt = parseInt(parseInt(String(amt).substring(cnt), 10) / 10000, 10);

			if (lastAmt == 0) {
				result = firstAmt + "억";
			} else {
				result = firstAmt + "억" + addCommas(lastAmt) +"만";
			}
		} else if (amt >= 10000) {
			result = parseInt(amt / 10000, 10);
			result = addCommas(result) + "만";
		}

		return result;
	}

	function goSubscribe(insuType, planIndex){
		var postData ={"insuType" : insuType, "planType" : planIndex};
		jQuery.ajax({
			type : "POST",
			url : "/simplePlanSave.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					if(insuType=='8'){
						location.href = "/m/suitabilityInfo.eds";	// 변액 안내페이지 이동
					}else{
						location.href = "/m/stepGuide.eds";	// 청약페이지 이동
					}

				} else {
					alert(result.message);
				}
			},
			error : function() {
			}
		});
		
		// 변액 해지환급금, 환급률 쿠키저장
		if(insuType=='8'){
			if(lastSelectArrayData != null){
				var variableSavingRetun = new Object();
				
				var returnData = getReturnDataByPeriod(planIndex);
				
				variableSavingRetun.returnValue = returnData.rtnMoney;
				variableSavingRetun.returnRate = returnData.RtnRatio;
				
				if(lastSelectRate == 0){
					variableSavingRetun.standardRate = '-1.0';
				}else if(lastSelectRate == 1){
					variableSavingRetun.standardRate = '2.5';
				}else{
					variableSavingRetun.standardRate = '3.75';
				}
				
				$.cookie("variableSavingReturn", JSON.stringify(variableSavingRetun));
			}
		}
		
		var tmp = getProductName(String(insuType), 'ga') + "_Entry_PriceCheck_Enroll"; 
		ga('send','event','mDirect','Entry',tmp,1);
	}

	function getPlanUrl(proType){
		var url = "";
		if (proType == "1"){ url = "/m/cancer.eds"; }
		else if (proType == "2"){ url = "/m/term.eds";}
		else if (proType == "3"){ url = "/m/accident.eds"; }
		else if (proType == "4"){ url = "/m/esaving.eds"; }
		else if (proType == "5"){ url = "/m/annuity.eds"; }
		else if (proType == "7"){ url = "/m/iAnnuity.eds"; }
		else if (proType == "8"){ url = "/m/variableSaving.eds"; }
		else if (proType == "9"){ url = "/m/medical.eds"; }
		else if (proType == "15"){ url = "/m/dental.eds"; }
		return url;
	}

	function policyDown(pCode){
		if (confirm("Wifi 접속이 아닌 경우 데이터가 소모됩니다. 약관을 다운로드 하시겠습니까?")) {
			var planDocForm = document.getElementById("planDocForm");
			planDocForm.action = "/downPolicyPDF.eds";
			planDocForm.submit();
		}
	}

	/**
	 * 가입설계 planSeq 로 재계산후 바로가입하기 함수
	 * @param proType
	 * @param planSeq
	 */
	function checkPlanSeqCalc(proType, planSeq) {
		var postData ={
				"planSeq" : planSeq,
				"org": 'continue',
				"pro": 'contract',
				"area": 'main_cal'
		};
		
		$.ajax({
			type : "POST",
			url : "/chkPlanSeqCalcEx.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					goSubscribe(proType,"0");

				}
			},
			error : function() { alert("error"); }
		});
	}

/*	function getPersonalIndex(type) {
		if (type == PRODUCT_CANCER || type == PRODUCT_TERM) {
			return 1;
		} else {
			return 0;
		}
	}*/

	function getPersonalPrice(type) {
		if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM || type == M_PRODUCT_ACCIDENT
				|| type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2
				|| type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2
				|| type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2
				|| type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) {
			return "";
		} else {
			return "만";
		}
	}

	function planCheckMobileParameter(type, param) {

		var postData ={"kakao" : param};
		$.ajax({
			type : "POST",
			url : "/m/chkMobileParameter.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					mobileParameterCalc(type, result.data);
				}
			},
			error : function() { alert("error"); }
		});
	}

	// 변액 해지환급금 조회
	function getReturnDataByPeriod(idx){
		var returnData = null;
		
		if(lastSelectArrayData != null){
			var lastReturnDataArray;
			var yearPeriod;
			
			if($.isArray(lastSelectArrayData)){
				if(typeof lastSelectArrayData[idx].nowRateArry != 'undefined'){
					lastReturnDataArray = lastSelectArrayData[idx].nowRateArry;
					returnDataArrayLength = lastSelectArrayData[idx].nowRateArry.length / 3;
					yearPeriod = lastSelectArrayData[idx].inputObj.payPeriod;
				}else{
					lastReturnDataArray = lastSelectArrayData[idx + 1].nowRateArry;
					returnDataArrayLength = lastSelectArrayData[idx + 1].nowRateArry.length / 3;
					yearPeriod = lastSelectArrayData[idx + 1].inputObj.payPeriod;
				}
			}else{
				lastReturnDataArray = lastSelectArrayData.nowRateArry;
				returnDataArrayLength = lastSelectArrayData.nowRateArry.length / 3;
				yearPeriod = lastSelectArrayData.inputObj.payPeriod;
			}
			
			yearPeriod += '년';
		
			var startIdx = returnDataArrayLength * lastSelectRate;
			var endIdx = startIdx + returnDataArrayLength;
			
			for(var i=startIdx; i<endIdx; i++){
				if(yearPeriod == lastReturnDataArray[i].totTerm){
					returnData = lastReturnDataArray[i];
					break;
				}
			};
		}
		
		return returnData;
	};

	function sendPromotionCallback(step){
		
		if (typeof(gv_promoCallbackUrl) == "undefined" || typeof(gv_etcSession) == "undefined" || typeof(gv_promoCallbackStep) == "undefined") {return;}
		
		if(gv_promoCallbackUrl && gv_etcSession && gv_promoCallbackStep == step){
			var today  = new Date();
		    var tYear  = parseInt(today.getFullYear(),10);
		    var temMonth = parseInt(today.getMonth(),10) + 1;
		    var tMonth = temMonth < 10 ? "0"+temMonth : temMonth;
			var yyyymm = '&def=' + tYear + tMonth;
			var sendUrl = gv_promoCallbackUrl + gv_etcSession + yyyymm;
			
			$.ajax({
				type : "GET",
				url : sendUrl,
				dataType : 'jsonp',
				success : function(result) {
					console.log("success");
				},
				error : function(result) {
					console.log("error");
				} 
			});
		}
	}
