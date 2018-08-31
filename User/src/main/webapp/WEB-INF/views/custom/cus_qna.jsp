<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>고객센터</title>
</head>
<body>
	<div id="wrapper">

		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
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
								<strong>어떤 내용이 궁금하신가요?</strong> 전화 상담 예약을 하시면 원하는 시간에 전문상담원이
								연락드립니다.
							</p>
							<ul class="info">
								<li><strong class="tel">080<span>-</span>789<span>-</span>3300
								</strong></li>
								<li>상담가능시간 - (평일) 08:30-17:30</li>
							</ul>
							<a href="#" onclick="openPopCounsel('telReserve', this)"
								class="btn-sub btn-type2 c1"><span>전화상담 예약</span></a>
						</div>
					</div>
					<div class="line"></div>
				</div>
				<!-- ## 상담방법목록 ## -->
				<ul class="counsel-list">
					<li class="list1"><a href="#"
						onclick="openPopCounsel('chat');"> <strong><span>채팅</span>상담</strong>
							<em name="chatStatus" class="icon-state off">OFF</em>
					</a></li>
					<li class="list2"><a href="#"
						onclick="cus_qna_email.jsp"> <strong><span>이메일</span>상담</strong>
							<em name="emailStatus" class="icon-state on">ON</em>
					</a></li>
					<li class="list3"><a href="#"
						onclick="openPopCounsel('remote');"> <strong><span>1:1문의</span>요청</strong>
							<em name="remoteStatus" class="icon-state on">ON</em>
					</a></li>
				</ul>
				<p class="mes-type1">
					궁금하신 내용은 언제든지 부담없이 저희 상담원에게 물어보세요.<br />가입을 유도하거나 권유하지 않고, <strong
						class="txt-c1">전문상담원이 친절하고 자세하게 답변</strong>해드립니다.
				</p>
				<!-- ## 안내문구 ## -->
				<div class="section line">
					<div class="box-mes3">
						<h2 class="heading">안내</h2>
						<ul class="txt-type1">
							<li>전문상담원과의 상담은 평일 08시 30분부터 17시 30분까지 이용하실 수 있습니다.</li>
							<li>상담 가능시간 외 이메일 상담을 이용하신 고객님께는 익일 상담시간 내 최대한 빠르게 답변해
								드리겠습니다.</li>
							<li>원격지원을 요청하신 고객님께서는 상담원과 통화 후 연결이 진행됩니다.</li>
						</ul>
					</div>
				</div>
				
				<div id="popCounselEmail" class="pop-modal3">
					<div class="header">
						<h2>이메일 상담</h2>
						<button type="button" class="ui-close">이메일 상담 닫기<span></span></button>
					</div>
					<div class="content">
						<!-- # 상담신청입력폼 # -->
						<h3 class="mes-top">이메일 주소와 상담하실 내용을 입력해 주세요.</h3>
						<fieldset class="form-content3">
							<legend>이메일상담 신청정보입력</legend>
							<dl>
								<dt class="heading"><label for="applyUserName">작성자</label></dt>
								<dd class="wrap">
									<input type="text" class="text" id="applyUserName" title="신청인 이름" style="ime-mode:active;" maxlength="30"/>
								</dd>
							</dl>
							<dl>
								<dt class="heading"><label for="applyUserMobile">모바일</label></dt>
								<dd class="wrap">
									<div>
										<input type="text" class="text" id="applyUserMobile" title="모바일" style="ime-mode:active;" maxlength="30"/>
										<span class="unit">-</span>
										<input type="text" class="text" id="applyUserMobile" title="모바일" style="ime-mode:active;" maxlength="30"/>
										<span class="unit">-</span>
										<input type="text" class="text" id="applyUserMobile" title="모바일" style="ime-mode:active;" maxlength="30"/>
									</div>
								</dd>
							</dl>
							<dl>
								<dt class="heading"><label for="applyUserEmail1">이메일</label></dt>
								<dd class="wrap">
									<div class="form-email">
										<input type="text" class="text" id="applyUserEmail1" title="이메일아이디" style="ime-mode:disabled;"/>
										<span class="unit">@</span>
										<input type="text" class="text " id="applyUserEmail2" title="이메일도메인" style="ime-mode:disabled;"/>
										<span class="select-box">
											<select title="이메일도메인 선택" id="popEmailCombobox">
												<option>직접입력</option>
												<option>naver.com</option>
												<option>daum.net</option>
												<option>nate.com</option>
												<option>gmail.com</option>
												<option>hotmail.com</option>
												<option>hanmail.net</option>
												<option>chol.com</option>
												<option>dreamwiz.com</option>
											</select>
										</span>
									</div>
								</dd>
							</dl>
							<dl class="block">
								<dt class="hd">문의내용</dt>
								<dd class="wrap">
									<div class="form-wrap1 textform">
										<label for="popEmailapplyCounselMemo" class="label">상담에 대한 간략한 내용과 함께 문의가 필요한 보험상품과<br/>본인 정보등을 함께 작성해 주시면, 보다 빠른 상담이 가능합니다.</label>
										<textarea rows="4" cols="20" id="popEmailapplyCounselMemo" class="textarea placeholder" title="문의내용(2000자까지 입력가능)" maxlength="2000" onkeyup="checkByte2(this, '2000', 'popEmailContentLength')" style="ime-mode:active;">
												아래 내용을 기입해 주시면 보다 빠르고 자세한 상담이 가능합니다.
												- 문의상품 :
												- 생년월일 :
												- 성       별 :
												- 문의내용 :
										</textarea>
									</div>
									<div class="txt-sub"><span class="txt-num">(<em id="popEmailContentLength">0</em>/2000자)</span></div>
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
									<span class="label-radio">
										<label for="counselAgreechk1" class="on">동의함</label>
										<input type="radio" name="mailAgree" class="radio" id="counselAgreechk1" checked="checked" title="개인정보 수집 및 이용에 관한 동의 동의함"/>
									</span>
									<span class="label-radio">
										<label for="counselAgreechk2">동의하지 않음</label>
										<input type="radio" name="mailAgree" class="radio" id="counselAgreechk2" title="개인정보 수집 및 이용에 관한 동의 동의하지 않음"/>
									</span>
								</div>
							</fieldset>
						</div>
						<!-- # 하단버튼 # -->
						<div class="btn-area">
							<a href="#none" class="btn-type2 ui-close"><span>취소</span></a>
							<a href="#none" class="btn-type2 c1" id="sendEmailCounsel" onclick="ga('send','event','Direct','Etc','Rightside-Navi_email_done',1);"><span>상담신청</span></a>
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