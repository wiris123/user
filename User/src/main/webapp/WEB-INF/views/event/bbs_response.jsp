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

				<!-- ## 상단 중요공지사항 : @2015-12-02 : 신규추가 ## -->
				<div class="box-content visual">
					<div class="line"></div>
					<div>
						<div class="banner-bbs">
							<div class="banner ui-banner1">
								<div class="bx-wrapper" style="max-width: 100%;">
									<div class="bx-viewport" aria-live="polite" style="width: 100%; overflow: hidden; position: relative; height: 116px;">
										<ul class="list" id="fixedNotice" style="width: auto; position: relative; transition-duration: 0.5s; transform: translate3d(0px, -232px, 0px);">
											<li aria-hidden="true" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1655')">보험 가입 일시 중단 안내</a></strong> <em class="date">2017-09-20</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre></pre>
													</div>
												</div>
											</li>
											<li aria-hidden="true" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1581')">크롬 사용자 청약시 유의사항 안내</a></strong> <em class="date">2017-04-21</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre></pre>
													</div>
												</div>
											</li>
											<li aria-hidden="false" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1451')">2016 소비자평가 No.1 브랜드 대상 선정!</a></strong> <em class="date">2016-08-03</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre>"2016 소비자평가 No.1 브랜드 대상"에서
인터넷 생명보험 부문, No.1 브랜드로 선정!!</pre>
													</div>
												</div>
											</li>
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
												<a href="" data-slide-index="0" class="bx-pager-link">주요공지사항1</a>
											</div>
											<div class="bx-pager-item">
												<a href="" data-slide-index="1" class="bx-pager-link">주요공지사항2</a>
											</div>
											<div class="bx-pager-item">
												<a href="" data-slide-index="2" class="bx-pager-link active">주요공지사항3</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="line"></div>
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

						<li id="view_1859"><a href="#list?searchWhere=all&amp;searchText=[공지] 전자금융약거래약관 내용변경 안내&amp;page=1&amp;id=1859" class="tit" title="상세내용열기"> <span class="num">${totalCount - (nowPage + stat.index) }</span>${rows.title }<span class="check">
							<c:if test="${rows.reply eq 1 }">
							<img src="<%=request.getContextPath() %>/resources/images/bt_ing.gif" />
							</c:if>
							<c:if test="${rows.reply eq 0 }">
							<img src="<%=request.getContextPath() %>/resources/images/bt_end.gif" />
							</c:if>
						</span><em class="date">${rows.regidate }</em>
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