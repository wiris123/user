<%@page import="com.kosmo.user.VisitCounter"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
VisitCounter visitcount = new VisitCounter();
String result = visitcount.visitcount(request);	
System.out.println(result);
%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<meta name="author" content="삼성생명, Samsung Life Insurance, 삼성생명 다이렉트"/>
<meta name="keywords" content="생명보험인터넷가입, 삼성생명인터넷가입, 인터넷보험라운지, 보험온라인가입, 인터넷보험견적, 삼성생명보험가입, 온라인다이렉트보험, 삼성보험회사, 생명보험다이렉트, 인터넷으로보험가입, 인터넷보험, 삼성라이프, 인터넷다이렉트보험, 보험인터넷가입, 인터넷보험가입, 인터넷보험상품, 삼성라운지, 보험료계산, 생명보험, 삼성생명, 건강보험, 삼성생명보험, 다이렉트보험, 보장성보험, 삼성생명다이렉트" />
<meta name="description" content="보험료는 줄이고 혜택과 장점은 그대로! 언제 어디서나 보험료 설계부터 가입까지 가능한, 인터넷 보험도 역시 삼성생명! " />
<meta property="og:image" content="<%=request.getContextPath() %>resources/cms/mobile/images/com/visual_samsung2.gif" />
<meta property="og:url" content="index-2.html" />
<meta property="og:title" content="삼성생명 다이렉트" />
<meta property="og:site_name" content="삼성생명 다이렉트" />
<meta property="og:type" content="삼성생명" />
<meta property="og:description" content="보험료는 줄이고 혜택과 장점은 그대로! 언제 어디서나 보험료 설계부터 가입까지 가능한, 인터넷 보험도 역시 삼성생명!" />
<meta http-equiv="Pragma" content="no-cache" />
<meta http-equiv="Cache-Control" content="no-cache" />
<link rel="shortcut icon" href="<%=request.getContextPath() %>../resources/web/images/com/samsunglife.ico" />

<!-- 공통 css -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/cms/pc/css/common.css" />
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/cms/pc/css/content.css" />
<!-- 공통 script -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/ui.plugin.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/ui.common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/dev.plugin.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/dev.common.js" charset="utf-8"></script>
<!-- plan script -->
<%-- <script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/plan.js" charset="utf-8"></script> --%>

<!-- 어도비 스크립트 -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/web/js/adobeDtm.js" charset="utf-8"></script>
<script type="text/javascript" id="criteoScript" src="<%=request.getContextPath() %>/resources/js/ld.js" async="true"></script>
<!-- 타불라 스크립트 -->
<script src="<%=request.getContextPath() %>/common/js/tfa.js"></script>
<!-- 타불라 스크립트 -->



<script type="text/javascript">
	// Global Navigation Bar url에 따라 Bar list class on - 17.11.17
	var urlPath = "";
	var urlPathSet1 = {
		index : "index",
		annuity : "annuity",
		iAnnuity : "iAnnuity",
		esaving : "esaving",
		variableSaving : "variableSaving",
		pension : "guide/pension",
		cancer : "cancer",
		term : "term",
		medical : "medical",
		accident : "accident"
	};
	var urlPathSet2 = {
		guideBefore : "guide/guideBefore",
		guideAnnuity : "guide/guideAnnuity",
		findInsu : "findInsu",
		guideAfter : "guide/guideAfter",
		betterLife_list : "betterLife/list",
		betterLife_view : "betterLife_view"
	};
	var urlPathSet3 = {
		event_list : "event/list",
		event_view : "event/view",
		notice_list : "customerCenter/notice/list",
		video_list : "customerCenter/video/list",
		introduce : "guide/introduce"
	};
	var urlPathSet4 = {
		faq : "customerCenter/faq/list",
		counsel : "customerCenter/counsel",
		certification : "customerCenter/certification",
		security : "customerCenter/security",
		clearCache : "customerCenter/clearCache"
	};
	var urlPathSet5 = {
		myPageLogin : "myPageLogin",
		myPageHome : "myPageHome",
		myPageHoldingContract : "myPageHoldingContract",
		myPageContinue : "myPageContinueSubscribe",
		myPageEvent : "myPageEvent",
		myPageCounsel : "myPageCounsel"
	};
	var urlPathArray = [ urlPathSet1, urlPathSet2, urlPathSet3, urlPathSet4,
			urlPathSet5 ];

	// GNB 클릭시 애니메이션 고정 플래그
	var gnbHold = 0; // 0: 클릭안한상태 애니메이션 ON, 1: 클릭한상태 애니메이션 OFF
	var tabPressed = false; // Tab누를때만 true, keyup 되면 false

	$(document).ready(function() {

		//  상단 Navigation 바 hover
		$(".gnb-area").css("height", "39px");
		$("#gnb").hover(function() {
			if (gnbHold == 0) {
				$('.gnb-area').stop().animate({
					height : "360px"
				}, 500);
				$(".list-path1 .headline").addClass("on");
				$(".list-path2 .headline").addClass("on");
				$(".list-path3 .headline").addClass("on");
				$(".list-path4 .headline").addClass("on");
			}
		}, function() {
			if (gnbHold == 0) {
				$('.gnb-area').stop().animate({
					height : "39px"
				}, 500);
				$(".list-path1 .headline").removeClass("on");
				$(".list-path2 .headline").removeClass("on");
				$(".list-path3 .headline").removeClass("on");
				$(".list-path4 .headline").removeClass("on");
			}
		});

		//Tab 누를때 True, 때면 false
		$(window).keydown(function(e) {
			if (e.keyCode == 9)
				tabPressed = true;
		});
		$(window).keyup(function(e) {
			tabPressed = false;
		});

		//gnb영역 tab으로 진입시만 열림
		$("#gnb").focusin(function(e) {
			if (tabPressed && gnbHold == 0) {
				gnbHold = 1;
				$('.gnb-area').stop().animate({
					height : "360px"
				}, 500);
				$(".list-path1 .headline").addClass("on");
				$(".list-path2 .headline").addClass("on");
				$(".list-path3 .headline").addClass("on");
				$(".list-path4 .headline").addClass("on");
			}
		});
		//gnb영역 focuseout 시 닫기
		$("#gnb").focusout(function() {
			if (gnbHold == 1) {
				gnbHold = 0;
				$('.gnb-area').stop().animate({
					height : "39px"
				}, 500);
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

	function toggleGNB() {
		if (gnbHold == 0) {
			gnbHold = 1;
			$('.gnb-area').stop().animate({
				height : "360px"
			}, 500);
			$(".list-path1 .headline").addClass("on");
			$(".list-path2 .headline").addClass("on");
			$(".list-path3 .headline").addClass("on");
			$(".list-path4 .headline").addClass("on");
		} else if (gnbHold == 1) {
			gnbHold = 0;
			$('.gnb-area').stop().animate({
				height : "39px"
			}, 500);
			$(".list-path1 .headline").removeClass("on");
			$(".list-path2 .headline").removeClass("on");
			$(".list-path3 .headline").removeClass("on");
			$(".list-path4 .headline").removeClass("on");
		}
	}
</script>

<!-- ### layout : header ///////////////////////////////////////////////// -->
<div id="header">
	<!-- 로고 -->
	<div class="logo">
		<a href="/user" target="_blank" title="새창열림(삼성생명)">ISM생명</a> <a href="/user" title="메인페이지">ISM 다이렉트</a>
	</div>
	<!-- 유틸메뉴 -->
	<ul class="nav-util">

		<li><a href="/user/guide/gde_before"><strong>왜 ISM 다이렉트인가요?</strong></a></li>
		<li><a href="http://product.samsunglife.com/product/insu/product/common/insuDictionaryPopup.do?int=hp+org_sli_direct+insuDictionary+img_direct_main_high_btn2+_+_+_+_" target="_blank" title="(새창) 삼성생명 보험용어사전">보험용어사전</a></li>
		<li><a href="http://www.samsunglife.com/disclosure/product/main/product_main.html?int=hp+org_sli_direct+disclosure_product+img_direct_main_high_btn3+_+_+_+_" target="_blank" title="(새창) 삼성생명 공시안내">공시실</a></li>
	</ul>

	<!-- GNB -->
	<ul class="nav-gnb">
		<li><a href="/user/member/joinCheck" class="gnb1"><span>회원가입</span><em id="headerRecentPlanCount"></em></a></li>
		<li><a href="#asideRecent" class="gnb1"><span>최근설계내역</span><em id="headerRecentPlanCount"></em></a></li>
		<li><a href="/user/member/login.do" class="gnb4" title="로그인하기"><span>로그인하기</span></a></li>
		<!-- <li><a href="#asideMenu" class="gnb3" title="전체메뉴"><span>전체메뉴</span></a></li> -->
	</ul>

</div>