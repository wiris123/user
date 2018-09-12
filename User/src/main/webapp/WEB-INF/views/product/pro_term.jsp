<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>정기 보험</title>
</head>
<!-- <script type="text/javascript"
	src="../www.googleadservices.com/pagead/f.txt">	
</script> -->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>
</head>
<body>
	<div id="wrapper">
	<%@ include file="../include/header.jsp"%>
		<!-- 머리 -->

		<script>
			$(function() {

				$('.list-result').hide();

			});

			function premiPlus() {

				$
						.ajax({
							url : "./termPrem.do",
							type : "post",
							data : {
								paytime : $('#paytime').val(),
								instime : $('#instime').val(),
								gender1 : $('#calcGender1').val(),
								gender2 : $('#calcGender2').val(),
								birth : $('#birth').val(),
								death : $('#death').val()
							},
							dataType : "json",
							contentType : "application/x-www-form-urlencoded; charset=utf-8",//post타입의 content타입 : application/x-www-form-urlencoded;charset=utf-8
							success : function(resD) {

								$('#resultPremium0').text(resD.mini_result);
								$('#resultPremium2').text(resD.custom_result);
								$('#resultPremium1').text(resD.max_result);
								$('#gobirth').val($('#birth').val()), $(
										'#goinstime').val($('#instime').val()),
										$('#gopaytime')
												.val($('#paytime').val()), $(
												'#gopayprem').val(
												resD.custom_result), $(
												'.list-result').show();
							},
							error : function(errorData) {
								alert("오류발생 : " + errorData.status + ":"
										+ errorData.statusText);
							}

						});

			}
		</script>
		<link rel="stylesheet"
			href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- page : content /////////////////////////////////////////////////// -->
			<div id="content" class="page-product product2">

				<!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
				<div class="product-basic page-change">
					<!-- # 상품기본정보 # -->

					<!-- CMS 영역 -->
					<div class="info">
						<h1>
							<span>ISM 다이렉트 </span><strong>인터넷정기보험</strong><em>4.0(무배당)</em>
						</h1>
						<p class="com1">
							다이렉트로 가입하니까!<br> <strong>27% 더 저렴</strong>한 보험료로 사망보험금 준비<br>
							<span class="notice">(자사동일유형 타상품대비)</span>
						</p>
						<p class="com2">
							<span>필요한만큼만 보장기간을 정해서 합리적인 보험료로 가입<br>(자사 동일유형
								타상품대비)
							</span>
						</p>
					</div>
					<!-- # 보험료 계산하기 # -->
					<script>
						function atag() {
							if (birth.value.length <= 7) {
								alert("생년월일을 8개의 숫자로 작성해주세요.");
							} else if (!($("#male").hasClass("on")||$("#female").hasClass("on"))){
			               		alert("성별을 선택해주세요.")
							} else if (instime.value == "") {
								alert("보험기간을 선택해주세요.");
							} else if (paytime.value == "") {
								alert("납입기간을 선택해주세요.");
							} else {
								premiPlus();
							}
							return false;
						};
					</script>
					<form action="" id="formCalculator" >
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
													class="text placeholder numOnly" id="birth" maxlength="8"
													placeholder="" />
											</div>
										</li>
										<!-- 성별 -->
										<li>
											<div class="label-radiobtn gender">
												<span> <label for="calcGender1" id="male">남자</label> <input
													type="radio" name="gender1" class="radio" id="calcGender1"
													value="1" />
												</span> <span> <label for="calcGender2" id="female">여자</label> <input
													type="radio" name="gender2" class="radio" id="calcGender2"
													value="2" />
												</span>
											</div>
										</li>
										<!-- 보험기간 -->
										<li><span class="select-box"> <select id="instime"
												name="instime" title="보험기간">
													<option value="">보험기간 선택</option>
													<option value="10">보험기간 : 10년</option>
													<option value="20">보험기간 : 20년</option>
													<option value="60">보험기간 : 60세까지</option>
													<option value="70">보험기간 : 70세까지</option>
											</select>
										</span></li>
										<!-- 납입기간-->
										<li><span class="select-box"> <select id="paytime"
												name="paytime" title="납입기간">
													<option value="">---납입기간 선택---</option>
													<option value="10">납입기간 : 10년</option>
													<option value="20">납입기간 : 20년</option>
											</select>
										</span></li>
									</ul>
									<a href="#" class="btn" onclick="atag();"><span>내
											보험료 확인 / 가입</span></a>
								</div>
							</div>
						</fieldset>
					</form>
				</div>

				<!-- ## 계산결과 /////////////////////////////////////////////////////////////////////////////////////// -->
				<div class="product-result " id="uiProductResult1"
					style="display:block;" tabindex="0">
					<!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
					<div class="result-area">
						<h3 style="top: -21px;">보험료 계산결과</h3>
						<div class="list-result thum ui-list-mode">
							<div class="data-case2 col1">
								<!-- 결과1 : 최저보험료 ///////////////////////////////////////////////////////////// -->
								<div class="box box-result1" id="termCalcResult1-1">
									<h4 class="heading">
										<span>최저보험료</span> <strong><span>월</span><span
											id="resultPremium0">0,000</span>원</strong> <a href="#popProductCart"
											class="btn-save adb-dist1" id="savePlan1"
											onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_1',1);">설계저장</a>
									</h4>
									<div class="con">
										<div class="form">
											<div class="label">
												<span>사망보험금</span>
											</div>
											<div class="data">
												<strong><span id="deathAmt1">5,000</span>만원</strong>
											</div>
										</div>
										<div class="btn">
											<a href="#popSendEmail" class="btn-c1 adb-dist1"
												onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
											<a href="#none" class="btn-c2 adb-dist1" id="goPlan1"
												onclick="ga('send','event','Direct','Entry','term-top_list_1',1);"><span>가입하기</span></a>
											<input type="hidden" id="jsonResultData1"
												name="jsonResultData" />
										</div>
									</div>
								</div>
								<!-- 결과2 : 맞춤설계 ////////////////////////////////////////////////////////////// -->

								<div class="box box-result2 on" id="termCalcResult1-2">
									<form action="../product/insert_term.do" method="post"
										name="term_form">
										<input type="hidden" name="gobirth" id="gobirth" /> <input
											type="hidden" name="goinstime" id="goinstime" /> <input
											type="hidden" name="gopaytime" id="gopaytime" /> <input
											type="hidden" name="gopayprem" id="gopayprem" /> <input
											type="hidden" name="mode" value="term" />
										<h4 class="heading">
											<span>맞춤설계</span> <strong><span>월</span><span
												id="resultPremium2">0,000</span>원</strong> <a href="#popProductCart"
												class="btn-save adb-dist2" id="savePlan2"
												onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
										</h4>
										<div class="con">
											<p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
											<div class="">
												<div class="label">
													<label for="reCalcPrice1">사망보험금</label>
												</div>
												<div class="data">
													<span class="select-box"> <select id="death"
														name="death">
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
												</div>
											</div>
											<div class="btn">
												<span class="img-gift"></span> <a href="#popSendEmail"
													class="btn-c1 adb-dist2"
													onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
												<button type="submit" id="goPlan2">
													<a href="#" class="btn-c2 adb-dist2"><span>가입하기</span></a>
												</button>
												<input type="hidden" id="jsonResultData2"
													name="jsonResultData" />
											</div>
											<div class="btn btn-reset">
												<a href="#none" class="btn-c2" id="reCalcPremium"
													onclick="premiPlus();"><span>재계산하기</span></a>
											</div>
										</div>
									</form>
								</div>

								<!-- 결과3 : 추천보장 ///////////////////////////////////////////////////////////// -->
								<div class="box box-result3" id="termCalcResult1-3">
									<h4 class="heading">
										<span>추천보장</span> <strong><span>월</span><span
											id="resultPremium1">1억 5천</span>만원</strong> <a href="#popProductCart"
											class="btn-save adb-dist3" id="savePlan3"
											onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_3',1);">설계저장</a>
									</h4>
									<div class="con">
										<div class="form">
											<div class="label">
												<span>사망보험금</span>
											</div>
											<div class="data">
												<strong><span id="deathAmt3">1억 5천</span>만원</strong>
											</div>
										</div>
										<div class="btn">
											<a href="#popSendEmail" class="btn-c1 adb-dist3"
												onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
											<a href="#none" class="btn-c2 adb-dist3" id="goPlan3"
												onclick="ga('send','event','Direct','Entry','term-top_list_3',1);"><span>가입하기</span></a>
											<input type="hidden" id="jsonResultData3"
												name="jsonResultData" />
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
					<script type="text/javascript">
					<!--
						$plugin.togglecon($('.tab-type3 li'), {
							toggle_type : 'tab',
							selector : '.tab-type3 li',
							selector_group : true,
							selector_btn : '>a',
							selector_con : '#href',
							class_open : 'on'
						});

						$plugin.togglecon($('.pop-proresult .tb-toggle'), {
							selector_group : true,
							selector_btn : '.btn-more',
							selector_con : '.tbl-type3 .on'
						});
					//-->
					</script>
				</div>
			</div>
			<!-- 머리끝 -->
		</div>
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>