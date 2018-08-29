<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="ko" lang="ko">

<!-- Mirrored from direct.samsunglife.com/guide/guideBefore.eds by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 07 Aug 2018 07:24:22 GMT -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="author" content="삼성생명, Samsung Life Insurance, 삼성생명 다이렉트"/>
<meta name="keywords" content="생명보험인터넷가입, 삼성생명인터넷가입, 인터넷보험라운지, 보험온라인가입, 인터넷보험견적, 삼성생명보험가입, 온라인다이렉트보험, 삼성보험회사, 생명보험다이렉트, 인터넷으로보험가입, 인터넷보험, 삼성라이프, 인터넷다이렉트보험, 보험인터넷가입, 인터넷보험가입, 인터넷보험상품, 삼성라운지, 보험료계산, 생명보험, 삼성생명, 건강보험, 삼성생명보험, 다이렉트보험, 보장성보험, 삼성생명다이렉트" />
<meta name="description" content="보험료는 줄이고 혜택과 장점은 그대로! 언제 어디서나 보험료 설계부터 가입까지 가능한, 인터넷 보험도 역시 삼성생명! " />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link rel="shortcut icon" type="image/x-icon" href="../resources/web/images/com/samsunglife.ico" />
<title>가입 전 가이드</title>

	<!-- 공통 css -->
	<link rel="stylesheet" href="../resources/cms/pc/css/common68b3.css?ver=1"/>
	<link rel="stylesheet" href="../resources/cms/pc/css/content68b3.css?ver=1"/>
	<!-- 공통 script -->
	<script type="text/javascript" src="../resources/web/js/ui.plugin.js"></script>
	<script type="text/javascript" src="../resources/web/js/ui.common.js"></script>
	<script type="text/javascript" src="../resources/web/js/dev.plugin.js" charset="utf-8"></script>
	<script type="text/javascript" src="../resources/web/js/dev.common.js" charset="utf-8"></script>
	<!-- plan script -->
	<script type="text/javascript" src="../resources/web/js/plan.js" charset="utf-8"></script>
	
	<!-- 어도비 스크립트 -->
	<script type="text/javascript" src="../resources/web/js/adobeDtm.js" charset="utf-8"></script>
	<script src="../../assets.adobedtm.com/70e7c1e41a15664b7412b48a9e091675a718223f/satelliteLib-ca1e208783476d525a421be25e9cd460655f0fe0.js"></script>
	
	<!-- Google Tag Manager 18.04.19-->
	<script>
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
	var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
	j.src='../../www.googletagmanager.com/gtm5445.html?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TMRBHXZ');
	</script>
	<!-- End Google Tag Manager -->
	<!-- 크리테오 스크립트 -->
	<script type="text/javascript" id="criteoScript" src="../../static.criteo.net/js/ld/ld.js" async="true"></script>
	<script type="text/javascript">
		window.criteo_q = window.criteo_q || [];
		jQuery(function(){
			loadCriteoObj();
		});
		
		
		function loadCriteoObj(){
			var currentUrl = $(location).attr('pathname');
			
			if(currentUrl == '/index.eds'){	// 메인
				window.criteo_q.push(
					{ event: "setAccount", account: 49892 },
			        { event: "setSiteType", type: "d" },
					{event:"viewHome"}		
				);
			}else if(currentUrl == '/esaving.eds'){	// 상품페이지
				window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
					    { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"esaving"}		
					);
				}else if(currentUrl == '/annuity.eds'){
					window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
					    { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"annuity"}		
					);
				}else if(currentUrl == '/iAnnuity.eds'){
					window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
				        { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"iannuity"}		
					);
				}else if(currentUrl == '/cancer.eds'){
					window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
				        { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"cancer"}		
					);
				}else if(currentUrl == '/term.eds'){
					window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
				        { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"term"}		
					);
				}else if(currentUrl == '/dental.eds'){
					window.criteo_q.push(
						{ event: "setAccount", account: 49892 },
				        { event: "setSiteType", type: "d" },
						{event:"viewItem", item:"dental"}		
					);
				}else if(currentUrl == '/stepLogin.eds'){		// 공인인증
				var prdtTypeCrt = '';
				switch(prdtTypeCrt){
				case '1':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"cancer_entry", item:[{id:"cancer", price:1, quantity:1}]}	
					);
					break;
				case '2':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"term_entry", item:[{id:"term", price:1, quantity:1}]}	
					);
					break;
				case '4':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"esaving_entry", item:[{id:"esaving", price:1, quantity:1}]}	
					);
					break;
				case '5':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"annuity_entry", item:[{id:"annuity", price:1, quantity:1}]}	
					);
					break;
				case '7':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"iannuity_entry", item:[{id:"iannuity", price:1, quantity:1}]}	
					);
					break;
				case '15':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"dental_entry", item:[{id:"dental", price:1, quantity:1}]}	
					);
					break;
				}
			}else if(currentUrl == '/step1.eds'){		// 1단계
				var prdtTypeCrt = '';
				switch(prdtTypeCrt){
				case '1':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"cancer_step1", item:[{id:"cancer", price:1, quantity:1}]}	
					);
					break;
				case '2':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"term_step1", item:[{id:"term", price:1, quantity:1}]}	
					);
					break;
				case '4':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"esaving_step1", item:[{id:"esaving", price:1, quantity:1}]}	
					);
					break;
				case '5':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"annuity_step1", item:[{id:"annuity", price:1, quantity:1}]}	
					);
					break;
				case '7':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"iannuity_step1", item:[{id:"iannuity", price:1, quantity:1}]}	
					);
					break;
				case '15':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"dental_step1", item:[{id:"dental", price:1, quantity:1}]}	
					);
					break;
				}
			}else if(currentUrl == '/stepComplete.eds'){		// 청약완료단계
				var prdtTypeCrt = '';
				switch(prdtTypeCrt){
				case '1':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"cancer_complete", item:[{id:"cancer", price:1, quantity:1}]}	
					);
					break;
				case '2':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"term_complete", item:[{id:"term", price:1, quantity:1}]}	
					);
					break;
				case '4':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"esaving_complete", item:[{id:"esaving", price:1, quantity:1}]}	
					);
					break;
				case '5':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"annuity_complete", item:[{id:"annuity", price:1, quantity:1}]}	
					);
					break;
				case '7':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"iannuity_complete", item:[{id:"iannuity", price:1, quantity:1}]}	
					);
					break;
				case '15':
					window.criteo_q.push(
							{ event: "setAccount", account: 49892 },
					        { event: "setSiteType", type: "d" },
							{event:"trackTransaction", id:"dental_complete", item:[{id:"dental", price:1, quantity:1}]}	
					);
					break;
				}
			}
		} // loadCriteoObj
		
		
		function criteoPcCalc(prdtType){
			var criteoSrc = "../../static.criteo.net/js/ld/ld.js";
		    $('script[src="'+criteoSrc+'"]').remove();
		    $.getScript(criteoSrc, function(){
		    	$('script[src="'+criteoSrc+'"]').attr("id", "criteoScript");
		    	window.criteo_q = window.criteo_q || [];
		    	window.criteo_q.push(
		    			{event: "setAccount", account: 49892},
		    			{event: "setSiteType", type: "d"},
		    			{event: "trackTransaction", id: prdtType+"_cal", 
		    				item: [{id: prdtType, price:1, quantity:1}]}
		    	);
		    });
		} // criteoPcCalc
		
		
	</script>

	<!-- 크리테오 스크립트 -->
	<!-- 큐브(chai) 스크립트 -->
<!-- ArtistChai CUBE Common Script START -->
<script>
 // (c) 2017 Chai Communication
 var ATC = "179";
 !function(a,b,c){a.ChaiAt=c;var d=b.createElement("script");d.src="../../at.artistchai.co.kr/script/at_v13.mind41d.js?"+Math.random();var e=b.getElementsByTagName("script")[0];e.parentNode.insertBefore(d,e)}(window,document,"chai_at");
 
function chaiConv(step, param){
	if(typeof(chai_at) != "undefined" && chai_at){
		switch(step){
			case "1": // 보험료계산
				chai_at._chai_conv('', '', '', '', '', '', '', step, param, '', '', '0');
				break;
			case "2": // 공인인증
				chai_at._chai_conv('', '', '', '', '', '', '', step, param, '', '', '0');
				break;
			case "3": // 가입완료
				chai_at._chai_conv('', '', '', '', '', '', '', step, param, '', '', '0');
				break;
			case "4": // 1단계
				chai_at._chai_conv('', '', '', '', '', '', '', step, param, '', '', '0');
				break;
		}
	}
} 
</script>
<!-- ArtistChai CUBE Common Script END -->

	<!-- 큐브(chai) 스크립트 -->

<script language="javascript" type="text/javascript">
	jQuery(function() {
		// 계산버튼클릭 이벤트
		jQuery("#planApply").on("click",function() {

			var contBirth = $("#pbirthday").val();
			var contGender = $("input[name=pgender]:checked").val();
			$("#contBirth").val(contBirth);
			$("#contGender").val(contGender);

			var product = $("#product").val();
			var proInfo = product.split("_");
			var proType = proInfo[0];

			$("#proType").val(proType);
			$("#staAge").val(proInfo[1]);
			$("#endAge").val(proInfo[2]);

			if (!validation(contBirth, contGender)) return;

			var age = checkAge();

			if(age!=0){
				setFormDefValue(proType, age);

				// 보험료계산
				ga('send','event','Direct','Calculation','before-guide',1);

				//	계산기 wiselog
				calc_logging("before_" + getProductName(proType));
				
				setCalculatorEvent();

				var jsonData = JSON.stringify($("#mainFrm").serializeObject());
				$.cookie("mainPlanData",jsonData ,{path:'/'});
				location.href = getPlanUrl(proType); // 페이지 이동
			}
		});

		jQuery('#product').on('change', function(){
			var btnText = "내 수령액 확인 / 가입";
			
			switch ($(this).val().substring(0, 1)) {
				case PRODUCT_CANCER: case PRODUCT_TERM: case PRODUCT_ACCIDENT:
					btnText = "내 보험료 확인 / 가입";
					break;
				case PRODUCT_IANNUITY: case PRODUCT_ANNUITY: case PRODUCT_ESAVING: case PRODUCT_VARIABLESAVING:
					btnText = "내 수령액 확인 / 가입";
					break;
			}
			
			jQuery('#planApply > span').text(btnText);
		});
		
		//하단계산기 생년월일, 성별 쿠키값 설정
		var birthdayCookie = $.cookie("birthdayCookie");
		if (typeof(birthdayCookie) != "undefined" && birthdayCookie !=""){
			$("#pbirthday").val(birthdayCookie);
		}	
		var genderCookie = $.cookie("genderCookie");	
		if (typeof(genderCookie) != "undefined" && genderCookie !=""){
			if(genderCookie == "1"){
				$('#calcGender1').click();
			}else{
				$('#calcGender2').click();
			}
		}
	});
	

	//가입나이 체크
	function checkAge(){
		// 만나이
	    var age = getInsuAgeByYmd(jQuery("#pbirthday").val());
		if(age != "") {
			if ((age >= $("#staAge").val()) && (age <= $("#endAge").val())){}else{
		    	if (!chkDate(jQuery("#pbirthday").val())) {
		    		alert("생년월일을 올바르게 입력해주세요.");
		    		//$('#pbirthday').focus();
		    		$('#pbirthday').val("");
		    		return false;
		    	}
	    		alert("고객님의 보험가입 나이는 "+age+"세 입니다. \n\보험가입은 "+$("#staAge").val()+"세 이상 "+$("#endAge").val()+"세 이하만 가능합니다. ");
	    		return 0;
			}
		}
		return age;
	}


	//입력값 체크
	function validation(contBirth, contGender){
		if (getInsuAgeByYmd(contBirth)> 0){
		}else{
			alert("생년월일을 올바르게 입력해주세요.");
			$('#pbirthday').val("");
			$("#pbirthday").focus();
			return false;
		}
		if (!chkDate(contBirth)) {
			alert("생년월일을 올바르게 입력해주세요.");
			$('#pbirthday').val("");
			$('#pbirthday').focus();
			return false;
		}

		if (typeof contGender == 'undefined' || contGender ==""){
			alert("성별을 선택해주세요");
			$('#calcGender1').focus();
			return false;
		}
		return true;
	}
	var products = "[com.samsunglife.edirect.model.Product@4f2382f, com.samsunglife.edirect.model.Product@3a469832, com.samsunglife.edirect.model.Product@70b21881, com.samsunglife.edirect.model.Product@3c66f6f4, com.samsunglife.edirect.model.Product@bdf2c27, com.samsunglife.edirect.model.Product@68cbba87, com.samsunglife.edirect.model.Product@17432ad1, com.samsunglife.edirect.model.Product@3ab00b45, com.samsunglife.edirect.model.Product@7bb3fd1c]";
	
</script>
</head>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"  %>
		<div id="container">
			<%@ include file="../include/Head.jsp" %>
			<div id="content">
			<!-- 내용시작 -->
			

<body>

<div id="wrapper">

<script type="text/javascript" src="../resources/web/js/planDirect.js"></script>
<script>
	var isEmptyPromotion = 'true' == 'true' ? true : false;
	
	function goMain(){
		if(location.pathname.indexOf('stepComplete.eds') > -1){
			gv_popAd.openOutput();
		}else{
			if(isEmptyPromotion){
				location.href = '../index-2.html';
			}else{
				var loc = location;
				var arrSplitSearch = loc.search.split('&');
				var newSearch = '';

				$.each(arrSplitSearch, function(i, v){
					var tempSearch = v;

					if(tempSearch.indexOf('org') > -1){
						tempSearch = tempSearch + '_logo';
					}

					if(i > 0){
						tempSearch = '&' + tempSearch;
					}

					newSearch += tempSearch;
				});

				window.open(loc.protocol + '//' + loc.host + loc.pathname + newSearch, '_blank');
				
				//window.open('/','_blank');
			}
		}
	}
</script>
	<!-- ### layout : header ///////////////////////////////////////////////// -->
	

	<!-- ## layout aside : 전체메뉴 -->
	<div id="asideMenu" class="pop-aside">
		
	</div>
	<script type="text/javascript">
	//<!--
		$plugin.popmodal($('#asideMenu'), {
			overlay_fixed : true,
			class_overlay : 'modal-overlay3',
			load_animation : true,
			load_only : true,
			auto_focus : false,
			modal_type : 'toggle'
		});
	//-->
	</script>
	
<!-- ## POPUP : 바로가입하기 -->
<div id="asideDirect" class="pop-aside">
	<div class="header">
		<button type="button" class="ui-close btn-close">바로가입하기 닫기<span></span></button>
	</div>
	<div class="content aside-direct">
		<h2 class="hd">바로가입하기</h2>
		<p class="hd">상품선택, 내정보비력, 보험료 계산 순으로 진행됩니다.</p>
		<!-- # 바로가기 STEP1 ///////////////////////////////////////////////////////////////////////// -->
		<div class="direct-form" id="stepForm">
			<fieldset class="step1">
				<legend><span>1. 상품선택</span></legend>
				<!-- @2015-12-30 : 단계별 문구 구분으로 위치변경 및 문구수정 -->
				<div class="mes">
					<p>원하시는 상품을 선택하면<br/>다음 단계 진행이 가능하세요.</p>
				</div>
				<!-- @2015-12-30 -->
				<div class="form">
					<ul class="label-product">
						<li>
							<label for="direct1_4" class="p4">암</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_4" value="1" title="암"/>
						</li>
						<li>
							<label for="direct1_5" class="p5">정기</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_5" value="2" title="정기"/>
						</li>
						<li>
							<label for="direct1_6" class="p6">상해</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_6" value="3" title="상해"/>
						</li>
						<!-- @2018-3-2 치아추가-->
						<li>
							<label for="direct1_9" class="p9">치아</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_9" value="15" title="치아"/>
						</li>
						<!-- @2017-6-12 실손추가-->
						<li>
							<label for="direct1_8" class="p8">실손</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_8" value="9" title="실손"/>
						</li>
						<li>
							<label for="direct1_1" class="p1">연금</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_1" value="7" title="연금"/>
						</li>
						<li>
							<label for="direct1_2" class="p2">연금저축</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_2" value="5" title="연금저축"/>
						</li>
						<li>
							<label for="direct1_3" class="p3">저축</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_3" value="4" title="저축"/>
						</li>
						<li>
							<label for="direct1_7" class="p7">변액적립</label>
							<input type="radio" name="direct_product" class="radio" id="direct1_7" value="8" title="변액적립"/>
						</li>
					</ul>
				</div>
			</fieldset>
			<fieldset class="step2" id="step2Empty">
				<legend><span>2. 내 정보 입력</span></legend>
				<!-- @2015-12-30 : 단계별 문구 구분으로 위치변경 -->
				<div class="mes">
					<p>내 정보를 입력하면<br/>다음 단계로 진행이 가능하세요.</p>
				</div>
				<!-- @2015-12-30 -->
			</fieldset>
			<fieldset class="step2" id="step2Full">
				<legend><span>2. 내 정보 입력</span></legend>
				<div class="mes">
					<p>내 정보를 입력하면<br/>다음 단계로 진행이 가능하세요.</p>
				</div>
				<ul class="form" id="step2ItemList">
					<li>
						<span class="label">생년월일</span>
						<div class="form-wrap1">
							<label for="directBirthday" class="label">예) 19851015</label>
							<input type="text" maxlength="8" size="8" id="directBirthday" autocomplete="off" class="text placeholder numOnly" title="생년월일 예) 19851015"/>
						</div>
					</li>
					<li>
						<span class="label">성별</span>
						<div class="label-radiobtn gender">
							<span>
								<label for="direct2_2_1">남자</label>
								<input type="radio" name="directGender" class="radio" id="direct2_2_1" value="1" title="성별(남자)"/>
							</span>
							<span>
								<label for="direct2_2_2">여자</label>
								<input type="radio" name="directGender" class="radio" id="direct2_2_2" value="2" title="성별(여자)"/>
							</span>
						</div>
					</li>
					<li>
						<label for="directAnnAge" class="label2">연금<br/>개시나이</label>
						<span class="select-box">
							<select id="directAnnAge" title="연금개시나이">
								<option value="">연금개시나이 선택</option>
							</select>
						</span>
					</li>
					<li>
						<label for="directInsTerm">보험기간</label>
						<span class="select-box">
							<select id="directInsTerm" title="보험기간">
								<option value="">보험기간 선택</option>
							</select>
						</span>
					</li>
					<li>
						<label for="directNapTerm">납입기간</label>
						<span class="select-box">
							<select id="directNapTerm" title="납입기간">
								<option value="">납입기간 선택</option>
							</select>
						</span>
					</li>
					<li>
						<label for="directNapMoney1">납입금액</label>
						<div class="form-wrap1 form-price">
							<label for="directNapMoney1" class="label" id="directNapMoneyExample">10만원이상</label>
							<input type="text" id="directNapMoney1" autocomplete="off" class="text placeholder numOnly"  title="10만원이상"/>
							<span class="label">만원</span>
						</div>
					</li>
					<li>
						<label for="directNapMoney2">납입금액</label>
						<div class="form-wrap1 form-price">
							<label for="directNapMoney2" class="label">5만원 이상</label>
							<input type="text" id="directNapMoney2" autocomplete="off" class="text placeholder numOnly" maxlength="4" size="4" title="납입금액 5만원 이상(단위:만원)"/>
							<span class="label">만원</span>
						</div>
					</li>
					<li>
						<label for="directNapMoney3">납입금액</label>
						<div class="form-wrap1 form-price">
							<label for="directNapMoney3" class="label">5만원 이상</label>
							<input type="text" id="directNapMoney3" autocomplete="off" class="text placeholder numOnly" maxlength="5" size="5" title="납입금액 5만원 이상(단위:만원)"/>
							<span class="label">만원</span>
						</div>
					</li>
					<li>
						<label for="directProType1">상품선택</label>
						<span class="select-box">
							<select id="directProType1" title="상품 선택">
								<option value="A" selected="selected">종합형</option>
								<option value="B">질병형</option>
								<option value="C">상해형</option>
							</select>
						</span>
					</li>
					<li>
						<span class="label">보험종류</span>
						<div class="label-radiobtn2">
							<span>
								<label for="directProType2-1" class="on">표준형</label>
								<input type="radio" name="directProType2" class="radio" id="directProType2-1" value="1" checked="checked">
							</span>
							<span>
								<label for="directProType2-2" class="">선택형Ⅱ</label>
								<input type="radio" name="directProType2" class="radio" id="directProType2-2" value="2">
							</span>
							
						</div>
					</li>
					<li>
						<span class="label-check">
							<label for="directMdcrRcbfrYn">의료수급권자 여부</label>
							<input type="checkbox" class="check" id="directMdcrRcbfrYn" name="directMdcrRcbfrYn" value="Y" title="의료수급권자선택">
						</span>
					</li>
					<!-- @치아보험 보험종류 추가 : 2018-3-1 -->
					<li>
						<span class="label">보험종류</span>
						<div class="label-radiobtn2">
							<span>
								<label for="directProType3-1" class="on">일반형</label>
								<input type="radio" name="directProType3" class="radio" id="directProType3-1" value="1" checked="checked">
							</span>
							<span>
								<label for="directProType3-2" class="">진단형</label>
								<input type="radio" name="directProType3" class="radio" id="directProType3-2" value="2">
							</span>
							
						</div>
					</li>
				</ul>
				<div class="btn-area">
					<a href="#none" class="btn-type1 c1" id="directCalc"><span>내 보험료 확인 / 가입</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3Empty">
				<legend><span>3. 보험료 계산</span></legend>
			</fieldset>
			<fieldset class="step3" id="step3Cancer">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt>월 보험료</dt>
						<dd><strong id="directCancerMonthlyPremium">00,000</strong>원</dd>
					</dl>
					<ul class="result product1">
						<li>
							<div class="label">일반암</div>
							<div class="data">
								<span class="select-box">
									<select id="directCancerReCalc1" title="일반암">
										<option value="5000000">1,000</option>
										<option value="10000000">2,000</option>
										<option value="15000000">3,000</option>
									</select>
								</span>
								<span>만원</span>
							</div>
						</li>
						<li>
							<div class="label">고액암</div>
							<div class="data"><em id="directCancerLargeAmt">0,000</em>만원</div>
						</li>
						<li>
							<div class="label">소액암</div>
							<div class="data"><em id="directCancerSmallAmt">000~000</em>만원</div>
						</li>
						<li>
							<div class="label">암사망</div>
							<div class="data">
								<span class="select-box">
									<select id="directCancerReCalc2" title="암사망">
										<option value="10000000">1,000</option>
										<option value="20000000">2,000</option>
										<option value="30000000">3,000</option>
										<option value="40000000">4,000</option>
										<option value="50000000">5,000</option>
										<option value="60000000">6,000</option>
										<option value="70000000">7,000</option>
										<option value="80000000">8,000</option>
										<option value="90000000">9,000</option>
									</select>
								</span>
								<span>만원</span>
							</div>
						</li>
						<li>
							<div class="label">재진단암</div>
							<div class="data"><em id="directCancerDiagnosisAmt">0</em>만원</div>
						</li>
					</ul>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent1" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan1" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc1"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3Term">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt>월 보험료</dt>
						<dd><strong id="directTermMonthlyPremium">00,000</strong>원</dd>
					</dl>
					<div class="result product2">
						<label for="directTermReCalc">사망보험금</label>
						<span class="select-box">
							<select id="directTermReCalc" title="사망보험금">
								<option value="50000000">5,000만원</option>
								<option value="60000000">6,000만원</option>
								<option value="70000000">7,000만원</option>
								<option value="80000000">8,000만원</option>
								<option value="90000000">9,000만원</option>
								<option value="100000000">1억</option>
								<option value="110000000">1억1000만</option>
								<option value="120000000">1억2000만</option>
								<option value="130000000">1억3000만</option>
								<option value="140000000">1억4000만</option>
								<option value="150000000">1억5000만</option>
								<option value="160000000">1억6000만</option>
								<option value="170000000">1억7000만</option>
								<option value="180000000">1억8000만</option>
								<option value="190000000">1억9000만</option>
								<option value="200000000">2억</option>
							</select>
						</span>
						<span>원</span>
					</div>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent2" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan2" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc2"><span>재계산하기</span></a>
				</div>
				
				<div id="popNoticeDirectTerm" class="pop-modal1 w500">
					<div class="header">
						<button type="button" onclick="gv_popNoticeDirectTerm.closeOutput();return false;">가입전 확인사항 닫기<span></span></button>
					</div>
					<div class="content">
						<h2 class="mes-type1"><br><span class="block">가입전 <strong class="txt-c1">반드시</strong> 읽어 주세요</span></h2>
						<p class="tit-type3 mg-cnt"><span class="block">사망보험금 2억원 이상의 계약은 <br>고객님 <strong>재무상황</strong>에 대한 <strong>확인전화</strong> 및 <br>관련서류 <strong>원본 제출 요청</strong>이 <br>있을수 있으니 이점 양해해 주시기 바랍니다.</span><br/>
						<span class="txt-tip txt-c2">단, 사망보험금 2억 미만 계약도 경우에 따라 동일한 요청이 있을 수 있습니다.</span></p>
						<div class="btn-area">
						<a href="#" class="btn-type2 c1" alt="페이지 이동" onclick="gv_popNoticeDirectTerm.closeOutput();return false;"><span>확인</span></a>
						</div>
					</div>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3Accident">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt>월 보험료</dt>
						<dd><strong id="directAccidentMonthlyPremium">00,000</strong>원</dd>
					</dl>
					<ul class="result product3">
						<li>
							<div class="label">대중교통사고사망</div>
							<div class="data">
								<span><em>1억5,000만</em>원</span>
								<span>+ 월 50만원 × 120회</span>
							</div>
						</li>
						<li>
							<div class="label">교통재해사망</div>
							<div class="data">
								<span><em>1억</em>원</span>
								<span>+ 월 50만원 × 120회</span>
							</div>
						</li>
						<li>
							<div class="label">일반재해사망</div>
							<div class="data">
								<span><em>5,000만</em>원</span>
								<span>+ 월 50만원 × 120회</span>
							</div>
						</li>
						<li>
							<div class="label">재해장해보험</div>
							<div class="data">
								<span><em>2,500만</em>원</span>
								<span>* 해당장해지급률</span>
							</div>
						</li>
						<li>
							<div class="label">재해장해연금</div>
							<div class="data">
								<span><em>30~120만</em>원</span>
								<span>× 120회</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent3" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan3" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc3"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3iAnnuity">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><label for="directIannuityMonthlyPremium">월 보험료</label></dt>
						<dd><input type="text" autocomplete="off" class="text numOnly" maxlength="3" size="3" id="directIannuityMonthlyPremium" title="월 보험료(단위:만원)"/>만원</dd>
					</dl>
					<ul class="result product4">
						<li>
							<div class="label">매년 연금수령액</div>
							<div class="data">
								<span><em id="directIannuityMoney">0,000</em>만원</span>
							</div>
						</li>
						<li>
							<div class="label">환급률</div>
							<div class="data">
								<span><em id="directIannuityRatio">000.0</em>%</span>
							</div>
						</li>
					</ul>
					<em class="txt-type2">종신연금형, 10회보증</em>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent7" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan7" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc7"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3Annuity">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><label for="directAnnuityMonthlyPremium">월 보험료</label></dt>
						<dd><input type="text" autocomplete="off" class="text numOnly" maxlength="3" size="3" id="directAnnuityMonthlyPremium" title="월 보험료(단위:만원)"/>만원</dd>
						<!-- <dt>월 보험료</dt>
						<dd><strong>00,000</strong>만원</dd> -->
					</dl>
					<ul class="result product5">
						<li>
							<div class="label">
								최대세액공제액
								<div class="tooltip-area">
									<a href="#none" class="icon-tip">안내문구보기</a>
									<div class="tooltip">
										<!-- <p>총급여 5,500만원 초과 근로자 또는 종합소득금액 4,000만원 초과 거주자 기준입니다.</p> -->
										<div>
											<p>※ 연간납입보험료 최대 400만원까지</p>
											<p>① 최대 66만원 세액공제(16.5%) : 총급여 5,500만원 이하 근로자 또는 종합소득금액 4,000만원 이하 거주자</p>
											<p>② 최대 52.8만원 세액공제(13.2%) : 총급여 5,500만원 초과 근로자 또는 종합소득금액 4,000만원 초과 거주자</p>
										</div>
									</div>
								</div>
							</div>
							<div class="data">
								<span><em id="directAnnuityTax">00.0</em>만원</span>
							</div>
						</li>
						<li>
							<div class="label">매년 연금수령액</div>
							<div class="data">
								<span><em id="directAnnuityMoney">000</em>만원</span>
							</div>
						</li>
						<li>
							<div class="label">환급률</div>
							<div class="data">
								<span><em id="directAnnuityRatio">000.0</em>%</span>
							</div>
						</li>
					</ul>
					<em class="txt-type2">종신연금형, 10회보증</em>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent5" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan5" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc5"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3Esaving">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><label for="directSavingMonthlyPremium">월 보험료</label></dt>
						<dd><input type="text" autocomplete="off" class="text numOnly" maxlength="4" size="4" id="directSavingMonthlyPremium" title="월 보험료(단위:만원)"/>만원</dd>
					</dl>
					<ul class="result product6">
						<li>
							<div class="label">만기환급금</div>
							<div class="data">
								<span><em id="directSavingReturnMoney">000</em>원</span>
							</div>
						</li>
						<li>
							<div class="label">환급율</div>
							<div class="data">
								<span><em id="directSavingReturnRatio">000.0</em>%</span>
							</div>
						</li>
					</ul>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent4" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan4" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc4"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<fieldset class="step3" id="step3VariableSaving">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><label for="directVariableSavingMonthlyPremium">월 보험료</label></dt>
						<dd><input type="text" autocomplete="off" class="text numOnly" maxlength="4" size="4" id="directVariableSavingMonthlyPremium" title="월 보험료(단위:만원)"/>만원</dd>
					</dl>
					<ul class="result product8">
						<li>
							<div class="label"><em id="directVariableSavingPeriod"></em>년 시점 환급금</div>
							<div class="data">
								<span><em id="directVariableSavingReturnMoney">0</em>원</span>
							</div>
						</li>
						<li>
							<div class="label">환급율</div>
							<div class="data">
								<span><em id="directVariableSavingReturnRatio">0.0</em>%</span>
							</div>
						</li>
						<li>
						    <div class="txt-info txt-fund">
						        <p class="txt-type4">투자수익률 : <strong class="txt-c1">년 2.5%</strong> 가정</p>
						    </div>
						      <div class="txt-info txt-fund">
						        <p class="txt-type4">펀드 : <strong class="txt-c1">채권형 100%</strong> 선택 가정</p>
						    </div>
						</li>
					</ul>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContent8" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlan8" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalc8"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<!-- @2017-6-12 실손 -->
			<fieldset class="step3" id="step3Medical" style="display: none;">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><span id="directMedicalTerm">월</span> 보험료</dt>
						<dd><strong id="directMedicalPremium">0</strong>원</dd>
					</dl>
					<ul class="result product9">
						<li>
							<div class="label">질병입원보장</div>
							<div class="data">
								<span><em>5,000만</em>원 한도</span>
							</div>
							<div class="select">
								<span class="select-box">
									<select id="directCalc_selji" title="상품 선택" onchange="setProTypeForDirectCalc(this);">
										<option value="9">표준형</option>
										<option value="10" >선택형Ⅱ</option>
										<option value="-999" >선택안함</option>
									</select>
								</span>
							</div>
						</li>
						<li>
							<div class="label">질병통원보장</div>
							<div class="data">
								<span>외래<em>20</em>만원/처방<em>10</em>만원</span>
							</div>
							<div class="select">
								<span class="select-box">
									<select id="directCalc_seljt" title="상품 선택" onchange="setProTypeForDirectCalc(this);">
										<option value="11">표준형</option>
										<option value="12" >선택형Ⅱ</option>
										<option value="-999" >선택안함</option>
									</select>
								</span>	
							</div>
						</li>
						<li>
							<div class="label">상해입원보장</div>
							<div class="data">
								<span><em>5,000만</em>원 한도</span>
							</div>
							<div class="select">
								<span class="select-box">
									<select id="directCalc_selsi" title="상품 선택" onchange="setProTypeForDirectCalc(this);">
										<option value="13">표준형</option>
										<option value="14" >선택형Ⅱ</option>
										<option value="-999" >선택안함</option>
									</select>
								</span>
							</div>
						</li>
						<li>
							<div class="label">상해통원보장</div>
							<div class="data">
								<span>외래<em>20</em>만원/처방<em>10</em>만원</span>
							</div>
							<div class="select">
								<span class="select-box">
									<select id="directCalc_selst" title="상품 선택" onchange="setProTypeForDirectCalc(this);">
										<option value="16">표준형</option>
										<option value="17" >선택형Ⅱ</option>
										<option value="-999" >선택안함</option>
									</select>
								</span>	
							</div>
						</li>
					</ul>
					<ul class="label-check result product1">
						<li>
							<label for="chkBox1_1" class="on">비급여 도수치료∙체외충격파∙증식치료</label>
							<input type="checkbox" name="treaty" class="check" id="chkBox1_1" checked="checked" value="R017901ANNNNNNN">
						</li>
						<li>
							<label for="chkBox1_2" class="on">비급여 주사료</label>
							<input type="checkbox" name="treaty" class="check" id="chkBox1_2" checked="checked" value="R018001ANNNNNNN">
						</li>
						<li>
							<label for="chkBox1_3" class="on">비급여 자기공명영상진단(MRI/MRA)</label>
							<input type="checkbox" name="treaty" class="check" id="chkBox1_3" checked="checked" value="R018101ANNNNNNN">
						</li>
					</ul>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContentMedical" onclick="ga('send','event','Direct','Etc','Check-info_GNB_direct-entry',1);"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlanMedical" onclick="ga('send','event','Direct','Entry','GNB_direct-entry',1);"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalcMedical"><span>재계산하기</span></a>
				</div>
			</fieldset>
			<!-- @2018-3-2 치아 -->
			<fieldset class="step3" id="step3Dental" style="/* display: none; */">
				<legend><span>3. 보험료 계산</span></legend>
				<div class="form">
					<dl>
						<dt><span id="directDentalTerm">월</span> 보험료</dt>
						<dd><strong id="directDentalPremium">0</strong>원</dd>
					</dl>
					<div class="label-radiobtn">
						<span>
							<label for="directPlanSubType1" class="on">실속형</label>
							<input type="radio" name="directPlanSubType" class="radio" id="directPlanSubType1" value="1" checked="checked">
						</span>
						<span>
							<label for="directPlanSubType2" class="">표준형</label>
							<input type="radio" name="directPlanSubType" class="radio" id="directPlanSubType2" value="2">
						</span>
						<span>
							<label for="directPlanSubType3" class="">고급형</label>
							<input type="radio" name="directPlanSubType" class="radio" id="directPlanSubType3" value="3">
						</span>
					</div>
					<div class="result-area">
						<ul class="result product10">
							<li>
								<div class="label">
									<h4>영구치보철 치료</h4>
									<ul class="txt-type3">
										<li>틀니치료</li>
										<li>브릿지</li>
										<li>임플란트치료</li>
									</ul>
								</div>
								<div class="data">
									<ul id="directDentalResult1">
										<li><span><em>50</em>만원</span></li>
										<li><span><em>25</em>만원</span></li>
										<li><span><em>50</em>만원</span></li>
									</ul>
								</div>
							</li>
							<li>
								<div class="label">
									<h4>보존 치료</h4>
									<ul class="txt-type3">
										<li>인레이,온레이</li>
										<li>복합레진</li>
										<li>아말감,글래스아이노머</li>
									</ul>
								</div>
								<div class="data">
									<ul id="directDentalResult2">
										<li><span><em>5</em>만원</span></li>
										<li><span><em>10</em>만원</span></li>
										<li><span><em>2</em>만원</span></li>
									</ul>
								</div>
							</li>
							<li>
								<div class="label"><span>크라운 치료</span></div>
								<div class="data">
									<span><em id="directDentalResult3">25</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>영구치발치</span></div>
								<div class="data">
									<span><em id="directDentalResult4">2</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>치수치료</span></div>
								<div class="data">
									<span><em id="directDentalResult5">2</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>주요치주질환 치료</span></div>
								<div class="data">
									<span><em id="directDentalResult6">2</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>치석제거 치료</span></div>
								<div class="data">
									<span><em id="directDentalResult7">1</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>구내방사선촬영</span></div>
								<div class="data">
									<span><em id="directDentalResult8">5천</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>파노라마 촬영</span></div>
								<div class="data">
									<span><em id="directDentalResult9">1</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>만기보험금</span></div>
								<div class="data">
									<span><em id="directDentalResult10">50</em>만원</span>
								</div>
							</li>
							<li>
								<div class="label"><span>영구치유지</span></div>
								<div class="data">
									<span><em id="directDentalResult11">50</em>만원</span>
								</div>
							</li>
							<li id="directDentalResult12">
								<div class="label"><span>영구치상실위로금</span></div>
								<div class="data">
									<span><em>30</em>만원</span>
								</div>
							</li>
							<li id="directDentalResult13">
								<div class="label"><span>각막이식수술</span></div>
								<div class="data">
									<span><em>1,000</em>만원</span>
								</div>
							</li>
							<li id="directDentalResult14">
								<div class="label">
									<h4>3대안과질환수술</h4>
									<ul class="txt-type3">
										<li>녹내장</li>
										<li>황반변성질환</li>
										<li>당뇨병성망막질환</li>
									</ul>
								</div>
								<div class="data">
									<ul>
										<li><span><em>50</em>만원</span></li>
										<li><span><em>7</em>만원</span></li>
										<li><span><em>70</em>만원</span></li>
									</ul>
								</div>
							</li>
							<li id="directDentalResult15">
								<div class="label">
									<h4>특정얼굴수술</h4>
									<ul class="txt-type3">
										<li>특정안과질환</li>
										<li>특정후각질환</li>
										<li>특정청각질환</li>
										<li>특정외모상해</li>
									</ul>
								</div>
								<div class="data">
									<ul>
										<li><span><em>20</em>만원</span></li>
										<li><span><em>20</em>만원</span></li>
										<li><span><em>20</em>만원</span></li>
										<li><span><em>30</em>만원</span></li>
									</ul>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="btn-area">
					<a href="#none" class="btn-type1" id="directViewContentDental"><span>상세보기</span></a>
					<a href="#none" class="btn-type1 c1" id="directGoPlanDental"><span>가입하기</span></a>
				</div>
				<div class="btn-area reset">
					<a href="#none" class="btn-type1 c4" id="directReCalcDental"><span>재계산하기</span></a>
				</div>
			</fieldset>
		</div>
	</div>
	<div class="bottom"></div>
</div>

<script type="text/javascript">
//<!--
	$plugin.popmodal($('#asideDirect'), {
		overlay_fixed : true,
		class_overlay : 'modal-overlay3',
		load_only : true,
		modal_type : 'toggle'
	});
//-->

	directInitCalc();

	$("input[name=direct_product]").on("click", function(){
		var productType = $(this).val();
		var btnText = "내 보험료 확인 / 가입";
		
		var now = getDateYMDHMS() ;
		var start = '20170331223000';
		var end = '20170401083000';
		if(start <= now && now <= end && productType == PRODUCT_ANNUITY){
			alert('인터넷연금저축 상품이 새롭게 단장중입니다.\n 3월 31일 22:30~ 4월 1일 8:30까지 \n조금만 기다려주세요');
			$("#stepList").find('input, select').attr("disabled", true);
			
			directInitStep();
			return;
		}
		
		switch (productType) {
			case PRODUCT_CANCER: case PRODUCT_TERM: case PRODUCT_ACCIDENT:
				btnText = "내 보험료 확인 / 가입";
				break;
			case PRODUCT_IANNUITY: case PRODUCT_ANNUITY: case PRODUCT_ESAVING: case PRODUCT_VARIABLESAVING: case PRODUCT_DENTAL:
				btnText = "내 수령액 확인 / 가입";
				break;
		}
		
		$('#directCalc>span').text(btnText);
		
		directSetStep2(productType);		
	});

	var getPFData = function(){
		switch (directType) {
			case PRODUCT_CANCER:
			case PRODUCT_TERM:
			case PRODUCT_ACCIDENT:
			case PRODUCT_ESAVING:
			case PRODUCT_VARIABLESAVING:
			case PRODUCT_MEDICAL_A1:
			case PRODUCT_MEDICAL_A2:
			case PRODUCT_MEDICAL_B1:
			case PRODUCT_MEDICAL_B2:
			case PRODUCT_MEDICAL_C1:
			case PRODUCT_MEDICAL_C2:
			case PRODUCT_MEDICAL_D1:
			case PRODUCT_MEDICAL_D2:
				directGetTermFromPF(directType, directCBInsTerm);
				break;
			case PRODUCT_ANNUITY:
			case PRODUCT_IANNUITY:
				directGetTermFromPF(directType, directCBAnnAge, "");
				break;
			case PRODUCT_DENTAL:				
				break;
		}
	};
	
	$("#directBirthday").on("keyup", function() {
		if (directType != PRODUCT_DENTAL) {
			getPFData();
		}
	});

	$("input[name=directGender]").on("click", function() {
		if (directType != PRODUCT_DENTAL) {
			getPFData();
		}
	});

	$("#directInsTerm").on("change", function() {

		if (directType == PRODUCT_CANCER || directType == PRODUCT_TERM || directType == PRODUCT_ACCIDENT || directType == PRODUCT_ESAVING || directType == PRODUCT_VARIABLESAVING) {
			directMakeNapTerm(directType);

			if (directType == PRODUCT_TERM) {
				directTermSetTypeCode();
			}
		}
	});

	$("#directNapTerm").on("change", function() {

		if (directType == PRODUCT_TERM) {
			directTermSetTypeCode();
		}

		if (directType == PRODUCT_ANNUITY || directType == PRODUCT_IANNUITY) {

			directSetMoneyScope();
		}
	});

	$("#directAnnAge").on("change", function() {
		if (directType == PRODUCT_ANNUITY || directType == PRODUCT_IANNUITY) {
			var annAgeValue = $(this).find("option:selected").val();
			directGetTermFromPF(directType, directCBNapTerm, annAgeValue);
		}
	});
	
	var setInsuType = function(){
		var proType1 = $('#directProType1').val();
		var proType2 = $('input[name=directProType2]:checked').val();
		
		if(proType1 == 'A'){
			if(proType2 == '1'){
				directType = PRODUCT_MEDICAL_A1;
			}else{
				directType = PRODUCT_MEDICAL_A2;
			}
		}else if(proType1 == 'B'){
			if(proType2 == '1'){
				directType = PRODUCT_MEDICAL_B1;
			}else{
				directType = PRODUCT_MEDICAL_B2;
			}
		}else{
			if(proType2 == '1'){
				directType = PRODUCT_MEDICAL_C1;
			}else{
				directType = PRODUCT_MEDICAL_C2;
			}
		}
		directGetInsuranceInfo(directType);
	};
	
	$('#step3Medical').find('input[name=treaty]').click(function(){
		$("#step3Medical").find('.btn-area').first().hide();
		$("#step3Medical").find('.btn-area').last().show();
	});
	
	$('#directProType1').change(function(){
		setInsuType();
	});
	
	$('input[name=directProType2]').click(function(){
		setInsuType();
	});

	$("#directCalc").on("click", function() {
		if (directType == PRODUCT_CANCER) {
			directForm.planType ="free";
		} else if(directType == PRODUCT_MEDICAL_A1 || directType == PRODUCT_MEDICAL_A2 || directType == PRODUCT_MEDICAL_B1 || directType == PRODUCT_MEDICAL_B2 || directType == PRODUCT_MEDICAL_C1 || directType == PRODUCT_MEDICAL_C2 || directType == PRODUCT_MEDICAL_D1 || directType == PRODUCT_MEDICAL_D2){
			setDefSelectBoxinPageForDirectCalc();
			var selectedProductType = getSelectedInsuListForDirectCalc();
			var selectedArr = selectedProductType.split("|");
			directType = selectedArr[0];
			directGetInsuranceInfo(selectedArr[0]);
			directForm.planType ="simple";
		} else{
			directForm.planType ="simple";
		}
		directForm.planSubType = DENTAL_CALC_TYPE_MID;
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_" + getProductName(directType) + "_simple");
	});
	
	$("input[name=directPlanSubType]").on("click", function() {
		directForm.planType ="simple";
		directForm.planSubType = parseInt($(this).val());
		directCalc(PRODUCT_DENTAL);
	});

	$("#directCancerReCalc1").on("change", function() {
		var value = $("#directCancerReCalc1 option:selected").text().replace("만원", "").replace(",", "");
		directInitCancerSelect(value);
	});

	$("#directViewContent1").on("click", function() { directViewDetail(); });
	$("#directGoPlan1").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc1").on("click", function() {
		directForm.mainContAmt = $("#directCancerReCalc1 option:selected").val();
		directForm.treatyContAmt = $("#directCancerReCalc2 option:selected").val();
		directForm.planType ="free";
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_cancer_simple");
	});

	$("#directViewContent2").on("click", function() { directViewDetail(); });
	$("#directGoPlan2").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc2").on("click", function() {
		directForm.freeCont = $("#directTermReCalc option:selected").val();
		directForm.planType ="free";		
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_term_simple");
	});

	$("#directViewContent3").on("click", function() { directViewDetail(); });
	$("#directGoPlan3").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc3").on("click", function() {});

	$("#directViewContent4").on("click", function() { directViewDetail(); });
	$("#directGoPlan4").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc4").on("click", function() {
		isFree = true;
		directForm.planType ="free";		
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_esaving_simple");
	});

	$("#directViewContent5").on("click", function() { directViewDetail(); });
	$("#directGoPlan5").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc5").on("click", function() {
		isFree = true;
		directForm.planType ="free";			
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_annuity_simple");
	});

	$("#directViewContent7").on("click", function() { directViewDetail(); });
	$("#directGoPlan7").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc7").on("click", function() {
		isFree = true;
		directForm.planType ="free";
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_iannuity_simple");
	});
	
	$("#directViewContent8").on("click", function() { directViewDetail(); });
	$("#directGoPlan8").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalc8").on("click", function() {
		isFree = true;
		directForm.planType ="free";
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_variablesaving_simple");
	});
	
	$("#directViewContentMedical").on("click", function() { directViewDetail(); });
	$("#directGoPlanMedical").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directReCalcMedical").on("click", function() {
		isFree = true;
		directForm.planType ="free";
		directCalc(directType);
		
		//	계산기 wiselog
		calc_logging("direct_medical_simple");
	});
	
	$("#directViewContentDental").on("click", function() { directViewDetail(); });
	//$("#directGoPlanDental").on("click", function() { goSubscribe(directType, 0, "direct"); });
	$("#directGoPlanDental").on("click", function() { fn_clickGoSubscribe(); });
	
</script>

	
		<!-- page : content /////////////////////////////////////////////////// -->
		<div id="content" class="page-guide">
			<!-- ## 페이지타이틀 ## -->
			<h1 class="hd">가입 전 가이드</h1>
			<div class="visual-top">
				<p>삼성생명 다이렉트 <strong>가입 전&middot;후 가이드</strong>로<br/>더욱 쉽게 이용하세요</p>
				<ul class="tab">
					<li class="on">
						<a href="#none"><span><em>가입 전</em> 가이드</span></a>
					</li>
					<li>
						<a href="guideAfter.html"><span><em>가입 후</em> 가이드</span></a>
					</li>
				</ul>
			</div>
			<!-- ## 컨텐츠 ////////////////////////////////////////////// -->
			<!-- CMS 영역 -->
						<div class="section list-content2">
			<!-- ## 1. 어떤 보험사를 선택해야 할까요? ## -->
				<div class="list1">
					<h2 class="tit"><a href="#none" title="상세내용열기">1. 어떤 <em>보험사</em>를 선택해야 할까요?</a></h2>
					<div class="con">
						<h3 class="tit-type1">어떤 <strong class="mark w3">보험사</strong>를 선택해야 할까요?</h3>
						<ul class="list-bold1">
							<li>
								<strong>많은 고객의 선택</strong>
								고객의 선택에는 다<br /><em>이유</em>가 있습니다.
							</li>
							<li>
								<strong>자산 규모가 큰 보험사</strong>
								믿고 맡길 수 있는<br /><em>안전한 회사</em>여야 합니다.
							</li>
							<li>
								<strong>지급이 빠른 회사</strong>
								<em>신속한 지급</em>이 아니면<br />보험은 의미가 없습니다.
							</li>
						</ul>
						<h4 class="tit-middle txt-arr">그래서 <em class="pen w199">삼성생명 다이렉트</em> 입니다.</h4>
						<ul class="list-bold2">
							<li>
								<span>1</span>
								<em class="point">생명보험사 판매 1위</em>
								2015 금융감독원<br />가입건수&amp;수입보험료 기준
							</li>
							<li class="li2">
								<span>AAA</span>
								<em class="point">12년 연속 신용등급 AAA</em>
								한국신용평가<br />2015.11 기준
							</li>
							<li class="li3">
								<span>24</span>
								<em class="point">보험금 수령까지 24시간</em>
								24시간내 82.4% 지급<br />2015.11 기준
							</li>
						</ul>
					</div>
				</div><!-- ## 2. 어떤 보험을 선택해야 할까요? ## -->
				<div class="list2">
					<h2 class="tit"><a href="#none" title="상세내용열기">2. 어떤 <em>보험</em>을 선택해야 할까요?</a></h2>
					<div class="con">
						<h3 class="tit-type1">어떤 <strong class="mark w2">보험</strong>을 선택해야 할까요?</h3>
						<div class="box-conlist">
							<h4 class="heading">
								<span class="btn-round2"><span>금융형</span></span> 확실한 재테크를 원하신다면!!
							</h4>
							<div>
								<dl class="bh4">
									<dt><a href="../iAnnuity.html" class="pen w88">연금보험</a></dt>
									<dd>국민연금만으로는 부족한<br />노후 생활비를 채워주는 <em>평생 월급</em></dd>
									<dd>
										<ul>
											<li>환급률  &amp; 연금액</li>
											<li>비과세 혜택</li>
											<li>공시이율 연복리</li>
											<li>최저금리 보증</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh5">
									<dt><a href="../annuity.html" class="pen w129">연금저축보험</a></dt>
									<dd>노후를 준비하면서 최대 52만원<br />세액공제까지, <em>13월의 보너스</em></dd>
									<dd>
										<ul>
											<li>세액공제</li>
											<li>환급률 &amp; 연금액</li>
											<li>공시이율 연복리</li>
											<li>최저금리 보증</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh6">
									<dt><a href="../esaving.html" class="pen w88">저축보험</a></dt>
									<dd>원금 100% 이상 환급! 목돈마련에<br />절세까지 가능한 <em>재태크 상품</em></dd>
									<dd>
										<ul>
											<li>100% 원금보장</li>
											<li>비과세 혜택</li>
											<li>공시이율 연복리</li>
											<li>최저금리 보증</li>
											<li>연금전환 특약</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh8">
									<dt><a href="../variableSaving.html" class="pen w129">변액적립보험</a></dt>
									<dd>초저금리 시대,<br />국내외 <em>주식/채권 투자</em>로 목돈 마련</dd>
									<dd>
										<ul>
											<li>글로벌 분산투자 (실적배당형)</li>
											<li>비과세/장기유지보너스</li>
											<li>연금 전환</li>
											<li>공시이율형 저축보험 전환</li>
										</ul>
									</dd>
								</dl>
							</div>
						</div>
						<div class="box-conlist">
							<h4 class="heading">
								<span class="btn-round2"><span>보장성</span></span> 든든한 보장을 원하신다면!!
							</h4>
							<div>
								<dl class="bh1">
									<dt><a href="../cancer.html" class="pen w69">암보험</a></dt>
									<dd>치료비는 물론 소득감소 대비<br /><em>충분한 생활비</em>까지 보장되는 상품</dd>
									<dd>
										<ul>
											<li>100세 보장</li>
											<li>다양한 보장범위</li>
											<li>충분한 보장금액</li>
											<li>저렴한 보험료</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh2">
									<dt><a href="../term.html" class="pen w88">정기보험</a></dt>
									<dd>필요한 기간만큼 보장, 갑작스런<br />사망을 대비한 <em>가족을 위한 상품</em></dd>
									<dd>
										<ul>
											<li>충분한 보장금액</li>
											<li>보장기간 선택가능</li>
											<li>저렴한 보험료</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh3">
									<dt><a href="../accident.html" class="pen w88">상해보험</a></dt>
									<dd>다양한 <em>일상생활 사고</em>에 대비<br />사고보험금에 생활자금까지 보장</dd>
									<dd>
										<ul>
											<li>충분한 보장금액</li>
											<li>다양한 보장범위</li>
											<li>연금지급 여부</li>
											<li>저렴한 보험료</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh9">
									<dt><a href="../accident.html" class="pen w199">실손의료비보장보험</a></dt>
									<dd>질병, 상해로부터  비급여와 급여 중 <br><em>본인부담금을 보장</em>하는 보험</dd>												<dd>
										<ul>
											<li>질병, 상해를 보장</li>
											<li>100세까지 든든하게</li>
											<li>원하는 특약 선택</li>
											<li>24시간내 보험금 지급</li>
										</ul>
									</dd>
								</dl>
								<dl class="bh10">
									<dt><a href="../dental.html" class="pen w88">치아보험</a></dt>
									<dd>부담되는 치과치료<br><em>합리적으로 준비하세요</em></dd>												<dd>
										<ul>
											<li>소액치과치료 보철/보존치료 보장</li>
											<li>만기 및 영구치 유지 보험금 지급</li>
											<li>이목구비 수술보장</li>
											<li>든든한 1등 삼성생명</li>
										</ul>
									</dd>
								</dl>

							</div>
						</div>
					</div>
				</div><!-- ## 4. 보험가입은 어떻게 하나요? ## -->
				<div class="list4">
					<h2 class="tit"><a href="#none" title="상세내용열기">3. <em>보험가입</em>은 어떻게 하나요?</a></h2>
					<div class="con">
						<h3 class="tit-type1"><strong class="mark">보험가입</strong>은 어떻게 하나요?</h3>
						<div class="box-content2 w930">
							<div class="line"></div>
							<div>
								<p class="txt-sub">보험가입을 위한 <em>필수 체크사항</em>을 확인해 주세요!</p>
								<ul class="simbol-list">
									<li class="sb1">공인인증서 준비</li>
									<li class="sb2">본인 계좌 확인</li>
									<li class="sb3">본인만 가입가능</li>
								</ul>
							</div>
							<div class="line"></div>
						</div>
						<p class="tit-middle"><em class="pen w159">언제 어디서나</em> 가입을 진행 하실 수 있어요!</p>
						<ul class="list-bold2">
							<li>
								<span>30</span>
								<em class="point">보험료설계내역 30일 보관</em>
								<em>자동 저장</em>된 설계내역으로<br />
								바로 가입 가능
							</li>
							<li class="li2">
								<span>ALL</span>
								<em class="point">PC&amp;모바일 가입 가능</em>
								설계내역을 저장하면<br />
								<em>PC와 모바일</em> 에서 모두 가입 가능
							</li>
							<li class="li3">
								<span>SAVE</span>
								<em class="point">이어서 가입 계속하기</em>
								가입 도중에 그만두더라도<br />
								<em>임시 저장</em>되어 계속해서 가입 가능
							</li>
						</ul>
					</div>
				</div>
			</div>

			<script type="text/javascript">
			<!--
				$plugin.togglecon($('.list-content2 > div'),{
					selector_group : true,
					selector_btn: '>.tit > a',
					selector_con: '>.con',
					txt_state : true,
					auto_scroll : true
				});
			//-->
			</script>
			<!-- ## 하단 계산기 ////////////////////////////////////////////// -->
			<form action="#none" id="formCalculator">
				<fieldset>
					<legend>보험료계산기</legend>
					<div class="calculator-form3">
						<p class="heading"><strong>5초</strong>면 되는 <strong>간편 설계</strong>로 내 보험료를 확인해 보세요.</p>
						<div class="form">
							<ul>
								<!-- 보험상품-->
								<li>
									<span class="select-box">
										<select id="product" name="product" title="상품 선택" msg="product" readonly="readonly">
											<!-- 반복 리스트 -->
											
												<option value="5_20_75">
												인터넷연금저축보험1.8(무배당)
												</option>
											
												<option value="4_20_65">
												인터넷저축보험1.8(무배당)
												</option>
											
												<option value="7_20_65">
												인터넷연금보험1.5(무배당)
												</option>
											
												<option value="8_20_65">
												인터넷변액적립보험1.1(무배당)
												</option>
											
												<option value="1_20_60">
												인터넷암보험6.0(갱신형,무배당)
												</option>
											
												<option value="2_20_49">
												인터넷정기보험4.0(무배당)
												</option>
											
												<option value="3_20_45">
												인터넷상해보험4.0(무배당)
												</option>
											
												<option value="9_20_60">
												인터넷실손의료비보장보험1.0
												</option>
											
												<option value="15_20_65">
												인터넷치아보험(재가입형,무배당)
												</option>
											
											<!-- //반복 리스트 -->
										</select>
									</span>
								</li>
								<!-- 생년월일 -->
								<li>
									<div class="form-wrap1">
										<label for="pbirthday" class="label">생년월일 (예 : 19851015 )</label>
										<input type="text" autocomplete="off" class="text placeholder numOnly" id="pbirthday" maxlength="8" title="생년월일(예 : 19851015 )"/>
									</div>
								</li>
								<!-- 성별 -->
								<li>
									<div class="label-radiobtn gender">
										<span>
											<label for="calcGender1" class="on">남자</label>
											<input type="radio" name="pgender" class="radio" id="calcGender1" value="1" title="성별(남자)"/>
										</span>
										<span>
											<label for="calcGender2">여자</label>
											<input type="radio" name="pgender" class="radio" id="calcGender2" value="2" title="성별(여자)"/>
										</span>
									</div>
								</li>
							</ul>
							<a href="#none" class="btn btn-type2 c1" id="planApply"><span>내 수령액 확인 / 가입</span></a>
						</div>
					</div>
				</fieldset>
			</form>
			<!-- ## 하단 이벤트 배너영역 ////////////////////////////////////////////// -->
		</div>

</div>
	<!-- 순서 중요 mGDN_remarketing이 가장 마지막 body /////////////////////////////////////////////////////////////////// -->	

<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 992306186;
var google_conversion_label = "6XhoCKbDpgQQisiV2QM";
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="../../www.googleadservices.com/pagead/f-2.txt">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/992306186/?value=1.00&amp;currency_code=KRW&amp;label=6XhoCKbDpgQQisiV2QM&amp;guid=ON&amp;script=0"/>
</div>
</noscript>	
			</div>
			<!-- 내용끝 -->
		
		</div>	
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->
		
	</div>
</body>
</html>