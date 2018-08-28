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
	var cancerCBInsTerm = function (inputObj) {
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
		
		if (typeof(inputObj) == "undefined") {
			// 이메일로 타고 왔을때
			// 최근설계내역 찍고 올경우
			if (paramUsed && paramData != null) {
				cancerMakeNapTerm();
				
				paramData = null;
				//바로가입하기 1
				cancerPlanCalc("simple");

				isCookieCalc = true;
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);

			cancerMakeNapTerm();
			$("#napTerm").val(inputObj.payPeriod);
			
			//	세부 고객정보 세팅
			cancerSetCustInfo();
			showResultDiv(true, calculatorCheckEvent);
		}
	}
	
	//	PF 연동 - 보험기간
	function cancerGetInsuranceTerm(date, slpCode, birth, gender) {
		
		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
//		if (!isReadyToPF(birth, gender)) { return; }
		
		//	2016.09.21
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		
		selPrdtCdInfoByPrcd(jsonData, cancerCBInsTerm);
	}
	
	//	PF 연동 - 세션체크
	function cancerCheckSession(inputObj, date) {
		//	2016.09.21
		//var jsonData = getPFJsonData(
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		selPrdtCdInfoByPrcd(jsonData, cancerCBInsTerm, inputObj);
	}
		
	function cancerMakeNapTerm() {
		
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
	function cancerPlanCalc(type, callback) {
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		var payPeriod = $("#napTerm option:selected").val();
		
		// 폼세팅
		if (!cancerSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;

		// 가입설계 계산 
		var frm = $("#frm")[0];
		frm.planType.value = type;
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		
		showLoadingDialog(true);
		$.ajax({
			type : "POST",
			url : "/cancerCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {
				
				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					cancerSetCustInfo();
					//바로가입하기 2
					cancerSetResult(result);
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
					chaiConv('1', result.arryData[1].inputObj.prdtnm);
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
				    //어도비스크립트 변수 세팅 보험료계산수(e21), 보험료재계산수(e65)
				    var adobeTrackParam = {
				    		gender : ($("input[name=pgender]:checked").val() == "1")?"남자":"여자",
				    		age : getInsuAgeByYmd(contBirth),
				    		prdtName : result.arryData[1].inputObj.prdtnm,
				    		premium : result.premium,
				    		payType : '월납'
				    };
				    if(type == "free"){
				    	adobeTrackParam.insuPeriod = insuPeriod;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.premium;
				    	adbCancerReCalc(adobeTrackParam);
				    }else{
				    	adbCancerCalc(adobeTrackParam);
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

						cancerPlanCalc('free');
						isCookieCalc = false;
						
						$("#reCalcPrice1").val($("#mainContAmt").val());
						
						// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
						var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
						cancerInitSelect(generalVal);

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
							cancerPlanCalc('free');
							isCookieCalc = false;
							
							$("#reCalcPrice1").val($("#mainContAmt").val());
							
							// 셀렉트박스가 위값에따라 변경이됨으로 초기화시킴
							var generalVal = $("#reCalcPrice1 option:selected").text().replace("만원", "").replace(",", "");
							cancerInitSelect(generalVal);

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
		
		ga('send','event','Direct','Calculation','cancer_top',1);
		NCDC_LOAD();
		goog_report_conversion();
		
	}
	
    // 고객 정보 세팅
    function cancerSetCustInfo() {
    	
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
    	var insTerm = $("#insTerm option:selected").val();
    	$(element[2]).find("strong").text(insTerm);    	

    	// 납입기간 
    	var napTerm = $("#napTerm option:selected").val();
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
    function cancerSetFormValue(contBirth, contGender, insuPeriod, payPeriod){
    	
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
    	
    	if (!$.isNumeric(payPeriod)){
    		alert("납입기간을 선택해주세요");
    		return false;    		
    	}
    	
		return true;    		
    }   
    
	// 결과 세팅 
	function cancerSetResult(result){
		var arryData = result.arryData;
		var type = $("#planType").val();
		var data;
		var generalVal;
		var largeVal;
		var smallBeginVal;
		var smallEndVal;
		var deathVal;
		var diagnosisVal;
		
		if (type == "simple") {
			
			initMailData(3);
			
			//	입력폼 셑팅
			var inputObj = arryData[0].inputObj;
			var planSeq = inputObj.planSeq;
			$("#planSeq").val(planSeq);
			
			for (var i = 0; i < arryData.length; i++) {
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
				
				/*
				 * 일반암
				 */
				if (i == 1) {
					$("#reCalcPrice1").val(generalVal / 2 + "0000");
					$("#generalAmt2-2").text(addCommas(generalVal));
				} 
				else {
					//	보험금
					$("#generalAmt" + j).text(addCommas(generalVal));
					$("#generalAmt" + j+"-2").text(addCommas(generalVal));					
					//	그래프
					//graphVal = Math.round(parseInt(generalVal) / maxGeneral * 100);
					//$("#generalGraph" + j).css("width", graphVal + "%");
				}
				
				/*
				 * 고액암
				 */
				//	보험금
				$("#largeAmt" + j).text(addCommas(largeVal));
				$("#largeAmt" + j+"-2").text(addCommas(largeVal));				
				//	그래프
				//graphVal = Math.round(parseInt(largeValAmt) / maxLarge * 100);
				//$("#largeGraph" + j).css("width", graphVal + "%");
				
				/*
				 * 소액암
				 */
				//	보험금
				$("#smallAmt" + j).text(smallBeginVal + " ~ " + smallEndVal);
				$("#smallAmt" + j+"-2").text(smallBeginVal + " ~ " + smallEndVal);
				
				//	그래프
				//graphVal = Math.round(parseInt(smallBeginVal) / maxSmall * 100);
				//$("#smallGraph" + j).css("width", graphVal + "%");
				
				/*
				 * 암사망
				 */
				if (i == 1) {
					cancerInitSelect(generalVal);
					$("#reCalcPrice2").val(deathVal + "0000");
//					$("#reCalcPrice2").val((parseInt(deathVal) * 2) + "0000");
					$("#deathAmt2-2").text(addCommas(deathVal));					
				} 
				else {
					//	보험금
					$("#deathAmt" + j).text(addCommas(deathVal));
					$("#deathAmt" + j +"-2").text(addCommas(deathVal));					
					//	그래프
					//graphVal = Math.round(parseInt(deathVal) / maxDeath * 100);
					//$("#deathGraph" + j).css("width", graphVal + "%");
				}
				
				/*
				 * 재진단암
				 */
				// 보험금
				//$("#diagnosisAmt" + j).text(diagnosisVal);
				//$("#diagnosisAmt" + j+"-2").text(diagnosisVal);
				
				$("#diagnosisAmt" + j).text(addCommas(diagnosisVal));
				$("#diagnosisAmt" + j+"-2").text(addCommas(diagnosisVal));
				
				// 이메일 데이터 세팅
				totPremiumArry[i] = data.padSmtotPrm;
				arryData1[i] = generalVal;
				arryData2[i] = largeVal;
				arryData3[i] = smallBeginVal + " ~ " + smallEndVal;
				arryData4[i] = deathVal;
				arryData5[i] = diagnosisVal;
			}
		} else if (type == "free") {
			data = arryData[1];
			
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
			$("#monthlyPremium2").text(addCommas(data.padSmtotPrm));
			$("#monthlyPremium2-2").text(addCommas(data.padSmtotPrm));			
			

			// 일반암
			$("#generalAmt2-2").text(addCommas($("#reCalcPrice1 option:selected").text()));
			
			/*
			 * 고액암
			 */
			//	보험금
			$("#largeAmt2").text(addCommas(largeVal));
			$("#largeAmt2-2").text(addCommas(largeVal));			

			//	그래프
			//graphVal = Math.round(parseInt(largeValAmt) / maxLarge * 100);
			//$("#largeGraph2").css("width", graphVal + "%");
			
			/*
			 * 소액암
			 */
			//	보험금
			$("#smallAmt2").text(smallBeginVal + " ~ " + smallEndVal);
			$("#smallAmt2-2").text(smallBeginVal + " ~ " + smallEndVal);
			
			//	그래프
			//graphVal = Math.round(parseInt(smallBeginVal) / maxSmall * 100);
			//$("#smallGraph2").css("width", graphVal + "%");
			
			// 암사망
			$("#deathAmt2-2").text(addCommas($("#reCalcPrice2 option:selected").text()));			
			
			// 재진단
			$("#diagnosisAmt2").text(addCommas(diagnosisVal));
			
			// 이메일 데이터 세팅
			totPremiumArry[1] = data.padSmtotPrm;
			arryData1[1] = generalVal;
			arryData2[1] = largeVal;
			arryData3[1] = smallBeginVal + " ~ " + smallEndVal;
			arryData4[1] = deathVal;
			arryData5[1] = diagnosisVal;
		}
		
		//	상세보기 (보장내용)
		cancerSetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		cancerSetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
		f.arryData3.value = arryData3;
		f.arryData4.value = arryData4;
		f.arryData5.value = arryData5;
	}
	
	
	//	자유계산시 필요한 요소 세팅
	function cancerSetValue(){
		
		$("#freeChgYn").val("Y");
		
		$("#mainContAmt").val($("#reCalcPrice1 option:selected").val());
		$("#treatyContAmt").val($("#reCalcPrice2 option:selected").val());
	}
	
	
	function cancerInitSelect(val) {
		//	ie8 때문에 수정
		var html = "";
		var value = 0;
		for (var i = 1; i < 10; i++) {
			value = i * 10000000;
			// 180103 암사망특약 변경 (일반암금액~9천만 -> 1천만~9천만)
			//if (value >= parseInt(val + "0000")) {
				html = html + '<option value="' + value + '">' + addCommas(value / 10000) + '</option>';
			//}
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
	function cancerSetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					/*
					 * 암진단보험금
					 */
					$("#payReason1").find('tr').each(function(index1) {
						$(this).find('td').each(function(index2) {
							if (i == index2 - 1) {
								switch (index1) {
									case 0 : $(this).text(data.guaranteeArry[0].amt); break;
									case 1 : $(this).text(data.guaranteeArry[1].amt); break;
									case 2 : $(this).text(data.guaranteeArry[2].amt); break;
								}
							}
						});
					});

					
					/*
					 * 소액암진단보험금
					 */
					$("#payReason2").children().each(function(index1) {
						//	tr
						$(this).children().each(function(index2) {
							//	td
							/*
							if (i == 0 && index2 == 0) {
								switch (index1) {
									case 0 : $(this).text(data.guaranteeArry[3].content); break;
									case 1 : $(this).text(data.guaranteeArry[4].content); break;
								}
							}
							*/
							if (i == index2 - 1) {
								switch (index1) {
									case 0 : $(this).text(data.guaranteeArry[3].amt); break;
									case 1 : $(this).text(data.guaranteeArry[4].amt); break;
								}
							}
						});
					});
					
					
					/*
					 * 고액암
					 */
					$("#payReason3").children().each(function(index1) {
						//	tr
						$(this).children().each(function(index2) {
							//	td
							/*
							if (i == 0 && index2 == 0) {
								$(this).text(data.guaranteeArry[11].content);
							}
							*/
							if (i == index2 - 1) {
//								$(this).text(data.guaranteeArry[11].amt);
								$(this).text(data.guaranteeArry[8].amt);
							}
						});
					});
					
					
					/*
					 * 암사망
					 */
					$("#payReason4").children().each(function(index1) {
						//	tr
						$(this).children().each(function(index2) {
							//	td
							/*
							if (i == 0 && index2 == 0) {
								$(this).html(data.guaranteeArry[8].content);
							}
							*/
							if (i == index2 - 1) {
//								$(this).text(data.guaranteeArry[8].amt);
								$(this).text(data.guaranteeArry[12].amt);
							}
						});
					});
					
					/*
					 * 재진단
					 */
					$("#payReason5").children().each(function(index1) {
						//	tr
						$(this).children().each(function(index2) {
							//	td
							/*
							if (i == 0 && index2 == 0) {
								$(this).html(data.guaranteeArry[9].content);
							}
							*/
							if (i == index2 - 1) {
//								$(this).text(data.guaranteeArry[9].amt);
								$(this).text(data.guaranteeArry[10].amt);
							}
						});
					});
				}
			} else if (type == "free") {
				
				data = dataArray[1];
				
				/*
				 * 암진단보험금
				 */
				$("#payReason1").children().each(function(index1) {
					//	tr
					$($(this)[1]).text();
					
					$(this).children().each(function(index2) {
						//	td
						if (index2 == 3) {
							switch (index1) {
								case 0 : $(this).text(data.guaranteeArry[0].amt); break;
								case 1 : $(this).text(data.guaranteeArry[1].amt); break;
								case 2 : $(this).text(data.guaranteeArry[2].amt); break;
							}
						}
					});
				});

				
				/*
				 * 소액암진단보험금
				 */
				$("#payReason2").children().each(function(index1) {
					//	tr
					$(this).children().each(function(index2) {
						//	td
						if (index2 == 2) {
							switch (index1) {
								case 0 : $(this).text(data.guaranteeArry[3].amt); break;
								case 1 : $(this).text(data.guaranteeArry[4].amt); break;
							}
						}
					});
				});

				
				/*
				 * 고액암
				 */
				$("#payReason3").children().each(function(index1) {
					//	tr
					$(this).children().each(function(index2) {
						//	td
						if (index2 == 2) {
//							$(this).text(data.guaranteeArry[11].amt);
							$(this).text(data.guaranteeArry[8].amt);
						}
					});
				});
				
				
				/*
				 * 암사망
				 */
				$("#payReason4").children().each(function(index1) {
					//	tr
					$(this).children().each(function(index2) {
						//	td
						if (index2 == 2) {
//							$(this).text(data.guaranteeArry[8].amt);
							$(this).text(data.guaranteeArry[12].amt);
						}
					});
				});
				
				/*
				 * 재진단
				 */
				$("#payReason5").children().each(function(index1) {
					//	tr
					$(this).children().each(function(index2) {
						//	td
						if (index2 == 2) {
//							$(this).text(data.guaranteeArry[9].amt);
							$(this).text(data.guaranteeArry[10].amt);
						}
					});
				});
			}
		}
	}
	
	
	//	상세보기 (해지환급금)
	function cancerSetDetail2(type, dataArray) {
		var data;
		var nowRate;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
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
			} else if (type == "free") {
				
				data = dataArray[1].nowRateArry;

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
		}
		
		addClassToDetailReturn($("#return"));
	}	
	
