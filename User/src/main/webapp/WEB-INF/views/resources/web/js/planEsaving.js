	// 보험 메인정보 세팅
	// 판매예규정보 : 판매방법 : 가입나이, 납인기간, 가입한도, 가입조건표 세팅정보 
	var eSavingMainScope = [];
	eSavingMainScope.push({"insTerm":"10", "napTerm":"3", "gender":"1", "startAge":"20", "endAge":"60"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"3", "gender":"2", "startAge":"20", "endAge":"65"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"5", "gender":"1", "startAge":"20", "endAge":"55"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"5", "gender":"2", "startAge":"20", "endAge":"65"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"7", "gender":"1", "startAge":"20", "endAge":"52"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"7", "gender":"2", "startAge":"20", "endAge":"63"});
	eSavingMainScope.push({"insTerm":"10", "napTerm":"10", "gender":"1", "startAge":"20", "endAge":"48"});				
	eSavingMainScope.push({"insTerm":"10", "napTerm":"10", "gender":"2", "startAge":"20", "endAge":"58"});
	
	var RECOMMEND_BEST = {"napTerm":{"best":"5"}};
	
	var startNapTerm, endNapTerm ;		// 납입기간 범위
	var startMoney = 5;					// 보험료 범위
	var startAge, endAge;				// 나이 범위
	
	
	//	연금개시나이 select 처리
	var eSavingCBInsTerm = function (inputObj) {
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

				insHtml += '<option value="' + value.insrPrdTypVal + '"> ' + value.insrPrdTypVal+valTxt + '</option>';
			});
			$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
			//	입력폼 세팅
			$("#insTerm").val("10");
			$('#insTerm').change();
		} else {
			insHtml = "<option>보험기간 선택</option>";		
			$("#insTerm").html(insHtml);// 보험기간 HTML 세팅
		}
		
		if (insTermArray.length == 1) {
			$("#insTerm").attr("disabled", true);
			$('#insTerm').parent().addClass('select-fixed');
		}
		
		if (typeof(inputObj) == "undefined") {
			//	이메일로 타고 왔을때
			if (paramUsed && paramData != null) {
				$("#insTerm").val(paramData.insuPeriod);
				esavingInitRadioInsTerm( $("#insTerm").val() );
				
				eSavingMakeNapTerm();
				
				$("#napTerm").val(paramData.payPeriod);
				esavingInitRadioNapTerm();
				
				$("#napMoney").val(paramData.premium).click();
				
				paramData = null;
				eSavingPlanCalc("simple");
			} else {
				$('#insTerm').change(); 	// 이벤트발생
			}
		} else {
			//	입력폼 세팅
			$("#insTerm").val(inputObj.insuPeriod);
			esavingInitRadioInsTerm( $("#insTerm").val() );

			eSavingMakeNapTerm();	
			
			$("#napTerm").val(inputObj.payPeriod);
			esavingInitRadioNapTerm();
			
			$("#napMoney").val(inputObj.contAmt / 10000);
			$("#napMoney").click();
			
			//	세부 고객정보 세팅
			eSavingSetCustInfo();
			
			// 결과 그래프 처리
			eSavingSetDynamicGraph(
					$("#birthday").val(), 
					$("#insTerm").find("option:selected").val(), 
					$("#napTerm").find("option:selected").val()
			);
			/*
	    	showGraph(
	    				insuranceType, 
	    				getInsuAgeByYmd($("#birthday").val()), 
	    				$("#insTerm").find("option:selected").val(), 
	    				$("#napTerm").find("option:selected").val()
	    	);
	    	*/
			
			showResultDiv(true, calculatorCheckEvent);
		}
	};
	
	//	PF 연동 - 보험기간
	function eSavingGetInsuranceTerm(date, slpCode, birth, gender) {
		
		if (birth.length < 8) { return; }
		//if (!validateCustAge()) { return; }
		
		var age = parseInt(getInsuAgeByYmd(birth));
		var staAge = 20;
		var fEndAge = 65;
		var mEndAge = 60;
		
		/*
		 * PF 후에 처리
		 * pIPadPrdListElemVO[0].msgCd
		pIPadPrdListElemVO[0].msgCntnt*/
		
		switch (gender) {
			case "1" :
				if (age > mEndAge || age < staAge) {
					alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ mEndAge + "세 입니다.");
					$("#birthday").focus();
					$("#birthday").val("");
					return;
				}
				break;
			case "2" :
				if (age > fEndAge || age < staAge) {
					alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ fEndAge + "세 입니다.");
					$("#birthday").focus();
					$("#birthday").val("");
					return;
				}
				break;
		}
		
		//if (!isReadyToPF(birth, gender)) { return; }
		
		//var jsonData = getPFJsonData(insuranceType, date, slpCode, birth, gender);
		var jsonData = getPFJsonData2(insuranceType, date, slpCode, birth, gender);
		selPrdtCdInfoByPrcd(jsonData, eSavingCBInsTerm);
	}
	
	//	PF 연동 - 세션체크
	function eSavingCheckSession(inputObj, date) {
		//var jsonData = getPFJsonData(
		var jsonData = getPFJsonData2(
										insuranceType, 
										date, 
										inputObj.repCd, 
										inputObj.contBirth,
										inputObj.contGender
		);
		selPrdtCdInfoByPrcd(jsonData, eSavingCBInsTerm, inputObj);
	}
	
	function eSavingMakeNapTerm() {
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
			// 납입기간에 따라 라디오버튼 disable
			esavingDisableRadioNapTerm(napTermArray);
			// 납입기간 셀렉트 박스 Make
			var napHtml = '';
			var selected = '';
			var cnt = 0;
			$.each(napTermArray, function(index, value){
				var recommendBestStyle = "";
				var recommendBest = "";
				
				if(RECOMMEND_BEST.napTerm){
					if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.best){
						recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;BEST★";
						recommendBestStyle = 'class="txt-c4 txt-b"';
					}
					else if(value.padPrdTypVal == RECOMMEND_BEST.napTerm.recommend){
						recommendBest = "&nbsp;&nbsp;&nbsp;&nbsp;추천★";
						recommendBestStyle = 'class="txt-c1 txt-b"';
					}
				}
				if(recommendBest.indexOf("BEST") > -1 && cnt == 0){
					 selected = 'selected="selected"';
					 cnt ++;
				}
				napHtml += '<option value="' + value.padPrdTypVal + '" ' + recommendBestStyle + selected + '> ' +value.padPrdTypVal + value.padPrdTypCdNm + recommendBest + '</option>';
				selected = '';
			});	
			$("#napTerm").html(napHtml);
			esavingInitRadioNapTerm();
		}
	}
		
	// 가입설계 계산
	function eSavingPlanCalc(type, callback) {
		var contBirth = $("#birthday").val();
		var contGender = $("input[name=pgender]:checked").val();
		var insuPeriod = $("#insTerm option:selected").val();
		var payPeriod = $("#napTerm option:selected").val();
		var premium = $("#napMoney").val();
		
		/*type simple2인 경우 : 재계산인 경우. 어도비DTM함수 재계산 함수 호출
		  어도비 재계산 확인용 임시변수 adbReCalcYn*/
		var adbReCalcYn = 'N';
		if (type == "simple2"){
			adbReCalcYn = 'Y';
			type = "simple";
		}
		
		if (type == "free") { premium = $("#monthlyPremium2").val(); }
		
		// 폼세팅
		if (!eSavingSetFormValue(contBirth, contGender, insuPeriod, payPeriod, premium, type)) return;
		
		// 가입설계 계산 
		var frm = $("#frm")[0];
		frm.planType.value = type;
				
		// 폼 파라메터 처리 
		var jsonData = jQuery("#frm").serializeObject();
		
		showLoadingDialog(true);
		
		jQuery.ajax({
			type : "POST",
			url : "/esavingCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			success : function(result) {

				if (result.success) {
					sendPromotionCallback();
					setCalcLog();
					eSavingSetResult(result);
					eSavingSetCustInfo();
					// 결과 그래프 처리
			    	//showGraph(insuranceType, getInsuAgeByYmd(contBirth), insuPeriod, payPeriod);
					eSavingSetDynamicGraph(contBirth, insuPeriod, payPeriod);
					showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.arryData[1].inputObj.premium,
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
				    	adbEsavingCalc(adobeTrackParam);
				    }else{
				    	adobeTrackParam.insuPeriod = insuPeriod;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.arryData[1].inputObj.contAmt;
				    	adbEsavingReCalc(adobeTrackParam);
				    }
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
			},
 			beforeSend: function() {},		
 			complete: function() {
 				if(callback){
 					callback();
 				}
 			},	
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		// 170704추가
		ga('set', 'metric1', premium);
		ga('set', 'dimension1', contBirth.substring(0, 4));
		ga('set', 'dimension2', contGender);
		
		ga('send','event','Direct','Calculation','esaving_top',1);
		NCDC_LOAD();
		goog_report_conversion();
	}
	
	// 금액범위 가져오기
	function eSavingGetInsuScope(insTerm, napTerm, gender, age) {
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
	
    // 고객 정보 세팅
    function eSavingSetCustInfo() {
    	
    	//var element = $("#custInfo").children();
    	//	$(element[0])			//	보험나이
    	//	$(element[1])			//	성별
    	//	$(element[2])			//	공시이율
    	
    	// 보험나이 
        var age = getInsuAgeByYmd(jQuery("#birthday").val());
        //var birth = '';
		//var ageHtml = '';
		
		/*birth = $("#birthday").val().substr(2, 6);
		ageHtml = '<span class="tit">보험나이 :</span><strong>' + age + '</strong>세 (' + birth + ')';
		$(element[0]).html(ageHtml);*/

    	// 성별
    	var gender = $("input[name=pgender]:checked").val();
    	/*var genderHtml = '<span class="tit">성별 :</span>';
    	if (gender == "1") { genderHtml += '남성'; }
    	else if (gender == "2") { genderHtml += '여성'; }
    	$(element[1]).html(genderHtml);*/

    	// 보험료 Scope Set
    	var insTerm = $("#insTerm option:selected").val();
    	var napTerm = $("#napTerm option:selected").val();
    	
    	if (insTerm != "" && napTerm != "" && gender != "" && age != ""){
    		var obj = eSavingGetInsuScope(insTerm, napTerm, gender, age);
    		var startAge = obj.startAge;
    		var endAge = obj.endAge;
    		
    		if ((age < startAge) && (age > endAge)) {
    			if (!chkDate($("#birthday").val())) {
    	    		alert("생년월일을 올바르게 입력해주세요.");
    	    		$('#birthday').focus();
    	    		$('#birthday').val("");
    	    		return false;
    	    	}    			
    	    	alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 " + startAge + "세 ~ " + endAge + "세 입니다.");
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
	    			tmp = tmp.replace("보험기간 : ", "");
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
    function eSavingSetFormValue(contBirth, contGender, insuPeriod, payPeriod, premium, type) {
    	
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
    	
    	if (typeof contGender == 'undefined' || contGender == ""){
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
    	
    	
    	//	그래프 처리
    	eSavingSetDynamicGraph(contBirth, $("#insuPeriod").val(), $("#payPeriod").val());
    	
		return true;
    }
	
	// 결과 세팅 
	function eSavingSetResult(result) {

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
				eSavingSetSubResult(data, i);
			}
		} else if (type == "free") {
			data = arryData[1];
			$("#planSeq").val(data.inputObj.planSeq);		
			$("#monthlyPremium2-2").text($("#monthlyPremium2").val());
			$("#returnMoney2").text(addCommas(data.returnMoney));
			$("#returnMoney2-2").text(addCommas(data.returnMoney));			
			$("#returnRatio2").text(data.returnRatio);
			$("#returnRatio2-2").text(data.returnRatio);			
			
			var title = "월 " + addCommas(parseInt(data.totPremium / 10000)) + "만원";
			
			planSetDetailTitle($("#guaranteeTitle1"), title, 1);
			planSetDetailTitle($("#guaranteeTitle2"), title, 1);
			planSetDetailTitle($("#returnTitle1"), title, 1);
			planSetDetailTitle($("#returnTitle2"), title, 1);
			planSetDetailTitle($("#returnTitle3"), title, 1);
			
			//	이메일 데이터 세팅
			totPremiumArry[1] = parseInt(data.totPremium / 10000);
			arryData1[1] = data.returnMoney;
			arryData2[1] = data.returnRatio;
		}
		
		prevVal = $("#monthlyPremium2").val();
		
		//	상세보기 (보장내용)
		eSavingSetDetail1(type, arryData);
		
		//	상세보기 (해지환급금)
		eSavingSetDetail2(type, arryData);
		
		//	이메일 데이터 세팅
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArry;
		f.arryData1.value = arryData1;
		f.arryData2.value = arryData2;
		
		showAdvice(result);
	}
	
	function eSavingSetSubResult(data, index) {
		
		var totPremium = "0";
		var returnMoney = "0";
		var returnRatio = "0";
		var title = "";
		
		if (typeof(data) != "undefined" && typeof(data.inputObj) != "undefined") {
			totPremium = addCommas(parseInt(data.totPremium / 10000));
			returnMoney = addCommas(data.returnMoney);
			returnRatio = data.returnRatio;
			title = "월 " + totPremium + "만원";

			var order = index + 1;
			if (index == 1) {
				$("#monthlyPremium" + order).val(totPremium);
				$("#monthlyPremium" + order + "-2").text(totPremium);				
			} else {
				$("#monthlyPremium" + order).text(totPremium);
				$("#monthlyPremium" + order + "-2").text(totPremium);				
			}
			$("#returnMoney" + order).text(returnMoney);
			$("#returnMoney" + order + "-2").text(returnMoney);			
			$("#returnRatio" + order).text(returnRatio);
			$("#returnRatio" + order + "-2").text(returnRatio);			
		}
		
		planSetDetailTitle($("#guaranteeTitle1"), title, index);
		planSetDetailTitle($("#guaranteeTitle2"), title, index);
		planSetDetailTitle($("#returnTitle1"), title, index);
		planSetDetailTitle($("#returnTitle2"), title, index);
		planSetDetailTitle($("#returnTitle3"), title, index);
		
		//	이메일 데이터 세팅
		totPremiumArry[index] = totPremium.replace(/,/g, "");
		arryData1[index] = returnMoney.replace(/,/g, "");
		arryData2[index] = returnRatio;
	}
	
	//	그래프 처리
	function eSavingSetGraph(contBirth, payPeriod) {
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
	
	function eSavingSetDynamicGraph(contBirth, insuPeriod, payPeriod){
		var graph1;
		var graph2;
		var age = getInsuAgeByYmd(contBirth);
		var $graph;
		
		graph1 = parseInt( parseInt(payPeriod) * 100 / parseInt(insuPeriod) );
		graph2 = 100 - parseInt(graph1);
		
		$graph = $("#resultGraph5");

		$graph.find(".desc1").text(age + "세");
		$graph.find(".desc2").text(age + parseInt(payPeriod) + "세");
		$graph.find(".desc3").text(parseInt(age) + parseInt(insuPeriod) + "세");
		$graph.find(".desc4").text(parseInt(insuPeriod) + "년");
		
		if(payPeriod != insuPeriod){
			$graph.find(".graphTitle1").text("납입기간 " + payPeriod + "년");
			$graph.find(".graphTitle2").text("거치기간 " + (parseInt(insuPeriod)-parseInt(payPeriod)) + "년");
			$graph.find("#graph1 > div.label ").show();
		}else{
			$graph.find(".graphTitle1").text("납입기간 " + payPeriod + "년");
			$graph.find(".graphTitle2").text("");
			$graph.find("#graph1 > div.label ").hide();
		}
		
		/*
		$($("#graph1").children().first()).text("납입기간 " + payPeriod + "년");
		$($("#graph2").children().first()).text("거치기간 " + (insuPeriod - payPeriod) + "년");
		*/
		$("#graph1").css("width", graph1 + "%");
		$("#graph2").css("width", graph2 + "%");
		
		$("#resultGraph5").show();
	}

	//	상세보기 (보장내용)
	function eSavingSetDetail1(type, dataArray) {
		var data;
		
		if (typeof(dataArray) != "undefined") {
			if (type == "simple") {

				for (var i = 0; i < dataArray.length; i++) {
					data = dataArray[i];
					eSavingSetSubDetail1(data, i);
				}
			} else if (type == "free") {
				data = dataArray[1];
				eSavingSetSubDetail1(data, 1);
			}
		}
	}
	
	function eSavingSetSubDetail1(data, index) {
	
		var amount = "-";
		var order = index + 1;
		
		if (typeof(data) != "undefined" && typeof(data.guaranteeArry) != "undefined") {
			amount = data.guaranteeArry[1].amt;
		}
		
		$($("#guarantee2>tr").children()[order]).text(amount);
		
		if (index == 1) {
			$($("#guarantee1>tr").children()[0]).text("현 공시이율 " + data.nowRate + "%");
		}
		
		$($("#guarantee1>tr").children()[order]).text(typeof(data.returnMoney) != "undefined" ? addCommas(data.returnMoney) + "원" : "-");
	}
	
	//	상세보기 (해지환급금)
	function eSavingSetDetail2(type, dataArray) {
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
				var insuPeriod = Number(v.inputObj.insuPeriod);
				var returnAge = insuAge + insuPeriod;
				
				var annPeriod = returnAge - payPeriodEnd;
				var returnMoney = Number(v.returnMoney);
				var annPeriodTxt = annPeriod + '년 뒤 ';
				
				if(annPeriod < 1){
					annPeriodTxt = '';
				}
				
				var $uiContAmt = $areaBoxAdvice.find('em[data-role="uiContAmt"]').eq(i);
				var $uiPayPeriod = $areaBoxAdvice.find('em[data-role="uiPayPeriod"]').eq(i);
				var $uiPayPeriodEnd = $areaBoxAdvice.find('span[data-role="uiPayPeriodEnd"]').eq(i);
				var $uiReturnAge = $areaBoxAdvice.find('span[data-role="uiReturnAge"]').eq(i);
				var $uiReturnMoney = $areaBoxAdvice.find('em[data-role="uiReturnMoney"]').eq(i);
				
				$uiContAmt.text(addCommas(parseInt(contAmt / 10000)) + '만원');
				$uiPayPeriod.text(payPeriod + '년간 납입');
				$uiPayPeriodEnd.text(payPeriodEnd + '세');
				$uiReturnAge.text(annPeriodTxt + returnAge + '세');
				$uiReturnMoney.text(addCommas(returnMoney) + '원');
			}
		});
		
		$('div.case1-2').show().siblings('div').hide();
	}
	
	// 저축보험 보험기간 라디오 버튼 초기화 세팅
	function esavingInitRadioInsTerm(insTermValue){
		for(var i=1; i<=$("input[name=eb_radio1]").length; i++){
			if(insTermValue == $("#chkRadioEsaving1_"+i).val()){
				$("#chkRadioEsaving1_"+i).click();
				return;
			}
		}
	}
	
	function setEvtDetailTagByOrg(){
		popEventJoin.openOutput();
		setEntryFieldByPromoCode( gv_promoCode );
		return false;
	}
	
	function setEntryFieldByPromoCode( promoCode ){
			var entryForm = $("#entryForm");
			if(gv_promoCode == "jh_spay_esaving"){ //삼성페이_저축 이벤트
				
				//var nameDl = $("#event0Name").parents("dl");
				//var telNumDl = $("#event0TelNum1").parents("dl");
				//nameDl.hide();
				//telNumDl.hide();
				
				//$("#event0Name").val("쿠폰만");
				//$("#event0TelNum2").val("11111111");
				
				var eventCouNum = $("#event0CouNum");
				if( eventCouNum.length > 0 ){
					$("#event0CouNum").parents("dl").remove();
				}
				
				var addTag =	'<dl>'+
									'<dt class="heading"><label for="event0CouNum">쿠폰번호</label></dt>'+
									'<dd class="wrap"><input type="text" id="event0CouNum" class="text"></dd>'+
								'</dl>';
				entryForm.append(addTag);
			}
	}
	
	// 저축보험 납입기간 라디오 버튼 초기화 세팅
	function esavingInitRadioNapTerm(){
		for(var i=1; i <= $("input[name=en_radio2]").length; i++){
			if($("#napTerm").val() == $("#chkRadioEsaving2_"+i).val()){
				$("#chkRadioEsaving2_"+i).click();
				break;
			}
		}
	}
	
	// 저축보험 보험기간에 따라 납입기간 라디오버튼 비활성화
	function esavingDisableRadioNapTerm(napTermArray){
		$("input[name=en_radio2]").prop("disabled", "disabled");
		$("input[name=en_radio2]").siblings().addClass("disabled");
		$.each(napTermArray, function(index,value){
			for(var i=1; i <= $("#napTermRadio").children().children().length; i++){
				if(value.padPrdTypVal == $("#chkRadioEsaving2_"+i).val() ){
					$("#chkRadioEsaving2_"+i).prop("disabled", false);
					$("#chkRadioEsaving2_"+i).siblings().removeClass("disabled");
					break;
				}
			}
		});
	}
	
	// 라디오값 전달 
	function setEsavingInsTermRadioToSel(){
		$("#insTerm").val( $("input[name=eb_radio1]:checked").val() );
	}
	
	function setEsavingNapTermRadioToSel(){
		$("#napTerm").val( $("input[name=en_radio2]:checked").val() );
	}
	
