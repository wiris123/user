<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
		
				<a href="./guide/gde_before" target="_blank">가입전 가이드</a> <br />
				<a href="./guide/gde_after" target="_blank">가입후 가이드</a> <br />
				<a href="./guide/gde_annual" target="_blank">연금가입 가이드</a> <br />
				<a href="./member/join" target="_blank">회원가입</a> <br />
				<a href="./member/joinCheck" target="_blank">약관동의</a>
				
			
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
