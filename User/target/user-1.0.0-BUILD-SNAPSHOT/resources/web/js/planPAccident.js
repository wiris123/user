
	//	연금개시나이 select 처리
	var pAccidentCBInsTerm = function (inputObj) {
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
		var selected = "";
		if (insTermArray.length != 0 && insTermArray[0].msgCd != "ERROR1") {
			$.each(insTermArray, function(index, value) {
				var valTxt = (value.insrPrdTypCd =='01') ? '년' : '세';
				//selected = (insTerm==value.insrPrdTypVal) ? "selected" : "";
				
				if(insTerm==value.insrPrdTypVal){
					selected = "selected";
					insHtml += '<option value="' + value.insrPrdTypVal + '"'+selected+'>보험기간  : ' + value.insrPrdTypVal+valTxt + '</option>';
				}
				
			});
		} else {
			insHtml = "<option>보험기간 선택</option>";							
		}
		
		$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		
		//if (insTermArray.length == 1) {
			$("#insTerm").attr("disabled", true);
			
		//}
		
		if (typeof(inputObj) == "undefined") {
			//	이메일로 타고 왔을때
			if (paramUsed && paramData != null) {
				 
				pAccidentMakeNapTerm();
				$("#napTerm").val(paramData.payPeriod);
				
				paramData = null;
				pAccidentPlanCalc("simple");
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);

			pAccidentMakeNapTerm();			
			$("#napTerm").val(inputObj.payPeriod);
			
			//	세부 고객정보 세팅
			pAccidentSetCustInfo();
			showResultDiv(true, calculatorCheckEvent);
		}
	}
	
	//	PF 연동 - 세션체크
	function pAccidentCheckSession(inputObj, date) {
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		selPrdtCdInfoByPrcd(jsonData, pAccidentCBInsTerm, inputObj);
	}
	
	function pAccidentGetInsuranceTerm(date, slpCode, birth, gender) {
		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
//		if (!isReadyToPF(birth, gender)) { return; }
		
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		selPrdtCdInfoByPrcd(jsonData, pAccidentCBInsTerm);
	}
	
	function pAccidentMakeNapTerm() {
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
				$.each(napTermArray, function(index, value) {
					napHtml = '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypCdNm + '</option>';						
					if (index == 0) {
						$('#napTerm').append(napHtml);
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
			}
		}
	}
	
	// 가입설계 계산
	function pAccidentPlanCalc(){
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		//var payPeriod = $("#napTerm").val();
		var payPeriod = $("#napTerm option:selected").val();

		//	폼세팅
		if (!pAccidentSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;
		
		// 폼 파라메터 처리 
		var jsonData = jQuery("#frm").serializeObject();
		
		showLoadingDialog(true);
		//console.log(jsonData);
		$.ajax({
			type : "POST",
			url : "/pAccidentCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					setCalcLog();
					pAccidentSetResult(result);
					pAccidentSetCustInfo();
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
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
				paramUsed = false;
			},
			beforeSend: function() {},		
 			complete: function() {},	
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		ga('send','event','Direct','Calculation','accident_top',1);
		NCDC_LOAD();
		goog_report_conversion();
	}
		
    // 고객 정보 세팅
    function pAccidentSetCustInfo() {
    	
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

    	// 납입기간 
    	var napTermVal = $("#napTerm option:selected").val();
    	$(element[3]).find("strong").text(napTermVal);
    	
    	//	detail 고객정보
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	보험기간
	    			$(this).find("strong").text(insTermVal);
	    			break;
	    		case 1 :
	    			//	납입기간
	    			$(this).find("strong").text(napTermVal);
	    			break;
	    		case 2 :
	    			//	보험나이
	    			$(this).find("strong").text(age);
	    			break;
	    		}
    	});
    }    

	// 폼세팅 
    function pAccidentSetFormValue(contBirth, contGender, insuPeriod, payPeriod ){
    	//console.log(payPeriod);
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
	function pAccidentSetResult(result) {
		initMailData(2);
		
    	var arryData = result.arryData;
		var inputObj = arryData[0].inputObj;
        var planSeq = inputObj.planSeq;
        	
		// 입력폼 세팅 
		$("#planSeq").val(planSeq);
		
		for (var i = 0 ; i < arryData.length ; i++) {
			var data = arryData[i];
			var j = i + 1;
			
			var htmlStr;
			var title = $("#guarantee" + j).find(".label").find('span');
			var element = $("#guarantee" + j).find(".data");
			
			//	월 납입금액
			$("#monthlyPremium" + j).text(addCommas(data.padSmtotPrm));
			$("#monthlyPremium1" + j +"-2").text(addCommas(data.padSmtotPrm));				
			
			// 타이틀
			title.each(function(i){
				if (data.guaranteeArry.length > 0) {
					if(typeof data.guaranteeArry[i] != 'undefined'){
						$(this).text(data.guaranteeArry[i].name);
					}
				}
			});
			
			// 보험금
			element.each(function (index) {
				htmlStr = "";
				switch (index) {
					case 0 :
						//htmlStr = accidentGetGaranteeHtml(data.deathAmt12, data.deathAmt11);
						//console.log('1. ' +data.deathAmt11);
						htmlStr = pAccidentGetGaranteeHtml(data.deathAmt11);
						break;
						
					case 1 :
						//console.log('2. ' +data.deathAmt21);
						//htmlStr = accidentGetGaranteeHtml(data.deathAmt22, data.deathAmt21);
						htmlStr = pAccidentGetGaranteeHtml(data.deathAmt21);
						break;
				}
				
				$(this).empty();
				$(this).html(htmlStr);
			});
			
			// 저장하기 jsonResultData 세팅
			var jsonResultData = JSON.parse(JSON.stringify(data));
			delete jsonResultData["nowRateArry"];delete jsonResultData["guaranteeArry"];
			$("#jsonResultData" + j).val(JSON.stringify(jsonResultData));
			
			//	이메일 데이터 세팅
			totPremiumArry[0] = data.padSmtotPrm;
			arryData1[0] = data.deathAmt11 + "_" + data.deathAmt12;
			arryData2[0] = data.deathAmt21 + "_" + data.deathAmt22;
			arryData3[0] = data.deathAmt31 + "_" + data.deathAmt32;
			arryData4[0] = data.disAmt2;
		
		}
		//	상세보기 (보장내용)
		pAccidentSetDetail1(arryData);
		
		//	상세보기 (해지환급금)
		pAccidentSetDetail2(arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
		f.arryData3.value = arryData3;
		f.arryData4.value = arryData4;
		f.arryData5.value = arryData5;
	}
	
	function pAccidentGetGaranteeHtml(data1) {
		var htmlStr = "";
		htmlStr = "<span class='value1'>" + data1 + "</span>";
		//console.log(htmlStr);
		return htmlStr;
	}
	
	function pAccidentSetSubDetail1(data, i, index) {
		
		//	보험금명
		if (i == 0) { 
			//console.log(i + ' :: ' + data.name + ' , ' + index);
			$("#contractName" + index).text(data.name);
		}
		
		//	가입금액
//		$($("#contractAmount" + index).children()[i]).text(addCommas(data.contAmt));
		
		//	지급사유, 지급금액
		$("#payReason" + index + ">tr").children().each(function(index2) {
			//	td
			if (i == 0 && index2 == 0) {
				$(this).text(data.content);
			}
			
			if (i == index2 - 1) {
				$(this).text(data.amt);
			}
		});
	}
	
	function pAccidentSetSubDetail2(data, index) {
		//	지급사유, 지급금액
		$("#payReason6").children().each(function(index1) {

			if (index == index1) {
				$(this).children().each(function(index2) {
					switch (index2) {
						case 0: $(this).text(data.content); 
						break;
						case 1: $(this).text(data.amt); 
						break;
					}
				});
			}
		});
	}
	
	//	상세보기 (보장내용)
	function pAccidentSetDetail1(dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			for (var i = 0; i < dataArray.length; i++) {
				data = dataArray[i];
				pAccidentSetSubDetail1(data.guaranteeArry[0], i, 1);
				if(typeof data.guaranteeArry[1] !== 'undefined'){
					pAccidentSetSubDetail1(data.guaranteeArry[1], i, 2);
				}else{
					$('#contractName2').parent().hide();
				}

				if (data.guaranteeArry.length > 6) {
					
					//	가입금액
//					$("#contractAmount6>strong").text(addCommas(data.guaranteeArry[6].contAmt));
					
					//	지급사유, 지급금액
					pAccidentSetSubDetail2(data.guaranteeArry[6], 0);
					pAccidentSetSubDetail2(data.guaranteeArry[7], 1);
					pAccidentSetSubDetail2(data.guaranteeArry[8], 2);
					pAccidentSetSubDetail2(data.guaranteeArry[9], 3);
				}
			}
		}
	}
	
	//	상세보기 (해지환급금)
	function pAccidentSetDetail2(dataArray) {
		var data;
		var nowRate;
		
		if (typeof(dataArray) != "undefined") {
			
			var napMoney;
			
			for (var i = 0; i < dataArray.length; i++) {
				data = dataArray[i].nowRateArry;
				
				napMoney = dataArray[i].totNapMoney;
				
				$("#return").children().each(function(index1) {
					//	tr
					nowRate = data[index1];
					//console.log(nowRate.totTerm);
					
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
					});
				});
			}
		}
		
		addClassToDetailReturn($("#return"));
	}