<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>고객센터</title>
</head>
<body>
   <div id="wrapper">
   
      <!-- 머리 -->
      <%@ include file="../include/header.jsp"  %>
      <div id="container">
         <%@ include file="../include/Head.jsp" %>
         
         <!-- 내용시작 -->
         <div id="content">
         <!-- page : content -->
		<div id="content" class="page-faq">
			<!-- ## 페이지타이틀 ## -->
			<div class="tit-page">
				<h1>자주하는 질문</h1>
			</div>
			<!-- ## 자주하는 질문 BEST5 ## -->
			<div class="box-content group">
				<div class="line"></div>
				<div>
					<div class="area1">
						<h2>질문 BEST 5</h2>
						<ol class="list-order" id="faqBest"></ol>
					</div>
					<div class="area2">
						<h2>인기키워드</h2>
						<div class="form-search3">
							<fieldset>
								<legend>자주 찾는 질문을 검색</legend>
								<span class="form-wrap1">
									<label for="searchText" class="label" id="faqSearchLabel">키워드를 입력해 주세요.</label>
									<input type="text" id="searchText" class="text placeholder" title="자주찾는 질문 키워드입력"/>
								</span>
								<button class="btn search" id="faqSearchButton"><span>검색</span></button>
							</fieldset>
						</div>
		
						<!-- 인기 키워드 -->
						<dl class="list-word2" id="topkeyword"></dl>
					</div>
				</div>
				<div class="line"></div>
			</div>
		
			<!-- ## 탭 ## -->
			<ul class="tab-type1" id="faqCategory">
				<li cate="depth1" name="NODE0000000109"><a href="#" onclick='location.href="#list?searchNode=NODE0000000109&page=1&cate=depth1"'>전체</a></li>
				<li cate="depth1" name="NODE0000000139" class="depth on"><a href="#" onclick='location.href="#list?searchNode=NODE0000000139&page=1&cate=depth1"'>보험상품</a>
					<ul>
						<li cate="depth2" name="NODE0000000139" class="on"><a href="#" onclick='location.href="#list?searchNode=NODE0000000139&page=1&cate=depth2"'>전체</a></li>
						
						<li cate="depth2" name="NODE0000000135"><a href="#" onclick='location.href="#list?searchNode=NODE0000000135&page=1&cate=depth2"'>연금보험</a></li>
						
						<li cate="depth2" name="NODE0000000118"><a href="#" onclick='location.href="#list?searchNode=NODE0000000118&page=1&cate=depth2"'>연금저축보험</a></li>
						
						<li cate="depth2" name="NODE0000000117"><a href="#" onclick='location.href="#list?searchNode=NODE0000000117&page=1&cate=depth2"'>저축보험</a></li>
						
						<li cate="depth2" name="NODE0000000141"><a href="#" onclick='location.href="#list?searchNode=NODE0000000141&page=1&cate=depth2"'>변액적립보험</a></li>
						
						<li cate="depth2" name="NODE0000000115"><a href="#" onclick='location.href="#list?searchNode=NODE0000000115&page=1&cate=depth2"'>암보험</a></li>
						
						<li cate="depth2" name="NODE0000000114"><a href="#" onclick='location.href="#list?searchNode=NODE0000000114&page=1&cate=depth2"'>정기보험</a></li>
						
						<li cate="depth2" name="NODE0000000116"><a href="#" onclick='location.href="#list?searchNode=NODE0000000116&page=1&cate=depth2"'>상해보험</a></li>
						
						<li cate="depth2" name="NODE0000000144"><a href="#" onclick='location.href="#list?searchNode=NODE0000000144&page=1&cate=depth2"'>실손보험</a></li>
						
						<li cate="depth2" name="NODE0000000146"><a href="#" onclick='location.href="#list?searchNode=NODE0000000146&page=1&cate=depth2"'>IRP</a></li>
						
						<li cate="depth2" name="NODE0000000147"><a href="#" onclick='location.href="#list?searchNode=NODE0000000147&page=1&cate=depth2"'>치아보험</a></li>
						
					</ul>
				</li>
				<li cate="depth1" name="NODE0000000119"><a href="#" onclick='location.href="#list?searchNode=NODE0000000119&page=1&cate=depth1"'>가입(청약)</a></li>
				<li cate="depth1" name="NODE0000000140"><a href="#" onclick='location.href="#list?searchNode=NODE0000000140&page=1&cate=depth1"'>가입 후</a></li>
				<li cate="depth1" name="NODE0000000120"><a href="#" onclick='location.href="#list?searchNode=NODE0000000120&page=1&cate=depth1"'>보험금지급</a></li>
				<li cate="depth1" name="NODE0000000121" class="last"><a href="#" onclick='location.href="#list?searchNode=NODE0000000121&page=1&cate=depth1"'>사이트이용</a></li>			
			</ul>
			<script type="text/javascript">
				<!--
				$plugin.togglecon($('.tab-type1 li'),{
					toggle_type : 'tab',
					selector_group : true,
					selector_btn: '>a',
					selector_con: '>ul',
					class_open : 'on',
					callback_after : function(){
						// console.log("내용이 변경됩니다.");
					}
				});
				//-->
			</script>
			<!-- ## 게시물출력 ## -->
			<p class="txt-num" id="totalcount">검색결과 <em>0</em></p>
			<p class="txt-num">&nbsp;</p>
			<ul class="board-list faq" id="uiFaqList"></ul>
			<script type="text/javascript">
			<!--
				$plugin.togglecon($('.board-list.faq > li'),{
					selector_group : true,
					selector_btn: '.tit',
					selector_con: '.con'
				});
			//-->
			</script>
			<!-- ## 페이징 ## -->
			<div class="paging"></div>
		
			<ul class="banner-type1 cust1">
				<li><a href="../../guide/guideBefore.html">내 보험은 어떻게 시작해야 할까요?</a></li>
				<li><a href="../../guide/guideAfter.html">내 보험은 어떻게 관리해야 할까요?</a></li>
			</ul>
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