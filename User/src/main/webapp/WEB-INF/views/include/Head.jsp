<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="../include/sidemenu.jsp" %>
<!-- 여기서부터 메뉴창임 -->
<div class="nav-path">
	<div>
		<ul id="gnb" class="gnb-area">
			<li class="list-path2"><a href="#none" onclick="toggleGNB();" rel="history"><p class="headline">상품소개</p></a>
				<ul class="list-option db-coulm">
					<!--  li 태그에 class="icon-suggest3"를 붙이면 BEST 
									   class="icon-new" 를 붙이면 NEW
					-->
					<li><a href="<%=request.getContextPath() %>/product/pro_annual" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_annuity', 1);" rel="history"><strong>연금보험</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/product/pro_prop" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_annuity', 1);" rel="history"><strong>실손보험</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/product/pro_term" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB-Menu_Link_annuity', 1);" rel="history"><strong>정기보험</strong></a></li>
				</ul>
			</li>
			<li class="list-path2"><a href="#none" onclick="toggleGNB();"><p class="headline">가입가이드</p></a>
				<ul class="list-option">
					<li><a href="<%=request.getContextPath() %>/guide/gde_before" onclick="ga('send', 'event', 'Direct', 'Etc', 'GNB_menu_before-guide', 1);"><strong>가입 전.후 가이드</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/guide/gde_annual"><strong>연금 가입 가이드</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/guide/gde_myproduct"><strong>내게 맞는 상품 찾기</strong></a></li>
				</ul></li>
			<li class="list-path3"><a href="#none" onclick="toggleGNB();"><p class="headline">이벤트/공지</p></a>
				<ul class="list-option">

					<li><a href="<%=request.getContextPath() %>/event/bbs_event?nowPage=1"><strong>이벤트</strong></a><span class="hd"></span></li>
					<li><a href="<%=request.getContextPath() %>/event/bbs_notice?nowPage=1"><strong>공지사항</strong></a></li>
				</ul></li>
			<li class="list-path4"><a href="#none" onclick="toggleGNB();"><p class="headline">고객센터</p></a>
				<ul class="list-option">
					<li><a href="<%=request.getContextPath() %>/custom/cus_faq"><strong>자주하는 질문</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/custom/cus_qna"><strong>고객상담신청</strong></a></li>
					<li><a href="<%=request.getContextPath() %>/custom/mapAPI"><strong>지도</strong></a></li>
				</ul></li>
			<li class="list-ban">
				<div class="ba-img01">
					<a href="../guide/gde_annual">
						<p>
							<span>한 눈에 상품별 혜택 비교가 쫙~!</span><br />
							<strong>연금가입 가이드</strong>
						</p>
					</a>
				</div>
				<div class="ba-img02">
					<a href="../event/bbs_event?b_id=a">
						<p>
							<span>혜택이 가득한</span><br />
							<strong>이벤트 바로가기</strong>
						</p>
					</a>
				</div>
				<div class="ba-img03">
					<a href="../product/pro_annual" onclick="ga('send', 'event', 'Direct', 'Entry', 'GNB-Menu_', 1);">
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