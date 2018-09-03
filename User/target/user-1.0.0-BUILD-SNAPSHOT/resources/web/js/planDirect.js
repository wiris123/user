
	var directForm;
	var directType;
	
	var isFree = false;
	
	var directScope;
	
	//	저축 납입금액 최소값
	var directEsavingMinimumValue = 5;
	
	//	변액 납입금액 최소값
	var directVariableSavingMinimumValue = 5;
	//	변액 납입금액 최대값
	var directVariableSavingMaximumValue = 10000;

	//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5: 연금저축, 7: 연금, 8: 변액
	var PRODUCT_CANCER 	 = "1";
	var PRODUCT_TERM   	 = "2";
	var PRODUCT_ACCIDENT = "3";
	var PRODUCT_ESAVING  = "4";
	var PRODUCT_ANNUITY  = "5";
	var PRODUCT_IANNUITY = "7";
	var PRODUCT_VARIABLESAVING = "8";
	var PRODUCT_MEDICAL_A1 = "9";
	var PRODUCT_MEDICAL_A2 = "10";
	var PRODUCT_MEDICAL_B1 = "11";
	var PRODUCT_MEDICAL_B2 = "12";
	var PRODUCT_MEDICAL_C1 = "13";
	var PRODUCT_MEDICAL_C2 = "14";
	var PRODUCT_MEDICAL_D1 = "16";
	var PRODUCT_MEDICAL_D2 = "17";
	var PRODUCT_DENTAL = "15";
	var directToDate = ""; 
	var directSlpcode = "";
	var directStaAge = "";
	var directEndAge = "";
	
	//	재계산시에 필요
	var directPrevVal;
	var directNextVal;
	
	//	치아 전용		
	var dentalTreatyList = [];
	var DENTAL_CALC_TYPE_LOW = 1;
	var DENTAL_CALC_TYPE_MID = 2;
	var DENTAL_CALC_TYPE_HIGH = 3;
	
	function directSelectGenderUI(index) {
		if (index == 1) {
			$("label[for=direct2_2_1]").addClass("on");
			$("label[for=direct2_2_2]").removeClass("on");
			
			$("input:radio[name=directGender]:input[value=1]").attr("checked", true);
			$("input:radio[name=directGender]:input[value=2]").attr("checked", false);
		} else {
			$("label[for=direct2_2_1]").removeClass("on");
			$("label[for=direct2_2_2]").addClass("on");
			
			$("input:radio[name=directGender]:input[value=1]").attr("checked", false);
			$("input:radio[name=directGender]:input[value=2]").attr("checked", true);
		}
	}
	
	function directInitCalc() {
		//	상품버튼 초기화
		$(".label-product>li>label").removeClass("on");
		
		//	step 초기화
		directInitStep();

		//	step title 초기화
		$("#stepForm").removeClass("form-step2");
		$("#stepForm").removeClass("form-step3");
		
		toDate = ""; 
		slpcode = "";
		staAge = "";
		endAge = "";
	}
	
	function directInitStep() {
		$("#step2Full, #step3Cancer, #step3Term, #step3Accident, #step3iAnnuity, #step3Annuity, #step3Esaving, #step3VariableSaving, #step3Medical, #step3Dental").hide();
		$("#step2Empty, #step3Empty").show();
		
		$("#directBirthday").val("");
		//directSelectGenderUI(1);
		$("#directAnnAge").html('<option value="">연금개시나이 선택</option>');
		$("#directInsTerm").html('<option value="">보험기간 선택</option>');
		$("#directNapTerm").html('<option value="">납입기간 선택</option>');
		$("#directNapMoney1").val("");
		$("#directNapMoney2").val("");
		$("#directNapMoney3").val("");
		
		$("#directNapTerm").attr("disabled", false);
		$("#directInsTerm").attr("disabled", false);
		
		//	생년월일 리로드시
		ui.initReload();
	}
	
	function directSetStep2(type) {

		directType = type;
		preGender = "";
		preBirth = "";
		
		directInitStep();
		$("#stepForm").removeClass("form-step3");
		$("#stepForm").addClass("form-step2");
		$("#step2Empty").hide();
		$("#step2Full").show();
		
		var $step2ItemList = $("#step2ItemList");
		
		$step2ItemList.children().each(function(index) {
			$(this).show();
		});
		
		//	상품구분  1: 암, 2: 정기, 3: 상해, 4: 저축, 5: 연금저축, 7: 연금, 8: 변액 , 9/10/11/12/13/14: 실손, 15: 치아
		/*
		0 : 생년 
		1 : 성별
		2 : 연금개시나이
		3 : 보기
		4 : 납기
		5 : 납입금액1 - 연금, 연금저축
		6 : 납입금액2 - 저축
		7 : 납입금액3 - 변액
		8 : 상품선택 - 실손(종합형/질병형/상해형)
		9 : 보험종류 - 실손(표준형/선택형2)
		10 : 의료수급권자 여부 
		11 : 보험종류 - 치아(종합형/진단형)
		*/
		if (type == PRODUCT_CANCER || type == PRODUCT_TERM || type == PRODUCT_ACCIDENT) {
			$step2ItemList.children().eq(2).hide();
			$step2ItemList.children().eq(5).hide();
			$step2ItemList.children().eq(6).hide();
			$step2ItemList.children().eq(7).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
		} else if (type == PRODUCT_ANNUITY || type == PRODUCT_IANNUITY) {
			$step2ItemList.children().eq(3).hide();
			$step2ItemList.children().eq(6).hide();
			$step2ItemList.children().eq(7).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
		} else if (type == PRODUCT_ESAVING) {
			$step2ItemList.children().eq(2).hide();
			$step2ItemList.children().eq(5).hide();
			$step2ItemList.children().eq(7).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
		} else if (type == PRODUCT_VARIABLESAVING) {
			$step2ItemList.children().eq(2).hide();
			$step2ItemList.children().eq(5).hide();
			$step2ItemList.children().eq(6).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
		} else if (type == PRODUCT_MEDICAL_A1 || type == PRODUCT_MEDICAL_A2 ||
				type == PRODUCT_MEDICAL_B1 || type == PRODUCT_MEDICAL_B2 ||
				type == PRODUCT_MEDICAL_C1 || type == PRODUCT_MEDICAL_C2 ||
				type == PRODUCT_MEDICAL_D1 || type == PRODUCT_MEDICAL_D2){
			$step2ItemList.children().eq(2).hide();
			$step2ItemList.children().eq(3).hide();
			$step2ItemList.children().eq(4).hide();
			$step2ItemList.children().eq(5).hide();
			$step2ItemList.children().eq(6).hide();
			$step2ItemList.children().eq(7).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			//$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
		} else if (type == PRODUCT_DENTAL){
			$step2ItemList.children().eq(2).hide();
			$step2ItemList.children().eq(5).hide();
			$step2ItemList.children().eq(6).hide();
			$step2ItemList.children().eq(7).hide();
			$step2ItemList.children().eq(8).hide();
			$step2ItemList.children().eq(9).hide();
			$step2ItemList.children().eq(10).hide();
			$step2ItemList.children().eq(11).hide();
			
			var html = '<option value="10">보험기간 : 10년</option>';
			$("#directInsTerm").html(html).attr("disabled", true);
			$("#directNapTerm").html(html).attr("disabled", true);
			
			//	치아 특약리스트 가져오기
			//	비동기를 해도 생년월일을 타이핑하는 동안 데이터를 가져올수 있는 시간이 충분.
			$.ajax({
				type : "POST",
				url : "/getDentalTreatyCodeList.eds",
				async : true,
				success : function(result) {
					if (result.success) {
						dentalTreatyList = [];
						dentalTreatyList.push("");
						
						var tmp2 = "";
						var tmp3 = "";
						
						for (var i = 0; i < result.treatyList.list.length; i++) {
							if (i < 6) {
								tmp2 += result.treatyList.list[i].uiCode + "&";
							} else {
								tmp3 += result.treatyList.list[i].uiCode + "&";
							}
						}
						
						tmp2 = tmp2.substring(0, tmp2.length - 1);
						tmp3 = tmp3.substring(0, tmp3.length - 1);
						
						dentalTreatyList.push(tmp2);
						dentalTreatyList.push(tmp2 + "&" + tmp3);
					}
				},
				beforeSend : function() {},		
	 			complete : function() {},		
				error : function() {} 
			});
		}
		
		directGetInsuranceInfo(directType);
	}
	
	function directGetInsuranceInfo(type) {
		var jsonData = '{"insuranceType":"' + type + '"}';
		
		$.ajax({
			type : "POST",
			url : "/planDirect.eds",
			data : jsonData,
			dataType : 'json',
			async : false,
			success : function(result) {
				if (result.success) {
					
					directForm = new Object();
					//	2016.11.17
					//	내게맞는 보험찾기와 바로가입하기를 구분하기 위해 calcType 추가
					directForm.calcType = "direct";
					directForm.proType = result.product.proType;
					directForm.prcdId = result.product.id;
					directForm.prcd = result.product.pcode;
					directForm.prdtVcd = result.product.pvcode;
					directForm.insCd = result.product.icode;
					directForm.insrVcd = type == PRODUCT_CANCER ? result.product.pvcode : "001";
					directForm.repCd = result.product.slpcode;
					directForm.prdtnm = result.product.fullNm;
					directForm.contName = "고객님";
					directForm.contBirth = "";
					directForm.contGender = "";
					directForm.insuPeriod = "";
					directForm.payMethod = "";
					directForm.payPeriod = "";
					directForm.premium = "";
					directForm.planSeq = "";

					// 암
					if (type == PRODUCT_CANCER) {
						directForm.mainContAmt = "10000000";
						directForm.treatyContAmt = "40000000";
					}

					// 정기
					if (type == PRODUCT_TERM) {
						directForm.insrPrdTypCd = "";
						directForm.padPrdTypCd = "";
						directForm.freeCont = "100000000";
					}

					//	연금, 연금저축
					if (type == PRODUCT_IANNUITY || type == PRODUCT_ANNUITY) {
						directForm.annuityAge = "";
					}
					if (type == PRODUCT_ANNUITY){
						directForm.isBirthGenderChanged = "";
					}
					
					directToDate = result.toDate; 
					directSlpcode = result.product.slpcode;
					directStaAge = result.product.staAge;
					directEndAge = result.product.endAge;
				} else {
					alert(result.message);
				}
			},
			error : function() {
				alert("error");
			} 
		});
	}
	
	function directInitCancerSelect(val) {
		//	ie8 때문에 수정
		var html = "";
		var value = 0;
		for (var i = 1; i < 10; i++) {
			value = i * 10000000;
			if (value >= parseInt(val + "0000")) {
				html = html + '<option value="' + value + '">' + addCommas(value / 10000) + '</option>';
			}
		}
		$("#directCancerReCalc2").empty();
		$("#directCancerReCalc2").html(html);
		
		
		/*$("#directCancerReCalc2").children().each(function(index) {
			$(this).show();
			if (index == 0) { $(this).attr("selected", "selected"); }
		});
		
		$("#directCancerReCalc2").children().each(function(index) {
			if (parseInt($(this).val()) < parseInt(value + "0000")) {
				$(this).hide();
			}
		});*/
		
		$("#directCancerReCalc2").val(val + "0000");
	}
	
	function directCBInsTerm() {
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
				var valTxt = '';
				var termAge = '종신';
				
				if(value.insrPrdTypCd != '99'){
					valTxt = value.insrPrdTypCd == '01' ? '년' : '세';
					termAge = value.insrPrdTypVal;
				}
				
				
				
				insHtml += '<option value="' + value.insrPrdTypVal + '">보험기간 : ' + termAge + valTxt + '</option>';
			});
		} else {
			insHtml = "<option>보험기간 선택</option>";							
		}
		
		$("#directInsTerm").html(insHtml);// 보험기간 HTML 세팅
		
		if (insTermArray.length == 1) {
			$("#directInsTerm").attr("disabled", true);
		}

		//	defualt set
		if (directType == PRODUCT_TERM) {
			$('#directInsTerm').val("20");
		} else if(directType == PRODUCT_ESAVING){
			$('#directInsTerm').val("10");
		}
		
		$('#directInsTerm').change(); 
	}
	
	function directCBAnnAge() {
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
		
		$("#directAnnAge").html(insHtml);	// 보험기간 HTML 세팅
		$('#directAnnAge').val("65");		//	defualt set
		$('#directAnnAge').change(); 		// 이벤트발생
	}
	
	function directCBNapTerm() {
		var annAgeVal = $("#directAnnAge").find("option:selected").val();
		$("#directNapTerm").empty();
		
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
		$("#directNapTerm").html(napHtml);
		
		//	default set
		$("#directNapTerm").val("10");
		
		directSetMoneyScope();
	}
	
	function directGetTermFromPF(type, callback, annAge) {
		var birth = $("#directBirthday").val();
		var gender = $("input[name=directGender]:checked").val();
		
		if (birth.length < 8 || typeof gender == 'undefined') { return; }
		
		if (type == PRODUCT_ESAVING) {
			var age = parseInt(getInsuAgeByYmd(birth));
			var staAge = 20;
			var fEndAge = 65;
			var mEndAge = 62;
			var msg = "";
			
			switch (gender) {
			case "1" :
				if (getInsuAgeByYmd(birth) > mEndAge) {
					alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ mEndAge + "세 입니다.");
					return;
				}
				break;
			case "2" :
				if (getInsuAgeByYmd(birth) > fEndAge) {
					alert("고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ fEndAge + "세 입니다.");
					return;
				}
				break;
			}
		} else {
			if (!directValidateCustAge($("#directBirthday"), directStaAge, directEndAge)) { return; }
		}
		
//		if (annAge == "") {
//			if (!isReadyToPF(birth, gender)) { return; }
//		}
		
		var jsonData;
		
		if (type ==PRODUCT_ANNUITY || type == PRODUCT_IANNUITY) {
			jsonData = getPFJsonData2(type, directToDate, directSlpcode, birth, gender, annAge);
		} else {
			jsonData = getPFJsonData2(type, directToDate, directSlpcode, birth, gender);
		}
		
		selPrdtCdInfoByPrcd(jsonData, callback);
	}
	
	function directMakeNapTerm(type) {
		// 선택한 보험기간 값
		var insValue = $("#directInsTerm").find('option:selected').val();
		
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
			$("#directNapTerm").empty();
			
			if (type == PRODUCT_CANCER || type == PRODUCT_ACCIDENT || type == PRODUCT_ESAVING || directType == PRODUCT_VARIABLESAVING) {
				
				if (napTermArray.length != 0) {
					$.each(napTermArray, function(index, value){
						
						if (type == PRODUCT_CANCER) {
							napHtml += '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
						} else if (type == PRODUCT_ACCIDENT || type == PRODUCT_ESAVING || directType == PRODUCT_VARIABLESAVING) {
							napHtml = '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
						}
						
						if (index == 0) {
							$("#directNapTerm").append(napHtml);
						} else {
							var isExist = false;
							$('#directNapTerm').children().each(function() {
								//	option
								if ($(this).val() == value.padPrdTypVal) {
									isExist = true;
								}
							});
							
							if (!isExist) { $('#directNapTerm').append(napHtml); }
						}
					});						
				} else {
					napHtml = "<option>납입기간 선택</option>";
					$("#directNapTerm").html(napHtml);
				}
				
				if( type == PRODUCT_ESAVING ){ //저축
					if ($("#directNapTerm").children().size() == 1) {
						var firstOptionVal = $("#directNapTerm").children().val();
						$("#directNapTerm").val(firstOptionVal);
						$("#directNapTerm").attr("disabled", true);
					} else {
						$("#directNapTerm").attr("disabled", false);
					}

				} else {
					if ($("#directNapTerm").children().size() == 1) {
						$("#directNapTerm").attr("disabled", true);
					}
				}
			} else if (type == PRODUCT_TERM) {
				
				if (napTermArray.length != 0) {
					$.each(napTermArray, function(index, value){
						napHtml += '<option value="' + value.padPrdTypVal + '">납입기간 : ' + value.padPrdTypVal + value.padPrdTypCdNm + '</option>';
					});						
				} else {
					napHtml = "<option>납입기간 선택</option>";
				}
				$("#directNapTerm").html(napHtml);
			}
			
			//	default set
			switch (type) {
				case PRODUCT_TERM:
					if ($("#directInsTerm").val() == "20") {
						$("#directNapTerm").val("20");
					}
					break;
				case PRODUCT_ACCIDENT:
					$("#directNapTerm").val("20");
					break;
				case PRODUCT_ESAVING:
					var defaultNapTerm = "5";
					var isNap5option = $("#directNapTerm option[value=" + defaultNapTerm + "]").length;
					if( isNap5option == 0 ){
						var firstOptionVal = $("#directNapTerm").children().val();
						$("#directNapTerm").val(firstOptionVal);
					} else {
						$("#directNapTerm").val(defaultNapTerm);
					}
					break;
				case PRODUCT_VARIABLESAVING:
					$("#directNapTerm").val("5");
					break;
			}
		}
	}
	
	function directValidateCustAge(birthObj, staAge, endAge) {
		var result = true;
		var msg = "";
		// 생년월일
		
		if (!chkDate(birthObj.val())) {
			alert("생년월일을 올바르게 입력해주세요.");
    		result = false;
		} else {
			var age = getInsuAgeByYmd(birthObj.val());
			if ( (age < staAge) || (age > endAge) ) {
				
				switch (directType) {
					case PRODUCT_CANCER :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷암보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_TERM :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷정기보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_ACCIDENT :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷상해보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_ESAVING :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷저축보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_ANNUITY :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금저축보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_IANNUITY :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷연금보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_VARIABLESAVING :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷변액저축보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
					case PRODUCT_MEDICAL_A1 :
					case PRODUCT_MEDICAL_A2 :
					case PRODUCT_MEDICAL_B1 :
					case PRODUCT_MEDICAL_B2 :
					case PRODUCT_MEDICAL_C1 :
					case PRODUCT_MEDICAL_C2 :
					case PRODUCT_MEDICAL_D1 :
					case PRODUCT_MEDICAL_D2 :
						msg = "고객님은 " + age + "세 입니다. \n\n인터넷실손의료보험 가입나이는 "+ staAge + "세 ~ "+ endAge + "세 입니다. ";
						break;
				}
				
				alert(msg);
        		result = false;
			}
		}
		
//		if (!result) birthObj.focus();
		if (!result) {
			birthObj.focus();
			birthObj.val("");
		}
		
		return result;
	}
	
	function directSetForm(type) {
			
		directForm.contBirth = $("#directBirthday").val();
		directForm.contGender = $("input[name=directGender]:checked").val();
		directForm.payPeriod = type == PRODUCT_TERM ? (
														$("#directNapTerm option:selected").val() > 20 ? 99 : $("#directNapTerm option:selected").val()
							   ) : $("#directNapTerm option:selected").val();

		if (type == PRODUCT_CANCER || type == PRODUCT_TERM || type == PRODUCT_ACCIDENT || type == PRODUCT_ESAVING || directType == PRODUCT_VARIABLESAVING) {
			directForm.insuPeriod = $("#directInsTerm option:selected").val();
		}
		
		if (type == PRODUCT_IANNUITY || type == PRODUCT_ANNUITY) {
			directForm.annuityAge = $("#directAnnAge").val();
			
			if (!isFree) {
				directForm.premium = parseInt($("#directNapMoney1").val().replace(/,/g, "")) * 10000;
			} else {
				if (type == PRODUCT_IANNUITY) {
					directForm.premium = parseInt($("#directIannuityMonthlyPremium").val().replace(/,/g, "")) * 10000;
				} else {
					directForm.premium = parseInt($("#directAnnuityMonthlyPremium").val().replace(/,/g, "")) * 10000;
					directForm.isBirthGenderChanged = "Y";
				}
				isFree = false;
			}
		}
		
		if (type == PRODUCT_ESAVING) {
			if (!isFree) {
				directForm.premium = parseInt($("#directNapMoney2").val().replace(/,/g, "")) * 10000;
			} else {
				directForm.premium = parseInt($("#directSavingMonthlyPremium").val().replace(/,/g, "")) * 10000;
				isFree = false;
			}
		}
		
		if (directType == PRODUCT_VARIABLESAVING) {
			if (!isFree) {
				directForm.premium = parseInt($("#directNapMoney3").val().replace(/,/g, "")) * 10000;
			} else {
				directForm.premium = parseInt($("#directVariableSavingMonthlyPremium").val().replace(/,/g, "")) * 10000;
				isFree = false;
			}
		}
		
		if (directType == PRODUCT_MEDICAL_A1 || directType == PRODUCT_MEDICAL_A2 ||
				directType == PRODUCT_MEDICAL_B1 || directType == PRODUCT_MEDICAL_B2 ||
				directType == PRODUCT_MEDICAL_C1 || directType == PRODUCT_MEDICAL_C2 ||
				directType == PRODUCT_MEDICAL_D1 || directType == PRODUCT_MEDICAL_D2) {
			directForm.insuPeriod = $("#directInsTerm option:selected").val();
			directForm.proType = directType;
			directForm.proType1 = $('#directProType1').val();
			directForm.proType2 = $('input[name=directProType2]:checked').val();
			directForm.mdcrRcbfrYn = $('#directMdcrRcbfrYn').is(':checked') ? $('#directMdcrRcbfrYn').val() : '';
			
			// 실손상품개정 by syi
			var selectedInsuList = getSelectedInsuListForDirectCalc();
			directForm.selectedInsuList = selectedInsuList;
			
			var treatyList = '';
			
			if(directForm.planType == 'simple'){
				/*$.each(pIPadPrdListElemVO, function(i, v){
					if(i > 0){
						treatyList += v.inscd;
						
						if(i < pIPadPrdListElemVO.length - 1){
							treatyList += '&';
						}
					}
				});*/
				$.each(treatyInfoList, function(i, v){
					treatyList += v.uiCode;
					if(i < treatyInfoList.length - 1){
						treatyList += '&';
					}
				});
			}else{
				var $step3MedicalCheckboxList = $('#step3Medical').find('input[name="treaty"]:checked');
				
				$.each($step3MedicalCheckboxList, function(i, v){
					treatyList += $(this).val();
					
					if(i < $step3MedicalCheckboxList.length - 1){
						treatyList += '&';
					}
				});
			}
			
			directForm.treatyList = treatyList;
			
			// 상해형 납입주기 연납 백업
//			if (directType == PRODUCT_MEDICAL_C1 || directType == PRODUCT_MEDICAL_C2) {
//				directForm.payPeriod = "12";
//			}else{
//				directForm.payPeriod = "1";
//			}
			
			var selectedInsuStr = getSelectedInsuListForDirectCalc();
			var selectedArr = selectedInsuStr.split("|");
			
			var isYearPay = true;
			//연납, 월납 판단
			for( var i=0; i<selectedArr.length; i++ ){
				var selectedProdId = selectedArr[i];
				if( selectedProdId == "-999" ){
					continue;
				} else {
					if( selectedProdId == "9" || selectedProdId == "10" || selectedProdId == "11" || selectedProdId == "12" ){
						isYearPay = false;
						break;
					}
				}
				
			}
			
			if( isYearPay ){
				directForm.payPeriod = "12";
			} else {
				directForm.payPeriod = "1";
			}
			
		}
		
		if (directType == PRODUCT_DENTAL) {
			directForm.proType = directType;
			directForm.insuPeriod = $("#directInsTerm option:selected").val();
			directForm.selImplStr = "100";
			
			switch (directForm.planSubType) {
				case DENTAL_CALC_TYPE_LOW:
					directForm.mainContAmt = "5000000";
					directForm.treatyList = dentalTreatyList[0];
					break;
					
				case DENTAL_CALC_TYPE_MID:
					directForm.mainContAmt = "10000000";
					directForm.treatyList = dentalTreatyList[1];
					break;
					
				case DENTAL_CALC_TYPE_HIGH:
					directForm.mainContAmt = "10000000";
					directForm.treatyList = dentalTreatyList[2];

					break;
			}
		}
	}
	
	function directTermSetTypeCode() {
		if (directType == PRODUCT_TERM) {
			// 보험기간유형 및 납입기간 유형 세팅
			$.each(pIPadPrdListElemVO, function(index, value){
				var insValue = $('#directInsTerm').find('option:selected').val();
				var napValue = $('#directNapTerm').find('option:selected').val();
				
				if (value.insrPrdTypVal == insValue && value.padPrdTypVal == napValue) {
					directForm.insrPrdTypCd = value.insrPrdTypCd;
					directForm.padPrdTypCd = value.padPrdTypCd;
				}
			});				
		}
	}
	
	function directAccidentGetHtml(data1, data2) {
		var htmlStr = "";
		var tmp, tmp1, tmp2;
		
		//	2016.11.28
		//	모든 상해에서 x -> X로 변경
		tmp = data1.split("×");
		if (tmp.length == 2) {
			tmp1 = tmp[0];
			tmp2 = tmp[1];
		}
		htmlStr += '<span><em>' + wonToStr2(data2) + '</em>원</span>';
		htmlStr += '<span>+ ' + tmp1 + ' x ' + tmp2 + '</span>';
		
		return htmlStr;
	}
	
	function directAnnuityGetInsuScope(napTerm, fullAge, age, annuityAge) {
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
	
	function directIannuityGetInsuScope(age) {
		var insuScope = {"startMoney":"", "endMoney":""};
		
		insuScope.startMoney = 10; insuScope.endMoney = 100;
		/*if ((age >=20) && (age <= 40)){
			insuScope.startMoney = 6; insuScope.endMoney = 100;
		}else{*/
			
		//}
		
		return insuScope;
	}
	
	function directSetMoneyScope() {
		
		var napTerm = $("#directNapTerm option:selected").val();
		var fullAge = getFullAgeByYmd($("#directBirthday").val());
		var age = getInsuAgeByYmd($("#directBirthday").val());
		var annuityAge = $("#directAnnAge option:selected").val();
		
		if (directType == PRODUCT_ANNUITY) {
			directScope = directAnnuityGetInsuScope(napTerm, fullAge, age, annuityAge);
		}

		if (directType == PRODUCT_IANNUITY) {
			directScope = directIannuityGetInsuScope(age);
		}
		
		var text = directScope.startMoney + "~" + directScope.endMoney + "만원까지";
		
		if (directType == PRODUCT_IANNUITY) {
			text = directScope.startMoney + "만원이상";
		}
		
		$("#directNapMoneyExample").text(text);
	}
	
	function directValidateForm(type) {
		var age = directForm.contBirth;
		var gender = directForm.contGender;
		var annuityAge = directForm.annuityAge;
		var insTerm = directForm.insuPeriod;
		var napTerm = directForm.payPeriod;
		var premium = parseInt(directForm.premium) / 10000;
		
    	if (getInsuAgeByYmd(age) <= 0) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$("#directBirthday").focus();
    		$("#directBirthday").val("");
    		return false;
    	}
    	
    	if (!chkDate(age)) {
    		alert("생년월일을 올바르게 입력해주세요.");
    		$('#directBirthday').focus();
    		$("#directBirthday").val("");
    		return false;
    	}
    	
    	if (typeof gender == 'undefined' || gender == ""){
    		alert("성별을 선택해주세요");
    		$('#direct2_2_1').focus();
    		return false;	    		
    	}
    	
    	if (type == PRODUCT_CANCER || type == PRODUCT_TERM || type == PRODUCT_ACCIDENT) {
    		
    		if (!$.isNumeric(insTerm)){
        		alert("보험기간을 선택해주세요");
        		return false;    		
        	}
        	
        	if (!$.isNumeric(napTerm)){
        		alert("납입기간을 선택해주세요");
        		return false;    		
        	}
    	}
		
		if (type == PRODUCT_IANNUITY || type == PRODUCT_ANNUITY) {
			
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
	    		$("#directNapMoney1").focus();
	    		$("#directNapMoney1").val("");
	    		return false;    		
	    	}
			
	    	if (type == PRODUCT_IANNUITY){
	    		if ((parseInt(premium, 10) < directScope.startMoney)) {
		    		alert("납입금액은 " + directScope.startMoney + "만원이상 입력해주세요.");
		    		$("#directNapMoney1").focus();
		    		$("#directNapMoney1").val("");
		    		return false;                                    
		    	}
	    	}else{
	    		if ((parseInt(premium, 10) < directScope.startMoney) || (parseInt(premium, 10) > directScope.endMoney)) {
		    		alert("납입금액은 " + directScope.startMoney + "만원 ~ " + directScope.endMoney + "만원 까지 입력해주세요.");
		    		$("#directNapMoney1").focus();
		    		$("#directNapMoney1").val("");
		    		return false;                                    
		    	}
	    	}
			
		}
		
		if (type == PRODUCT_ESAVING) {
			
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
	    		$("#directNapMoney2").focus();
	    		$("#directNapMoney2").val("");
	    		return false;    		
	    	}
	    	
	    	if (parseInt(premium, 10) < directEsavingMinimumValue) {
	    		alert("납입금액은 " + directEsavingMinimumValue + "만원 이상 입력해주세요.");
	    		$("#directNapMoney2").focus();
	    		$("#directNapMoney2").val("");
	    		return false;
	    	}
	    	
		}
		
		if (type == PRODUCT_VARIABLESAVING) {
			
	    	if (!$.isNumeric(napTerm)){
	    		alert("납입기간을 선택해주세요");
	    		return false;    		
	    	}
	    	
	    	if (!$.isNumeric(premium)){
	    		alert("납입금액을 입력해주세요");
	    		$("#directNapMoney3").focus();
	    		$("#directNapMoney3").val("");
	    		return false;    		
	    	}
	    	
	    	if (parseInt(premium, 10) < directVariableSavingMinimumValue) {
	    		alert("납입금액은 " + directVariableSavingMinimumValue + "만원 이상 입력해주세요.");
	    		$("#directNapMoney3").focus();
	    		$("#directNapMoney3").val("");
	    		return false;
	    	}
	    	
	    	if (parseInt(premium, 10) > directVariableSavingMaximumValue) {
	    		alert("납입금액은 " + directVariableSavingMaximumValue + "만원 이하 입력해주세요.");
	    		$("#directNapMoney3").focus();
	    		$("#directNapMoney3").val("");
	    		return false;
	    	}
		}

		return true;
	}

	function directCalc(type) {
		
		directSetForm(type);
		if (!directValidateForm(type)) { return; }
		
		var urlStr = "/directCalc.eds";
		
		showLoadingDialog(true);
		
		$.ajax({
			type : "POST",
			url : urlStr,
			data : JSON.stringify(directForm),
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					lastSelectArrayData = result.arryData;
					directDisplayResult(type, result);
					setPlanCookie(result);
					
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
					var fbqValue = "planDirect";
					if((type=="1")||(type=="2")||(type=="3")||(type=="9")||(type=="10")||(type=="11")||(type=="12")||(type=="13")||(type=="14")||(type=="16")||(type=="17")){
						//보장성
						fbqValue = result.premium;
					}else if((type=="4")||(type=="5")||(type=="7")||(type=="8")){
						//금융형
						fbqValue = result.arryData.totPremium;
					}else if(type=="15"){
						//치아
						fbqValue = result.arryData[0].totPremium;
					}
					
					fbq('track', 'ViewContent', {
					    value: fbqValue,
					    currency: 'KRW',
					  });
					var chaiPrdtNm = (type == "15")? result.arryData[0].inputObj.prdtnm : result.arryData.inputObj.prdtnm; //치아보험일때만 상품명 담긴 객체가 다름
					chaiConv('1', chaiPrdtNm);
					dablena('track', 'ViewContent');
					window._tfa = window._tfa || [];
				    _tfa.push({ notify: 'action',name: 'cv_quote' });
					// 차이 마케팅 스크립트(보험료 설계 완료) 17.12.22
				} else {
					alert(result.message);
				}
				showLoadingDialog(false);
			},
			beforeSend : function() {},		
 			complete : function() {},		
			error : function() {} 
		});

		ga('send','event','Direct','Calculation','GNB_direct-entry',1);
		goog_report_conversion();
		call_dsp_track();
	}
	
	function directDisplayResult(type, result) {
		$("#step3Empty, #step3Cancer, #step3Term, #step3Accident, #step3iAnnuity, #step3Annuity, #step3Esaving, #step3VariableSaving, #step3Medical").hide();
		
		$("#stepForm").removeClass("form-step2");
		$("#stepForm").addClass("form-step3");
		
		switch (type) {
			case PRODUCT_CANCER: 
				$("#step3Cancer").show();
				$($("#step3Cancer>.btn-area")[0]).show();
				$($("#step3Cancer>.btn-area")[1]).hide();
				
				$("#directCancerReCalc1, #directCancerReCalc2").on("change", function() {
					$($("#step3Cancer>.btn-area")[0]).hide();
					$($("#step3Cancer>.btn-area")[1]).show();
				});
				
				directSetCancerResult(result);
				break;
			case PRODUCT_TERM:
				$("#step3Term").show();
				$($("#step3Term>.btn-area")[0]).show();
				$($("#step3Term>.btn-area")[1]).hide();
				
				gv_popNoticeDirectTerm = $plugin.popmodal($('#popNoticeDirectTerm'));
				
				$("#directTermReCalc").on("change", function() {
					$($("#step3Term>.btn-area")[0]).hide();
					$($("#step3Term>.btn-area")[1]).show();
					
					if(Number($(this).val()) >= 200000000){
						gv_popNoticeDirectTerm.openOutput();
					}
				});
				
				directSetTermResult(result);
				break;
			case PRODUCT_ACCIDENT:
				$("#step3Accident").show();
				$($("#step3Accident>.btn-area")[0]).show();
				$($("#step3Accident>.btn-area")[1]).hide();
				
				directSetAccidentResult(result);
				break;
			case PRODUCT_ESAVING:
				$("#step3Esaving").show();
				$($("#step3Esaving>.btn-area")[0]).show();
				$($("#step3Esaving>.btn-area")[1]).hide();
				
				$("#directSavingMonthlyPremium").on("keyup", function() {
					directNextVal = $(this).val();
					if (directNextVal != directPrevVal) {
						$($("#step3Esaving>.btn-area")[1]).show();
						$($("#step3Esaving>.btn-area")[0]).hide();
					}
				});
				
				directSetEsavingResult(result);
				break;
			case PRODUCT_ANNUITY:
				$("#step3Annuity").show();
				$($("#step3Annuity>.btn-area")[0]).show();
				$($("#step3Annuity>.btn-area")[1]).hide();
				
				$("#directAnnuityMonthlyPremium").on("keyup", function() {
					directNextVal = $(this).val();
					if (directNextVal != directPrevVal) {
						$($("#step3Annuity>.btn-area")[0]).hide();
						$($("#step3Annuity>.btn-area")[1]).show();
					}
				});
				
				directSetAnnuityResult(result);
				break;
			case PRODUCT_IANNUITY:
				$("#step3iAnnuity").show();
				$($("#step3iAnnuity>.btn-area")[0]).show();
				$($("#step3iAnnuity>.btn-area")[1]).hide();
				
				$("#directIannuityMonthlyPremium").on("keyup", function() {
					directNextVal = $(this).val();
					if (directNextVal != directPrevVal) {
						$($("#step3iAnnuity>.btn-area")[0]).hide();
						$($("#step3iAnnuity>.btn-area")[1]).show();
					}
				});
				
				directSetIannuityResult(result);
				break;
			case PRODUCT_VARIABLESAVING:
				$("#step3VariableSaving").show();
				$($("#step3VariableSaving>.btn-area")[0]).show();
				$($("#step3VariableSaving>.btn-area")[1]).hide();
				
				$("#directVariableSavingMonthlyPremium").on("keyup", function() {
					directNextVal = $(this).val();
					if (directNextVal != directPrevVal) {
						$($("#step3VariableSaving>.btn-area")[0]).hide();
						$($("#step3VariableSaving>.btn-area")[1]).show();
					}
				});
				
				directSetVariableSavingResult(result);
				break;
			case PRODUCT_MEDICAL_A1 :
			case PRODUCT_MEDICAL_A2 :
			case PRODUCT_MEDICAL_B1 :
			case PRODUCT_MEDICAL_B2 :
			case PRODUCT_MEDICAL_C1 :
			case PRODUCT_MEDICAL_C2 :
			case PRODUCT_MEDICAL_D1 :
			case PRODUCT_MEDICAL_D2 :
				var $step3Medical = $("#step3Medical");
				var $step3MedicalResultLi =  $step3Medical.find('ul.result').first().find('li');
				
				$step3Medical.show();
				$step3Medical.find('.btn-area').first().show();
				$step3Medical.find('.btn-area').last().hide();
				
				/*
				if(type == PRODUCT_MEDICAL_A1 || type == PRODUCT_MEDICAL_A2){
					$step3MedicalResultLi.show();
				}else if(type == PRODUCT_MEDICAL_B1 || type == PRODUCT_MEDICAL_B2){
					$step3MedicalResultLi.eq(0).show();
					$step3MedicalResultLi.eq(1).show();
					$step3MedicalResultLi.eq(2).hide();
					$step3MedicalResultLi.eq(3).hide();
				}else{
					$step3MedicalResultLi.eq(0).hide();
					$step3MedicalResultLi.eq(1).hide();
					$step3MedicalResultLi.eq(2).show();
					$step3MedicalResultLi.eq(3).show();
				}
				*/
				
				directSetMedicalResult(result);
				break;
				
			case PRODUCT_DENTAL :
				$("#step3Dental").show();
				$($("#step3Dental>.btn-area")[0]).show();
				$($("#step3Dental>.btn-area")[1]).hide();
				
				directSetDentalResult(result);
				
				break;
		}
	}
	
	function directSetCancerResult(result) {
		
		var data = result.arryData;
		
		/*
		var generalVal = data.guaranteeArry[3].amt.replace("만원", "").replace(",", "");
		var largeVal = data.guaranteeArry[19].amt.replace("만원", "").replace(",", "");
		var largeValAmt = parseInt(generalVal) + parseInt(largeVal);
		var smallBeginVal = data.guaranteeArry[12].amt.replace("만원", "").replace(",", "");
		var smallEndVal = data.guaranteeArry[11].amt.replace("만원", "").replace(",", "");
		var deathVal = data.guaranteeArry[16].amt.replace("만원", "").replace(",", "");
		*/
		
		var generalVal = data.gVal1;
		var largeVal = data.gVal2;
		var smallBeginVal = data.gVal3_1;
		var smallEndVal = data.gVal3_2;
		var deathVal = data.gVal4;
		var diagnosisVal = data.gVal5;
		
		directInitCancerSelect(generalVal);
		
		$("#directCancerMonthlyPremium").text(addCommas(data.padSmtotPrm));
		$("#directCancerReCalc1").val(generalVal / 2 + "0000");
		$("#directCancerLargeAmt").text(addCommas(largeVal));
		$("#directCancerSmallAmt").text(smallBeginVal + " ~ " + smallEndVal);
		$("#directCancerReCalc2").val(deathVal + "0000");
		$("#directCancerDiagnosisAmt").text(addCommas(diagnosisVal));
	}
	
	function directSetTermResult(result) {
		var data = result.arryData;
		
		$("#directTermMonthlyPremium").text(addCommas(data.padSmtotPrm));
		$("#directTermReCalc").val(data.deathAmt + "0000");
	}
	
	function directSetAccidentResult(result) {
		var data = result.arryData;
		
		$("#directAccidentMonthlyPremium").text(addCommas(data.padSmtotPrm));
		
		$("#step3Accident>div>ul").find(".data").each(function(index) {
			htmlStr = "";
			switch (index) {
				case 0 :
					htmlStr = directAccidentGetHtml(data.deathAmt12, data.deathAmt11);
					break;
					
				case 1 :
					htmlStr = directAccidentGetHtml(data.deathAmt22, data.deathAmt21);
					break;
					
				case 2 :
					htmlStr = directAccidentGetHtml(data.deathAmt32, data.deathAmt31);
					break;
					
				case 3 :
					htmlStr += '<span><em>' + addCommas(data.disAmt2) + '</em>만원</span>';
					htmlStr += '<span>* 해당장해지급률</span>';
					break;
					
				case 4 :
					htmlStr += '<span><em>' + data.annuityAmt2 + '~' + data.annuityAmt1 + '</em>원</span>';
					htmlStr += '<span>x 120회</span>';
					break;
			}
			
			$(this).empty();
			$(this).html(htmlStr);
		});
	}
	
	function directSetIannuityResult(result) {
		var data = result.arryData;
		
		$("#directIannuityMonthlyPremium").val(addCommas(parseInt(data.totPremium / 10000)));
		$("#directIannuityMoney").text(addCommas(parseInt(data.nowTime10 / 10000)));
		$("#directIannuityRatio").text(data.returnRatio);
		
		directPrevVal = $("#directIannuityMonthlyPremium").val();
	}
	
	function directSetAnnuityResult(result) {
		var data = result.arryData;
		
		var taxCredit = "0";
		var monthlyPremium = parseInt(data.totPremium / 10000);
		/*taxCredit = (monthlyPremium * 12 * 13.07 / 100).toFixed(1);
		if (taxCredit >= 52.8) taxCredit = 52.8;*/
		taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
		if (taxCredit >= 66) taxCredit = 66;
		
		$("#directAnnuityMonthlyPremium").val(monthlyPremium);
		$("#directAnnuityTax").text(taxCredit);
		$("#directAnnuityMoney").text(addCommas(parseInt(data.annuityMoney / 10000)));
		$("#directAnnuityRatio").text(data.returnRatio);
		
		directPrevVal = $("#directAnnuityMonthlyPremium").val(); 
	}
	
	function directSetEsavingResult(result) {
		result.arryData = result.resultObj;
		var data = result.arryData;
		
		$("#directSavingMonthlyPremium").val(addCommas(parseInt(data.totPremium / 10000)));
		$("#directSavingReturnMoney").text(addCommas(data.returnMoney));
		$("#directSavingReturnRatio").text(data.returnRatio);
		
		directPrevVal = $("#directSavingMonthlyPremium").val();
	}
	
	function directSetVariableSavingResult(result) {
		var data = result.arryData;
		
		$("#directVariableSavingMonthlyPremium").val(addCommas(parseInt(data.totPremium / 10000)));
		$("#directVariableSavingPeriod").text(data.inputObj.payPeriod);
		
		var rMoney = 0;
		var rRatio = 0;
		var selectPeriod = data.inputObj.payPeriod + '년';
		
		var statrIdx = lastSelectArrayData.nowRateArry.length / 3;
		var endIdx = statrIdx * 2;

		for(var i=statrIdx; i<endIdx; i++){
			var nowRate = data.nowRateArry[i];
			
			if(nowRate.totTerm == selectPeriod){
				rMoney = nowRate.rtnMoney;
				rRatio = nowRate.RtnRatio;
				
				break;
			}
		}

		$("#directVariableSavingReturnMoney").text(addCommas(parseInt(rMoney)));
		$("#directVariableSavingReturnRatio").text(rRatio);
		
		directPrevVal = $("#directVariableSavingMonthlyPremium").val();
	}
	
	function directSetMedicalResult(result) {
		var data = result.arryData;
		var payPeriodTxt = "월";
		
		if(data.inputObj.payPeriod != '1'){
			payPeriodTxt = "년";
		}
		
		$("#directMedicalTerm").text(payPeriodTxt);
		$("#directMedicalPremium").text(addCommas(parseInt(data.totPremium)));
		
		$.each(data.inputObj.treatyList, function(i, v){
			$('#step3Medical').find('input[value=' + v.insCd + ']').prop('checked', true).prev().addClass('on');
		});
	}
	
	function getDirectTreatyPreimum(guarantee, treatyName) {
		var result = 0;
    	
    	for (var i = 0; i < guarantee.length; i++) {
			var item = guarantee[i];
			
			if (item.name.indexOf(treatyName) > -1) {
				result += parseFloat(item.amt.replace("만원", ""));
			}
		}	
    	
    	return result;
	}
	
	function directSetDentalResult(result) {
		var selectedSubType = result.selectedSubType;
		var data = result.arryData[selectedSubType-1];
		var planSubType = data.inputObj.planSubType; 

		//	치아서브플랜
		//setDirectPlanSubType(planSubType);
		$.each($("input[name=directPlanSubType]"), function(i, v) {
			$(this).prop('checked', false).prev().removeClass('on');
		});
		 
		$("#directPlanSubType" + String(planSubType)).prop("checked", true).prev().addClass("on");
		 
		//	월보험료
		$("#directDentalPremium").text(addCommas(parseInt(data.totPremium)));
		
		var html = "";
		
		//	영구치보철치료
		html = '<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "틀니") + '</em>만원</span></li>' +
				'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "브릿지") + '</em>만원</span></li>' +
				'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "임플란트") + '</em>만원</span></li>';	
		$("#directDentalResult1").html(html);
		
		//	보존치료
		html = '<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "인레이") + '</em>만원</span></li>' +
				'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "복합레진") + '</em>만원</span></li>' +
				'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "아말감") + '</em>만원</span></li>';	
		$("#directDentalResult2").html(html);
		
		//	크라운치료
		$("#directDentalResult3").text(getDirectTreatyPreimum(data.guaranteeArry, "크라운"));
		
		//	영구치발치
		$("#directDentalResult4").text(getDirectTreatyPreimum(data.guaranteeArry, "영구치발치"));
		
		//	치수치료
		$("#directDentalResult5").text(getDirectTreatyPreimum(data.guaranteeArry, "치수치료"));
		
		//	주요치주질환치료
		$("#directDentalResult6").text(getDirectTreatyPreimum(data.guaranteeArry, "주요치주질환치료"));
		
		//	치석제거
		$("#directDentalResult7").text(getDirectTreatyPreimum(data.guaranteeArry, "치석제거"));
		
		//	구내방사선촬영
		$("#directDentalResult8").text(getDirectTreatyPreimum(data.guaranteeArry, "구내방사선촬영"));
		
		//	파노라마촬영
		$("#directDentalResult9").text(getDirectTreatyPreimum(data.guaranteeArry, "파노라마촬영"));
		
		//	만기보험금
		$("#directDentalResult10").text(getDirectTreatyPreimum(data.guaranteeArry, "만기보험금"));
		
		//	영구치유지
		$("#directDentalResult11").text(getDirectTreatyPreimum(data.guaranteeArry, "영구치유지"));
		

		//	선택특약 추가
		var premium = 0;
		var count = 0;
		
		//	영구치상실위로금
		premium = getDirectTreatyPreimum(data.guaranteeArry, "영구치상실위로금");
		if (premium != 0) {
			html = '<div class="label"><span>영구치상실위로금</span></div>' +
					'<div class="data">' +
					'<span><em>' + premium + '</em>만원</span>' +
					'</div>';
			$("#directDentalResult12").html(html);
		} else {
			$("#directDentalResult12").empty();
			count++;
		}
		
		//	각막이식수술
		premium = getDirectTreatyPreimum(data.guaranteeArry, "각막이식수술");
		if (premium != 0) {
			html = '<div class="label"><span>각막이식수술</span></div>' +
					'<div class="data">' +
					'<span><em>' + premium + '</em>만원</span>' +
					'</div>';
			$("#directDentalResult13").html(html);
		} else {
			$("#directDentalResult13").empty();
			count++;
		}
		
		//	3대안과질환수술
		premium = getDirectTreatyPreimum(data.guaranteeArry, "녹내장");
		if (premium != 0) {
			html = '<div class="label">' +
					'<h4>3대안과질환수술</h4>' +
					'<ul class="txt-type3">' +
					'<li>녹내장</li>' +
					'<li>황반변성질환</li>' +
					'<li>당뇨병성망막질환</li>' +
					'</ul>' +
					'</div>' +
					'<div class="data">' +
					'<ul>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "녹내장") + '</em>만원</span></li>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "황반변성질환") + '</em>만원</span></li>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "당뇨병성망막질환") + '</em>만원</span></li>' +
					'</ul>' +
					'</div>';
			$("#directDentalResult14").html(html);
		} else {
			$("#directDentalResult14").empty();
			count++;
		}
		
		//	3대안과질환수술
		premium = getDirectTreatyPreimum(data.guaranteeArry, "특정안과질환");
		if (premium != 0) {
			html = '<div class="label">' +
					'<h4>3대안과질환수술</h4>' +
					'<ul class="txt-type3">' +
					'<li>특정안과질환</li>' +
					'<li>특정후각질환</li>' +
					'<li>특정청각질환</li>' +
					'<li>특정외모상해</li>' +
					'</ul>' +
					'</div>' +
					'<div class="data">' +
					'<ul>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "특정안과질환") + '</em>만원</span></li>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "특정후각질환") + '</em>만원</span></li>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "특정청각질환") + '</em>만원</span></li>' +
					'<li><span><em>' + getDirectTreatyPreimum(data.guaranteeArry, "특정외모상해") + '</em>만원</span></li>' +
					'</ul>' +
					'</div>';
			$("#directDentalResult15").html(html);
		} else {
			$("#directDentalResult15").empty();
			count++;
		}
		
		if (count == 4) {
			for (var i = 2; i < 7; i++) {
				$("#directDentalResult1" + String(i)).hide();
			}
		} else {
			for (var i = 2; i < 7; i++) {
				$("#directDentalResult1" + String(i)).show();
			}
		}
	}
	
	function directViewDetail() {
		
		if (directType == PRODUCT_IANNUITY || directType == PRODUCT_ANNUITY || directType == PRODUCT_ESAVING || directType == PRODUCT_VARIABLESAVING) {
			directForm.premium = parseInt(directForm.premium) / 10000; 
		}
		
		var jsonData = JSON.stringify(directForm);
		$.cookie("mainPlanData",jsonData ,{path:'/'});
		
		location.href = getPlanUrl(directType); // 페이지 이동
	}

	function getSelectedInsuListForDirectCalc() {
		var selji = "directCalc_selji"; //질병입원
		var seljt = "directCalc_seljt"; //질병통원
		var selsi = "directCalc_selsi"; //상해입원
		var selst = "directCalc_selst"; //상해통원
		
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
	
	function setDefSelectBoxinPageForDirectCalc() {
		
		var selectedInsuList = "9|11|13|16";
		var selectedInsuArr = selectedInsuList.split("|");
		//주보험 세팅
		var selji = "directCalc_selji"; //질병입원
		var seljt = "directCalc_seljt"; //질병통원
		var selsi = "directCalc_selsi"; //상해입원
		var selst = "directCalc_selst"; //상해통원

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

	}
	
	function setProTypeForDirectCalc(obj){
		var selectedProductType = getSelectedInsuListForDirectCalc();
		var selectedArr = selectedProductType.split("|");
		
		if( "" == selectedProductType ){
			var optionVal1 = $("#"+obj.id).children().eq(0).val();
			$("#"+obj.id).val(optionVal1);
			$("#"+obj.id).focus();
			alert("주 보험은 하나이상 선택해야 합니다.");
			return;
		}
		
		directType = selectedArr[0];
		directGetInsuranceInfo(directType);
		
		var isYearPay = true;
		//연납, 월납 판단
		for( var i=0; i<selectedArr.length; i++ ){
			var selectedProdId = selectedArr[i];
			if( selectedProdId == "-999" ){
				continue;
			} else {
				if( selectedProdId == "9" || selectedProdId == "10" || selectedProdId == "11" || selectedProdId == "12" ){
					isYearPay = false;
					break;
				}
			}
			
		}
		
		if( isYearPay ){
			directForm.payPeriod = "12";
		} else {
			directForm.payPeriod = "1";
		}
		
		$("#step3Medical").find('.btn-area').first().hide();
		$("#step3Medical").find('.btn-area').last().show();
	}
	
	function fn_clickGoSubscribe(){
		var selSubTyp = $("input[name=directPlanSubType]:checked").val()-1;
		goSubscribe(directType, selSubTyp, "direct");
	}