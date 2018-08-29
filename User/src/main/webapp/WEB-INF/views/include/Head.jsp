<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- 여기서부터 메뉴창임 -->
<div class="nav-path">
	<div>
		<ul id="gnb" class="gnb-area">
			<li class="list-path1"><a href="#none" onclick="toggleGNB();" rel="history"><p class="headline">상품소개</p></a>
				<ul class="list-option db-coulm">
					<li class="icon-suggest3"><a href="annuity.html" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_annuity', 1);" rel="history"><strong>연금저축보험</strong></a><span class="hd">BEST(추천)</span></li>
				</ul>
				<ul class="list-option db-coulm">
					<li><a href="./product/Cancer" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_cancer', 1);" rel="history"><span>삼성생명 인터넷</span><strong>암보험</strong><span>6.0</span><span>(갱신형/무배당)</span></a></li>
					<li><a href="term.html" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_term', 1);" rel="history"><span>삼성생명 인터넷</span><strong>정기보험</strong><span>4.0</span><span>(무배당)</span></a></li>
					<li><a href="accident.html" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_accident', 1);" rel="history"><span>삼성생명 인터넷</span><strong>상해보험</strong><span>4.0</span><span>(무배당)</span></a></li>
					<li><a href="medical.html" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_medical', 1);" rel="history"><span>삼성생명 인터넷</span><strong>실손<span>의료비보장</span>보험
						</strong><span>(기본형,갱신형,무배당)</span></a></li>
					<li class="icon-new"><a href="dental.html" rel="history"><span>삼성생명 인터넷</span><strong>치아보험</strong><span>(무배당)</span></a></li>
				</ul></li>
			<li class="list-path2"><a href="#none" onclick="toggleGNB();"><p class="headline">가입가이드</p></a>
				<ul class="list-option">
					<li><a href="guide/guideBefore.html" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB_menu_before-guide', 1);"><strong>가입 전.후 가이드</strong></a></li>
					<li><a href="guide/guideAnnuity.html"><strong>연금 가입 가이드</strong></a></li>
					<li><a href="findInsu.html"><strong>내게 맞는 상품 찾기</strong></a></li>
					<li><a href="betterLife/list.html"><strong>은퇴라운지</strong></a></li>
				</ul></li>
			<li class="list-path3"><a href="#none" onclick="toggleGNB();"><p class="headline">이벤트/공지</p></a>
				<ul class="list-option">
					<li class="icon-new"><a href="event/list.html"><strong>이벤트</strong></a><span class="hd">NEW(신규)</span></li>
					<li><a href="customerCenter/notice/list.html"><strong>공지사항</strong></a></li>
					<li><a href="customerCenter/video/list.html"><strong>다이렉트 광고영상</strong></a></li>
					<li><a href="guide/introduce.html"><strong>삼성생명 다이렉트란?</strong></a></li>
				</ul></li>
			<li class="list-path4"><a href="#none" onclick="toggleGNB();"><p class="headline">고객센터</p></a>
				<ul class="list-option">
					<li><a href="customerCenter/faq/list.html"><strong>자주하는 질문</strong></a></li>
					<li><a href="customerCenter/counsel.html"><strong>고객상담신청</strong></a></li>
					<li><a href="customerCenter/certification2.html"><strong>모바일웹 인증서 안내</strong></a></li>
					<li><a href="customerCenter/clearCache.html"><strong>캐시 삭제 안내</strong></a></li>
				</ul></li>
			<li class="list-ban">
				<div class="ba-img01">
					<a href="guide/guideAnnuity.html">
						<p>
							<span>한 눈에 상품별 혜택 비교가 쫙~!</span><br />
							<strong>연금가입 가이드</strong>
						</p>
					</a>
				</div>
				<div class="ba-img02">
					<a href="event/list.html">
						<p>
							<span>혜택이 가득한</span><br />
							<strong>이벤트 바로가기</strong>
						</p>
					</a>
				</div>
				<div class="ba-img03">
					<a href="myPageLogin.html" onclick="ga('send', 'event', 'Direct', 'Entry', 'GNB-Menu_', 1);">
						<p>
							<span>내가 이전에 설계한 상품</span><br />
							<strong>가입 계속하기</strong>
						</p>
					</a>
				</div>
			</li>
		</ul>
	</div>
</div>