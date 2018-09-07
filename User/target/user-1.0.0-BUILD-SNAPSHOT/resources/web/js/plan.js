	// PF
//	var preGender;						//	성별값 - 반복클릭 체크에 사용
//	var preBirth;						//	생년월일값 - 반복클릭 체크에 사용
//	var preAnnAge						//	연금개시나이 - 반복클릭 체크에 사용
	var pITrtyListPrtElemVO = '';		// 보험정보
	var pIPadPrdListElemVO = '';		// 보기납기정보
	var pIMnInsrEntStndInfoPrtVO = '';	//	보험상품정보
	var treatyInfoList = "";
	
	//	Session check
	var sessionChecked = false;
	var sessionNapTerm = "";
	var sessionNapMoney = "";

	//	parameter check
	/*
	paramData.annuityAge
	paramData.contBirth
	paramData.contGender
	paramData.insuPeriod
	paramData.payPeriod
	paramData.premium
	*/
	var paramData = null;
	var paramUsed = false;

	//	session process check
	var sessionProcessing = false;

	//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:c연금저축, 7 :연금
	var	 insuranceType = "";
	var	 insTerm = "";
	
//	var isSimpleCalc = false;

	//	팝업
	var popLoading;
//	var popDetail;
//	var popEMail;

	//	해지환급금, 보장내역의 레이어에서 프린트시 사용
	var popIndex = 1;

	/**
	 * 버튼 토글 const
	 */
	var showBuy  = 1;
	var showCalc = 2;

	// 최근설계내역 적재 해야하면 true
	// 최근설계내역 적재 안하고 싶으면 false
	// 기본값은 true
	var isRecentPlanSave = true ;

	//	메일 데이터
	var totPremiumArry;
	var arryData1;
	var arryData2;
	var arryData3;
	var arryData4;
	var arryData5;
	
	//	재계산시에 필요
	var prevVal;
	var nextVal;
	
	// 변액 마지막 조회 투자수익율
	var lastSelectRate = 1;
	// 변액 마지막 조회 투자수익율 예시 데이터
	var lastSelectArrayData = null;
	
	//	파라미터체크 콜백
	var planCBParam = function(result) {
		paramData = result.data;
		selectGenderUI(result.data.contGender);
		$("#birthday").val(result.data.contBirth).click();
		// PF 태우기
		if (result.data.contGender=="1"){
			$("#calcGender1").click();
		}else{
			$("#calcGender2").click();
		}
		
		if(insuranceType == '9' || insuranceType == '10' || insuranceType == '11' || 
				insuranceType == '12' || insuranceType == '13' || insuranceType == '14' || 
					insuranceType == '16' || insuranceType == '17' ){
			
			setMedicalInsuCondition(result);
			
			if(paramData.prdtType == '9' || paramData.prdtType == '10' || paramData.prdtType == '11' ||
					paramData.prdtType == '12' || paramData.prdtType == '13' ||	paramData.prdtType == '14' || paramData.prdtType == '16' ||	paramData.prdtType == '17' ||
					paramData.proType == '9' || paramData.proType == '10' || paramData.proType == '11' ||
					paramData.proType == '12' || paramData.proType == '13' || paramData.proType == '14' || paramData.proType == '16' || paramData.proType == '17'){
				if(paramData.mdcrRcbfrYn == 'Y'){
					$("#formCalculator").find('input[name=mdcrRcbfrYn]').prop('checked', true).prev().addClass('on');
					$('#frm').find('input[name=mdcrRcbfrYn]').val('Y');
				}else{
					$('#frm').find('input[name=mdcrRcbfrYn]').val('N');
				}
				
				gv_treatyList = paramData.treatyList;

				medicalPlanCalcFromDirect();
			}
		}
	};

	$(document).ready(function(){

		//	모든 상품에서 화면제어에 사용
		//	변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");

		//	시작시 버튼 스타일
		displayType(showBuy);

		showResultDiv(false);

		//	로딩 팝업
		popLoading = $plugin.popmodal($('#popProcessPlan2'), {
			load_display : false,
			overlay_click : false
		});

		$(".product-result").on("click", "#savePlan1,#savePlan1-2", function(){ goSavePlanData(insuranceType, 0); });
		$(".product-result").on("click", "#goPlan1,#goPlan1-2", function(){ validatePromotionAcnt(0); });
		$(".product-result").on("click", "#savePlan2,#savePlan2-2", function(){ goSavePlanData(insuranceType, 1); });
		$(".product-result").on("click", "#goPlan2,#goPlan2-2", function(){ validatePromotionAcnt(1); });
		$(".product-result").on("click", "#savePlan3,#savePlan3-2", function(){ goSavePlanData(insuranceType, 2); });
		$(".product-result").on("click", "#goPlan3,#goPlan3-2", function(){ validatePromotionAcnt(2); });

		//	event - 버튼클릭 (프린트)
		$("#doPrint, #doPrintPop").on("click", function() {

			if ($(this).attr("id") == "doPrint") {
				$("#uiProductResult1").printArea();
			} else {
				if (popIndex == 1) {
					//	보장내역 프린트
					$("#tabResult1").printArea();
				} else {
					//	해지환급금 프린트
					$(".tb-toggle").addClass("open");
					$("#tabResult2").printArea();
					$(".tb-toggle").removeClass("open");
				}
			}
		});

		//	event - 버튼클릭 (해지환급금, 보장내역에서 프린트시에 사용될 인덱스 설정)
		$("#detailTab1").on("click", function() { popIndex = 1; });
		$("#detailTab2").on("click", function() { popIndex = 2;	});
		
		// 다른고객님의 선택 toggle
		$('#btnToggleAreaCurve').click(function(){
			var $productOtherDiv = $(this).closest('div.product-other');
			
			if($productOtherDiv.hasClass('open')){
				$productOtherDiv.removeClass('open');
			}else{
				$productOtherDiv.addClass('open');
			}
		});
	});
	
	function validatePromotionAcnt(idx){
		if(typeof $promotionAcntCnt !== 'undefined' && $promotionAcntCnt > 0){
			openPromotionSerial(idx);
		}else{
			goSubscribe(insuranceType, idx);
		}
	}
	
	function calculatorCheckEvent() {
		if (typeof($.cookie("calcEvent")) != "undefined") {
			$.removeCookie("calcEvent", {path:"/"});
			
			if(gv_promoCode == 'paccident_event'){
				getEventInfo('N_EVT14', insuranceType);
			}
		}
	}
	
/*	function setCalculatorEvent() {
		$.cookie("calcEvent", "1" ,{path:'/'});
		
		// real click 전환 보험료 계산 스크립트
		call_dsp_track();
		
		// cube 보험료 계산 스크립트
		if(typeof _CONV != "undefined"){
			_CONV('', '', '', '', '', '', '', '1', '', '', '', '0');
		}
	}*/
	
	function clickDetailTab(index) {
		var order = $("#uiProductResult1 .list-result .box").index($("#uiProductResult1 .list-result .on"));
		var obj = $("#detailTab" + index);
		
		$(".tab-wrap").removeClass("select-data1");
		$(".tab-wrap").removeClass("select-data2");
		$(".tab-wrap").removeClass("select-data3");
		
		$(".tab-wrap").addClass("select-data" + (parseInt(order) + 1));
		
		obj.click();
	}
	
	// 연금저축, 저축, 연금의 경우 PC 계산결과 UI가 바뀌어서(계산결과 1개) select-data2 로만 클래스 전달
	function clickDetailTab2(index){
		var obj = $("#detailTab" + index);
		
		$(".tab-wrap").removeClass("select-data1");
		$(".tab-wrap").removeClass("select-data2");
		$(".tab-wrap").removeClass("select-data3");
		
		$(".tab-wrap").addClass("select-data2");
		
		obj.click();
	}
	
	var isSkipPopup = false;
	
	function setSkipPopupVariable(enable) {
		isSkipPopup = enable;
	}

	function policyDown(enable){
		if (typeof(enable) != "undefined") {
			setSkipPopupVariable(enable);
		}
		
	    var planDocForm = document.getElementById("planDocForm");
	    planDocForm.action = "/downPolicyPDF.eds";
	    planDocForm.submit();
	}

	function initMailData(size) {
		totPremiumArry = new Array(size);
		arryData1 = new Array(size);
		arryData2 = new Array(size);
		arryData3 = new Array(size);
		arryData4 = new Array(size);
		arryData5 = new Array(size);
	}

	/*
	function getInsuranceType(type) {
		var result;

		//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금
		//var	insuranceType = "";

		switch (type) {
			case "cancer" 	: result = "1"; break;
			case "term"		: result = "2"; break;
			case "accident"	: result = "3"; break;
			case "esaving"	: result = "4"; break;
			case "annuity"	: result = "5"; break;
			case "iAnnuity" : result = "7"; break;
		}

		return result;
	}
	*/

	/**
	 * 생년월일 확인
	 * @param ymd
	 * @returns
	 */
	function validateCustAge() {
		var result = true;
		var msg = "";
		// 생년월일

		if (!chkDate($("#birthday").val())) {
			alert("생년월일을 올바르게 입력해주세요.");
    		result = false;
		} else {
			var age = getInsuAgeByYmd($("#birthday").val());
			
			// 연금저축은 만나이 기준
			if(insuranceType == '5'){
				age = getFullAgeByYmd($("#birthday").val());
			}
			
			if ( (age < $staAge) || (age > $endAge) ) {
				//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금
				switch (insuranceType) {
					case "1" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷암보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "2" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷정기보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "3" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷상해보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "4" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "5" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금저축보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "7" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "49" :
					case "50" :
					case "51" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷제휴상해보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "9" :
					case "10" :
					case "11" :
					case "12" :
					case "13" :
					case "14" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷실손의료비보장보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
					case "15":
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷치아보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ";
						break;
				}

				
				alert(msg);
				$("#birthday").focus();
				$("#birthday").val("");
        		result = false;
			}
		}

		//if (!result) $('#birthday').focus();
		if (!result) {
			$('#birthday').focus();
			$('#birthday').val("");
		}

		return result;
	}


	/**
	 * 성별 클릭 효과
	 * @param ymd
	 * @returns
	 */
	function selectGenderUI(index) {
		if (index == 1) {
			$("label[for=calcGender1]").addClass("on");
			$("label[for=calcGender2]").removeClass("on");

			$("input:radio[name=pgender]:input[value=1]").attr("checked", true);
			$("input:radio[name=pgender]:input[value=2]").attr("checked", false);
		} else {
			$("label[for=calcGender1]").removeClass("on");
			$("label[for=calcGender2]").addClass("on");

			$("input:radio[name=pgender]:input[value=1]").attr("checked", false);
			$("input:radio[name=pgender]:input[value=2]").attr("checked", true);
		}
	}


	/**
	 * PF 통신
	 * @param ymd
	 * @returns
	 */
	function selPrdtCdInfoByPrcd(jsonData, callback, inputObj) {

		showLoadingDialog(true);
		setTimeout(function(){
			$.ajax({
				type : "POST",
				//	2016.09.21
				//url : "/product/rulePrdtCdInfoByPrcd.eds",
				url : "/product/rulePrdtCdInfoByPrcd2.eds",
				data : jsonData,
				async : false,
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						if(typeof result.pIPrdtCdListElemVO != 'undefined'){
							pIPrdtCdListElemVO = result.pIPrdtCdListElemVO;
						}
						pITrtyListPrtElemVO = result.pITrtyListPrtElemVO;			//	보험정보
						pIPadPrdListElemVO = result.pIPadPrdListElemVO; 			//	보기납기정보
						pIMnInsrEntStndInfoPrtVO = result.pIMnInsrEntStndInfoPrtVO;	//	보험상품정보
						treatyInfoList = result.treatyInfoList;						//	보험정보

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

					if (!paramUsed && !sessionProcessing) {
						//showLoadingDialog(false);
					}
				},
				error : function() {
					alert("error");
				},
				complete : function() {
					showLoadingDialog(false);
				}
			});
		}, 0);
	}

	function planCalc(type) {
		//	 1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금, 8 : 변액저축
		switch (type) {
			case "1": cancerPlanCalc("simple"); break;
			case "2": termPlanCalc("simple"); break;
			case "3": accidentPlanCalc("simple"); break;
			case "4": eSavingPlanCalc("simple"); break;
			case "5": annuityPlanCalc("simple"); break;
			case "7": iAnnuityPlanCalc("simple"); break;
			case "8": variableSavingPlanCalc("simple"); break;
		}
	}


	/**
	 * PF 통신
	 * @param ymd
	 * @returns
	 */
	function getPFJsonData(type, date, slpCode, birth, gender, annuityAge) {
		var result = '{"parameters" : {';

		result += '"stndYmd" : "' + date + '"';
		result += ',"hptsPrdtReprCd" : "' + slpCode + '"';

		//	 1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금
		switch (type) {
			case "1":
				result += ',"hptsLineCd" : "14"';
				break;
			case "2":
				result += ',"hptsLineCd" : "01"';
				break;
			case "3":
				result += ',"hptsLineCd" : "79"';
				break;
			case "4":
				result += ',"hptsLineCd" : "18"';
				break;
			case "5":
				var annAge = annuityAge == "" ? "45" : annuityAge;

				result += ',"hptsLineCd" : ""';
				result += ',"annuityAge" : "' + annAge + '"';

				break;
			case "7":
				var annAge = annuityAge == "" ? "45" : annuityAge;

				result += ',"hptsLineCd" : "18"';
				result += ',"annuityAge" : "' + annAge + '"';
				break;
			case "8":
				result += ',"hptsLineCd" : "18"';
				break;
			case "9":
				result += ',"hptsLineCd" : "V1"';
				break;
			case "10":
				result += ',"hptsLineCd" : "V2"';
				break;
			case "11":
				result += ',"hptsLineCd" : "V3"';
				break;
			case "12":
				result += ',"hptsLineCd" : "V4"';
				break;
			case "13":
				result += ',"hptsLineCd" : "V5"';
				result += ',"padCylCd" : "12"';
				break;
			case "14":
				result += ',"hptsLineCd" : "V6"';
				result += ',"padCylCd" : "12"';
				break;
			case "16":
				result += ',"hptsLineCd" : "V7"';
				result += ',"padCylCd" : "12"';
				break;
			case "17":
				result += ',"hptsLineCd" : "V8"';
				result += ',"padCylCd" : "12"';
				break;
			case "49":
				result += ',"hptsLineCd" : "07"';
				result += ',"padCylCd" : "99"';
				break;
			case "50":
				result += ',"hptsLineCd" : "07"';
				result += ',"padCylCd" : "99"';
				break;
			case "51":
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
	
	/**
	 * PF 통신
	 * @param ymd
	 * @returns
	 */
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

	/**
	 * 타입, 생년월일, 현재일, 인풋 오브젝트만 던지면
	 * 자동계산해서 뿌려주는 함수
	 * @param type
	 * @param date
	 * @param obj
	 */
	function planRefresh(type, date, obj) {
		var inputObj;

		showResultDiv(false);

		if (typeof(obj) != "undefined") {
			inputObj = obj;
		} else {
			// 가설결과 세션 확인
			inputObj = chkPlanSession(type);
		}
		
		if (typeof(inputObj) !== "undefined") {

			$("#birthday").val(inputObj.contBirth).click();
			selectGenderUI(inputObj.contGender);

			switch (type) {
				case "cancer":
					cancerCheckSession(inputObj, date);
					break;
				case "term":
					termCheckSession(inputObj, date);
					break;
				case "accident":
					accidentCheckSession(inputObj, date);
					break;
				case "iAnnuity":
					sessionProcessing = true;
					iAnnuityCheckSession(inputObj, date);
					break;
				case "annuity":
					sessionProcessing = true;
					annuityCheckSession(inputObj, date);
					break;
				case "esaving":
					eSavingCheckSession(inputObj, date);
					break;
				case "variableSaving":
					variableSavingCheckSession(inputObj, date);
					break;
				case "pAccident":
					pAccidentCheckSession(inputObj, date);
					break;
				case "medical":
					medicalCheckSession(inputObj, date);
					break;
				case "dental":
					
					if( inputObj.calcType == "direct" ){
						dentalPlanCalc("simple");
					}
					
					setCalcType(inputObj.planSubType);
					setTreatyUiDisplay(inputObj.treatyList, true);
					showResultDiv(true);
					break;
			}
			return true;
		}else{
			return false;
		}
	}


	/**
	 * URL 파라미터 체크
	 * @param ymd
	 * @returns
	 */
	function planCheckParameter(type, callback, param) {

		var postData ={"email" : param};
		$.ajax({
			type : "POST",
			url : "/chkParameter.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					paramUsed = true;
					
					if( insuranceType == "9" || insuranceType == "10" || insuranceType == "11" || insuranceType == "12" ||
							insuranceType == "13" || insuranceType == "14" || insuranceType == "16" || insuranceType == "17" )
					{
						var selectedBoxStr = genMedicalSelBoxInsuListStr( result.data.prdtType, result.data.treatyList );
						result.data.selectedInsuList = selectedBoxStr;
						
						var selectedBoxArr = result.data.selectedInsuList.split("|");
						insuranceType = selectedBoxArr[0];
					}
					
					callback(result);
				}
			},
			error : function() { alert("error"); }
		});
	}


	/**
	 * planSeq 를 사용하여 자동 계산되는 함수 시작
	 * @param ymd
	 * @returns
	 */
	function planCheckPlanSeq(type, callback, param) {

		var postData ={"planSeq" : param};
		$.ajax({
			type : "POST",
			url : "/chkPlanSeqCalc.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					paramUsed = true;
					callback(result);
				}
			},
			error : function() { alert("error"); }
		});
	}



	/**
	 * 가설결과 세션 확인 함수 - 모든 상품 공통
	 * @param type
	 */
	function chkPlanSession(type) {

		var postData = {"planType" : type};
		var ret;

		$.ajax({
			type : "POST",
			url : "/getPlanSession.eds",
			data : JSON.stringify(postData),
			dataType : 'json',
			async : false,
			success : function(result) {
				if (result.success) {
					//	바로가입하기를 한후 아무러 액션이 없는 상태에서
					//	같은 상품 페이지를 refresh할때 skip
					if (result.arryData.length > 1) {
						ret = result.arryData[1].inputObj;
					} else {
						ret = result.arryData[0].inputObj;
					}
					
					//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5: 연금저축, 7: 연금, 8: 변액
					switch (insuranceType) {
					case "1":
						cancerSetResult(result);
						break;
					case "2":
						termSetResult(result);
						break;
					case "3":
						accidentSetResult(result);
						break;
					case "4":
						eSavingSetResult(result);
						break;
					case "5":
						annuitySetResult(result);
						break;
					case "7":
						iAnnuitySetResult(result);
						break;
					case "8":
						lastSelectArrayData = result.arryData;
						variableSavingSetResult(result);
						break;
					case "9":
					case "10":
					case "11":
					case "12":
					case "13":
					case "14":
						medicalSetResult(result);
						break;
					case "15":
						dentalSetResult(result);
						break;
					}
					
				}
			},
			error : function() {
				alert("error");
			}
		});

		return ret;
	}


	/**
	 * 해지환급금 style 넣기
	 */
	function addClassToDetailReturn(obj) {
		var tmp = "";
		var cnt = obj.children().size();
		obj.children().each(function(i) {

			if (i == cnt - 1) {
				$(this).addClass("on");
			} else {
				$(this).children().each(function(j) {
					if (j == 0) {
						tmp = $(this).text();

						if (tmp == "1년" || tmp == "5년" || tmp == "7년" || tmp == "10년" || tmp == "20년"
							|| tmp == "30년" || tmp == "40년" || tmp == "50년"
								|| tmp == "60년" || tmp == "70년" || tmp == "80년") {


							if (insuranceType == "1") {
								$(this).parent().addClass("on");
							} else {
								if (tmp != "7년") {
									$(this).parent().addClass("on");
								}
							}
						}
					}
				});
			}
		});
	}

	/**
	 * 해지환급금, 보장내역 테이블 지우기
	 */
	function clearPlanDetail(data) {
		var htmlStr = "";
		var htmlCnt = data.nowRateArry.length;

		$("#return1").empty();
		$("#return2").empty();
		$("#return3").empty();
		
		for (var i = 0; i < htmlCnt; i++) {
			
			if (i == htmlCnt - 1) {
				htmlStr += "<tr class='last'>" +
				"<td></td>" +
				"<td class='data1 value1'>-</td>" +
				"<td class='data1 value2'>-</td>" +
				"<td class='data1 value3'>-</td>" +
				"<td class='data2 value1'>-</td>" +
				"<td class='data2 value2'>-</td>" +
				"<td class='data2 value3'>-</td>" +
				"<td class='data3 value1'>-</td>" +
				"<td class='data3 value2'>-</td>" +
				"<td class='data3 value3'>-</td>" +
				"</tr>";
			} else {
				htmlStr += "<tr>" +
				"<td></td>" +
				"<td class='data1 value1'>-</td>" +
				"<td class='data1 value2'>-</td>" +
				"<td class='data1 value3'>-</td>" +
				"<td class='data2 value1'>-</td>" +
				"<td class='data2 value2'>-</td>" +
				"<td class='data2 value3'>-</td>" +
				"<td class='data3 value1'>-</td>" +
				"<td class='data3 value2'>-</td>" +
				"<td class='data3 value3'>-</td>" +
				"</tr>";
			}
		}
		
		$("#return1").html(htmlStr);
		$("#return2").html(htmlStr);
		$("#return3").html(htmlStr);
	}
	
	
	function clearPlanDetailAnnuity(data, idx) {
		var htmlStr = "";
		var htmlCnt = data.nowRateArry.length;
		
		
		$("#return1-"+idx).empty();
		$("#return3-"+idx).empty();
		$("#return2-"+idx).empty();
			
		if(idx==0){
			for(var j = 0; j < htmlCnt; j++){
				if (j == htmlCnt - 1) {
					htmlStr += "<tr class='last'>" +
					"<td></td>" +
					"<td class='data1 value1'>-</td>" +
					"<td class='data1 value2'>-</td>" +
					"<td class='data1 value3'>-</td>" +
					"<td class='data2 value1'>-</td>" +
					"<td class='data2 value2'>-</td>" +
					"<td class='data2 value3'>-</td>" +
					"<td class='data3 value1'>-</td>" +
					"<td class='data3 value2'>-</td>" +
					"<td class='data3 value3'>-</td>" +
					"</tr>";
				} else {
					htmlStr += "<tr>" +
					"<td></td>" +
					"<td class='data1 value1'>-</td>" +
					"<td class='data1 value2'>-</td>" +
					"<td class='data1 value3'>-</td>" +
					"<td class='data2 value1'>-</td>" +
					"<td class='data2 value2'>-</td>" +
					"<td class='data2 value3'>-</td>" +
					"<td class='data3 value1'>-</td>" +
					"<td class='data3 value2'>-</td>" +
					"<td class='data3 value3'>-</td>" +
					"</tr>";
				}
			}
		}else{ // 추천설계 해지환급금 html
			for(var j = 0; j < htmlCnt; j++){
				if (j == htmlCnt - 1) {
					htmlStr += "<tr class='last'>" +
					"<td></td>" +
					"<td class='data1 value1'>-</td>" +
					"<td class='data1 value2'>-</td>" +
					"<td class='data1 value3'>-</td>" +
					"</tr>";
				} else {
					htmlStr += "<tr>" +
					"<td></td>" +
					"<td class='data1 value1'>-</td>" +
					"<td class='data1 value2'>-</td>" +
					"<td class='data1 value3'>-</td>" +
					"</tr>";
				}
			}
		}			
			
		$("#return1-"+idx).html(htmlStr);
		$("#return3-"+idx).html(htmlStr);
		$("#return2-"+idx).html(htmlStr);
				
		
	}

	function planSetDetailTitle(obj, data, index) {
		if (typeof(obj) != "undefined") {
			var txt = data;
			
			if (txt == "") {
				txt = "-";
			}
			$(obj.children()[index]).text(txt);
		}
	}

	function planSetResultDisplay(data) {

		var html1;
		var html3;
		var html1_2;
		var html3_2;

		//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금, 8 :변액적립
		if (insuranceType == "4") {

			html1 = '<div class="box box-result1">' +
					'<h4 class="heading">' +
					'<span>맞춤 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium1">00</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_esaving-top_list_1\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span>만기환급금</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnMoney1">00,000,000</span> 원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio1">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan1"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan1"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html3 = '<div class="box box-result3">' +
					'<h4 class="heading">' +
					'<span>추천 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium3">000</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan3" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_esaving-top_list_3\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span>만기환급금</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnMoney3">000,000,000</span> 원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio3">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan3"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan3"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';


			html1_2 = html1;
			html1_2 = html1_2.replace("monthlyPremium1", "monthlyPremium1-2");
			html1_2 = html1_2.replace("returnMoney1", "returnMoney1-2");
			html1_2 = html1_2.replace("returnRatio1", "returnRatio1-2");
			html1_2 = html1_2.replace("savePlan1", "savePlan1-2");
			html1_2 = html1_2.replace("goPlan1", "goPlan1-2");

			html3_2 = html3;
			html3_2 = html3_2.replace("monthlyPremium3", "monthlyPremium3-2");
			html3_2 = html3_2.replace("returnMoney3", "returnMoney3-2");
			html3_2 = html3_2.replace("returnRatio3", "returnRatio3-2");
			html3_2 = html3_2.replace("savePlan3", "savePlan3-2");
			html3_2 = html3_2.replace("goPlan3", "goPlan3-2");

		}

		if (insuranceType == "5") {

			html1 = '<div class="box box-result1">' +
					'<h4 class="heading">' +
					'<span>맞춤 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium1">00</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_accident-top_list_1\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span>최대세액공제액</span></div>' +
					'<div class="data">' +
					'<strong><span id="taxCredit1">00,0</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span><em class="txt-c1">평생동안 매년</em> 수령하는 연금액</span></div>' +
					'<div class="data">' +
					'<strong><span id="annuityMoney1">0,000</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio1">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan1"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan1"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html3 = '<div class="box box-result3">' +
					'<h4 class="heading">' +
					'<span>추천 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium3">000</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan3" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_accident-top_list_2\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span>최대세액공제액</span></div>' +
					'<div class="data">' +
					'<strong><span id="taxCredit3">00,0</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span><em class="txt-c1">평생동안 매년</em> 수령하는 연금액</span></div>' +
					'<div class="data">' +
					'<strong><span id="annuityMoney3">00,000</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio3">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan3"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan3"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html1_2 = html1;
			html1_2 = html1_2.replace("monthlyPremium1", "monthlyPremium1-2");
			html1_2 = html1_2.replace("taxCredit1", "taxCredit1-2");
			html1_2 = html1_2.replace("annuityMoney1", "annuityMoney1-2");
			html1_2 = html1_2.replace("returnRatio1", "returnRatio1-2");
			html1_2 = html1_2.replace("savePlan1", "savePlan1-2");
			html1_2 = html1_2.replace("goPlan1", "goPlan1-2");

			html3_2 = html3;
			html3_2 = html3_2.replace("monthlyPremium3", "monthlyPremium3-2");
			html3_2 = html3_2.replace("taxCredit3", "taxCredit3-2");
			html3_2 = html3_2.replace("annuityMoney3", "annuityMoney3-2");
			html3_2 = html3_2.replace("returnRatio3", "returnRatio3-2");
			html3_2 = html3_2.replace("savePlan3", "savePlan3-2");
			html3_2 = html3_2.replace("goPlan3", "goPlan3-2");
		}

		if (insuranceType == "7") {

			html1 = '<div class="box box-result1">' +
					'<h4 class="heading">' +
					'<span>맞춤 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium1">00</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_annuity-top_list_1\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span><em class="txt-c1">평생동안 매년</em> 수령하는 연금액</span></div>' +
					'<div class="data">' +
					'<strong><span id="annuityMoney1">0,000</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio1">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan1"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan1"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html3 = '<div class="box box-result3">' +
					'<h4 class="heading">' +
					'<span>추천 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium3">000</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan3" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_iAnnuity-top_list_3\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span><em class="txt-c1">평생동안 매년</em> 수령하는 연금액</span></div>' +
					'<div class="data">' +
					'<strong><span id="annuityMoney3">00,000</span> 만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio3">000.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan3"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan3"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html1_2 = html1;
			html1_2 = html1_2.replace("monthlyPremium1", "monthlyPremium1-2");
			html1_2 = html1_2.replace("annuityMoney1", "annuityMoney1-2");
			html1_2 = html1_2.replace("returnRatio1", "returnRatio1-2");
			html1_2 = html1_2.replace("savePlan1", "savePlan1-2");
			html1_2 = html1_2.replace("goPlan1", "goPlan1-2");

			html3_2 = html3;
			html3_2 = html3_2.replace("monthlyPremium3", "monthlyPremium3-2");
			html3_2 = html3_2.replace("annuityMoney3", "annuityMoney3-2");
			html3_2 = html3_2.replace("returnRatio3", "returnRatio3-2");
			html3_2 = html3_2.replace("savePlan3", "savePlan3-2");
			html3_2 = html3_2.replace("goPlan3", "goPlan3-2");
		}
		
		if (insuranceType == "8") {

			html1 = '<div class="box box-result1">' +
					'<h4 class="heading">' +
					'<span>맞춤 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium1">0</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_Vsaving-top_list_1\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span><em id="returnPeriod1"></em>년 시점 환급금</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnMoney1">0</span> 원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio1">0.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan1"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan1"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';

			html3 = '<div class="box box-result3">' +
					'<h4 class="heading">' +
					'<span>추천 설계</span>' +
					'<strong>' +
					'<span>월</span>' +
					'<span id="monthlyPremium3">0</span> 만원' +
					'</strong>' +
					'<a href="#popProductCart" class="btn-save" id="savePlan3" onclick="ga(\'send\',\'event\',\'Direct\',\'Etc\',\'Check-info_Vsaving-top_list_3\',1);">설계저장</a>' +
					'</h4>' +
					'<div class="con">' +
					'<ul>' +
					'<li>' +
					'<div class="label"><span><em id="returnPeriod3"></em>년 시점 환급금</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnMoney3">0</span> 원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label"><span>환급률</span></div>' +
					'<div class="data">' +
					'<strong><span id="returnRatio3">0.0</span> %</strong>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'<div class="btn">' +
					//'<a href="#popProductCart" class="btn-c1" id="savePlan3"><span>설계저장</span></a>' +
					'<a href="#popSendEmail" class="btn-c1" onclick=\'clearMail("' + gv_productFullNm + '");\'><span>메일발송</span></a>' +
					'<a href="#none" class="btn-c2" id="goPlan3"><span>가입하기</span></a>' +
					'</div>' +
					'</div>' +
					'</div>';


			html1_2 = html1;
			html1_2 = html1_2.replace("monthlyPremium1", "monthlyPremium1-2");
			html1_2 = html1_2.replace("returnPeriod1", "returnPeriod1-2");
			html1_2 = html1_2.replace("returnMoney1", "returnMoney1-2");
			html1_2 = html1_2.replace("returnRatio1", "returnRatio1-2");
			html1_2 = html1_2.replace("savePlan1", "savePlan1-2");
			html1_2 = html1_2.replace("goPlan1", "goPlan1-2");

			html3_2 = html3;
			html3_2 = html3_2.replace("monthlyPremium3", "monthlyPremium3-2");
			html3_2 = html3_2.replace("returnPeriod3", "returnPeriod3-2");
			html3_2 = html3_2.replace("returnMoney3", "returnMoney3-2");
			html3_2 = html3_2.replace("returnRatio3", "returnRatio3-2");
			html3_2 = html3_2.replace("savePlan3", "savePlan3-2");
			html3_2 = html3_2.replace("goPlan3", "goPlan3-2");

		}

			var vacantHtml1 = '<div class="box box-result1 empty"></div>';
			var vacantHtml3 = '<div class="box box-result3 empty"></div>';

			var cnt = 0;
			var obj = $("#resultCalc").children();
			var obj2 = $("#resultCalc-2").children();

			for (var i = 0; i < data.length; i++) {
				if (typeof(data[i].inputObj) != "undefined") {
					cnt ++;
				}
			}

			switch (cnt) {
				case 1:
					$(obj[0]).replaceWith(vacantHtml1);
					$(obj[2]).replaceWith(vacantHtml3);

					$(obj2[0]).replaceWith(vacantHtml1);
					$(obj2[2]).replaceWith(vacantHtml3);
					break;
				case 2:
					$(obj[0]).replaceWith(vacantHtml1);
					$(obj[2]).replaceWith(html3);

					$(obj2[0]).replaceWith(vacantHtml1);
					$(obj2[2]).replaceWith(html3_2);
					break;
				case 3:
					$(obj[0]).replaceWith(html1);
					$(obj[2]).replaceWith(html3);

					$(obj2[0]).replaceWith(html1_2);
					$(obj2[2]).replaceWith(html3_2);
					break;
			}

			//$(obj[2]).addClass("on");
	}

/**
 * 청약페이지 이동 - 모든상품 공통
 * @param insuType
 * @param planType
 */
function goSubscribe(insuType, planIndex, calcType){
	setSkipPopupVariable(true);
	
	//암, 정기 상품의 자유설계(보험료 직접계산) 일 경우 체크
	if(insuType=='1' || insuType=='2'){

		//	자유계산일때
		if(planIndex=='1'){
			if($("#freeChgYn").val()=='Y'){
				alert("재계산 후 가입을 진행해주세요.");
				freePlan();
				return false;
			}
		}
	}
	
	// 변액 해지환급금, 환급률 쿠키저장
	if(insuType=='8'){
		
		var birthday = $("#birthday").val();
		
		if(!birthday){
			birthday = $("#directBirthday").val();
		}
		// 만나이
		/*
        var age = getFullAgeByYmd(birthday);
        var msg = '삼성생명 인터넷 변액적립보험(무배당)\n미성년자 대상 상품가입 시스템은 현재 준비 중입니다.\n\n';
		msg += '미성년자 가입시스템이 준비되는대로\n공지사항을 통해서 별도 안내드리겠습니다.';
        
        if(age < 19){
        	alert(msg);
        	return;
        }
        */
        
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
	
	// 브라우저 체크
	var browserMsg = "";
		browserMsg += "고객님, 불편을 드려 죄송합니다. \n\n";
		browserMsg += "삼성생명 다이렉트는\n";
		browserMsg += "Internet Explorer7,8,9, Firefox, Chrome, Safari, Opera\n";
		browserMsg += "에서 정상적인 이용이 가능합니다.\n";
		browserMsg += "사용하시는 브라우저를 확인해 주세요. ";

	//현업테스트 브라우저 테스트를 위한 주석 2014.07.23 이가희과장 요청(개발계만)
	/*if (checkBrowser() == "MSIE 7" || checkBrowser() == "MSIE 8" ||	checkBrowser() == "MSIE 9" ||
		checkBrowser() == "Firefox" || checkBrowser() == "Chrome" || checkBrowser() == "Safari" || checkBrowser() == "Opera"|| checkBrowser() == "Android Browser" ){
	}else{
		alert(browserMsg);
		return;
	}*/
		
	if (typeof(calcType) == "undefined") {
		var planSeq = $("#planSeq").val();
		
		if (typeof(planSeq) != "undefined") {
			if (planSeq =="" || planSeq == null){
				alert("간편설계 내용이 없습니다.");
				return;
			}
			if($("#chgYn").val() == "Y") {
				var btnNm = (insuType== '5' || insuType == '4' || insuType == '7')?'다시':'보험료 ';
				alert("고객정보가 변경되었습니다.\n\n ["+btnNm+"계산하기] 버튼을 클릭해 주시기 바랍니다.");
				$("#planApply").focus();
				return;
			}
		}
	}

	// 데스크탑이 아닌경우는 메일 레이어로 대체
	//if (checkMobile()) {
	//	alert('PC 환경에서 가능합니다.');
	//	return
	//} else {
	//}
	

	var postData ={"insuType" : insuType, "planType" : planIndex};

	jQuery.ajax({
		type : "POST",
		url : "/simplePlanSave.eds",
		data : JSON.stringify(postData),
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				if (checkMobile()) {
					location.href = "/m/stepGuide.eds";	// 청약페이지 이동
				}else{
					if(insuType=='8'){
						location.href = "/suitabilityInfo.eds";	// 변액 안내페이지 이동
					}else{
						//location.href = "/stepLogin.eds";	// 본인인증(공인인증서) 이동
						if(insuType=='49' || insuType=='50' || insuType=='51'){
							location.href = "/stepLoginComplex.eds";	// 본인인증(휴대폰+공인인증서) 이동
						}else{
							location.href = "/stepLogin.eds";	// 본인인증(공인인증서) 이동
						}
					}
				}
			} else {
					alert(result.message);
			}
		},
		error : function() {
		}
	});
}

function goSavePlanData(insuType, planIndex){
	// 레이어 창에 값전달
	$("#layerSaveType").val("session");
	$("#layerInsuType").val(insuType); 		// 상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금
	$("#layerPlanIndex").val(planIndex);	// 상품 선택 인덱스
	$("#layerPlanData").val("{}"); 			// 세션에서 데이터 가져오기
}

	/**
	 * 오브젝트 enable - 모든상품 공통
	 * @param obj
	 * @param enabled
	 */
	function enableObject(obj, enabled) {
		if (enabled) {
			obj.removeAttr("disabled");
		}
		else {
			obj.attr("disabled", "true");
		}
	}

	/**
	 * 계산된 결과 화면 - 모든상품 공통
	 * @param enabled
	 */
	function showResultDiv(enabled, callback) {
		if (enabled) {
//			$(".product-result").removeClass("none");
//			$(".product-other").removeClass("none");
//			$(".calculator-form2").addClass("none");
			
				ui.productResultShow(callback);
				$("#uiProductResult2").removeClass("none");
				$(".calculator-form2").addClass("none");
			
			$("#chgYn").val("N");
			
			// 온정 이벤트 임시
			$('#formCalculator').find('.temp-type').hide();
		}
		else {
//			$(".product-result").addClass("none");
//			$(".product-other").addClass("none");
//			$(".calculator-form2").removeClass("none");
			
				$("#uiProductResult1").hide();
				$("#uiProductResult2").addClass("none");
				$(".calculator-form2").removeClass("none");
			
			// 온정 이벤트 임시
			$('#formCalculator').find('.temp-type').show();
		}
	}

	/**
	 * 재계산하기 버튼 토글 - 모든상품 공통
	 * @param type
	 */
	function displayType(type) {

		var obj1 = $($("#reCalcPremium").parent());
		var obj2 = $($("#goPlan2").parent());

		switch (type) {
			case 1 :
				obj1.hide();
				obj2.show();
				break;
			case 2 :
				obj1.show();
				obj2.hide();
				break;
		}
	}

	/**
	 * 로딩 - 모든상품 공통
	 * @param enabled
	 */
	function showLoadingDialog(enabled) {
		if (enabled) {
			if (!popLoading.openCheck()) popLoading.openOutput();
		} else {
			if (popLoading.openCheck())	popLoading.closeOutput();
		}
	}

//	/**
//	 * 로딩 - 모든상품 공통
//	 * @param enabled
//	 */
//	function showDetalDialog(enabled) {
//		if (enabled) {
//			popDetail.openOutput();
//		} else {
//			popDetail.closeOutput();
//		}
//	}

//	/**
//	 * 로딩 - 모든상품 공통
//	 * @param enabled
//	 */
//	function showEMailDialog(enabled) {
//		if (enabled) {
//			popEMail.openOutput();
//		} else {
//			popEMail.closeOutput();
//		}
//	}

	function hideGraphAll() {
		$("#resultGraph1").hide();
		$("#resultGraph2").hide();
		$("#resultGraph3").hide();
		$("#resultGraph4").hide();
	}

	function showGraph(type, age, annuityAge, payPeriod) {

		hideGraphAll();

		var obj;

		if (type == "5" || type == "7") {

			var tmp = extractNumberOnly($("#napTerm option:selected").text());

			//	납입기간
			var nap = payPeriod == 99 ? parseInt(tmp) - parseInt(age) : payPeriod;
			//	거치기간
			var ger = annuityAge - (parseInt(age) + parseInt(nap));
//			var ger = annuityAge - parseInt(nap);

			if (parseInt(ger) == 0) {
				obj = $("#resultGraph4");
			} else if (parseInt(nap) < parseInt(ger)) {
				obj = $("#resultGraph1");
			} else if (parseInt(nap) > parseInt(ger)) {
				obj = $("#resultGraph2");
			} else if (parseInt(nap) == parseInt(ger)) {
				obj = $("#resultGraph3");
			}

			obj.find(".desc1").text(age + "세");
			obj.find(".desc2").text(parseInt(age) + parseInt(nap) + "세");
			obj.find(".desc3").text(annuityAge + "세");

			obj.find(".graphTitle1").text("납입기간 " + nap + "년");
			obj.find(".graphTitle2").text(annuityAge + " 세부터 매년 연금수령");
			obj.find(".graphTitle3").text("거치기간 " + ger + "년");

		} else if (type == "4" || type == "8") {
			
			var insuPeriod = annuityAge;
			/*switch (payPeriod) {
				case "3"  : obj = $("#resultGraph1"); break;
				case "5"  : obj = $("#resultGraph2"); break;
				case "7"  : obj = $("#resultGraph3"); break;
				case "10" : obj = $("#resultGraph4"); break;
				case "12" : obj = $("#resultGraph5"); break;
			}*/
			obj = $("#resultGraph5");

			obj.find(".desc1").text(age + "세");
			obj.find(".desc2").text(age + parseInt(payPeriod) + "세");
			obj.find(".desc3").text(parseInt(age) + parseInt(insuPeriod) + "세");
			obj.find(".desc4").text(parseInt(insuPeriod) + "년");
			
			if(payPeriod != insuPeriod){
				obj.find(".graphTitle1").text("납입기간 " + payPeriod + "년");
				obj.find(".graphTitle2").text("거치기간 " + (parseInt(insuPeriod)-parseInt(payPeriod)) + "년");
				obj.find("#graph1 > div.label ").show();
			}else{
				obj.find(".graphTitle1").text("납입기간 " + payPeriod + "년");
				obj.find(".graphTitle2").text("");
				obj.find("#graph1 > div.label ").hide();
			}
			/*if (payPeriod != "10") {
				obj.find(".graphTitle1").text("납입기간 " + payPeriod + "년");
				obj.find(".graphTitle2").text("거치기간 " + parseInt(10 - parseInt(payPeriod)) + "년");
			}*/
		}

		obj.show();
	}


/**
 * 가설결과 메일 발송
 */
function planSendMail(planSeq, email1, email2, custMemo, prdtType) {
	var f = $("#mailFrm")[0];
	f.fplanSeq.value = planSeq;
	f.femail1.value = email1;
	f.femail2.value = email2;
	f.fcustMemo.value = custMemo;
	f.fprdtType.value = prdtType;

	var jsonData = $("#mailFrm").serializeObject();

	$.ajax({
		type : "POST",
		url : "/planSendMail.eds",
		data : JSON.stringify(jsonData),
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				alert("메일을 발송하였습니다.");
				
				//어도비 메일발송 신청수(e25)
				adbSendPlanMail(f.fprdtType.value);
				if (f.sendType.value == "mail") {
					$("#closeMail").click();
				}
			} else {
				alert(result.message);
			}
		},
		error : function() {
			alert("error");
		}
	});
}

// 변액 해지환급금 조회
function getReturnDataByPeriod(idx){
	var returnData = null;
	
	if(lastSelectArrayData != null){
		var lastReturnDataArray;
		var yearPeriod;
		
		if($.isArray(lastSelectArrayData)){
			lastReturnDataArray = lastSelectArrayData[idx].nowRateArry;
			yearPeriod = lastSelectArrayData[idx].inputObj.payPeriod;
		}else{
			lastReturnDataArray = lastSelectArrayData.nowRateArry;
			yearPeriod = lastSelectArrayData.inputObj.payPeriod;
		}
		
		yearPeriod += '년';
	
		var startIdx = lastReturnDataArray.length / 3 * lastSelectRate;
		var endIdx = startIdx + lastReturnDataArray.length / 3;
		
		for(var i=startIdx; i<endIdx; i++){
			if(yearPeriod == lastReturnDataArray[i].totTerm){
				returnData = lastReturnDataArray[i];
				break;
			}
		};
	}
	
	return returnData;
};

/**
 * 가입설계 planSeq 로 재계산후 바로가입하기 함수
 * @param proType
 * @param planSeq
 */
function checkPlanSeqCalc(proType, planSeq) {

	$("#planSeq").val(planSeq);
	$("#chgYn").val("N");
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
			if(proType == "8"){
				lastSelectArrayData = result.arryData;
			}
			
			if (result.success) {
				goSubscribe(proType,"0");

			}
		},
		error : function() { alert("error"); }
	});
}

/**
 * 상품 가설에 필요한 기본값 세팅 함수
 * @param proType
 * @param age
 */
function setFormDefValue(proType, age){
	var insuPeriod = 0;		//보험기간
	var payPeriod = 0;		//납입기간
	var premium = 0;		//납입금액
	var annuityAge = 0;		//연금개시나이

	//암
	if(proType=="1"){
		insuPeriod = 15;
		payPeriod = 15;
	//정기
	}else if(proType=="2"){
		insuPeriod = 20;
		payPeriod = 20;
	//상해
	}else if(proType=="3"){
		insuPeriod = 20;
		payPeriod = 20;
	//저축
	}else if(proType=="4"){
		insuPeriod = 10;
		payPeriod = 5;
		premium = 50;
	//연금저축
	}else if(proType=="5"){
		if(age>=56 && age <=69){
			payPeriod = 10;
			annuityAge = age + 10;
		}else if(age>=70 && age<=75){
			payPeriod = 5;
			annuityAge = age + 5;
		}else{
			payPeriod = 10;
			annuityAge = 65;
		}
		premium = 34;
		$("#annuityAge").val(annuityAge);
	//연금
	}else if(proType=="7"){
		if(age>=51 && age <=65){
			payPeriod = 10;
			annuityAge = age + 15;
		}else{
			payPeriod = 10;
			annuityAge = 65;
		}
		premium = 30;
		$("#annuityAge").val(annuityAge);
	//변액적립
	}else if(proType=="8"){
		insuPeriod = 10;
		payPeriod = 5;
		premium = 30;
		//실손
	}else if(proType=="9"){
		insuPeriod = 1;
		payPeriod = 1;
	} else if (proType == "15") {		//	치아보험
		insuPeriod = 10;
		payPeriod = 10;
	}

	$("#insuPeriod").val(insuPeriod);
	$("#payPeriod").val(payPeriod);
	$("#premium").val(premium);
}

/**
 * 하단영역 계산하기 (메인과 동일)
 * @returns {Boolean}
 */
function defCalc(){
	var contBirth = $("#birthday2").val();
	var contGender =  ($("input[name=pgender2]:checked").val()=='undefined' || $("input[name=pgender2]:checked").val()==null) ? 1 : $("input[name=pgender2]:checked").val();
	$("#contBirth").val(contBirth);
	$("#contGender").val(contGender);
	$("#proType").val(insuranceType);

	// 값체크
	if (getInsuAgeByYmd(contBirth)> 0){
	}else{
		alert("생년월일을 올바르게 입력해주세요.");
		$("#birthday2").focus();
		$("#birthday2").val("");
		return;
	}
	if (!chkDate(contBirth)) {
		alert("생년월일을 올바르게 입력해주세요.");
		$('#birthday2').focus();
		$("#birthday2").val("");
		return;
	}

	if (contGender == null || contGender ==""){
		alert("성별을 선택해주세요");
		return;
	}
    var age = getInsuAgeByYmd(jQuery("#birthday2").val());
	if(age != "") {
		if ((age >= Number($staAge)) && (age <= Number($endAge))){}else{
	    	if (!chkDate(jQuery("#birthday2").val())) {
	    		alert("생년월일을 올바르게 입력해주세요.");
	    		$('#birthday2').focus();
	    		$("#birthday2").val("");
	    		return false;
	    	}
    		alert("고객님의 보험가입 나이는 "+age+"세 입니다. \n\보험가입은 "+Number($staAge)+"세 이상 "+Number($endAge)+"세 이하만 가능합니다. ");
    		return;
		}
	}

	setFormDefValue(insuranceType, age);

	var gaType = "";

	if(insuranceType=="1"){	gaType = "cancer";				//암
	}else if(insuranceType=="2"){ gaType = "term";			//정기
	}else if(insuranceType=="3"){ gaType = "accident";		//상해
	}else if(insuranceType=="4"){ gaType = "esaving";		//저축
	}else if(insuranceType=="5"){ gaType = "annuity";		//연금저축
	}else if(insuranceType=="7"){ gaType = "iAnnuity";		//연금
	}else if(insuranceType=="8"){ gaType = "variablesaving";		//변액적립
	}else if(insuranceType=="9" || insuranceType=="10" || insuranceType=="11" || insuranceType=="12"
		||insuranceType=="13"||insuranceType=="14"){ gaType = "medical";		//실손	
	} else if (insuranceType=="15") {
		gaType = "dental";
	}
	
	ga('send','event','Direct','Calculation',gaType+'_bottom',1);
	
	//	계산기 wiselog
	calc_logging("productBottom_" + gaType);
	
	setCalculatorEvent();
	
	var jsonData = JSON.stringify($("#frm").serializeObject());
	$.cookie("mainPlanData",jsonData ,{path:'/'});
	location.href = getPlanUrl(insuranceType); // 페이지 이동
}

// 상품상세 Tab4 눌렀을경우 UI 핸들링
function faqTabUi(){
}

function setCalcLog(){
	var insuName = '';
	
	if(insuranceType=="1"){	insuName = "cancer";				//암
	}else if(insuranceType=="2"){ insuName = "term";				//정기
	}else if(insuranceType=="3"){ insuName = "accident";		//상해
	}else if(insuranceType=="4"){ insuName = "esaving";			//저축
	}else if(insuranceType=="5"){ insuName = "annuity";			//연금저축
	}else if(insuranceType=="7"){ insuName = "iAnnuity";		//연금
	}else if(insuranceType=="8"){ insuName = "variableSaving";	//변액적립
	}else if(insuranceType=="9"){ insuName = "medical";			//실손
	}else if(insuranceType=="15"){ insuName = "dental";			//치아
	}else if(insuranceType=="49"){ insuName = "pAccident49";	//제휴상해1종
	}else if(insuranceType=="50"){ insuName = "pAccident50";	//제휴상해2종
	}else if(insuranceType=="51"){ insuName = "pAccident51";	//제휴상해3종
	}else if(insuranceType=="60"){ insuName = "groupAnnuity60";	//회사지원1
	}else if(insuranceType=="61"){ insuName = "groupAnnuity61";	//회사지원2
	}else if(insuranceType=="62"){ insuName = "groupAnnuity62";	//회사지원3
	}
	
	insertLog('rt', insuName);
}

function sendPromotionCallback(step){
	if(!step){
		step = '1';
	}
	
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


function setDefSelectBox() {
	
	var selectedInsuList = "9|11|13|16";
	var selectedInsuArr = selectedInsuList.split("|");
	//주보험 세팅
	var selji = "selji"; //질병입원
	var seljt = "seljt"; //질병통원
	var selsi = "selsi"; //상해입원
	var selst = "selst"; //상해통원

	// -999
	$("#"+selji).val("-999");
	$("#"+seljt).val("-999");
	$("#"+selsi).val("-999");
	$("#"+selst).val("-999");	
	
	for(var i=0; i<selectedInsuArr.length; i++){
		var defInsuType = selectedInsuArr[i];
		if( defInsuType == '9' || defInsuType == '10' ){
			$("#"+selji).val(defInsuType);
		} else if( defInsuType == '11' || defInsuType == '12' ){
			$("#"+seljt).val(defInsuType);
		} else if( defInsuType == '13' || defInsuType == '14' ){
			$("#"+selsi).val(defInsuType);
		} else if( defInsuType == '16' || defInsuType == '17' ){
			$("#"+selst).val(defInsuType);
		}
	}

}

function setMedicalInsuCondition(result) {
	
	
	/*
		9="R024501ANNNAD01" //질병입원형 표준
		10="R024501ANNNAD09" //질병입원형 선택
		11="R024501ANNNAD03" //질병통원형 표준
		12="R024501ANNNAD10" //질병통원형 선택
		13="R024501ANNNAD05" //상해입원형 표준
		14="R024501ANNNAD11" //상해입원형 선택
		16="R024501ANNNAD07" //상해통원형 표준
		17="R024501ANNNAD12" //상해통원형 선택
	*/
	//실손상품개정 by syi

	
	//주보험 세팅
	var selji = "selji"; //질병입원
	var seljt = "seljt"; //질병통원
	var selsi = "selsi"; //상해입원
	var selst = "selst"; //상해통원

	// -999
	$("#"+selji).val("-999");
	$("#"+seljt).val("-999");
	$("#"+selsi).val("-999");
	$("#"+selst).val("-999");	
	
	
	if( typeof(result.data.selectedInsuList) !== "undefined" && "" != result.data.selectedInsuList ){
		var selTempInsuStr = result.data.selectedInsuList;
		var selTempInsuArr = selTempInsuStr.split("|");
		
		//setFormWithMainInsuPrdt(selTempInsuArr[0]);
		
		for( var i=0; i<selTempInsuArr.length; i++ ){
			var selVal = selTempInsuArr[i];
			if( selVal == '9' || selVal == '10' ){
				$("#"+selji).val(selVal);
			} else if( selVal == '11' || selVal == '12' ){
				$("#"+seljt).val(selVal);
			} else if( selVal == '13' || selVal == '14' ){
				$("#"+selsi).val(selVal);
			} else if( selVal == '16' || selVal == '17' ){
				$("#"+selst).val(selVal);
			}
		}
	} else {
		if( insuranceType == '9' || insuranceType == '10' ){
			$("#"+selji).val(insuranceType);
		} else if( insuranceType == '11' || insuranceType == '12' ){
			$("#"+seljt).val(insuranceType);
		} else if( insuranceType == '13' || insuranceType == '14' ){
			$("#"+selsi).val(insuranceType);
		} else if( insuranceType == '16' || insuranceType == '17' ){
			$("#"+selst).val(insuranceType);
		}
	}
	
	var selectedProductType = getSelectedInsuList();
	var selectedArr = selectedProductType.split("|");
	var isYearPay = true;
	//연납, 월납 판단
	for( var i=0; i<selectedArr.length; i++ ){
		var selectedProdId = selectedArr[i];
		if( selectedProdId == "-999" ){
			continue;
		} else {
			if( selectedProdId == "9" || selectedProdId == "10" || selectedProdId == "11" || selectedProdId == "12" ){
				isYearPay = false;
				break;
			}
		}
	}
	

	if( isYearPay ){
		$('span[id^=monthlyPremium1]').prev().text('연납');
	} else {
		$('span[id^=monthlyPremium1]').prev().text('월납');
	}
	
	//특약 세팅 start
	if( typeof(result.data.treatyList) !== "undefined" && "" != result.data.treatyList ){
		var beforeTreatyArr = result.data.treatyList.split("&");
		
		var selectedInsuArr = new Array();

		for(var i=0; i<beforeTreatyArr.length; i++){
			if (beforeTreatyArr[i] != "R017901ANNNNNNN" && beforeTreatyArr[i] != "R018001ANNNNNNN" && beforeTreatyArr[i] != "R018101ANNNNNNN") {
				var selectedInsuStr = ""; 
				if(beforeTreatyArr[i] == "R024501ANNNAD01"){
					selectedInsuStr = "9";
					$("#"+selji).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD09"){
					selectedInsuStr = "10";
					$("#"+selji).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD03"){
					selectedInsuStr = "11";
					$("#"+seljt).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD10"){
					selectedInsuStr = "12";
					$("#"+seljt).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD05"){
					selectedInsuStr = "13";
					$("#"+selsi).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD11"){
					selectedInsuStr = "14";
					$("#"+selsi).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD07"){
					selectedInsuStr = "16";
					$("#"+selst).val(selectedInsuStr);
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD12"){
					selectedInsuStr = "17";
					$("#"+selst).val(selectedInsuStr);
				}

				selectedInsuArr.push(selectedInsuStr);
			}
		}	
	}

}

function setFormWithMainInsuPrdt(mainInsuType){
	var insuObj = {};
	insuObj.proType = mainInsuType;
		
	var jsonObj = {};
	jsonObj.parameters = insuObj;
	
	var jsonInput = JSON.stringify(jsonObj);
	
	showLoadingDialog(true);
	
	$.ajax({
		type : "POST",
		url : "/getMedicalProInfo.eds",
		data : jsonInput,
		dataType : 'json',
		async: true,
		success : function(result) {
			if (result.success) {
				$staAge = result.product.staAge;
				$endAge = result.product.endAge;
				insuranceType = result.product.proType;
				
				var frm1 = $("#frm")[0];
				
				frm1.proType.value =  result.product.proType;
				frm1.prcdId.value = result.product.id;
				frm1.prcd.value = result.product.pcode;
				frm1.prdtVcd.value = result.product.pvcode;
				frm1.insCd.value = result.product.icode;
				frm1.insrVcd.value = result.product.pvcode;
				frm1.repCd.value = result.product.slpcode;
				frm1.prdtnm.value = result.product.fullNm;
				
				var mailFrm = $("#mailFrm")[0];
				mailFrm.fprdtnm.value = result.product.fullNm;
				
				//$("#mailFrm").val(result.product.fullNm);
				
				//fn_getInsuData();
				
			} else {
				alert(result.message);
			}
			paramUsed = false;
		},
		beforeSend : function() {},		
			complete : function() {
				showLoadingDialog(false);
			},		
		error : function() {} 
	});
}	

	function genMedicalSelBoxInsuListStr( prdtType, treatyList ){
		
		var beforeTreatyArr = treatyList.split("&");
		var selectedInsuArr = new Array();
		var returnStr = "";
		selectedInsuArr.push(prdtType);
		
		for(var i=0; i<beforeTreatyArr.length; i++){
			if (beforeTreatyArr[i] != "R017901ANNNNNNN" && beforeTreatyArr[i] != "R018001ANNNNNNN" && beforeTreatyArr[i] != "R018101ANNNNNNN") {
				var selectedInsuStr = ""; 
				if(beforeTreatyArr[i] == "R024501ANNNAD01"){
					selectedInsuStr = "9";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD09"){
					selectedInsuStr = "10";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD03"){
					selectedInsuStr = "11";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD10"){
					selectedInsuStr = "12";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD05"){
					selectedInsuStr = "13";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD11"){
					selectedInsuStr = "14";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD07"){
					selectedInsuStr = "16";
				}
				else if(beforeTreatyArr[i] == "R024501ANNNAD12"){
					selectedInsuStr = "17";
				}
				selectedInsuArr.push(selectedInsuStr);
			}
		}
		
		for( var i=0; i<selectedInsuArr.length; i++ ){
			if( i==0 ){
				returnStr = selectedInsuArr[i];
			} else {
				returnStr += "|" + selectedInsuArr[i];
			}
		}
		
		return returnStr;
	}
	
	function fn_printEntire(){
		window.print();
	}
	
	function fn_linkPromotionProd(obj){
		var browserUrlStr = window.location.href;
		var splStr = $(obj).attr("hrefStr").split("?")[1];
		location.href = $(obj).attr("hrefStr") + browserUrlStr.split(splStr)[1];
		//#productTab2
	}