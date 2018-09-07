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

				<h2 name="fixedEventList" class="hd">진행중인 이벤트</h2>
				<div class="banner-visual" name="fixedEventList">
					<div class="banner ui-banner1" id="fixedEventList">
						<div class="bx-wrapper" style="max-width: 100%;">
							<div class="bx-viewport" aria-live="polite" style="width: 100%; overflow: hidden; position: relative; height: 380px;">
								<ul class="list" style="width: 3215%; position: relative; transition-duration: 0s; transform: translate3d(0px, 0px, 0px);">
									<li aria-hidden="false" style="float: left; list-style: none; position: relative; width: 970px;"><a href="/event/view.eds?id=1914&amp;page=1"><strong class="tit">18.9월 보험료 결과발송 이벤트</strong><img src="https://direct.samsunglife.com/upload/201808/5634.jpg" alt="18.9월 보험료 결과발송 이벤트"></a></li>
								</ul>
							</div>
							<div class="bx-controls bx-has-controls-auto bx-has-pager">
								<div class="bx-controls-auto">
									<div class="bx-controls-auto-item">
										<a class="bx-start" href="">Start</a>
									</div>
									<div class="bx-controls-auto-item">
										<a class="bx-stop active" href="">Stop</a>
									</div>
								</div>
								<div class="bx-pager bx-custom-pager">
									<div class="bx-pager-item">
										<a href="" data-slide-index="0" class="bx-pager-link active"><span>18.9월 보험료 결과발송 이벤트</span></a>
									</div>
									<div class="bx-pager-item">
										<a href="" data-slide-index="1" class="bx-pager-link"><span>18.9월 9ood가입이벤트</span></a>
									</div>
									<div class="bx-pager-item">
										<a href="" data-slide-index="2" class="bx-pager-link"><span>18.9월 노후연금력 계산이벤트</span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<h2 class="hd">이벤트목록</h2>
				<ul class="board-img btn" id="eventList">

					<c:forEach items="${list }" var="rows">

						<li class="state1"><a href="<%=request.getContextPath() %>/event/bbs_view?num=${rows.num }&nowPage=${param.nowPage}"> <span class="visual"><img src="https://direct.samsunglife.com/upload/201808/5635.jpg" alt="18.9월 보험료 결과발송 이벤트"> </span> <strong class="tit">${rows.title }</strong><em class="icon-state2 icon1"><span>진행중</span></em> <span> ${rows.title }&nbsp;</span> <em class="date">${rows.regidate }</em>
						</a>
							<div class="btn"></div></li>
					</c:forEach>

				</ul>

				<div class="paging">
					${pagingImg }
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