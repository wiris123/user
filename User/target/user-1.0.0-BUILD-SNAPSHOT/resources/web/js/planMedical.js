	var maxGeneral = 3000;
	var maxLarge   = 6000;
	var maxSmall   = 360;
	var maxDeath   = 9000;
	
	var isCookieCalc = false;
	var recentPlanId;
	
	// 암 보험기간, 납입기간 PF 세팅후 
	// inputObj 가 있을 경우는 세션에서 들어왔을때 처리함 (계산처리는 안함)
	// inputObj 가 없을 경우는 파라메터(email)가 있는경우 해당정보를 DB에서 가져와 세팅하고 계산처리함.
	// inputObj 가 없을 경우 + 파라메터가 없는경우는 기본 사용자 로직 처리함.
	var medicalCBInsTerm = function (inputObj) {
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
				insHtml += '<option value="' + value.insrPrdTypVal + '">보험기간 : ' + value.insrPrdTypVal+valTxt + '</option>';
			});
		} else {
			insHtml = "<option>보험기간</option>";
		}
		
		$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		
		if (insTermArray.length == 1) {
			$("#insTerm").attr("disabled", true);
			$('#insTerm').parent().addClass('select-fixed');
		}
		
		if( typeof(inputObj) !== "undefined" ){
			if( typeof(inputObj.selectedInsuList) !== "undefined" && "" != inputObj.selectedInsuList ){
				var selTempInsuStr = inputObj.selectedInsuList;
				var selTempInsuArr = selTempInsuStr.split("|");
				
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
				
				var isYearPay = true;
				//연납, 월납 판단
				for( var i=0; i<selTempInsuArr.length; i++ ){
					var selectedProdId = selTempInsuArr[i];
					if( selectedProdId == "-999" ){
						continue;
					} else {
						if( selectedProdId == "9" || selectedProdId == "10" || selectedProdId == "11" || selectedProdId == "12" ){
							isYearPay = false;
							break;
						}
					}
					
				}
				
				var $premiumUnit = $('span[id^=monthlyPremium1]').prev();
				if( isYearPay ){
					$premiumUnit.text('연납');
				} else {
					$premiumUnit.text('월납');
				}
				
			}
		}

		
		//특약정보 리스트
		var treatyArrayIdx = [];		// 보험기간 배열 인덱스
		var treatyArray = [];			// 보험기간 배열
		/*$.each(pITrtyListPrtElemVO, function(index, value){
			if ($.inArray(value.insrNm, treatyArrayIdx) === -1){
				treatyArrayIdx.push(value.insrNm);
				treatyArray.push(value);
			}
		});*/
		//	2017.07.26
		$.each(treatyInfoList, function(index, value){
			if ($.inArray(value.insuName, treatyArrayIdx) === -1){
				treatyArrayIdx.push(value.insuName);
				treatyArray.push(value);
			}
		});
		
		var inputTreatyList = new Array();
		
		if(typeof inputObj != 'undefined'){
			$.each(inputObj.treatyList, function(i, v){
				inputTreatyList.push(v.insCd);
			});
		}
		
		var treatyHtml = "";
		var treaty2Html = "";
		var i = 1;
		if (treatyArray.length != 0 && treatyArray[0].msgCd != "ERROR1") {
			$.each(treatyArray, function(index, value) {
				var txtOnClass = '';
				var txtOnProp = '';
				
				if($.inArray(value.uiCode, inputTreatyList) > -1){
					txtOnClass = ' class="on"';
					txtOnProp = ' checked="checked"';
				}
				
				treatyHtml +='<li>'
							+'	<span>' + value.insuName.replace(" 실손의료비보장특약D(갱신형,무배당)", "") + '</span>'
							+'	<span class="label-check">'
							+'		<label for="treaty1-' + i + '"' + txtOnClass + '>선택</label>'
							+'		<input type="checkbox" class="check" id="treaty1-' + i + '" name="treatyList1" value="' + value.uiCode + '" title="특약리스트" onclick="setReCalculator()"' + txtOnProp + '/>'
							+'	</span>'
							+'</li>';
				
				treaty2Html +='<li>' + value.insuName.replace(" 실손의료비보장특약D(갱신형,무배당)", "") + '</li>';
				i++;
			});
		}
		$("#treatyList1").html(treatyHtml);	// 특약리스트 세팅
		//$("#treatyList2").html(treaty2Html);	// 특약리스트 세팅
	
		if (typeof(inputObj) == "undefined") {
			/*
			// 이메일로 타고 왔을때
			// 최근설계내역 찍고 올경우
			if (paramUsed && paramData != null) {
				medicalMakeNapTerm();
				
				paramData = null;
				//바로가입하기 1
				medicalPlanCalc("simple");

				isCookieCalc = true;
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
			*/
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);

			//medicalMakeNapTerm();
			$("#napTerm").val(inputObj.payPeriod);
			
			//	세부 고객정보 세팅
			//medicalSetCustInfo();
			showResultDiv(true, calculatorCheckEvent);
		}
		
		if(gv_treatyList != ''){
			setRecentTreatyList();
		}
	};
	
	function setRecentTreatyList(){
		if(typeof gv_treatyList != 'undefined'){
			var treatyList = gv_treatyList.split('&');
			
			$("#treatyList1").find('input[name=treatyList1]').each(function(){
				$(this).prop('checked', false).prev().removeClass('on');
			});
			
			for(var i=0; i<treatyList.length; i++){
				$("#treatyList1").find('input[value=' + treatyList[i] + ']').prop('checked', true).prev().addClass('on');
			}
		}
		
		setTreatyList2();
		
		gv_treatyList = '';
	}
	
	//	PF 연동 - 보험기간
	function medicalGetInsuranceTerm(date, slpCode, birth, gender) {
		
		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		if(insuranceType=='13' || insuranceType =='14'){
			$('#payPeriod').val('12');
		}
		selPrdtCdInfoByPrcd(jsonData, medicalCBInsTerm);
	}
	
	//	PF 연동 - 세션체크
	function medicalCheckSession(inputObj, date) {
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		selPrdtCdInfoByPrcd(jsonData, medicalCBInsTerm, inputObj);
	}
		
	function medicalMakeNapTerm() {
		
		// 선택한 보험기간 값
		var insValue = $("#insTerm").find('option:selected').val();
		
		if (insValue != '') {
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
			if (napTermArray.length != 0) {
				$.each(napTermArray, function(index, value){
					
					napHtml += '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
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
				napHtml = "<option>납입기간</option>";
				$("#napTerm").html(napHtml);
			}
			
			if ($("#napTerm").children().size() == 1) {
				$("#napTerm").attr("disabled", true);
				$('#napTerm').parent().addClass('select-fixed');
			}
		}
	}
	
	// 가입설계 계산 (간단, 자유)
	function medicalPlanCalc(type, callback) {
		// 가입설계 계산 
		var frm = $("#frm")[0];
		
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		var payPeriod = frm.payPeriod.value;
		
		var treatyList = $(":checkbox[name^='treatyList1']:checked");
		var data = "";
		
		for(var i=0; i<treatyList.length; i++) {
			if(i>0) data += "&";
			data += treatyList.eq(i).val();
		}
		
		frm.planType.value = type;
		frm.treatyList.value = data;
		
		// 폼세팅
		if (!medicalSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		
		// 실손상품개정 by syi
		var selectedInsuList = getSelectedInsuList();
//		var selectedInsuList = "9|11|13|16";
		jsonData.selectedInsuList = selectedInsuList;
		
		showLoadingDialog(true);
		$.ajax({
			type : "POST",
			url : "/medicalCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {
				
				if (result.success) {
					sendPromotionCallback();
					//	2017.07.26
					//	진대리 질문
					//setCalcLog();
					medicalSetCustInfo();
					//바로가입하기 2
					medicalSetResult(result);
					showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.premium,
					    currency: 'KRW',
					  });
					chaiConv('1', result.arryData[0].inputObj.prdtnm);
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
				    //어도비스크립트 변수 세팅 보험료계산수(e21), 보험료재계산수(e65)
				    var adobeTrackParam = {
				    		gender : ($("input[name=pgender]:checked").val() == "1")?"남자":"여자",
				    		age : getInsuAgeByYmd(contBirth),
				    		prdtName : result.arryData[0].inputObj.prdtnm,
				    		premium : result.premium,
				    		payType : '월납'
				    };
				    if(type == "free"){
				    	adobeTrackParam.insuPeriod = insuPeriod;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.premium;
				    	adbMedicalReCalc(adobeTrackParam);
				    }else{
				    	adbMedicalCalc(adobeTrackParam);
				    }
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
				paramUsed = false;
			},
			beforeSend : function() {},		
 			complete : function() {
 				// 최근설계에서 바로가기 실행시 
 				// 기본계산 및 자유계산 체크여부를 확인한다.
				if (isCookieCalc){
					// 최근설계 적재 안함
					isRecentPlanSave = false;
					var planCookie = getPlanCookie(recentPlanId);
					
					//alert(planCookie + ' : ' +   planCookie.planType);
					// 자유계산을 한경우만 재계산을 다시 한다. 
					if (planCookie !="" && planCookie.planType == "free"){
						$("#mainContAmt").val(parseInt(planCookie.gVal1) / 2 + "0000");
						$("#treatyContAmt").val(planCookie.gVal4 + "0000");

						medicalPlanCalc('free');
						isCookieCalc = false;
						
						$("#reCalcPrice1").val($("#mainContAmt").val());
						
						// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
						var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
						medicalInitSelect(generalVal);

						$("#reCalcPrice2").val($("#treatyContAmt").val());
					}
					
					var mainPlanData = $.cookie("mainPlanData");
					if (typeof(mainPlanData) != "undefined" && mainPlanData !="" ){
						var mainPlanDataObj = $.parseJSON($.cookie("mainPlanData"));
						// 자유계산을 한경우만 처리
						if (mainPlanDataObj.planType == "free"){
							$("#mainContAmt").val(mainPlanDataObj.mainContAmt);
							$("#treatyContAmt").val(mainPlanDataObj.treatyContAmt);
							//바로가입하기 3
							medicalPlanCalc('free');
							isCookieCalc = false;
							
							$("#reCalcPrice1").val($("#mainContAmt").val());
							
							// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
							var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
							medicalInitSelect(generalVal);

							$("#reCalcPrice2").val($("#treatyContAmt").val());
						}
					}
				}
				$.removeCookie("mainPlanData",{path:'/'});
				
				if(callback){
 					callback();
 				}
 			},		
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		ga('send','event','Direct','Calculation','medical_top',1);
		NCDC_LOAD();
		goog_report_conversion();
		
	}
	
	function medicalPlanCalcFromDirect() {
		// 가입설계 계산 
		var frm = $("#frm")[0];
		
		var contBirth = paramData.contBirth;
		var contGender = paramData.contGender;
		var insuPeriod = paramData.insuPeriod;
		var payPeriod = paramData.payPeriod;
		
		frm.planType.value = "free";
		frm.treatyList.value = gv_treatyList;
		
		// 폼세팅
		if (!medicalSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		
		// 실손상품개정 by syi
		var selectedInsuList = getSelectedInsuList();
//		var selectedInsuList = "9|11|13|16";
		jsonData.selectedInsuList = selectedInsuList;
		
		showLoadingDialog(true);
		$.ajax({
			type : "POST",
			url : "/medicalCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					medicalSetCustInfo();
					//바로가입하기 2
					medicalSetResult(result);
					showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					/*
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					*/
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.premium,
					    currency: 'KRW',
					  });
					chaiConv('1', result.arryData[0].inputObj.prdtnm);
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
				paramUsed = false;
			},
			beforeSend : function() {},		
 			complete : function() {
 				// 최근설계에서 바로가기 실행시 
 				// 기본계산 및 자유계산 체크여부를 확인한다.
 				/*
				if (isCookieCalc){
					// 최근설계 적재 안함
					isRecentPlanSave = false;
					var planCookie = getPlanCookie(recentPlanId);
					
					//alert(planCookie + ' : ' +   planCookie.planType);
					// 자유계산을 한경우만 재계산을 다시 한다. 
					if (planCookie !="" && planCookie.planType == "free"){
						$("#mainContAmt").val(parseInt(planCookie.gVal1) / 2 + "0000");
						$("#treatyContAmt").val(planCookie.gVal4 + "0000");

						medicalPlanCalc('free');
						isCookieCalc = false;
						
						$("#reCalcPrice1").val($("#mainContAmt").val());
						
						// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
						var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
						medicalInitSelect(generalVal);

						$("#reCalcPrice2").val($("#treatyContAmt").val());
					}
					
					var mainPlanData = $.cookie("mainPlanData");
					if (typeof(mainPlanData) != "undefined" && mainPlanData !="" ){
						var mainPlanDataObj = $.parseJSON($.cookie("mainPlanData"));
						// 자유계산을 한경우만 처리
						if (mainPlanDataObj.planType == "free"){
							$("#mainContAmt").val(mainPlanDataObj.mainContAmt);
							$("#treatyContAmt").val(mainPlanDataObj.treatyContAmt);
							//바로가입하기 3
							medicalPlanCalc('free');
							isCookieCalc = false;
							
							$("#reCalcPrice1").val($("#mainContAmt").val());
							
							// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
							var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
							medicalInitSelect(generalVal);

							$("#reCalcPrice2").val($("#treatyContAmt").val());
						}
					}
				}
				$.removeCookie("mainPlanData",{path:'/'});
				
				var arrTreatyList = gv_treatyList.split('&');
				
				$.each($('#treatyList1').find('input[type=checkbox]'), function(){
					var $this = $(this);
					
					if($.inArray($this.val(), arrTreatyList) > -1){
						$this.prop('checked', true).prev().addClass('on');
					}else{
						$this.prop('checked', false).prev().removeClass('on');
					}
				});
				*/
 			},		
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
	}
	
    // 고객 정보 세팅
    function medicalSetCustInfo() {
    	
    	var element = $("#custInfo").children();    	
//    	$(element[0])			//	보험나이
//		$(element[1])			//	성별
//		$(element[2])			//	보험기간
//		$(element[3])			//	납입기간
    	
    	//	나이
    	if (validateCustAge()) {
    		var age = getInsuAgeByYmd($("#birthday").val()); 
    		var birth = '';
    		var ageHtml = '';
    		
    		birth = $("#birthday").val().substr(2, 6);
    		ageHtml = '<span class="tit">보험나이 :</span><strong>' + age + '</strong>세 (' + birth + ')';
    		$(element[0]).html(ageHtml);
    	}
        
    	// 성별
    	var gender = $("input[name=pgender]:checked").val();
    	var genderHtml = '<span class="tit">성별 :</span>';
    	if (gender == "1") { genderHtml += '남성'; }
    	else if (gender == "2") { genderHtml += '여성'; }
    	$(element[1]).html(genderHtml);
    	
    	// 보험기간
    	var insTerm = $("#insTerm").val();
    	$(element[2]).find("strong").text(insTerm);    	

    	// 납입기간 
    	var napTerm = $("#napTerm").val();
    	$(element[3]).find("strong").text(napTerm);
    	
    	
    	//	detail 고객정보
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	보험기간
	    			$(this).find("strong").text(insTerm);
	    			break;
	    		case 1 :
	    			//	납입기간
	    			$(this).find("strong").text(napTerm);
	    			break;
	    		case 2 :
	    			//	보험나이
	    			$(this).find("strong").text(age);
	    			break;
	    		}
    	});
    }
    
	// 폼세팅 
    function medicalSetFormValue(contBirth, contGender, insuPeriod, payPeriod){
    	
    	$("#contBirth").val(contBirth);
    	$("#contGender").val(contGender);
    	$("#insuPeriod").val(insuPeriod);
    	$("#payPeriod").val(payPeriod);
    	
    	if (getInsuAgeByYmd(contBirth) <= 0){
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#birthday").focus();
    		$("#birthday").val("");
    		return false;
    	}
    	
    	if (!chkDate(contBirth)) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#birthday").focus();
    		$("#birthday").val("");
    		return false;
    	}
    	
    	if (typeof contGender == 'undefined' || contGender == "") {
    		alert("성별을 선택해주세요");
    		$('#calcGender1').focus();
    		return false;	    		
    	}

    	if (!$.isNumeric(insuPeriod)){
    		alert("보험기간을 선택해주세요");
    		return false;    		
    	}
		return true;    		
    }   
    
	// 결과 세팅 
	function medicalSetResult(result){
		var arryData = result.arryData;
		var type = $("#planType").val();
		var data;
		var totPremium = new Array;
		var treatyData1 = new Array;
		
		if (type == "simple") {
			
			initMailData(1);
			
			//	입력폼 셑팅
			var inputObj = arryData[0].inputObj;
			var planSeq = inputObj.planSeq;
			$("#planSeq").val(planSeq);
			var i = 0;
			
			data = arryData[i];
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
			$("#monthlyPremium" + j).text(addCommas(data.padSmtotPrm));
			$("#monthlyPremium" + j +"-2").text(addCommas(data.padSmtotPrm));
			
			setTreatyList2();
			
			// 이메일 데이터 세팅
			totPremium[i] = data.padSmtotPrm;
			$.each(data.inputObj.treatyList, function(i, v){
				treatyData1[i] = v.pname.replace(" 실손의료비보장특약D(갱신형,무배당)", "");
			});
			
		} else if (type == "free") {
			data = arryData[0];
			
			generalVal = data.gVal1;
			largeVal = data.gVal2;
			smallBeginVal = data.gVal3_1;
			smallEndVal = data.gVal3_2;
			deathVal = data.gVal4;
			diagnosisVal = data.gVal5;

			// planSeq 갱신
			$("#planSeq").val(data.inputObj.planSeq);			
			/*
			 * 월 보험료
			 */
			$("#monthlyPremium1, #monthlyPremium1-2").text(addCommas(data.padSmtotPrm));
			
			// 이메일 데이터 세팅
			totPremium[0] = data.padSmtotPrm;
			$.each(data.inputObj.treatyList, function(i, v){
				treatyData1[i] = v.pname.replace(" 실손의료비보장특약D(갱신형,무배당)", "");
			});
		}
		
		var simpleTreatyList = new Array();
		
		if(result.hasOwnProperty('simpleTreatyList')){
			simpleTreatyList = result.simpleTreatyList.split('&');
		}else{
			$.each(result.arryData[0].inputObj.treatyList, function(i, v){
				simpleTreatyList.push(v.insCd);
			});
		}
		
		$('input[name=treatyList1]').each(function(){
			var $this = $(this);
			
			if($.inArray($this.val(), simpleTreatyList) > -1){
				$this.prop('checked', true).prev().addClass('on');
			}else{
				$this.prop('checked', false).prev().removeClass('on');
			}
			/*
			if(!$(this).prop('checked')){
				$(this).prop('checked', true).prev().addClass('on');
			}
			*/
		});
		
		/*gv_productName = pIPrdtCdListElemVO[0].hptsPrdtReprNm;
		$('#popProResult div.top>h2').text(gv_productName);
		$('#fprdtnm').val(gv_productName);*/
		
		
		//	보장내용 타이틀 변경
		//var title = result.arryData[0].inputObj.prdtnm;
		//title = title.substring(0, title.indexOf("](") + 1);
		//$("#medicalReturnTitle").text(title);
		
		gv_productName = result.arryData[0].inputObj.prdtnm;
		gv_productName = gv_productName.substring(0, gv_productName.indexOf("](") + 1);
		$('#popProResult div.top>h2').text(gv_productName);
		$('#fprdtnm').val(gv_productName);
		
		//	상세보기 (보장내용)
		medicalSetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		medicalSetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremium;
		f.arryData1.value = treatyData1;
		
		setPrintAreaForMedical();
	}
	
	
	//	자유계산시 필요한 요소 세팅
	function medicalSetValue(){
		
		$("#freeChgYn").val("Y");
		
		$("#mainContAmt").val($("#reCalcPrice1 option:selected").val());
		$("#treatyContAmt").val($("#reCalcPrice2 option:selected").val());
	}
	
	
	function medicalInitSelect(val) {
		//	ie8 때문에 수정
		var html = "";
		var value = 0;
		for (var i = 1; i < 10; i++) {
			value = i * 10000000;
			if (value >= parseInt(val + "0000")) {
				html = html + '<option value="' + value + '">' + addCommas(value / 10000) + '</option>';
			}
		}
		$("#reCalcPrice2").empty();
		$("#reCalcPrice2").html(html);
		
		//	chrome 동작
		/*$("#reCalcPrice2").children().each(function(index) {
			$(this).show();
			if (index == 0) { $(this).attr("selected", "selected"); }
		});
		
		$("#reCalcPrice2").children().each(function(index) {
			if (parseInt($(this).val()) < parseInt(val + "0000")) {
				//$(this).hide();
				$(this).addClass("none");
			}
		});*/
		
		$("#reCalcPrice2").val(val + "0000");
	}

	//	상세보기 (보장내용)
	function medicalSetDetail1(type, dataArray) {
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
				$obj.find('tbody>tr td').html(guaranteeData[i].content + '<br>' + guaranteeData[i+1].content);
			};
			
			var	titleStr = "인터넷실손의료비보장보험1.0(기본형,갱신형,무배당)";
			$("#topDiv").find("h2").html( titleStr );
			
			//$main.find('h3.tit-sub1, tbody>tr>th').text(inputData.prdtnm);
			
			$.each(guaranteeData, function(i, v){			
				
				if( "-" == $main.find('tbody>tr>td').html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content);
					}
					
					if(v.name.indexOf('외래') > -1){
						$main.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
					}
				} else if( "-" == $main2.find('tbody>tr>td').html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main2.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main2.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content);
						$main2.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main2.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main2.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
						$main2.show();
					}		
					
				} else if( "-" == $main3.find('tbody>tr>td').html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main3.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main3.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content);
						$main3.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main3.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main3.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
						$main3.show();
					}					
					
				} else if( "-" == $main4.find('tbody>tr>td').html() ){
					if(v.name.indexOf('입원의료비') > -1){
						$main4.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main4.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content);
						$main4.show();
					}
					
					if(v.name.indexOf('외래') > -1){
						$main4.find('h3.tit-sub1, tbody>tr>th').text("["+v.insuName.split("[")[1]);
						$main4.find('tbody>tr>td').html(v.content + '<br>' + guaranteeData[i+1].content + '<br>' + guaranteeData[i+2].content);
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
					$obj.show().find('h3.tit-sub1, tbody>tr>th').text(pname);
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
	
	//	상세보기 (해지환급금)
	function medicalSetDetail2(type, dataArray) {
		var data;
		var nowRate;
		
		if (typeof(dataArray) != "undefined") {
			//if (type == "simple") {
				
				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i].nowRateArry;
						
					$("#return").children().each(function(index1) {
						//	tr
						nowRate = data[index1];
						
						$(this).children().each(function(index2) {
							//	td
							
							if (i == 0 && index2 == 0) {
								$(this).text(nowRate.totTerm);
							}
								
							if (i == 0) {
								switch (index2) {
									case 1 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
									case 2 :
										$(this).text(addCommas(nowRate.rtnMoney) + "원");
										break;
									case 3 :
										$(this).text(nowRate.RtnRatio + "%");
										break;
								}
							}
							
							if (i == 1) {
								switch (index2) {
									case 4 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
									case 5 :
										$(this).text(addCommas(nowRate.rtnMoney) + "원");
										break;
									case 6 :
										$(this).text(nowRate.RtnRatio + "%");
										break;
								}
							}
							
							if (i == 2) {
								switch (index2) {
									case 7 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
									case 8 :
										$(this).text(addCommas(nowRate.rtnMoney) + "원");
										break;
									case 9 :
										$(this).text(nowRate.RtnRatio + "%");
										break;
								}
							}
						});
					});
				}
				/*
			} else if (type == "free") {
				
				data = dataArray[0].nowRateArry;

				$("#return").children().each(function(index1) {
					//	tr
					nowRate = data[index1];
					
					$(this).children().each(function(index2) {
						//	td
						switch (index2) {
							case 4 :
								$(this).text(addCommas(nowRate.napMoney) + "원");
								break;
							case 5 :
								$(this).text(addCommas(nowRate.rtnMoney) + "원");
								break;
							case 6 :
								$(this).text(nowRate.RtnRatio + "%");
								break;
						}
					});
				});
			}
			*/
		}
		
		addClassToDetailReturn($("#return"));
	}	
	
	function setTreatyList2(){
		var selectedTreatyList = new Array();
		
		$('#treatyList1').find('label.on').parent().prev().each(function(){
			selectedTreatyList.push($(this).text());
		});
		
		var htmlTxt = '';
		$.each(selectedTreatyList, function(i, v){
			htmlTxt += '<li>' + v + '</li>';
		});
		
		if(selectedTreatyList.length < 1){
			htmlTxt += '<li>선택된 특약이 없습니다.</li>';
		}
		
		$('#treatyList2').html(htmlTxt);
	}

	function getSelectedInsuList() {
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
