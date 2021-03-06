<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="true"%>
<!DOCTYPE html>
<html>
<head>

<script>

function moveCalc(frm)
{
	var mode = document.getElementById("product");
	var birthday = document.getElementById("birthday");
	
	/* location.href="/user/product/pro_"+mode.value+"?birthday="+birthday; */
	frm.action = "/user/product/pro_"+mode.value;
	frm.submit();
	
}

</script>
<title>Home</title>

</head>
<body>
<%@ include file="./include/header.jsp"  %>
	<div id="wrapper"> 
		<!-- 머리 -->
		<div id="container">
			<%@ include file="./include/Head.jsp" %>
			<!-- 내용시작 -->
			<div id="content" class="page-main">
			<h1 class="hd">삼성생명 다이렉트 홈</h1>
				<!-- ## 개인화 및 계산기영역 ////////////////////////////////// -->
				<div class="main-visual">
					<!-- ## 개인화영역 ## -->
					<div class="info">
						<!-- 기본형 -->
						<div class="info">
							<div class="bg-main">
								<ul>
									<li class="visual-con01">
										<a href="/user/guide/gde_annual" title="연금가입가이드 바로가기" >
											<p class="heading">
												<span>100세 시대,</span> 당신의 아름답고 행복한 노후
												<strong class="title"><span><i style="color:RoyalBlue;">ISM</i>&nbsp; 다이렉트가<br/>함께합니다</span></strong>
											</p>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="main-calculator">
				<!-- ## 보험료 계산하기 ## -->
				<form method="get" id="formCalculator" onsubmit="moveCalc(this);" name="mainform">
					<fieldset>
						<legend>보험료계산기</legend>
						<div class="calculator-main">
							<div class="heading" id="bannerMain">
								<!-- 배너있을경우 추가 -->						
							<h2><span>보험료를 간편하게 설계해보세요</span></h2>
							</div>
							<div class="form">
								<ul>
									<!-- 보험상품-->
									<li>
										<h3>상품 선택</h3>
										<span class="select-box">
											<select id="product" name="product" title="상품 선택" msg="product" readonly="readonly">
											
												<!-- 반복 리스트 -->
													<option value="annual">
													인터넷연금보험3.0(무배당)
													</option>

													<option value="term">
													인터넷정기보험4.0(무배당)
													</option>

													<option value="prop">
													인터넷실손의료비보장보험1.0
													</option>
												<!-- //반복 리스트 -->
											</select>
										</span>
									</li>
									
									<!-- 생년월일 -->
									<li>
										<h3>생년월일 입력</h3>
										<div class="form-wrap1">
											<label for="pbirthday" class="label">생년월일 (예 : 19851015 )</label>
											<input type="text" autocomplete="off" class="text placeholder numOnly" id="pbirthday" name="birthday" maxlength="8"/>
										</div>
									</li>				
									<!-- 성별 -->
									<li>
										<h3>성별 선택</h3>
										<div class="label-radiobtn gender">
											<span>
												<label for="calcGender1"> 남자</label>
												<input type="radio" name="pgender" class="radio" id="calcGender1" value="1"/>
											</span>
											<span>
												<label for="calcGender2"> 여자</label>
												<input type="radio" name="pgender" class="radio" id="calcGender2" value="2"/>
											</span>
										</div>
									</li>
								</ul>
								<a href="#" class="btn" name="planApply" id="planApply"><button type="submit"><span>확인</span></button></a>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
			<!-- CMS 영역 -->
			<!--%@ include file="/resources/cms/pc/main/product/index.jsp" %> -->
			<div class="main-product">
				<h2 class="blind">보험상품</h2>
				<!-- 상품영역 section1 : 금융 상품 알아보기-->
				<div class="section s1">
					<h3>대표상품 알아보기</h3>
					<p>ISM 다이렉트가 추천하는 연금ㆍ정기 상품을 만나보세요</p>
					<div class="info-product">
						<ul>
							<li class="ic1 column3-box">
								<a href="/user/product/pro_term" title="정기보험 바로가기">
									<div class="info-product-img"><img src="resources/cms/pc/images/main/visual_product_esaving.png" alt="저축보험 이미지"></div>
									<h4><span class="icon"><img src="resources/cms/pc/images/com/txt_hot.png" alt="hot!"></span>정기보험</h4>				
									<p>한 달만 유지해도<br/><span class="txt-c1">가장의 필수보험!</span></br>미래의 위험에 대비하는 방법!</p>
									<div class="btn btn-type1">
										<span>더 알아보기</span>
									</div>
								</a>
							</li>
							<li class="ic2 column3-box">
								<a href="/user/product/pro_prop" title="실손보험 바로가기">
									<div class="info-product-img"><img src="resources/cms/pc/images/main/visual_product_annuity.png" alt="연금저축보험 이미지"></div>
									<h4><span class="icon"><img src="resources/cms/pc/images/com/txt_best.png" alt="best!"></span>실손보험</h4>				
									<p><span class="txt-c1">입원비 및 치료비</span><br/>건강검진까지 한번에!</br></br></p>
									<div class="btn btn-type1">
										<span>더 알아보기</span>
									</div>
								</a>
							</li>
							<li class="ic3 column3-box">
								<a href="/user/product/pro_annual" title="연금보험 바로가기">
									<div class="info-product-img"><img src="resources/cms/pc/images/main/visual_product_iannuity.png" alt="연금보험 이미지"></div>
									<h4>연금보험</h4>				
									<p>장기유지보너스로<br><span class="txt-c1">연금수령액 UP!</span></br>비과세 혜택까지<span class="txt-smaller">(관련세법 충족시)</span></p>
									<div class="btn btn-type1">
										<span>더 알아보기</span>
									</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- 상품영역 section2 : 다른 상품 알아보기 -->
				<div class="section s2">
					<h3>다른 상품 알아보기</h3>
					<p>ISM 다이렉트에서 가입 가능한 다양한 상품을 만나보세요</p>
					<div class="info-product">
						<ul>
						<!-- 	<li class="ic8 column7-box">
								<a href="dentalddc4.html?org=directpage&amp;pro=dental&amp;area=button&amp;int=direct+org_directpage+dental+img_1807_button_mid_btn1+_+_+_+_" title="치아보험 바로가기">
									<h4><em>NEW</em> 치아보험</h4>				
									<p>부담되는 치과치료<br/>합리적으로 준비!</p>
								</a>
							</li> -->
							<li class="ic1 column7-box">
								<a href="./product/pro_term" title="정기보험 바로가기">
									<h4>정기보험</h4>				
									<p>가장의 필수보험</p>
								</a>
							</li>
							<li class="ic6 column7-box">
								<a href="./product/pro_annual" title="연금보험 바로가기">
									<h4>연금보험</h4>				
									<p>세액공제+투자<br/><span class="txt-smaller">(관련세법충족시)</span></p>
								</a>
							</li>
						<!-- 	<li class="ic3 column7-box">
								<a href="accident2eb5.html?org=directpage&amp;pro=accident&amp;area=button&amp;int=direct+org_directpage+accident+img_1807_button_mid_btn4+_+_+_+_" title="상해보험 바로가기">
									<h4>상해보험</h4>				
									<p>뜻밖의 사고대비</p>
								</a>
							</li> -->
							<li class="ic4 column7-box">
								<a href="./product/pro_prop" title="실손보험 바로가기">
									<h4>실손보험</h4>				
									<p>질병ㆍ상해<br/>의료비보장</p>
								</a>
							</li>
						</ul>
						<ul>
							<!-- <li class="ic5 column7-box">
								<a href="variableSaving820d.html?org=directpage&amp;pro=variableSaving&amp;area=button&amp;int=direct+org_directpage+variableSaving+img_1807_button_mid_btn6+_+_+_+_" title="변액보험 바로가기">
									<h4>변액보험</h4>				
									<p>글로벌 분산투자</p>
								</a>
							</li> -->
						<!-- 	<li class="ic6 column7-box">
								<a href="guide/pension655e.html?org=directpage&amp;pro=pension&amp;area=button&amp;int=direct+org_directpage+pension+img_1807_button_mid_btn7+_+_+_+_" title="IRP 바로가기">
									<h4>연금보험</h4>				
									<p>세액공제+투자<br/><span class="txt-smaller">(관련세법충족시)</span></p>
								</a>
							</li> -->
							<!-- <li class="ic7 column7-box">
								<a href="https://product.samsunglife.com/tm/page_00.html?org=di&amp;area=main&amp;pro=uni-terminal&amp;tloParam=DI_Uni_TM&amp;int=direct+org_di+main+img_1704_l0039_main_low_btn1+_+_+_+_" target="_blank" title="전화가입보험 새창열림">
									<h4>전화가입보험</h4>				
									<p>원하는 상품이<br/>없으신가요?</p>
								</a>
							</li> -->
						</ul>
					</div>
				</div>
			</div>
		</div>
		<!-- 내용끝 -->
		</div>	
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="./include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->
		
	</div>
	<!-- <div id="content">

				<ul class="tab-type1">
				<li><a href="/myPageHome.eds">마이페이지</a></li>
				<li class="on"><a href="#none" id="holdingContractCount">보유계약조회</a></li>
				<li><a href="/myPageContractProgress.eds">계약진행 조회<em>1<span>건</span></em></a></li>
				<li><a href="/myPageContinueSubscribe.eds" id="continueSubscribeCount">가입 계속하기<em>3<span>건</span></em></a></li>


				<a href="./guide/gde_before" target="_blank">가입전 가이드</a> <br />
				<a href="./guide/gde_after" target="_blank">가입후 가이드</a> <br />
				<a href="./guide/gde_annual" target="_blank">연금가입 가이드</a> <br />
				<a href="./member/login.do" target="_blank">로그인과 조인??</a> <br />
				<a href="./member/join" target="_blank">회원가입</a> <br />
				<a href="./member/joinCheck" target="_blank">약관동의</a>

				<li><a href="/myPageEvent.eds" id="eventCount">나의 이벤트</a></li>
				
				
				<li class="last"><a href="/myPageConsult.eds" id="consultCount">나의 상담</a></li>
				
			</ul>
	</div> -->
</body>
</html>
