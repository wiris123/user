	var startMoney, endMoney;			// 보험료 범위
	var startAge, endAge;				// 나이 범위
	
	var RECOMMEND_BEST = {"napTerm":{"best":"10", "recommend":"20"}, "insTerm":{"best":"65"}};
	
	//	연금개시나이 select 처리
	var annuityCBAnnAge = function (inputObj) {
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
					//insHtml +='<option value="' + i + '" ' + selected + '>' + i + valTxt + '</option>';
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
			//생년월일, 성별 변경 시 연금개시나이, 납입기간 변경
			$('#annAgeRecommendResultPop1').html($('#annAge').val());
			$('#annAgeRecommendResultPop2').html($('#annAge').val());
			$("#annuityAgeRcmd").val($("#annAge").val());
		} else {
			
			var annAge = inputObj.annuityAge;
			
			sessionChecked = true;
			sessionNapTerm = inputObj.payPeriod;
			sessionNapMoney = inputObj.contAmt;
			
			//	입력폼 세팅
			$("#annAge").val(annAge);
			$("#annAge option[value='" + annAge + "']").change();
			$('#annAgeRecommendResultPop1').html($('#annAge').val());
			$('#annAgeRecommendResultPop2').html($('#annAge').val());
			$("#annuityAgeRcmd").val($("#annAge").val());
		}
	}
	
	//	납입기간 select 처리
	var annuityCBNapTerm = function () {
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
			napHtml += '<option value="' + shiftVal + '" ' + recommendBestStyle + selected +'>' + value.padPrdTypVal + value.padPrdTypCdNm + recommendBest + '</option>';
			//napHtml += '<option value="' + shiftVal + '" ' + selected +'>' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
			selected = '';
		});	
		$("#napTerm").html(napHtml);
		
		annuitySetCustInfo();		
		
		//생년월일 변경 시에만 추천 연금개시나이, 납입기간 변경되도록 수정 (연금개시나이만 변경 시 추천 납입기간 변경 안 되도록)
		if($("#isBirthGenderChanged").val()=='Y'){
			//생년월일, 성별 변경 시 연금개시나이, 납입기간 변경
			$("#napTermRecommendResultPop1").html($("#napTerm").val());
			$("#napTermRecommendResultPop2").html($("#napTerm").val());
			$("#payPeriodRcmd").val($("#napTerm").val());
		}
		$("#isBirthGenderChanged").val("N");
		
		
		if (sessionChecked) {
			
			var napTerm = sessionNapTerm;
			
			$("#napTerm").val(sessionNapTerm);
			$("#napTerm option[value='" + sessionNapTerm + "']").change();			
						
			$("#napMoney").val(parseInt(sessionNapMoney) / 10000);
			$("#napMoney").click();
			
			//	세부 고객정보 세팅
			annuitySetCustInfo();
			
			// 결과 그래프 처리
	    	showGraph(
	    				insuranceType, 
	    				getInsuAgeByYmd($("#birthday").val()), 
	    				$("#annAge").find("option:selected").val(), 
	    				$("#napTerm").find("option:selected").val()
	    	);
	    	
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
			annuityPlanCalc("simple");
		}
	}
	
	//	PF 연동 - 연금개시 나이
	function annuityGetAnnuityAge(date, slpCode, birth, gender, annAge) {

		if (birth.length < 8) { return; }
		if (!validateCustAge()) { return; }
//		if (!isReadyToPF(birth, gender)) { return; }
				
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender, annAge);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender, annAge);
		selPrdtCdInfoByPrcd(jsonData, annuityCBAnnAge);
	}
	
	//	PF 연동 - 납입기간
	function annuityGetNapTerm(date, slpCode, birth, gender, annAge) {
		
		if (!validateCustAge()) { return; }
		
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender, annAge);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender, annAge);
		selPrdtCdInfoByPrcd(jsonData, annuityCBNapTerm);
	}
	
	//	PF 연동 - 세션체크
	function annuityCheckSession(inputObj, date) {
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
		selPrdtCdInfoByPrcd(jsonData, annuityCBAnnAge, inputObj);
	}
	
	// 가입설계 계산
	function annuityPlanCalc(type){
		var contBirth = $("#birthday").val();
		var contGender =  $("input[name=pgender]:checked").val();
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
		if (!annuitySetFormValue(contBirth, contGender, annAge, payPeriod, premium, type)) return;
		
		var frm = $("#frm")[0];
		frm.planType.value = type;
		
		showLoadingDialog(true);
		
		// 폼 파라메터 처리 
		var jsonData = jQuery("#frm").serializeObject();
		$.ajax({
			type : "POST",
			url : "/annuityCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					// 결과뿌리기
					annuitySetResult(result);
					annuitySetCustInfo();
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
				    	adbAnnuityCalc(adobeTrackParam);
				    }else{
				    	adobeTrackParam.annStartAge = annAge;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.arryData[1].inputObj.contAmt;
				    	adbAnnuityReCalc(adobeTrackParam);
				    }
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
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		// 170704추가
		ga('set', 'metric1', premium);
		ga('set', 'dimension1', contBirth.substring(0, 4));
		ga('set', 'dimension2', contGender);
		
		//ga('send','event','Direct','Calculation','annuity_top',1);
		NCDC_LOAD();
		goog_report_conversion();
	}
	
	
	// 금액범위 가져오기
	function annuityGetInsuScope(napTerm, fullAge, age, annuityAge) {
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
	
    // 고객 정보 세팅
    function annuitySetCustInfo() {
    	
    	var element = $("#custInfo").children();
    	//	$(element[0])			//	보험나이
    	//	$(element[1])			//	성별
    	//	$(element[2])			//	공시이율
    	
    	var annuityAge;		//	연금개시나이
    	var napTerm;		//	납입기간
		var option;
		var htmlStr = "";
		
    	var age = getInsuAgeByYmd($("#birthday").val());		//	보험나이
    	var fullAge = getFullAgeByYmd($("#birthday").val());  	//	만나이
    	if (age != "") {
	    	if (!chkDate($("#birthday").val())) {
	    		alert("생년월일을 올바르게 입력해주세요.");
	    		$('#birthday').focus();
	    		$('#birthday').val("");
	    		return false;
	    	}
	    	
	    	// 보험나이 - 만나이가 0 이면 55세부터 가능
    		var annStartAge;
    		if ((fullAge >= $staAge) && (age <=$endAge)) {
    			if (age <= 50){
    				if ((fullAge - age) == 0) {
    	    			annStartAge = 55;
    	    		} else {
    	    			annStartAge = 56;
    	    		}
    			} else {
    				if ((fullAge - age) == 0) {
    	    			annStartAge = age + 5;
    	    		} else {
    	    			annStartAge = age + 6;
    	    		}
    			}
    		} else {
    			alert("고객님은 " + age + "세 입니다. \n\n인터넷연금저축보험 가입나이는 "+ $staAge + "세 ~ " + $endAge + "세 입니다.");
    			
        		$("#annAge").empty();
        		htmlStr = "<option value=''>연금개시나이 선택</option>";		
        		$("#annAge").html(htmlStr);    		
        		
        		$("#napTerm").empty();
        		htmlStr = "<option value=''>납입기간 선택</option>";		
        		$("#napTerm").html(htmlStr);    		
        		
        		$("#napMoney").val("");    		
        		return false;
    		}
    		
    		/*
    		var birth = '';
    		var ageHtml = '';
    		
    		birth = $("#birthday").val().substr(2, 6);
    		ageHtml = '<span class="tit">보험나이 :</span><strong>' + age + '</strong>세 (' + birth + ')';
    		$(element[0]).html(ageHtml);*/
    	}

    	// 성별
    	var gender = $("input[name=pgender]:checked").val();
    	/*var genderHtml = '<span class="tit">성별 :</span>';
    	if (gender == "1") { genderHtml += '남성'; }
    	else if (gender == "2") { genderHtml += '여성'; }
    	$(element[1]).html(genderHtml);*/
    	
    	// 보험료 Scope Set
    	annuityAge = $("#annAge option:selected").val();
    	napTerm = $("#napTerm option:selected").val();
    	if (napTerm != "" && gender != "" && age != "" && annuityAge != "") {
    		var obj = annuityGetInsuScope(napTerm, fullAge, age, annuityAge);
    		startMoney = obj.startMoney;
    		endMoney = obj.endMoney;
    		startAge = obj.startAge;
    		endAge = obj.endAge;
    		
    		var text = "납입금액 " + startMoney + "~" + endMoney + "만원";
    		$("#napMoneyExample").text(text);
    	}
    	
    	//	detail 고객정보
    	var tmp = "";
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	납입기준
	    			tmp = $("#napTerm option:selected").text();
	    			tmp = tmp.replace("납입기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			$(this).find("strong").text(tmp);
	    			break;
	    		case 1 :
	    			//	보험나이, 성별
	    			tmp = $("#annAge option:selected").text();
	    			tmp = tmp.replace("연금개시나이 : ", "").replace("세", "").replace(/\sBEST★|추천★/g, "");
	    			$($(this).find("strong")[0]).text(tmp);
	    			$($(this).find("strong")[1]).text(age);
	    			break;
	    		}
    	});
    }    

	// 폼세팅 
    function annuitySetFormValue(contBirth, contGender, annuityAge, payPeriod, premium, type) {
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
    	
    	if (!$.isNumeric(annuityAge)){
    		alert("연금개시나이를 입력해주세요");
    		return false;    		
    	}

    	if (!$.isNumeric(payPeriod)){
    		alert("납입기간을 선택해주세요");
    		return false;    		
    	}

    	if (!$.isNumeric(premium)){
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

    	if ((parseInt(premium, 10) < startMoney) || (parseInt(premium, 10) > endMoney)) {
    		alert("납입금액은 " + startMoney + "만원 ~ " + endMoney + "만원 까지 입력해주세요.");
    		
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
	function annuitySetResult(result){
		
		var arryData = result.arryData;
		var data;
		var monthlyPremium;
		var taxCredit;
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
				annuitySetSubResult(data, i, totPremiumArry, arryData1, arryData2, arryData3);
				if(i>=3){
					// 추천설계
					annuitySetRecommendSubResult(arryData[i], i);
				}
			}
			
			
		} else if (type == "free") {
			data = arryData[1];
			
			monthlyPremium = parseInt(data.totPremium / 10000);
			//taxCredit = (monthlyPremium * 12 * 13.07 / 100).toFixed(1);
			taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
			
			$("#monthlyPremium2-2").text($("#monthlyPremium2").val());
			
			//	최대 세액공제액	(납입금액 * 12 * 13.07% : 소수점 첫째자리까지만 표시)
			//	최대 세액공제액	(납입금액 * 12 * 16.5% : 소수점 첫째자리까지만 표시) 최대 66만원
			//if (taxCredit >= 52.8) taxCredit = 52.8;					
			if (taxCredit >= 66) taxCredit = 66;					
			$("#taxCredit2").text(taxCredit);
			$("#taxCredit2-2").text(taxCredit);			

			//	매년 연금수령액
			$("#annuityMoney2").text(addCommas(parseInt(data.annuityMoney / 10000)));
			$("#annuityMoney2-2").text(addCommas(parseInt(data.annuityMoney / 10000)));
			
			//	환급율
			$("#returnRatio2").text(data.returnRatio);
			$("#returnRatio2-2").text(data.returnRatio);
			
			var title = "월 " + parseInt(data.totPremium / 10000) + "만원";
			
			planSetDetailTitle($("#guaranteeTitle1-0"), title, 1);
			planSetDetailTitle($("#guaranteeTitle2-0"), title, 1);
			planSetDetailTitle($("#returnTitle1-0"), title, 1);
			planSetDetailTitle($("#returnTitle2-0"), title, 1);
			planSetDetailTitle($("#returnTitle3-0"), title, 1);
			
			//	이메일 데이터 세팅
			totPremiumArry[1] = monthlyPremium;
			arryData1[1] = taxCredit;
			arryData2[1] = parseInt(data.annuityMoney / 10000);
			arryData3[1] = data.returnRatio;
		}
		
		prevVal = $("#monthlyPremium2").val();
		
		//	상세보기 (보장내용)
		annuitySetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		annuitySetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
		f.arryData3.value = arryData3;
		
		showAdvice(result);
	}
	
	function annuitySetSubResult(data, index, totPremiumArry, arryData1, arryData2, arryData3) {

		var monthlyPremium = "0";
		var taxCredit = "0";
		var annuityMoney = "0";
		var returnRatio = "0";
		var title = "";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			monthlyPremium = parseInt(data.totPremium / 10000);
			//taxCredit = (monthlyPremium * 12 * 13.07 / 100).toFixed(1);
			taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
			annuityMoney = addCommas(parseInt(data.annuityMoney / 10000));
			returnRatio = data.returnRatio;
			title = "월 " + monthlyPremium + "만원";
			
			//if (taxCredit >= 52.8) taxCredit = 52.8;
			if (taxCredit >= 66) taxCredit = 66;

			var order = index + 1;
			
			if (index == 1) {
				$("#monthlyPremium" + order).val(monthlyPremium);
				$("#monthlyPremium" + order +"-2").text(monthlyPremium);
			} else {
				$("#monthlyPremium" + order).text(monthlyPremium);
				$("#monthlyPremium" + order +"-2").text(monthlyPremium);				
			}
			
			$("#taxCredit" + order).text(taxCredit);
			$("#taxCredit" + order +"-2").text(taxCredit);
			
			$("#annuityMoney" + order).text(annuityMoney);
			$("#annuityMoney" + order + "-2").text(annuityMoney);
			
			$("#returnRatio" + order).text(returnRatio);
			$("#returnRatio" + order + "-2").text(returnRatio);
		}
		
		planSetDetailTitle($("#guaranteeTitle1-0"), title, index);
		planSetDetailTitle($("#guaranteeTitle2-0"), title, index);
		planSetDetailTitle($("#returnTitle1-0"), title, index);
		planSetDetailTitle($("#returnTitle2-0"), title, index);
		planSetDetailTitle($("#returnTitle3-0"), title, index);
		
		//	이메일 데이터 세팅
		totPremiumArry[index] = monthlyPremium;
		arryData1[index] = taxCredit;
		arryData2[index] = annuityMoney.replace(/,/g, "");
		arryData3[index] = returnRatio;
	}
	
	// 생년월일, 성별 변경시 추천설계 값 세팅
	function annuitySetRecommendSubResult(data, index){
		var monthlyPremium = "0";
		var taxCredit = "0";
		var annuityMoney = "0";
		var returnRatio = "0";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			monthlyPremium = parseInt(data.totPremium / 10000);
			//taxCredit = (monthlyPremium * 12 * 13.07 / 100).toFixed(1);
			taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
			annuityMoney = addCommas(parseInt(data.annuityMoney / 10000));
			returnRatio = data.returnRatio;
			title = "월 " + monthlyPremium + "만원";
			
			if (taxCredit >= 66) taxCredit = 66;
			var idx = index - 2;
			
			/*
			 * idx : 1, 2
			 * 1. 연말정산 세액공제 최대로 받는 설계 (34만원)
			 * 2. 연령대별 추천금액
			 * */
			$("#monthlyPremiumRecommendResultPop" + idx).html(monthlyPremium); 
			$("#taxCreditRecommendResultPop" + idx).html(taxCredit);
			$("#annuityMoneyRecommendResultPop" + idx).html(annuityMoney);
			$("#returnRatioRecommendResultPop" + idx).html(returnRatio);
			
			planSetDetailTitle($("#guaranteeTitle1-" + idx), title, 0);
			planSetDetailTitle($("#guaranteeTitle2-" + idx), title, 0);
			planSetDetailTitle($("#returnTitle1-" + idx), title, 0);
			planSetDetailTitle($("#returnTitle2-" + idx), title, 0);
			planSetDetailTitle($("#returnTitle3-" + idx), title, 0);
		}
	}
	
	//	상세보기 (보장내용)
	function annuitySetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					annuitySetSubDetail1(data, i);
				}
			} else if (type == "free") {
				data = dataArray[1];
				annuitySetSubDetail1(data, 1);
				
			} 
		}
	}
	
	function annuitySetSubDetail1(data, index) {
		
		var nowTime10  = "-";
		var nowTime20  = "-";
		var nowTime30  = "-";
		var nowTime100 = "-";
		var nowYear5  = "-";
		var nowYear10 = "-";
		var nowYear15 = "-";
		var nowYear20 = "-";
		var nowYear30 = "-";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			//	종신 연금형
			nowTime10  = addCommas(parseInt(data.nowTime10 / 10000)) + "만원";
			nowTime20  = addCommas(parseInt(data.nowTime20 / 10000)) + "만원";
			nowTime30  = addCommas(parseInt(data.nowTime30 / 10000)) + "만원";
			nowTime100 = addCommas(parseInt(data.nowAge100 / 10000)) + "만원";
			
			//	확정기간 연금형
			nowYear5  = addCommas(parseInt(data.nowYear5 / 10000)) + "만원";
			nowYear10 = addCommas(parseInt(data.nowYear10 / 10000)) + "만원";
			nowYear15 = addCommas(parseInt(data.nowYear15 / 10000)) + "만원";
			nowYear20 = addCommas(parseInt(data.nowYear20 / 10000)) + "만원";
			nowYear30 = addCommas(parseInt(data.nowYear30 / 10000)) + "만원";
		}
		
		var idx = index >=3 ? index - 2 : 0;
		var idx2 = index >=3 ? 1 : index + 1;
		
		//	종신 연금형
		$("#guarantee1-"+idx).children().each(function(index1) {
			switch (index1) {
				case 4:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowTime10); } }); break;
				case 5:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowTime20); } }); break;
				case 6:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowTime30); } }); break;
				case 7:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowTime100); } }); break;
			}
		});
			
		//	확정기간 연금형
		$("#guarantee2-"+idx).children().each(function(index1) {
			switch (index1) {
				case 4:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowYear5); } }); break;
				case 5:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowYear10); } }); break;
				case 6:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowYear15); } }); break;
				case 7:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowYear20); } }); break;
				case 8:
					$(this).children().each(function(index2) { if (index2 == idx2) { $(this).text(nowYear30); } }); break;
			}
		});
	}
	
	//	상세보기 (해지환급금)
	function annuitySetDetail2(type, dataArray) {
		var nowRate;
		var lowRate;
		var stdRate;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {
				
				//clearPlanDetailAnnuity(dataArray[1], idx);  // #guarantee1-0, #guarantee2-0, #return1-0, #return2-0
				//dataArray[0] 일때 테이블 html을 미리 만들어 둬야해서 for문 전에 호출
				clearPlanDetailAnnuity(dataArray[1], 0);
				
				for (var i = 0; i < dataArray.length; i++) {
					if (typeof(dataArray[i]) != "undefined" && typeof(dataArray[i].inputObj) != "undefined") {
						
						var idx = (i >= 3) ? i-2 : 0; // 해지환급금 테이블번호 
						var idx2 = (i >= 3) ? 0 : i; // 해지환급금 td 번호
						var idx3 = (i != 0 && i != 2) ? true : false; // 해지환급금 0,2번 제외
						
						//#guarantee1-1, #guarantee1-2, #guarantee2-1, #guarantee2-2, #return1-1, #return1-2, #return2-1, #return2-2
						if(idx != 0){
							clearPlanDetailAnnuity(dataArray[i], idx);
						}						
						
						nowRate = dataArray[i].nowRateArry;
						lowRate = dataArray[i].lowRateArry;
						stdRate = dataArray[i].stdRateArry;
												
						
						//	현재 이율
						$("#return1-"+idx).children().each(function(index1) {
							//	tr
							
							$(this).children().each(function(index2) {
								//	td
								if (idx3 && index1 == 0 && index2 == 0) {
									$("#stdRate"+idx).text("현재공시이율 연복리 " + dataArray[i].nowRate + "% 가정시");
								}
								
								switch (index2) {
									case 0:	if (idx3) { $(this).text(nowRate[index1].totTerm); } break;
									case 1: if (idx2 == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 2: if (idx2 == 0) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 3: if (idx2 == 0) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
									case 4: if (idx2 == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 5: if (idx2 == 1) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 6: if (idx2 == 1) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
									case 7: if (idx2 == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 8: if (idx2 == 2) { $(this).text(addCommas(nowRate[index1].rtnMoney) + "원"); } break;
									case 9: if (idx2 == 2) { $(this).text(nowRate[index1].RtnRatio + "%"); } break;
								}
							});
						});
						
						//	현재이율, 최저이율 외에 데이터 추가
						$("#return3-"+idx).children().each(function(index1) {
							//	td
//							if (idx3 && index1 == 0 && index2 == 0) {
								$("#stdSecondRate"+idx).text("평균공시이율 연복리 " + dataArray[i].stdRate + "% 가정시");
//							}
							
							$(this).children().each(function(index2) {
								//	td
								switch (index2) {
								case 0:	if (idx3) { $(this).text(nowRate[index1].totTerm); } break;
								case 1: if (idx2 == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 2: if (idx2 == 0) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 3: if (idx2 == 0) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								case 4: if (idx2 == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 5: if (idx2 == 1) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 6: if (idx2 == 1) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								case 7: if (idx2 == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
								case 8: if (idx2 == 2) { $(this).text(addCommas(stdRate[index1].rtnMoney) + "원"); } break;
								case 9: if (idx2 == 2) { $(this).text(stdRate[index1].RtnRatio + "%"); } break;
								}
							});
						});
						
						//	최저이율
						$("#return2-"+idx).children().each(function(index1) {
							//	tr
							
							$(this).children().each(function(index2) {
								//	td
								switch (index2) {
									case 0:	if (idx3) { $(this).text(nowRate[index1].totTerm); } break;
									case 1: if (idx2 == 0) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 2: if (idx2 == 0) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 3: if (idx2 == 0) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
									case 4: if (idx2 == 1) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 5: if (idx2 == 1) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 6: if (idx2 == 1) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
									case 7: if (idx2 == 2) { $(this).text(addCommas(nowRate[index1].napMoney) + "원"); } break;
									case 8: if (idx2 == 2) { $(this).text(addCommas(lowRate[index1].rtnMoney) + "원"); } break;
									case 9: if (idx2 == 2) { $(this).text(lowRate[index1].RtnRatio + "%"); } break;
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
				$("#return1-0").children().each(function(index1) {
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
				
				//	현재이율, 최저이율 외에 데이터 추가
				$("#return3-0").children().each(function(index1) {
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
				$("#return2-0").children().each(function(index1) {
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
		
		for(var i=0; i < dataArray.length-2; i++){
			addClassToDetailReturn($("#return1-"+i));
			addClassToDetailReturn($("#return3-"+i));
			addClassToDetailReturn($("#return2-"+i));
		}
		
		
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
	
	// 생년월일 입력 시 나이대 구하기
	function getAgeGroupFromBirth(){
		var contBirth = $("#birthday").val();
		var age = parseInt( getInsuAgeByYmd(contBirth) );
		var ageGroup = parseInt(age/10);
		
		if(ageGroup == 2){
			return "20";
		}else if(ageGroup == 3){
			return "30";
		}else if(ageGroup == 4){
			return "40";
		}else if(ageGroup > 4){
			return "50";
		}
	}
	
	// 계산기(직접설계, 추천설계) 17.11.13
	// 추천설계 - 연령대 많이 선택한 팝업 : 연령별 금액, 나이 text 변경
	function popupAgeData(age){
		var target = $("[data-popup-target='result_pop02']");
		var amount, idx;
		
		if(age == 50){
			amount = "월 50~100만원";
			idx = 0;
		} else if(age == 40){
			amount = "월 50~70만원";
			idx = 1;
		} else if(age == 30){
			amount = "월 50~100만원";
			idx = 2;
		} else if(age == 20){
			amount = "월 300,000원 이상";
			idx = 3;
		}
		
		target.find(".result-info").removeClass("age20 age30 age40 age50").addClass("age"+age);
		target.find(".text .point").text(amount);
		target.find(".result-calc .title em").text(age);
		target.find(".guide p").hide().eq(idx).show();
		target.find(".guide-rateTxt").show();
	}
	
	function showTable(type){
		switch(type){
			case 'direct':
				$(".guaranteeTableDirect").removeClass("none");
				$(".guaranteeTableRecommend1").addClass("none");
				$(".guaranteeTableRecommend2").addClass("none");
				$(".returnTableDirect").removeClass("none");
				$(".returnTableRecommend1").addClass("none");
				$(".returnTableRecommend2").addClass("none");
				break;
				
			case 'recommend1':
				$(".guaranteeTableDirect").addClass("none");
				$(".guaranteeTableRecommend1").removeClass("none");
				$(".guaranteeTableRecommend2").addClass("none");
				$(".returnTableDirect").addClass("none");
				$(".returnTableRecommend1").removeClass("none");
				$(".returnTableRecommend2").addClass("none");
				break;
				
			case 'recommend2':
				$(".guaranteeTableDirect").addClass("none");
				$(".guaranteeTableRecommend1").addClass("none");
				$(".guaranteeTableRecommend2").removeClass("none");
				$(".returnTableDirect").addClass("none");
				$(".returnTableRecommend1").addClass("none");
				$(".returnTableRecommend2").removeClass("none");
				break;
		}
	}
