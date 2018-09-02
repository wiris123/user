<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>이벤트</title>

</head>
<body>
   <div id="wrapper">
   
      <!-- 머리 -->
      <%@ include file="../include/header.jsp"  %>
      <div id="container">
         <%@ include file="../include/Head.jsp" %>
         
         <!-- 내용시작 -->
         <div id="content" class="page-event">
			<div class="tit-page">
				<h1>이벤트</h1>
			</div>

			<h2 name="fixedEventList" class="hd">진행중인 이벤트</h2>
			<div class="banner-visual" name="fixedEventList">
				<div class="banner ui-banner1" id="fixedEventList">
				</div>
			</div>

			<h2 class="hd">이벤트목록</h2>
			<ul class="board-img btn" id="eventList">
			</ul>

			<div class="paging">
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