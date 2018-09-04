<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<html>
<head>
<title>로그인 창</title>
</head>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		
		<!-- 내용시작 -->
		<div id="wrapper">
	

		<!-- page : content /////////////////////////////////////////////////// -->
		<div id="content" class="page-login">
			<!-- ## 공인인증서 본인인증 ## -->
			<div class="box-content4">
				<div class="line"></div>
				<div>
					<h1 class="heading">본인인증 로그인</h1>
					<div class="form-content1 small">
						<ul class="tab-type2">
							<li>
								<img src="../resources/img/naver_Bn_Green.PNG" width="200" height="40"onclick="${url}">
								<!-- <a href="#none" onclick="fn_setInputUi(1);" id="signTab1"><span>네이버</span></a>	 -->
							</li>
							<li class="on">
								<img src="../resources/img/googlelogin.jpg"" width="200" height="40" onclick="location.href='../login/googlelogin.jsp'">	
								<!-- <a href="#none" onclick="fn_setInputUi(2);" id="signTab2"><span>구글</span></a> -->	
							</li>
						</ul>
						
						<form name="form1" id="form1" autocomplete="off" method="post" onsubmit="return false;">
							<fieldset>
								<legend>본인인증</legend>
								<!-- ## 이름 ##-->
								<dl>
									<dt class="heading"><label for="name">아이디</label></dt>
									<dd class="wrap">
										<input type="text" class="text text-name" id="name" name="name" maxlength="12" style="ime-mode:active"/>
									</dd>
								</dl>
								<dl>
									<dt class="heading"><label for="pass">비밀번호</label></dt>
									<dd class="wrap">
										
										<input type="password" class="text" id="pass" title="비밀번호" maxlength="12" style="ime-mode:disabled;" onblur="javascript:checkNum(this);" onkeypress="if(event.keyCode==13){ login(); return false;}" />
										<span class="label-check btn-mouse">
											<label for="MousechkBox1" class="" id="labelMouseInput" onmousedown="fnMouseInputToggle(); return false;" onclick="return false;">마우스입력</label>
											<input type="checkbox" name="" class="check" id="MousechkBox1"/>
										</span>
									</dd>
								</dl>
								
							</fieldset>
						</form>
						<div class="btn-area">
							<a href="#none" class="btn-type2 c1" onClick='javascript:login();'><span>확인</span></a>
						</div>
					</div>
				</div>
				<div class="line"></div>
					<a href="" class="ban-mypage"><img src="resources/cms/pc/images/event/1808_mypage_ban.jpg" alt=""></a>
				</div>
			</div>
		</div>

	
		</div>
		<!-- 내용끝 -->
		
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="./include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>

