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
		<%@ include file="../include/header.jsp"  %>
		<div id="container">
			<%@ include file="../include/Head.jsp" %>
			
			<!-- 내용시작 -->
			<c:choose>
				 <c:when test="${not empty rows }">
					 <div class="row" style="border:2px solid #cccccc" padding="10px">
						 <h4>	아이디 : ${rows.id }
						 	   이름 : ${rows.name }</h4>
					 <br />
					 <br />
					 <button onclick="location.href='./logout.do'"> 로그아웃</button>
					 </h4></div>
				 </c:when>
					 <c:otherwise>
			         <div class="row" style="border:1px solid #dddddd; padding:10px;">
				         <form name="loginForm" method="post" action="../member/loginAction.do" onsubmit="">      
				           <input type="hid den" name="backUrl" value="${param.backUrl }"/>
				            <div class="col-sm-3"></div>
				            <div class="col-sm-5">
				               <div class="input-group">
				                  <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
				                  <input type="text" class="form-control" name="id" placeholder="아이디">
				               </div>
				               <div class="input-group" style="margin-top:10px;">
				                  <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
				                  <input type="password" class="form-control" name="pass" placeholder="패스워드">
				               </div>
				                <span style="font-size:1.5em; color:red;">${LoginNG }</span>
				            </div>
				            <div class="col-sm-1">
				               <button type="submit" class="btn btn-primary" style="height:77px; width:77px;">로그인</button>
				            </div>
				            <div class="col-sm-3"></div>     
				         </form>
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
