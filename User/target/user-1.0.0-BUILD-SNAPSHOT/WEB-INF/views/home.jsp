<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
</head>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
		<%@ include file="./include/header.jsp"  %>
		<div id="container">
			<%@ include file="./include/Head.jsp" %>
			
			<!-- 내용시작 -->
			<div id="content">
<<<<<<< HEAD
				<ul class="tab-type1">
				<li><a href="/myPageHome.eds">마이페이지</a></li>
				<li class="on"><a href="#none" id="holdingContractCount">보유계약조회</a></li>
				<!-- <li><a href="/myPageContractProgress.eds">계약진행 조회<em>1<span>건</span></em></a></li> -->
				<li><a href="/myPageContinueSubscribe.eds" id="continueSubscribeCount">가입 계속하기<em>3<span>건</span></em></a></li>
=======
<<<<<<< HEAD
		
				<a href="./guide/gde_before" target="_blank">가입전 가이드</a> <br />
				<a href="./guide/gde_after" target="_blank">가입후 가이드</a> <br />
				<a href="./guide/gde_annual" target="_blank">연금가입 가이드</a> <br />
				<a href="./member/join" target="_blank">회원가입</a> <br />
				<a href="./member/joinCheck" target="_blank">약관동의</a>
>>>>>>> branch 'master' of https://github.com/wiris123/user
				
<<<<<<< HEAD
				<li><a href="/myPageEvent.eds" id="eventCount">나의 이벤트</a></li>
				
				
				<li class="last"><a href="/myPageConsult.eds" id="consultCount">나의 상담</a></li>
				
			</ul>
=======
			
=======
				
>>>>>>> branch 'master' of https://github.com/wiris123/user.git
>>>>>>> branch 'master' of https://github.com/wiris123/user
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
</body>
</html>