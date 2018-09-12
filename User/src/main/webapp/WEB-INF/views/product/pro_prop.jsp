<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>실손 보험</title>
</head>
<script type="text/javascript"
	src="../www.googleadservices.com/pagead/f.txt">
	
</script>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>

</head>
<body>
	<div id="wrapper">
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		<link rel="stylesheet"
			href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
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
							chbedosu : $('#chbedosu').val(),
							chbeinje : $('#chbeinje').val(),
							chbemri : $('#chbemri').val()
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
												class="text placeholder numOnly" maxlength="8" id="birth"
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
								</form>
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
												onclick="setReCalculator()" value="3" id="chbedosu"
												name="chbedosu" checked="checked">
										</span></li>
										<li><span>비급여 주사료</span> <span class="label-check">
												<label for="treaty1-2" class="on">선택</label> <input
												type="checkbox" class="check" title="특약리스트" id="chbeinje"
												name="chbeinje" value="1" onclick="setReCalculator()"
												checked="checked">
										</span></li>
										<li><span>비급여 자기공명영상진단(MRI/MRA)</span> <span
											class="label-check"> <label for="treaty1-3" class="on">선택</label>
												<input type="checkbox" class="check" value="2" title="특약리스트"
												onclick="setReCalculator()" id="chbemri" name="chbemri"
												checked="checked">
										</span></li>
									</ul>
									<div class="btn">
										<button type="submit" id="goPlan2">
											<a href="#" class="btn-c2 adb-dist2"><span>가입하기</span></a>
										</button>
										<a href="#none" class="btn-c2" id="reCalcPremium"
											rel="history" onclick="premCal();"><span>재계산하기</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- //계산결과 -->
					<!-- 팝업링크 -->
					<div class="view-pop">
						<a href="#popProResult" class="link-type1"
							onclick="clickDetailTab(1);"><span>보장내용보기</span></a> <a
							href="#popProResult" class="link-type1"
							onclick="clickDetailTab(2);"><span>해지환급금</span></a>
					</div>
					<!-- ## POPUP : 계산결과 상세보기 -->

					<!-- 유틸버튼 -->
					<div class="area-util">
						<a href="#none" class="icon-util print" title="인쇄하기"
							id="doPrintNew" onclick="fn_printEntire();">인쇄하기</a> <a
							href="#popSendEmail" class="icon-util email" title="이메일보내기"
							onclick='clearMail("삼성생명 인터넷정기보험3.0(무배당)");'>이메일보내기</a>
					</div>
					<!-- //유틸버튼 -->
				</div>
			</div>

			<div id="popProResult" class="ui-pop-call">
				<!-- open클래스는 스크립트를 통해 추가됨 -->
				<div class="header">
					<button type="button" class="ui-close">
						보장내용/해지환급금 닫기<span></span>
					</button>
				</div>
				<div class="content pop-proresult">
					<!-- ## 상단영역 ## -->
					<div class="top">
						<h2>삼성생명 인터넷정기보험4.0(무배당)</h2>
						<ul class="txt-type2 list" id="detailCustInfo">
							<li>보험기간 : <strong>10</strong></li>
							<li>납입기간 : <strong>전기납</strong></li>
							<li>기준 : (보험나이 <strong>30</strong>세)
							</li>
						</ul>
						<div class="btn">
							<a href="#none" class="btn-round3 down" title="약관 다운로드"
								onclick="policyDown(true);"><span>약관 다운로드</span></a>
							<!-- 
								<span class="ico">
									<a href="#popSendEmail" class="icon-util2 email" title="이메일보내기" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'>이메일보내기</a>
									<a href="#none" class="icon-util2 print" title="인쇄하기" id="doPrintPop">인쇄하기</a>
								</span>
								 -->
						</div>
					</div>
					<!-- ## 탭 ## -->
					<ul class="tab-type3">
						<li class="on"><a href="#tabResult1" id="detailTab1"
							onClick="n_logging('term','guaranteeDetail','','');"><span>보장내용</span></a></li>
						<li><a href="#tabResult2" id="detailTab2"
							onClick="n_logging('term','refundDetail','','');"><span>해지환급금</span></a></li>
					</ul>
					<!-- ## 스크롤영역 : @select-dataN으로 선택한 항목 클래스 설정 ## -->

					<div class="tab-wrap select-data1">
						<!-- # 탭1 : 보장내용 ## -->
						<div id="tabResult1" class="wrap-scroll on" tabindex="0">
							<div class="section">
								<h3 class="tit-sub1">[ 사망보험금 ]</h3>
								<table class="tbl-type3" cellspacing="0" summary="지급사유별 지급금액">
									<caption>사망보험금 지급금액</caption>
									<colgroup>
										<col width="*" />
										<col width="14%" />
										<col width="14%" />
										<col width="14%" />
									</colgroup>
									<thead>
										<tr>
											<th scope="col" rowspan="2">지급사유</th>
											<th scope="col" colspan="3" class="datagroup">지급금액</th>
										</tr>
										<tr class="sub">
											<th scope="col" class="data1">최저보험료</th>
											<th scope="col" class="data2">맞춤설계</th>
											<th scope="col" class="data3">최고보장</th>
										</tr>
									</thead>
									<tbody id="payReason">
										<tr>
											<td class="ui-tip-wrapper"><a href="#tipMemo1"
												class="link-icon tip2 ui-tip-position" title="용어설명">피보험자</a>가
												보험기간 중 사망시
												<div class="tooltip ui-tip-con" id="tipMemo1">
													<dl>
														<dt>피보험자</dt>
														<dd>생명보험에서 보험사고 발생의 대상이 되는 사람을 의미합니다.</dd>
													</dl>
												</div></td>
											<td class="data1">9,999만원</td>
											<td class="data2">9,999만원</td>
											<td class="data3">9,999만원</td>
										</tr>
									</tbody>
								</table>
							</div>
							<p class="txt-type2">상기 보험상품 관련 내용은 요약된 자료이므로 단순 안내자료로 참고하시기
								바라며, 보다 자세한 사항은 약관 및 상품설명서를 참조하시기 바랍니다.</p>
							<p>준법감시필(신채널사업부 제16-174호, '16.12.28)</p>
							<div class="btn-area">
								<a href="#none" class="btn-type2 ui-close"><span>확인</span></a>
							</div>
						</div>
						<!-- # 탭2 : 해지환급금 ## -->
						<div id="tabResult2" class="wrap-scroll" tabindex="0">
							<div class="tb-toggle">
								<table cellspacing="0"
									summary="기간별 최저/맞춤설계/최고보장 해지환급금(납입보험료누계, 해지환급금, 환급률)"
									class="tbl-type3 data-type2">
									<caption>해지환급금</caption>
									<colgroup>
										<col width="*" />
										<col width="12%" />
										<col width="11%" />
										<col width="8%" />
										<col width="12%" />
										<col width="11%" />
										<col width="8%" />
										<col width="12%" />
										<col width="11%" />
										<col width="8%" />
									</colgroup>
									<thead>
										<tr>
											<th scope="col" rowspan="2">기간</th>
											<th scope="col" colspan="3" class="data1">최저보험료</th>
											<th scope="col" colspan="3" class="data2">맞춤설계</th>
											<th scope="col" colspan="3" class="data3">최고보장</th>
										</tr>
										<tr class="sub">
											<th scope="col" class="data1">납입보험료</th>
											<th scope="col" class="data1">해지환급금</th>
											<th scope="col" class="data1">환급률</th>
											<th scope="col" class="data2">납입보험료</th>
											<th scope="col" class="data2">해지환급금</th>
											<th scope="col" class="data2">환급률</th>
											<th scope="col" class="data3">납입보험료</th>
											<th scope="col" class="data3">해지환급금</th>
											<th scope="col" class="data3">환급률</th>
										</tr>
									</thead>
									<tbody id="return">
										<tr>
											<td>3개월</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>6개월</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>9개월</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>1년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>2년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>3년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>4년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>5년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>10년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>15년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>20년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>25년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>30년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>35년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="on">
											<td>40년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr>
											<td>45년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
										<tr class="last on">
											<td>50년</td>
											<td class="data1 value1">00,000,000원</td>
											<td class="data1 value2">00,000,000원</td>
											<td class="data1 value3">00.0%</td>
											<td class="data2 value1">00,000,000원</td>
											<td class="data2 value2">00,000,000원</td>
											<td class="data2 value3">00.0%</td>
											<td class="data3 value1">00,000,000원</td>
											<td class="data3 value2">00,000,000원</td>
											<td class="data3 value3">00.0%</td>
										</tr>
									</tbody>
								</table>
								<a href="#none" class="btn-more"><span class="show">전체
										기간 펼쳐 보기</span><span>주요 기간만 보기</span></a>
							</div>
							<p class="txt-type2">상기 예시된 해지환급금 및 환급률은 보험료가 예정납입기간 동안 보험료
								납입기일(매월 계약해당일)에 정상적으로 납입되었다는 가정하에 산출되었습니다.</p>
							<p>준법감시필(신채널사업부 제16-174호, '16.12.28)</p>
							<div class="btn-area">
								<a href="#none" class="btn-type2 ui-close"><span>확인</span></a>
							</div>
						</div>
					</div>
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
</body>
</html>