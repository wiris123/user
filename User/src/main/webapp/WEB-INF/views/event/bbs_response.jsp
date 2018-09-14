<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">

		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content" class="page-notice">
				<!-- ## 페이지타이틀 ## -->
				<div class="tit-page">
					<h1>1:1 문의 요청</h1>
				</div>

				<!-- ## 상단 중요공지사항 : @2015-12-02 : 신규추가 ## -->




				<!-- ## 게시물출력 ## -->
				<ul class="board-list" id="noticeList">
					<c:set var="totalCount" value="${totalCount }" />
					<c:set var="nowPage" value="${(param.nowPage-1)*10 }" />

					<c:forEach items="${list }" var="rows" varStatus="stat">

						<li id="view_1859"><a href="#list?searchWhere=all&amp;searchText=[공지] 전자금융약거래약관 내용변경 안내&amp;page=1&amp;id=1859" class="tit" title="상세내용열기"> <span class="num">${totalCount - (nowPage + stat.index) }</span>${rows.title }<span class="check"> <c:if test="${rows.reply eq 1 }">
										<img src="<%=request.getContextPath()%>/resources/images/bt_end.gif" />
									</c:if>
									 <c:if test="${rows.reply eq 0 }">
										<img src="<%=request.getContextPath()%>/resources/images/bt_ing.gif" />
									</c:if>
							</span><em class="date">${rows.regidate }</em>
						</a>
							<div class="con">
								<div class="wrap-admin">${rows.contents }</div>
								<c:if test="${rows.reply eq 1 }">
									-----------------------------------------------------------------------------------------------------<br>
									작성자 : ${rows.com_name }&nbsp;&nbsp;작성일자: ${rows.com_regidate }<br>
									답변입니다:<br>
									${rows.com_content }
								</c:if>
							</div>
							</li>
					</c:forEach>
				</ul>
									<ul class="nav-gnb">
				<li><a href="/user/member/joinCheck" class="gnb1"><span>글쓰기</span><em id="headerRecentPlanCount"></em></a></li>
				</ul>
				<!-- ## 페이징 ## -->
				<div class="paging">${pagingImg}</div>
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