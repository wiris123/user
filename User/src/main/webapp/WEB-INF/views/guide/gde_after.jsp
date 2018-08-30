<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금가입가이드</title>
</head>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"  %>
		<div id="container">
			<%@ include file="../include/Head.jsp" %>
			
			<!-- 내용시작 -->
			<div id="content">
			

			<div id="navSkip"><a href="#content">본문 바로가기</a></div>
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



<!-- ## POPUP : 진행중  -->
<div id="popProcessPlan2" class="pop-modal2">
	<div class="content">
		<p class="mes-progress">
			<strong>보험료를 계산 중입니다.</strong>
			잠시만 기다려 주십시오.
		</p>
	</div>
</div>




	<!-- ### layout : container ////////////////////////////////////////////// -->
	<div id="container">
		<!-- page : location ///////////////////////////////////////////////////
		<div id="navPathGnb" class="nav-path">
			<div>
				<a href="/index.eds" class="home">홈</a>
				<div id="ui-path-cate1" class="select-list">
					<a href="#none" class="headline">마이페이지</a>
					<ul class="list-option">
						<li><a href="/iAnnuity.eds">상품소개</a></li>
						<li class="selected"><a href="#none">가입 전 &middot; 후 가이드</a></li>
						<li><a href="/customerCenter/faq/list.eds">고객센터</a></li>
					</ul>
				</div>
				<div id="ui-path-cate2" class="select-list">
					<a href="#none" class="headline">가입 후 가이드</a>
					<ul class="list-option">
						<li><a href="/betterLife/list.eds">은퇴 라운지</a></li>
						<li><a href="/findInsu.eds">내게 맞는 보험찾기</a></li>
						<li><a href="/guide/guideAnnuity.eds">연금 가입 가이드</a></li>
						<li><a href="/guide/guideBefore.eds">가입 전 가이드</a></li>
						<li class="selected"><a href="#none">가입 후 가이드</a></li>
					</ul>
				</div>
			</div>
		</div> -->
				
		
		<!-- ## GNB 영역 추가 171115 ////////////////////////////////// -->
		
		<script type="text/javascript">
			
			// Global Navigation Bar url에 따라 Bar list class on - 17.11.17
			var urlPath = "";
			var urlPathSet1 = {index : "index", annuity : "annuity", iAnnuity : "iAnnuity", esaving : "esaving", variableSaving : "variableSaving", pension : "guide/pension", cancer : "cancer", term : "term", medical : "medical", accident : "accident" };
			var urlPathSet2 = {guideBefore : "guide/guideBefore", guideAnnuity : "guide/guideAnnuity", findInsu : "findInsu", guideAfter : "guide/guideAfter", betterLife_list : "betterLife/list", betterLife_view : "betterLife_view"};
			var urlPathSet3 = {event_list : "event/list", event_view : "event/view", notice_list : "customerCenter/notice/list", video_list : "customerCenter/video/list", introduce : "guide/introduce"};
			var urlPathSet4 = {faq : "customerCenter/faq/list", counsel : "customerCenter/counsel", certification : "customerCenter/certification", security : "customerCenter/security", clearCache : "customerCenter/clearCache"};
			var urlPathSet5 = {myPageLogin : "myPageLogin", myPageHome : "myPageHome", myPageHoldingContract : "myPageHoldingContract", myPageContinue : "myPageContinueSubscribe", myPageEvent : "myPageEvent", myPageCounsel : "myPageCounsel"};
			var urlPathArray = [urlPathSet1, urlPathSet2, urlPathSet3, urlPathSet4, urlPathSet5];
			
			// GNB 클릭시 애니메이션 고정 플래그
			var gnbHold = 0; // 0: 클릭안한상태 애니메이션 ON, 1: 클릭한상태 애니메이션 OFF
			var tabPressed = false; // Tab누를때만 true, keyup 되면 false
		
			$(document).ready(function(){
								
				//  상단 Navigation 바 hover
				$(".gnb-area").css("height", "39px");
				$("#gnb").hover(
					function(){
						if(gnbHold == 0){
							$('.gnb-area').stop().animate({height: "360px"},500);
							$(".list-path1 .headline").addClass("on");
							$(".list-path2 .headline").addClass("on");
							$(".list-path3 .headline").addClass("on");
							$(".list-path4 .headline").addClass("on");
						}						
					},function(){
						if(gnbHold == 0){
							$('.gnb-area').stop().animate({height: "39px"},500);
							$(".list-path1 .headline").removeClass("on");
							$(".list-path2 .headline").removeClass("on");
							$(".list-path3 .headline").removeClass("on");
							$(".list-path4 .headline").removeClass("on");
						}						
					}
				);
				
				//Tab 누를때 True, 때면 false
				$(window).keydown(function(e){
					if(e.keyCode == 9) tabPressed = true;
				});
				$(window).keyup(function(e){
					tabPressed = false;
				});
				
				//gnb영역 tab으로 진입시만 열림
				$("#gnb").focusin(function(e){
					if(tabPressed && gnbHold == 0){
						gnbHold = 1;
						$('.gnb-area').stop().animate({height: "360px"},500);
						$(".list-path1 .headline").addClass("on");
						$(".list-path2 .headline").addClass("on");
						$(".list-path3 .headline").addClass("on");
						$(".list-path4 .headline").addClass("on");
					}
				});
				//gnb영역 focuseout 시 닫기
				$("#gnb").focusout(function(){
					if(gnbHold == 1){
						gnbHold = 0;
						$('.gnb-area').stop().animate({height: "39px"}, 500);
						$(".list-path1 .headline").removeClass("on");
						$(".list-path2 .headline").removeClass("on");
						$(".list-path3 .headline").removeClass("on");
						$(".list-path4 .headline").removeClass("on");
					}
				});
				
				 
				/* // 다이렉트 url 페이지에 따라 메뉴바 클래스 적용
				urlPath = $(location).attr('pathname');
				var urlPathValue = urlPath.substring(1, urlPath.search(".eds"));
				for(var i=0; i < urlPathArray.length; i++){
					for(x in urlPathArray[i]){
						if(urlPathValue == urlPathArray[i][x]){
							$(".list-path"+(i+1)+" .headline").addClass("on");
							//return;
						}
					}
				} */
				
			});
			
			function toggleGNB(){
				if(gnbHold == 0){
					gnbHold = 1;
					$('.gnb-area').stop().animate({height: "360px"},500);
					$(".list-path1 .headline").addClass("on");
					$(".list-path2 .headline").addClass("on");
					$(".list-path3 .headline").addClass("on");
					$(".list-path4 .headline").addClass("on");
				}else if(gnbHold == 1){
					gnbHold = 0;
					$('.gnb-area').stop().animate({height: "39px"},500);
					$(".list-path1 .headline").removeClass("on");
					$(".list-path2 .headline").removeClass("on");
					$(".list-path3 .headline").removeClass("on");
					$(".list-path4 .headline").removeClass("on");
				}
			}
			
					
		</script>
		<!-- page : content /////////////////////////////////////////////////// -->
		<div id="content" class="page-guide">
			<!-- ## 페이지타이틀 ## -->
			<h1 class="hd">가입 후 가이드</h1>
			<div class="visual-top">
				<p>삼성생명 다이렉트 <strong>가입 전&middot;후 가이드</strong>로<br/>더욱 쉽게 이용하세요</p>
				<ul class="tab">
					<li>
						<a href="guideBefore.html"><span><em>가입 전</em> 가이드</span></a>
					</li>
					<li class="on">
						<a href="#none"><span><em>가입 후</em> 가이드</span></a>
					</li>
				</ul>
			</div>
			<!-- ## 컨텐츠 ////////////////////////////////////////////// -->
			<!-- CMS 영역 -->
						<div class="section list-content2">
			<!-- ## 1. 내 보험 관리는 어떻게 해야 하나요? ## -->
				<div class="list5">
					<h2 class="tit"><a href="#none" title="상세내용열기" class="ui-toggle-btn">1. 내 <em>보험 관리</em>는 어떻게 해야 하나요?</a></h2>
					<div class="con">
						<h3 class="tit-type1">내 <strong class="mark">보험 관리</strong>는 어떻게 해야 하나요?</h3>
						<div class="box-content2 w930">
							<div class="line"></div>
							<div>
								<p class="txt-sub">가입한 보험은 <em>마이페이지</em>에서 관리가 가능합니다.</p>
								<dl>
									<dt>마이페이지 주요 관리 항목</dt>
									<dd class="data1">보유 보험<br />정보조회</dd>
									<dd class="data2">보험문서<br />다운로드</dd>
									<dd class="data3">저장된 가입<br />계속하기</dd>
									<dd class="data4">가입 진행<br />현황 확인</dd>
									<dd class="data5">상담 내역<br />조회</dd>
								</dl>
							</div>
							<div class="line"></div>
						</div>
						<div class="btn-area">
							<a href="../myPageLogin.html" class="btn-type1 c4" onclick="ga('send','event','Direct','Etc','After-guide_mypage',1);"><span>마이페이지 바로가기</span></a>
						</div>
						
					</div>
				</div><!-- ## 2. 보험금 청구는 어떻게 하나요? ## -->
				<div class="list6">
					<h2 class="tit"><a href="#none" title="상세내용열기" class="ui-toggle-btn">2. <em>보험금 청구</em>는 어떻게 해야 하나요?</a></h2>
					<div class="con">
						<h3 class="tit-type1"><strong class="mark w3">보험금</strong> 청구는 어떻게 해야 하나요?</h3>
						<p class="txt-sub">보험금 청구 및 접수는 <em>5가지 방법</em>으로 가능합니다.</p>
						<div class="box-content2 group">
							<div class="line"></div>
							<div>
								<ul>
									<li>
										<div class="heading">
											<span><em>인터넷</em> 접수</span>
										</div>
										<div class="con txt">
											<ul class="txt-type1">
												<li>
													<span class="lable">접수방법 : </span>
													삼성생명 홈페이지 <em>「보험금 청구」</em> 메뉴에서 접수
												</li>
												<li>
													<span class="lable">이용시간 : </span>
													365일 24시간 이용
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div class="heading">
											<span><em>모바일</em> 접수</span>
										</div>
										<div class="con txt">
											<ul class="txt-type1">
												<li>
													<span class="lable">접수방법 : </span>
													「삼성생명 모바일창구」 어플리케이션 간편서비스 內 <em>사고보험금 청구</em> 메뉴
												</li>
												<li>
													<span class="lable">이용시간 : </span>
													365일 24시간 이용
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div class="heading">
											<span><em>우편</em> 접수</span>
										</div>
										<div class="con txt">
											<ul class="txt-type1">
												<li>
													<span class="lable">접수방법 : </span>
													수익자 <em>신분증</em> 앞면사본 / <em>구비서류</em> 등기우편 발송
												</li>
												<li>
													<span class="lable">이용시간 : </span>
													서울중앙우체국 사서함 375호 삼성생명 사고보험금 접수담당 (우편번호 없음)
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div class="heading">
											<span><em>고객플라자</em> 내방</span>
										</div>
										<div class="con txt">
											<ul class="txt-type1">
												<li>
													<span class="lable">접수방법 : </span>
													<em>신분증, 구비서류</em> 지참 후 내방
												</li>
												<li>
													<span class="lable">이용시간 : </span>
													09:00 ~ 15:30
												</li>
											</ul>
										</div>
									</li>
									<li class="last">
										<div class="heading">
											<span><em>팩스</em> 접수</span>
										</div>
										<div class="con txt">
											<ul class="txt-type1">
												<li>
													<span class="lable">접수방법 : </span>
													수익자 <em>신분증</em> 앞면사본 / <em>구비서류</em> 팩스 송부
												</li>
												<li>
													<span class="lable">팩스번호 문의 : </span>
													사고보험금 상담 전용(1577-4118)
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
							<div class="line"></div>
						</div>
						<p class="txt-type2">보다 자세한 내용은 <em>삼성생명 홈페이지</em>에서 확인할 수 있습니다.</p>
						<div class="btn-area">
							<a href="https://pcyber.samsunglife.com/pcyber/comn/link.do?view=easySrvc/accident/guide/receiptGuide" class="btn-type1 c4" title="새창" target="_blnak" onclick="ga('send','event','Direct','Etc','After-guide_homepage',1);"><span>삼성생명 홈페이지 청구방법 바로가기</span></a>
						</div>
					</div>
				</div><!-- ## 3. 금융거래회원이 되면 어떤 서비스를 이용할 수 있나요? ## -->
				<div class="list7">
					<h2 class="tit"><a href="#none" title="상세내용열기" class="ui-toggle-btn">3. <em>금융거래회원</em>이 되면 어떤 <em>서비스</em>를 이용할 수 있나요?</a></h2>
					<div class="con">
						<h3 class="tit-type1">금융거래회원이 되면 어떤 <strong class="mark w3">서비스</strong>를 이용할 수 있나요?</h3>
						<div class="box-content2 w930">
							<div class="line"></div>
							<div>
								<p class="txt-sub"><em>금융거래회원</em>이란?</p>
								<ul class="txt-type1">
									<li>보험, 대출, 퇴직연금 등 삼성생명 계약 고객님을 의미합니다.</li>
									<li>홈페이지 금융거래 서비스는 <em>보안카드 / OTP 등록회원 / 공인인증서 등록</em> 회원에 따라 이용이 가능합니다.</li>
								</ul>
							</div>
							<div class="line"></div>
						</div>
						<h3 class="tit-middle">어떤 <em class="pen w177">금융거래 서비스</em>를 이용할 수 있나요?</h3>
						<ul class="simbol-list unit4">
							<li class="sb1"><em>조회</em>서비스</li>
							<li class="sb2"><em>출금</em>서비스</li>
							<li class="sb3"><em>입금(상환)</em>서비스</li>
							<li class="sb4"><em>변경</em>서비스</li>
						</ul>
						<div class="btn-area">
							<a href="#popServiceGuide" class="btn-type1 c2"><span>이용가능 서비스 안내</span></a>
							<a href="http://www.samsunglife.com/guide/insu/time/mysslife/mysslifeSrvc.html"  class="btn-type1 c4" title="새창" target="_blnak"><span>금융서비스 이용가이드</span></a>
						</div>
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
	<form id="mainFrm" name="frm">
		<input type="hidden" name="proType" id="proType" />			<!-- 상품 타입 -->
		<input type="hidden" name="staAge" id="staAge" />			<!-- 가입나이 시작 -->
		<input type="hidden" name="endAge" id="endAge" />			<!-- 가입나이 끝 -->

		<input type="hidden" name="prcdId" id="prcdId" value=""/>	<!-- 상품코드 -->
		<input type="hidden" name="prcd" id="prcd" value=""/>		<!-- 상품코드 -->
		<input type="hidden" name="insCd" id="insCd" value=""/>		<!-- 상품코드 -->
		<input type="hidden" name="repCd" id="repCd" value=""/>		<!-- 상품코드 -->

		<input type="hidden" name="contBirth" id="contBirth"/>		<!-- 생년월일 -->
		<input type="hidden" name="contGender" id="contGender"/>	<!-- 성별 -->
		<input type=hidden name="insuPeriod" id="insuPeriod"/>		<!-- 보험기간 -->
		<input type="hidden" name="payPeriod" id="payPeriod"/>		<!-- 납입기간 -->
		<input type="hidden" name="annuityAge" id="annuityAge"/>	<!-- 연금개시나이 -->
		<input type="hidden" name="premium" id="premium"/>			<!-- 납입금액 -->
	</form>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/992306186/?value=1.00&amp;currency_code=KRW&amp;label=6XhoCKbDpgQQisiV2QM&amp;guid=ON&amp;script=0"/>
</div>


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
</html>