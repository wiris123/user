<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>약관동의</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<link rel="stylesheet" href="../resources/css/mypage.css" />
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css">
<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript">
	function tabSetting() {
		// 탭 컨텐츠 hide 후 현재 탭메뉴 페이지만 show
		$('.tabPage').hide();
		$($('.current').find('a').attr('href')).show();

		// Tab 메뉴 클릭 이벤트 생성
		$('li').click(
				function(event) {
					var tagName = event.target.tagName; // 현재 선택된 태그네임
					var selectedLiTag = (tagName.toString() == 'A') ? $(
							event.target).parent('li') : $(event.target); // A태그일 경우 상위 Li태그 선택, Li태그일 경우 그대로 태그 객체
					var currentLiTag = $('li[class~=current]'); // 현재 current 클래그를 가진 탭
					var isCurrent = false;

					// 현재 클릭된 탭이 current를 가졌는지 확인
					isCurrent = $(selectedLiTag).hasClass('current');

					// current를 가지지 않았을 경우만 실행
					if (!isCurrent) {
						$($(currentLiTag).find('a').attr('href')).hide();
						$(currentLiTag).removeClass('current');

						$(selectedLiTag).addClass('current');
						$($(selectedLiTag).find('a').attr('href')).show();
					}

					return false;
				});
	}

	$(function() {
		// 탭 초기화 및 설정
		tabSetting();
	});
</script>
<body>
	<div id="wrapper">

		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<div id="content" class="page-mypage">
				<!-- ## 탭영역 ## -->
				<ul class="tab-type1">
					<!-- @2015-12-14 : tab-type1로 클래스명 변경 -->
					<li class="on"><a href="#none">마이페이지</a></li>
					<li><a href="/myPageHoldingContract.eds" id="holdingContractCount">보유계약조회</a></li>
					<!-- <li><a href="/myPageContractProgress.eds">계약진행 조회<em>1<span>건</span></em></a></li> -->
					<li><a href="/myPageContinueSubscribe.eds" id="continueSubscribeCount">가입 계속하기</a></li>

					<li><a href="/myPageEvent.eds" id="eventCount">나의 이벤트</a></li>
					<li class="last"><a href="/myPageConsult.eds" id="consultCount">나의 상담</a></li>

				</ul>

				<!-- ## 타이틀 ## -->
				<h1 class="hd">마이페이지</h1>

				<!-- ## 기본정보 ## -->
				<div class="box-content2">
					<div class="line"></div>
					<div class="info-personal">
						<!-- CASE1 : 고객정보 있을경우 -->

						<h2 class="heading">
							<strong>배재현</strong> 고객님 기본정보 <a href="/logout.eds" class="btn-type4 logout"><span>본인인증 종료</span></a>
						</h2>
						<!-- <p class="txt"><span>최근 접속 일시</span> 2018-09-03 21:36:43</p> -->
						<ul>
							<li><span>생년월일</span>1993.11.09</li>
							<li><span>휴대폰</span>--****</li>
							<li><span>이메일</span>@</li>
							<li><span>주소</span></li>
						</ul>


					</div>
					<div class="bottom">
						<p class="txt">개인정보 변경은 삼성생명 사이버창구를 이용해주시기 바랍니다.</p>
						<div class="btn-sub">
							<a href="https://pcyber.samsunglife.com/pcyber/person/person/baseInfoChng/addressPhone.do" class="btn-type2 c3 arr" target="_blank" title="새창) 삼성생명 사이버창구"><span>사이버창구 이동</span></a>
						</div>
					</div>
					<div class="line"></div>
				</div>

				<!-- ## 추천보험 ## -->
				<div class="box-content2 line">
					<h2 class="hd">추천보험</h2>
					<div class="info-suggest">
						<p id="keyWordSubTitle">
							<strong><span>20대 남성</span> 추천 보험 키워드</strong> <span class="txt">보험은 부담이 아닌 편안한 노후와 건강한 삶을 위한 든든한 미래의 자산입니다. </span>
						</p>
						<ul id="KeyWordList">
							<li class="bg1"><strong>세액공제</strong><span>직장인 필수보험, 세액공제 매년 최대 66만원 환급으로 현재와 미래를 함께 대비! </span></li>
							<li class="bg2"><strong>저축 </strong><span>저금리 시대, 절세는 필수! 연복리 운영, 이자소득세 15.4% 비과세까지! </span></li>
							<li class="bg3"><strong>건강 </strong><span>대한민국 국민 사망원인 1위 암! 건강할 때 미리 준비하고 더 크게 보장받고! </span></li>
						</ul>
					</div>
					<!-- <div class="bottom">
               <p class="txt">보험과 관련된 다양한 정보를 뉴스레터로 전달받으세요.</p>
               <div class="btn-sub">
                  <a href="#none" onclick="popMypage5El.openOutput();"class="btn-type2 c3 arr" ><span>뉴스레터 신청</span></a>
               </div>
            </div> -->
					<div class="line"></div>
				</div>

				<ul class="box-content3 list-product" id="productList">
					<!-- case1 : 미가입시 -->
					<li id="prodType7">
						<h3 class="tit" id="simpleName7">연금보험</h3>
						<p class="con">
							한 살이라도 빨리 준비할 수록 <br>적은 부담으로 <br>높은 연금 수령 가능!
						</p>
						<div class="btn">
							<a href="javascript:goPlan('7');" class="btn-type2 c1"><span>가입하기</span></a>
						</div>
					</li>
					<li id="prodType2">
						<h3 class="tit" id="simpleName2">정기보험</h3>
						<p class="con">
							사랑하는 가족의<br>꿈과 미래를 지켜주는<br>가족보험!
						</p>
						<div class="btn">
							<a href="javascript:goPlan('2');" class="btn-type2 c1"><span>가입하기</span></a>
						</div>
					</li>
					<li id="prodType9">
						<h3 class="tit" id="simpleName9">실손보험</h3>
						<p class="con">
							질병, 상해로부터<br>비급여와 급여 중 본인부담금을<br>보장하는 보험
						</p>
						<div class="btn">
							<a href="javascript:goPlan('9');" class="btn-type2 c1"><span>가입하기</span></a>
						</div>
					</li>

				</ul>
			</div>
		</div>
		<!-- container end -->
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->
	</div>
</html>