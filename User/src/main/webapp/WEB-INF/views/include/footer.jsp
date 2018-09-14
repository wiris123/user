<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!-- ### layout : footer ///////////////////////////////////////////////// -->
<!-- CMS 영역 -->
<div class="wrap-footer">
	<!-- 회사정보 /푸터메뉴 / 카피라이트 -->
	<div class="company">
		<p class="code">
			<img src="http://www.samsunglife.com/img/common/sslifeQRcode.jpg" alt="삼성생명 QR코드 : 삼성생명 모바일사이트로 이동(http://m.samsunglife.com)" />
		</p>
		<ul class="nav">
			<li><a href="<%=request.getContextPath() %>/bottommenu/terms" title="(새창) 이용약관" id="tl_clause">이용약관</a></li>
         <li><a href="<%=request.getContextPath() %>/bottommenu/privacy" title="(새창) 삼성생명 개인정보처리방침" id="tl_privacy">개인정보처리방침</a></li>
         <li><a href="<%=request.getContextPath() %>/bottommenu/elecfinance" id="tl_elecfinance">전자금융거래표준약관</a></li>
		</ul>
		<ul class="info">
			<li>06620 서울특별시 금천구 가산디지털 2로 127</li>
			<li>대표이사 김희택</li>
			<li>사업자등록번호 104-81-26688</li>
		</ul>

		<p>본 사이트내 이메일무단수집을 거부하며, 위반시 정보통신법에 따라 형사처벌될 수 있습니다.</p>
		<p class="copy">&copy; INSURANCE & SAVING MANAGEMENT., ALL RIGHTS RESERVED</p>
	</div>
	<!-- 삼성생명 다이렉트 블로그 -->
	<div class="section-blog">
		<a href="http://www.ikosmo.co.kr" target="_blank" id="uiSitemap">한국소프트웨어인재개발원</a>
	</div>

	<!-- 사이트맵 -->
	<div class="section-sitemap ui-toggle">
		<a href="#none" class="tit ui-toggle-btn" id="uiSitemap">사이트맵<span>열기</span></a>
		<div class="list ui-toggle-con">
			<ul>
				<li><strong>상품소개</strong>
					<ul>
						<li><a href="../product/pro_annual"><span>연금보험</span></a></li>
						<li><a href="../product/pro_term"><span>정기보험</span></a></li>
						<li><a href="../product/pro_prop"><span>실손보험</span></a></li>
					</ul></li>
				<li><strong>가입 전&middot;후 가이드</strong>
					<ul>
						<!-- <li><a href="#none"><span>내게 맞는 보험찾기</span></a></li> -->
						<li><a href="../guide/gde_before"><span>가입 전</span></a></li>
						<li><a href="../guide/gde_after"><span>가입 후</span></a></li>
					</ul></li>
				
				<li><strong>이벤트/공지/고객센터</strong>
					<ul>
						<li><a href="../event/bbs_event?nowPage=1"><span>이벤트</span></a></li>
						<li><a href="../event/bbs_notice?nowPage=1"><span>공지사항</span></a></li>
						<li><a href="../custom/cus_faq"><span>자주하는 질문</span></a></li>
						<li><a href="../custom/cus_qna"><span>고객상담신청</span></a></li>
					</ul></li>	
				<li><strong>마이페이지</strong>
					<ul>
						<li><a href="../member/mypage.do"><span>마이페이지</span></a></li>
					</ul></li>
			</ul>
			<a href="#none" class="btn ui-toggle-close"><span>사이트맵 닫기</span></a>
		</div>
	</div>
	<!-- 패밀리사이트 -->
	<div class="section-family ui-toggle">
		<a href="#none" class="tit ui-toggle-btn">패밀리사이트 및 ISM계열사<span>열기</span></a>
		<div class="list ui-toggle-con">
			<ul>
				<li><strong>패밀리사이트</strong>
					<ul>
						<li><a href="http://www.kosmo.co.kr" target="_blank" title="새창열림">KOSMO</a></li>
						<li><a href="http://www.google.co.kr" target="_blank" title="새창열림">구글</a></li>
						<!-- <li><a href="http://www.smartlifedesign.co.kr" target="_blank" title="새창열림">스마트라이프디자인</a></li>-->
					</ul></li>
				<li><strong>소셜미디어</strong>
					<ul>
						<li><a href="http://blog.naver.com/" target="_blank" title="새창열림">네이버 블로그</a></li>
						<li><a href="http://twitter.com/" target="_blank" title="새창열림">트위터</a></li>
						<li><a href="https://www.facebook.com/" target="_blank" title="새창열림">따봉북</a></li>
					</ul></li>
				<li><strong>계열사</strong>
					<ul>
						<li><a href="http://www.119.go.kr" target="_blank" title="새창열림">화재에는 119</a></li>
						<li><a href="http://www.krx.co.k" target="_blank" title="새창열림">한국거래소</a></li>
						<li><a href="http://www.samsungcard.com/" target="_blank" title="새창열림">삼성카드</a></li>
						<!-- <li><a href="http://www.samsungfund.com" target="_blank" title="새창열림">삼성자산운용</a></li>-->
					</ul></li>
			</ul>
			<a href="#none" class="btn ui-toggle-close"><span>패밀리사이트 및 삼성계열사 닫기</span></a>
		</div>
	</div>
</div>
