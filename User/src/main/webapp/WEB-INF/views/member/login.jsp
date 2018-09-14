<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page session="true"%>
<html>
<head>
<title>Home</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">
		<script>
			$(function() {

				$("#naver").hide();
				$("#google").hide();

			});

			function fn_setInputUi(num) {
				$("#signTab1").parent("li").removeClass();
				$("#signTab2").parent("li").removeClass();

				//1: 공인인증, 2: 카카오
				if (num == 1) {
					$("#field").hide();
					$("#pass").hide();
					$("#naver").show();
					$("#google").show();
					$("#signTab1").parent("li").attr("class", "on");
				} else if (num == 2) {
					$("#naver").hide();
					$("#google").hide();
					$("#field").show();
					$("#name").show();
					$("#pass").show();
					$("#signTab2").parent("li").attr("class", "on");
				}
			}
		</script>
		
		<!-- 이름 : ${sessionScope.userInfo.name } -->
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용시작 -->
			<c:choose>
				<c:when test="${not empty USER_ID }">
					<%-- <div class="row" style="border: 2px solid #cccccc" padding="10px">
						<h4>아이디 : ${USER_ID } </h4> 님 환영합니다.
						<br /> <br />
						<button onclick="location.href='../logout'">로그아웃</button>
						</h4>
					</div> --%>
					<div id="content" class="page-guide">
							<!-- ## 페이지타이틀 ## -->
							<h1 class="hd">가입 후 가이드</h1>
							<div class="visual-top">
								<p> <br />
									<strong>${USER_ID }</strong>님
									환영합니다.<br />
								</p>
								<ul class="tab">
									<li><a href="<%=request.getContextPath() %>/member/mypage.do"><span><em>마이 페이지로</em> 가기</span></a></li>
									<li><a href="<%=request.getContextPath() %>/logout"><span><em>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;로그아웃</em></span></a></li>
								</ul>
							</div>
				</c:when>
				<c:otherwise>
					<div class="box-content4">
						<div class="line"></div>
						<div>
							<h1 class="heading">본인인증 로그인</h1>
							<div class="form-content1 small">
								<ul class="tab-type2">
									<li><a href="#none" onclick="fn_setInputUi(1);" id="signTab1"><span>SOCIAL 로그인</span></a></li>
									<li class="on"><a href="#none" onclick="fn_setInputUi(2);" id="signTab2"><span>로그인</span></a></li>
								</ul>
								<c:url value="/loginAction" var="loginUrl"/>
								<form name="form1" action="${loginUrl }" id="form1" autocomplete="off" method="post">
									<fieldset id="field">
										<legend>본인인증</legend>
										<!-- ## 이름 ##-->
										<dl>
											<dt class="heading">
												<label for="name">아이디</label>
											</dt>
											<dd class="wrap">
												<input type="text" class="text text-name" id="name" name="id" maxlength="12" style="ime-mode: active" />
											</dd>
										</dl>
										<dl>
											<dt class="heading">
												<label for="pass">비밀번호</label>
											</dt>
											<dd class="wrap">

												<input type="password" class="text" id="pass" name="pass" title="비밀번호" maxlength="12" />
												<!-- <span class="label-check btn-mouse">
														<label for="MousechkBox1" class="" id="labelMouseInput" onmousedown="fnMouseInputToggle(); return false;" onclick="return false;">마우스입력</label>
														<input type="checkbox" name="" class="check" id="MousechkBox1"/>
														 style="ime-mode:disabled;" onblur="javascript:checkNum(this);" onkeypress="if(event.keyCode==13){ login(); return false;}"
													</span> -->
											</dd>
										</dl>
										
									</fieldset>

									<div id="naver" style="text-align:center"><a href="${url}"><img width="223" src="${pageContext.request.contextPath}/resources/img/naver_Bn_Green.PNG"/></a></div>
									<div id="google" style="text-align:center"><a href="${google_url}"><img width="230" src="${pageContext.request.contextPath}/resources/img/btn_google.jpg"/></a></div>
									
									<div class="btn-area">
		                              <button class="btn-type2 c1" onClick='javascript:login();'>
		                                 <span>확인</span>
		                              </button>
		                              <button class="btn-type2 c1" onClick='javascript:login();'>
		                                 <a href="./sendpw.do"><span>아이디찾기</span></a>
		                              </button>
		                              <button class="btn-type2 c1" onClick='javascript:login();'>
		                                 <a href="./sendpw.do"><span>비밀번호찾기</span></a>
		                              </button>
		                           </div>
								</form>
							</div>
						</div>
						<dl>
						<div class="line"></div>
						<a href="" class="ban-mypage"><img src="resources/cms/pc/images/event/1808_mypage_ban.jpg" alt=""></a>
						
					</div>
					
		</div>
	</div>
	</c:otherwise>
	</c:choose>
	
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
