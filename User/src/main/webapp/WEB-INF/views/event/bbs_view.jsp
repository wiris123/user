<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="dto" value="${vo }" />
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
			<div id="content" class="page-event-view">
				<!-- ## 이벤트정보 ##  -->
				<div class="board-view">
					<!-- # 기본정보 : 제목/기간/조회수/당첨자발표일/SNS링크 # -->
					<div class="heading">

						<h1>${dto.title }<em class="icon-state2 icon1"><span>진행전</span></em>
						</h1>



						<ul class="info-basic">

							<li>기간 : ${dto.regidate }</li>


							<li>당첨자 발표일 : ${dto.regidate }</li>

							<li class="last">조회수 : ${dto.viewcnt }</li>
						</ul>
						<div class="info-btn">
							<a href="#none" id="facebook" class="icon-sns sns2" title="페이스북 공유하기" title="새창">페이스북 공유하기</a> <a href="#none" id="naverBlog" class="icon-sns sns3" title="블로그 공유하기" title="새창">블로그 공유하기</a>
						</div>
					</div>
					<!-- # 상세정보 # -->
					<div class="wrap-img" id="eventBody">${dto.contents }</div>
					<img src="/img/${dto.attfile}" alt="" />

				</div>
				<!-- # 응모하기 : 템플릿2 맞춤설계형 # -->
				<div class="event-template2">
					<!-- case1 : 상품1개일때 : 기본형사용 -->








				</div>
				<!-- ## 안내문구 및 이동 버튼 ##  -->
				<div class="btn-area"></div>

				<div class="btn-area">
					<a href="<%=request.getContextPath() %>/event/bbs_event?nowPage=${param.nowPage }" class="btn-type1 c2"><span>목록보기</span></a>
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