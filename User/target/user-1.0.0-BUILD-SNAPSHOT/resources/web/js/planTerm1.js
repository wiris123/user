	var maxDeath = 20000;
	
	var RECOMMEND_BEST = {"insTerm":{"best":"20"}, "napTerm":{"recommend":"10", "best":"20"}};
	
	var isCookieCalc = false;
	var recentPlanId;
	
	// 보험기간유형 및 납입기간유형 세팅	
	function termSetTypeCode() {
		// 보험기간유형 및 납입기간 유형 hidden 세팅
		$.each(pIPadPrdListElemVO, function(index, value){
			var insValue = $('#insTerm').find('option:selected').val();
			var napValue = $('#napTerm').find('option:selected').val();
			
			if (value.insrPrdTypVal == insValue && value.padPrdTypVal == napValue){
				$("#padPrdTypCd").val(value.padPrdTypCd);
				$("#insrPrdTypCd").val(value.insrPrdTypCd);
			}
		});
	}
	
	//	연금개시나이 select 처리
	var termCBInsTerm = function (inputObj) {
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
		var selected = '';
		var cnt = 0;
		if (insTermArray.length != 0 && insTermArray[0].msgCd != "ERROR1") {
			$.each(insTermArray, function(index, value) {
				var valTxt = (value.insrPrdTypCd =='01') ? '년' : '세';
				var recommendBestStyle = "";
				var recommendBest = "";
				
				if(RECOMMEND_BEST.insTerm){
					if(value.insrPrdTypVal == RECOMMEND_BEST.insTerm.best){
						recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BEST★";
						recommendBestStyle = 'class="txt-c4 txt-b"';
					}
					else if(value.insrPrdTypVal == RECOMMEND_BEST.insTerm.recommend){
						recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추천★";
						recommendBestStyle = 'class="txt-c1 txt-b"';
					}
				}
				if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
					 selected = 'selected="selected"';
					 cnt ++;
				}
				insHtml +='<option value="' + value.insrPrdTypVal+'" ' + recommendBestStyle + selected +'>보험기간 : ' + value.insrPrdTypVal + valTxt + recommendBest + '</option>';
				selected = '';
			});
		} else {
			insHtml = "<option>보험기간 선택</option>";							
		}
		$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		
		if (typeof(inputObj) == "undefined") {
			//	이메일로 타고 왔을때
			if (paramUsed && paramData != null) {
				$("#insTerm").val(paramData.insuPeriod);
				
				var napTermVal = paramData.payPeriod == 99 ? paramData.insuPeriod : paramData.payPeriod; 
				termMakeNapTerm();
				$("#napTerm").val(napTermVal);
				termSetTypeCode();
				
				paramData = null;
				termPlanCalc("simple");
				isCookieCalc = true;				
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);

			var napTermVal = inputObj.payPeriod == 99 ? inputObj.insuPeriod : inputObj.payPeriod; 
			termMakeNapTerm();
			$("#napTerm").val(napTermVal);
			
			//	세부 고객정보 세팅
			termSetCustInfo();
			showResultDiv(true, calculatorCheckEvent);
		}
	}

	//	PF 연동 - 보험기간
	function termGetInsuranceTerm(date, slpCode, birth, gender) {

		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
//		if (!isReadyToPF(birth, gender)) { return; }
		
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		selPrdtCdInfoByPrcd(jsonData, termCBInsTerm);
	}
	
	//	PF 연동 - 세션체크
	function termCheckSession(inputObj, date) {
		//var jsonData = getPFJsonData(
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		selPrdtCdInfoByPrcd(jsonData, termCBInsTerm, inputObj);
	}
	
	function termMakeNapTerm() {

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
			var selected = '';
			var cnt = 0;
			if (napTermArray.length != 0) {
				$.each(napTermArray, function(index, value){
					var recommendBestStyle = "";
					var recommendBest = "";
					
					if(RECOMMEND_BEST.napTerm){
						if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.best){
							recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;BEST★";
							recommendBestStyle = 'class="txt-c4 txt-b"';
						}
						else if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.recommend){
							recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;추천★";
							recommendBestStyle = 'class="txt-c1 txt-b"';
						}
					}
					if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
						 selected = 'selected="selected"';
						 cnt ++;
					}
					napHtml += '<option value="' + value.padPrdTypVal + '" ' + recommendBestStyle + selected + '>납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + recommendBest +'</option>';
					selected = '';
				});						
			} else {
				napHtml = "<option>납입기간 선택</option>";
			}
			$("#napTerm").html(napHtml);
		}
	}
	
	// 가입설계 계산
	/*function termPlanCalc(type){
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		var payPeriod = $("#napTerm option:selected").val() > 20 ? 99 : $("#napTerm option:selected").val();

		// 폼세팅
		if (!termSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;
		
		// 가입설계 계산 
		var frm = $("#frm")[0];
		frm.planType.value = type;
		
		showLoadingDialog(true);
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		$.ajax({
			type : "POST",
			url : "/termCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					termSetResult(result);
					termSetCustInfo();
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
				    	adbTermReCalc(adobeTrackParam);
				    }else{
				    	adbTermCalc(adobeTrackParam);
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
					// 자유계산을 한경우만 재계산을 다시 한다. 
					if (planCookie !="" && planCookie.planType == "free"){
						$("#freeCont").val(planCookie.deathAmt + "0000");
						termPlanCalc('free');
						isCookieCalc = false;
						
						$("#reCalcPrice1").val($("#freeCont").val());
					}
					
					var mainPlanData = $.cookie("mainPlanData");
					if (typeof(mainPlanData) != "undefined" && mainPlanData !="" ){
						var mainPlanDataObj = $.parseJSON($.cookie("mainPlanData"));
						// 자유계산을 한경우만 처리
						if (mainPlanDataObj.planType == "free"){
							$("#freeCont").val(mainPlanDataObj.freeCont);
							termPlanCalc('free');
							isCookieCalc = false;
							$("#reCalcPrice1").val($("#freeCont").val());							
						}
					}
				}
				
				$.removeCookie("mainPlanData",{path:'/'});
 			},	
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		ga('send','event','Direct','Calculation','term_top',1);
		NCDC_LOAD();
		goog_report_conversion();
		
	}*/
		
    // 고객 정보 세팅
    function termSetCustInfo() {
    	
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
    	var insTermVal = $("#insTerm option:selected").val();
    	$(element[2]).find("strong").text(insTermVal);
    	
    	// 보험기간
    	var napTermVal = $("#napTerm option:selected").val();
    	$(element[3]).find("strong").text(napTermVal);
    	
    	//	detail 고객정보
    	var temp = "";
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	보험기간
	    			temp = $("#insTerm option:selected").text();
	    			temp = temp.replace("보험기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			
	    			$(this).find("strong").text(temp);
	    			break;
	    		case 1 :
	    			//	납입기간
	    			temp = $("#napTerm option:selected").text();
	    			temp = temp.replace("납입기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			
	    			$(this).find("strong").text(temp);
	    			break;
	    		case 2 :
	    			//	보험나이
	    			$(this).find("strong").text(age);
	    			break;
	    		}
    	});
    }

	// 폼세팅 
    function termSetFormValue(contBirth, contGender, insuPeriod, payPeriod) {
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

    	if (!$.isNumeric(insuPeriod)) {
    		alert("보험기간을 선택해주세요");
    		return false;    		
    	}
    	
    	if (!$.isNumeric(payPeriod)) {
    		alert("납입기간을 선택해주세요");
    		return false;    		
    	}
    	
    	termSetTypeCode();
		return true;    		
    }
    
	
	// 결과 세팅 
	function termSetResult(result) {
		var arryData = result.arryData;
		var type = $("#planType").val();
		var data;
		var guaranteeArry;
		var deathVal;
		var graphVal;
		
		if (type == "simple") {
			initMailData(3);

			var inputObj = arryData[0].inputObj;
			var planSeq = inputObj.planSeq;
			$("#planSeq").val(planSeq);
			
			if (arryData.length >= 3) {
				for (var i = 0; i < arryData.length; i++) {
					
					data = arryData[i];
					guaranteeArry = data.guaranteeArry;
					deathVal = data.deathAmt;
					var j = i + 1;
					
					/*
					 * 월 보험료
					 */
					$("#monthlyPremium" + j).text(addCommas(data.padSmtotPrm));
					$("#monthlyPremium" + j+"-2").text(addCommas(data.padSmtotPrm));					
					
					if (i == 1) {
						$("#reCalcPrice1").val(deathVal + "0000");
						$("#deathAmt2-2").text($("#reCalcPrice1 option:selected").text());						
						
					} 
					else {
						graphVal = Math.round(parseInt(deathVal) / maxDeath * 100);
						
						//	보험료
						$("#deathAmt" + j).text(wonToStr2(deathVal));
						$("#deathAmt" + j+"-2").text(wonToStr2(deathVal));
						//	그래프
						$("#deathGraph" + j).css("width", graphVal + "%");
					}
					
					// 저장하기 jsonResultData 세팅
					//var jsonResultData = JSON.parse(JSON.stringify(data));
					//delete jsonResultData["nowRateArry"];delete jsonResultData["guaranteeArry"];
					//$("#jsonResultData" + j).val(JSON.stringify(jsonResultData));
					
					// 이메일 데이터 세팅
					totPremiumArry[i] = data.padSmtotPrm;
					arryData1[i] = deathVal + "0000";
				}
			}
		}
		else if (type == "free") {
			
			data = arryData[1];
			guaranteeArry = data.guaranteeArry;
			
			/*
			 * 월 보험료
			 */
			$("#monthlyPremium2").text(addCommas(data.padSmtotPrm));
			$("#monthlyPremium2-2").text(addCommas(data.padSmtotPrm));			
			
			
			$("#deathAmt2-2").text($("#reCalcPrice1 option:selected").text());
			// 저장하기 jsonResultData 세팅
			//var jsonResultData = JSON.parse(JSON.stringify(data));
			//delete jsonResultData["nowRateArry"];delete jsonResultData["guaranteeArry"];
			//$("#jsonResultData2").val(JSON.stringify(jsonResultData));
			
			// 이메일 데이터 세팅
			totPremiumArry[1] = data.padSmtotPrm;
			arryData1[1] = data.deathAmt + "0000";
		}
		
		//	상세보기 (보장내용)
		termSetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		termSetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
	}
	
	
	function termSetValue(index){
		$("#freeChgYn").val("Y");
		$("#freeCont").val(index.value);	// 납입기간은 전기납
	}
	
	//	상세보기 (보장내용)
	function termSetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					
					//	가입금액
//					$($("#contractAmount").children()[i]).text(addCommas(data.guaranteeArry[0].contAmt));
					
					//	지급사유, 지급금액
					$("#payReason>tr").children().each(function(index1) {
						//	td
						
						if (i == 0 && index1 == 0) {
							$(this).text(data.guaranteeArry[0].content);
						}
						
						if (i == index1 - 1) {
							$(this).text(data.guaranteeArry[0].amt);
						} 
					});
				}
			} else if (type == "free") {
				data = dataArray[1];
				
				//	가입금액
//				$($("#contractAmount").children()[1]).text(addCommas(data.guaranteeArry[0].contAmt));
				
				//	지급사유, 지급금액
				$("#payReason>tr").children().each(function(index1) {
					//	td
										
					if (index1 == 2) {
						$(this).text(data.guaranteeArry[0].amt);
					} 
				});
			}
		}
	}
	
	//	상세보기 (해지환급금)
	function termSetDetail2(type, dataArray) {
		var data;
		var nowRate;
		var inputObj;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
				var htmlStr = "";
				var htmlCnt = dataArray[0].nowRateArry.length;
				
				$("#return").empty();
				for (var i = 0; i < htmlCnt; i++) {
					htmlStr += "<tr>" +
								"<td></td>" +
								"<td class='data1'></td>" +
								"<td class='data1'></td>" +
								"<td class='c1 data1'>0%</td>" +
								"<td class='data2'></td>" +
								"<td class='data2'></td>" +
								"<td class='c1 data2'>0%</td>" +
								"<td class='data3'></td>" +
								"<td class='data3'></td>" +
								"<td class='c1 data3'>0%</td>" +
								"</tr>";
				}
				$("#return").html(htmlStr);

				var napMoney;
				
				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i].nowRateArry;
					inputObj = dataArray[i].inputObj;
					
					$("#return").children().each(function(index1) {
						//	tr
						nowRate = data[index1];
						
						if (nowRate.totTerm.indexOf("년") > 0) {
							//if (parseInt(nowRate.totTerm.replace("년", "")) <= parseInt($("#napTerm option:selected").val()) || isNaN(parseInt($("#napTerm option:selected").val()))) {
							if (parseInt(nowRate.totTerm.replace("년", "")) <= parseInt(inputObj.payPeriod)) {
								napMoney = nowRate.napMoney;
							} else {
								napMoney = napMoney;
							}
						} else {
							napMoney = nowRate.napMoney;
						}
						
						$(this).children().each(function(index2) {
							//	td
							
							if (i == 0 && index2 == 0) {
								$(this).text(nowRate.totTerm);
							}
								
							if (i == 0) {
								switch (index2) {
									case 1 :
										//$(this).text(addCommas(nowRate.napMoney) + "원");
										$(this).text(addCommas(napMoney) + "원");
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
										//$(this).text(addCommas(nowRate.napMoney) + "원");
										$(this).text(addCommas(napMoney) + "원");
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
										//$(this).text(addCommas(nowRate.napMoney) + "원");
										$(this).text(addCommas(napMoney) + "원");
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
	
