<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>이벤트</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">
		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->

			<div id="content" class="page-event">
				<div class="tit-page">
					<h1>이벤트</h1>
				</div>



				<h2 class="hd">이벤트목록</h2>
				<ul class="board-img btn" id="eventList">

					<c:forEach items="${list }" var="rows">

						<li class="state1"><a href="<%=request.getContextPath() %>/event/bbs_view?num=${rows.num }&nowPage=${param.nowPage}"> <span class="visual"><img src="/img/${rows.attfile }" alt="18.9월 보험료 결과발송 이벤트"> </span> <strong class="tit">${rows.title }</strong><span> ${rows.title }&nbsp;</span> <em class="date">${rows.regidate }</em>
						</a>
							<div class="btn"></div></li>
					</c:forEach>

				</ul>

				<div class="paging">${pagingImg }</div>
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