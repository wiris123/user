	var	startMoney;
	var	endMoney;
	
	var RECOMMEND_BEST = {"napTerm":{"best":"10", "recommend":"20"}, "insTerm":{"best":"65"}};
	
	//	연금개시나이 select 처리
	var iAnnuityCBAnnAge = function (inputObj) {
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
				
				//	pIMnInsrEntStndInfoPrtVO.anutBgnEndPsbAge : 80, 연금개시 맥스값
				for (var i = value.insrPrdTypVal; i <= pIMnInsrEntStndInfoPrtVO.anutBgnEndPsbAge; i++) {
					var recommendBestStyle = "";
					var recommendBest = "";
					
					if(RECOMMEND_BEST.insTerm){
						if(i == RECOMMEND_BEST.insTerm.best){
							recommendBest = "&nbsp;&nbsp;&nbsp;BEST★";
							recommendBestStyle = 'class="txt-c4 txt-b"';
						}
						else if(i == RECOMMEND_BEST.insTerm.recommend){
							recommendBest = "&nbsp;&nbsp;&nbsp;추천★";
							recommendBestStyle = 'class="txt-c1 txt-b"';
						}
					}
					
					if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
						 selected = 'selected="selected"';
						 cnt ++;
					}
					
					insHtml +='<option value="' + i + '" ' + recommendBestStyle + selected + '>' + i + valTxt + recommendBest + '</option>';
					selected = '';
				}
			});
		} else {
			insHtml = "<option>연금개시나이 선택</option>";							
		}
		
		$("#annAge").html(insHtml);// 보험기간 HTML 세팅
				
		if (typeof(inputObj) == "undefined") {
			//	이메일로 타고 왔을때
			if (paramUsed && paramData != null) {
				$("#annAge").val(paramData.annuityAge);
			}
			
			$('#annAge').change(); 	// 이벤트발생
		} else {
			
			var annAge = inputObj.annuityAge;
			
			sessionChecked = true;
			sessionNapTerm = inputObj.payPeriod;
			sessionNapMoney = inputObj.contAmt;
			
			//	입력폼 세팅
			$("#annAge").val(annAge);			
			$("#annAge option[value='" + annAge + "']").change();
		}
	}
	
	//	납입기간 select 처리
	var iAnnuityCBNapTerm = function () {
		var annAgeVal = $("#annAge").find("option:selected").val();
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
		var selected = '';
		var cnt = 0;
		$.each(napTermArray, function(index, value) {
			if (value.padPrdTypCd == "02") {
			//if (value.padPrdTypVal > 20) {
				shiftVal = "99";
			} else {
				shiftVal = value.padPrdTypVal;
			}
			
			var recommendBestStyle = "";
			var recommendBest = "";
			
			if(RECOMMEND_BEST.napTerm){
				if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.best){
					recommendBest = "&nbsp;&nbsp;&nbsp;BEST★";
					recommendBestStyle = 'class="txt-c4 txt-b"';
				}
				else if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.recommend){
					recommendBest = "&nbsp;&nbsp;&nbsp;추천★";
					recommendBestStyle = 'class="txt-c1 txt-b"';
				}
			}
			
			if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
				 selected = 'selected="selected"';
				 cnt ++;
			}
			
			napHtml += '<option value="' + shiftVal + '" ' + recommendBestStyle + selected + '>' + value.padPrdTypVal + value.padPrdTypCdNm + recommendBest + '</option>';
			selected = '';
		});	
		$("#napTerm").html(napHtml);
		
		if (sessionChecked) {
			
			var napTerm = sessionNapTerm;
			
			$("#napTerm").val(sessionNapTerm);
			$("#napTerm option[value='" + sessionNapTerm + "']").change();
			
			$("#napMoney").val(parseInt(sessionNapMoney) / 10000);
			$("#napMoney").click();
			
			//	세부 고객정보 세팅
			iAnnuitySetCustInfo();
			
			// 결과 그래프 처리
	    	showGraph(
	    				insuranceType, 
	    				getInsuAgeByYmd($("#birthday").val()), 
	    				$("#annAge").find("option:selected").val(), 
	    				$("#napTerm").find("option:selected").val()
	    	);
	    	
	    	// 장기유지보너스 안내문구 처리
	    	iAnnuitySetBonusTxt();
			
			showResultDiv(true, calculatorCheckEvent);
			
			sessionChecked = false;
			sessionNapTerm = "";
			sessionNapMoney = "";
			
			sessionProcessing = false;
		}
		
		//	이메일로 타고 왔을때
		if (paramUsed && paramData != null) {
			$("#napTerm").val(paramData.payPeriod);
			$("#napMoney").val(paramData.premium).click();
			
			paramData = null;
			iAnnuityPlanCalc("simple");
		}
	}
	
	//	PF 연동 - 연금개시 나이
	function iAnnuityGetAnnuityAge(date, slpCode, birth, gender, annAge) {

		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
//		if (!isReadyToPF(birth, gender)) { return; }
		
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender, annAge);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender, annAge);
		selPrdtCdInfoByPrcd(jsonData, iAnnuityCBAnnAge);
	}
	
	//	PF 연동 - 납입기간
	function iAnnuityGetNapTerm(date, slpCode, birth, gender, annAge) {
		
		if (!validateCustAge()) { return; }
		
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender, annAge);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender, annAge);
		selPrdtCdInfoByPrcd(jsonData, iAnnuityCBNapTerm);
	}
	
	//	PF 연동 - 세션체크
	function iAnnuityCheckSession(inputObj, date) {
		//var jsonData = getPFJsonData(
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender,
										""
//										inputObj.annuityAge
		);
		selPrdtCdInfoByPrcd(jsonData, iAnnuityCBAnnAge, inputObj);
	}
	
	//	가입설계 계산
	function iAnnuityPlanCalc(type){
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var annAge = $("#annAge").val();
		var payPeriod = $("#napTerm").val();
		var premium = $("#napMoney").val();
		
		/*type simple2인 경우 : 재계산, 추천설계로 바꿔보기인 경우. 어도비DTM함수 재계산 함수 호출
		  어도비 재계산 확인용 임시변수 adbReCalcYn*/
		var adbReCalcYn = 'N';
		if (type == "simple2"){
			adbReCalcYn = 'Y';
			type = "simple";
		}
		
		if (type == "free") { premium = $("#monthlyPremium2").val(); }
		
		// 폼세팅
		if (!iAnnuitySetFormValue(contBirth, contGender, annAge, payPeriod, premium, type)) return;
		
		// 가입설계 계산 
		var frm = $("#frm")[0];
		frm.planType.value = type;
		
		showLoadingDialog(true);
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		$.ajax({
			type : "POST",
			url : "/iAnnuityCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {
				
				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					// 결과 뿌리기
					iAnnuitySetResult(result);
					iAnnuitySetCustInfo();
					// 결과 그래프 처리
			    	showGraph(insuranceType, getInsuAgeByYmd(contBirth), annAge, payPeriod);
					showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.arryData[1].inputObj.contAmt,
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
				    		premium : result.arryData[1].inputObj.contAmt,
				    		payType : '월납'
				    };
				    if(adbReCalcYn == "N"){
				    	adbIAnnuityCalc(adobeTrackParam);
				    }else{
				    	adobeTrackParam.annStartAge = annAge;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.arryData[1].inputObj.contAmt;
				    	adbIAnnuityReCalc(adobeTrackParam);
				    }
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
				paramUsed = false;
			},
			beforeSend: function() {},		
 			complete: function() {
 			},
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		// 170704추가
		ga('set', 'metric1', premium);
		ga('set', 'dimension1', contBirth.substring(0, 4));
		ga('set', 'dimension2', contGender);
		
		ga('send','event','Direct','Calculation','iAnnuity_top',1);
		NCDC_LOAD();
		goog_report_conversion();				
	}
	
	
	// 금액범위 가져오기
	function iAnnuityGetInsuScope(age) {
		var insuScope = {"startMoney":"", "endMoney":""};
		
		insuScope.startMoney = 10; 
		insuScope.endMoney = 100;
		
		/*if ((age >=20) && (age <= 40)){
			insuScope.startMoney = 6; insuScope.endMoney = 100;
		}else{
			insuScope.startMoney = 10; insuScope.endMoney = 100;
		}*/
		
		return insuScope;
	}
	
    // 고객 정보 세팅
    function iAnnuitySetCustInfo() {
    	
    	var element = $("#custInfo").children();
    	//	$(element[0])			//	보험나이
    	//	$(element[1])			//	성별
    	//	$(element[2])			//	공시이율
    	
    	var annuityAge;		//	연금개시나이
    	var napTerm;		//	납입기간
		var option;
    	
    	
    	//	보험나이
    	var age = getInsuAgeByYmd($("#birthday").val());
    	if (age != "") {
    		if ( (age < $staAge) || (age > $endAge) ) {
        		if (!chkDate($("#birthday").val())) {
    	    		alert("생년월일을 올바르게 입력해주세요.");
    	    		$('#birthday').focus();
    	    		$("#birthday").val("");
    	    		return false;
    	    	}
        		
        		alert("고객님은 " + age + "세 입니다. \n\n인터넷연금보험 가입나이는 "+ $staAge + "세 ~ "+ $endAge + "세 입니다. ");
        		
        		//	select 초기화
        		$("#annAge").empty();
        		$("#annAge").html("<option value=''>연금개시나이 선택</option>");
        		
        		$("#napTerm").empty();
        		$("#napTerm").html("<option value=''>납입기간 선택</option>");
        		
        		return false;        		
        	}
        	/*else {
        		var birth = '';
        		var ageHtml = '';
        		
        		birth = $("#birthday").val().substr(2, 6);
        		ageHtml = '<span class="tit">보험나이 :</span><strong>' + age + '</strong>세 (' + birth + ')';
        		$(element[0]).html(ageHtml);
        	}*/
    	}
    	
    	/*// 성별
    	var gender = $("input[name=pgender]:checked").val();
    	var genderHtml = '<span class="tit">성별 :</span>';
    	if (gender == "1") { genderHtml += '남성'; }
    	else if (gender == "2") { genderHtml += '여성'; }
    	$(element[1]).html(genderHtml);*/

    	
    	//	연금개시나이 선택 가능 여부 체크
    	annuityAge = $("#annAge option:selected").val();
    	napTerm = $("#napTerm option:selected").val();
    	
    	var diff = 0;
    	if ((napTerm != "") && (annuityAge != "")) {
    		diff = (napTerm > 10) ? napTerm : 10;
    		diff = (diff == "99") ? 21 : diff;
    	}
    	
    	if (annuityAge != "") {
    		var startAge = parseInt(age) + parseInt(diff);
    		if (startAge > annuityAge) {
    			alert("선택하신 연금개시나이는 선택하실수 없습니다. \n" + startAge +"세 이상으로 선택해주세요.");
    			$("#annAge").val("");
    			return false;
    		}
    	}
    	
    	//	보험료 scope set
//    	if (napTerm != "" && gender != "" && age != "" && annuityAge != ""  ){
    	if (age != ""){
    	
    		var obj = iAnnuityGetInsuScope(age);
    		startMoney = obj.startMoney;
    		endMoney = obj.endMoney;

    		var text = "납입금액 " + startMoney + "만원 이상"; 
    		$("#napMoneyExample").text(text);
    	}
    	
    	//	detail 고객정보
    	var tmp = "";
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	보험나이
	    			tmp = $("#napTerm option:selected").text();
	    			tmp = tmp.replace("납입기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			$(this).find("strong").text(tmp);
	    			break;
	    		case 1 :
	    			//	연금개시나이
	    			tmp = $("#annAge option:selected").text();
	    			tmp = tmp.replace("연금개시나이 : ", "").replace("세", "").replace(/\sBEST★|추천★/g, "");
	    			$($(this).find("strong")[0]).text(tmp);
	    			$($(this).find("strong")[1]).text(age);
	    			break;
	    		}
    	});
    }

	// 폼세팅 
    function iAnnuitySetFormValue(contBirth, contGender, annuityAge, payPeriod, premium, type) {
    	$("#contBirth").val(contBirth);
    	$("#contGender").val(contGender);
    	$("#annuityAge").val(annuityAge);
    	$("#payPeriod").val(payPeriod);
    	$("#premium").val(premium * 10000);
    	
    	if (getInsuAgeByYmd(contBirth) <= 0) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#birthday").focus();
    		$("#birthday").val("");
    		return false;
    	}
    	if (!chkDate(contBirth)) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$('#birthday').focus();
    		$("#birthday").val("");
    		return false;
    	}
    	
    	if (typeof contGender == 'undefined' || contGender == ""){
    		alert("성별을 선택해주세요");
    		$('#calcGender1').focus();
    		return false;	    		
    	}

    	if (!$.isNumeric(annuityAge)) {
    		alert("연금개시나이를 입력해주세요");
    		return false;    		
    	}
    	
    	if (!$.isNumeric(payPeriod)) {
    		alert("납입기간을 선택해주세요");
    		return false;    		
    	}

    	if (!$.isNumeric(premium)) {
    		alert("납입금액을 입력해주세요");
    		
    		if (type == "free") {
    			$("#monthlyPremium2").focus();
    			$("#monthlyPremium2").val("");
    		} else {
    			$("#napMoney").focus();
    			$("#napMoney").val("");
    		}
    		return false;    		
    	}

    	//if ((parseInt(premium, 10) < startMoney) || (parseInt(premium, 10) > endMoney)) {
    	if ((parseInt(premium, 10) < startMoney)) {
    		alert("납입금액은 " + startMoney + "만원이상 입력해주세요.");
    		
    		if (type == "free") {
    			$("#monthlyPremium2").focus();
    			$("#monthlyPremium2").val("");
    		} else {
    			$("#napMoney").focus();
    			$("#napMoney").val("");
    		}
    		return false;                                    
    	}

    	return true;
    }   
    
	
	// 결과 세팅 
	function iAnnuitySetResult(result){
						
		var arryData = result.arryData;
		var data;
		var type = $("#planType").val();
		
		
		if (type == "simple") {
			
			initMailData(3);
			
			planSetResultDisplay(arryData);
			
			$("#planSeq").val(arryData[1].inputObj.planSeq);
			
			//	공시이율
			$("#nowRate").text(arryData[1].nowRate + "%");
			$("#nowRate2").text(arryData[1].nowRate + "%");
			
			for (var i = 0; i < arryData.length; i++) {
				data = arryData[i];
				iAnnuitySetSubResult(data, i, totPremiumArry, arryData1, arryData2);
			}
		}
		else if (type == "free") {
			data = arryData[1];
			$("#planSeq").val(data.inputObj.planSeq);
			
			$("#monthlyPremium2-2").text($("#monthlyPremium2").val());
			$("#annuityMoney2").text(addCommas(parseInt(data.nowTime10 / 10000)));
			$("#annuityMoney2-2").text(addCommas(parseInt(data.nowTime10 / 10000)));
			$("#returnRatio2").text(data.returnRatio);
			$("#returnRatio2-2").text(data.returnRatio);
			
			
			var title = "월 " + addCommas(parseInt(data.totPremium / 10000)) + "만원";
			
//			planSetDetailTitle($("#guaranteeTitle0"), title, 1);
			planSetDetailTitle($("#guaranteeTitle1"), title, 1);
			planSetDetailTitle($("#guaranteeTitle2"), title, 1);
			planSetDetailTitle($("#guaranteeTitle3"), title, 1);
			planSetDetailTitle($("#guaranteeTitle4"), title, 1);
			planSetDetailTitle($("#returnTitle1"), title, 1);
			planSetDetailTitle($("#returnTitle2"), title, 1);
			planSetDetailTitle($("#returnTitle3"), title, 1);

			//	이메일 데이터 세팅
			totPremiumArry[1] = parseInt(data.totPremium / 10000);
			arryData1[1] = parseInt(data.nowTime10 / 10000);
			arryData2[1] = data.returnRatio;
		}
		
		prevVal = $("#monthlyPremium2").val();
		
		//	상세보기 (보장내용)
		iAnnuitySetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		iAnnuitySetDetail2(type, arryData);
		
		//  장기유지보너스 텍스트 변경
		iAnnuitySetBonusTxt();
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
		
		showAdvice(result);
	}
	
	function iAnnuitySetSubResult(data, index, totPremiumArry, arryData1, arryData2) {
		
		var totPremium = "0";
		var nowTime10 = "0";
		var returnRatio = "0";
		var title = "";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			totPremium = addCommas(parseInt(data.totPremium / 10000));
			nowTime10 = addCommas(parseInt(data.nowTime10 / 10000));
			returnRatio = data.returnRatio;
			title = "월 " + totPremium + "만원";

			var order = index + 1;
			if (index == 1) {
				$("#monthlyPremium" + order).val(totPremium);
				$("#monthlyPremium" + order +"-2").text(totPremium);
			} else {
				$("#monthlyPremium" + order).text(totPremium);
				$("#monthlyPremium" + order +"-2").text(totPremium);
			}
			$("#annuityMoney" + order).text(nowTime10);
			$("#annuityMoney" + order +"-2").text(nowTime10);
			$("#returnRatio" + order).text(returnRatio);
			$("#returnRatio" + order +"-2").text(returnRatio);			
		}
		
//		planSetDetailTitle($("#guaranteeTitle0"), title, index);
		planSetDetailTitle($("#guaranteeTitle1"), title, index);
		planSetDetailTitle($("#guaranteeTitle2"), title, index);
		planSetDetailTitle($("#guaranteeTitle3"), title, index);
		planSetDetailTitle($("#guaranteeTitle4"), title, index);
		planSetDetailTitle($("#returnTitle1"), title, index);
		planSetDetailTitle($("#returnTitle2"), title, index);
		planSetDetailTitle($("#returnTitle3"), title, index);
		
		//	이메일 데이터 세팅
		totPremiumArry[index] = totPremium.replace(/,/g, "");
		arryData1[index] = nowTime10.replace(/,/g, "");
		arryData2[index] = returnRatio;
	}
	
	//	상세보기 (보장내용)
	function iAnnuitySetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {

				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					iAnnuitySetSubDetail1(data, i);
				}
			} else if(type == "free") {
				data = dataArray[1];
				iAnnuitySetSubDetail1(data, 1);
			}
		}
	}
	
	function iAnnuitySetSubDetail1(data, index) {
		
		var nowTime10 = "-";
		var nowTime20 = "-";
		var nowTime30 = "-";
		var anutPymPrd0 = "";
		var anutAmt0 = "-";
		var anutPymPrd1 = "";
		var anutAmt1 = "-";
		var anutPymPrd2 = "";
		var anutAmt2 = "-";
		var nowYear5 = "-";
		var nowYear10 = "-";
		var nowYear15 = "-";
		var nowYear20 = "-";
		var nowYear30 = "-";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			
			//	종신연금형
			nowTime10 = addCommas(parseInt(data.nowTime10 / 10000)) + "만원";
			
			//	상속연금형
			nowTime20 = addCommas(parseInt(data.nowTime20 / 10000)) + "만원";
			nowTime30 = addCommas(parseInt(data.nowTime30 / 10000)) + "만원";
			
			//	종신연금 플러스형
			if (data.nowTimeArry.length > 0) {
				anutPymPrd0 = data.nowTimeArry[0].anutPymPrd + "회 보증";
				anutAmt0 = addCommas(parseInt(data.nowTimeArry[0].anutAmt / 10000)) + "만원";
				anutPymPrd1 = data.nowTimeArry[1].anutPymPrd + "회 보증";
				anutAmt1 = addCommas(parseInt(data.nowTimeArry[1].anutAmt / 10000)) + "만원";
				anutPymPrd2 = data.nowTimeArry[2].anutPymPrd + "회 보증";
				anutAmt2 = addCommas(parseInt(data.nowTimeArry[2].anutAmt / 10000)) + "만원";
			}
			
			//	확정기간 연금플러스형
			nowYear5  = addCommas(parseInt(data.nowYear5  / 10000)) + "만원";
			nowYear10 = addCommas(parseInt(data.nowYear10 / 10000)) + "만원";
			nowYear15 = addCommas(parseInt(data.nowYear15 / 10000)) + "만원";
			nowYear20 = addCommas(parseInt(data.nowYear20 / 10000)) + "만원";
			nowYear30 = addCommas(parseInt(data.nowYear30 / 10000)) + "만원";
		}
		
		//	종신연금형
		$($("#guarantee1>tr")[4]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowTime10); }
		});
		
		//	상속연금형
		$($("#guarantee2>tr")[4]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowTime20); }
		});
		
		$($("#guarantee2>tr")[5]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowTime30); }
		});
		
		//	종신연금 플러스형
		$($("#guarantee3>tr")[4]).children().each(function(index1) {
			if (index == 1 && index1 == 0) { $(this).text(anutPymPrd0); }
			if (index1 != 0 && index + 1 == index1) { $(this).text(anutAmt0); }
		});
		
		$($("#guarantee3>tr")[5]).children().each(function(index1) {
			if (index == 1 && index1 == 0) { $(this).text(anutPymPrd1); }
			if (index1 != 0 && index + 1 == index1) { $(this).text(anutAmt1); }
		});
		
		$($("#guarantee3>tr")[6]).children().each(function(index1) {
			if (index == 1 && index1 == 0) { $(this).text(anutPymPrd2); }
			if (index1 != 0 && index + 1 == index1) { $(this).text(anutAmt2); }
		});
		
		//	확정기간 연금플러스형
		$($("#guarantee4>tr")[4]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowYear5); }
		});
		
		$($("#guarantee4>tr")[5]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowYear10); }
		});
		
		$($("#guarantee4>tr")[6]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowYear15); }
		});
		
		$($("#guarantee4>tr")[7]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowYear20); }
		});
		
		$($("#guarantee4>tr")[8]).children().each(function(index1) {
			if (index1 != 0 && index + 1 == index1) { $(this).text(nowYear30); }
		});
	}
		
	//	상세보기 (해지환급금)
	function iAnnuitySetDetail2(type, dataArray) {
		var nowRate;
		var lowRate;
		var stdRate;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
				clearPlanDetail(dataArray[1]);
				
				for (var i = 0; i < dataArray.length; i++) {
					
					if (typeof(dataArray[i]) != "undefined" && typeof(dataArray[i].inputObj) != "undefined") {
						nowRate = dataArray[i].nowRateArry;
						lowRate = dataArray[i].lowRateArry;
						stdRate = dataArray[i].stdRateArry;
						
						//	현재 이율
						$("#return1").children().each(function(index1) {
							//	tr
							
							$(this).children().each(function(index2) {
								//	td
								if (i == 1 && index1 == 0 && index2 == 0) {
									$("#stdRate").text("현재공시이율 연복리 " + dataArray[i].nowRate + "% 가정시");
								}
								
								switch (index2) {
									case 0:	if (i == 1) { $(this).text(nowRate[index1].totTerm); } break;
									case 1: if (i == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 2: if (i == 0) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 3: if (i == 0) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
									case 4: if (i == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 5: if (i == 1) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 6: if (i == 1) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
									case 7: if (i == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 8: if (i == 2) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 9: if (i == 2) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
								}
							});
						});
						
						//현재이율, 최저이율 외에 데이터 추가
						$("#return3").children().each(function(index1) {
							//	tr
							
							$(this).children().each(function(index2) {
								//	td
								$("#stdSecondRate").text("평균공시이율 연복리 " + dataArray[i].stdRate + "% 가정시");
								
								switch (index2) {
								case 0:	if (i == 1) { $(this).text(nowRate[index1].totTerm); } break;
								case 1: if (i == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 2: if (i == 0) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 3: if (i == 0) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								case 4: if (i == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 5: if (i == 1) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 6: if (i == 1) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								case 7: if (i == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 8: if (i == 2) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 9: if (i == 2) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								}
							});
						});
						
						//	최저이율
						$("#return2").children().each(function(index1) {
							//	tr
							
							$(this).children().each(function(index2) {
								//	td
								switch (index2) {
									case 0:	if (i == 1) { $(this).text(nowRate[index1].totTerm); } break;
									case 1: if (i == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 2: if (i == 0) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 3: if (i == 0) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
									case 4: if (i == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 5: if (i == 1) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 6: if (i == 1) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
									case 7: if (i == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 8: if (i == 2) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 9: if (i == 2) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
								}
							});
						});
					}
				}
			} else if (type == "free") {
				nowRate = dataArray[1].nowRateArry;
				lowRate = dataArray[1].lowRateArry;
				stdRate = dataArray[1].stdRateArry;
				
				//	현재 이율
				$("#return1").children().each(function(index1) {
					//	tr

					$(this).children().each(function(index2) {
						
						//	td
						switch (index2) {
							case 4: $(this).text(addCommas(nowRate[index1].napMoney) + "원"); break;
							case 5: $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); break;
							case 6: $(this).text(nowRate[index1].RtnRatio + "%"); break;
						}
					});
				});
				
				//현재이율, 최저이율 외에 데이터 추가
				$("#return3").children().each(function(index1) {
					//	tr

					$(this).children().each(function(index2) {
						
						//	td
						switch (index2) {
							case 4: $(this).text(addCommas(nowRate[index1].napMoney) + "원"); break;
							case 5: $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); break;
							case 6: $(this).text(stdRate[index1].RtnRatio + "%"); break;
						}
					});
				});				
				
				//	최저이율
				$("#return2").children().each(function(index1) {
					//	tr
					
					$(this).children().each(function(index2) {
						//	td
						switch (index2) {
							case 4: $(this).text(addCommas(nowRate[index1].napMoney) + "원"); break;
							case 5: $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); break;
							case 6: $(this).text(lowRate[index1].RtnRatio + "%"); break;
						}
					});
				});
			}
		}
		
		addClassToDetailReturn($("#return1"));
		addClassToDetailReturn($("#return3"));
		addClassToDetailReturn($("#return2"));
	}
	
	// 친절한 설명
	function showAdvice(result){
		var $areaBoxAdvice = $('#areaBoxAdvice');
		var $uiInsuAges = $areaBoxAdvice.find('span[data-role="uiInsuAge"]');
		var insuAge = getInsuAgeByYmd($("#birthday").val());
		
		if(!insuAge){
			insuAge = getInsuAgeByYmd('19' + result.arryData[1].inputObj.ssn1);
		}
		
		$uiInsuAges.text('보험나이 ' + insuAge + '세');
		
		$.each(result.arryData, function(i, v){
			if(v.inputObj){
				var contAmt = Number(v.inputObj.contAmt);
				var payPeriod = Number(v.inputObj.payPeriod);
				var payPeriodEnd = Number(insuAge) + payPeriod;
				var annAge = Number(v.inputObj.annuityAge);
				
				if(payPeriod == 99){
					payPeriod = Number(v.inputObj.insuPeriod);
					payPeriodEnd = annAge;				
				}
				
				var annPeriod = annAge - payPeriodEnd;
				var annAmt = Number(v.annuityMoney);
				var annPeriodTxt = annPeriod + '년 뒤 ';
				
				if(annPeriod < 1){
					annPeriodTxt = '';
				}
				
				var $uiContAmt = $areaBoxAdvice.find('em[data-role="uiContAmt"]').eq(i);
				var $uiPayPeriod = $areaBoxAdvice.find('em[data-role="uiPayPeriod"]').eq(i);
				var $uiPayPeriodEnd = $areaBoxAdvice.find('span[data-role="uiPayPeriodEnd"]').eq(i);
				var $uiAnnAge = $areaBoxAdvice.find('span[data-role="uiAnnAge"]').eq(i);
				var $uiAnnAmt = $areaBoxAdvice.find('em[data-role="uiAnnAmt"]').eq(i);
				
				$uiContAmt.text(addCommas(parseInt(contAmt / 10000)) + '만원');
				$uiPayPeriod.text(payPeriod + '년간 납입');
				$uiPayPeriodEnd.text(payPeriodEnd + '세');
				$uiAnnAge.text(annPeriodTxt + annAge + '세');
				$uiAnnAmt.text('연금 ' + addCommas(parseInt(annAmt / 10000)) + '만원');
			}
		});
		
		$('div.case1-2').show().siblings('div').hide();
	}
	
	function iAnnuitySetBonusTxt(){
		//fnCalcBonusPeriod();
		fnCalcBonusAmount();
	}
	
	function fnCalcBonusPeriod(){
		// 연금개시나이 - 1년 되는 시점
		var period = $("#annAge").find("option:selected").val() - getInsuAgeByYmd($("#birthday").val()) - 1;
		$("#spanBonusPeriod").html(period);
	}
	
	function fnCalcBonusAmount(){
		var amount=0;
		var annAge = $("#annAge").find("option:selected").val();
		var napPeriod = 0;
		var insuAge = getInsuAgeByYmd($("#birthday").val());
		var insuPeriod = parseInt(annAge) - insuAge;
		var napPrm = $("#napMoney").val();
		// 납입기간 세팅
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
