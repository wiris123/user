	// 보험 메인정보 세팅
	// 판매예규정보 : 판매방법 : 가입나이, 납인기간, 가입한도, 가입조건표 세팅정보 
	var variableSavingMainScope = [];
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"3", "gender":"1", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"3", "gender":"2", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"5", "gender":"1", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"5", "gender":"2", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"7", "gender":"1", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"7", "gender":"2", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"10", "gender":"1", "startAge":"20", "endAge":"65"});				
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"10", "gender":"2", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"12", "gender":"1", "startAge":"20", "endAge":"65"});				
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"12", "gender":"2", "startAge":"20", "endAge":"65"});
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"20", "gender":"1", "startAge":"20", "endAge":"55"});				
	variableSavingMainScope.push({"insTerm":"999", "napTerm":"20", "gender":"2", "startAge":"20", "endAge":"55"});
	
	var RECOMMEND_BEST = {"napTerm":{"best":"5", "recommend":"10"}};
	
	var startNapTerm, endNapTerm ;		// 납입기간 범위
	var startMoney = 5;					// 보험료 범위(최소)
	var maxMoney = 10000;				// 보험료 범위(최대)
	var startAge, endAge;				// 나이 범위
	
	//	연금개시나이 select 처리
	var variableSavingCBInsTerm = function (inputObj) {
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
				insHtml += '<option value="' + value.insrPrdTypVal + '">보험기간 : ' + valInsrPrd+valTxt + '</option>';
			});
		} else {
			insHtml = "<option>보험기간 선택</option>";							
		}
		
		$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		
		if (insTermArray.length == 1) {
			$("#insTerm").attr("disabled", true);
			$('#insTerm').parent().addClass('select-fixed');
		}
		
		if (typeof(inputObj) == "undefined") {
			//	이메일로 타고 왔을때
			if (paramUsed && paramData != null) {
				variableSavingMakeNapTerm();
				
				$("#napTerm").val(paramData.payPeriod);
				$("#napMoney").val(paramData.premium).click();
				
				paramData = null;
				variableSavingPlanCalc("simple");
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);

			variableSavingMakeNapTerm();			
			$("#napTerm").val(inputObj.payPeriod);
			
			$("#napMoney").val(inputObj.contAmt / 10000);
			$("#napMoney").click();
			
			//	세부 고객정보 세팅
			variableSavingSetCustInfo();
			
			// 결과 그래프 처리
			/*
	    	showGraph(
	    				insuranceType, 
	    				getInsuAgeByYmd($("#birthday").val()), 
	    				10, 
	    				$("#napTerm").find("option:selected").val()
	    	);
			*/
	    	showResultDiv(true, calculatorCheckEvent);
		}
	};
	
	//	PF 연동 - 보험기간
	function variableSavingGetInsuranceTerm(date, slpCode, birth, gender) {
		
		if (birth.length < 8) { return; }
		//if (!validateCustAge()) { return; }
		
		var age = parseInt(getInsuAgeByYmd(birth));
		var staAge = 20;
		var EndAge = 65;
		
		/*
		 * PF 후에 처리
		 * pIPadPrdListElemVO[0].msgCd
		pIPadPrdListElemVO[0].msgCntnt*/
		
		if (age > EndAge || age < staAge) {
			alert("고객님은 " + age + "세 입니다. \n\n인터넷변액적립보험 가입나이는 "+ staAge + "세 ~ "+ EndAge + "세 입니다.");
			$("#birthday").focus();
			$("#birthday").val("");
			return;
		}
		
		//if (!isReadyToPF(birth, gender)) { return; }
		
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		selPrdtCdInfoByPrcd(jsonData, variableSavingCBInsTerm);
	}
	
	//	PF 연동 - 세션체크
	function variableSavingCheckSession(inputObj, date) {
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		
		selPrdtCdInfoByPrcd(jsonData, variableSavingCBInsTerm, inputObj);
	}
	
	function variableSavingMakeNapTerm() {
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
					else{
						recommendBestStyle = '';
					}
				}
				if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
					 selected = 'selected="selected"';
					 cnt ++;
				}
				napHtml += '<option value="' + value.padPrdTypVal + '" ' + recommendBestStyle + selected +'>납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + recommendBest +'</option>';
				selected = '';
			});	
			$("#napTerm").html(napHtml);
		}
	}
		
	// 가입설계 계산
	function variableSavingPlanCalc(type) {
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		var payPeriod = $("#napTerm option:selected").val();
		var premium = $("#napMoney").val();
		
		if (type == "free") { premium = $("#monthlyPremium2").val(); }
		
		// 폼세팅
		if (!variableSavingSetFormValue(contBirth, contGender, insuPeriod, payPeriod, premium, type)) return;
		
		// 가입설계 계산 
		var frm = $("#frm")[0];
		frm.planType.value = type;
		
		// 폼 파라메터 처리 
		var jsonData = jQuery("#frm").serializeObject();
		
		showLoadingDialog(true);
		
		// 조회시 기본 수익률 3.5%고정
		lastSelectRate = 1;
		
		//$('#nowRate, #nowRate2').val(lastSelectRate).prop('selected', true);
		
		jQuery.ajax({
			type : "POST",
			url : "/variableSavingCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					lastSelectArrayData = result.arryData;
					variableSavingSetResult(result);
					variableSavingSetCustInfo();
					// 결과 그래프 처리
			    	//showGraph(insuranceType, getInsuAgeByYmd(contBirth), 10, payPeriod);
			    	showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.arryData[1].totPremium,
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
				    if(type == "free"){
				    	adobeTrackParam.insuPeriod = insuPeriod;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.arryData[1].inputObj.contAmt;
				    	adbVariableSavingReCalc(adobeTrackParam);
				    }else{
				    	adbVariableSavingCalc(adobeTrackParam);
				    }
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
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
		
		ga('send','event','Direct','Calculation','Vsaving_top',1);
		NCDC_LOAD();
		goog_report_conversion();
	}
	
	// 금액범위 가져오기
	function variableSavingGetInsuScope(insTerm, napTerm, gender, age) {
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
	
    // 고객 정보 세팅
    function variableSavingSetCustInfo() {
    	
    	// 보험나이 
        var age = getInsuAgeByYmd($("#birthday").val());
		
    	// 성별
    	var gender = $("input[name=pgender]:checked").val();

    	// 보험료 Scope Set
    	var insTerm = $("#insTerm option:selected").val();
    	var napTerm = $("#napTerm option:selected").val();
    	
    	if (insTerm != "" && napTerm != "" && gender != "" && age != ""){
    		var obj = variableSavingGetInsuScope(insTerm, napTerm, gender, age);
    		var startAge = obj.startAge;
    		var endAge = obj.endAge;
    		
    		if ((age < startAge) && (age > endAge)) {
    			if (!chkDate($("#birthday").val())) {
    	    		alert("생년월일을 올바르게 입력해주세요.");
    	    		$('#birthday').focus();
    	    		$('#birthday').val("");
    	    		return false;
    	    	}    			
    	    	alert("고객님은 " + age + "세 입니다. \n\n인터넷변액적립보험 가입나이는 " + startAge + "세 ~ " + endAge + "세 입니다.");
        		return false;
    		}
    	}
    	
    	//	detail 고객정보
    	var tmp = "";
    	$("#detailCustInfo").children().each(function(index) {
    		switch (index) {
	    		case 0 :
	    			//	납입기준
	    			tmp = $("#insTerm option:selected").text();
	    			tmp = tmp.replace("보험기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			$(this).find("strong").text(tmp);
	    			break;
	    		case 1 :
	    			//	보험나이, 성별
	    			tmp = $("#napTerm option:selected").text();
	    			tmp = tmp.replace("납입기간 : ", "").replace(/\sBEST★|추천★/g, "");
	    			$($(this).find("strong")[0]).text(tmp);
	    			$($(this).find("strong")[1]).text(age);
	    			break;
	    		}
    	});
    }    

	// 폼세팅 
    function variableSavingSetFormValue(contBirth, contGender, insuPeriod, payPeriod, premium, type) {
    	$("#contBirth").val(contBirth);
    	$("#contGender").val(contGender);
    	$("#insuPeriod").val(insuPeriod);
    	$("#premium").val(premium * 10000);
    	
    	if(payPeriod == "전기납"){
    		$("#payPeriod").val(10);
    	}else{
    		$("#payPeriod").val(payPeriod);
    	}
    	
    	if (getInsuAgeByYmd(contBirth) <= 0){
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#birthday").focus();
    		$('#birthday').val("");
    		return false;
    	}
    	
    	if (!chkDate(contBirth)) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$('#birthday').focus();
    		$('#birthday').val("");
    		return false;
    	}
    	
    	if (typeof contGender == 'undefined' || contGender ==""){
    		alert("성별을 선택해주세요");
    		$('#calcGender1').focus();
    		return false;	    		
    	}

    	if (!$.isNumeric(insuPeriod)){
    		alert("보험기간을 선택해주세요");
    		return false;    		
    	}
    	
    	if (payPeriod == ""){
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
    	
//    	if (startMoney == 0){
//    		alert("45~49세 해당 납입기간은 가입불가 입니다. 납입기간을 다시 선택해주세요.");
//    		return false;    		
//    	}
    	
    	if (parseInt(premium, 10) < startMoney) {
    		alert("납입금액은 " + startMoney + "만원 이상 입력해주세요.");

    		if (type == "free") {
    			$("#monthlyPremium2").focus();
    			$("#monthlyPremium2").val("");
    		} else {
    			$("#napMoney").focus();
    			$("#napMoney").val("");
    		}
    		return false;
    	}
    	
    	if (parseInt(premium, 10) > maxMoney) {
    		alert("납입금액은 " + maxMoney + "만원 이하 입력해주세요.");

    		if (type == "free") {
    			$("#monthlyPremium2").focus();
    			$("#monthlyPremium2").val("");
    		} else {
    			$("#napMoney").focus();
    			$("#napMoney").val("");
    		}
    		return false;
    	}
    	
    	//	그래프 처리
    	//variableSavingSetGraph(contBirth, $("#payPeriod").val());
    	
		return true;
    }
	
	// 결과 세팅 
	function variableSavingSetResult(result) {

		var arryData = result.arryData;
		var data;
		var type = $("#planType").val();
		
		
		if (type == "simple") {
			
			initMailData(3);
			
			planSetResultDisplay(arryData);
			
 			$("#planSeq").val(arryData[1].inputObj.planSeq);
			
			for (var i = 0; i < arryData.length; i++) {
					variableSavingSetSubResult(i);
			}
		} else if (type == "free") {
			data = getReturnDataByPeriod(1);
			$("#planSeq").val(arryData[1].inputObj.planSeq);		
			$("#monthlyPremium2-2").text($("#monthlyPremium2").val());
			$("#returnMoney2").text(addCommas(data.rtnMoney));
			$("#returnMoney2-2").text(addCommas(data.rtnMoney));			
			$("#returnRatio2").text(data.RtnRatio);
			$("#returnRatio2-2").text(data.RtnRatio);			
			
			var title = "월 " + addCommas(parseInt(arryData[1].totPremium / 10000)) + "만원";
			
			planSetDetailTitle($("#guaranteeTitle1"), title, 1);
			planSetDetailTitle($("#returnTitle1"), title, 1);
			planSetDetailTitle($("#returnTitle2"), title, 1);
			planSetDetailTitle($("#returnTitle3"), title, 1);
			
			//	이메일 데이터 세팅
			totPremiumArry[1] = parseInt(arryData[1].totPremium / 10000);
			arryData1[1] = data.rtnMoney;
			arryData2[1] = data.RtnRatio;
		}
		
		prevVal = $("#monthlyPremium2").val();
		
		//	상세보기 (보장내용)
		variableSavingSetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		variableSavingSetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
	}
	
	function variableSavingSetSubResult(index) {
		var totPremium = "0";
		var returnPeriod = "0";
		var returnMoney = "0";
		var returnRatio = "0";
		var title = "";

		if (lastSelectArrayData != null && typeof lastSelectArrayData[index].totPremium != 'undefined') {
			var data = lastSelectArrayData[index];
			
			totPremium = addCommas(parseInt(data.totPremium / 10000));
			returnPeriod = data.inputObj.payPeriod;
			
			var returnData = getReturnDataByPeriod(index);
			
			returnMoney = addCommas(returnData.rtnMoney);
			returnRatio = returnData.RtnRatio;
			title = "월 " + totPremium + "만원";

			var order = index + 1;
			if (index == 1) {
				$("#monthlyPremium" + order).val(totPremium);
				$("#monthlyPremium" + order + "-2").text(totPremium);				
			} else {
				$("#monthlyPremium" + order).text(totPremium);
				$("#monthlyPremium" + order + "-2").text(totPremium);				
			}

			$("#returnPeriod" + order).text(returnPeriod);
			$("#returnPeriod" + order + "-2").text(returnPeriod);
			$("#returnMoney" + order).text(returnMoney);
			$("#returnMoney" + order + "-2").text(returnMoney);			
			$("#returnRatio" + order).text(returnRatio);
			$("#returnRatio" + order + "-2").text(returnRatio);			
		}
		
		planSetDetailTitle($("#guaranteeTitle1"), title, index);
		planSetDetailTitle($("#returnTitle1"), title, index);
		planSetDetailTitle($("#returnTitle2"), title, index);
		planSetDetailTitle($("#returnTitle3"), title, index);
		
		//	이메일 데이터 세팅
		totPremiumArry[index] = totPremium.replace(/,/g, "");
		arryData1[index] = returnMoney.replace(/,/g, "");
		arryData2[index] = returnRatio;
	}
	
	//	그래프 처리
	/*
	function variableSavingSetGraph(contBirth, payPeriod) {
    	var graph1;
    	var graph2;
    	var age = getInsuAgeByYmd(contBirth);
    	
    	graph1 = (parseInt(payPeriod) / 10) * 100;
    	graph2 = 100 - graph1;
    		    	
    	$("#desc1").text(age + "세");
    	$("#desc2").text(parseInt(age) + parseInt(payPeriod) + "세");
    	$("#desc3").text(parseInt(age) + 10 + "세");
    	
    	$($("#graph1").children().first()).text("납입기간 " + payPeriod + "년");
    	$($("#graph2").children().first()).text("거치기간 " + (10 - payPeriod) + "년");
    	
    	$("#graph1").css("width", graph1 + "%");
    	$("#graph2").css("width", graph2 + "%");
	}
	*/

	//	상세보기 (보장내용)
	function variableSavingSetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {

				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					variableSavingSetSubDetail1(data, i);
				}
			} else if (type == "free") {
				data = dataArray[1];
				variableSavingSetSubDetail1(data, 1);
			}
		}
	}
	
	function variableSavingSetSubDetail1(data, index) {
	
		var amount = "-";
		var order = index + 1;
		
		if (typeof(data) != "undefined" && typeof(data.guaranteeArry) != "undefined") {
			if (data.guaranteeArry.length != 0) {
				amount = data.guaranteeArry[0].amt;
			}
		}
		
		$($("#guarantee2>tr").children()[order]).text(amount);
		
		/*
		if (index == 1) {
			$($("#guarantee1>tr").children()[0]).text("현 공시이율 " + data.nowRate + "%");
		}
		
		$($("#guarantee1>tr").children()[order]).text(typeof(data.returnMoney) != "undefined" ? addCommas(data.returnMoney) + "원" : "-");
		*/
	}
	
	/**
	 * 해지환급금, 보장내역 테이블 초기화
	 */
	function clearVariableSavingPlanDetail() {
		var htmlStr = "";
		// 주요기간 인덱스
		var idxOn = [3, 7, 12, 17, 22, 24, 26, 28, 30, 32];

		$("#return1").empty();
		$("#return2").empty();
		$("#return3").empty();
		
		for (var i = 0; i < (lastSelectArrayData[1].nowRateArry.length / 3); i++) {
			var isOn = false;
			
			if($.inArray(i, idxOn) > -1){
				isOn = true;
			}
			
			if (i == (lastSelectArrayData[1].nowRateArry.length / 3 - 1)) {
				var txtOn = isOn ? " on" : "";
					
				htmlStr += "<tr class='last" + txtOn + "'>" +
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
				var txtOn = isOn ? " class='on'" : "";
				
				htmlStr += "<tr" + txtOn + ">" +
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
	
	//	상세보기 (해지환급금)
	function variableSavingSetDetail2(type, dataArray) {
		if (typeof(dataArray) != "undefined") {
			
			
			var setTableData = function($wrapper, dataArray, idx, type){
				var trLength = $wrapper.find('tr').length;
				
				$wrapper.find('tr').each(function(index1) {
					$(this).find('td').each(function(index2) {
						
						// 재계산시 맞춤설계 금액만 수정
						if(type == "free" && index2 != 4 && index2 != 5 && index2 != 6){
							return true;
						}
						
						var idxTd = idx * trLength + index1;
						switch (index2) {
							case 0: $(this).text(dataArray[1].nowRateArry[idxTd].totTerm); break;
							case 1:
								if(typeof dataArray[0].nowRateArry != 'undefined'){
									$(this).text(addCommas(dataArray[0].nowRateArry[idxTd].napMoney) + "원");
								}else{
									$(this).text("-");
								}
								break;
							case 2:
								if(typeof dataArray[0].nowRateArry != 'undefined'){
									$(this).text(addCommas(dataArray[0].nowRateArry[idxTd].rtnMoney) + "원"); break;
								}else{
									$(this).text("-");
								}
							case 3:
								if(typeof dataArray[0].nowRateArry != 'undefined'){
									$(this).text(dataArray[0].nowRateArry[idxTd].RtnRatio + "%");
								}else{
									$(this).text("-");
								}
								break;
								
							case 4: $(this).text(addCommas(dataArray[1].nowRateArry[idxTd].napMoney) + "원"); break;
							case 5: $(this).text(addCommas(dataArray[1].nowRateArry[idxTd].rtnMoney) + "원"); break;
							case 6: $(this).text(dataArray[1].nowRateArry[idxTd].RtnRatio + "%"); break;
							
							case 7:
								if(typeof dataArray[2].nowRateArry != 'undefined'){
									$(this).text(addCommas(dataArray[2].nowRateArry[idxTd].napMoney) + "원");
								}else{
									$(this).text("-");
								}
								break;
							case 8:
								if(typeof dataArray[2].nowRateArry != 'undefined'){
									$(this).text(addCommas(dataArray[2].nowRateArry[idxTd].rtnMoney) + "원"); break;
								}else{
									$(this).text("-");
								}
							case 9:
								if(typeof dataArray[2].nowRateArry != 'undefined'){
									$(this).text(dataArray[2].nowRateArry[idxTd].RtnRatio + "%");
								}else{
									$(this).text("-");
								}
								break;
						}
					});
				});
				
			};
			
			if (type == "simple") {
				clearVariableSavingPlanDetail();
			}
			
			setTableData($("#return1"), dataArray, 0);
			setTableData($("#return2"), dataArray, 1);
			setTableData($("#return3"), dataArray, 2);
		}
		
		addClassToDetailReturn($("#return1"));
		addClassToDetailReturn($("#return2"));
	}
	
	function setReturnValue(idx){
		
	}
