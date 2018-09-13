<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>실손 보험</title>
</head>
<link rel="stylesheet"
	href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>

</head>
<body>
	<div id="wrapper">
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<script>
				$(function() {
					$('#uiProductResult1').hide();

				});

				function premCal() {
					$.ajax({
						url : "../product/propPrem.do",
						type : "get",
						data : {
							hosp : $('#hosp').val(),
							gohosp : $('#gohosp').val(),
							sanghosp : $('#sanghosp').val(),
							sgohosp : $('#sgohosp').val(),
							chbedosu : $('#treaty1-1:checked').val(),
							chbeinje : $('#treaty1-2:checked').val(),
							chbemri : $('#treaty1-3:checked').val()
						},
						dataType : "json",
						contentType : "text/html; charset:utf-8",//post타입의 content타입 : application/x-www-form-urlencoded;charset=utf-8
						success : function(responseData) {
							$('#result').text(responseData.result);
							$('#premium').val(responseData.prem);
							$('#payment').val(responseData.result2);
							$('#uiProductResult1').show();

						},
						error : function(errorData) {

						}

					});

				}
			</script>
			<!-- 내용시작 -->
			<!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
			<div class="product-basic page-change">
				<!-- # 상품기본정보 # -->
				<!-- CMS 영역 -->
				<div class="info">
					<h1>
						<span>ISM 다이렉트</span><strong>인터넷 실손보장보험</strong><em>1.0
							(기본형/갱신형/무배당)</em>
					</h1>
					<p class="com1">
						<strong>입원</strong>과 <strong>통원</strong>,<br /> <strong>질병</strong>과
						<strong>상해</strong>에 대비!
					</p>
					<p class="com2">
						<span>이제 인터넷으로 간편하게<br />실손의료비보장보험을 만나보세요!
						</span>
					</p>
				</div>
				<script>
					function atag() {
						//생년월일 유효성 검사
						if (birth.value.length <= 7) {
							alert("생년월일을 8개의 숫자로 작성해주세요.");
						}
						//성별 유효성 검사
						else if (!($("#male").hasClass("on") || $("#female")
								.hasClass("on"))) {
							alert("성별을 선택해주세요.")
						} else {
							premCal();
						}
						return false;
					};

					$(
							function() {

						$("#formCalculator")
						.find('input[name=mdcrRcbfrYn]')
						.on(
						"click",
						function() {
							if ($(this).prop('checked')) {
								mdcrRcbfrYn.value = 'Y';
								alert("의료수급권자인경우,\n보험료 할인을 위해 증명할 수 있는 서류(의료급여증 사본 또는\n의료급여증명서 등)를 제출해 주셔야 합니다.\n\n청약심사 중 담당자를 통해 전화를 드리고 다시한번 안내드리오니\n이점 양해해 주시기 바랍니다.");
							} else {
							mdcrRcbfrYn.value = 'N';
						}
						});
					})
				</script>
				<!-- # 보험료 계산하기 # -->
				<form action="#" id="formCalculator">
					<fieldset>
						<legend>보험료계산기</legend>
						<div class="calculator-form">
							<div class="heading">
								<h2>
									<strong>간편</strong>계산기
								</h2>
								<p class="txt">나의 보험료를 계산해 보세요.</p>
								<!-- <p class="banner"><img src="../../images/tmp/@banner_calculator.png" alt="@관리자등록배너텍스트"/></p> -->
							</div>
							<div class="form">
								<ul>
									<!-- 생년월일 -->
									<li>
										<div class="form-wrap1">
											<label for="birthday" class="label">생년월일 <span>(예
													: 19851015 )</span></label> <input type="text" autocomplete="off"
												class="text placeholder numOnly" maxlength="8" id="birth" value="${param.birthday }"
												name="birth" />
										</div>
									</li>
									<!-- 성별 -->
									<li>
										<div class="label-radiobtn gender">
											<span> <label for="calcGender1" id="male">남자</label> <input
												type="radio" name="pgender" class="radio" id="calcGender1"
												value="1" />
											</span> <span> <label for="calcGender2" id="female">여자</label>
												<input type="radio" name="pgender" class="radio"
												id="calcGender2" value="2" />
											</span>
										</div>
									</li>

									<!-- 보험기간 -->
									<li><span class="select-box" style="display: none;">
											<select id="insTerm" title="보험기간">
												<option value="">보험기간 선택</option>
										</select>
									</span></li>
									<li><span class="label-check"> <label
											for="mdcrRcbfrYn">의료수급권자 여부</label> <input type="checkbox"
											class="check" id="mdcrRcbfrYn" name="mdcrRcbfrYn" value="Y"
											title="의료수급권자선택" />
									</span>
										<div class="tooltip-area ui-tip-move">
											<a href="#tipMedical9-3" class="icon-tip side">안내문구보기</a>
											<div class="tooltip right" id="tipMedical9-3">
												<dl>
													<dt>* 의료수급권자</dt>
													<dd>
														생활이 어려운 저소득자 대상으로 국가가<br /> 의료비를 보장해 주는 의료급여제도의 대상자
													</dd>
												</dl>
											</div>
										</div></li>
								</ul>
								<input type="hidden" id="napTerm" name="napTerm" value="1" /> <a
									href="#none" class="btn" id="calcPremium" onclick="atag();"><span>내
										보험료 확인 / 가입</span></a>
							</div>
						</div>
					</fieldset>
				</form>
			</div>

			<div class="product-result" id="uiProductResult1" tabindex="0">
				<!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
				<div class="result-area">
					<h3 style="top: -21px;">보험료 계산결과</h3>
					<!-- 계산결과 : .list-result.thum  -->
					<div class="list-result thum ui-list-mode">
						<div class="data-case1">
							<!-- 결과 ///////////////////////////////////////////////////////////// -->
							<div class="box box-result1 on">
								<form action="../product/prop_cal" method="post" name="prop_cal">
									<input type="hidden" id="premium" name="premium" />
									<%-- premium --%>
									<input type="hidden" name="mode" value="prop" />
									<%-- mode --%>
									<input type="hid den" name="payment" id="payment" />
									<h4 class="heading">
										<span id="prdtgb"></span> <strong><span>월납</span><span
											id="result">0,000</span>원</strong> <a href="#popProductCart"
											class="btn-save" id="savePlan1"
											onclick="ga('send','event','Direct','Etc','Check-info_medical-top_list_1',1);"
											rel="history">설계저장</a>
										<!-- <span
										id="monthlyPremium1"
										data-gtm-vis-recent-on-screen-8355294_25="29377"
										data-gtm-vis-first-on-screen-8355294_25="29377"
										data-gtm-vis-total-visible-time-8355294_25="100"
										data-gtm-vis-has-fired-8355294_25="1"> -->
									</h4>
									<div class="con">
										<span class="sub-tit">주보험</span>
										<ul>
											<li data-role="ui-guarantee-disease">
												<div class="label">
													<span>질병입원보장</span>
												</div>
												<div class="data">
													<strong>5,000만원 한도</strong>
												</div>
												<div class="select">
													<div class="tooltip-area">
														<a href="#tipMedicalTip1" class="icon-tip " rel="history">안내문구보기</a>
														<div class="tooltip right" id="tipMedicalTip1">
															<dl>
																<dt>* 표준형</dt>
																<dd>급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
																<br>
																<dt>* 선택형Ⅱ</dt>
																<dd>급여 중 본인부담금의 90%, 비급여의 80%</dd>
															</dl>
														</div>
													</div>
													<!-- 상품개정 ui 수정 by syi-->
													<span class="select-box"> <select id="hosp"
														name="hosp" title="상품 선택" onchange="setProType(this);">
															<option value="3">표준형</option>
															<option value="5">선택형Ⅱ</option>
															<option value="0">선택안함</option>
													</select>
													</span>
												</div>
											</li>
											<li data-role="ui-guarantee-disease">
												<div class="label">
													<span>질병통원보장</span>
												</div>
												<div class="data">
													<strong>외래 20만원/처방10만원</strong>
												</div>
												<div class="select">
													<div class="tooltip-area">
														<a href="#tipMedicalTip2" class="icon-tip " rel="history">안내문구보기</a>
														<div class="tooltip right" id="tipMedicalTip2">
															<dl>
																<dt>* 표준형</dt>
																<dd>급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
																<br>
																<dt>* 선택형Ⅱ</dt>
																<dd>급여 중 본인부담금의 90%, 비급여의 80%</dd>
															</dl>
														</div>
													</div>
													<!-- 상품개정 ui 수정 by syi-->
													<span class="select-box"> <select id="gohosp"
														name="gohosp" title="상품 선택" onchange="setProType(this);">
															<option value="2">표준형</option>
															<option value="4">선택형Ⅱ</option>
															<option value="0">선택안함</option>
													</select>
													</span>
												</div>
											</li>
											<li data-role="ui-guarantee-accident">
												<div class="label">
													<span>상해입원보장</span>
												</div>
												<div class="data">
													<strong>5,000만원 한도</strong>
												</div>
												<div class="select">
													<div class="tooltip-area">
														<a href="#tipMedicalTip3" class="icon-tip " rel="history">안내문구보기</a>
														<div class="tooltip right" id="tipMedicalTip3">
															<dl>
																<dt>* 표준형</dt>
																<dd>급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
																<br>
																<dt>* 선택형Ⅱ</dt>
																<dd>급여 중 본인부담금의 90%, 비급여의 80%</dd>
															</dl>
														</div>
													</div>
													<!-- 상품개정 ui 수정 by syi-->
													<span class="select-box"> <select id="sanghosp"
														name="sanghosp" title="상품 선택" onchange="setProType(this);">
															<option value="5">표준형</option>
															<option value="7">선택형Ⅱ</option>
															<option value="0">선택안함</option>
													</select>
													</span>
												</div>
											</li>
											<li data-role="ui-guarantee-accident">
												<div class="label">
													<span>상해통원보장</span>
												</div>
												<div class="data">
													<strong>외래 20만원/처방10만원</strong>
												</div>
												<div class="select">
													<div class="tooltip-area">
														<a href="#tipMedicalTip4" class="icon-tip " rel="history">안내문구보기</a>
														<div class="tooltip right">
															<dl>
																<dt>* 표준형</dt>
																<dd>급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
																<br>
																<dt>* 선택형Ⅱ</dt>
																<dd>급여 중 본인부담금의 90%, 비급여의 80%</dd>
															</dl>
														</div>
													</div>
													<!-- 상품개정 ui 수정 by syi-->
													<span class="select-box"> <select id="sgohosp"
														name="sgohosp" title="상품 선택" onchange="setProType(this);">
															<option value="1">표준형</option>
															<option value="2">선택형Ⅱ</option>
															<option value="0">선택안함</option>
													</select>
													</span>
												</div>

											</li>
										</ul>
									</div>
							</div>
							<!-- 특약 재계산 ////////////////////////////////////////////////////////////// -->
							<div class="box box-result2 on">
								<h4 class="heading">
									<strong>※ 원하는 특약을 <em class="txt-c1">선택</em>하세요.
									</strong>
								</h4>
								<div class="con">
									<p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
									<div class="tooltip-area">
										<span class="sub-tit">선택특약</span> <a href="#none"
											class="icon-tip" style="margin: 10px 0 -8px 6px;"
											rel="history">안내문구보기</a>
										<div class="tooltip">
											<dl>
												<dt>* 도수치료</dt>
												<dd>
													손을 이용하여 환자의 근골격 기능 개선,<br> 통증 완화를 위해 시전하는 치료
												</dd>
												<br>
												<dt>* 체외충격파치료</dt>
												<dd>
													체외에 충격파를 가해 혈관의 재형성,<br> 힘줄 및 뼈의 치유를 자극하는 치료방법
												</dd>
												<br>
												<dt>* 증식치료</dt>
												<dd>
													통증의 소실 및 완화를 목적으로<br> 증식물질을 주사하는 치료
												</dd>
												<br>
												<dt>* 주사료</dt>
												<dd>
													주사치료 중 본인이 실제로 부담하는<br> 비급여 주사료를 공제한 금액 내에서 보상
												</dd>
												<br>
												<dt>* 자기공명영상진단</dt>
												<dd>
													자기공명영상 장치인 MRI/MRA를<br> 활용하여 환자의 상태를 진단
												</dd>
											</dl>
										</div>
									</div>
									<ul>
										<li><span>비급여 도수치료ㆍ체외충격파치료ㆍ증식치료</span> <span
											class="label-check"> <label for="treaty1-1" class="on">선택</label>
												<input type="checkbox" class="check" title="특약리스트"
												onclick="premCal();" value="3" id="treaty1-1"
												name="chbedosu" checked="checked">
										</span></li>
										<li><span>비급여 주사료</span> <span class="label-check">
												<label for="treaty1-2" class="on">선택</label> <input
												type="checkbox" class="check" title="특약리스트" id="treaty1-2"
												name="chbeinje" value="1" onclick="premCal();"
												checked="checked">
										</span></li>
										<li><span>비급여 자기공명영상진단(MRI/MRA)</span> <span
											class="label-check"> <label for="treaty1-3" class="on">선택</label>
												<input type="checkbox" class="check" value="2" title="특약리스트"
												onclick="premCal();" id="treaty1-3" name="chbemri"
												checked="checked">
										</span></li>
									</ul>
									<div class="btn">
										<button type="submit" id="goPlan2">
											<a href="#" class="btn-c1 adb-dist2"><span>가입하기</span></a>
										</button>
										<a href="#none" class="btn-c2 adb-dist2" id="reCalcPremium"
											onclick="premCal();"><span>재계산하기</span></a>
									</div>
								</div>
								</form>
							</div>
						</div>
					</div>

					<!-- //계산결과 -->
					<!-- 팝업링크 -->
					<div class="view-pop">
						<a href="#popProResult" class="link-type1"
							onclick="clickDetailTab(1);" rel="history"><span>보장내용보기</span></a>
						<a href="#popProResult" class="link-type1"
							onclick="clickDetailTab(2);" rel="history"><span>해지환급금</span></a>
					</div>
					<!-- //팝업링크 -->
					<!-- //이벤트 문구 삽입
            <div class="result-sms-event mes-type2">
               <p class="sub"><span class="on-icon"></span><em class="txt-c1">클릭! </em>가입 1건당 연탄 <em class="txt-c1">10장 기부!</em></p>
            </div> -->
					<!-- 유틸버튼 -->
					<div class="area-util">
						<!-- <a href="#none" class="icon-util print" title="인쇄하기" id="doPrint">인쇄하기</a> -->
						<!-- <a href="#none" class="icon-util print" title="인쇄하기"
							id="doPrintNew" onclick="fn_printEntire();" rel="history">인쇄하기</a>
						<a href="#popSendEmail" class="icon-util email" title="이메일보내기"
							onclick="clearMail(&quot;인터넷실손의료비보장보험1.0&quot;);" rel="history">이메일보내기</a> -->
						<!-- <a href="#none" class="icon-util email" title="이메일보내기" id="sendEmail">이메일보내기</a> -->
						<!-- <a href="#none" class="icon-util sms" title="SMS보내기" id="sendSms">SMS보내기</a> -->
					</div>
					<!-- //유틸버튼 -->
				</div>
			</div>
			<!-- # 다른고객님의 선택 //////////////////////////////////////////////////////////////////////////// -->
			<div class="product-other none">
				<h3 class="heading2">
					<a href="#none" class="btnarea-curve" id="btnToggleAreaCurve"
						rel="history"><span class="btn-curve"></span><span
						class="txt-area">다른 고객님의 가입정보로<em>맞춤설계</em>를 해보세요
					</span></a>
				</h3>
				<div>
					<p class="mes-type1">
						<span class="block">다른 고객님은 <strong>보장금액</strong>을 어떻게
							설계했을까요? <em>('15년 통계 기준)</em></span>
					</p>
					<!-- .graph-data1 -->
					<div class="graph-data1">
						<dl>
							<dt>일반암</dt>
							<dd class="case1">
								<span>3천만원</span><em>66.4%</em> <img class="img-graph"
									src="../resources/web/images/product/pro1_other1.gif" alt="">
							</dd>
							<dd class="case2">
								<span>2천만원</span><em>33.5%</em>
							</dd>
						</dl>
						<dl>
							<dt>암사망</dt>
							<dd class="case1">
								<span>2천만원</span><em>27.0%</em> <img class="img-graph"
									src="../resources/web/images/product/pro1_other2.gif" alt="">
							</dd>
							<dd class="case2">
								<span>6천만원</span><em>25.4%</em>
							</dd>
						</dl>
						<dl class="data type1">
							<dt>주요 암 치료비</dt>
							<dd>
								<span class="tit">간암 :</span> <em>6,662만원</em>
							</dd>
							<dd>
								<span class="tit">대장암 :</span> <em>2,352만원</em>
							</dd>
							<dd>
								<span class="tit">폐암 :</span> <em>4,657만원</em>
							</dd>
							<dd>
								<span class="tit">유방암 :</span> <em>1,768만원</em>
							</dd>
							<dd class="info">
								<em>2013 국립암센터</em>
							</dd>
						</dl>
					</div>
				</div>
			</div>
			<div class="product-skip">
					<a href="#formCalculator">보험료계산 영역으로 이동<span></span></a>
				</div>

 <div id="navPathGnb" class="nav-path gnb-scroll">
				<div>
					<a href="/index.eds" class="home" rel="history">홈</a>
					<div id="ui-path-cate1" class="select-list" style="min-width: 220px;">
						<a href="#none" class="headline" rel="history">상품소개</a>
						<ul class="list-option hd" style="min-width: 218px;">
							<li class="selected"><a href="#none" rel="history">상품소개</a></li>
							<li><a href="/guide/guideBefore.eds" rel="history">가입 전 · 후 가이드</a></li>
							<li><a href="/customerCenter/faq/list.eds" rel="history">고객센터</a></li>
						</ul>
					</div>
					<div id="ui-path-cate2" class="select-list" style="min-width: 220px;">
						<a href="#none" class="headline" rel="history"><span>ISM생명 인터넷</span>연금저축보험<span>1.8</span><span>(무배당)</span></a>
						<ul class="list-option hd" style="min-width: 218px;">
							<li><a href="/iAnnuity.eds" rel="history"><span>ISM생명 인터넷</span>연금보험<span>1.5</span><span>(무배당)</span></a></li>
							<li class="selected"><a href="#none" rel="history"><span>ISM생명 인터넷</span>연금저축보험<span>1.8</span><span>(무배당)</span></a></li>
							<li><a href="/esaving.eds" rel="history"><span>ISM생명 인터넷</span>저축보험<span>1.8</span><span>(무배당)</span></a></li>
							<li><a href="/variableSaving.eds" rel="history"><span>ISM생명 인터넷</span>변액적립보험<span>1.1</span><span>(무배당)</span></a></li>
							<li><a href="/cancer.eds" rel="history"><span>ISM생명 인터넷</span>암보험<span>6.0</span><span>(갱신형/무배당)</span></a></li>
							<li><a href="/term.eds" rel="history"><span>ISM생명 인터넷</span>정기보험<span>4.0</span><span>(무배당)</span></a></li>
							<li><a href="/accident.eds" rel="history"><span>ISM생명 인터넷</span>상해보험<span>4.0</span><span>(무배당)</span></a></li>
							<li><a href="/medical.eds" rel="history"><span>ISM생명 인터넷</span>실손의료비보장보험<span>(기본형,갱신형,무배당)</span></a></li>
							<li><a href="/dental.eds" rel="history"><span>ISM생명 인터넷</span>치아보험<span>(재가입형,무배당)</span></a></li>
							<li><a href="/guide/pension.eds" rel="history"><span>ISM생명 </span>퇴직연금 IRP</a></li>
						</ul>
					</div>
				</div>
			</div>				

				<!-- # 상품기본탭 /////////////////////////////////////////////////////////////////////////////////////// -->
				<div class="product-tab" id="uiNavFloat" >
					<ul>
						<li><a href="#uiTabProduct1" onclick="n_logging('medical','medical-tab1','','');ga('send','event','Direct','Etc','medical_sub-menu_1',1);"><span>실손보험 필요성</span></a></li>
						<li class="on"><a href="#uiTabProduct2" id="tabProduct2" onclick="n_logging('medical','medical-tab2','','');ga('send','event','Direct','Etc','medical_sub-menu_2',1);"><span>상품강점</span></a></li>
						<li><a href="#uiTabProduct3" onclick="n_logging('medical','medical-tab3','','');ga('send','event','Direct','Etc','medical_sub-menu_3',1);"><span>상품세부정보</span></a></li>
						<li><a href="#uiTabProduct4" onclick="faqTabUi(); n_logging('medical','medical-tab4','','');ga('send','event','Direct','Etc','medical_sub-menu_4',1);"><span>자주하는 질문</span></a></li>
					</ul>
				</div>

				<!-- ## 상품 상세정보 /////////////////////////////////////////////////////////////////////////// -->
				<div class="product-detail">
					<!-- ## 탭1 : 실손보험 필요성 ## -->
					<!-- CMS 영역 -->
					<div id="uiTabProduct1" class="product-con detail-tab1">
						
<h2 class="hd">실손보험 필요성</h2>
<div class="menu-skip three">
	<ul>
		<li class="pm1"><a href="#uiTab1-1"><span>환자당 의료비는<br /><em>해마다 증가추세</em></span></a></li>
		<li class="pm2"><a href="#uiTab1-2"><span>비급여<br /><em>의료비 보장</em></span></a></li>
		<li class="pm3"><a href="#uiTab1-3"><span><em>합리적 금액으로</em><br />의료비를 준비</span></a></li>
	</ul>
</div>
<div class="section">
	<!-- # 탭1-1 : 환자당 의료비는 해마다 증가추세-->
	<div id="uiTab1-1" class="con-type1">
		<h3><span class="txt-count">첫번째</span>환자당 의료비는<br/>해마다 <em class="pen2 w124">증가추세</em></h3>
		<p>매년 환자당 진료비가 증가추세로, 이에 대한 <em>대비가 필요</em>합니다.</p>
		<div class="visual">
			<div class="con">
				<h4>건강보험 진료비 증가률</h4>
				<table summary="2015년 건강보험 진료비 지출경향, 건강보험심사평가원">
					<caption>2015년 건강보험 진료비 증가률</caption>
					<thead>
						<tr>
							<th scope="col">2010년</th>
							<th scope="col">2011년</th>
							<th scope="col">2012년</th>
							<th scope="col">2013년</th>
							<th scope="col">2014년</th>
							<th scope="col">2015년</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>95만원</td>
							<td>99만원</td>
							<td>103만원</td>
							<td>104만원</td>
							<td>114만원</td>
							<td>121만원</td>
						</tr>
					</tbody>
				</table>
				<p>출처 : 2015 건강보험심사평가원</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro9_con1_1.gif" alt=""/></div>
			<p class="con txt-type4"><span>2015년 건강보험 진료비 지출경향, 건강보험심사평가원</span></p>
		</div>
	</div>
	<!-- # 탭1-2 : 비급여 의료비 보장 -->
	<div id="uiTab1-2" class="con-type1">
		<h3><span class="txt-count">두번째</span>비급여<br /><em class="pen2 w188 pen-m10">의료비 보장</em></h3>
		<p>전체 의료비 중 본인부담금과 건강보험이 보장하지 않는<br/><em>비급여 항목을 보장</em>해 드립니다.</p>
		<div class="visual">
			<div class="con">
				<table summary="가입 여부에 따른 의료비 지출 예시">
				<caption>가입 여부에 따른 의료비 보장 여부</caption>
				<tbody>
					<tr>
						<th scope="row" colspan="2">급여항목</th>
						<th scope="row" colspan="2">비급여항목</th>
					</tr>
					<tr>
						<th scope="row" colspan="2">실손 미가입자(의료보험가입)</th>
						<th scope="row" colspan="2">실손 가입자(의료보험가입)</th>
					</tr>
					<tr>

						<td scope="row">의료보험</td>
						<td scope="row" rowspan="2">본인부담금 : 보장 없음</td>
						<td scope="row">의료보험</td>
						<td scope="row" rowspan="2">본인부담금 : 보장</td>
					</tr>
					<tr>
						<td scope="row">본인부담금 : 보장 없음</td>
						<td scope="row">본인부담금 : 보장</td>
					</tr>
				</tbody>
			</table>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro9_con1_2.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-3 : 합리적 금액으로 의료비를 준비-->
	<div id="uiTab1-3" class="con-type1">
		<h3><span class="txt-count">세번째</span><em class="pen2 w188 pen-m5">합리적 금액</em>으로 의료비를 준비</h3>
		<p><em>합리적인 보험료</em>로 실제 손해에 대비한 합리적 보험입니다.</p>
		<div class="visual">
			<div class="con">
			<h4>1일 교통사고 발생률</h4>
				<table summary="연령별(20,30,40,50세이상), 성별 온라인 보험료 예시">
					<caption>온라인 보험료 예시</caption>
					<tbody>
						<tr>
							<th>성별</th>
							<th>20세</th>
							<th>30세</th>
							<th>40세</th>
							<th>50세</th>
						</tr>
						<tr>
							<th>남자</th>
							<td>8,300원</td>
							<td>11,100원</td>
							<td>14,380원</td>
							<td>20,860원</td>
						</tr>
						<tr>
							<th>여자</th>
							<td>6,970원</td>
							<td>12,840원</td>
							<td>17,290원</td>
							<td>30,760원</td>
						</tr>
					</tbody>
				</table>
				<p>종합형, 선택형Ⅱ, 선택특약3종 모두 가입, 비위험, 최초가입 기준</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro9_con1_3.gif" alt=""/></div>
		</div>
	</div>
	<a href="#none" class="btn-link" onclick="$('#tabProduct2').click();"><span>그렇다면, <em>삼성생명 인터넷 실손의료비보장보험</em>은 어떻게 다를까요?</span></a>
</div>
</div>

					<!-- ## 탭2 : 상품강점 ////////////////////////////////////////////////////////////////  -->
					<!-- CMS 영역 -->
					<div id="uiTabProduct2" class="product-con detail-tab2 on">
	<h2 class="hd">상품강점</h2>
	<div class="menu-skip">
		<ul>
			<li class="pm1"><a href="#uiTab2-1"><span><em>질병, 상해를</em><br />보장하는 보험</span></a></li>
			<li class="pm2"><a href="#uiTab2-2"><span><em>필요한 특약만<br /></em>선택 가능</span></a></li>
			<li class="pm3"><a href="#uiTab2-3"><span>갱신을 통해<br /><em>100세까지 든든하게</em></span></a></li>
			<li class="pm4"><a href="#uiTab2-4"><span><em>든든한</em><br />1등 삼성생명</span></a></li>
		</ul>
	</div>
	<div class="section">
		<!-- # 탭2-1 : 질병, 상해를 보장! -->
		<div id="uiTab2-1" class="con-type1">
			<h3><span class="txt-count">첫번째</span>질병, 상해를<br /><em class="pen2 w85 pen-m5">보장</em>하는 보험!</h3>
			<p>질병, 상해로 인한 손해를 보장하는 <em>필수 보험</em>입니다.</p>
			<div class="visual">
				<div class="con">
					<dl>
						<dt>종합형</dt>
						<dd>통원의료비, 입원의료비를 보장</dd>
					</dl>
					<dl>
						<dt>질병형</dt>
						<dd>질병으로 인한 손해를 보장(통원, 입원)</dd>
					</dl>
					<dl>
						<dt>상해형</dt>
						<dd>상해로 인한 손해를 보장(통원, 입원)</dd>
					</dl>
				</div>
				<div class="img"><img src="../resources/cms/pc//images/product/pro9_con2_1_1.gif" alt=""/></div>
			</div>
			<p><em>표준형과 선택형Ⅱ</em>에 따라서 입원의료비(상급병실료 차액 제외) <br/>보장 비율이 달라집니다.</p>
			<div class="visual">
				<div class="con">
					<dl>
						<dt>표준형</dt>
						<dd>급여중 본인부담금 80% 보장</dd>
						<dd>비급여항목 80% 보장</dd>
					</dl>
					<dl>
						<dt>선택형Ⅱ</dt>
						<dd>급여중 본인부담금 90% 보장</dd>
						<dd>비급여항목 80% 보장</dd>
					</dl>
				</div>
				<div class="img"><img src="../resources/cms/pc//images/product/pro9_con2_1_2.gif" alt=""/></div>
			</div>
		</div>
		<!-- # 탭2-2 : 필요한 특약만 선택 가능! -->
		<div id="uiTab2-2" class="con-type1">
			<h3><span class="txt-count">두번째</span>필요한 특약만<br /><em class="pen2 w154 pen-m5">선택 가능!</em></h3>
			<p>선택 특약 가입을 통해 주보험(기본형)에서 보장하지 않는 일부 <br/><em>비급여 항목을 보장</em> 받을 수 있습니다.</p>
			<div class="pro9_con2_2">
				<p class="tit-sub1">
					<a href="#tipPro9Con1" class="link-icon tip2 ui-tip-position" title="용어설명" rel="history">
						<em>비급여도수치료<br>
						체외충격파치료<br>
						증식치료</em>
					</a>
				</p>
				<p class="tit-sub1 sec-line">
					<a href="#tipPro9Con2" class="link-icon tip2 ui-tip-position" title="용어설명" rel="history">
						<em>비급여<br>주사료</em>
					</a>
				</p>
				<p class="tit-sub1">
					<a href="#tipPro9Con3" class="link-icon tip2 ui-tip-position" title="용어설명" rel="history">
						<em>비급여<br>자기공명영상진단<br>(MRI/MRA)</em>
					</a>
				</p>
			</div>
			<!-- 용어설명 툴팁 -->
			<div class="tooltip ui-tip-con" id="tipPro9Con1">
				<dl>
					<dt>* 도수치료</dt>
					<dd>　치료자가 손을 이용해서 환자의 근골격계통의<br/>　기능개선 및 통증감소를 위해 실시하는 치료</dd>
				<br/>
					<dt>* 체외충격파치료</dt>
					<dd>　체외에서 충격파를 병변에 가해 혈관 재형성을 돕고<br/>　 힘줄 및 뼈의 치유 과정을 자극하거나 재활성화<br/>　시켜 기능개선 및 통증감소를 위해 실시하는 치료</dd>
				<br/>
					<dt>* 증식치료</dt>
					<dd>　근골격계 통증이 있는 부위의 인대나 힘줄, 관절<br/>　연골 등에 증식물질을 주사하여 통증이 소실되거나<br/>　완화되는 것을 유도하는 치료</dd>
				</dl>
			</div>
			<div class="tooltip ui-tip-con" id="tipPro9Con2">
				<dl>
					<dt>* 주사료</dt>
					<dd>　주사치료시 사용된 행위, 약제 및 치료재료대</dd>
				</dl>
			</div>
			<div class="tooltip ui-tip-con" id="tipPro9Con3" style="left: 610px;top: 150px;">
				<dl>
					<dt>* 자기공명영상진단</dt>
					<dd>　자기공명영상 장치를 이용하여 고주파 등을<br/>　통한 신호의 차이를 영상화하여 조직의<br/>　구조를 분석하는 검사(MRI/MRA)</dd>
				</dl>
			</div>
			<div class="img"><img src="../resources/cms/pc//images/product/pro9_con2_2.gif" alt=""/></div>
		</div>
		<!-- # 탭2-3 : 100세까지 든든하게 -->
		<div id="uiTab2-3" class="con-type1">
			<h3><span class="txt-count">세번째</span><em class="pen2 w154">100세까지</em><br />든든하게</h3>
			<p>15년마다 재가입을 통해 <em>최대 100세까지 보장</em>이 가능합니다.</p>
			<span>※보험료 갱신주기는 1년입니다. 갱신 時 보험료가 인상될 수 있습니다.</span>
			<div class="visual">
				<div class="con"><p>20세도! 가입 → 35세도! 재가입 → 50세도! 재가입 → 65세도! 재가입 → 100세까지! 100세 만기</p></div>
				<div class="img"><img src="../resources/cms/pc//images/product/pro9_con2_3.gif" alt=""/></div>
			</div>
		</div>
		<!-- # 탭2-4 : 든든한 1등 삼성생명 -->
		<div id="uiTab2-4" class="con-type1">
			<h3><span class="txt-count">네번째</span>든든한<br><em class="pen2 w188">1등 삼성생명</em></h3>
			<p><em>생명보험사 자산규모 1위 기업</em><br>대한민국이 인정한 든든한 삼성생명!</p>
			<ul class="list-data list4">
				<li class="ic1">신용등급 <strong>13년 연속 AAA</strong> <span>(2016.11 한국신용평가)</span></li>
				<li class="ic2">국가고객만족도(NCSI) <strong>14년 연속 1위</strong> <span>(2017 생명보험부문, 한국생산성본부)</span></li>
				<li class="ic5">보유계약건수 <strong>1위</strong> <span>(2017.12, 금감원통계)</span></li>
				<li class="ic6">전용 콜센터 <strong>전문가 1:1 상담</strong></li>
			</ul>
		</div>
		<!-- # 탭2-5 : 1위에 빛나는 삼성생명 -->
		<div id="uiTab2-5" class="con-award">
			<h3>1위에 빛나는 <em class="txt-c2">삼성생명!</em></h3>
			<p>역시 생명보험사 <strong>판매 1위 삼성생명</strong><br><span class="txt-smaller">(금감원 통계 가입건수.수입보험료 기준,2015.06)</span><br>대외기관 수상으로 공신력을 더욱 인정받았습니다</p>
			<img src="../resources/cms/pc/images/product/img_product_award3.png" alt="생활형 재테크 정보가 가득한 은퇴라운지 오픈">
			<ul class="hd">
				<li>국가고객만족도<strong>13년 연속 1위</strong> <span>(한국생산성본부)</span></li>
				<li>소비자 평가 No.1 브랜드<strong>대상 수상</strong> <span>(2016 중앙일보 선정)</span></li>
				<li>소비자 선정 올해의 톱 브랜드<strong>대상 수상</strong> <span>(2016 조선비즈 선정)</span></li>
			</ul>
		</div>
	</div>
</div>

					<!-- ## 탭3 : 상품세부정보 /////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct3" class="product-con detail-tab3">
						
<form id = "planDocForm">
    <input type="hidden" name="prcd" value="Y052501ANNNAD01"/>
</form>
<h2 class="hd">상품세부내용</h2>
<div class="section">
	<div class="top">
		<ul class="tab-sub1 double">
			<li class="on"><a href="#uiTab3-1" onClick="n_logging('medical','medical-tab3','tab1','');">상품 기본 정보 요약</a></li>
			<li class="last"><a href="#uiTab3-2" onClick="n_logging('medical','medical-tab3','tab2','');">보장 내용 예시</a></li>
		</ul>
		<a href="#none" class="btn-type1 down" title="약관 다운로드" onclick="policyDown(true);ga('send','event','Direct','Etc','cancer_sub-menu_2_download',1);"><span>약관 다운로드</span></a>
	</div>
	<!-- # 탭3-1 : 상품 기본 정보 요약 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-1" class="on">
		<h3 class="hd">상품 기본 정보 요약</h3>
		<div class="tit-type3">
			<h4 class="heading">기본정보</h4>
		</div>
		<table class="tbl-type3 form" summary="보험상품명/보험계약자,피보험자/가입연령/보험료 납입기간/보험료 납입주기 안내">
			<caption>실손보험 상품 기본 정보</caption>
			<colgroup><col width="20%" /><col width="*" /></colgroup><tbody>
				<tr>
					<th scope="row">보험상품명</th>
					<td>삼성생명 인터넷 실손의료비보장보험1.0(기본형, 갱신형, 무배당)</td>
				</tr>
				<tr>
					<th scope="row">보험계약자, 피보험자</th>
					<td class="ui-tip-wrapper">
						<a href="#tipMemo1-1" class="link-icon tip2 ui-tip-position" title="용어설명">보험계약자</a>와 <a href="#tipMemo1-2" class="link-icon tip2 ui-tip-position" title="용어설명">피보험자</a>가 동일한 경우에 한하여 가입 가능
						<div class="tooltip ui-tip-con" id="tipMemo1-1">
							<dl>
								<dt>보험계약자</dt>
								<dd>보험자인 보험 회사를 상대로 하여 보험 계약을 맺고 보험 회사에 보험료를 지급하는 사람을 말합니다.</dd>
							</dl>
						</div>
						<div class="tooltip ui-tip-con" id="tipMemo1-2">
							<dl>
								<dt>피보험자</dt>
								<dd>생명보험에서 보험사고 발생의 대상이 되는 사람을 의미합니다.</dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">가입연령</th>
					<td>
						<table>
						<caption>실손보험 가입연령 및 만료일 안내</caption>
							<thead>
								<tr>
									<th>구분</th>
									<th>가입나이</th>
									<th>최종 갱신계약의 보험기간 만료일</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>최초가입</td>
									<td>20~60세</td>
									<td rowspan="3">「최초(재)가입나이+보장 내용 변경주기」세<br>계약해당일의 전일</td>
								</tr>
								<tr>
									<td>재가입</td>
									<td>35~99세</td>
								</tr>
								<tr>
									<td>갱신계약</td>
									<td>21~99세</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
				<tr>
					<th scope="row">보험기간</th>
					<td>1년(보험료 갱신주기 : 1년)</td>
				</tr>
				<tr>
					<th scope="row">납입기간</th>
					<td>전기납</td>
				</tr>
				<tr>
					<th scope="row">보험료 납입주기</th>
					<td>월납(단, 질병입원형 또는 질병통원형 없이 상해입원형 또는 상해통원형을 가입하는 경우 연납만 운영)</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<!-- # 탭3-2 : 보장 내용 예시 -->
	<!-- CMS 영역 -->
	<div id="uiTab3-2">
	<!-- 질병입원형-->
	<div class="tit-type3">
		<h4 class="heading">【주보험】<br>가. 질병입원형</h4>
	</div>
	<table class="tbl-type3 list" summary="일질병입원보장(지급사유별 보상기준)">
		<caption>질병입원형</caption>
		<colgroup>
			<col width="13%">
			<col width="13%">
			<col width="20%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="col" colspan="2">보상내용</th>
				<td scope="col">질병입원</td>
				<td class="txt" scope="col">질병으로 인하여 병원에 입원하여 치료를 받은 경우에는 입원의료비를 하나의 질병당<br>보험가입금액(5천만원)의 한도 내에서 보상</td>
			</tr>
			<tr>
				<th scope="row" rowspan="4">보상금액</th>
				<th rowspan="2" class="sub-th">표준형</th>
				<td>입원실료,<br>입원제비용,<br>입원수술비</td>
				<td class="txt">'「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)의 80%에 해당하는 금액<br><br>
				<p class="txt-type4"> 다만, 나머지 20%가 계약일 또는 매년 계약해당일부터 기산하여 연간 200만원을 초과하는　경우 그 초과금액은 보상함</p><br><br>
				(주) 상급병실료 차액 제외</td>
			</tr>
			<tr>
				<td>상급병실료<br>차액</td>
				<td class="txt">입원 시 실제로 사용한 병실과 기준병실의 병실료 차액에서 50%를 뺀 금액<br><br>
				<p class="txt-type4"> 다만, 1일 평균금액 10만원을 한도로 하며, 1일 평균금액은 입원기간 동안 상급병실료 차액　 전체를 총 입원일수로 나누어 산출함</p>
				</td>
			</tr>
			<tr>
				<th rowspan="2" class="sub-th">선택형Ⅱ</th>
				<td>입원실료,<br>입원제비용,<br>입원수술비</td>
				<td class="txt" colspan="2">'「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금(본인이 실제로 부담한 금액을 말함)'의 90%에 해당하는 금액과'비급여<sup>(주)</sup>(본인이 실제로 부담한 금액을 말함)'의 80%에 해당하는 금액을 합한 금액<br><br>
				<p class="txt-type4"> 다만, 급여 중 본인부담금의 나머지 10%와 비급여<sup>(주)</sup>의 나머지 20%를 합한 금액이 계약일 또는 매년 계약해당일부터 기산하여 연간 200만원을 초과하는 경우 그 초과금액은 보상함</p>
				<br><br>(주) 상급병실료 차액 제외</td>
			</tr>
			<tr>
				<td>상급병실료<br>차액</td>
				<td class="txt" colspan="2">입원 시 실제로 사용한 병실과 기준병실의 병실료 차액에서 50%를 뺀 금액<br><br>
				<p class="txt-type4"> 다만, 1일 평균금액 10만원을 한도로 하며, 1일 평균금액은 입원기간 동안 상급병실료 차액　 전체를 총 입원일수로 나누어 산출함</p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6 txt-notice"> 위 표에서 '비급여'라 함은 「국민건강보험법」 또는 「의료급여법」에 따라 보건복지부 장관이 정한 비급여대상(「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 절차를 거쳤지만 급여항목이 발생하지 않은 경우로 「국민건강보험법」 또는 「의료급여법」에 따른 비급여항목 포함)</p>
	
	<!-- 상해입원형-->
	<div class="tit-type3">
		<h4 class="heading">나. 상해입원형</h4>
	</div>
	<table class="tbl-type3 list" summary="일상해입원보장(지급사유별 보상기준)">
		<caption>상해입원형</caption>
		<colgroup>
			<col width="13%">
			<col width="13%">
			<col width="20%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="col" colspan="2">보상내용</th>
				<td scope="col">상해입원</td>
				<td class="txt" scope="col">상해로 인하여 병원에 입원하여 치료를 받은 경우에는 입원의료비를 하나의 상해당<br> 보험가입금액(5천만원)의 한도 내에서 보상</td>
			</tr>
			<tr>
				<th scope="row" rowspan="4">보상금액</th>
				<th rowspan="2" class="sub-th">표준형</th>
				<td>입원실료,<br>입원제비용,<br>입원수술비</td>
				<td class="txt">'「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)의 80%에 해당하는 금액<br><br>
				<p class="txt-type4">다만, 나머지 20%가 계약일 또는 매년 계약해당일부터 기산하여 연간 200만원을 초과하는 　경우 그 초과금액은 보상함</p><br><br>
				(주) 상급병실료 차액 제외</td>
			</tr>
			<tr>
				<td>상급병실료<br>차액</td>
				<td class="txt">입원 시 실제로 사용한 병실과 기준병실의 병실료 차액에서 50%를 뺀 금액<br><br>
				<p class="txt-type4"> 다만, 1일 평균금액 10만원을 한도로 하며, 1일 평균금액은 입원기간 동안 상급병실료 차액　 전체를 총 입원일수로 나누어 산출함</p>
				</td>
			</tr>
			<tr>
				<th rowspan="2" class="sub-th">선택형Ⅱ</th>
				<td>입원실료,<br>입원제비용,<br>입원수술비</td>
				<td class="txt" colspan="2">'「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금(본인이 실제로 부담한 금액을 말함)'의 90%에 해당하는 금액과'비급여<sup>(주)</sup>(본인이 실제로 부담한 금액을 말함)'의 80%에 해당하는 금액을 합한 금액<br><br>
				<p class="txt-type4"> 다만, 급여 중 본인부담금의 나머지 10%와 비급여<sup>(주)</sup>의 나머지 20%를 합한 금액이 계약일 또는 매년 계약해당일부터 기산하여 연간 200만원을 초과하는 경우 그 초과금액은 보상함</p><br><br>
				(주) 상급병실료 차액 제외</td>
			</tr>
			<tr>
				<td>상급병실료<br>차액</td>
				<td class="txt" colspan="2">입원 시 실제로 사용한 병실과 기준병실의 병실료 차액에서 50%를 뺀 금액<br><br>
				<p class="txt-type4"> 다만, 1일 평균금액 10만원을 한도로 하며, 1일 평균금액은 입원기간 동안 상급병실료 차액　 전체를 총 입원일수로 나누어 산출함</p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6 txt-notice"> 위 표에서 '비급여'라 함은 「국민건강보험법」 또는 「의료급여법」에 따라 보건복지부 장관이 정한 비급여대상 (「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 절차를 거쳤지만 급여항목이 발생하지 않은 경우로 「국민건강보험법」 또는 「의료급여법」에 따른 비급여항목 포함)</p>
	
	<!-- 질병통원형-->
	<div class="tit-type3">
		<h4 class="heading">다. 질병통원형</h4>
	</div>
	<table class="tbl-type3 list" summary="질병통원보장(지급사유별 보상기준)">
		<caption>질병통원형</caption>
		<colgroup>
			<col width="13%">
			<col width="13%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">보상내용</th>
				<td scope="row">질병통원</td>
				<td class="txt" scope="row">질병으로 인하여 병원에 통원하여 치료를 받거나 처방조제를 받은 경우에는 통원의료비 명목으로 매년 계약해당일부터 1년을 단위로 하여 외래(외래제비용, 외래수술비) 및 처방조제비를 각각 보상</td>
			</tr>
			<tr>
				<th rowspan="2">보상한도</th>
				<td>외래</td>
				<td class="txt">방문 1회당 '「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)에서 '항목별 공제금액'을 뺀 금액을 20만원의 한도 내에서 보상<br><br>
				<p class="txt-type4"> 매년 계약해당일부터 1년간 방문 180회를 한도로 함</p>
				</td>
			</tr>
			<tr>
				<td>처방조제비</td>
				<td class="txt">처방전 1건당 '「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)에서 '항목별 공제금액'을 뺀 금액을 10만원의 한도 내에서 보상<br><br>
				<p class="txt-type4">※ 매년 계약해당일부터 1년간 처방전 180건을 한도로 함</p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6 txt-notice"> 「국민건강보험법」 또는 「의료급여법」에 따라 보건복지부 장관이 정한 비급여대상(「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 절차를 거쳤지만 급여항목이 발생하지 않은 경우로「국민건강보험법」 또는 「의료급여법」에 따른 비급여항목 포함)</p>
	
	<!-- 상해통원형-->
	<div class="tit-type3">
		<h4 class="heading">라. 상해통원형</h4>
	</div>
	<table class="tbl-type3 list" summary="상해통원형(지급사유별 보상기준)">
		<caption>상해통원형</caption>
		<colgroup>
			<col width="13%">
			<col width="13%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">보상내용</th>
				<td scope="row">상해통원</td>
				<td class="txt" scope="row">상해로 인하여 병원에 통원하여 치료나 처방조제를 받은 경우에는 통원의료비 명목으로 매년 계약해당일부터 1년을 단위로 하여 외래(외래제비용, 외래수술비) 및 처방조제비를 각각 보상</td>
			</tr>
			<tr>
				<th rowspan="2">보상한도</th>
				<td>외래</td>
				<td class="txt">방문 1회당 '「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)에서 '항목별 공제금액'을 뺀 금액을 20만원의 한도 내에서 보상<br><br>
				<p class="txt-type4">매년 계약해당일부터 1년간 방문 180회를 한도로 함</p>
				</td>
			</tr>
			<tr>
				<td>처방조제비</td>
				<td class="txt">처방전 1건당 '「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 중 본인부담금'과'비급여<sup>(주)</sup>'를 합한 금액(본인이 실제로 부담한 금액을 말함)에서 '항목별 공제금액'을 뺀 금액을 10만원의 한도 내에서 보상<br><br>
				<p class="txt-type4">매년 계약해당일부터 1년간 처방전 180건을 한도로 함</p>
				</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6 txt-notice"> 「국민건강보험법」 또는 「의료급여법」에 따라 보건복지부 장관이 정한 비급여대상(「국민건강보험법」에서 정한 요양급여 또는 「의료급여법」에서 정한 의료급여 절차를 거쳤지만 급여항목이 발생하지 않은 경우로「국민건강보험법」 또는 「의료급여법」에 따른 비급여항목 포함)</p>
	
	<!-- 항목별 공제금액 -->
	<div class="tit-type3">
		<h4 class="heading">※ &lt; 항목별 공제금액 &gt; - [질병통원형], [상해통원형]에 한함</h4>
	</div>
	<table class="tbl-type3 list" summary="일질병입원보장(지급사유별 보상기준)">
		<caption>질병통원형,상해통원형</caption>
		<colgroup>
			<col width="13%">
			<col width="13%">
			<col width="*">
			<col width="20%">
		</colgroup>
		<thead>
			<tr>
				<th scope="col" colspan="2">구분</th>
				<th scope="col">항목</th>
				<th scope="col">공제금액</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th scope="row" rowspan="4">표준형</th>
				<td rowspan="3">외래(외래 제비용 및 외래 수술비 합계)</td>
				<td class="txt">「의료법」 제3조 제2항 제1호에 따른 의원, 치과의원, 한의원, 같은 항 제2호에 따른 조산원, 「지역보건법」 제10조, 제12조 및 제13조에 따른 보건소, 보건의료원 및 보건지소, 「농어촌 등 보건의료를 위한 특별조치법」 제15조에 따른 보건진료소</td>
				<td>1만원과 보상대상의료비의<br>20%중 큰 금액</td>
			</tr>
			<tr>
				<td class="txt">「의료법」 제3조 제2항 제3호에 따른 종합병원, 병원, 치과병원, 한방병원, 요양병원</td>
				<td>1만5천원과 보상대상의료비의 20%중 큰 금액</td>
			</tr>
			<tr>
				<td class="txt">「국민건강보험법」 제42조 제2항에 따른 전문요양기관 또는 「의료법」 제3조의 4에 따른 상급종합병원</td>
				<td>2만원과 보상대상의료비의<br>20%중 큰 금액</td>
			</tr>
			<tr>
				<td>처방 조제비</td>
				<td class="txt">「국민건강보험법」 제42조 제1항 제2호에 따른 약국, 같은 항 제3호에 따른 한국희귀의약품센터에서의 처방, 조제(의사의 처방전 1건당, 의약분업 예외지역에서 약사의 직접조제 1건당)</td>
				<td>8천원과 보상대상의료비의<br>20%중 큰 금액</td>
			</tr>
			<tr>
				<th scope="row" rowspan="4">선택형Ⅱ</th>
				<td rowspan="3">외래(외래 제비용 및 외래 수술비 합계)</td>
				<td class="txt">「의료법」 제3조 제2항 제1호에 따른 의원, 치과의원, 한의원, 같은 항 제2호에 따른 조산원, 「지역보건법」 제10조, 제12조 및 제13조에 따른 보건소, 보건의료원 및 보건지소, 「농어촌 등 보건의료를 위한 특별조치법」 제15조에 따른 보건진료소</td>
				<td>1만원과 공제기준금액<br><br>(보상대상의료비 중<br>"급여 10%와 비급여 20%에<br>해당하는 금액을 합한 금액") 중 큰 금액</td>
			</tr>
			<tr>
				<td class="txt">「의료법」 제3조 제2항 제3호에 따른 종합병원, 병원, 치과병원, 한방병원, 요양병원</td>
				<td>1만5천원과 보상대상의료비의 20%중 큰 금액<br><br>(보상대상의료비 중<br>"급여 10%와 비급여 20%에 해당하는 금액을 합한 금액") 중 큰 금액</td>
			</tr>
			<tr>
				<td class="txt">「국민건강보험법」 제42조 제2항에 따른 전문요양기관 또는 「의료법」 제3조의 4에 따른 상급종합병원</td>
				<td>2만원과 보상대상의료비의<br>20%중 큰 금액<br><br>(보상대상의료비 중<br>"급여 10%와 비급여 20%에 해당하는 금액을 합한 금액") 중 큰 금액</td>
			</tr>
			<tr>
				<td>처방 조제비</td>
				<td class="txt">「국민건강보험법」 제42조 제1항 제2호에 따른 약국, 같은 항 제3호에 따른 한국희귀의약품센터에서의 처방, 조제(의사의 처방전 1건당, 의약분업 예외지역에서 약사의 직접조제<br>1건당)</td>
				<td>8천원과 보상대상의료비의<br>20%중 큰 금액<br><br>(보상대상의료비 중<br>"급여 10%와 비급여 20%에 해당하는 금액을 합한 금액") 중 큰 금액</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6 txt-notice"> 1. 소멸사유 : 피보험자가 보험기간 중 사망(실종선고, 관공서가 수해/화재/기타 재난 조사 후 사망통보를 받은 경우 포함)한 경우<br>　(단, 사망 당시의 책임준비금(미경과보험료적립금)을 지급함) <br>2. 회사가 보상하지 않는 사항 및 기타 자세한 사항은 해당 약관 참조</p><br>
	<p class="txt-type4">도수치료·체외충격파치료·증식치료로 인한 비급여 의료비, 비급여 주사료 및 자기공명영상진단(MRI/MRA)으로 인한 비급여 의료비는 주보험에서 보상하지 않고 각 해당특약[도수치료·체외충격파치료·증식치료 실손의료비보장특약D(갱신형,무배당), 비급여 주사료 실손의료비보장특약D(갱신형,무배당) 및 비급여 자기공명영상진단(MRI/MRA) 실손의료비보장특약D(갱신형,무배당)]에서 보상함</p>
	<!-- 비급여 도수치료∙체외충격파치료∙증식치료 실손의료비보장특약D -->
	<div class="tit-type3">
		<h4 class="heading">【선택특약】</h4>
		<p class="txt-type2 txt-notice">비급여 도수치료∙체외충격파치료∙증식치료 실손의료비보장특약D(갱신형,무배당)</p>
	</div>
	<table class="tbl-type3 list" summary="선택특약(지급사유별 보상기준)">
		<caption>선택특약</caption>
		<colgroup>
			<col width="13%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">보상내용</th>
				<td class="txt" scope="row">상해 또는 질병의 치료목적으로 병원에 입원 또는 통원하여 도수치료∙체외충격파치료∙증식치료를 받은 경우 도수치료∙체외충격파치료∙증식치료로 인하여 본인이 실제로 부담한 비급여 의료비(행위료, 약제비, 치료재료대 포함)에서 공제금액을 뺀 금액을 보상한도 내에서 보상</td>
			</tr>
			<tr>
				<th>보상대상의료비</th>
				<td class="txt">「도수치료∙체외충격파치료∙증식치료」로 인하여 본인이 실제로 부담한 비급여 의료비(행위료, 약제비, 치료재료대 포함)</td>
			</tr>
			<tr>
				<th>공제금액</th>
				<td class="txt">1회당 2만원과 보상대상의료비의 30% 중 큰 금액</td>
			</tr>
			<tr>
				<th>보상한도</th><!-- 수정 -->
				<td class="txt">계약일 또는 매년 계약해당일부터 1년 단위로 350만원 이내에서 50회<sup>(주)</sup>까지 보상</td>
			</tr>
		</tbody>
	</table>
	<p class="txt-type6">도수치료∙체외충격파치료∙증식치료의 각 치료횟수를 합산하여 50회까지 보상함</p>
	
	<!-- 비급여 주사료 실손의료비보장특약D(갱신형,무배당) -->
	<div class="tit-type3">
		<p class="txt-type2 txt-notice">비급여 주사료 실손의료비보장특약D(갱신형,무배당)</p>
	</div>
	<table class="tbl-type3 list" summary="선택특약(지급사유별 보상기준)">
		<caption>선택특약</caption>
		<colgroup>
			<col width="13%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">보상내용</th>
				<td class="txt" scope="row">상해 또는 질병의 치료목적으로 병원에 입원 또는 통원하여 주사치료를 받아 본인이 실제로 부담한 비급여 주사료에서 공제금액을 뺀 금액을 보상한도 내에서 보상</td>
			</tr>
			<tr>
				<th>보상대상의료비</th>
				<td class="txt">주사치료를 받아 본인이 실제로 부담한 비급여 주사료</td>
			</tr>
			<tr>
				<th>공제금액</th>
				<td class="txt">입원∙통원 1회당 2만원과 보상대상의료비의 30% 중 큰 금액</td>
			</tr>
			<tr>
				<th>보상한도</th>
				<td class="txt">계약일 또는 매년 계약해당일부터 1년 단위로 250만원 이내에서 입원과통원을 합산하여 50회까지 보상</td>
			</tr>
		</tbody>
	</table>

	<!-- 비급여 자기공명영상진단(MRI/MRA) 실손의료비보장특약D(갱신형,무배당) -->
	<div class="tit-type3">
		<p class="txt-type2 txt-notice">비급여 자기공명영상진단(MRI/MRA) 실손의료비보장특약D(갱신형,무배당)</p>
	</div>
	<table class="tbl-type3 list" summary="선택특약(지급사유별 보상기준)">
		<caption>선택특약</caption>
		<colgroup>
			<col width="13%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th scope="row">보상내용</th>
				<td class="txt" scope="row">상해 또는 질병의 치료목적으로 병원에 입원 또는 통원하여 「자기공명영상진단」을 받아 본인이 실제로 부담한 비급여 의료비(조영제, 판독료 포함)에서 공제금액을 뺀 금액을 보상한도 내에서 보상</td>
			</tr>
			<tr>
				<th>보상대상의료비</th>
				<td class="txt">「자기공명영상진단」을 받아 본인이 실제로 부담한 비급여 의료비(조영제, 판독료 포함)</td>
			</tr>
			<tr>
				<th>공제금액</th>
				<td class="txt">1회당 2만원과 보상대상의료비의 30% 중 큰 금액</td>
			</tr>
			<tr>
				<th>보상한도</th>
				<td class="txt">계약일 또는 매년 계약해당일부터 1년 단위로 연간 300만원 한도내에서 보상</td>
			</tr>
		</tbody>
	</table>
	<ul class="txt-type2">
		<li>실손의료비보장보험(기본형,갱신형,무배당) 상해형, 비급여 도수치료·체외충격파치료·증식치료 실손의료비보장특약D(갱신형,무배당), 비급여 주사료 실손의료비보장특약D(갱신형,무배당) 및 비급여 자기공명영상진단(MRI/MRA) 실손의료비보장특약D(갱신형,무배당)의 경우 계약자 또는 피보험자는 피보험자가 직업 또는 직무를 변경하게 된 경우에는 지체없이 회사에 알려야 하며, 변경된 직업 또는 직무의 위험등급에 따라 산출된 보험료를 납입해야 함</li>
		<li>실손의료비보장보험의 지급관련 세부사항, 보상하지 않는 사항 및 기타 자세한 사항은 주보험 및 특약의 해당 약관 참조</li>
	</ul>
</div>

</div>

<script type="text/javascript">
<!--
	$plugin.togglecon($('.tab-sub1 li'),{
		toggle_type : 'tab',
		selector : '.tab-sub1 li',
		selector_group : true,
		selector_btn: '>a',
		selector_con: '#href',
		class_open : 'on'
	});
//-->
</script>
					</div>
					<!-- ## 탭4 : 자주하는 질문 ////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct4" class="product-con detail-tab4">
						
<h2 class="hd">자주하는 질문</h2>
<div class="section">
	<!-- ## 게시물출력 ## -->
	<!-- <p class="txt-num">총 <em>000</em>건의 질문이 등록되어 있습니다.</p> -->
	<p class="txt-num">&nbsp;</p>
	<ul class="board-list faq2" id="uiFaqList">테스트</ul>
	<!-- ## 페이징 ## -->
	<div class="paging"></div>
</div>

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
</body>
</html>