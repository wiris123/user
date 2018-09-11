<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>가입 완료</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용시작 -->
			<div id="content" class="page-guide">
							<!-- ## 페이지타이틀 ## -->
							<h1 class="hd">가입 후 가이드</h1>
							<div class="visual-top">
								<p>
									<strong>${name }</strong>님<br/>
									ISM 다이렉트 <strong>${ins_name }</strong>의 가입 신청이 완료되었습니다.<br /> 
									보험 일련번호 : ${ins_num }<br/>
									궁금하신 사항은 고객센터 1:1상담을 이용해주세요.
								</p>
								<ul class="tab">
									<li><a href="../member/login.do"><span><em>마이 페이지로</em> 가기</span></a></li>
									<li class="on"><a href="../"><span><em>메인으로</em> 가기</span></a></li>
								</ul>
							</div>
							<!-- ## 컨텐츠 ////////////////////////////////////////////// -->
							<!-- CMS 영역 -->
							<!-- <div class="section list-content2">
								

						</div>

					</div>
					<form id="mainFrm" name="frm">
						<input type="hidden" name="proType" id="proType" />
						상품 타입
						<input type="hidden" name="staAge" id="staAge" />
						가입나이 시작
						<input type="hidden" name="endAge" id="endAge" />
						가입나이 끝

						<input type="hidden" name="prcdId" id="prcdId" value="" />
						상품코드
						<input type="hidden" name="prcd" id="prcd" value="" />
						상품코드
						<input type="hidden" name="insCd" id="insCd" value="" />
						상품코드
						<input type="hidden" name="repCd" id="repCd" value="" />
						상품코드

						<input type="hidden" name="contBirth" id="contBirth" />
						생년월일
						<input type="hidden" name="contGender" id="contGender" />
						성별
						<input type=hidden name="insuPeriod" id="insuPeriod" />
						보험기간
						<input type="hidden" name="payPeriod" id="payPeriod" />
						납입기간
						<input type="hidden" name="annuityAge" id="annuityAge" />
						연금개시나이
						<input type="hidden" name="premium" id="premium" />
						납입금액
					</form>
					<noscript>
						<div style="display: inline;">
							<img height="1" width="1" style="border-style: none;" alt="" src="http://googleads.g.doubleclick.net/pagead/viewthroughconversion/992306186/?value=1.00&amp;currency_code=KRW&amp;label=6XhoCKbDpgQQisiV2QM&amp;guid=ON&amp;script=0" />
						</div>
						<div id="wrapper"></div>

						### layout : container //////////////////////////////////////////////
						<div id="container">

							page : content ///////////////////////////////////////////////////
							<div id="content" class="page-guide">
							
		</div> -->
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>