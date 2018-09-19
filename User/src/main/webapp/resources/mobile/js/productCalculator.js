
	var calculatorForm;
	var calculatorScope;
	
	var calculatorToDate = ""; 
	var calculatorSlpcode = "";
	var calculatorStaAge = "";
	var calculatorEndAge = "";
	
	var savePlanData = null;
	
	var pmtCallbackFrm;
	
	//	저축 납입금액 최소값
	var calculatorEsavingMinimumValue = 5;
	//	변액 납입금액 최소값
	var directVariableSavingMinimumValue = 5;
	//	변액 납입금액 최대값
	var directVariableSavingMaximumValue = 10000;
	
	//	재계산시에 필요
	var prevVal;
	var nextVal;
	
	function setInsuranceInfo() {
		if ($("#birthday").val() != "") {
			switch (insuranceType) {
				case M_PRODUCT_CANCER:
				case M_PRODUCT_TERM:
				case M_PRODUCT_ACCIDENT:
				case M_PRODUCT_ESAVING:
				case M_PRODUCT_VARIABLESAVING:
				case M_PRODUCT_P_ACCIDENT1:	
				case M_PRODUCT_P_ACCIDENT2:
				case M_PRODUCT_P_ACCIDENT3:
				case M_PRODUCT_MEDICAL_A1:
				case M_PRODUCT_MEDICAL_A2:
				case M_PRODUCT_MEDICAL_B1:
				case M_PRODUCT_MEDICAL_B2:
				case M_PRODUCT_MEDICAL_C1:
				case M_PRODUCT_MEDICAL_C2:
				case M_PRODUCT_MEDICAL_D1:
				case M_PRODUCT_MEDICAL_D2:
					getPeriodFromPF(insuranceType, calculatorCBInsTerm);
					break;
				case M_PRODUCT_ANNUITY:
				case M_PRODUCT_IANNUITY:
					getPeriodFromPF(insuranceType, calculatorCBAnnAge, "");
					break;
			}
		}
	}
	
	function initCalculator(type) {
		calculatorToDate = ""; 
		calculatorSlpcode = "";
		calculatorStaAge = "";
		calculatorEndAge = "";
		
		$("#birthday").val("");
		$("#annAge").html('<option value="">연금개시나이 선택</option>');
		if (type != M_PRODUCT_DENTAL) {
			$("#insTerm").html('<option value="">보험기간 선택</option>');
			$("#napTerm").html('<option value="">납입기간 선택</option>');
		}
		$("#napMoney1").val("");
		$("#napMoney2").val("");
		
		var $calcItemList = $('#stepList');
		
		/*
		0 : 성별 
		1 : 생년월일
		
		2 : 보험기간
		8->3 : 저축 라디오 보험기간
		3->4 : 연금개시나이
		4->5 : 납입기간
		9->6 : 저축 라디오 납입기간
		5->7 : 납입금액1 - 연금, 연금저축
		6->8 : 납입금액2 - 저축
		
		7->9 : 실손 의료수급권자여부
		

		*/
		
		if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM || type == M_PRODUCT_ACCIDENT ||
				type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3) {
			$calcItemList.children().eq(2).removeClass('none');
			$calcItemList.children().eq(5).removeClass('none');
		} else if (type == M_PRODUCT_ANNUITY) {
			$calcItemList.children().eq(4).removeClass('none');
			$calcItemList.children().eq(5).removeClass('none');
			$calcItemList.children().eq(7).removeClass('none');
		} else if (type == M_PRODUCT_IANNUITY) {
			$calcItemList.children().eq(4).removeClass('none');
			$calcItemList.children().eq(5).removeClass('none');
			$calcItemList.children().eq(7).removeClass('none');
			$("#napMoney1").prop("placeholder", "10만원 이상");
		} else if (type == M_PRODUCT_VARIABLESAVING) {
			$calcItemList.children().eq(2).removeClass('none');
			$calcItemList.children().eq(5).removeClass('none');
			$calcItemList.children().eq(8).removeClass('none');
		} else if (type == M_PRODUCT_ESAVING){
			$calcItemList.children().eq(3).removeClass('none');
			$calcItemList.children().eq(6).removeClass('none');
			$calcItemList.children().eq(8).removeClass('none');
		}else if (type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
				type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
				type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
				type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) {
			$calcItemList.children().eq(9).removeClass('none');
		}else if (type == M_PRODUCT_DENTAL){
			$calcItemList.children().eq(2).removeClass('none');
			$calcItemList.children().eq(5).removeClass('none');
		}
		
		getInsuranceInfo(type);
	}
	
	function getInsuranceInfo(type) {
		var jsonData = '{"insuranceType":"' + type + '"}';

		$.ajax({
			type : "POST",
			url : "/m/planCalculator.eds",
			data : jsonData,
			dataType : 'json',
			async : false,
			success : function(result) {
				if (result.success) {
					calculatorForm = new Object();
					calculatorForm.proType = result.product.proType;
					calculatorForm.prcdId = result.product.id;
					calculatorForm.prcd = result.product.pcode;
					calculatorForm.prdtVcd = result.product.pvcode;
					calculatorForm.insCd = result.product.icode;
					calculatorForm.insrVcd = type == M_PRODUCT_CANCER ? result.product.pvcode : "001";
					calculatorForm.repCd = result.product.slpcode;
					calculatorForm.prdtnm = result.product.fullNm;
					calculatorForm.contName = "고객님";
					calculatorForm.contBirth = "";
					calculatorForm.contGender = "";
					calculatorForm.insuPeriod = "";
					calculatorForm.payMethod = "";
					calculatorForm.payPeriod = "";
					calculatorForm.premium = "";
					calculatorForm.planSeq = "";

					calculatorToDate = result.toDate; 
					calculatorSlpcode = result.product.slpcode;
					calculatorStaAge = result.product.staAge;
					calculatorEndAge = result.product.endAge;
				} else {
					alert(result.message);
				}
			},
			error : function() {
				alert("error");
			} 
		});
	}
	
	function getPeriodFromPF(type, callback, annAge) {
		var birth = $("#birthday").val();
		var gender = $("input[name=pgender]:checked").val();
		
		if(typeof gender == 'undefined' && type == M_PRODUCT_ESAVING){
			gender = '1';
		}
		
		if (birth.length < 8) { return; }
		
		if (type == M_PRODUCT_ESAVING) {
			var age = parseInt(getInsuAgeByYmd(birth));
			var staAge = 20;
			var fEndAge = 65;
			var mEndAge = 60;
			
			switch (gender) {
				case "1" :
					if ((getInsuAgeByYmd(birth) > mEndAge) || (getInsuAgeByYmd(birth) < staAge)) {
						alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ mEndAge + "세 입니다.");
						$("#birthday").focus();
			    		$("#birthday").val("");
						return;
					}
					break;
				case "2" :
					if ((getInsuAgeByYmd(birth) > fEndAge) || (getInsuAgeByYmd(birth) < staAge)) {
						alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ fEndAge + "세 입니다.");
						$("#birthday").focus();
			    		$("#birthday").val("");
						return;
					}
					break;
			}
		} else {
			if (!calculatorValidateCustAge($("#birthday"), calculatorStaAge, calculatorEndAge)) {
				return; 
			}
		}
		
		var jsonData;
		
		if (type ==M_PRODUCT_ANNUITY || type == M_PRODUCT_IANNUITY) {
			jsonData = getPFJsonData2(type, calculatorToDate, calculatorSlpcode, birth, gender, annAge);
		} else {
			jsonData = getPFJsonData2(type, calculatorToDate, calculatorSlpcode, birth, gender);
		}
		selPrdtCdInfoByPrcd(jsonData, callback);
	}
	
	function calculatorValidateCustAge(birthObj, staAge, endAge) {
		var result = true;
		var msg = "";
		// 생년월일
		
		if (!chkDate(birthObj.val())) {
			alert("생년월일을 올바르게 입력해주세요.");
    		result = false;
		} else {
			var age = getInsuAgeByYmd(birthObj.val());
			
			// 연금저축은 만나이 기준
			if(insuranceType == '5'){
				age = getFullAgeByYmd(birthObj.val());
			}
			
			if ( (age < staAge) || (age > endAge) ) {
				
				//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5:연금저축, 7 :연금, 8 : 변액적립, 50: 제휴상해
				switch (insuranceType) {
					case "1" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷암보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "2" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷정기보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "3" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷상해보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "4" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "5" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금저축보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "7" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "8" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷변액적립보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "50" :
						msg = "고객님은 " + age + "세 입니다. \n\n제휴상해보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
					case "51" :
						msg = "고객님은 " + age + "세 입니다. \n\n제휴상해보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
					case "9" :
					case "10" :
					case "11" :
					case "12" :
					case "13" :
					case "14" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷실손의료비보장보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case "15" :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷치아보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
				}
				
				alert(msg);
        		result = false;
			}
		}
		
		if (!result) {
			birthObj.focus();
			birthObj.val("");
		}
		
		return result;
	}
	
	function calculatorMakeNapTerm(type) {
		// 선택한 보험기간 값
		var insValue = $("#insTerm").val();
		
		if (insValue != '') {
			var calcCookieData = typeof $.cookie("resultCalcData") !== 'undefined' ? $.parseJSON($.cookie("resultCalcData")) : $.cookie("resultCalcData");
			
			// 납입기간 배열가져오기
			var napTermArray = [];
			$.each(pIPadPrdListElemVO, function(index,value){
				// 선택한 보험기간과 같은 배열만 가져온다.
				if (value.insrPrdTypVal == insValue){
					napTermArray.push(value);
				}
			});
			
			// 납입기간 셀렉트 박스 Make
			var napHtml = '';
			$("#napTerm").empty();
			
			if (type == M_PRODUCT_CANCER || type == M_PRODUCT_ACCIDENT || type == M_PRODUCT_ESAVING || type == M_PRODUCT_DENTAL
					|| type == M_PRODUCT_VARIABLESAVING || type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3) {
				
				if (napTermArray.length != 0) {
					
					//저축보험일 경우 납입기간 라디오 disable 세팅
					if(type == M_PRODUCT_ESAVING){
						esavingDisableRadioNapTerm(napTermArray);
					}
					
					$.each(napTermArray, function(index, value){
						
						//납입기간 고정
						if (type == M_PRODUCT_CANCER || type == M_PRODUCT_DENTAL) {
							napHtml += '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
						} else if (type == M_PRODUCT_ACCIDENT || type == M_PRODUCT_ESAVING || type == M_PRODUCT_VARIABLESAVING 
								|| type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3) {
							
							var padPrdTypVal = '';
							
							if(value.padPrdTypVal != "0"){
								padPrdTypVal = value.padPrdTypVal;
							}
							
							napHtml = '<option value="' + value.padPrdTypVal + '">납입기간 : ' + padPrdTypVal + value.padPrdTypCdNm + '</option>';
						}
						
						if (index == 0) {
							$("#napTerm").append(napHtml);
						} else {
							var isExist = false;
							$('#napTerm').children().each(function() {
								//	option
								if ($(this).val() == value.padPrdTypVal) {
									isExist = true;
								}
							});
							
							if (!isExist) { $('#napTerm').append(napHtml); }
						}
					});						
				} else {
					napHtml = "<option>납입기간 선택</option>";
					$("#napTerm").html(napHtml);
				}
				
				if ($("#napTerm").children().size() == 1) {
					$("#napTerm").attr("disabled", true);
					setActiveInput($("#napTerm"), false, true);
					if (insuranceType == M_PRODUCT_CANCER) {
						$('#napTerm').find('option:selected').text($('#napTerm').text()+'(고정)');
					}
				}else{
					if(typeof calcCookieData !== 'undefined' && calcCookieData.payPeriod !== '' && calcCookieData.proType === insuranceType){
						var tempNapTerm = calcCookieData.payPeriod;
						
						if(tempNapTerm == 99){
							tempNapTerm = calcCookieData.insuPeriod;
						}
						
						if( type == M_PRODUCT_ESAVING ){	//저축일때
							var isNap5option = $("#napTerm option[value=" + tempNapTerm + "]").length;
							if( isNap5option == 0 ){
								var firstOptionVal = $("#napTerm").children().val();
								$("#napTerm").val(firstOptionVal);
							} else {
								$("#napTerm").val(tempNapTerm);
							}
						} else {
							$("#napTerm").val(tempNapTerm);
						}
						
						
					}
					
					$("#napTerm").attr("disabled", false);
					setActiveInput($("#napTerm"), true);
				}
				
			} else if (type == M_PRODUCT_TERM) {
				
				if (napTermArray.length != 0) {
					$.each(napTermArray, function(index, value){
						napHtml += '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
					});
				} else {
					napHtml = "<option>납입기간 선택</option>";
				}
				$("#napTerm").html(napHtml);
				
				if(typeof calcCookieData !== 'undefined' && calcCookieData.payPeriod !== '' && calcCookieData.proType == insuranceType){
					var tempNapTerm = calcCookieData.payPeriod;
					
					if(tempNapTerm == 99){
						tempNapTerm = calcCookieData.insuPeriod;
					}
					
					$("#napTerm").val(tempNapTerm);
				}else{
					$("#napTerm").val("10");
				}
				
				setActiveInput($("#napTerm"), true);
			}
			
			var matchCnt = 0;
			
			if(typeof calcCookieData !== 'undefined'){
				$('#napTerm').find('option').each(function(){
					if($(this).val() == calcCookieData.payPeriod){
						matchCnt++;
					}
				});
			}

			//	default set
			if(typeof calcCookieData === 'undefined' || calcCookieData.proType !== type || calcCookieData.payPeriod === '' || matchCnt === 0){
				var arrTerm = new Array();
				$("#napTerm").find('option').each(function(){
					arrTerm.push($(this).val());
				});
				
				switch (type) {
					case M_PRODUCT_TERM:
						if ($("#insTerm").val() == "20") {
							if($.inArray('20', arrTerm) > -1){
								$("#napTerm").val("20");
							}
						}
						
						break;
					case M_PRODUCT_ACCIDENT:
						if($.inArray('20', arrTerm) > -1){
							$("#napTerm").val("20");
						}
						
						break;
					case M_PRODUCT_ESAVING:
					case M_PRODUCT_VARIABLESAVING:
						if($.inArray('5', arrTerm) > -1){
							$("#napTerm").val("5");
						}
						
						break;
				}
			}
			
			setActiveInput($("#napMoney1:visible, #napMoney2:visible"), true);
			if($('#napMoney1').is(':visible') || $('#napMoney2').is(':visible')){
				$gv_msgCalculator.text('매월 얼마를 납입하시겠어요?');
			}
			
			$("#napTerm").change();
		}
	}
	
	function calculatorCBInsTerm() {
		var insTermArrayIdx = [];		// 보험기간 배열 인덱스
		var insTermArray = [];			// 보험기간 배열
		
		$.each(pIPadPrdListElemVO, function(index, value){
			if ($.inArray(value.insrPrdTypVal, insTermArrayIdx) === -1){
				insTermArrayIdx.push(value.insrPrdTypVal);
				insTermArray.push(value);
			}
		});
		
		// 보험기간 셀렉트 박스 Make
		var insHtml = "";
		
		if (insTermArray.length != 0 && insTermArray[0].msgCd != "ERROR1") {
			$.each(insTermArray, function(index, value) {
				var valTxt = (value.insrPrdTypCd =='01') ? '년' : '세';
				var valInsrPrd = value.insrPrdTypVal;
				
				if(value.insrPrdTypVal == '999'){
					valInsrPrd = '종신';
					valTxt = '';
				}
				
				var strSelected = '';
				
				if(typeof gv_insTerm != 'undefined' && gv_insTerm == value.insrPrdTypVal){
					strSelected = 'selected="selected"';
				}
				
				insHtml += '<option value="' + value.insrPrdTypVal + '" ' + strSelected + '>보험기간 : ' + valInsrPrd+valTxt + '</option>';
			});
		} else {
			insHtml = "<option>보험기간 선택</option>";							
		}
		
		$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		
		if(insuranceType == M_PRODUCT_ESAVING){
				$("#insTerm").val("10");
				$("#insTerm").change();
		}
		
		
		if (insTermArray.length == 1 || insuranceType == M_PRODUCT_P_ACCIDENT1 || insuranceType == M_PRODUCT_P_ACCIDENT2 || insuranceType == M_PRODUCT_P_ACCIDENT3) {
			$("#insTerm").attr("disabled", true);
		}

		var calcCookieData = typeof $.cookie("resultCalcData") !== 'undefined' ? $.parseJSON($.cookie("resultCalcData")) : $.cookie("resultCalcData");
		
		if(typeof calcCookieData !== 'undefined' && calcCookieData.insuPeriod !== '' && calcCookieData.proType === insuranceType){
			$("#insTerm").val(calcCookieData.insuPeriod);
		}else{
			if (insuranceType == M_PRODUCT_TERM) {
				$('#insTerm').val("20");
			}
		}
		
		if (insTermArray.length == 1 && (insuranceType == M_PRODUCT_ESAVING || insuranceType == M_PRODUCT_VARIABLESAVING ||
				insuranceType == M_PRODUCT_CANCER || insuranceType == M_PRODUCT_ACCIDENT)) {
			$('#insTerm').find('option:selected').text($('#insTerm').text()+'(고정)');
			
			setActiveInput($("#insTerm"), false, true);
		}else{
			setActiveInput($("#insTerm"), true);
		}
		
		$("#insTerm").change(); 
	}
	
	function calculatorCBAnnAge() {
		var insTermArrayIdx = [];		// 보험기간 배열 인덱스
		var insTermArray = [];			// 보험기간 배열
		$.each(pIPadPrdListElemVO, function(index, value){
			if ($.inArray(value.insrPrdTypVal, insTermArrayIdx) === -1){
				insTermArrayIdx.push(value.insrPrdTypVal);
				insTermArray.push(value);
			}
		});
		
		// 보험기간 셀렉트 박스 Make
		var insHtml = "";
		if (insTermArray.length != 0 && insTermArray[0].msgCd != "ERROR1") {
			$.each(insTermArray, function(index, value) {
				var valTxt = (value.insrPrdTypCd =='01') ? '년' : '세';
				
				//	pIMnInsrEntStndInfoPrtVO.anutBgnEndPsbAge : 80, 연금개시 맥스값
				for (var i = value.insrPrdTypVal; i <= pIMnInsrEntStndInfoPrtVO.anutBgnEndPsbAge; i++) {
					insHtml +='<option value="' + i + '">연금개시나이 : ' + i + valTxt + '</option>';
				}
			});
		} else {
			insHtml = "<option>연금개시나이 선택</option>";							
		}
		
		setActiveInput($("#annAge"), true);		
		
		$("#annAge").html(insHtml);	// 보험기간 HTML 세팅
		
		var calcCookieData = typeof $.cookie("resultCalcData") !== 'undefined' ? $.parseJSON($.cookie("resultCalcData")) : $.cookie("resultCalcData");
		
		if(typeof calcCookieData !== 'undefined' && calcCookieData.annuityAge !== '' && calcCookieData.proType === insuranceType){
			$("#annAge").val(calcCookieData.annuityAge);
		}else{
			$('#annAge').val("65");		//	defualt set
		}
		
		$('#annAge').change(); 		// 이벤트발생
	}
	
	function calculatorCBNapTerm() {
		var annAgeVal = $("#annAge").val();
		$("#napTerm").empty();
		
		var napTermArray = [];
		$.each(pIPadPrdListElemVO, function(index, value){
			// 선택한 보험기간과 같은 배열만 가져온다.
			if (value.insrPrdTypVal == annAgeVal){
				napTermArray.push(value);
			}
		});
		
		// 납입기간 셀렉트 박스 Make
		var napHtml = '';
		var shiftVal = "";
		$.each(napTermArray, function(index, value) {
			if (value.padPrdTypCd == "02") {
			//if (value.padPrdTypVal > 20) {
				shiftVal = "99";
			} else {
				shiftVal = value.padPrdTypVal;
			}
			napHtml += '<option value="' + shiftVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
		});	
		$("#napTerm").html(napHtml);
		
		var calcCookieData = typeof $.cookie("resultCalcData") !== 'undefined' ? $.parseJSON($.cookie("resultCalcData")) : $.cookie("resultCalcData");
		
		if(typeof calcCookieData !== 'undefined' && calcCookieData.proType == insuranceType){
			var tempNapTerm = calcCookieData.payPeriod;
			
			if(insuranceType == M_PRODUCT_TERM && tempNapTerm == 99){
				tempNapTerm = calcCookieData.insuPeriod;
			}
			$("#napTerm").val(tempNapTerm);
		}else{
			$("#napTerm").val("10");
		}
	
		setActiveInput($("#napTerm"), true);
		setActiveInput($("#napMoney1:visible, #napMoney2:visible"), true);
		if($('#napMoney1').is(':visible') || $('#napMoney2').is(':visible')){
			$gv_msgCalculator.text('매월 얼마를 납입하시겠어요?');
		}
		calculatorSetMoneyScope();
		
		if( insuranceType == M_PRODUCT_IANNUITY ){
			fnCalcBonusAmount();
		}
	}
	
	function calculatorSetMoneyScope() {
		var insTerm = $("#insTerm").val() == "" ? calculatorForm.insuPeriod : $("#insTerm").val();
		var napTerm = $("#napTerm").val() == "" ? calculatorForm.payPeriod : $("#napTerm").val();
		var birth = $("#birthday").val() == "" ? calculatorForm.contBirth : $("#birthday").val();  
		var fullAge = getFullAgeByYmd(birth);
		var age = getInsuAgeByYmd(birth);
		var annuityAge = $("#annAge").val() == "" ? calculatorForm.annuityAge : $("#annAge").val();
		var gender = $("input[name=pgender]:checked").val() == "" ? calculatorForm.contBirth : $("input[name=pgender]:checked").val();
		
		if (insuranceType == M_PRODUCT_ANNUITY) {
			calculatorScope = calculatorAnnuityGetInsuScope(napTerm, fullAge, age, annuityAge);
		}

		if (insuranceType == M_PRODUCT_IANNUITY) {
			calculatorScope = calculatorIannuityGetInsuScope(age);
		}
		
		if (insuranceType == M_PRODUCT_ESAVING) {
			calculatorScope = calculatorEsavingGetInsuScope(insTerm, napTerm, gender, age);
		}
		
		if (insuranceType == M_PRODUCT_VARIABLESAVING) {
			calculatorScope = calculatorVariableSavingGetInsuScope(insTerm, napTerm, gender, age);
		}
		
		var text = "";
		if (typeof(calculatorScope) != "undefined") {
			if ((typeof(calculatorScope.startMoney) != "undefined") && typeof(calculatorScope.endMoney) != "undefined") {
				text = calculatorScope.startMoney + "~" + calculatorScope.endMoney + "만원까지";
				if (insuranceType == M_PRODUCT_IANNUITY) {
					text = calculatorScope.startMoney + "만원이상";
				}
			}
		}
		
		$("#napMoney1").attr("placeholder", text);
		
		if (insuranceType == M_PRODUCT_DENTAL) {
			calculatorForm.annuityAge = "0";
			calculatorForm.premium = "";
			calculatorForm.treatyContAmt = "";
			calculatorForm.mdcrRcbfrYn = "";
			calculatorForm.eventId = "";
			calculatorForm.eventUrl = "";
			calculatorForm.isAnnuity = "N";
			calculatorForm.isVariable = "N";
			calculatorForm.mainContAmt = gMainContAmt;
			calculatorForm.planSubType = gPlanSubType;
			calculatorForm.planType = "free";
			calculatorForm.insuPeriod = "10";
			calculatorForm.payPeriod = "10";
			
			var treatyList = "";
			var data = "";
			
			treatyList = $(":checkbox[name=dentalTreaty]:checked");
			for(var i = 0; i < treatyList.length; i++) {
				if(i > 0) data += "&";
				data += treatyList.eq(i).val();
			}
			
			calculatorForm.treatyList = data;
		}
	}
	
	function calculatorTermSetTypeCode() {
		if (insuranceType == M_PRODUCT_TERM) {
			// 보험기간유형 및 납입기간 유형 세팅
			$.each(pIPadPrdListElemVO, function(index, value){
				var insValue = $('#insTerm').val();
				var napValue = $('#napTerm').val();
				
				if (value.insrPrdTypVal == insValue && value.padPrdTypVal == napValue) {
					calculatorForm.insrPrdTypCd = value.insrPrdTypCd;
					calculatorForm.padPrdTypCd = value.padPrdTypCd;
				}
			});				
		}
	}
	
	function calculatorEsavingGetInsuScope(insTerm, napTerm, gender, age) {
		
		var eSavingMainScope = [];
		eSavingMainScope.push({"insTerm":"10", "napTerm":"3", "gender":"1", "startAge":"20", "endAge":"60"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"3", "gender":"2", "startAge":"20", "endAge":"65"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"5", "gender":"1", "startAge":"20", "endAge":"55"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"5", "gender":"2", "startAge":"20", "endAge":"65"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"7", "gender":"1", "startAge":"20", "endAge":"52"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"7", "gender":"2", "startAge":"20", "endAge":"63"});
		eSavingMainScope.push({"insTerm":"10", "napTerm":"10", "gender":"1", "startAge":"20", "endAge":"48"});				
		eSavingMainScope.push({"insTerm":"10", "napTerm":"10", "gender":"2", "startAge":"20", "endAge":"58"});
		
		var insuScope = {"startAge":"", "endAge":""};
		for(var i=0 ; i<eSavingMainScope.length ; i++) {
			var obj = eSavingMainScope[i];
			if ((obj.insTerm == insTerm)&&
				(obj.napTerm == napTerm)&&
				(obj.gender == gender)){
				insuScope.startAge = obj.startAge;
				insuScope.endAge = obj.endAge;				
			}
		}
		return insuScope;
	}
	
	function calculatorVariableSavingGetInsuScope(insTerm, napTerm, gender, age) {
		
		var variableSavingMainScope = [];
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"3", "gender":"1", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"3", "gender":"2", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"5", "gender":"1", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"5", "gender":"2", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"7", "gender":"1", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"7", "gender":"2", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"10", "gender":"1", "startAge":"20", "endAge":"65"});				
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"10", "gender":"2", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"12", "gender":"1", "startAge":"20", "endAge":"65"});				
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"12", "gender":"2", "startAge":"20", "endAge":"65"});
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"20", "gender":"1", "startAge":"20", "endAge":"55"});				
		variableSavingMainScope.push({"insTerm":"99", "napTerm":"20", "gender":"2", "startAge":"20", "endAge":"55"});
		
		var insuScope = {"startAge":"", "endAge":""};
		for(var i=0 ; i<variableSavingMainScope.length ; i++) {
			var obj = variableSavingMainScope[i];
			if ((obj.insTerm == insTerm)&&
				(obj.napTerm == napTerm)&&
				(obj.gender == gender)){
				insuScope.startAge = obj.startAge;
				insuScope.endAge = obj.endAge;				
			}
		}
		return insuScope;
	}
	
	function calculatorAnnuityGetInsuScope(napTerm, fullAge, age, annuityAge) {
		var insuScope = {"startMoney":"", "endMoney":"", "startAge":"", "endAge":""};
		// 5년납
		if (napTerm == '5'){
			if (fullAge >= 31 && age <= 47){
				insuScope.startMoney = 6; insuScope.endMoney = 150;
				insuScope.startAge = 31;  insuScope.endAge = 47;
			}else if (fullAge >= 20 && age <= 48){
				insuScope.startMoney = 7; insuScope.endMoney = 150;
				insuScope.startAge = 20;  insuScope.endAge = 48;
			}else if (fullAge >=20 && age <= 49){
				insuScope.startMoney = 10; insuScope.endMoney = 150;
				insuScope.startAge = 20;   insuScope.endAge = 49;
			}else if (fullAge >= 20 && age <= (annuityAge - 5)){
				insuScope.startMoney = 26; insuScope.endMoney = 150;
				insuScope.startAge = 20;   insuScope.endAge = (annuityAge - 5);
			}else{
				insuScope.startMoney = 0; insuScope.endMoney = 0;
				insuScope.startAge = 20;  insuScope.endAge = (annuityAge - 5);
			}
		// 7년납
		}else if (napTerm =='7'){
			if (fullAge>=20 && age <=45){
				insuScope.startMoney = 6; insuScope.endMoney = 150;
				insuScope.startAge = 20;	insuScope.endAge = 45;
			}else if (fullAge>=20 && age <=46){
				insuScope.startMoney = 7; insuScope.endMoney = 150;
				insuScope.startAge = 20;	insuScope.endAge = 46;
			}else if (fullAge>=20 && age <=47){
				insuScope.startMoney = 8; insuScope.endMoney = 150;
				insuScope.startAge = 20;	insuScope.endAge = 47;
			}else if (fullAge>=20 && age <= (annuityAge-7)){
				insuScope.startMoney = 13; insuScope.endMoney = 150;
				insuScope.startAge =20;	insuScope.endAge = (annuityAge-7);
			}else{
				insuScope.startMoney = 0; insuScope.endMoney = 0;
				insuScope.startAge =20;	insuScope.endAge = (annuityAge-7);
			}
		}
		// 전기납
		else if (napTerm =='99'){
			if (age>=0 && age <= (annuityAge-10)){
				insuScope.startMoney = 6; insuScope.endMoney = 150;
				insuScope.startAge = 20;	insuScope.endAge = (annuityAge-10);
			}else{
				insuScope.startMoney = 0; insuScope.endMoney = 0;
				insuScope.startAge = 20;	insuScope.endAge = (annuityAge-10);
			}
		}else{
			if (fullAge>=20 && age <= (annuityAge-10)){
				insuScope.startMoney = 6; insuScope.endMoney = 150;
				insuScope.startAge = 20;	insuScope.endAge = (annuityAge-10);
			}else{
				insuScope.startMoney = 0; insuScope.endMoney = 0;
				insuScope.startAge = 20;	insuScope.endAge = (annuityAge-10);
			}
		}
		return insuScope;
	}
	
	function calculatorIannuityGetInsuScope(age) {
		var insuScope = {"startMoney":"", "endMoney":""};
		
		insuScope.startMoney = 10; insuScope.endMoney = 100;
		
		return insuScope;
	}
	
	function calculatorCalc(type, isCookie) {
		
		if (typeof(isCookie) == "undefined") {
			if (calculatorForm.planType != "free") {
				calculatorSetForm(type);
			} else {
				calculatorSetMoneyScope();
			}
			if (!calculatorValidateForm(type)) {
				showReCalcButton($("#switchReCalc"), true);
				return; 
			}
		}
		
		var urlStr = '';
		switch (type) {
			case M_PRODUCT_CANCER:
				urlStr = "/m/cancerCalc.eds";
				break;
			case M_PRODUCT_TERM:
				urlStr = "/m/termCalc.eds";
				break;
			case M_PRODUCT_ACCIDENT:
				urlStr = "/m/accidentCalc.eds";
				break;
			case M_PRODUCT_ESAVING:
				urlStr = "/m/esavingCalc.eds";
				break;
			case M_PRODUCT_ANNUITY:
				urlStr = "/m/annuityCalc.eds";
				break;
			case M_PRODUCT_IANNUITY:
				urlStr = "/m/iAnnuityCalc.eds";
				break;		
			case M_PRODUCT_VARIABLESAVING:
				urlStr = "/m/variableSavingCalc.eds";
				break;
			case M_PRODUCT_P_ACCIDENT1:
			case M_PRODUCT_P_ACCIDENT2:
			case M_PRODUCT_P_ACCIDENT3:
				urlStr = "/m/pAccidentCalc.eds";
				break;
			case M_PRODUCT_MEDICAL_A1:
			case M_PRODUCT_MEDICAL_A2:
			case M_PRODUCT_MEDICAL_B1:
			case M_PRODUCT_MEDICAL_B2:
			case M_PRODUCT_MEDICAL_C1:
			case M_PRODUCT_MEDICAL_C2:
			case M_PRODUCT_MEDICAL_D1:
			case M_PRODUCT_MEDICAL_D2:
				var selectedInsuStr = getSelectedInsuListForMobile();

				if( selectedInsuStr.indexOf("undefined") > -1 ){
					calculatorForm.selectedInsuList = "9|11|13|16";
				} else {
					calculatorForm.selectedInsuList = selectedInsuStr;
				}
			
				urlStr = "/m/medicalCalc.eds";
				break;
			case M_PRODUCT_DENTAL:
				
				//if( kakaoCheck != "" ){
				//	location.href = location.origin + location.pathname;
				//	return false;
				//}				
				
				var kakaoFlag = fn_kakaoCheck();
				if( kakaoFlag ){
					location.href = location.origin + location.pathname;
					fn_changeCookieData();
					return false;
				}
				
				var checkAgeFlag = fn_checkAgeForDental(calculatorForm);
				if( !checkAgeFlag ){
					return false;
				}
				
				urlStr = "/m/dentalCalc.eds";
				break;
		}
		
		showLoadingDialog(true);
		
		$.ajax({
			type : "POST",
			url : urlStr,
			data : JSON.stringify(calculatorForm),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					sendPromotionCallback(1);
					setCalcLog();
					
					if(type == M_PRODUCT_VARIABLESAVING){
						lastSelectArrayData = result.arryData;
					}

					if(result.callback_url!=null && result.callback_url!=''){
						pmtCallbackFrm = new Object();
						pmtCallbackFrm.object_id = result.object_id;
						pmtCallbackFrm.return_info = result.return_info;
						pmtCallbackFrm.user_no = result.user_no;
						pmtCallbackFrm.callback_url = result.callback_url;
						callback(pmtCallbackFrm);	
					}
					
					calculatorDisplayResult(type, result);
					
					//차이 스크립트(보험료 계산하기) 17.12.22
					var fbqValue = "mobileProductCalculator";
					if((type=="1")||(type=="2")){
						fbqValue = result.arryData[1].totPremium;
					}else if(type=="3"){
						fbqValue = result.arryData[1].padSmtotPrm;
					}else if((type=="4")||(type=="5")||(type=="7")|| (type=="8") ||
							(type=="9")||(type=="10")||(type=="11")||(type=="12")||(type=="13")||(type=="14")){
						fbqValue = result.arryData[0].totPremium;
					}
					fbq('track', 'ViewContent', {
						value: fbqValue.toString(),
						currency: 'KRW',
					});
					chai_at._chai_conv('', '', '', '', '', '', '', 1, result.arryData[0].inputObj.prdtnm, '', '', '0'); //큐브
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
				    //어도비스크립트 변수 세팅 보험료계산수(e21)
				    var adobeTrackParam = {
				    		gender : calculatorForm.contGender,
				    		age : getInsuAgeByYmd(calculatorForm.contBirth),
				    		prdtName : calculatorForm.prdtnm,
				    		premium : fbqValue.toString(),
				    		payType : ''
				    };
				    adbCalcPremium(adobeTrackParam, type);
					//차이 스크립트(보험료 계산하기) 17.12.22
				}
			},
			complete : function(){
				showLoadingDialog(false);
				
				if (type == M_PRODUCT_DENTAL) {
					showSubscribe(true);
				}
			}
		});

				
		// real click 전환 보험료 계산 스크립트
		call_dsp_track();
		
		// ArtistCHAI CUBE Conversion Script START : 2. 2_청약진입
		if(typeof _CONV != "undefined"){
			_CONV('', '', '', '', '', '', '', '1', '', '', '', '0');
		}
		
		// 계산 완료 후 에코마케팅 구글 스크립트, 페이스북 컨버젼 스크립트 실행
		// google-anlytics 보험료 계산이 완료 되었을 때 실행 될 수 있도록 변경
		if(typeof google_conversion != 'undefined'){
			google_conversion();
		}
		
		//170809
		if(type == M_PRODUCT_ESAVING || type == M_PRODUCT_ANNUITY || type == M_PRODUCT_IANNUITY){
			ga('set', 'metric1', calculatorForm.premium);
			ga('set', 'dimension1', calculatorForm.contBirth.substring(0, 4));
			ga('set', 'dimension2', calculatorForm.contGender);
		}
		
		
	}
	
	function callback(frm){
		$.ajax({
			type : "POST",
			url : frm.callback_url,
			data : JSON.stringify(frm),
			dataType : 'json',
			success : function(result) {
				showLoadingDialog(false);
			},
			beforeSend : function() {},		
 			complete : function() {},		
			error : function() {} 
		});
	}
	
	function calculatorSetForm(type) {
		
		calculatorForm.contBirth = $("#birthday").val();
		calculatorForm.contGender = $("input[name=pgender]:checked").val();
		calculatorForm.payPeriod = type == M_PRODUCT_TERM ? (
														$("#napTerm").val() > 20 ? 99 : $("#napTerm").val()
							   ) : $("#napTerm").val();

		if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM || type == M_PRODUCT_ACCIDENT || type == M_PRODUCT_DENTAL
				|| type == M_PRODUCT_ESAVING || type == M_PRODUCT_VARIABLESAVING 
				|| type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3) {
			calculatorForm.insuPeriod = $("#insTerm").val();
		}
		
		if (type == M_PRODUCT_IANNUITY || type == M_PRODUCT_ANNUITY) {
			calculatorForm.annuityAge = $("#annAge").val();
			calculatorForm.premium = parseInt($("#napMoney1").val().replace(/,/g, "")) * 10000;
		}
		
		if (type == M_PRODUCT_ESAVING || type == M_PRODUCT_VARIABLESAVING) {
			calculatorForm.premium = parseInt($("#napMoney2").val().replace(/,/g, "")) * 10000;
		}
		
		if (type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
				type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
				type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
				type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) {
			calculatorForm.insuPeriod = $("#insTerm").val();
			calculatorForm.proType = insuranceType;
			calculatorForm.proType1 = $('#proType1').val();
			calculatorForm.proType2 = $('input[name=proType2]:checked').val();
			calculatorForm.mdcrRcbfrYn = $('input[name=mdcrRcbfrYn]:checked').val();

			// 상해형 납입주기 연납
			var isYearPay = isPayPeriodYearForMedicalMobile();
			if(isYearPay){
				calculatorForm.payPeriod = "12";
			}else{
				calculatorForm.payPeriod = "1";
			}
		}
		
		if (type == M_PRODUCT_DENTAL) {
			calculatorForm.annuityAge = "0";
			calculatorForm.premium = "";
			calculatorForm.treatyContAmt = "";
			calculatorForm.mdcrRcbfrYn = "";
			calculatorForm.eventId = "";
			calculatorForm.eventUrl = "";
			calculatorForm.isAnnuity = "N";
			calculatorForm.isVariable = "N";
			calculatorForm.mainContAmt = gMainContAmt;
			calculatorForm.planSubType = gPlanSubType;
			calculatorForm.planType = "simple";
			
			var treatyList = "";
			var data = "";
			
			treatyList = $(":checkbox[name=dentalTreaty]:checked");
			for(var i = 0; i < treatyList.length; i++) {
				if(i > 0) data += "&";
				data += treatyList.eq(i).val();
			}
			
			calculatorForm.treatyList = data;
		}
	}
	
	function isPayPeriodYearForMedicalMobile(){
		var selectedInsuStr = getSelectedInsuListForMobile();
		var selectedInsuArr = selectedInsuStr.split("|");
		var isYearPay = true;
		//연납, 월납 판단
		for( var i=0; i<selectedInsuArr.length; i++ ){
			var selectedProdId = selectedInsuArr[i];
			if( selectedProdId == "-999" ){
				continue;
			} else {
				if( selectedProdId == "9" || selectedProdId == "10" || selectedProdId == "11" || selectedProdId == "12" ){
					isYearPay = false;
					break;
				}
			}
		}
		return isYearPay;
	}
	
	function setReCalculator() {
		displayType(showCalc);
	}
	
	function calculatorValidateForm(type) {
		
//		실손 상품 개정 by syi
		if (type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
				type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
				type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
				type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) 
		{
			calculatorForm.contBirth = $("#birthday").val();
			calculatorForm.contGender = $("input[name=pgender]:checked").val();
			calculatorForm.insuPeriod = $("#insTerm").val();
			calculatorForm.proType = insuranceType;
			calculatorForm.mdcrRcbfrYn = $('input[name=mdcrRcbfrYn]:checked').val();
		}
		
		var age = calculatorForm.contBirth;
		var gender = calculatorForm.contGender;
		var annuityAge = calculatorForm.annuityAge;
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		var premium = parseInt(calculatorForm.premium) / 10000;
		
		if (gender == null || gender == ""){
    		alert("성별을 선택해주세요");
    		return false;	    		
    	}
    	
    	if (getInsuAgeByYmd(age) <= 0) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#birthday").focus();
    		$("#birthday").val("");
    		return false;
    	}
    	
    	if (!chkDate(age)) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$('#birthday').focus();
    		$("#birthday").val("");
    		return false;
    	}
    	
    	if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM || type == M_PRODUCT_ACCIDENT || type == M_PRODUCT_DENTAL
    			|| type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3) {
    		
    		if (!$.isNumeric(insTerm)){
        		alert("보험기간을 선택해주세요");
        		return false;    		
        	}
        	
        	if (!$.isNumeric(napTerm)){
        		alert("납입기간을 선택해주세요");
        		return false;    		
        	}
    	}
		
		if (type == M_PRODUCT_IANNUITY || type == M_PRODUCT_ANNUITY) {
			
			if (!$.isNumeric(annuityAge)){
	    		alert("연금개시나이를 입력해주세요");
	    		return false;    		
	    	}

	    	if (!$.isNumeric(napTerm)){
	    		alert("납입기간을 선택해주세요");
	    		return false;    		
	    	}

	    	if (!$.isNumeric(premium)){
	    		alert("납입금액을 입력해주세요");
	    		$("#napMoney1").focus();
	    		$("#napMoney1").val("");
	    		return false;    		
	    	}
			
	    	if (type == M_PRODUCT_IANNUITY){
	    		if ((parseInt(premium, 10) < calculatorScope.startMoney)) {
		    		alert("납입금액은 " + calculatorScope.startMoney + "만원이상 입력해주세요.");
		    		$("#napMoney1").focus();
		    		$("#napMoney1").val("");
		    		return false;                                    
		    	}
	    	}else{
	    		if ((parseInt(premium, 10) < calculatorScope.startMoney) || (parseInt(premium, 10) > calculatorScope.endMoney)) {
		    		alert("납입금액은 " + calculatorScope.startMoney + "만원 ~ " + calculatorScope.endMoney + "만원 까지 입력해주세요.");
		    		$("#napMoney1").focus();
		    		$("#napMoney1").val("");
		    		return false;                                    
		    	}
	    	}
		}
		
		if (type == M_PRODUCT_ESAVING) {
			
			if (!$.isNumeric(insTerm)){
	    		alert("보험기간을 선택해주세요");
	    		return false;    		
	    	}
			
	    	if (!$.isNumeric(napTerm)){
	    		alert("납입기간을 선택해주세요");
	    		return false;    		
	    	}
	    	
	    	if (!$.isNumeric(premium)){
	    		alert("납입금액을 입력해주세요");
	    		$("#napMoney2").focus();
	    		$("#napMoney2").val("");
	    		return false;    		
	    	}
	    	
	    	if (parseInt(premium, 10) < calculatorEsavingMinimumValue) {
	    		alert("납입금액은 " + calculatorEsavingMinimumValue + "만원 이상 입력해주세요.");
	    		$("#napMoney2").focus();
	    		$("#napMoney2").val("");
	    		return false;
	    	}
	    	
		}
		
		if (type == M_PRODUCT_VARIABLESAVING) {
			
			if (!$.isNumeric(insTerm)){
	    		alert("보험기간을 선택해주세요");
	    		return false;    		
	    	}
			
	    	if (!$.isNumeric(napTerm)){
	    		alert("납입기간을 선택해주세요");
	    		return false;    		
	    	}
	    	
	    	if (!$.isNumeric(premium)){
	    		alert("납입금액을 입력해주세요");
	    		$("#napMoney2").focus();
	    		$("#napMoney2").val("");
	    		return false;    		
	    	}
	    	
	    	if (parseInt(premium, 10) < directVariableSavingMinimumValue) {
	    		alert("납입금액은 " + directVariableSavingMinimumValue + "만원 이상 입력해주세요.");
	    		$("#napMoney2").focus();
	    		$("#napMoney2").val("");
	    		return false;
	    	}
		}
		
		if (type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
				type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
				type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
				type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) {
			
			if (!$.isNumeric(insTerm)){
        		alert("데이터 조회중입니다.");
        		return false;    		
        	}
			
			if(typeof $('input[name=mdcrRcbfrYn]:checked').val() === "undefined"){
				alert('의료수급권자여부를 선택해주세요');
				return false;
			}
		}
		
		/*
		if (type == M_PRODUCT_DENTAL){
			if(typeof $('input[name=proType3]:checked').val() === "undefined"){
				alert('상품형태');
				return false;
			}
		}
		*/
		return true;
	}
	
	function calculatorDisplayResult(type, result) {
		//	개인화 영역때문에 추가1
		if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM) {
			calculatorForm.planSeq = result.arryData[1].inputObj.planSeq;
		} else {
			calculatorForm.planSeq = result.arryData[0].inputObj.planSeq;
		}
		
		//	개인화 영역때문에 추가2
		if (type == M_PRODUCT_CANCER || type == M_PRODUCT_TERM || type == M_PRODUCT_ACCIDENT) {
			calculatorForm.monthlyPremium = result.arryData[1].padSmtotPrm;
		}else if(type == M_PRODUCT_P_ACCIDENT1 || type == M_PRODUCT_P_ACCIDENT2 || type == M_PRODUCT_P_ACCIDENT3){
			calculatorForm.monthlyPremium = result.arryData[0].padSmtotPrm;
		}else if(type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
				type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
				type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
				type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2 ) {
			calculatorForm.treatyList = result.arryData[0].inputObj.treatyList;
			calculatorForm.monthlyPremium = result.arryData[0].padSmtotPrm;
		}else{
			calculatorForm.monthlyPremium = parseInt(result.arryData[0].totPremium / 10000);
		}
		
		if (type == M_PRODUCT_DENTAL) {
			calculatorForm.monthlyPremium = result.premium;
		}
		
		$.cookie("resultCalcData", JSON.stringify(calculatorForm), {path:'/'});
		
		if (calculatorForm.planType == "simple") {
			$("#closeCalculator").click();
			
			var url = "";
			switch (type) {
				case M_PRODUCT_CANCER:
					url = "/m/cancer.eds";
					break;
				case M_PRODUCT_TERM:
					url = "/m/term.eds";
					break;
				case M_PRODUCT_ACCIDENT:
					url = "/m/accident.eds";
					break;
				case M_PRODUCT_ESAVING:
					url = "/m/esaving.eds";
					break;
				case M_PRODUCT_ANNUITY:
					url = "/m/annuity.eds";
					break;
				case M_PRODUCT_IANNUITY:
					url = "/m/iAnnuity.eds";
					break;		
				case M_PRODUCT_VARIABLESAVING:
					url = "/m/variableSaving.eds";
					break;
				case M_PRODUCT_P_ACCIDENT1:
				case M_PRODUCT_P_ACCIDENT2:
				case M_PRODUCT_P_ACCIDENT3:
					url = "/m/pAccident.eds";
					break;
				case M_PRODUCT_MEDICAL_A1:
				case M_PRODUCT_MEDICAL_A2:
				case M_PRODUCT_MEDICAL_B1:
				case M_PRODUCT_MEDICAL_B2:
				case M_PRODUCT_MEDICAL_C1:
				case M_PRODUCT_MEDICAL_C2:
				case M_PRODUCT_MEDICAL_D1:
				case M_PRODUCT_MEDICAL_D2:
					url = "/m/medical.eds";
					break;
				case M_PRODUCT_DENTAL:
					url = "/m/dental.eds";
					break;
			}
			
			if (type == M_PRODUCT_MEDICAL_A1 || type == M_PRODUCT_MEDICAL_A2 ||
					type == M_PRODUCT_MEDICAL_B1 || type == M_PRODUCT_MEDICAL_B2 ||
					type == M_PRODUCT_MEDICAL_C1 || type == M_PRODUCT_MEDICAL_C2 ||
					type == M_PRODUCT_MEDICAL_D1 || type == M_PRODUCT_MEDICAL_D2) {
				url += $.query.set('proType', insuranceType).toString();
			}else{
				url += location.search;
			}
			
			location.href = url;
		} else {
			calculatorSetResultData(type);
		}
	}
	
	function resultCB(enable) {
		showCalcResult(enable);
	}
	
	function calculatorSetResultData(type, callback) {
		var jsonData = '{"insuranceType":"' + type + '"}';
		$.ajax({
			type : "POST",
			url : "/m/getProductResult.eds",
			data : jsonData,
			dataType : 'json',
			async : false,
			success : function(result) {
				if (result.success) {
					switch (type) {
						case M_PRODUCT_CANCER:
							calculatorCancerResult(result.arryData);
							break;
						case M_PRODUCT_TERM:
							calculatorTermResult(result.arryData);
							break;
						case M_PRODUCT_ACCIDENT:
							calculatorAccidentResult(result.arryData);
							break;
						case M_PRODUCT_ESAVING:
							calculatorEsavingResult(result.arryData);
							break;
						case M_PRODUCT_ANNUITY:
							calculatorAnnuityResult(result.arryData);
							break;
						case M_PRODUCT_IANNUITY:
							calculatorIAnnuityResult(result.arryData);
							break;		
						case M_PRODUCT_VARIABLESAVING:
							lastSelectArrayData = result.arryData;
							calculatorVariableSavingResult();
							break;
						case M_PRODUCT_P_ACCIDENT1:
						case M_PRODUCT_P_ACCIDENT2:
						case M_PRODUCT_P_ACCIDENT3:
							calculatorPAccidentResult(result.arryData);
							break;
						case M_PRODUCT_MEDICAL_A1:
						case M_PRODUCT_MEDICAL_A2:
						case M_PRODUCT_MEDICAL_B1:
						case M_PRODUCT_MEDICAL_B2:
						case M_PRODUCT_MEDICAL_C1:
						case M_PRODUCT_MEDICAL_C2:
						case M_PRODUCT_MEDICAL_D1:
						case M_PRODUCT_MEDICAL_D2:
							$('#switchReCalc').hide();
							calculatorMedicalResult(result.arryData);
							break;
						case M_PRODUCT_DENTAL:
							calculatorDentalResult(result.arryData);
							break;
					}
					
					calculatorCheckEvent(type);
					
					if (typeof(callback) != "undefined") {
						resultCB(true);
					}
				} else {
					if (typeof(callback) != "undefined") {
						resultCB(false);
					}
				}
			},
			error : function(e) {
				
			} 
		});
	}
	
	function calculatorCheckEvent(type) {
		if (typeof $.cookie("calcEvent") != "undefined") {
			$.removeCookie("calcEvent", {path:"/"});
			
			if(gv_promoCode == 'paccident_event'){
				getEventInfo('N_EVT14', insuranceType);
			}
		}
	}
	
	function setCalculatorEvent() {
		$.cookie("calcEvent", "1" ,{path:'/'});
	}
	
	function calculatorCancerInitSelect(val) {
		/*
		$("#cancerDeathAmt2").children().each(function(index) {
			$(this).show();
			if (index == 0) { $(this).attr("selected", "selected"); }
		});
		
		$("#cancerDeathAmt2").children().each(function(index) {
			if (parseInt($(this).val()) < parseInt(val + "0000")) {
				$(this).hide();
			}
		});
		*/
		$("#cancerDeathAmt2").val(val + "0000");
	}
	
	function calculatorCancerResult(arryData) {
		var data;
		var generalVal;
		var smallBeginVal;
		var smallEndVal;
		var deathVal;
		var diagnosisVal;
		
		calculatorForm.planSeq = arryData[1].inputObj.planSeq;
		
		for (var i = 0; i < arryData.length; i++) {
			data = arryData[i];
			guaranteeArry = data.guaranteeArry;
			
			var j = i + 1;
			
			generalVal = data.gVal1;
			largeVal = data.gVal2;
			smallBeginVal = data.gVal3_1;
			smallEndVal = data.gVal3_2;
			deathVal = data.gVal4;
			diagnosisVal = data.gVal5;
			
			/*
			 * 월 보험료
			 */
			$("#cancerMonthlyPremiumTitle" + j).text(addCommas(data.padSmtotPrm));
			$("#cancerMonthlyPremium" + j).text(addCommas(data.padSmtotPrm));
			
			/*
			 * 일반암
			 */
			if (i == 1) {
				$("#cancerGeneralAmt2").val(generalVal / 2 + "0000");
			} 
			else {
				//	보험금
				$("#cancerGeneralAmt" + j).text(addCommas(generalVal));
			}
			
			/*
			 * 고액암
			 */
			$("#cancerLargeAmt" + j).text(addCommas(largeVal));
			
			/*
			 * 소액암
			 */
			$("#cancerSmallAmt" + j).text(smallBeginVal + " ~ " + smallEndVal);
			
			/*
			 * 암사망
			 */
			if (i == 1) {
				calculatorCancerInitSelect(generalVal);
				$("#cancerDeathAmt2").val(deathVal + "0000");
			} 
			else {
				//	보험금
				$("#cancerDeathAmt" + j).text(addCommas(deathVal));
			}
			
			/*
			 * 재진단암
			 */
			$("#cancerDiagnosisAmt" + j).text(addCommas(diagnosisVal));
		}
		
		cancerReturnDetail(arryData);
	}
	
	function calculatorTermResult(arryData) {
		var data;
		var guaranteeArry;
		var deathVal;
				
		calculatorForm.planSeq = arryData[1].inputObj.planSeq;
		
		for (var i = 0; i < arryData.length; i++) {
			data = arryData[i];
			guaranteeArry = data.guaranteeArry;
			deathVal = data.deathAmt;
			var j = i + 1;
			
			/*
			 * 월 보험료
			 */
			$("#termMonthlyPremiumTitle" + j).text(addCommas(data.padSmtotPrm));
			$("#termMonthlyPremium" + j).text(addCommas(data.padSmtotPrm));
			
			/*
			 * 사망 보험금
			 */
			if (i == 1) {
				$("#termDeathAmt2").val(deathVal + "0000");
			} 
			else {
				//	보험료
				$("#termDeathAmt" + j).text(wonToStr2(deathVal));
			}
		}
		
		termReturnDetail(arryData);
	}
	
	function calculatorMedicalResult(arryData) {
		if(arryData.length > 0){
			calculatorForm.planSeq = arryData[0].inputObj.planSeq;
			// 월 보험료
			var payPeriodTxt = '월';
			if(arryData[0].inputObj.payPeriod != "1"){
				payPeriodTxt = '연';
			}
			
			$("#medicalResult").find('dd.form-wrap3').find('span').first().text(payPeriodTxt);
			$("#medicalResult").find('dd.form-wrap3').find('strong.text').text(addCommas(arryData[0].padSmtotPrm));

			var htmlTxt = '';
			
			if(calculatorForm.planType == 'simple'){
				$.each(arryData[0].inputObj.treatyList, function(i, v){
					
					if (v.insCd == "R017901ANNNNNNN" || v.insCd == "R018001ANNNNNNN" || v.insCd == "R018101ANNNNNNN") {
						htmlTxt += '<li>';
						htmlTxt += '	<label for="chkTreaty_' + (i + 1) + '" class="on">' + v.pname.replace(" 실손의료비보장특약D(갱신형,무배당)", "") + '</label>';
						htmlTxt += '	<input type="checkbox" id="chkTreaty_' + (i + 1) + '" name="treaty" value="' + v.insCd + '" checked="checked">';
						htmlTxt += '</li>';
					}

				});
				
				$('ul[data-role="ui-treaty-list"]').html(htmlTxt);
			}
		}

		medicalReturnDetail(arryData);
	}
	
	function getDentalTreatyPreimum(guarantee, treatyName) {
		var result = 0;
    	
    	for (var i = 0; i < guarantee.length; i++) {
			var item = guarantee[i];
			
			if (item.name.indexOf(treatyName) > -1) {
				result += parseFloat(item.amt.replace("만원", ""));
			}
		}	
    	
    	return result;
	}
	
	function setTreatyUiDisplay(data) {
		var list = [];
		
		for (var i = 0; i < data.length; i++) {
			list.push(data[i].insCd);
		}

		//	특약선택 초기화 : unchecked
		//selectTreatyPlan(CALC_TYPE_LOW);
		
		$.each($(":checkbox[name=dentalTreaty]"), function(i, v) {
			for (var j = 0; j < list.length; j++) {
				if (list != "" && $(this).val().indexOf(list[j]) != -1) {
					$(this).prop('checked', true);
					$(this).siblings().addClass("on");
				}
			}
		});	
	}
	
	function calculatorDentalResult(arryData) {
		if(arryData.length > 0){
			
			var selectedSubType = arryData[1].inputObj.selectedSubType;
			
			if (typeof(selectedSubType) == "undefined") {
				selectedSubType = arryData[1].inputObj.planSubType;
			}
			
			var data = arryData[selectedSubType-1];
			var guarantee;
			var html = "";
			
			if (typeof(data.guaranteeArry) == "undefined") {
				data = data[0];
			}
			guarantee = data.guaranteeArry;
			
			calculatorForm.planSeq = data.inputObj.planSeq;
			
			$("#switchReCalc").hide();
			//setPlanSubType(data.inputObj.planSubType);
			setPlanSubType(data.inputObj.selectedSubType);
			setCheckByPlanSubTreaty(CALC_TYPE_LOW);
			setTreatyUiDisplay(data.inputObj.treatyList);

			//	월보험료
			$("#premium").text(addCommas(data.padSmtotPrm));
			$("#mainContAmt").text(addCommas(data.inputObj.contAmt));
			
			//	영구치보철
			html = fn_setImplantTag(html, guarantee, selectedSubType);
			html += '<li><strong>' + getDentalTreatyPreimum(guarantee, "틀니") + '</strong><span>만원</span></li>';
			html +=	'<li><strong>' + getDentalTreatyPreimum(guarantee, "브릿지") + '</strong><span>만원</span></li>';
			$("#mainInsuResult1").html(html);
			//var selImplStr = arryData[0].inputObj.selImplStr;
			var implantVal = getDentalTreatyPreimum(guarantee, "임플란트");
			$("#selImplant").val(implantVal);
			
			
			//	보존치료
			html = '<li><strong>' + getDentalTreatyPreimum(guarantee, "인레이") + '</strong><span>만원</span></li>' +
					'<li><strong>' + getDentalTreatyPreimum(guarantee, "복합레진") + '</strong><span>만원</span></li>' +
					'<li><strong>' + getDentalTreatyPreimum(guarantee, "아말감") + '</strong><span>만원</span></li>';
			$("#mainInsuResult2").html(html);
	
			//	크라운치료
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "크라운") + '만원</strong>';
			$("#mainInsuResult3").html(html);
			
			//	만기보험금
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "만기보험금") + '만원</strong>';
			$("#mainInsuResult10").html(html);	

			//	영구치 유지
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "영구치유지") + '만원</strong>';
			$("#mainInsuResult11").html(html);
			
			
			var premium = 0;
			var count = 0;
			
			//	영구치상실위로금
			premium = getDentalTreatyPreimum(guarantee, "영구치상실위로금");
			if (premium != 0) {
				html = '<div>영구치상실위로금</div>' +
						'<div>' +
						'<strong>' + premium + '만원</strong>' +
						'</div>';					
				
				$("#mainInsuResult12").html(html);
			} else {
				$("#mainInsuResult12").empty();
				count++;
			}			
			
			
			//	영구치발치
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "영구치발치") + '만원</strong>';
			$("#mainInsuResult4").html(html);
			
			//	치수치료
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "치수치료") + '만원</strong>';
			$("#mainInsuResult5").html(html);
			
			//	주요치주질환
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "주요치주질환치료") + '만원</strong>';
			$("#mainInsuResult6").html(html);
			
			//	치서제거
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "치석제거") + '만원</strong>';
			$("#mainInsuResult7").html(html);
			
			//	구내방사선촬영
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "구내방사선촬영") + '만원</strong>';
			$("#mainInsuResult8").html(html);
			
			//	파노라마촬영
			html = '<strong>' + getDentalTreatyPreimum(guarantee, "파노라마촬영") + '만원</strong>';
			$("#mainInsuResult9").html(html);
			
			//	각막이식수술
			premium = getDentalTreatyPreimum(guarantee, "각막이식수술");
			if (premium != 0) {
				html = '<div>각막이식수술</div>' +
				'<div>' +
				'<strong>' + premium + '만원</strong>' +
				'</div>';
				
				$("#mainInsuResult13").html(html);
			} else {
				$("#mainInsuResult13").empty();
				count++;
			}
			
			//	3대안과질환수술
			premium = getDentalTreatyPreimum(guarantee, "녹내장");
			if (premium != 0) {
				html = '<div>' +
						'<h4>3대안과질환수술</h4>' +
						'<ul class="txt-type3">' +
						'<li>녹내장</li>' +
						'<li>황반변성질환</li>' +
						'<li>당뇨병성망막질환</li>' +
						'</ul>' +
						'</div>' +
						'<div>' +
						'<ul>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "녹내장") + '</strong><span>만원</span></li>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "황반변성질환") + '</strong><span>만원</span></li>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "당뇨병성망막질환") + '</strong><span>만원</span></li>' +
						'</ul>' +
						'</div>';					
				
				$("#mainInsuResult14").html(html);
			} else {
				$("#mainInsuResult14").empty();
				count++;
			}
			
			//	특정얼굴수술
			premium = getDentalTreatyPreimum(guarantee, "특정안과질환");
			if (premium != 0) {
				html = '<div>' +
						'<h4>특정얼굴수술</h4>' +
						'<ul class="txt-type3">' +
						'<li>특정안과질환</li>' +
						'<li>특정후각질환</li>' +
						'<li>특정청각질환</li>' +
						'<li>특정외모상해</li>' +
						'</ul>' +
						'</div>' +
						'<div>' +
						'<ul>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "특정안과질환") + '</strong><span>만원</span></li>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "특정후각질환") + '</strong><span>만원</span></li>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "특정청각질환") + '</strong><span>만원</span></li>' +
						'<li><strong>' + getDentalTreatyPreimum(guarantee, "특정외모상해") + '</strong><span>만원</span></li>' +
						'</ul>' +
						'</div>';
				
				$("#mainInsuResult15").html(html);
			} else {
				$("#mainInsuResult15").empty();
				count++;
			}
		}

		dentalReturnDetail(arryData);
	}
	
	function accidentGetGaranteeHtml(data1, data2) {
		var htmlStr = "";
		var tmp, tmp1, tmp2;
		
		tmp = data1.split("×");
		if (tmp.length == 2) {
			tmp1 = tmp[0];
			tmp2 = tmp[1];
		}
		
		htmlStr = "<strong>" + wonToStr2(data2) + "원</strong>";
		htmlStr += "<span>+ " + tmp1 + "</span>";
		htmlStr += "<span>× " + tmp2 + "</span>";
		
		return htmlStr;
	}
	
	function calculatorAccidentResult(arryData) {
		calculatorForm.planSeq = arryData[0].inputObj.planSeq;
		
		for (var i = 0 ; i < arryData.length ; i++) {
			var data = arryData[i];
			var j = i + 1;
			var htmlStr = "";
			
			//	월 납입금액
			$("#accidentMonthlyPremiumTitle" + j).text(addCommas(data.padSmtotPrm));
			$("#accidentMonthlyPremium" + j).text(addCommas(data.padSmtotPrm));				
			
			//	보험금
			$("#accident" + j + "_1").html(accidentGetGaranteeHtml(data.deathAmt12, data.deathAmt11));
			$("#accident" + j + "_2").html(accidentGetGaranteeHtml(data.deathAmt22, data.deathAmt21));
			$("#accident" + j + "_3").html(accidentGetGaranteeHtml(data.deathAmt32, data.deathAmt31));
			$("#accident" + j + "_4").html("<strong>" + addCommas(data.disAmt2) + "만원</strong><span>x 해당지급률</span>");
			if (j == 2) {
				$("#accident" + j + "_5").html("<strong>" + data.annuityAmt2 + "~" + data.annuityAmt1 + "만원</strong><span>x 해당지급률</span>");
			}
		}
		
		accidentReturnDetail(arryData);
	}
	
	function calculatorEsavingResult(arryData) {
		var data;
		var totPremium = "0";
		var returnMoney = "0";
		var returnRatio = "0";
		
		calculatorForm.planSeq = arryData[0].inputObj.planSeq;
		
		$("#esavingResult").children().each(function (){
			$(this).hide();
		});
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i];

			totPremium = addCommas(parseInt(data.totPremium / 10000));
			returnMoney = addCommas(data.returnMoney);
			returnRatio = data.returnRatio;
			
			$("#esavingMonthlyPremiumTitle" + j).text(totPremium);
			
			if (i == 0) {
				prevVal = parseInt(data.totPremium / 10000);
			}
			
			$("#esavingMonthlyPremium" + j).text(totPremium);
			
			$("#esavingReturnMoney" + j).text(returnMoney);			
			$("#esavingReturnRatio" + j).text(returnRatio);
			
			$($("#esavingResult").children()[i]).show();
		}
		
		esavingReturnDetail(arryData);
	}
	
	function calculatorVariableSavingResult() {
		var data;
		var totPremium = "0";
		var returnMoney = "0";
		var returnRatio = "0";
		
		calculatorForm.planSeq = lastSelectArrayData[0].inputObj.planSeq;
		
		$("#variableSavingResult").children().each(function (){
			$(this).hide();
		});

		for (var i = 0; i < lastSelectArrayData.length; i++) {
			var j = i + 1;
			data = lastSelectArrayData[i];
			
			totPremium = addCommas(parseInt(data.totPremium / 10000));
			
			var returnData = getReturnDataByPeriod(i);
			
			returnMoney = addCommas(returnData.rtnMoney);
			returnRatio = returnData.RtnRatio;
			
			$("#variableSavingReturnPeriod" + j).text(data.inputObj.payPeriod);
			
			$("#variableSavingMonthlyPremiumTitle" + j).text(totPremium);
			if (i == 0) {
				prevVal = parseInt(data.totPremium / 10000); 
			}
			$("#variableSavingMonthlyPremium" + j).text(totPremium);
			
			$("#variableSavingReturnMoney" + j).text(returnMoney);			
			$("#variableSavingReturnRatio" + j).text(returnRatio);
			
			$($("#variableSavingResult").children()[i]).show();
		}
		
		variableSavingReturnDetail();
	}
	
	function calculatorPAccidentResult(arryData) {
		calculatorForm.planSeq = arryData[0].inputObj.planSeq;
		
		for (var i = 0 ; i < arryData.length ; i++) {
			var data = arryData[i];
			var j = i + 1;
			var htmlStr = "";
			
			//	월 납입금액
			$("#pAccidentMonthlyPremiumTitle" + j).text(addCommas(data.padSmtotPrm));
			$("#pAccidentMonthlyPremium" + j).text(addCommas(data.padSmtotPrm));				
			
			//	타이틀
			$("#pAccidentTit" + j + "_1").text(data.guaranteeArry[0].name);
			if(typeof data.guaranteeArry[1] !== 'undefined'){
				$("#pAccidentTit" + j + "_2").text(data.guaranteeArry[1].name);
			}
			
			//	보험금
			$("#pAccident" + j + "_1 > strong").html(data.deathAmt11);
			
			var dAmt = data.deathAmt21;
			var splitDAmt = dAmt.split('~');

			if(splitDAmt.length > 1){
				dAmt = splitDAmt[0].replace(/[ㄱ-ㅎ가-힣]/gi,"");
				dAmt += ' ~ ' + splitDAmt[1];
			}
			
			$("#pAccident" + j + "_2 > strong").html(dAmt);
		}
		
		pAccidentReturnDetail(arryData);
	}
	
	function calculatorAnnuityResult(arryData) {
		var data;
		var monthlyPremium = 0;
		var taxCredit = 0;
		var annuityMoney = 0;
		var returnRatio = 0;
		
		calculatorForm.planSeq = arryData[0].inputObj.planSeq;
		
		$("#annuityResult").children().each(function (){
			$(this).hide();
		});
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i];
			
			monthlyPremium = parseInt(data.totPremium / 10000);
			taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
			if (taxCredit >= 66) taxCredit = 66;
			annuityMoney = addCommas(parseInt(data.annuityMoney / 10000));
			returnRatio = data.returnRatio;
			
			$("#annuityMonthlyPremiumTitle" + j).text(monthlyPremium);
			
			if (i == 0) {
				prevVal = $("#annuityMonthlyPremium1").val(monthlyPremium);
			}
			
			$("#annuityMonthlyPremium" + j).text(monthlyPremium);
			
			$("#annuitytaxCredit" + j).text(taxCredit);
			$("#annuityAnnualMoney" + j).text(annuityMoney);
			$("#annuityreturnRatio" + j).text(returnRatio);
			
			$($("#annuityResult").children()[i]).show();
		}
		
		annuityReturnDetail(arryData);
	}
	
	function calculatorIAnnuityResult(arryData) {
		var data;
		var totPremium = "0";
		var nowTime10 = "0";
		var returnRatio = "0";
		
		calculatorForm.planSeq = arryData[0].inputObj.planSeq;
		
		$("#iAnnuityResult").children().each(function (){
			$(this).hide();
		});
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i];

			totPremium = parseInt(data.totPremium / 10000);
			nowTime10 = addCommas(parseInt(data.nowTime10 / 10000));
			returnRatio = data.returnRatio;

			$("#iAnnuityMonthlyPremiumTitle" + j).text(totPremium);
			
			if (i == 0) {
				prevVal = totPremium;
			}
			
			$("#iAnnuityMonthlyPremium" + j).text(totPremium);
			
			$("#annuityAnnualMoney" + j).text(nowTime10);
			$("#annuityreturnRatio" + j).text(returnRatio);
			
			$($("#iAnnuityResult").children()[i]).show();
		}
		
		iAnnuityReturnDetail(arryData);
	}
	
	function cancerReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "</strong>년</li>");
		$($("#detailCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");

		$($("#cancerCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "년</strong></li>");
		$($("#cancerCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "년</strong></li>");
		
		//	보장내용
		cancerDetail1(arryData);
		
		//	해지환급금
		cancerDetail2(arryData);
	}
	
	//	보장내용
	function cancerDetail1(arryData) {
		//	arryData
		//	0 : 최저, 1 : 맞춤, 2 : 최고
		
		//	일반암
		cancerDetail1Sub1($("#cancerPayReason1_1"), arryData[0]);
		cancerDetail1Sub1($("#cancerPayReason1_2"), arryData[1]);
		cancerDetail1Sub1($("#cancerPayReason1_3"), arryData[2]);
		
		//	소액암
		cancerDetail1Sub2($("#cancerPayReason2_1"), arryData[0]);
		cancerDetail1Sub2($("#cancerPayReason2_2"), arryData[1]);
		cancerDetail1Sub2($("#cancerPayReason2_3"), arryData[2]);
		
		//	고액암
		cancerDetail1Sub3($("#cancerPayReason3_1"), arryData[0], 3);
		cancerDetail1Sub3($("#cancerPayReason3_2"), arryData[1], 3);
		cancerDetail1Sub3($("#cancerPayReason3_3"), arryData[2], 3);
		
		//	암사망
		cancerDetail1Sub3($("#cancerPayReason4_1"), arryData[0], 4);
		cancerDetail1Sub3($("#cancerPayReason4_2"), arryData[1], 4);
		cancerDetail1Sub3($("#cancerPayReason4_3"), arryData[2], 4);
		
		//	재진단암
		cancerDetail1Sub3($("#cancerPayReason5_1"), arryData[0], 5);
		cancerDetail1Sub3($("#cancerPayReason5_2"), arryData[1], 5);
		cancerDetail1Sub3($("#cancerPayReason5_3"), arryData[2], 5);
	}
	
	// 일반암
	function cancerDetail1Sub1(obj, data) {
		if (typeof(obj) != "undefined") {
			obj.find('tr').each(function(i) {
				var $td = $(this).find('td').last();
				switch (i) {
					case 0 :
						$td.text(data.guaranteeArry[0].amt);
						break;
					case 1 :
						$td.text(data.guaranteeArry[1].amt);
						break;
					case 2 :
						$td.text(data.guaranteeArry[2].amt);
						break;
				}
			});
		}
	}
	
	// 소액암
	function cancerDetail1Sub2(obj, data) {
		if (typeof(obj) != "undefined") {
			obj.find('tr').each(function(i) {
				var $td = $(this).find('td').last();
				switch (i) {
					case 0 :
						$td.text(data.guaranteeArry[3].amt);
						break;
					case 1 :
						$td.text(data.guaranteeArry[4].amt);
						break;
				}
			});
		}
	}
	
	// 고액암, 암사망, 재진단암
	function cancerDetail1Sub3(obj, data, type) {
		if (typeof(obj) != "undefined") {
			obj.find('tr').each(function(i) {
				var $td = $(this).find('td').last();
				if (type == 3) {
					//	2017.03.07
					//	ERP에서 받는 데이터 배열 변경
					//$td.text(data.guaranteeArry[11].amt);
					$td.text(data.guaranteeArry[8].amt);
				} else if (type == 4) {
					//$td.text(data.guaranteeArry[8].amt);
					$td.text(data.guaranteeArry[12].amt);
				} else {
					//$td.text(data.guaranteeArry[9].amt);
					$td.text(data.guaranteeArry[10].amt);
				}
			});
		}
	}
	
	//	해지환급금
	function cancerDetail2(arryData) {
		var data;
		var nowRate;
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i].nowRateArry;
			
			$("#cancerReturn" + j).find('tr').each(function (index1){
				nowRate = data[index1];
				
				$(this).find('td').each(function (index2) {
					switch (index2) {
						case 0:
							$(this).text(nowRate.totTerm);
							break;
						case 1:
							$(this).text(addCommas(nowRate.napMoney) + "원");
							break;
						case 2:
							$(this).text(addCommas(nowRate.rtnMoney) + "원");
							break;
						case 3:
							$(this).text(nowRate.RtnRatio + "%");
							break;
					}					
				});
			});
		}
	}
	
	function termReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		var insHtml = calculatorForm.insrPrdTypCd == "01" ? "년" : "세";
		var napHtml = calculatorForm.padPrdTypCd == "02" ? parseInt(insTerm) - age : calculatorForm.payPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "</strong>" + insHtml + "</li>");
		$($("#detailCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napHtml + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");

		$($("#termCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + insHtml +  "</strong></li>");
		$($("#termCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napHtml + "년</strong></li>");
		
		//	보장내용
		termDetail1(arryData);
		
		//	해지환급금
		termDetail2(arryData);
	}
	
	function termDetail1(arryData) {
		$($("#termPayReason1_1").find("tr>td")[1]).text(arryData[0].guaranteeArry[0].amt);
		$($("#termPayReason1_2").find("tr>td")[1]).text(arryData[1].guaranteeArry[0].amt);
		$($("#termPayReason1_3").find("tr>td")[1]).text(arryData[2].guaranteeArry[0].amt);
	}
	
	function termGetTable(data) {
		var html = "";
		var napMoney;
		
		for (var i = 0; i < data.nowRateArry.length; i++) {
			
			if (data.nowRateArry[i].totTerm.indexOf("년") > 0) {
				if ( parseInt(data.nowRateArry[i].totTerm.replace("년", "")) <= calculatorForm.payPeriod) {
					napMoney = data.nowRateArry[i].napMoney;
				} else {
					napMoney = napMoney;
				}
			} else {
				napMoney = data.nowRateArry[i].napMoney;
			}
			
			html += '<tr>' +
					'<td>' + data.nowRateArry[i].totTerm + '</td>' +
			        '<td>' + addCommas(napMoney) + '원</td>' +
			        '<td>' + addCommas(data.nowRateArry[i].rtnMoney) + '원</td>' +
			        '<td>' + data.nowRateArry[i].RtnRatio + '%</td>' +
				    '</tr>'; 
		}
		
		return html;
	}
	
	function termDetail2(arryData) {
		var html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
				    '<caption>해지환급금</caption>' +
				    '<thead>' +
				    '<tr>' +
				    '<th scope="col">기간</th>' +
				    '<th scope="col">납입보험료</th>' +
				    '<th scope="col">해지환급금</th>' +
				    '<th scope="col">환급률</th>' +
				    '</tr>' +
				    '</thead>' +
				    '<tbody id="termTBody1_' + j + '">' +
				    termGetTable(arryData[i]) +
				    '</tbody>' +
				    '</table>';
		}
		$("#termReturn1").html(html);

		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#termTBody1_" + j));
		}
	}
	
	function medicalReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		//var napTerm = calculatorForm.payPeriod;
		
		var insHtml = "년";
		var napHtml = "1";
		
		$("#detailCustInfo").children().eq(0).html("<li>보험기간 : <strong>" + insTerm + "</strong>" + insHtml + "</li>");
		$("#detailCustInfo").children().eq(1).html("<li>납입기간 : <strong>" + napHtml + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");

		//	보장내용
		medicalDetail1(arryData);
		
		//	해지환급금
		medicalDetail2(arryData);
	}
	
	function medicalDetail1(dataArray) {
		// 주보험
		var $main = $('div[data-role="ui-I20608"]');
		var $main2 = $("#mInsu2");
		var $main3 = $("#mInsu3");
		var $main4 = $("#mInsu4");
		
		$main.find('tbody>tr>td').html("-");
		$main2.find('tbody>tr>td').html("-");
		$main3.find('tbody>tr>td').html("-");
		$main4.find('tbody>tr>td').html("-");
		
		$main2.hide();
		$main3.hide();
		$main4.hide();
		// 도수치료 · 체외충격파치료 · 증식치료 실손의료비보장특약
		var $treaty1 = $('div[data-role="ui-R017901ANNNNNNN"]');
		// 주사료 실손의료비보장특약
		var $treaty2 = $('div[data-role="ui-R018001ANNNNNNN"]');
		// 자기공명영상진단(MRI/MRA) 실손 의료비보장특약
		var $treaty3 = $('div[data-role="ui-R018101ANNNNNNN"]');
		
		if (typeof(dataArray) != "undefined" && dataArray.length > 0) {
			var inputData = dataArray[0].inputObj;
			var guaranteeData = dataArray[0].guaranteeArry;
			var setContent = function($obj, i){
				$obj.find('tbody>tr td.txt').html(guaranteeData[i].content + '<br>' + guaranteeData[i+1].content);
			};
			
			//$main.find('h4.tit-sub2, tbody>tr>td').text(inputData.prdtnm);

			$.each(guaranteeData, function(i, v){				
				if( "-" == $main.find('tbody>tr>td').eq(1).html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content);
					}
					
					if(v.name.indexOf('외래') > -1){
						$main.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
					}
				} else if( "-" == $main2.find('tbody>tr>td').eq(1).html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main2.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main2.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content);
						$main2.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main2.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main2.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
						$main2.show();
					}		
					
				} else if( "-" == $main3.find('tbody>tr>td').eq(1).html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main3.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main3.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content);
						$main3.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main3.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main3.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
						$main3.show();
					}					
					
				} else if( "-" == $main4.find('tbody>tr>td').eq(1).html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main4.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main4.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content);
						$main4.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main4.find('h4.tit-sub2, tbody>tr>td').text(v.insuName.split("[")[1].split("]")[0]);
						$main4.find('tbody>tr>td').eq(1).html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
						$main4.show();
					}	
					
				}
				
				if(v.name.indexOf('도수치료') > -1){
					setContent($treaty1, i);
				}
				
				if(v.name.indexOf('주사료') > -1){
					setContent($treaty2, i);
				}
				
				if(v.name.indexOf('자기공명영상진단') > -1){
					setContent($treaty3, i);
				}
			});
			
			$treaty1.hide();
			$treaty2.hide();
			$treaty3.hide();
			
			if(typeof inputData.treatyList != "undefined" && inputData.treatyList.length > 0){
				var setPname = function($obj, pname){
					$obj.show().find('h4.tit-sub2, tbody>tr>td').text(pname);
				};
				
				$.each(inputData.treatyList, function(i, v){
					if(v.insCd == 'R017901ANNNNNNN'){
						setPname($treaty1, v.pname);
					}
					
					if(v.insCd == 'R018001ANNNNNNN'){
						setPname($treaty2, v.pname);
					}
					
					if(v.insCd == 'R018101ANNNNNNN'){
						setPname($treaty3, v.pname);
					}
				});
			}
		}
	}

	function medicalDetail2(arryData) {
		var html = "";
		
		if(arryData.length > 0){
			var data = arryData[0];
			
			for (var i = 0; i < data.nowRateArry.length; i++) {
				html += '<tr>' +
							'<td>' + data.nowRateArry[i].totTerm + '</td>' +
					        '<td>' + addCommas(data.nowRateArry[i].napMoney) + '원</td>' +
					        '<td>' + addCommas(data.nowRateArry[i].rtnMoney) + '원</td>' +
					        '<td>' + data.nowRateArry[i].RtnRatio + '%</td>' +
					    '</tr>'; 
			}
			
			$("#medicalReturn1").html(html).find('tr').last().addClass('on');
		}
	}
	
	function dentalReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		$("#detailCustInfo").children().eq(0).html("<li>보험기간 : <strong>" + insTerm + "</strong>년</li>");
		$("#detailCustInfo").children().eq(1).html("<li>납입기간 : <strong>" + napTerm + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");

		//	보장내용
		dentalDetail1(arryData);
		
		//	해지환급금
		dentalDetail2(arryData);
	}
	
	function dentalDetail1(arryData) {
		
		var selectedSubType = arryData[1].inputObj.selectedSubType;
		
		if (typeof(selectedSubType) == "undefined") {
			selectedSubType = arryData[1].inputObj.planSubType;
		}
		var data = arryData[selectedSubType-1];
		
		//var data = arryData[0];
		var treatyCount = 0;
		var html = "";

		if (typeof(data.guaranteeArry) == "undefined") {
			data = data[0];
		}
		
		//	주보험
		for (var j = 0; j < data.guaranteeArry.length; j++) {
			var item = data.guaranteeArry[j];
			
			if (item.amt != "") {
				if (data.inputObj.prcd == item.uiCode) {
					$.each($(".returnTreatyValue"), function(i,v) {
						if (item.name.indexOf($(this).attr("name")) > -1) {
							$(this).text(item.amt);
						}
					});
				} else {
					treatyCount++;
				}
			}
		}
		
		//	선택특약
		if (treatyCount > 0) {
			$("#retuenSubTreatyDiv").show();
		} else {
			$("#retuenSubTreatyDiv").hide();
		}
		
		$.each($(".returnTreatyValue2"), function(i,v) {
			$(this).parent().parent().parent().parent().parent().parent().hide();
		});
		
		for (var j = 0; j < data.guaranteeArry.length; j++) {
			var item = data.guaranteeArry[j];

			if (item.amt != "") {
				if (data.inputObj.prcd != item.uiCode) {
					$.each($(".returnTreatyValue2"), function(i,v) {
						if (item.name.indexOf($(this).attr("name")) > -1) {
							$(this).text(item.amt).parent().parent().parent().parent().parent().parent().show();
						}
					});
				}
			}
		}
	}

	function dentalDetail2(arryData) {
		var html = "";
		
		if(arryData.length > 0){
			var selectedSubType = arryData[1].inputObj.selectedSubType;
			
			if (typeof(selectedSubType) == "undefined") {
				selectedSubType = arryData[1].inputObj.planSubType;
			}
			var data = arryData[selectedSubType-1];
			
			//var data = arryData[0];

			if (typeof(data.nowRateArry) == "undefined") {
				data = data[0];
			}
			
			for (var i = 0; i < data.nowRateArry.length; i++) {
				html += '<tr>' +
							'<td>' + data.nowRateArry[i].totTerm + '</td>' +
					        '<td>' + addCommas(data.nowRateArry2[i].napMoney) + '원</td>' +
					        '<td>' + addCommas(data.nowRateArry[i].rtnMoney) + '원</td>' +
					        '<td>' + data.nowRateArry[i].RtnRatio + '%</td>' +
					    '</tr>'; 
			}
			
			$("#medicalReturn1").html(html).find('tr').last().addClass('on');
		}
	}
	
	function accidentReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "</strong>년</li>");
		$($("#detailCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");

		$($("#accidentCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "년</strong></li>");
		$($("#accidentCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "년</strong></li>");
		
		//	보장내용
		accidentDetail1(arryData);
		
		//	해지환급금
		accidentDetail2(arryData);
	}
	
	function accidentDetail1(arryData) {
		//	arryData
		//	0 : 최저, 1 : 맞춤, 2 : 최고
		
		
		//	대중교통사고사망보험금
		accidentDetail1Sub1($("#accidentPayReason1_1"), arryData[0].guaranteeArry[0]);
		accidentDetail1Sub1($("#accidentPayReason1_2"), arryData[1].guaranteeArry[0]);
		
		//	교통재해사망보험금
		accidentDetail1Sub1($("#accidentPayReason2_1"), arryData[0].guaranteeArry[2]);
		accidentDetail1Sub1($("#accidentPayReason2_2"), arryData[1].guaranteeArry[2]);
		
		//	일반재해사망보험금
		accidentDetail1Sub1($("#accidentPayReason3_1"), arryData[0].guaranteeArry[3]);
		accidentDetail1Sub1($("#accidentPayReason3_2"), arryData[1].guaranteeArry[3]);
		
		//	교통재해장해보험금
		accidentDetail1Sub1($("#accidentPayReason4_1"), arryData[0].guaranteeArry[4]);
		accidentDetail1Sub1($("#accidentPayReason4_2"), arryData[1].guaranteeArry[4]);
		
		//	일반재해장해보험금
		accidentDetail1Sub1($("#accidentPayReason5_1"), arryData[0].guaranteeArry[5]);
		accidentDetail1Sub1($("#accidentPayReason5_2"), arryData[1].guaranteeArry[5]);
		
		//	재해연금 – 선택특약
		accidentDetail1Sub2($("#accidentPayReason6_1"), arryData[1]);
	}
	
	function accidentDetail1Sub1(obj, data) {
		obj.children().each(function (i){
			$(this).children().each(function(j){
				if (j == 1) {
					$(this).text(data.amt);
				}
			});
		});
	}
	
	function accidentDetail1Sub2(obj, data) {
		obj.children().each(function (i){
			$(this).children().each(function(j){
				if (j == 1) {
					switch (i) {
						case 0 :
							$(this).text(data.guaranteeArry[6].amt);
							break;
						case 1 : 
							$(this).text(data.guaranteeArry[7].amt);
							break;
						case 2 : 
							$(this).text(data.guaranteeArry[8].amt);
							break;
						case 3 : 
							$(this).text(data.guaranteeArry[9].amt);
							break;
					}
				}
			});
		});
	}
	
	function accidentDetail2(arryData) {
		var data;
		var nowRate;
		var napMoney;
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i].nowRateArry;
			
			$("#accidentReturn" + j).children().each(function (index1){
				nowRate = data[index1];
				
				if (nowRate.totTerm.indexOf("년") > 0) {
					if ( parseInt(nowRate.totTerm.replace("년", "")) <= parseInt(calculatorForm.payPeriod)) {
						napMoney = nowRate.napMoney;
					} else {
						napMoney = napMoney;
					}
				} else {
					napMoney = nowRate.napMoney;
				}
				
				$(this).children().each(function (index2) {
					switch (index2) {
						case 0:
							$(this).text(nowRate.totTerm);
							break;
						case 1:
							$(this).text(addCommas(napMoney) + "원");
							break;
						case 2:
							$(this).text(addCommas(nowRate.rtnMoney) + "원");
							break;
						case 3:
							$(this).text(nowRate.RtnRatio + "%");
							break;
					}					
				});
			});
		}
	}
	
	function pAccidentReturnDetail(arryData) {
		//	고객정보
		var insTerm = calculatorForm.insuPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "</strong>년</li>");

		$($("#pAccidentCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "년</strong></li>");
		
		//	보장내용
		pAccidentDetail1(arryData);
		
		//	해지환급금
		pAccidentDetail2(arryData);
	}
	
	function pAccidentDetail1(arryData) {
		$('#contractName1').text(arryData[0].guaranteeArry[0].name);
		pAccidentDetail1Sub1($("#pAccidentPayReason1_1"), arryData[0].guaranteeArry[0]);
		
		if(typeof arryData[0].guaranteeArry[1] !== 'undefined'){
			$('#contractName2').text(arryData[0].guaranteeArry[1].name);
			pAccidentDetail1Sub1($("#pAccidentPayReason2_1"), arryData[0].guaranteeArry[1]);
		}else{
			$('#contractName2').hide().next().hide();
		}
	}
	
	function pAccidentDetail1Sub1(obj, data) {
		obj.children().each(function (i){
			$(this).children().each(function(j){
				if (j == 0) {
					$(this).text(data.content);
				}else{
					$(this).text(data.amt);
				}
			});
		});
	}
	
	function pAccidentDetail1Sub2(obj, data) {
		obj.children().each(function (i){
			$(this).children().each(function(j){
				if (j == 1) {
					switch (i) {
						case 0 :
							$(this).text(data.guaranteeArry[6].amt);
							break;
						case 1 : 
							$(this).text(data.guaranteeArry[7].amt);
							break;
						case 2 : 
							$(this).text(data.guaranteeArry[8].amt);
							break;
						case 3 : 
							$(this).text(data.guaranteeArry[9].amt);
							break;
					}
				}
			});
		});
	}
	
	function pAccidentDetail2(arryData) {
		var data;
		var nowRate;
		var napMoney;
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			data = arryData[i].nowRateArry;
			napMoney = arryData[i].totNapMoney;
			
			$("#pAccidentReturn" + j).children().each(function (index1){
				nowRate = data[index1];
				
				$(this).children().each(function (index2) {
					switch (index2) {
						case 0:
							$(this).text(nowRate.totTerm);
							break;
						case 1:
							$(this).text(addCommas(napMoney) + "원");
							break;
						case 2:
							$(this).text(addCommas(nowRate.rtnMoney) + "원");
							break;
						case 3:
							$(this).text(nowRate.RtnRatio + "%");
							break;
					}					
				});
			});
		}
	}
	
	function makeSubTab(obj, data) {
		var html;
		
		if (typeof(obj) != "undefined" && typeof(data) != "undefined" && data.length > 0) {
			html = '<li><a href="#none" data-slide-index="0" class="active">월 ' + data[0] + '만원</a></li>';
			
			for (var i = 1; i < data.length; i++) {
				html += '<li><a href="#none" data-slide-index="' + i + '">월 ' + data[i] + '만원</a></li>'; 
			}
			
			obj.html(html);
		}
	}
	
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

						if (tmp == "1년" || tmp == "5년" || tmp == "10년" || tmp == "20년"
							|| tmp == "30년" || tmp == "40년" || tmp == "50년"
								|| tmp == "60년" || tmp == "70년" || tmp == "80년") {
							
							$(this).parent().addClass("on");
						}
					}
				});
			}
		});
	}
	
	function esavingReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "</strong>년</li>");
		$($("#detailCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");
/*
		$($("#esavingCustInfo").children()[0]).html("<li>보험기간 : <strong>" + insTerm + "년</strong></li>");
		$($("#esavingCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "년</strong></li>");
		$($("#esavingCustInfo").children()[2]).html('<li class="sub">공시이율 : <strong>' + arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a></li>');
*/

		$("#esavingMonthlyPremiumTitleNew1").text( $("#esavingMonthlyPremiumTitle1").text() );
		$($("#esavingCustInfo").children()[1]).html("보험기간 : <strong>" + insTerm + "년</strong>");
		$($("#esavingCustInfo").children()[2]).html("납입기간 : <strong>" + napTerm + "년</strong>");
		
		var tag_rateInfo = '공시이율 : <strong>'+ arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a>';
		$("#li_rateInfo").html( tag_rateInfo );
		
		//	가변 서브탭
		var arrayPremium = [];
		for (var i = 0; i < arryData.length; i++) {
			arrayPremium.push(addCommas(parseInt(arryData[i].totPremium / 10000)));
		}
		makeSubTab($("#uiProReturnTab1"), arrayPremium);
		makeSubTab($("#uiProReturnTab2"), arrayPremium);
		
		//	보장내용
		esavingDetail1(arryData);
		
		//	해지환급금
		esavingDetail2(arryData);
	}
	
	function variableSavingReturnDetail() {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var insTerm = calculatorForm.insuPeriod;
		var napTerm = calculatorForm.payPeriod;
		
		$($("#detailCustInfo").children()[0]).html("<li>보험기간 : <strong>종신</strong></li>");
		$($("#detailCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>년 기준(보험나이 <strong>" + age + "</strong>세)</li>");
		
		$($("#variableSavingCustInfo").children()[0]).html("<li>보험기간: <strong>종신</strong></li>");
		$($("#variableSavingCustInfo").children()[1]).html("<li>납입기간: <strong>" + napTerm + "년</strong></li>");

		//	가변 서브탭
		var arrayPremium = [];
		for (var i = 0; i < lastSelectArrayData.length; i++) {
			arrayPremium.push(addCommas(parseInt(lastSelectArrayData[i].totPremium / 10000)));
		}
		makeSubTab($("#uiProReturnTab1"), arrayPremium);
		makeSubTab($("#uiProReturnTab2"), arrayPremium);
		
		//	보장내용
		variableSavingDetail1();
		
		//	해지환급금
		variableSavingDetail2();
	}
	
	function variableSavingDetail1() {
		var html = "";
		
		//	사망보험금
		//	2017.02.20
		//	ERP가 제대로 돌아가면 원복
		var amt0;
		
		for (var i = 0; i < lastSelectArrayData.length; i++) {
			if(typeof lastSelectArrayData[i].inputObj == 'undefined'){
				continue;
			}
			
			if (lastSelectArrayData[i].guaranteeArry.length == 0) {
				amt0 = "";
			} else {
				amt0 = lastSelectArrayData[i].guaranteeArry[0].amt;
			}
			
			html += '<table class="tbl-type3" cellspacing="0">' +
					'<caption>사망보험금</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col">기준</th>' +
					'<th scope="col" class="datagroup">지급금액</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
					'<td>피보험자 사망시<br><span class="txt-c1">(\'고의적 사고 및 2년이내 자살\'의 경우 지급을 제한)</span></td>' +
//					'<td>' + lastSelectArrayData[i].guaranteeArry[0].amt + '</td>' +
					'<td>' + amt0 + '</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#variableSavingGuarantee1").html(html);
	}
	
	function variableSavingDetail2() {
		
		//	현재 이율
		for (var i = 0; i < lastSelectArrayData.length; i++) {
			if(typeof lastSelectArrayData[i].inputObj == 'undefined'){
				continue;
			}
			
			var html = "";
			var iPlus = i + 1;
			var nowRateLength = lastSelectArrayData[i].nowRateArry.length;
			var nowRateThird = nowRateLength / 3;
			var stdRate = '-1.0';
			var stdRtnRate = '-1.2';
			
			if(i == 0){
				stdRate = '-1.0';
				stdRtnRate = '-1.2';
			}else if(i == 1){
				stdRate = '2.5';
				stdRtnRate = '2.4';
			}else{
				stdRate = '3.75';
				stdRtnRate = '3.6';
			}
			
			for(var j=0; j<lastSelectArrayData.length; j++){
				if(typeof lastSelectArrayData[j].inputObj == 'undefined'){
					continue;
				}
				
				var jPlus = j + 1;
				
				html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
				'<caption>투자수익률 연 ' + stdRate + '% 가정 (순수익률 연 ' + stdRtnRate + '%)</caption>' +
				'<thead>' +
				'<tr>' +
				'<th scope="col" rowspan="2">기간</th>' +
				'<th scope="col" colspan="3" id="stdRate">투자수익률 연 ' + stdRate + '% 가정 (순수익률 연 ' + stdRtnRate + '%)</th>' +
				'</tr>' +
				'<tr>' +
				'<th scope="col">보험료 누계</th>' +
				'<th scope="col">해지환급금</th>' +
				'<th scope="col">환급률</th>' +
				'</tr>' +
				'</thead>' +
				'<tbody id="variableSavingTBody' + iPlus + '_' + jPlus + '">';
				
				var startIdx = nowRateThird * i;
				var endIdx = startIdx + nowRateThird;
				
				for(var k=startIdx; k<endIdx; k++){
					html += '<tr>' +
			        '<td>' + lastSelectArrayData[j].nowRateArry[k].totTerm + '</td>' +
			        '<td>' + addCommas(lastSelectArrayData[j].nowRateArry[k].napMoney) + '원</td>' +
			        '<td>' + addCommas(lastSelectArrayData[j].nowRateArry[k].rtnMoney) + '원</td>' +
			        '<td>' + lastSelectArrayData[j].nowRateArry[k].RtnRatio + '%</td>' +
			        '</tr>'; 
				}
				
				html += '</tbody>' +
				'</table>';
			}
			
			$("#variableSavingReturn" + iPlus).html(html);
		}
		
		for (var i=0; i<lastSelectArrayData.length; i++) {
			var iPlus = i + 1;
			
			for (var j=1; j<=3; j++){
				addClassToDetailReturn($("#variableSavingTBody" + iPlus + "_" + j));
			}
		}
	}
	
	function esavingDetail1(arryData) {
		var html = "";
		
		//	만기환급금 수령액
		for (var i = 0; i < arryData.length; i++) {
			html += '<table cellspacing="0" class="tbl-type3">' +
					'<caption>만기환급금 수령액</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
					'<td>현 공시이율 '+ arryData[i].nowRate + '%</td>' +
					'<td>' + addCommas(arryData[i].returnMoney) + '원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#esavingGuarantee1").html(html);
		
		html = "";
		//	사망보험금
		for (var i = 0; i < arryData.length; i++) {
			html += '<table class="tbl-type3" cellspacing="0">' +
					'<caption>사망보험금</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col">지급사유</th>' +
					'<th scope="col" class="datagroup">지급금액</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody>' +
					'<tr>' +
					'<td>보험기간 중 피보험자가 사망하였을 경우</td>' +
					
					//	2017.02.20
					//	보장내용중 사망보험금의 금액을 운영과 맞춤
					//	'<td>' + arryData[i].guaranteeArry[1].amt + '</td>' +
					
					//	2017.07.25
					'<td>' + arryData[i].guaranteeArry[1].amt + '</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#esavingGuarantee2").html(html);
	}
	
	function getProductReturnTable(data, type) {
		var html = "";
		var obj;
		
		if (type == 1) {
			obj = data.nowRateArry;
		} else if(type == 3){
			obj = data.stdRateArry;
		}
		else {
			obj = data.lowRateArry;
		}
		
		for (var i = 0; i < obj.length; i++) {
			html += '<tr>' +
			        '<td>' + data.nowRateArry[i].totTerm + '</td>' +
			        '<td>' + addCommas(data.nowRateArry[i].napMoney) + '원</td>' +
			        '<td>' + addCommas(obj[i].rtnMoney) + '원</td>' +
			        '<td>' + obj[i].RtnRatio + '%</td>' +
			        '</tr>'; 
		}

		return html;
	}
	
	function esavingDetail2(arryData) {
		var html = "";
		
		//	현재 이율
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
					'<caption>현재공시이율 연복리 ' + arryData[i].nowRate + '%가정시 해지환급금</caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col" rowspan="3">기간</th>' +
					'<th scope="col" colspan="3" id="stdRate">현재공시이율 연복리 ' + arryData[i].nowRate + '%가정시</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col">보험료 누계</th>' +
					'<th scope="col">해지환급금</th>' +
					'<th scope="col">환급률</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="esavingTBody1_' + j + '">' +
					getProductReturnTable(arryData[i], 1) + 
					'</tbody>' +
					'</table>';
		}
		$("#esavingReturn1").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#esavingTBody1_" + j));
		}
		
		//	현재이율외 추가된 이율반영
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
			'<caption>평균공시이율 연복리 ' + arryData[i].nowRate + '%가정시 해지환급금</caption>' +
			'<thead>' +
			'<tr>' +
			'<th scope="col" rowspan="3">기간</th>' +
			'<th scope="col" colspan="3" id="stdRate">평균공시이율 연복리 ' + arryData[i].stdRate + '%가정시</th>' +
			'</tr>' +
			'<tr>' +
			'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
			'</tr>' +
			'<tr>' +
			'<th scope="col">보험료 누계</th>' +
			'<th scope="col">해지환급금</th>' +
			'<th scope="col">환급률</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody id="esavingTBody3_' + j + '">' +
			getProductReturnTable(arryData[i], 3) + 
			'</tbody>' +
			'</table>';
		}
		$("#esavingReturn3").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#esavingTBody3_" + j));
		}
		
		html = "";
		//	최저 이율
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
					'<caption>최저보증이율 ' + arryData[i].lowRate + '%가정시 해지환급금</caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col" rowspan="3">기간</th>' +
//					'<th scope="col" colspan="3" id="stdRate">연복리 ' + arryData[i].lowRate + '%가정시</th>' +
					
					'<th scope="col" colspan="3" id="stdRate">최저보증이율 가정시</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col">보험료 누계</th>' +
					'<th scope="col">해지환급금</th>' +
					'<th scope="col">환급률</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="esavingTBody2_' + j + '">' +
					getProductReturnTable(arryData[i], 2) + 
					'</tbody>' +
					'</table>';
		}
		$("#esavingReturn2").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#esavingTBody2_" + j));
		}
	}
	
	function annuityReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var annAge = calculatorForm.annuityAge;
		var napTerm = calculatorForm.payPeriod == '99' ? annAge : calculatorForm.payPeriod;
		var napTermType = napTerm == annAge ? "세" : "년";
		
		$($("#detailCustInfo").children()[0]).html("<li>납입기간 : <strong>" + napTerm + "</strong>" + napTermType + "</li>");
		$($("#detailCustInfo").children()[1]).html("<li>연금개시나이 : <strong>" + annAge + "</strong>세 기준(보험나이 <strong>" + age + "</strong>세)</li>");
		/*
		$($("#annuityCustInfo").children()[0]).html("<li>연금개시나이 : <strong>" + annAge + "</strong>세</li>");
		$($("#annuityCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>" + napTermType + "</li>");
		$($("#annuityCustInfo").children()[2]).html('<li class="sub">공시이율 : <strong>' + arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a></li>');
		*/
		
		$($("#annuityCustInfo").children()[1]).html("연금개시나이 : <strong>" + annAge + "세</strong>");
		$($("#annuityCustInfo").children()[2]).html("납입기간 : <strong>" + napTerm + "년</strong>");		
		var tag_rateInfo = '공시이율 : <strong>'+ arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a>';
		$("#li_rateInfo").html( tag_rateInfo );
		
		
		//	가변 서브탭
		var arrayPremium = [];
		for (var i = 0; i < arryData.length; i++) {
			arrayPremium.push(addCommas(parseInt(arryData[i].totPremium / 10000)));
		}
		makeSubTab($("#uiProReturnTab1"), arrayPremium);
		makeSubTab($("#uiProReturnTab2"), arrayPremium);
		
		//	보장내용
		annuityDetail1(arryData);
		
		//	해지환급금
		annuityDetail2(arryData);
	}
	
	function annuityDetail1(arryData) {
		var html = "";
		
		//	연금개시전
		for (var i = 0; i < arryData.length; i++) {
			html += '<table class="tbl-type3 data-type1" cellspacing="0" >' +
					'<caption>연금지급 개시 후 종신연금형</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr>' +
					'<th class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<td>10회 보증</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime10 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>20회 보증</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime20 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>30회 보증</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime30 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>100세 보증</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowAge100 / 10000)) + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#annuityGuarantee1").html(html);
		
		//	연금개시후
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			html += '<table class="tbl-type3 data-type1" cellspacing="0">' +
					'<caption>확정기간 연금형</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr>' +
					'<th class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<td>5년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear5 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>10년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear10 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>15년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear15 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>20년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear20 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>30년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear30 / 10000)) + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#annuityGuarantee2").html(html);
	}
	
	//	해지환급금
	function annuityDetail2(arryData) {
		var html = "";
		
		//	현재이율
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
					'<caption>현재공시이율 연복리' + arryData[i].nowRate + '%가정시 해지환급금</caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col" rowspan="3">기간</th>' +
					'<th scope="col" colspan="3">현재공시이율 연복리 ' + arryData[i].nowRate + '%가정시</th>' +
					'</tr>' +
					'<tr id="returnTitle1_1">' +
					'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr class="sub">' +
					'<th scope="col">보험료 누계</th>' +
					'<th scope="col">해지환급금</th>' +
					'<th scope="col">환급률</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="annuityTBody1_' + j + '">' +
					getProductReturnTable(arryData[i], 1) + 
					'</tbody>' +
					'</table>';
		}
		$("#annuityReturn1").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#annuityTBody1_" + j));
		}
		
		//	현재이율외 추가된 이율반영
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
			'<caption>평균공시이율 연복리' + arryData[i].stdRate + '%가정시 해지환급금</caption>' +
			'<thead>' +
			'<tr>' +
			'<th scope="col" rowspan="3">기간</th>' +
			'<th scope="col" colspan="3">평균공시이율 연복리 ' + arryData[i].stdRate + '%가정시</th>' +
			'</tr>' +
			'<tr id="returnTitle3_1">' +
			'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
			'</tr>' +
			'<tr class="sub">' +
			'<th scope="col">보험료 누계</th>' +
			'<th scope="col">해지환급금</th>' +
			'<th scope="col">환급률</th>' +
			'</tr>' +
			'</thead>' +
			'<tbody id="annuityTBody3_' + j + '">' +
			getProductReturnTable(arryData[i], 3) + 
			'</tbody>' +
			'</table>';
		}
		$("#annuityReturn3").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#annuityTBody3_" + j));
		}
		
		//	최저이율
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
					'<caption>최저보증이율 가정시 해지환급금</caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col" rowspan="3">기간</th>' +
					'<th scope="col" colspan="3">최저이율보증 가정시</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col">보험료 누계</th>' +
					'<th scope="col">해지환급금</th>' +
					'<th scope="col">환급률</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="annuityTBody2_' + j + '">' +
					getProductReturnTable(arryData[i], 2) + 
					'</tbody>' +
					'</table>';
		}
		$("#annuityReturn2").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#annuityTBody2_" + j));
		}
	}
	
	function iAnnuityReturnDetail(arryData) {
		//	고객정보
		var age = getInsuAgeByYmd(calculatorForm.contBirth);
		var annAge = calculatorForm.annuityAge;
		var napTerm = calculatorForm.payPeriod;
		var napTermType = "년";
		
		if(calculatorForm.payPeriod == '99'){
			napTerm = annAge - 3;
			napTermType = "세";
		}
		
		$($("#detailCustInfo").children()[0]).html("<li>납입기간 : <strong>" + napTerm + "</strong>" + napTermType + "</li>");
		$($("#detailCustInfo").children()[1]).html("<li>연금개시나이 : <strong>" + annAge + "</strong>세 기준(보험나이 <strong>" + age + "</strong>세)</li>");
		
//		$($("#iAnnuityCustInfo").children()[0]).html("<li>연금개시나이 : <strong>" + annAge + "</strong>세</li>");
//		$($("#iAnnuityCustInfo").children()[1]).html("<li>납입기간 : <strong>" + napTerm + "</strong>" + napTermType + "</li>");
//		$($("#iAnnuityCustInfo").children()[2]).html('<li class="sub">공시이율 : <strong>' + arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a></li>');

		$("#iAnnuityMonthlyPremiumTitleNew1").text( $("#iAnnuityMonthlyPremiumTitle1").text() );
		$($("#iAnnuityCustInfo").children()[1]).html("연금개시나이 : <strong>" + annAge + "세</strong>");
		$($("#iAnnuityCustInfo").children()[2]).html("납입기간 : <strong>" + napTerm + "년</strong>");		
		
		var tag_rateInfo = '공시이율 : <strong>'+ arryData[0].nowRate + '%</strong>기준<a href="#tipProCon13" class="icon-tip">공시이율이란?</a>';
		$("#li_rateInfo").html( tag_rateInfo );
		
		//	가변 서브탭
		var arrayPremium = [];
		for (var i = 0; i < arryData.length; i++) {
			arrayPremium.push(addCommas(parseInt(arryData[i].totPremium / 10000)));
		}
		makeSubTab($("#uiProReturnTab1"), arrayPremium);
		makeSubTab($("#uiProReturnTab2"), arrayPremium);
		
		//	보장내용
		iAnnuityDetail1(arryData);
		
		//	해지환급금
		iAnnuityDetail2(arryData);
	}
	
	function iAnnuityDetail1(arryData) {
		var html = "";
		
		//	종신연금형
		for (var i = 0; i < arryData.length; i++) {
			html += '<table cellspacing="0" class="tbl-type3 data-type1" summary="종신연금형 : 지급사유, 지급방식" >' +
					'<caption>연금지급 개시 후(종신연금형)</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr class="sub">' +
					'<th scope="col" class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<td>10회 보증</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime10 / 10000)) + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#iAnnuityGuarantee1").html(html);
	
		//	상속연금형
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			html += '<table cellspacing="0" class="tbl-type3 data-type1">' +
					'<caption>연금지급 개시 후(상속연금형)</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr class="sub">' +
					'<th scope="col" class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<td>생존시</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime20 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr class="sub">' +
					'<td>해지 또는 사망 일시금</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowTime30 / 10000)) + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#iAnnuityGuarantee2").html(html);
		
		//	종신연금 플러스형
		//	2017.02.20
		//	ERP가 제대로 돌아가면 원복
		var anutPymPrd0;
		var anutPymPrd1;
		var anutPymPrd2;
		var anutAmt0;
		var anutAmt1;
		var anutAmt2;
		
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			
			if (arryData[0].nowTimeArry.length == 0) {
				anutPymPrd0 = "";
				anutPymPrd1 = "";
				anutPymPrd2 = "";
				anutAmt0 = "";
				anutAmt1 = "";
				anutAmt2 = "";
			} else {
				anutPymPrd0 = arryData[i].nowTimeArry[0].anutPymPrd;
				anutPymPrd1 = arryData[i].nowTimeArry[1].anutPymPrd;
				anutPymPrd2 = arryData[i].nowTimeArry[2].anutPymPrd;
				anutAmt0 = addCommas(parseInt(arryData[i].nowTimeArry[0].anutAmt / 10000));
				anutAmt1 = addCommas(parseInt(arryData[i].nowTimeArry[1].anutAmt / 10000));
				anutAmt2 = addCommas(parseInt(arryData[i].nowTimeArry[2].anutAmt / 10000));
			}
			
			html += '<table cellspacing="0" class="tbl-type3 data-type1" summary="종신연금 플러스형 : 지급사유, 지급방식, 지급금액">' +
					'<caption>연금지급 개시 후(상속연금형)</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col" class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr class="sub">' +
					'<th scope="col" class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
//					'<td>' + arryData[i].nowTimeArry[0].anutPymPrd + '회 보증</td>' +
//					'<td>' + addCommas(parseInt(arryData[i].nowTimeArry[0].anutAmt / 10000)) + '만원</td>' +
					'<td>' + anutPymPrd0 + '회 보증</td>' +
					'<td>' + anutAmt0 + '만원</td>' +
					'</tr>' +
					'<tr>' +
//					'<td>' + arryData[i].nowTimeArry[1].anutPymPrd + '회 보증</td>' +
//					'<td>' + addCommas(parseInt(arryData[i].nowTimeArry[1].anutAmt / 10000)) + '만원</td>' +
					'<td>' + anutPymPrd1 + '회 보증</td>' +
					'<td>' + anutAmt1 + '만원</td>' +
					'</tr>' +
					'<tr>' +
//					'<td>' + arryData[i].nowTimeArry[2].anutPymPrd + '회 보증</td>' +
//					'<td>' + addCommas(parseInt(arryData[i].nowTimeArry[2].anutAmt / 10000)) + '만원</td>' +
					'<td>' + anutPymPrd2 + '회 보증</td>' +
					'<td>' + anutAmt2 + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#iAnnuityGuarantee3").html(html);
		
		//	확정기간 연금플러스형
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			html += '<table cellspacing="0" class="tbl-type3 data-type1" summary="확정기간 연금플러스형 : 지급사유, 지급방식, 지급금액">' +
					'<caption>확정기간 연금플러스형</caption>' +
					'<colgroup><col /><col style="width:50%;"/></colgroup>' +
					'<tbody>' +
					'<tr>' +
					'<th scope="col" rowspan="2">기준</th>' +
					'<th scope="col"class="datagroup">지급금액 예시</th>' +
					'</tr>' +
					'<tr class="sub">' +
					'<th scope="col" class="datagroup">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<td>5년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear5 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>10년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear10 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>15년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear15 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>20년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear20 / 10000)) + '만원</td>' +
					'</tr>' +
					'<tr>' +
					'<td>30년</td>' +
					'<td>' + addCommas(parseInt(arryData[i].nowYear30 / 10000)) + '만원</td>' +
					'</tr>' +
					'</tbody>' +
					'</table>';
		}
		$("#iAnnuityGuarantee4").html(html);
	}
	
	function iAnnuityDetail2(arryData) {
		var html = "";
		
		//	현재 이율
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
				    '<caption>기간별, 월금액별 보험료누계, 해지환급금, 환급률</caption>' +
				    '<thead>' +
				    '<tr>' +
				    '<th scope="col" rowspan="3">기간</th>' +
				    '<th scope="colgroup" colspan="3">현재공시이율 연복리 ' + arryData[i].nowRate + '%가정시</th>' +
				    '</tr>' +
				    '<tr>' +
				    '<th scope="colgroup" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
				    '</tr>' +
				    '<tr>' +
				    '<th scope="col">보험료 누계</th>' +
				    '<th scope="col">해지환급금</th>' +
				    '<th scope="col">환급률</th>' +
				    '</tr>' +
				    '</thead>' +
				    '<tbody id="iAnnuityTBody1_' + j + '">' +
				 	getProductReturnTable(arryData[i], 1) + 
				 	'</tbody>' +
				    '</table>';
		}
		$("#iAnnuityReturn1").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#iAnnuityTBody1_" + j));
		}

		//	현재이율외 추가된 이율반영
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
				    '<caption>기간별, 월금액별 보험료누계, 해지환급금, 환급률</caption>' +
				    '<thead>' +
				    '<tr>' +
				    '<th scope="col" rowspan="3">기간</th>' +
				    '<th scope="colgroup" colspan="3">평균공시이율 연복리 ' + arryData[i].stdRate + '%가정시</th>' +
				    '</tr>' +
				    '<tr>' +
				    '<th scope="colgroup" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
				    '</tr>' +
				    '<tr>' +
				    '<th scope="col">보험료 누계</th>' +
				    '<th scope="col">해지환급금</th>' +
				    '<th scope="col">환급률</th>' +
				    '</tr>' +
				    '</thead>' +
				    '<tbody id="iAnnuityTBody3_' + j + '">' +
				 	getProductReturnTable(arryData[i], 3) + 
				 	'</tbody>' +
				    '</table>';
		}
		$("#iAnnuityReturn3").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#iAnnuityTBody3_" + j));
		}		
		
		//	최저 이율
		html = "";
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			
			html += '<table cellspacing="0" class="tbl-type3 data-type2">' +
					'<caption>최저보증이율 가정시해지환급금</caption>' +
					'<thead>' +
					'<tr>' +
					'<th scope="col" rowspan="3">기간</th>' +
					'<th scope="col" colspan="3">최저이율보증 가정시</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col" colspan="3">월 ' + addCommas(parseInt(arryData[i].totPremium / 10000)) + '만원</th>' +
					'</tr>' +
					'<tr>' +
					'<th scope="col">보험료 누계</th>' +
					'<th scope="col">해지환급금</th>' +
					'<th scope="col">환급률</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody id="iAnnuityTBody2_' + j + '">' +
					getProductReturnTable(arryData[i], 2) + 
					'</tbody>' +
					'</table>'; 
		}
		$("#iAnnuityReturn2").html(html);
		
		for (var i = 0; i < arryData.length; i++) {
			var j = i + 1;
			addClassToDetailReturn($("#iAnnuityTBody2_" + j));
		}
	}
	
	function cookieCalc() {
		var nodapCookie = $.cookie("nodapCalcData");
		$.removeCookie("nodapCalcData", {path:"/"});
		if (typeof(nodapCookie) != "undefined" && nodapCookie !="") {

			var planData = JSON.parse(nodapCookie);
			
			getInsuranceInfo(planData.proType);
			calculatorForm.contGender = planData.contGender;
			calculatorForm.contBirth = planData.contBirth;
			calculatorForm.insuPeriod = planData.insuPeriod;
			calculatorForm.annuityAge = planData.annuityAge;
			calculatorForm.payPeriod = planData.payPeriod;
			calculatorForm.premium = planData.premium;
			calculatorForm.planType = "simple";
			
			calculatorCalc(planData.proType, true);
			
			return true;
		}
		
		var planCookie = $.cookie("planData");
		$.removeCookie("planData", {path:"/"});
		if (typeof(planCookie) != "undefined" && planCookie !="") {
			var planData = JSON.parse(planCookie);
			
			calculatorForm = planData;
			calculatorForm.planType = "simple";
			calculatorCalc(planData.proType, true);
			
			return true;
		}
		return false;
	}
	
	function savePlanCalc() {
		var cookie = $.cookie("savePlanData");
		var planData;
		$.removeCookie("savePlanData",{path:'/'});
		if (typeof(cookie) != "undefined") {
			planData = $.parseJSON(cookie);
			
			if (planData.proType != "") {
				
				getInsuranceInfo(planData.proType);
				calculatorForm.planType = "free";
				calculatorForm.contBirth = planData.birth;
				calculatorForm.contGender = planData.gender;
				calculatorForm.payPeriod = planData.napTerm;
				
				switch (planData.proType) {
					case M_PRODUCT_CANCER:
						calculatorForm.insuPeriod = planData.insTerm;
						calculatorForm.mainContAmt = parseInt(planData.gVal1 + "0000") / 2;
						calculatorForm.treatyContAmt = parseInt(planData.gVal4 + "0000");
						break;
					case M_PRODUCT_TERM:
						calculatorForm.insuPeriod = planData.insTerm;
						calculatorForm.padPrdTypCd = planData.napType;
						calculatorForm.insrPrdTypCd = planData.insType;
						calculatorForm.freeCont = planData.deathAmt + "0000";
						break;
					case M_PRODUCT_ACCIDENT:
						break;
					case M_PRODUCT_ESAVING:
						break;
					case M_PRODUCT_ANNUITY:
						break;
					case M_PRODUCT_IANNUITY:
						break;
					case M_PRODUCT_VARIABLESAVING:
						break;
					case M_PRODUCT_MEDICAL_A1:
					case M_PRODUCT_MEDICAL_A2:
					case M_PRODUCT_MEDICAL_B1:
					case M_PRODUCT_MEDICAL_B2:
					case M_PRODUCT_MEDICAL_C1:
					case M_PRODUCT_MEDICAL_C2:
					case M_PRODUCT_MEDICAL_D1:
					case M_PRODUCT_MEDICAL_D2:
						break;
					case M_PRODUCT_DENTAL:
						break;
				}
				
				calculatorCalc(insuranceType, true);
			}
		}
	}
	
	function setCalcDisplay() {
		var cookieObj = $.cookie("resultCalcData");
		if (typeof(cookieObj) != "undefined") {
			calculatorForm = $.parseJSON($.cookie("resultCalcData"));
			
			if (calculatorForm.proType == insuranceType) {
				//	계산기에서 계산후 여기서 디스플레이
				calculatorSetResultData(insuranceType, resultCB);
				
				if (insuranceType == M_PRODUCT_CANCER || insuranceType == M_PRODUCT_TERM) {
					savePlanCalc();
				}
			}
		}
	}
	
	var paramData;
	
	function mobileParameterCalc(type, data) {
		if (typeof(data) != "undefined") {
			paramData = data;
			
			getInsuranceInfo(type);
			calculatorForm.planType = "simple";
			calculatorForm.contBirth = data.contBirth;
			calculatorForm.contGender = data.contGender;
			calculatorForm.payPeriod = data.payPeriod;
			
			switch (type) {
				case "1":
					calculatorForm.insuPeriod = data.insuPeriod;
					break;
				case "2":
					calculatorForm.insuPeriod = data.insuPeriod;
					
					if (calculatorForm.insuPeriod > 20) {
						calculatorForm.insrPrdTypCd = "02";
					} else {
						calculatorForm.insrPrdTypCd = "01";
					}				
					
					if (calculatorForm.payPeriod == 99) {
						calculatorForm.payPeriod = calculatorForm.insuPeriod;
						calculatorForm.padPrdTypCd = "02";
					} else {
						calculatorForm.padPrdTypCd = "01";
					}
					break;
				case "3":
					calculatorForm.insuPeriod = data.insuPeriod;
					break;
				case "4":
					calculatorForm.insuPeriod = data.insuPeriod;
					calculatorForm.premium = data.contAmt;
					break;
				case "5":
					calculatorForm.annuityAge = data.annuityAge;
					calculatorForm.premium = data.contAmt;
					break;
				case "7":
					calculatorForm.annuityAge = data.annuityAge;
					calculatorForm.premium = data.contAmt;
					break;
				case "8":
					calculatorForm.insuPeriod = data.insuPeriod;
					calculatorForm.premium = data.contAmt;
					break;
				case "9":
				case "10":
				case "11":
				case "12":
				case "13":
				case "14":
				case "16":
				case "17":
					setMedicalConditionForKakao(data);
					calculatorForm.insuPeriod = data.insuPeriod;
					calculatorForm.premium = data.contAmt;
					calculatorForm.mdcrRcbfrYn = data.mdcrRcbfrYn;
					calculatorForm.treatyList = data.treatyList;
					
					break;	
				case "50":
					calculatorForm.insuPeriod = data.insuPeriod;
					break;
				case "51":
					calculatorForm.insuPeriod = data.insuPeriod;
					break;
				case "15":
					calculatorForm.insuPeriod = data.insuPeriod;
					calculatorForm.payPeriod = data.payPeriod;
					calculatorForm.annuityAge = "0";
					calculatorForm.premium = "";
					calculatorForm.treatyContAmt = "";
					calculatorForm.eventId = "";
					calculatorForm.eventUrl = "";
					calculatorForm.isAnnuity = "N";
					calculatorForm.isVariable = "N";
					calculatorForm.mainContAmt = data.contAmt;
					calculatorForm.planSubType = data.subPlabType;
					calculatorForm.planType = "simple";
					calculatorForm.treatyList = data.treatyList;
					break;
			}
			
			var urlStr;
			switch (type) {
				case M_PRODUCT_CANCER:
					urlStr = "/m/cancerCalc.eds";
					break;
				case M_PRODUCT_TERM:
					urlStr = "/m/termCalc.eds";
					break;
				case M_PRODUCT_ACCIDENT:
					urlStr = "/m/accidentCalc.eds";
					break;
				case M_PRODUCT_ESAVING:
					urlStr = "/m/esavingCalc.eds";
					break;
				case M_PRODUCT_ANNUITY:
					urlStr = "/m/annuityCalc.eds";
					break;
				case M_PRODUCT_IANNUITY:
					urlStr = "/m/iAnnuityCalc.eds";
					break;		
				case M_PRODUCT_VARIABLESAVING:
					urlStr = "/m/variableSavingCalc.eds";
					break;
				case M_PRODUCT_P_ACCIDENT1:
				case M_PRODUCT_P_ACCIDENT2:
				case M_PRODUCT_P_ACCIDENT3:
					urlStr = "/m/pAccidentCalc.eds";
					break;
				case M_PRODUCT_MEDICAL_A1:
				case M_PRODUCT_MEDICAL_A2:
				case M_PRODUCT_MEDICAL_B1:
				case M_PRODUCT_MEDICAL_B2:
				case M_PRODUCT_MEDICAL_C1:
				case M_PRODUCT_MEDICAL_C2:
				case M_PRODUCT_MEDICAL_D1:
				case M_PRODUCT_MEDICAL_D2:
					var selectedInsuStr = getSelectedInsuListForMobile();
					calculatorForm.selectedInsuList = selectedInsuStr;
					urlStr = "/m/medicalCalc.eds";
					break;					
				case M_PRODUCT_DENTAL:
					urlStr = "/m/dentalCalc.eds";
					break;
			}
			
			resultCB(false);
			showLoadingDialog(true);
			$.ajax({
				type : "POST",
				url : urlStr,
				data : JSON.stringify(calculatorForm),
				dataType : 'json',
				success : function(result) {
					if (result.success) {
						calculatorSetResultData(type);
						
						//차이 스크립트(보험료 계산하기) 17.12.22
						var fbqValue = "mobileProductCalculator";
						if((type=="1")||(type=="2")){
							fbqValue = result.arryData[1].totPremium;
						}else if(type=="3"){
							fbqValue = result.arryData[1].padSmtotPrm;
						}else if((type=="4")||(type=="5")||(type=="7")|| (type=="8") ||
								(type=="9")||(type=="10")||(type=="11")||(type=="12")||(type=="13")||(type=="14")||(type=="16")||(type=="17")){
							fbqValue = result.arryData[0].totPremium;
						}
						fbq('track', 'ViewContent', {
							value: fbqValue.toString(),
							currency: 'KRW',
						});
						chai_at._chai_conv('', '', '', '', '', '', '', 1, result.arryData[0].inputObj.prdtnm, '', '', '0'); //큐브
						dablena('track', 'ViewContent');
						window._tfa = window._tfa || [];
					    _tfa.push({ notify: 'action',name: 'cv_quote' });
					  //어도비스크립트 변수 세팅 보험료계산수(e21)
					    var adobeTrackParam = {
					    		gender : calculatorForm.contGender,
					    		age : getInsuAgeByYmd(calculatorForm.contBirth),
					    		prdtName : calculatorForm.prdtnm,
					    		premium : fbqValue.toString(),
					    		payType : ''
					    };
					    adbCalcPremium(adobeTrackParam, type);
						//차이 스크립트(보험료 계산하기) 17.12.22
					} else {
						alert(result.message);
					}
				},
				beforeSend : function() {},		
	 			complete : function() {
	 				
	 				if (paramData.prdtType == M_PRODUCT_DENTAL) {
	 					if (paramData.contGender == 1) {
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
		 				
		 				$("#birthday").val(paramData.contBirth);
		 				
						showSubscribe(true);
	 				}
	 				
	 				
	 				if (paramData.prdtType == M_PRODUCT_CANCER || paramData.prdtType == M_PRODUCT_TERM) {
	 					calculatorForm.planType = "free";
	 					
	 					if (paramData.prdtType == M_PRODUCT_CANCER) {
	 						calculatorForm.mainContAmt = paramData.contAmt;
							calculatorForm.treatyContAmt = paramData.contAmtSp;
	 					}
	 					
	 					if (paramData.prdtType == M_PRODUCT_TERM) {
	 						calculatorForm.freeCont = paramData.contAmt;
	 					}
		 				
						$.ajax({
		 					type : "POST",
		 					url : urlStr,
		 					data : JSON.stringify(calculatorForm),
		 					dataType : 'json',
		 					success : function(result) {
		 						if (result.success) {
		 							calculatorSetResultData(type);
		 						} else {
		 							alert(result.message);
		 						}
		 						showLoadingDialog(false);
		 						resultCB(true);
		 					}
		 				});
	 				} else {
	 					showLoadingDialog(false);
 						resultCB(true);
	 				}
	 				
	 				setInsuType();
	 			},		
				error : function() {}
			});
		}
	}
	
	function setActiveInput($obj, isOn, disable){
		if(isOn){
			$obj.closest('.form-wrap3').removeClass('disable').closest('li').addClass('input-chk');
		}else{
			$obj.closest('li').removeClass('input-chk');
		}
		
		if(typeof disable != 'undefined' && disable == true){
			$obj.closest('.form-wrap3').addClass('disable');
		}
	}
	
	function moveToCalculator(isReCalculate){
		if(typeof isReCalculate === 'undefined'){
			isReCalculate = true;
		}
		
		var topVal = $('#productCalculator').offset().top;
		var fn_goToCalculator = function(){
			$('html,body').animate({scrollTop : topVal}, 400);
		};
		
		if(isReCalculate){
			fn_goToCalculator();
			if( typeof insuranceType !== "undefined" && null != insuranceType && "" != insuranceType ){
				if( insuranceType == M_PRODUCT_ANNUITY ){
					$("#li_annAge").show();
					$("#li_napTerm").show();
					$("#napMoney1").parent().parent().show();
				}
				else if( insuranceType == M_PRODUCT_ESAVING ){
					$("#radio_esaving_ins").show();
					$("#radio_esaving_nap").show();
					$("#napMoney2").parent().parent().show();
				}
				else if( insuranceType == M_PRODUCT_IANNUITY ){
					$("#li_annAge").show();
					$("#li_napTerm").show();
					$("#napMoney1").parent().parent().show();
				}
			}
		}else{
			if(!$('div.product-result').hasClass('open')){
				fn_goToCalculator();
			}
		}
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
	
	function getSelectedInsuListForMobile() {
		var selji = "selji"; //질병입원
		var seljt = "seljt"; //질병통원
		var selsi = "selsi"; //상해입원
		var selst = "selst"; //상해통원
		
		var seljiDeType = $("#"+selji).val();
		var seljtDeType = $("#"+seljt).val();
		var selsiDeType = $("#"+selsi).val();
		var selstDeType = $("#"+selst).val();
		
		// 9  질병입원형(표준형)
		// 10 질병입원형(선택형Ⅱ)
		// 11 질병통원형(표준형)
		// 12 질병통원형(선택형Ⅱ)
		// 13 상해입원형(표준형)
		// 14 상해입원형(선택형Ⅱ)
		// 16 상해통원형(표준형)
		// 17 상해통원형(선택형Ⅱ)
		var selectedProductType = "";
		if( seljiDeType != "-999" ){
			if( selectedProductType == "" ){
				selectedProductType = seljiDeType;
			} else {
				selectedProductType += "|" + seljiDeType;
			} 
		}
		if( seljtDeType != "-999" ){
			if( selectedProductType == "" ){
				selectedProductType = seljtDeType;
			} else {
				selectedProductType += "|" + seljtDeType;
			} 
		} 
		if( selsiDeType != "-999" ){
			if( selectedProductType == "" ){
				selectedProductType = selsiDeType;
			} else {
				selectedProductType += "|" + selsiDeType;
			} 
		} 
		if( selstDeType != "-999" ){
			if( selectedProductType == "" ){
				selectedProductType = selstDeType;
			} else {
				selectedProductType += "|" + selstDeType;
			} 
		}
		return selectedProductType;
	}
	
	function checkMainInsuForMedicalMobile(){
		var selectedInsuStr = getSelectedInsuListForMobile();
		
		if( "" == selectedInsuStr ){
//			var optionVal1 = $("#"+obj.id).children().eq(0).val();
//			$("#"+obj.id).val(optionVal1);
//			$("#"+obj.id).focus();
			alert("주 보험은 하나이상 선택해야 합니다.");
			return;
		}
		
		
	}
	
	function setDefSelectBoxForMobile() {
		
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
		
		// 상해형 납입주기 연납
		var isYearPay = isPayPeriodYearForMedicalMobile();
		if(isYearPay){
			calculatorForm.payPeriod = "12";
		} else {
			calculatorForm.payPeriod = "1";
		}
		
		insuranceType = selectedInsuArr[0];
	}
	
	function changeMedicalMainInsuForMobile(obj){
		
		var selectedProductType = getSelectedInsuListForMobile();
		
		if( "" == selectedProductType ){
			var optionVal1 = $("#"+obj.id).children().eq(0).val();
			$("#"+obj.id).val(optionVal1);
			$("#"+obj.id).focus();
			alert("주 보험은 하나이상 선택해야 합니다.");
			return;
		}
		
		//setInsuType();
		
		var selectedInsuArr = selectedProductType.split("|");
		insuranceType = selectedInsuArr[0];
		getInsuranceInfo(insuranceType);
		$('#switchReCalc').show();
	}
	
	function setMedicalConditionForKakao(result){
		insuranceType = result.prdtType;
		getInsuranceInfo(insuranceType);
		
		calculatorForm.planType = "simple";
//		calculatorForm.planType = "free";
		calculatorForm.contBirth = result.contBirth;
		calculatorForm.contGender = result.contGender;
		calculatorForm.payPeriod = result.payPeriod;
		
		

		calculatorForm.proType = insuranceType;
//		calculatorForm.prcd = matchMainInsuPrcdForKaKao();
		$("input[name=pgender]:input[value="+calculatorForm.contGender+"]").click();
		$("#birthday").val(calculatorForm.contBirth);
		$("input[name=mdcrRcbfrYn]:input[value="+result.mdcrRcbfrYn+"]").click();
		//$("#insTerm").val(result.insuPeriod);
		
		var selBoxStr = genMedicalSelBoxInsuListStrForMobile(insuranceType, result.treatyList);
		var selBoxArr = selBoxStr.split("|");
			
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
		
		for(var i=0; i<selBoxArr.length; i++){
			var defInsuType = selBoxArr[i];
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
		
//		calculatorForm.insuPeriod = $("#insTerm").val();
//		calculatorForm.proType1 = $('#proType1').val();
//		calculatorForm.proType2 = $('input[name=proType2]:checked').val();
//		calculatorForm.mdcrRcbfrYn = $('input[name=mdcrRcbfrYn]:checked').val();
	}
	
	function genMedicalSelBoxInsuListStrForMobile( prdtType, treatyList ){
		
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
	
	// 저축보험 보험기간 라디오 버튼 초기화 세팅
	function esavingInitRadioInsTerm(insTermValue){
		for(var i=1; i<=$("input[name=esab_day1]").length; i++){
			if(insTermValue == $("#esabDay1_"+i).val()){
				$("#esabDay1_"+i).click();
				return;
			}
		}
	}
	
	// 저축보험 납입기간 라디오 버튼 초기화 세팅
	function esavingInitRadioNapTerm(){
		for(var i=1; i <= $("input[name=esaving_nday1]").length; i++){
			if($("#napTerm").val() == $("#esanDay2_"+i).val() ){
				$("#esanDay2_"+i).click();
				break;
			}
		}
	}
	
	// 저축보험 보험기간에 따라 납입기간 라디오버튼 비활성화
	function esavingDisableRadioNapTerm(napTermArray){
		$("input[name=esaving_nday1]").prop("disabled", "disabled");
		$("input[name=esaving_nday1]").prev().addClass("disabled");
		$.each(napTermArray, function(index,value){
			for(var i=1; i <= $("input[name=esaving_nday1]").length; i++){
				if(value.padPrdTypVal == $("#esanDay2_"+i).val() ){
					$("#esanDay2_"+i).prop("disabled", false);
					$("#esanDay2_"+i).prev().removeClass("disabled");
					break;
				}
			}
		});
	}
	
	// 라디오값 전달 
	function setEsavingInsTermRadioToSel(){
		$("#insTerm").val( $("input[name=esab_day1]:checked").val() );
	}
	
	function setEsavingNapTermRadioToSel(){
		$("#napTerm").val( $("input[name=esaving_nday1]:checked").val() );
	}
	
	function fn_ChangeSelImplantForMobile(){
		setCalculatorEvent();
		calc_logging("m_dental_free");
		
		calculatorForm.planType = "free";
		calculatorForm.selImplantStr = $("#selImplant").val();
		calculatorCalc(insuranceType);
		
		var topVal = $('#productCalculator').offset().top;
		$('html,body').animate({scrollTop : topVal}, 400);
	}

	function fn_clickGoSubscribe(){
		var selSubTyp = $("#ulPlanSubType>li.on").val()-1;
		goSubscribe(insuranceType, selSubTyp);
	}
	
	function fn_setImplantTag(html, guarantee, selectedSubType){
		var implantVal = getDentalTreatyPreimum(guarantee, "임플란트");
		var selImplantOpt = $("#selImplant option");
		var isInclude = false;
		
		var implArr = ["50", "100", "150", "200"];
		
		for( var implIdx=0; implIdx < implArr.length; implIdx++ ){
			var selImplantOptVal = implArr[implIdx];
			if( implantVal == selImplantOptVal ){
				isInclude = true;
				break;
			}
		}
		
		if( selectedSubType != "2" || isInclude == false ){
			html += '<li><strong>' + getDentalTreatyPreimum(guarantee, "임플란트") + '</strong><span>만원</span></li>';
			$("#mainInsuResult1").html(html);
		} else {
			
			html += '<li>' + 
						'<div>' +
							'<span class="select-box" id="implDiv">'+ 
								'<select class="select2" id="selImplant" onchange="fn_ChangeSelImplantForMobile();">';			
			
			for( var i=0; i < implArr.length; i++ ){
				var id_str = "standard" + implArr[i];
				var value_str = implArr[i];
				var html_str = implArr[i];
				var tag_str = '<option id=' + id_str + ' value=' + value_str + '>'+ html_str +'</option>';
				html += tag_str;
			}
			
			html +=				'</select>'+
								'만원' +
							'</span>' + 
						'</div>' +
					'</li>';			
			
			
//			html += '<li>' + 
//						'<div>' +
//							'<span class="select-box" id="implDiv">'+ 
//								'<select class="select2" id="selImplant" onchange="fn_ChangeSelImplantForMobile();">' +
//									'<option id="standard50" value="50">50</option>' +
//									'<option id="standard100" value="100">100</option>' +
//									'<option id="standard150" value="150">150</option>' +
//									'<option id="standard200" value="200">200</option>' +
//								'</select>'+
//								'만원' +
//							'</span>' + 
//						'</div>' +
//					'</li>';
		}
		
		return html;
	}
	
	function fn_kakaoCheck() {
		var kakaoFlag = false;
		if( typeof kakaoCheck != "undefined" && kakaoCheck != "" ){
			kakaoFlag = true;
		} else {
			kakaoFlag = false;
		}
		return kakaoFlag;
	}
	
	function fn_changeCookieData() {
		var cookieData1 = $.parseJSON($.cookie("resultCalcData"));
		$.removeCookie("resultCalcData", {path:"/"});
		$.cookie("resultCalcData", JSON.stringify(calculatorForm), {path:'/'});
	}
	
	function fn_checkAgeForDental(calculatorForm) {
		var ageForDental = getFullAgeByYmd(calculatorForm.contBirth);
		if( (ageForDental < parseInt(calculatorStaAge)) || ( ageForDental > parseInt(calculatorEndAge) ) ){
			alert("고객님은 " + ageForDental + "세 입니다. \n\n인터넷치아보험 가입나이는 "+ parseInt(calculatorStaAge) + "세 ~ "+ parseInt(calculatorEndAge) + "세 입니다. ");
			return false;
		} else {
			return true;
		}		
	}
	
	
	function fn_linkPromotionProdFroMobile(obj){
		var browserUrlStr = window.location.href;
		var splStr = $(obj).attr("hrefStr").split("?")[1];
		location.href = $(obj).attr("hrefStr") + browserUrlStr.split(splStr)[1];
		//#productTab2
	}
	
	function fn_detailPlanContentShowHide(){
		var classStr = $("#detPlanCont").attr("class");
		if( typeof classStr !== "undefined" && null != classStr && "" != classStr ){
			if( classStr == "learn_more active" ){
				$("#detPlanCont").attr("class", "learn_more");
			} else {
				$("#detPlanCont").attr("class", "learn_more active");
			}
		}
	}	

	function fnCalcBonusAmount(){
		var amount = 0;
		var annAge = $("#annAge").find("option:selected").val();
		var napPeriod = 0;
		var insuAge = getInsuAgeByYmd($("#birthday").val());
		var insuPeriod = parseInt(annAge) - insuAge;
		var napPrm = $("#napMoney1").val();
		//납입기간 세팅
		if($("#napTerm").find("option:selected").val() == "99"){
			// 납입기간이 (연금개시나이-3)세납일때
			napPeriod = annAge - insuAge - 3;
		}else{
			napPeriod = $("#napTerm").find("option:selected").val();
		}
		// 납입금액 * 만 * 12개월 * 납입기간 = 기납입보험료 // 기납입보험료 * 3.5%
		//amount = napPrm * 10000 * 12 * napPeriod / 100 * 3.5;
		amount += fnCalcBonus5(napPeriod, napPrm, insuPeriod) + fnCalcBonus10(napPeriod, napPrm, insuPeriod) 
			+ fnCalcBonusAnnAge(napPeriod, napPrm, insuPeriod);
		$("#spanBonusAmount").html(addCommas(Math.floor(amount)));
	}
	
	function fnCalcBonus5(napPeriod, napPrm, insuPeriod){
		var bonus5 = 0;
		if(insuPeriod >= 5){
			if(napPeriod < 5){
				bonus5 += napPrm * 10000 * 12 * napPeriod / 100 * 1;
			}else{
				bonus5 += napPrm * 10000 * 12 * 5 / 100 * 1;
			}
		}		
		return Math.floor(bonus5);
	}
	
	function fnCalcBonus10(napPeriod, napPrm, insuPeriod){
		var bonus10 = 0;
		if(insuPeriod >= 10){
			if(napPeriod < 10){
				bonus10 += napPrm * 10000 * 12 * napPeriod / 100 * 2;
			}else{
				bonus10 += napPrm * 10000 * 12 * 10 / 100 * 2;
			}
		}
		return Math.floor(bonus10);
	}
	
	function fnCalcBonusAnnAge(napPeriod, napPrm, insuPeriod){
		var bonusAnnAge = 0;
		if(insuPeriod > 10){
			var rateMaintenance = (insuPeriod-10)<20 ? insuPeriod-10 : 20;
			bonusAnnAge += napPrm * 10000 * 12 * napPeriod / 100 * rateMaintenance * 35 / 100;			
		}
		return Math.floor(bonusAnnAge);
	}