<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>암보험</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">


		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content">
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