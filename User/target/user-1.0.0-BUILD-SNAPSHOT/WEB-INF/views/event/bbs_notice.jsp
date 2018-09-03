<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항</title>

</head>
<body>
   <div id="wrapper">
   
      <!-- 머리 -->
      <%@ include file="../include/header.jsp"  %>
      <div id="container">
         <%@ include file="../include/Head.jsp" %>
         
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
						<div class="banner ui-banner1"></div>
					</div>
				</div>
				<div class="line"></div>
			</div>

			<!-- ## 상단검색 ## -->
			<div class="form-search">
				<fieldset>
					<legend>게시물검색</legend>
					<span class="select-box">
						<select id="searchWhere" name="searchWhere" title="검색조건">
							<option value="all">전체</option>
							<option value="subject">제목</option>
							<option value="content">내용</option>
						</select>
					</span>
					<span class="form-wrap1">
						<label for="searchText" class="label">검색어를 입력해보세요.</label>
						<input type="text" id="searchText" name="searchText" class="text placeholder" value="" title="게시물검색 검색어"/>
					</span>
					<a href="#none" class="btn-type2 c1" id="noticeSearch"><span>검색</span></a>
				</fieldset>
			</div>

			<p class="txt-num">총 <em id="total">0</em>건</p>

			<!-- ## 게시물출력 ## -->
			<ul class="board-list" id="noticeList"></ul>

			<!-- ## 페이징 ## -->
			<div class="paging"></div>
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