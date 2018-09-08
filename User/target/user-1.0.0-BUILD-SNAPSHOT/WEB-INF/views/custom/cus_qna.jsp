<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>고객센터</title>
<%@ include file="../include/header.jsp"%>
</head>
<%
	//현재시간 구하기
	long time = System.currentTimeMillis();
	SimpleDateFormat dayTime = new SimpleDateFormat("yy/MM/dd");
	String str = dayTime.format(new Date(time));
	System.out.println(str);

	long start = System.currentTimeMillis();
	long end = System.currentTimeMillis();

	pageContext.setAttribute("str", str);
%>
<body>
	
	<div id="wrapper">

		<!-- 머리 -->
		
		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content" class="page-counsel">
				<!-- ## 페이지타이틀 ## -->
				<div class="tit-page">
					<h1>고객 상담신청</h1>
				</div>
				<!-- ## 상단 비쥬얼문구 ## -->
				<div class="box-content visual">
					<div class="line"></div>
					<div>
						<div>
							<p class="mes">
								<strong>어떤 내용이 궁금하신가요?</strong> 전화 상담 예약을 하시면 원하는 시간에 전문상담원이 연락드립니다.
							</p>
							<ul class="info">
								<li><strong class="tel">080<span>-</span>789<span>-</span>3300
								</strong></li>
								<li>상담가능시간 - (평일) 08:30-17:30</li>
							</ul>
							<a href="#" onclick="openPopCounsel('telReserve', this)" class="btn-sub btn-type2 c1"><span>전화상담 예약</span></a>
						</div>
					</div>
					<div class="line"></div>
				</div>
				<script type="text/javascript">
					$(document)
							.ready(
									function() {
										var $div = $('<div id="popCounselTelOverlay" class="modal-overlay" style="width: 1306px; height: 1305px;"></div>');
										function openTelPop() {
											$("#popCounselTelOverlay").css(
													'display', '');
											$("#popCounselTel")
													.addClass("open");

										}
										function openMailPop() {
											$("#popCounselTelOverlay").css(
													'display', '');
											$("#popCounselEmail").addClass(
													"open");
										}
										$(".ui-close")
												.click(
														function() {
															$('.pop-modal3')
																	.removeClass(
																			"open");
															$(
																	"#popCounselTelOverlay")
																	.css(
																			'display',
																			'none');
														});
										$("#popCounselTelOverlay")
												.click(
														function() {
															$(
																	"#popCounselTelOverlay")
																	.css(
																			'display',
																			'none');
															$('.pop-modal3')
																	.removeClass(
																			"open");
														});
										openTelPopj = openTelPop;
										openMailPopj = openMailPop;
									});

					function openPopCounsel(type, form) {
						if (type == 'telReserve') {
							openTelPopj();
						} else if (type == 'popCounselEmail') {
							openMailPopj();
						}

					}
				</script>
				<!-- ## 상담방법목록 ## -->
				<ul class="counsel-list">
					<li class="list1"><a href="#" onclick="openPopCounsel('chat');"> <strong><span>채팅</span>상담</strong> <em name="chatStatus" class="icon-state off">OFF</em>
					</a></li>
					<li class="list2"><a href="#" onclick="openPopCounsel('popCounselEmail', this)"> <strong><span>이메일</span>상담</strong> <em name="emailStatus" class="icon-state on">ON</em>
					</a></li>
					<li class="list3"><a href="#" onclick="openPopCounsel('remote');"> <strong><span>1:1문의</span>요청</strong> <em name="remoteStatus" class="icon-state off">OFF</em>
					</a></li>
				</ul>
				<p class="mes-type1">
					궁금하신 내용은 언제든지 부담없이 저희 상담원에게 물어보세요.<br />가입을 유도하거나 권유하지 않고, <strong class="txt-c1">전문상담원이 친절하고 자세하게 답변</strong>해드립니다.
				</p>
				<!-- ## 안내문구 ## -->
				<div class="section line">
					<div class="box-mes3">
						<h2 class="heading">안내</h2>
						<ul class="txt-type1">
							<li>전문상담원과의 상담은 평일 08시 30분부터 17시 30분까지 이용하실 수 있습니다.</li>
							<li>상담 가능시간 외 이메일 상담을 이용하신 고객님께는 익일 상담시간 내 최대한 빠르게 답변해 드리겠습니다.</li>
							<li>원격지원을 요청하신 고객님께서는 상담원과 통화 후 연결이 진행됩니다.</li>
						</ul>
					</div>
				</div>
				<div id="popCounselTelOverlay" class="modal-overlay" style="width: 1306px; height: 1305px; display: none;"></div>
				<div id="popCounselTel" class="pop-modal3" style="top: 86px; margin-left: -295px;">
					<div class="header">
						<h2>전화 상담예약</h2>
						<button type="button" class="ui-close">
							전화 상담예약 닫기<span></span>
						</button>
					</div>
					<div class="content">
						<!-- # 상담신청입력폼 # -->
						<h3 class="mes-top">상담을 신청하는 분과 원하시는 예약 정보를 입력해 주세요.</h3>
						<fieldset class="form-content3">
							<legend>전화상담예약 신청정보입력</legend>
							<dl>
								<dt class="heading">
									<label for="customerName">이름</label>
								</dt>
								<dd class="wrap">
									<input type="text" class="text" id="applyUserName" title="신청인 이름" style="ime-mode: active;" maxlength="30" name="name" /> &nbsp; <span class="heading"><label for="applyUserName">작성일</label></span> <input type="text" class="text" id="applyUserName" title="신청날짜" style="ime-mode: active;" maxlength="30" name="regidate" value="${str }" />
								</dd>
							</dl>

							<dl>
								<dt class="heading">
									<span class="label">연락처</span>
								</dt>
								<dd class="wrap">
									<div class="form-telnum">
										<span class="select-box"> <select title="연락처(앞자리)" id="telNum1">
												<option>010</option>
												<option>011</option>
												<option>016</option>
												<option>017</option>
												<option>018</option>
												<option>019</option>
											</select>
										</span>
										<div class="form-wrap1">
											<label for="telNum2" class="label">-없이 번호만 입력해주세요.</label> <input maxlength="8" type="text" id="telNum2" class="text placeholder numOnly">
										</div>
									</div>
								</dd>
							</dl>
							<dl>
								<dt class="heading">
									<label for="telYear1">예약시간</label>
								</dt>
								<dd class="wrap">
									<div class="form-wrap2">
										<div class="form-wrap1">

											<script type="text/javascript">
												var d = new Date();
												var year = (d.getFullYear())
														.toString();
												var month = (d.getMonth() + 1)
														.toString();
												var day = (d.getDate())
														.toString();

												if (month.length < 2)
													month = '0' + month;
												if (day.length < 2)
													day = '0' + day;
											</script>

											<label for="telYear1" class="label"> <script>
												document.write(year + month
														+ day);
											</script>20180902
											</label> <span class="form-date"> <input maxlength="8" type="text" id="telYear1" class="text placeholder hasDatepicker valueon" title="1순위 예약시간 날짜 : 예) 20160101 (네자리년도/두자리월/두자리일)" readonly="">
												<button type="button" class="ui-datepicker-trigger" style="text-indent: -9999em; width: 38px; height: 39px;">
													달력으로 선택<span style="left: 2px; top: 2px;"></span>
												</button>
											</span>
										</div>
										<span class="select-box"> <select id="telStartTime1" title="1순위 예약시간 시작시간(단위:시)">
												<option>09</option>
												<option>10</option>
												<option>11</option>
												<option>12</option>
												<option>13</option>
												<option>14</option>
												<option>15</option>
												<option>16</option>
											</select>
										</span> <span>시~ </span> <span id="telEndTime1" class="select-box"> <select title="1순위 예약시간 종료시간(단위:시)">
												<option>10</option>
												<option>11</option>
												<option>12</option>
												<option>13</option>
												<option>14</option>
												<option>15</option>
												<option>16</option>
												<option>17</option>
											</select>
										</span> <span>시 <span class="hd">(1순위)</span></span>
										<button onclick="addTel()" class="btn-type2 c2">
											<span>추가</span><span class="hd">(클릭하시면 2순위 예약시간 및 날짜를 추가입력하실 수 있습니다.)</span>
										</button>
									</div>
									<div class="form-wrap2" id="addTel" style="display: none">
										<div class="form-wrap1">
											<label for="telYear2" class="label">예) <script type="text/javascript">
												document.write(year + month
														+ day);
											</script>20180902
											</label> <span class="form-date"> <input type="text" id="telYear2" class="text placeholder hasDatepicker" title="2순위 예약시간 날짜 : 예) 20160101 (네자리년도/두자리월/두자리일)" readonly="">
												<button type="button" class="ui-datepicker-trigger" style="text-indent: -9999em; width: 38px; height: 39px;">
													달력으로 선택<span style="left: 2px; top: 2px;"></span>
												</button>
											</span>
										</div>
										<span class="select-box"> <select id="telStartTime2" title="2순위 예약시간 시작시간(단위:시)" disabled="disabled">
												<option>09</option>
												<option>10</option>
												<option>11</option>
												<option>12</option>
												<option>13</option>
												<option>14</option>
												<option>15</option>
												<option>16</option>
											</select>
										</span> <span>시~ </span> <span class="select-box"> <select id="telEndTime2" title="2순위 예약시간 종료시간(단위:시)" disabled="disabled">
												<option>10</option>
												<option>11</option>
												<option>12</option>
												<option>13</option>
												<option>14</option>
												<option>15</option>
												<option>16</option>
												<option>17</option>
											</select>
										</span> <span>시 <span class="hd">(2순위)</span></span>
										<button onclick="removeTel()" class="btn-type2 c2">
											<span>제거</span><span class="hd">(클릭하시면 2순위 예약시간 및 날짜를 제거 하실 수 있습니다.)</span>
										</button>
									</div>
								</dd>
							</dl>
							<dl class="block">
								<dt class="hd">문의내용</dt>
								<dd class="wrap">
									<div class="form-wrap1 textform">
										<label for="applyCounselMemo2" class="label">상담에 대한 간략한 내용과 함께 문의가 필요한 보험상품과<br>본인 정보등을 함께 작성해 주시면, 보다 빠른 상담이 가능합니다.
										</label>
										<textarea rows="4" cols="20" id="applyCounselMemo2" class="textarea placeholder valueon" title="문의내용(2000자까지 입력가능)" maxlength="2000" onkeyup="checkByte2(this, '2000', 'applyCounselMemoLength2')" style="ime-mode: active;">아래 내용을 기입해 주시면 보다 빠르고 자세한 상담이 가능합니다.
- 문의상품 :
- 생년월일 :
- 성       별 :
- 문의내용 :
                              </textarea>
									</div>

									<div class="txt-sub">
										<span class="txt-num">(<em id="applyCounselMemoLength2">0</em>/2000자)
										</span>
									</div>
								</dd>
							</dl>
						</fieldset>
						<!-- # 개인정보동의  # -->
						<div class="form-agree3">
							<fieldset>
								<legend>개인정보를 위한 이용자 동의사항 안내입니다.</legend>
								<div class="box-scroll" tabindex="0">
									<div class="con-policy">
										<h3 class="tit1">개인정보 수집 및 이용에 관한 동의</h3>
										<p>당사는 개인정보보호법에 따라 본 서비스와 관련하여 고객님의 개인 정보를 다음과 같이 수집/이용하고자 합니다.</p>
										<h4 class="tit2">1. 수집 및 이용목적</h4>
										<p>본인의 확인 및 해당 서비스 이용</p>
										<h4 class="tit2">2. 수집하는 개인정보 항목</h4>
										<ul>
											<li>개인식별정보(성명, 전화번호)</li>
											<li>홈페이지 접속정보 및 서비스 이용정보</li>
										</ul>
										<h4 class="tit2">3. 보유 및 이용기간</h4>
										<p>동의일로부터 1년</p>
										<p>고객님이 삼성생명보험주식회사에 대하여 '별도의 개인(신용)정보에 관한 동의'를 한 경우 (금융거래 등 상거래의 체결 유지 관리 목적 등)로서 해당 동의목적으로 위 개인정보가 수집 및 이용되는 경우에는 해당 동의에 따른 보유 및 이용기간이 적용됩니다.</p>
									</div>
								</div>
								<div class="btn">
									<span class="label-radio"> <label for="telCounselAgreechk1" class="on">동의함</label> <input type="radio" name="telCounselAgreeCheck" class="radio" id="telCounselAgreechk1" checked="checked" title="개인정보를 위한 이용자 동의사항 동의함">
									</span> <span class="label-radio"> <label for="telCounselAgreechk2">동의하지 않음</label> <input type="radio" name="telCounselAgreeCheck" class="radio" id="telCounselAgreechk2" title="개인정보를 위한 이용자 동의사항 동의하지 않음">
									</span>
								</div>
							</fieldset>
						</div>
						<!-- # 하단버튼  # -->
						<div class="btn-area">
							<a href="#none" class="btn-type2 ui-close"><span>취소</span></a> <a href="#none" class="btn-type2 c1" id="sendTelCounsel" onclick="ga('send','event','Direct','Etc','Rightside-Navi_Counsil_done',1);"><span>상담신청</span></a>
						</div>
					</div>
				</div>
				<div id="popCounselEmail" class="pop-modal3">
					<div class="header">
						<h2>이메일 상담</h2>
						<button type="button" class="ui-close">
							이메일 상담 닫기<span></span>
						</button>
					</div>
					<div class="content">
						<!-- # 상담신청입력폼 # -->
						<h3 class="mes-top">이메일 주소와 상담하실 내용을 입력해 주세요.</h3>
						<form id="form" src="<%=request.getContextPath()%>/custom/sendemail" method="post" action="mailTest.do">
							<fieldset class="form-content3">
								<legend>이메일상담 신청정보입력</legend>
								<dl>
									<dt class="heading">
										<label for="applyUserName">이름</label>
									</dt>
									<dd class="wrap">
										<input type="text" class="text" name="name" id="applyUserName" title="신청인 이름" style="ime-mode: active;" maxlength="30" /> 
										&nbsp;
										<span class="heading"><label for="applyUserName">작성일</label></span> 
										<input type="text" class="text" id="applyUserName" title="신청날짜" style="ime-mode: active;" maxlength="30" name="regidate" value="${str }" />
									</dd>
								</dl>
								<dl>
									<dt class="heading">
										<span class="label">연락처</span>
									</dt>
									<dd class="wrap">
										<div class="form-telnum">
											<span class="select-box"> <select title="연락처(앞자리)" id="telNum1" name="mobile1">
													<option>010</option>
													<option>011</option>
													<option>016</option>
													<option>017</option>
													<option>018</option>
													<option>019</option>
												</select>
											</span>
											<div class="form-wrap1">
												<label for="telNum3" class="label">-없이 번호만 입력해주세요.</label> <input maxlength="8" type="text" id="telNum3" class="text placeholder numOnly" name="mobile2">
											</div>
										</div>
									</dd>
								</dl>
								<dl>
									<dt class="heading">
										<label for="applyUserEmail1">이메일</label>
									</dt>
									<dd class="wrap">
										<script>
											function email_input(em, frm) {
												//선택한 select의 값이 빈값이 아닐때만 동작
												if (em.value != "") {
													if (em.value == "1") {
														//직접입력 선택한 경우
														//readonly속성 해제
														frm.email2.readOnly = false;
														//도메인부분 비워주기
														frm.email2.value = "";
													} else {
														//도메인을 선택한 경우
														//선택한 도메인을 입력한다.
														frm.email2.value = em.value;
														//readonly속성을 활성화한다.
														frm.email2.readOnly = true;
													}
												}
											}
										</script>
										<div class="form-email">
											<input type="text" id="applyUserEmail1" class="text" name="email1" style="ime-mode: disabled;"> <span class="unit">@</span> <input type="text" id="applyUserEmail2" class="text" name="email2" style="ime-mode: disabled;" readonly /> <span class="select-box"> <select name="" id="" onChange="email_input(this,this.form);">
													<option>선택하세요</option>
													<option value="1">직접입력</option>
													<option value="dreamwiz.com">dreamwiz.com</option>
													<option value="empal.com">empal.com</option>
													<option value="empas.com">empas.com</option>
													<option value="freechal.com">freechal.com</option>
													<option value="hanafos.com">hanafos.com</option>
													<option value="hanmail.net">hanmail.net</option>
													<option value="hotmail.com">hotmail.com</option>
													<option value="intizen.com">intizen.com</option>
													<option value="korea.com">korea.com</option>
													<option value="kornet.net">kornet.net</option>
													<option value="msn.co.kr">msn.co.kr</option>
													<option value="nate.com">nate.com</option>
													<option value="naver.com">naver.com</option>
													<option value="netian.com">netian.com</option>
													<option value="orgio.co.kr">orgio.co.kr</option>
													<option value="paran.com">paran.com</option>
													<option value="sayclub.com">sayclub.com</option>
													<option value="yahoo.co.kr">yahoo.co.kr</option>
													<option value="yahoo.com">yahoo.com</option>
												</select>
											</span>
										</div>
									</dd>
								</dl>
								<dl class="block">
									<dt class="hd">문의내용</dt>
									<dd class="wrap">
										<div class="form-wrap1 textform">
											<label for="popEmailapplyCounselMemo" class="label">상담에 대한 간략한 내용과 함께 문의가 필요한 보험상품과<br />본인 정보등을 함께 작성해 주시면, 보다 빠른 상담이 가능합니다.
											</label>
											<textarea rows="4" name="contents" cols="20" id="popEmailapplyCounselMemo" class="textarea placeholder" title="문의내용(2000자까지 입력가능)" maxlength="2000" onkeyup="checkByte2(this, '2000', 'popEmailContentLength')" style="ime-mode: active;">아래 내용을 기입
- 문의상품 :
- 생년월일 :
- 성       별 :
- 문의내용 :
                              </textarea>
										</div>
										<div class="txt-sub">
											<span class="txt-num">(<em id="popEmailContentLength">0</em>/2000자)
											</span>
										</div>
									</dd>
								</dl>
							</fieldset>
							<!-- # 개인정보동의  # -->
							<div class="form-agree3">
								<fieldset>
									<legend>개인정보를 위한 이용자 동의사항 안내입니다.</legend>
									<div class="box-scroll" tabindex="0">
										<div class="con-policy">
											<h3 class="tit1">개인정보 수집 및 이용에 관한 동의</h3>
											<p>당사는 개인정보보호법에 따라 본 서비스와 관련하여 고객님의 개인 정보를 다음과 같이 수집/이용하고자 합니다.</p>
											<h4 class="tit2">1. 수집 및 이용목적</h4>
											<p>본인의 확인 및 해당 서비스 이용</p>
											<h4 class="tit2">2. 수집하는 개인정보 항목</h4>
											<ul>
												<li>개인식별정보(성명, e-mail)</li>
												<li>홈페이지 접속정보 및 서비스 이용정보</li>
											</ul>
											<h4 class="tit2">3. 보유 및 이용기간</h4>
											<p>동의일로부터 1년</p>
											<p>고객님이 삼성생명보험주식회사에 대하여 '별도의 개인(신용)정보에 관한 동의'를 한 경우 (금융거래 등 상거래의 체결 유지 관리 목적 등)로서 해당 동의목적으로 위 개인정보가 수집 및 이용되는 경우에는 해당 동의에 따른 보유 및 이용기간이 적용됩니다.</p>
										</div>
									</div>
									<div class="btn">
										<span class="label-radio"> <label for="counselAgreechk1" class="on">동의함</label> <input type="radio" name="mailAgree" class="radio" id="counselAgreechk1" checked="checked" title="개인정보 수집 및 이용에 관한 동의 동의함" />
										</span> <span class="label-radio"> <label for="counselAgreechk2">동의하지 않음</label> <input type="radio" name="mailAgree" class="radio" id="counselAgreechk2" title="개인정보 수집 및 이용에 관한 동의 동의하지 않음" />
										</span>
									</div>
								</fieldset>
							</div>
							<script type="text/javascript">
								$(function() {
									$('#send').click(function() {
										$('#form').submit();
									});
								});
							</script>

							<!-- # 하단버튼 # -->
							<div class="btn-area">
								<a href="#none" class="btn-type2 ui-close"><span>취소</span></a> <a href="#send" class="btn-type2 c1" id="send"><span>상담신청</span></a>
							</div>
						</form>
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