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

	<!-- ### layout : container ////////////////////////////////////////////// -->
	<div id="container">
		
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
						<a href="gde_before"><span><em>가입 전</em> 가이드</span></a>
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
<div id="wrapper">

</div>

	<!-- ### layout : container ////////////////////////////////////////////// -->
	<div id="container">		
		
		<!-- page : content /////////////////////////////////////////////////// -->
		<div id="content" class="page-guide">
			<!-- 추가 : 20180207 -->
			<div class="product-feature01">
				<div id="product_wrap">
				
					<div class="product_top">
						<p>노후준비 하고 계신가요?</p>
						<span>(2017 통계청 가계금융 복지조사)</span>
						<p>노후 준비가 잘된 사람 10명 중 단 1명
						은퇴 후 월 적정생활비 무려 276만원
						....노답 이라면?</p>
						<p>이제 삼성생명 다이렉트와 함께 노후준비의 답을 찾으세요</p>
					</div>
					
					<div class="step1">
						<p class="tit">원하시는 상품을 <strong>선택</strong>하세요</p>
			
						<!-- box -->
						<dl class="box box1 on">
							<dt class="stit"><em>추천상품 1</em><strong>13월의 보너스</strong>를 위한<br/> <strong class="ac">연금저축보험</strong></dt>
							<dd class="txt">
								<strong>노후준비<br> + <br/></strong>최대 <strong>66만원 세액공제</strong> 혜택!<br/><span>(관련 세법요건 충족시)</span>
								<span>* 최대 66만원(52만원) 세액공제(16.5%/13.2%)</span>
							</dd>
							<dd class="btn"><a href="#">상세혜택확인</a></dd>
						</dl>
						<!-- //box -->
			
						<!-- box -->
						<dl class="box box2">
							<dt class="stit"><em>추천상품 2</em><strong>안정적인 노후</strong>를 위한<br> <strong class="ac">연금보험</strong></dt>
							<dd class="txt">
								<strong>장기유지보너스 최대 3회 지급!<br>+<br>비과세혜택</strong>으로<br>더 많은 연금액!<br><span>(관련 세법요건 충족시)</span>
							</dd>
							<dd class="btn"><a href="#">Click</a></dd>
						</dl>
						<!-- //box -->
			
						<!-- box -->
						<dl class="box box3">
							<dt class="stit"><em>추천상품 3</em><strong>목돈 or 연금</strong> 골라 받는<br><strong class="ac">저축보험</strong></dt>
							<dd class="txt">
								한 달만 지나도 <strong>원금보장<br>연복리, 비과세 혜택<br><span>(사업비 차감 후 부리, 관련 세법요건 충족시)</span>+<br>노후 연금전환</strong>가능!<br>
							</dd>
							<dd class="btn"><a href="#">Click</a></dd>
						</dl>
						<!-- //box -->
					</div>
					<div class="step2_in box_1">
						<p class="tit">상품별 상세 혜택을 확인하시고 <strong>내 수령액을 계산</strong>해 보세요</p>
						
						<div class="in">
							<p class="stit">간 편 계 산 기</p>
		
							<div class="inbox">
								<div class="sel">
									<select class="select" id="prodSelBox" title="상품 선택">
										<option selected value="1">인터넷연금저축보험</option>
										<option value="2">인터넷연금보험</option>
										<option value="3">인터넷저축보험</option>
									</select>
								</div>
		
								<input type="text" id="inputBirthday" class="txt" onfocus="this.value=''" onblur="if(this.value == '') this.value='생년월일 (예:19800101)';" value="생년월일 (예:19800101)" />
		
								<div class="rawrap">
									<p class="ra1"><label><input name="radioGender" value="남자" type="radio" checked /></label></p>
									<p class="ra2"><label><input name="radioGender" value="여자" type="radio" /></label></p>
								</div>
		
								<a href="#none" id="planApply" class="btn">내 수령액 확인/가입</a>
							</div>
						</div>	
						<!-- box1 -->
						<div class="box1 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷연금저축보험</em></strong><br />미리 준비할수록 든든한 노후준비 + 연말정산 세액공제까지!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>월급을 받는 <strong>직장인</strong><br />
												및 <strong>자영업자</strong></span>
												<span>근로소득이 있는<br />
												<strong>연말정산 대상자</strong></span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												연말정산 시<br />
												매년 최대 <strong>66만원<br />
												세액공제 혜택</strong><br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt">
												<span><strong>3.0% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span>삼성생명 연금상품 중<br />
												<strong>최고 공시이율</strong></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 연금저축 연말정산 세액공제 참고사항<br />
									- 종합소득금액 4,000만원 초과(근로소득만 있는 경우에는 총급여액 5,500만원 초과)인 거주자 납입금액(연간 400만원 한도)의 13.2％(지방소득세 1.2％포함)<br />
									- 종합소득금액 4,000만원 이하(근로소득만 있는 경우에는 총급여액 5,500만원 이하)인 거주자 납입금액(연간 400만원 한도)의 16.5％(지방소득세 1.5％포함)<br />
									- 종합소득금액 1억원 초과자(근로소득만 있는 경우에는 총급여액 1억2천만원 초과자) 세액공제 한도 300만원</li>
								<li>* 연금저축보험 중도해지시 기타소득세 16.5%가 과세될 수 있습니다</li>
							</ul>
						</div>
						<!-- //box1 -->
						<!-- box2 -->
						<div class="box2 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷연금보험</em></strong><br />장기유지 보너스 + 비과세 혜택으로 더 많은 연금액 수령 가능!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>연말정산 대상자가<br />아닌 분</span>
												<span>이미 연말정산 혜택을<br />최대로 받고 있는 분</span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												이자소득세<br />
												<strong>15.4% 비과세</strong>혜택<br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt box2_icn">
												<span><strong>2.67% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span><strong>장기유지 보너스<br/>최대 3회 지급</strong><br />
												<span class="sm">(계약 이후 5년 / 10년 / 연금개시 전 최대 3번 지급)</span></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
			
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 비과세 혜택 : 5년납 이상, 10년 이상 유지시, 전 금융사 합계 월납 보험료 최대 150만원 한도</li>
								<li>* 장기유지보너스의 경우 연금 가입 11년 후 연금개시시 최대 3회 지급 됩니다.</li>	
							</ul>
						</div>
						<!-- //box2 -->
						<!-- box3 -->
						<div class="box3 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷저축보험</em></strong><br />한달만 유지해도 100% 원금보장+연금으로도 수령가능!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>높은 금리로 안전하게<br />목돈을 마련하고 싶은 분</span>
												<span>만기시 <strong>목돈</strong>이나 <strong>연금</strong>으로<br />받고 싶은 분</span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												이자소득세<br />
												<strong>15.4% 비과세</strong>혜택<br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt box2_icn">
												<span><strong>2.78% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span><strong>100% 원금보장</strong><br />
												<span class="sm">(한달 이상 유지시)</span></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
			
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 비과세 혜택 : 5년납 이상, 10년 이상 유지시, 전 금융사 합계 월납 보험료 최대 150만원 한도</li>
							</ul>
						</div>
						<!-- //box3 -->
					</div>
			
					<div class="banner">
						<p class="tit">연금저축, 연금보험, 저축보험 <strong>가입 이벤트</strong></p>
						<div class="left"><img src="../resources/cms/pc/images/guide/gda_giftevt_img.png" alt="신세계상품권 3만원 이미지"></div>
						<dl class="right">
							<dt><strong>보험 가입</strong>하면 <strong class="ac">신세계 상품권 3만원</strong> 증정</dt>
							<dd class="stxt">(저축보험은 월 보험료 10만원 이상 가입시 제공)</dd>
							<dd><p><em>이벤트 기간</em>2018.8.1 ~ 2018.8.31</p><p><em>당첨자 발표</em>10월 15일 <span>(계약유지고객대상)</span></p></dd>
						</dl>
					</div>	
					<div class="boxzone">
						<div class="tit">
							100세 시대, <strong>연금</strong>은 가입보다 <strong>타는 것</strong>이 중요하니까
							<p><span><strong>1등 회사가 만든 인터넷보험,</strong> 삼성생명 다이렉트</span>를 선택하세요!</p>
						</div>
			
						<ul>
							<li>
								생명보험사<br />
								<strong>연금가입 1위</strong><br />
								<span>(’17.6월 금감원 통계 기준)</span>
							</li>
							<li>
								국가고객만족도<br />
								<strong>13년 연속 1위</strong><br />
								<span>(한국생산성본부)</span>
							</li>
							<li>
								생명보험사<br />
								<strong>자산규모 1위</strong><br />
								<span>(17.6월 금감원 통계 기준)</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!-- 상품정보 히든 input에 설정 -->
						<input type="hidden" id="product1" value="5_20_75"/>			
						<input type="hidden" id="product3" value="4_20_65"/>
						<input type="hidden" id="product2" value="7_20_65"/>
		</div>

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