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
					<h1>공지사항</h1>
				</div>


				<!-- ## 상단검색 ## -->
				<div class="form-search">
					<fieldset>
						<legend>게시물검색</legend>
						<span class="select-box"> <select id="searchWhere" name="searchWhere" title="검색조건">
								<option value="all">전체</option>
								<option value="subject">제목</option>
								<option value="content">내용</option>
							</select>
						</span> <span class="form-wrap1"> <label for="searchText" class="label">검색어를 입력해보세요.</label> <input type="text" id="searchText" name="searchText" class="text placeholder" value="" title="게시물검색 검색어" autocomplete="off">
						</span> <a href="#none" class="btn-type2 c1" id="noticeSearch" rel="history"><span>검색</span></a>
					</fieldset>
				</div>

				<p class="txt-num">
					총 <em id="total">20</em>건
				</p>

				<!-- ## 게시물출력 ## -->
				<ul class="board-list" id="noticeList">
					<c:set var="totalCount" value="${totalCount }" />
					<c:set var="nowPage" value="${(param.nowPage-1)*10 }" />

					<c:forEach items="${list }" var="rows" varStatus="stat">

						<li id="view_1859"><a href="#list?searchWhere=all&amp;searchText=[공지] 전자금융약거래약관 내용변경 안내&amp;page=1&amp;id=1859" class="tit" title="상세내용열기"> <span class="num">${totalCount - (nowPage + stat.index) }</span>${rows.title }<em class="date">${rows.regidate }</em>
						</a>
							<div class="con">
								<div class="wrap-admin">${rows.contents }</div>
							</div></li>
					</c:forEach>
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