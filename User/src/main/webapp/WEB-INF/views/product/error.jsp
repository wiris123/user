<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>가입 완료</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용시작 -->
			<div id="content" class="page-guide">
			<script type="text/javascript"> 
				var message = "오류입니다. 관리자에게 문의해주십시오. 메인으로 돌아갑니다."; 
				if(message!="")
				{
					alert(message);
					document.location.href = "../"; 
				}
			</script>
						
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>