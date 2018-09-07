<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>

<script src="/webapp/resources/bootstrap3.3.7/jquery/jquery.wookmark.js"></script>
<style>
      #columns{
        column-width:170px;
        column-gap: 25px;
      }
      #columns figure{
        display: inline-block;
        border:1px solid rgba(0,0,0,0.2);
        margin:0;
        margin-bottom: 15px;
        padding:10px;
        box-shadow: 20px 10px 25px ;
      }
      #columns figure img{
        width:100%;
      }
      #columns figure figcaption{
        border-top:1px solid rgba(0,0,0,0.2);
        padding:15px;
        margin-top:25px;
      }
</style>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>이벤트</title>
</head>
<body>
	<div id="wrapper">
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div class="box-content">
				<div class="tit-page">
					<h1>지난 이벤트</h1>
				</div>
				<div class="line"></div>
				<div id="columns"aria-hidden="true" style="float: none; list-style: none; position: relative;">
					<figure>
					  <img src="../resources/img/1.png">
					  <figcaption>Cinderella wearing European fashion of the mid-1860’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/10.jpg">
					  <figcaption>Rapunzel, clothed in 1820’s period fashion</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/11.jpg">
					  <figcaption>Belle, based on 1770’s French court fashion</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/12.jpg">
					  <figcaption>Mulan, based on the Ming Dynasty period</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/13.jpg">
					  <figcaption>Sleeping Beauty, based on European fashions in 1485</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/14.jpg">
					  <figcaption>Pocahontas based on 17th century Powhatan costume</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/15.png">
					  <figcaption>Snow White, based on 16th century German fashion</figcaption>
					</figure>    
					
					<figure>
					  <img src="../resources/img/16.jpg">
					  <figcaption>Ariel wearing an evening gown of the 1890’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/17.png">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
					<figure>
					  <img src="../resources/img/18.jpg">
					  <figcaption>Cinderella wearing European fashion of the mid-1860’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/19.jpg">
					  <figcaption>Rapunzel, clothed in 1820’s period fashion</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/20.jpg">
					  <figcaption>Belle, based on 1770’s French court fashion</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/21.jpg">
					  <figcaption>Mulan, based on the Ming Dynasty period</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/2.png">
					  <figcaption>Sleeping Beauty, based on European fashions in 1485</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/3.png">
					  <figcaption>Pocahontas based on 17th century Powhatan costume</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/4.png">
					  <figcaption>Snow White, based on 16th century German fashion</figcaption>
					</figure>    
					
					<figure>
					  <img src="../resources/img/5.jpg">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/6.jpg">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/7.jpg">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/8.png">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
					
					<figure>
					  <img src="../resources/img/9.jpg">
					  <figcaption>Tiana wearing the <i>robe de style</i> of the 1920’s</figcaption>
					</figure>
				</div>
			</div>
			<div class="line"></div>
		</div>
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

<%-- <c:forEach items="${list }" var="rows" >
			
				<li class="state1"><a
				href="/event/view.eds?id=1914&amp;page=1"> <span
					class="visual"><img
						src="https://direct.samsunglife.com/upload/201808/5635.jpg"
						alt="18.9월 보험료 결과발송 이벤트"> </span> <strong class="tit">${rows.title }</strong><em class="icon-state2 icon1"><span>진행중</span></em> <span>18.9月
						${rows.name }&nbsp;</span> <em class="date">${rows.num }</em>
			</a>
						<div class="btn"></div></li>
			</c:forEach> --%>