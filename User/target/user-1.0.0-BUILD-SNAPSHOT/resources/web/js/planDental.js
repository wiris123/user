		
	var CALC_TYPE_LOW = "1";			//	실속
	var CALC_TYPE_MID = "2";			//	표준
	var CALC_TYPE_HIGH = "3";			//	고급

	var isCookieCalc = false;
	var recentPlanId;
	
	var dentalPlanCBParam = function (result) {
		dentalPlanCalc("email", result);
	};
	
	function setCalcType(index) {
		
		switch (index) {
			case CALC_TYPE_LOW:
				$("#insuJobType1").prop("checked", true).siblings().addClass('on');
				$("#insuJobType2").siblings().removeClass('on');
				$("#insuJobType3").siblings().removeClass('on');
				$("#dentalMainContAmt").val("5000000");
				break;
			case CALC_TYPE_MID:
				$("#insuJobType1").siblings().removeClass('on');
				$("#insuJobType2").prop("checked", true).siblings().addClass('on');
				$("#insuJobType3").siblings().removeClass('on');
				$("#dentalMainContAmt").val("10000000");
				break;
			case CALC_TYPE_HIGH:
				$("#insuJobType1").siblings().removeClass('on');
				$("#insuJobType2").siblings().removeClass('on');
				$("#insuJobType3").prop("checked", true).siblings().addClass('on');
				$("#dentalMainContAmt").val("10000000");
				break;
		}
		
		selectTreatyPlan(index);		
		displayType(showBuy);
		frm.planSubType.value = index;
	}
	
	function setTreatyUiCode(data) {
		
		$.each($(":checkbox[name=dentalTreaty]"), function(i, v) {
			
			if ($(this).attr("order") == "8&9&10") {
				var tmp = "";
				for (var j = 0; j < data.length; j++) {
					
					if (data[j].order == "8" || data[j].order == "9" || data[j].order == "10") {
						tmp += "&" + data[j].uiCode;
					}
				}
				
				$(this).val(tmp.substr(1, tmp.length));
			} else {
				for (var j = 0; j < data.length; j++) {
					
					//if (data[j].insuName.indexOf($(this).attr("title")) != -1) {
					if (data[j].order == $(this).attr("order")) {
						$(this).val(data[j].uiCode);
					}
				}
			}
		});
	}
	
	//
	function setTreatyUiDisplay(data, isList) {
		var list;
		
		if (isList) {
			list = [];
			
			for (var i = 0; i < data.length; i++) {
				list.push(data[i].insCd);
			}
		} else {
			if (typeof(data) == "undefined") {
				data = "";
			}
			list = data.split("&");
		}

		//	특약선택 초기화 : unchecked
		selectTreatyPlan(CALC_TYPE_LOW);
		
		$.each($(":checkbox[name=dentalTreaty]"), function(i, v) {
			for (var j = 0; j < list.length; j++) {
				if (list != "" && $(this).val().indexOf(list[j]) != -1) {
//					$(this).attr('checked', true);
					$(this).prop('checked', true);
					$(this).siblings().addClass("on");
				}
			}
		});
	}
	
	function setBirthGender(birth, gender) {
		var obj = $("input[name=pgender]:input[value=" + gender + "]");
		$("input[name=pgender]:input[value=1]").siblings().removeClass("on");
		$("input[name=pgender]:input[value=2]").siblings().removeClass("on");
		
		$("#birthday").val(birth);
		$("#birthday").click();
		obj.prop("checked", true);
		obj.siblings().addClass("on");
	}
		
	// 가입설계 계산 (간단, 자유)
	function dentalPlanCalc(type, inputData) {
		//	가입설계 계산
		var frm = $("#frm")[0];
		var contBirth = "";
		var contGender = "";
		var insuPeriod = "";
		var payPeriod = "";
		var treatyList = "";
		var data = "";
		//var subType = "2";		//	1 : 실속, 2 : 표준, 3 : 고급
		//var tmp = type.split("_"); 
		
		/*if (tmp.length > 1) {
			type = tmp[0];
			subType = tmp[1];
		}*/
				
		if ($("#dentalTreaty1-8").is(":checked") && !$("#dentalTreaty1-7").is(":checked")) {
			
			alert("특정얼굴수술보장특약을 가입하기 위해서는 3대안과질환수술보장특약을 가입하셔야 합니다.");
			return;
		}
		
		if (type == "simple") {
			frm.mainContAmt.value = "";
		} else if (type == "free") {
			frm.mainContAmt.value = frm.planSubType.value == "1" ? "5000000" : "10000000";
		} else if (type == "email") {
			if (typeof(inputData.data) == "undefined") {
				return;
			}
			
			if( "" == $("#selImplStr").val() || "100" == $("#selImplStr").val() ){
				type = "simple";
			} else {
				type = "free";
			}
			
			setBirthGender(inputData.data.contBirth, inputData.data.contGender);
			setCalcType(inputData.data.planSubType);
			setTreatyUiDisplay(inputData.data.treatyList, false);
			
			frm.planSubType.value = inputData.data.planSubType; 
		} else if (type == "mainPlanData") {
			//	특약 초기화 : all check
			if (typeof(inputData.data.planSubType) == "undefined") {
				selectTreatyPlan(CALC_TYPE_MID);
				setCalcType(CALC_TYPE_MID);
				frm.planSubType.value = CALC_TYPE_MID; 
			} else {
				selectTreatyPlan((String)(inputData.data.planSubType));
				setCalcType((String)(inputData.data.planSubType));
				frm.planSubType.value = (String)(inputData.data.planSubType);
			}
			setBirthGender(inputData.data.contBirth, inputData.data.contGender);
			
			type = "simple";
		} else if (type == "session") {
			//	특약 초기화 : all check
			selectTreatyPlan(CALC_TYPE_MID);
			setBirthGender(inputData.contBirth, inputData.contGender);
			
			type = "simple";
			setTreatyUiDisplay(inputData.treatyList, true);
		}
		
		contBirth = $("#birthday").val();
		contGender = $("input[name=pgender]:checked").val();
		insuPeriod = $("#insTerm option:selected").val();
		payPeriod = $("#napTerm option:selected").val();
		
		treatyList = $(":checkbox[name=dentalTreaty]:checked");
		for(var i = 0; i < treatyList.length; i++) {
			if(i > 0) data += "&";
			data += treatyList.eq(i).val();
		}
		
		frm.planType.value = type;
		frm.treatyList.value = data;
		
		//	56세 이상은 관리자에서 세팅한 4번째 특약세팅 이용
//		if (parseInt(getInsuAgeByYmd(contBirth)) > 55 && frm.planSubType.value == "3") {
//			frm.planSubType.value = "4";
//		}
		
		//	56세 이상은 관리자에서 세팅한 4번째 특약세팅 이용
		if (parseInt(getInsuAgeByYmd(contBirth)) > 55) {
			frm.planSubType.value = "4";
		}
		
		// 폼세팅
		if (!dentalSetFormValue(contBirth, contGender, insuPeriod, payPeriod)) return;
		
		// 폼 파라메터 처리 
		var jsonData = $("#frm").serializeObject();
		
		showLoadingDialog(true);
		$.ajax({
			type : "POST",
			url : "/dentalCalc.eds",
			data : JSON.stringify(jsonData),
			dataType : 'json',
			//async : false,
			success : function(result) {
				
				if (result.success) {
					dentalSetResult(result);
					
					showResultDiv(true, calculatorCheckEvent);
					displayType(showBuy);
					
					// 최근설계내역 쿠키 세팅
					if (isRecentPlanSave){
						setPlanCookie(result);
					}
					isRecentPlanSave = true;
					
					var arryData = result.arryData[0];

					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					fbq('track', 'ViewContent', {
					    value: result.premium,
					    currency: 'KRW',
					  });
					chaiConv('1', arryData.inputObj.prdtnm);
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
				    
				    //어도비스크립트 변수 세팅 보험료계산수(e21), 보험료재계산수(e65)
				    var adobeTrackParam = {
				    		gender : ($("input[name=pgender]:checked").val() == "1")?"남자":"여자",
				    		age : getInsuAgeByYmd(contBirth),
				    		prdtName : arryData.inputObj.prdtnm,
				    		premium : result.premium,
				    		payType : '월납'
				    };
				    
				    if (type == "free") {
				    	adobeTrackParam.insuPeriod = insuPeriod;
				    	adobeTrackParam.payPeriod = payPeriod;
				    	adobeTrackParam.premium = result.premium;
				    	adbDentalReCalc(adobeTrackParam);
				    } else {
				    	adbDentalCalc(adobeTrackParam);
				    }
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				
				showLoadingDialog(false);
				paramUsed = false;
			},
			beforeSend : function() {},		
 			complete : function() {},		
			error : function() {} 
		});
		
		// 변경값 초기화
		$("#chgYn").val("N");
		$("#freeChgYn").val("N");
		
		// 계산을 한적이 있으면 쿠키에 생년월일 세팅
		$.cookie("birthdayCookie",contBirth ,{path:'/'});
		$.cookie("genderCookie",contGender ,{path:'/'});
		
		ga('send','event','Direct','Calculation','dental_top',1);
		NCDC_LOAD();
		goog_report_conversion();
	}
		
	// 폼세팅 
    function dentalSetFormValue(contBirth, contGender, insuPeriod, payPeriod){
    	
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
    	
		return true;    		
    }
    
    function getTreatyPreimum(guarantee, treatyName) {
    	var result = 0;
    	
    	for (var i = 0; i < guarantee.length; i++) {
			var item = guarantee[i];
			
			if (item.name.indexOf(treatyName) > -1) {
				result += parseFloat(item.amt.replace("만원", ""));
			}
		}	
    	
    	return result;
    }
    
    /* To-Be */
	// 결과 세팅 
	function dentalSetResult(result){
		//var arryData = result.arryData;
		var planType = $("#planType").val();
		var html = "";
		
		var resArr = result.arryData;
		var resArrLength = resArr.length;
		
		var totPremiumArr = new Array();
		var strPlanSubTypeArr = new Array();
		
		var payDetailArr = fn_getPayDetailList();
		
		for(var i=0; i<resArrLength; i++){ //for start
			var sbIdx = i+1;
			var data = result.arryData[i];
			var guarantee = data.guaranteeArry;
			
			//	관리자에서 특약 보험금 세팅에 의하여 프론트 특약세팅변경
			//	실속 : 주보험을 500으로 세팅하면, 특정, 3대안과, 각막이식 수술특약은 선택이 안됨
			//setTreatyUiDisplay(result.simpleTreatyList, false);
			setTreatyUiDisplay(data.inputObj.treatyList, true);
			
			$("#planSeq").val(data.inputObj.planSeq);
			
			//	월보험료
			$("#monthlyPremium"+sbIdx).text(addCommas(data.totPremium));
			
			//	주보험
			//	영구치보철치료
			
			
			html = '<li>' +
			'<div class="label">' +
			'<span>임플란트치료</span>' +
			'</div>';
			if(2 != sbIdx){
				html += '<div class="data">' 
							+ '<strong><span>' + getTreatyPreimum(guarantee, "임플란트") + '</span>만원</strong>' +
						'</div>';
			} else{
				html += '<div class="data" id="implDiv">' 
							+ '<span class="select-box">'+
								'<select id="selImplant" onchange="fnChangeSelImplant();">' +
									'<option id="standard50" value="50">50</option>' +
									'<option id="standard100" value="100">100</option>' +
									'<option id="standard150" value="150">150</option>' +
									'<option id="standard200" value="200">200</option>' +
								'</select>'+
							'</span>만원' +
						'</div>';
				html += '<div class="data" id="overAgeImplDiv">'+
							'<strong><span>' +  getTreatyPreimum(guarantee, "임플란트") + '</span>만원</strong>'+
						'</div>';
			}
			html +=	'</li>';	
			
			html += '<li>' +
					'<div class="label">' +
					'<span>틀니치료</span>' +
					'</div>' +
					'<div class="data">' +
					'<strong><span>' + getTreatyPreimum(guarantee, "틀니") + '</span>만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label">' +
					'<span>브릿지치료</span>' +
					'</div>' +
					'<div class="data">' +
					'<strong><span>' + getTreatyPreimum(guarantee, "브릿지") + '</span>만원</strong>' +
					'</div>' +
					'</li>';
		
			$("#mainInsuResult1-"+sbIdx).html(html);
						
			//	보존치료
			html = '<li>' +
					'<div class="label">' +
					'<span>인레이, 온레이</span>' +
					'</div>' +
					'<div class="data">' +
					'<strong><span>' + getTreatyPreimum(guarantee, "인레이") + '</span>만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label">' +
					'<span>복합레진</span>' +
					'</div>' +
					'<div class="data">' +
					'<strong><span>' + getTreatyPreimum(guarantee, "복합레진") + '</span>만원</strong>' +
					'</div>' +
					'</li>' +
					'<li>' +
					'<div class="label">' +
					'<span>아말감, 글래스아이노머</span>' +
					'</div>' +
					'<div class="data">' +
					'<strong><span>' + getTreatyPreimum(guarantee, "아말감") + '</span>만원</strong>' +
					'</div>' +
					'</li>';
			$("#mainInsuResult2-"+sbIdx).html(html);
			
			//	크라운치료
			html = "<strong><span>" + getTreatyPreimum(guarantee, "크라운") + "</span>만원</strong>";
			$("#mainInsuResult3-"+sbIdx).html(html);
			
			//	영구치발치
			html = "<strong><span>" + getTreatyPreimum(guarantee, "영구치발치") + "</span>만원</strong>";
			$("#mainInsuResult4-"+sbIdx).html(html);
			
			//	치수치료
			html = "<strong><span>" + getTreatyPreimum(guarantee, "치수치료") + "</span>만원</strong>";
			$("#mainInsuResult5-"+sbIdx).html(html);
			
			//	주요치주질환치료
			html = "<strong><span>" + getTreatyPreimum(guarantee, "주요치주질환치료") + "</span>만원</strong>";
			$("#mainInsuResult6-"+sbIdx).html(html);
			
			//	치석제거 치료
			html = "<strong><span>" + getTreatyPreimum(guarantee, "치석제거") + "</span>만원</strong>";
			$("#mainInsuResult7-"+sbIdx).html(html);
			
			//	구내방사선촬영
			html = "<strong><span>" + getTreatyPreimum(guarantee, "구내방사선촬영") + "</span>만원</strong>";
			$("#mainInsuResult8-"+sbIdx).html(html);
			
			//	파노라마촬영
			html = "<strong><span>" + getTreatyPreimum(guarantee, "파노라마촬영") + "</span>만원</strong>";
			$("#mainInsuResult9-"+sbIdx).html(html);
			
			//	만기보험금
			html = "<strong><span>" + getTreatyPreimum(guarantee, "만기보험금") + "</span>만원</strong>";
			$("#mainInsuResult10-"+sbIdx).html(html);
			
			//	영구치유지
			html = "<strong><span>" + getTreatyPreimum(guarantee, "영구치유지") + "</span>만원</strong>";
			$("#mainInsuResult11-"+sbIdx).html(html);
			
			
			//	앞으로 특약은 특약금액이 0이 나올수 있음
			var premium = 0;
			var count = 0;
			
			//	영구치상실위로금
			premium = getTreatyPreimum(guarantee, "영구치상실위로금");
			if (premium != 0) {
				html = '<div class="label"><span>영구치상실위로금</span></div>' +
						'<div class="data">' +
						'<strong><span>' + premium + '</span>만원</strong>' +
						'</div>';
				
				$("#mainInsuResult12-"+sbIdx).html(html);
			} else {
				$("#mainInsuResult12-"+sbIdx).empty();
				count++;
			}
			
			//	각막이식수술
			premium = getTreatyPreimum(guarantee, "각막이식수술");
			if (premium != 0) {
				html = '<div class="label"><span>각막이식수술</span></div>' +
					'<div class="data">' +
					'<strong><span>' + premium + '</span>만원</strong>' +
					'</div>';
				
				$("#mainInsuResult13-"+sbIdx).html(html);
			} else {
				$("#mainInsuResult13-"+sbIdx).empty();
				count++;
			}
			
			//	3대안과질환수술
			premium = getTreatyPreimum(guarantee, "녹내장");
			if (premium != 0) {
				html = '<div class="label"><span>3대안과질환수술</span></div>' +
						'<ul class="txt-type3">' +
						'<li>' +
						'<div class="label"><span>녹내장</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "녹내장") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'<li>' +
						'<div class="label"><span>황반변성질환</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "황반변성질환") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'<li>' +
						'<div class="label"><span>당뇨병성망막질환</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "당뇨병성망막질환") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'</ul>';
	
				$("#mainInsuResult14-"+sbIdx).html(html);
			} else {
				$("#mainInsuResult14-"+sbIdx).empty();
				count++;
			}
	
			//	특정얼굴수술
			premium = getTreatyPreimum(guarantee, "특정안과질환");
			if (premium != 0) {
				html = '<div class="label"><span>특정얼굴수술</span></div>' +
						'<ul class="txt-type3">' +
						'<li>' +
						'<div class="label"><span>특정안과질환</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "특정안과질환") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'<li>' +
						'<div class="label"><span>특정후각질환</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "특정후각질환") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'<li>' +
						'<div class="label"><span>특정청각질환</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "특정청각질환") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'<li>' +
						'<div class="label"><span>특정외모상해</span></div>' +
						'<div class="data">' +
						'<strong><span>' + getTreatyPreimum(guarantee, "특정외모상해") + '</span>만원</strong>' +
						'</div>' +
						'</li>' +
						'</ul>';
				
				$("#mainInsuResult15-"+sbIdx).html(html);
			} else {
				$("#mainInsuResult15-"+sbIdx).empty();
				count++;
			}
			
	//		if (count == 4) {
	//			$("#mainInsuResultUl").hide();
	//		} else {
	//			$("#mainInsuResultUl").show();
	//		}
			
			//	상세보기 (보장내용)
			dentalSetDetail1(data, sbIdx);
			
			//	상세보기 (해지환급금)
			dentalSetDetail2(data, sbIdx);
			
			// 상세보장보기
			dentalPayDetail(data, sbIdx, payDetailArr);				

			
			//	detail 고객정보
	    	$("#detailCustInfo").children().each(function(index) {
	    		switch (index) {
		    		case 0 :
		    			//	보험기간
		    			$(this).find("strong").text(data.inputObj.insuPeriod);
		    			break;
		    		case 1 :
		    			//	납입기간
		    			$(this).find("strong").text(data.inputObj.payPeriod);
		    			break;
		    		case 2 :
		    			//	보험나이
		    			$(this).find("strong").text(getInsuAgeByYmd(data.inputObj.contBirth));
		    			break;
		    		}
	    	});
			
			//	이메일 데이터 세팅 start
			var f = $("#mailFrm")[0];
			totPremiumArr.push(data.totPremium);
			//f.totPremiumArry.value = data.totPremium;
			
			if( 1 == sbIdx ){
				f.arryData1.value = getArrayTreatyPremium(guarantee);	//data.inputObj.treatyList;
			} else if( 2 == sbIdx ){
				f.arryData2.value = getArrayTreatyPremium(guarantee);	//data.inputObj.treatyList;
			} else {
				f.arryData3.value = getArrayTreatyPremium(guarantee);	//data.inputObj.treatyList;
			}
			
			
			var strPlanSubType = "";
			if (data.inputObj.planSubType == CALC_TYPE_LOW) {strPlanSubType = "실속형";}
			else if (data.inputObj.planSubType == CALC_TYPE_MID) {strPlanSubType = "표준형";}
			else if (data.inputObj.planSubType == CALC_TYPE_HIGH) {strPlanSubType = "고급형";}
			strPlanSubTypeArr.push(strPlanSubType);
			//	이메일 데이터 세팅 end
			
			if( 2 == sbIdx ){
				
				var implantVal = getTreatyPreimum(guarantee, "임플란트");
				
				var selImplantOpt = $("#selImplant option");
				var isInclude = false;
				for( var implIdx=0; implIdx < selImplantOpt.length; implIdx++ ){
					var selImplantOptVal = selImplantOpt.eq(implIdx).val();
					if( implantVal == selImplantOptVal ){
						isInclude = true;
						break;
					}
				}
				
				if ( !isInclude ) {
					$("#implDiv").hide();
					$("#overAgeImplDiv").show();
					$("#selImplant").val("100");
				} else {
					$("#implDiv").show();
					$("#overAgeImplDiv").hide();
					$("#selImplant").val(implantVal);
				}
				
			}
			
		}	//for end
		
		fn_writePayDetailTag( payDetailArr );
		$("#insuAgeDetailInfo").html(getInsuAgeByYmd(data.inputObj.contBirth));
		fnClickBtnMore( "fold" );
		
		//	이메일 데이터 세팅  start
		var f = $("#mailFrm")[0];
		f.totPremiumArry.value = totPremiumArr;
		f.fplanSubType.value = strPlanSubTypeArr;
		//	이메일 데이터 세팅 end
		
	} //func end
	

	function getTreatyPreimumEx(guarantee, treatyName) {
		var result = getTreatyPreimum(guarantee, treatyName);
		if (result == 0) {
			result = "미가입";
		} else {
			//result += '</span><span style="margin:0;padding:0;font-size:12px;">만원';
			result += '만원';
		}
		
		return result;
	}
	
	function getArrayTreatyPremium(guarantee) {
		var result = "";
		var amt = "";
		
		result += getTreatyPreimumEx(guarantee, "틀니") + ",";
		result += getTreatyPreimumEx(guarantee, "브릿지") + ",";
		result += getTreatyPreimumEx(guarantee, "임플란트") + ",";
		
		result += getTreatyPreimumEx(guarantee, "인레이") + ",";
		result += getTreatyPreimumEx(guarantee, "복합레진") + ",";
		result += getTreatyPreimumEx(guarantee, "아말감") + ",";
		
		result += getTreatyPreimumEx(guarantee, "크라운") + ",";
		result += getTreatyPreimumEx(guarantee, "영구치발치") + ",";
		result += getTreatyPreimumEx(guarantee, "치수치료") + ",";
		result += getTreatyPreimumEx(guarantee, "주요치주질환치료") + ",";
		result += getTreatyPreimumEx(guarantee, "치석제거") + ",";
		result += getTreatyPreimumEx(guarantee, "구내방사선촬영") + ",";
		result += getTreatyPreimumEx(guarantee, "파노라마촬영") + ",";
		result += getTreatyPreimumEx(guarantee, "만기보험금") + ",";
		result += getTreatyPreimumEx(guarantee, "영구치유지") + ",";
		
		result += getTreatyPreimumEx(guarantee, "영구치상실위로금") + ",";
		result += getTreatyPreimumEx(guarantee, "각막이식수술") + ",";
		result += getTreatyPreimumEx(guarantee, "녹내장") + ",";
		result += getTreatyPreimumEx(guarantee, "황반변성질환") + ",";
		result += getTreatyPreimumEx(guarantee, "당뇨병성망막질환") + ",";
		result += getTreatyPreimumEx(guarantee, "특정안과질환") + ",";
		result += getTreatyPreimumEx(guarantee, "특정후각질환") + ",";
		result += getTreatyPreimumEx(guarantee, "특정청각질환") + ",";
		result += getTreatyPreimumEx(guarantee, "특정외모상해");
		
		return result;
	}
	
	
	//	자유계산시 필요한 요소 세팅
	function dentalSetValue(){
		$("#freeChgYn").val("Y");
		
		$("#mainContAmt").val($("#reCalcPrice1 option:selected").val());
		$("#treatyContAmt").val($("#reCalcPrice2 option:selected").val());
	}
	
	/* To-Be */
	//	상세보기 (보장내용)
	function dentalSetDetail1(data, sbIdx) {
		var treatyCount = 0;
		var contAmt = data.inputObj.contAmt;
		var contAmtStr = "";
		
		contAmt = parseInt(contAmt);
		if (contAmt > 5000000) {
			contAmtStr = "천만";
		} else {
			contAmtStr = "오백";
		}
		
		/*
		$("#returnContAmt").text("가입금액 " + contAmtStr + "만원 기준");
		$("#returnContAmt2").text("가입금액 " + contAmtStr + "만원 기준");
		*/
		
		//	주보험
		var classIdx = "";
		switch (sbIdx) {
			case 1 :
				classIdx = "";
				break;
			case 2 :
				classIdx = "-1";
				break;
			case 3 :
				classIdx = "-2";
				break;
		}
		for (var j = 0; j < data.guaranteeArry.length; j++) {
			var item = data.guaranteeArry[j];

			if (item.amt != "") {
				if (data.inputObj.prcd == item.uiCode) {
					$.each($(".returnTreatyValue"+classIdx), function(i,v) {
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
		
		$.each($(".returnTreatyValue2"+classIdx), function(i,v) {
			$(this).text("");
			$(this).parent().hide();
		});
		
		for (var j = 0; j < data.guaranteeArry.length; j++) { //for start
			var item = data.guaranteeArry[j];

			if (item.amt != "") {
				if (data.inputObj.prcd != item.uiCode) {
					$.each($(".returnTreatyValue2"+classIdx), function(i,v) {
						if (item.name.indexOf($(this).attr("name")) > -1) {
							$(this).text(item.amt).parent().show();
							
							if (item.name.indexOf("가철성의치(틀니)치료") > -1) {
								$("#treatyTitle1").show();
							}

							if (item.name.indexOf("인레이,온레이") > -1) {
								$("#treatyTitle2").show();
							}
							
							if (item.name.indexOf("녹내장수술보험금") > -1) {
								$("#treatyTitle3").show();
							}
						}
					});
				}
			}
		} //for end
		
	}
	

	
	/* To-Be */
	//	상세보기 (해지환급금)
	function dentalSetDetail2(data, sbIdx) {
		var list = data.nowRateArry;
		var list2 = data.nowRateArry2;
		var nowRate;
		
		if (typeof(list) != "undefined") {
			for (var i = 0; i < list.length; i++) {
				$("#return").children().each(function(index1) {
					nowRate = list[index1];
					$(this).children().each(function(index2) {
						if (i == 0 && index2 == 0) {
							$(this).text(nowRate.totTerm);
						}
						
						if( sbIdx == 1 ){
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
						
						if( sbIdx == 2 ){
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
						
						if( sbIdx == 3 ){
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
		}
		
		 if (typeof(list2) != "undefined") {
			 for (var i = 0; i < list2.length; i++) {
					$("#return").children().each(function(index1) {
						nowRate = list2[index1];
						$(this).children().each(function(index2) {
							if( sbIdx == 1 ){
								switch (index2) {
									case 1 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
								}
							}
							if( sbIdx == 2 ){
								switch (index2) {
									case 4 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
								}
							}	
							if( sbIdx == 3 ){
								switch (index2) {
									case 7 :
										$(this).text(addCommas(nowRate.napMoney) + "원");
										break;
								}
							}							
						});
						
					});
				}
		 }
		
		
		addClassToDetailReturn($("#return"));
	}	
	
	
	
	function ageIsOverRule(birthday){
		if(birthday.length < 8) return;
		if (getInsuAgeByYmd(birthday) > 60){
			setTreatyCheckboxDisabled("true");
		}else{
			setTreatyCheckboxDisabled("false");
		}
	}
	
	function setTreatyCheckboxDisabled(TF){
		if(TF == "true"){
			
			$.each($("input[name=dentalTreaty]"), function(i, v) {
				if ($(this).attr("limited") == "60") {
					$(this).siblings().text('가입연령초과');
					$(this).siblings().addClass('disabled');
					$(this).prop('checked', false).prev().removeClass('on');
					$(this).prop('disabled', true);
				}
			});
		}else if(TF == "false"){
			
			$.each($("input[name=dentalTreaty]"), function(i, v) {
				if ($(this).attr("limited") == "60") {
					$(this).siblings().text('선택');
					$(this).siblings().removeClass('disabled');
					$(this).prop('disabled', false);
				}
			});
		}
	}
	
	function selectTreatyPlan(index){
		
		switch(index){
		 case "1":
			 $.each($("input[name=dentalTreaty]"), function(i, v) {
				 $(this).prop('checked', false).prev().removeClass('on');
			 });
			 break;
			 
		 case "2":
			 $("#dentalTreaty1-1").prop('checked', true).prev().addClass('on');
			 $("#dentalTreaty1-2").prop('checked', true).prev().addClass('on');
			 $("#dentalTreaty1-3").prop('checked', true).prev().addClass('on');
			 $("#dentalTreaty1-4").prop('checked', true).prev().addClass('on');
			 $("#dentalTreaty1-5").prop('checked', true).prev().addClass('on');
			 
			 $("#dentalTreaty1-6").prop('checked', false).prev().removeClass('on');
			 $("#dentalTreaty1-7").prop('checked', false).prev().removeClass('on');
			 $("#dentalTreaty1-8").prop('checked', false).prev().removeClass('on');
			 break;
			 
		 case "3":
			 $.each($("input[name=dentalTreaty]"), function(i, v) {
				 $(this).prop('checked', true).prev().addClass('on');
			 });
			 break;
		}
		ageIsOverRule($("#birthday").val());
	}
	
	function newCalcPremium(){
			if (validateCustAge()) {
				fn_getInsuData();
				
				alert("호출 시작!");
				for(var i=0; i<3; i++){
					var typeIdx = (i+1).toString();
					setCalcType(typeIdx);
					
					switch (typeIdx) {
						case "1":
							$("#dentalMainContAmt").val("5000000");
							break;
						case "2": case "3":
							$("#dentalMainContAmt").val("10000000");
							break;
					}
					
					setCalculatorEvent();
					dentalPlanCalc("simple");
				}
				
				alert("호출 완료!");

				//	계산기 wiselog
				calc_logging("productMain_dental_simple");
			}
	}

	function fnClickBtnMore( flagStr ){
		if( flagStr == "open" ){ //open
			
			for( var i=0; i<3; i++ ){
				var sbIdx = i+1;
				$("#tbTog"+sbIdx).attr("class", "con tb-toggle open");
				$("#criteriaOpenFold"+sbIdx).removeClass("hd");
			}
			
		} else { //fold
			
			for( var i=0; i<3; i++ ){
				var sbIdx = i+1;
				$("#tbTog"+sbIdx).attr("class", "con tb-toggle");
				$("#criteriaOpenFold"+sbIdx).removeClass("hd");
				$("#criteriaOpenFold"+sbIdx).addClass("hd");
			}
			
		}
	}
	
	function fnChangeSelImplant(){
		var selImplantStr = $("#selImplant").val();
		$("#selImplStr").val(selImplantStr);
		if (validateCustAge()) {
			setCalculatorEvent();
			dentalPlanCalc("free");

			//	계산기 wiselog
			calc_logging("productMain_dental_free");
			criteoPcCalc("dental");
		}
	}
	
		//	메일보내기 화면 초기화
	function clearMailForDental(title, subIdx) {
		$("#chooseMail option:eq(0)").attr("selected", "selected");

		$("#eventApplyName").val("");
		$("#eventTelNum1").val("010");
		$("#eventTelNum2").val("");
		
		$("#sendEmailMail1").val("");
		$("#sendEmailMail2").val("");
		$("#sendEmailMemo").val("");

		$("#strCount").text("0");

		$("label[for=sendEmailAgree1]").addClass("on");
		$("label[for=sendEmailAgree2]").removeClass("on");

		$("input:radio[name=agree]:input[value=1]").attr("checked", true);
		$("input:radio[name=agree]:input[value=2]").attr("checked", false);

		$("#subIdxForEmail").val(subIdx);
		$("#mailTitle").html(title);
	}
	
	function clearMailForSelected(title){
		var resLayout1 = $("#resLayout1");		
		var resLayout2 = $("#resLayout2");		
		var resLayout3 = $("#resLayout3");	
		
		var resClass1 = resLayout1.attr("class");
		var resClass2 = resLayout2.attr("class");
		var resClass3 = resLayout3.attr("class");
		
		var subIdx = 1;
		
		if( resClass1 == "box box-result1 on" ){
			subIdx = 1;
		} else if( resClass2 == "box box-result2 on" ){
			subIdx = 2;
		} else {
			subIdx = 3;
		}
		
		clearMailForDental(title, subIdx);
	}
	
	function fn_showYnPayDetail() {
		dentalDetModal.openOutput();
	}
	
			/* To-Be */
	//	상세보기 (상세보장보기)
	function dentalPayDetail(data, sbIdx, payDetailArr) {
		
		var item = data.guaranteeArry;
		
		
		for( var i=0; i<payDetailArr.length; i++ ){
			var payDetailObj = payDetailArr[i];
			
			var code = payDetailObj.code;
			var name = payDetailObj.name;
			
			var payVal1 = "";
			var payVal2 = "";
			var payVal3 = "";
			var payVal4 = "";
			var payVal5 = "";
			var payVal6 = "";
			var payVal7 = "";
			var payVal8 = "";
			var payVal9 = "";
			
			var useIdxObj = fn_getPayValueByName(name, data);
			
			if( 1 == sbIdx ){
				
				if( useIdxObj["mainInsuIdx"] == -999 ){
					payVal1 = "0";
				} else {
					payVal1 = item[ useIdxObj["mainInsuIdx"] ].amt;
				}
				
				if( useIdxObj["subInsuIdx"] == -999 ){
					payVal2 = "0";
				} else {
					payVal2 = item[ useIdxObj["subInsuIdx"] ].amt;
				}
				
				payVal3 = parseFloat( payVal1.split("만원")[0].replace(",", "") ) + parseFloat( payVal2.split("만원")[0].replace(",", "") );
				
				if( payVal1 == "0" ){
					payVal1 = "-";
				}
				if( payVal2 == "0" ){
					payVal2 = "-";
				}
				
				if( payVal3 == 0 || payVal3 == "-" ){
					payVal3 = "-";
				} else {
					payVal3 = fn_setCommaRegExp(payVal3);
					payVal3 += "만원";
				}
				
				payDetailObj["payVal1"] = payVal1;
				payDetailObj["payVal2"] = payVal2;
				payDetailObj["payVal3"] = payVal3;				
			} else if( 2 == sbIdx ){
				
				if( useIdxObj["mainInsuIdx"] == -999 ){
					payVal4 = "0";
				} else {
					payVal4 = item[ useIdxObj["mainInsuIdx"] ].amt;
				}
				
				if( useIdxObj["subInsuIdx"] == -999 ){
					payVal5 = "0";
				} else {
					payVal5 = item[ useIdxObj["subInsuIdx"] ].amt;
				}
				
				payVal6 = parseFloat( payVal4.split("만원")[0].replace(",", "") ) + parseFloat( payVal5.split("만원")[0].replace(",", "") );
				
				if( payVal4 == "0" ){
					payVal4 = "-";
				}
				if( payVal5 == "0" ){
					payVal5 = "-";
				}
				
				if( payVal6 == 0 || payVal6 == "-" ){
					payVal6 = "-";
				} else {
					payVal6 = fn_setCommaRegExp(payVal6);
					payVal6 += "만원";
				}
				
				payDetailObj["payVal4"] = payVal4;
				payDetailObj["payVal5"] = payVal5;
				payDetailObj["payVal6"] = payVal6;				
			} else {
				
				if( useIdxObj["mainInsuIdx"] == -999 ){
					payVal7 = "0";
				} else {
					payVal7 = item[ useIdxObj["mainInsuIdx"] ].amt;
				}
				
				if( useIdxObj["subInsuIdx"] == -999 ){
					payVal8 = "0";
				} else {
					payVal8 = item[ useIdxObj["subInsuIdx"] ].amt;
				}
				
				payVal9 = parseFloat( payVal7.split("만원")[0].replace(",", "") ) + parseFloat( payVal8.split("만원")[0].replace(",", "") );
				
				if( payVal7 == "0" ){
					payVal7 = "-";
				}
				if( payVal8 == "0" ){
					payVal8 = "-";
				}
				
				if( payVal9 == 0 || payVal9 == "-" ){
					payVal9 = "-";
				} else {
					payVal9 = fn_setCommaRegExp(payVal9);
					payVal9 += "만원";
				}
				
				payDetailObj["payVal7"] = payVal7;
				payDetailObj["payVal8"] = payVal8;
				payDetailObj["payVal9"] = payVal9;				
			}
			
		}
		
		
	}	
	
	function fn_getPayDetailList(){
		// ip 임플란트 
		// tn 틀니 
		// br 브릿지 
		// bj 보존치료
		// bh 복합레진
		// am 아말감
		// cr 크라운
		// mg 만기보험금
		// yy 영구치유지
		// ys 영구치상실위로금
		// yb 영구치발치
		// cc 치수치료
		// jc 주요치주질환치료
		// cj 치석제거치료
		// kb 구내방사선촬영
		// pr 파노라마촬영
		// ki 각막이식수술
		// nn 녹내장
		// hb 황반변성질환
		// dm 당뇨병성망막질환
		// ta 특정안과질환
		// th 특정후각질환
		// tc 특정청각질환
		// tw 특정외모상해
		var keyArr = new Array();
		keyArr = ["ip","tn","br","bj","bh","am","cr","mg","yy","ys","yb","cc","jc","cj","kb","pr","ki","nn","hb","dm","ta","th","tc","tw"];
		var nameArr = new Array();
		
		nameArr.push("임플란트치료");
		nameArr.push("가철성의치(틀니)치료");
		nameArr.push("고정성가공의치(브릿지)치료");
		nameArr.push("인레이,온레이");
		nameArr.push("복합레진");
		nameArr.push("아말감,글래스아이노머");
		nameArr.push("크라운치료보험금");
		nameArr.push("만기보험금");
		nameArr.push("영구치유지보험금");
		nameArr.push("영구치상실위로금");
		nameArr.push("영구치발치보험금");
		nameArr.push("치수치료보험금");
		nameArr.push("주요치주질환치료보험금");
		nameArr.push("치석제거치료보험금");
		nameArr.push("구내방사선촬영보험금");
		nameArr.push("파노라마촬영보험금");
		nameArr.push("각막이식수술보험금");
		nameArr.push("녹내장수술보험금");
		nameArr.push("황반변성질환수술보험금");
		nameArr.push("당뇨병성망막질환수술보험금");
		nameArr.push("특정안과질환수술보험금");
		nameArr.push("특정후각질환수술보험금");
		nameArr.push("특정청각질환수술보험금");
		nameArr.push("특정외모상해수술보험금");

//		nameArr.push("틀니치료");
//		nameArr.push("브릿지치료");		
//		nameArr.push("크라운치료");	
//		nameArr.push("영구치유지");
//		nameArr.push("영구치발치");
//		nameArr.push("치수치료");	
//		nameArr.push("주요치주질환치료");
//		nameArr.push("치석제거치료");	
//		nameArr.push("구내방사선촬영");	
//		nameArr.push("파노라마촬영");		
		
		var payDetailArr = new Array();
		for(var i=0; i<keyArr.length; i++){
			var payDetailObj = {};
			payDetailObj["code"] = keyArr[i];
			payDetailObj["name"] = nameArr[i];
			payDetailArr.push(payDetailObj);
		}
		
		return payDetailArr;
		
	}
	
	function fn_getPayValueByName(name, data){
		
		var item = data.guaranteeArry; 
		var useIdxObj = {};
		var mainInsuIdx = -999;
		var subInsuIdx = -999;
		
		for(var i=0; i<item.length; i++){
			
			var compDataStr = item[i].name;
			if( compDataStr.indexOf( name ) > -1 ){
				if( data.inputObj.prcd == item[i].uiCode ){
					mainInsuIdx = i;
				} else {
					subInsuIdx = i;
				}
			}
			
		}
		
		useIdxObj["mainInsuIdx"] = mainInsuIdx;
		useIdxObj["subInsuIdx"] = subInsuIdx;
		return useIdxObj;
	}
	
	function fn_writePayDetailTag( payDetailArr ){
		
		//init
		$("#returnForDetail").html("");
		
		for(var i=0; i<payDetailArr.length; i++){
			
			var payDetailObj = payDetailArr[i];
			var code = payDetailObj.code;
			var name = payDetailObj.name;
			
			var payVal1 = payDetailObj.payVal1;
			var payVal2 = payDetailObj.payVal2;
			var payVal3 = payDetailObj.payVal3;
			var payVal4 = payDetailObj.payVal4;
			var payVal5 = payDetailObj.payVal5;
			var payVal6 = payDetailObj.payVal6;
			var payVal7 = payDetailObj.payVal7;
			var payVal8 = payDetailObj.payVal8;
			var payVal9 = payDetailObj.payVal9;
			
			var tag = "";
			
			if( "ip" == code ){
			 	tag =	'<tr>'
							+'<td rowspan="3">영구치보철치료</td>'
							+'<td class="td_tit">' + name + '</td>'
							+'<td class="data1 value1">' + payVal1 + '</td>'
							+'<td class="data1 value2">' + payVal2 + '</td>'
							+'<td class="data1 value3">' + payVal3 + '</td>'
							+'<td class="data2 value1">' + payVal4 + '</td>'
							+'<td class="data2 value2">' + payVal5 + '</td>'
							+'<td class="data2 value3">' + payVal6 + '</td>'
							+'<td class="data3 value1">' + payVal7 + '</td>'
							+'<td class="data3 value2">' + payVal8 + '</td>'
							+'<td class="data3 value3">' + payVal9 + '</td>'
						+'</tr>';				
			} else if( "bj" == code ) {
			 	tag =	'<tr>'
							+'<td rowspan="3">보존치료</td>'
							+'<td class="td_tit">' + name + '</td>'
							+'<td class="data1 value1">' + payVal1 + '</td>'
							+'<td class="data1 value2">' + payVal2 + '</td>'
							+'<td class="data1 value3">' + payVal3 + '</td>'
							+'<td class="data2 value1">' + payVal4 + '</td>'
							+'<td class="data2 value2">' + payVal5 + '</td>'
							+'<td class="data2 value3">' + payVal6 + '</td>'
							+'<td class="data3 value1">' + payVal7 + '</td>'
							+'<td class="data3 value2">' + payVal8 + '</td>'
							+'<td class="data3 value3">' + payVal9 + '</td>'
						+'</tr>';			
			} else if( "tn" == code || "br" == code || "bh" == code || "am" == code ) {
			 	tag =	'<tr>'
							+'<td>' + name + '</td>'
							+'<td class="data1 value1">' + payVal1 + '</td>'
							+'<td class="data1 value2">' + payVal2 + '</td>'
							+'<td class="data1 value3">' + payVal3 + '</td>'
							+'<td class="data2 value1">' + payVal4 + '</td>'
							+'<td class="data2 value2">' + payVal5 + '</td>'
							+'<td class="data2 value3">' + payVal6 + '</td>'
							+'<td class="data3 value1">' + payVal7 + '</td>'
							+'<td class="data3 value2">' + payVal8 + '</td>'
							+'<td class="data3 value3">' + payVal9 + '</td>'
						+'</tr>';			
			} else {
			 	tag =	'<tr>'
							+'<td colspan="2">' + name + '</td>'
							+'<td class="data1 value1">' + payVal1 + '</td>'
							+'<td class="data1 value2">' + payVal2 + '</td>'
							+'<td class="data1 value3">' + payVal3 + '</td>'
							+'<td class="data2 value1">' + payVal4 + '</td>'
							+'<td class="data2 value2">' + payVal5 + '</td>'
							+'<td class="data2 value3">' + payVal6 + '</td>'
							+'<td class="data3 value1">' + payVal7 + '</td>'
							+'<td class="data3 value2">' + payVal8 + '</td>'
							+'<td class="data3 value3">' + payVal9 + '</td>'
						+'</tr>';
			}
			
			$("#returnForDetail").append(tag);
			
		}
		
	}
	
	/*
	function fn_setComma(num){
		var len, point, str;
		
		num = num + "";
		point = num.length % 3;
		len = num.length;
		
		str = num.substring(0, point);
		while( point < len ){
			if( str != "" ){
				str += ",";
			}
			str += num.substring(point, point + 3);
			point += 3;
		}
		
		return str;
	}
	*/
	
	function fn_setCommaRegExp(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}