<%@page import="javax.naming.Context"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>암보험</title>
<!-- 머리 -->
	<%@ include file="../include/header.jsp"%>
</head>


<body>
	<div id="wrapper">
	<%@ include file="../include/Head.jsp"%>


		<div id="container">
		
			<!-- 내용시작 -->
			<div id="content">
	<section id="productCalculator" class="product-calculator">
	<header class="hd">
		<h2>
			보험료 계산기
		</h2>
	</header>
	<form action="#none" class="calculator-product stepon">
		<fieldset class="step">
			<legend>상품상세 계산기</legend>
			<div class="area">
				<div class="info">
					<p class="info-step s1" style="display: none;"><span>“</span><strong id="msgCalculator">매월 얼마를 납입하시겠어요?</strong><span>”</span></p>
				</div>
				<div class="box-area">
					<ul class="form" id="stepList">
						<!-- 성별 -->
						<li class="label-gender3">
							<label for="calcGender1" class="on">남자</label>
							<input type="radio" name="pgender" id="calcGender1" value="1">
							<label for="calcGender2">여자</label>
							<input type="radio" name="pgender" id="calcGender2" value="2">
						</li>
						<!-- 생년월일 -->
						<li class="label-birth input-chk">
							<label for="birthday">생년월일</label>
							<div class="form-wrap3">
								<input type="number" id="birthday" placeholder="생년월일 (예:19851015)" maxlength="8" size="8" autocomplete="off" class="numOnly">
							</div>
							<span></span>
						</li>
						<!-- 보험기간 -->
						<li class="block none">
							<label for="insTerm" class="tit">보험기간</label>
							<div class="form-wrap3">
								<select id="insTerm"><option value="">보험기간 선택</option></select>
							</div>
						</li>
						<!-- 저축보험 라디오 보험기간 -->
						<li class="label-btn none" id="radio_esaving_ins">
							<dl>
								<dt class="tit">보험기간</dt>
								<dd>
									<span class="label-btn2 col5">
										<label for="esabDay1_1" class="">2년</label>
										<input type="radio" name="esab_day1" id="esabDay1_1" value="2">
										<label for="esabDay1_2" class="">3년</label>
										<input type="radio" name="esab_day1" id="esabDay1_2" value="3">
										<label for="esabDay1_3" class="">10년</label>
										<input type="radio" name="esab_day1" id="esabDay1_3" value="10">
										<label for="esabDay1_4" class="">15년</label>
										<input type="radio" name="esab_day1" id="esabDay1_4" value="15">
										<label for="esabDay1_5" class="">20년</label>
										<input type="radio" name="esab_day1" id="esabDay1_5" value="20">
									</span>
								</dd>
							</dl>
						</li>
						<!-- 연금개시나이 -->
						<li class="block input-chk" id="li_annAge">
							<label for="annAge" class="tit">연금개시나이</label>
							<div class="form-wrap3">
								<select id="annAge"><option value="55">연금개시나이 : 55세</option><option value="56">연금개시나이 : 56세</option><option value="57">연금개시나이 : 57세</option><option value="58">연금개시나이 : 58세</option><option value="59">연금개시나이 : 59세</option><option value="60">연금개시나이 : 60세</option><option value="61">연금개시나이 : 61세</option><option value="62">연금개시나이 : 62세</option><option value="63">연금개시나이 : 63세</option><option value="64">연금개시나이 : 64세</option><option value="65">연금개시나이 : 65세</option><option value="66">연금개시나이 : 66세</option><option value="67">연금개시나이 : 67세</option><option value="68">연금개시나이 : 68세</option><option value="69">연금개시나이 : 69세</option><option value="70">연금개시나이 : 70세</option><option value="71">연금개시나이 : 71세</option><option value="72">연금개시나이 : 72세</option><option value="73">연금개시나이 : 73세</option><option value="74">연금개시나이 : 74세</option><option value="75">연금개시나이 : 75세</option><option value="76">연금개시나이 : 76세</option><option value="77">연금개시나이 : 77세</option><option value="78">연금개시나이 : 78세</option><option value="79">연금개시나이 : 79세</option><option value="80">연금개시나이 : 80세</option></select>
							</div>
						</li>
						<!-- 납입기간 -->
						<li class="block input-chk" id="li_napTerm">
							<label for="napTerm" class="tit">납입기간</label>
							<div class="form-wrap3">
								<select id="napTerm"><option value="5">납입기간 : 5년납</option><option value="7">납입기간 : 7년납</option><option value="10">납입기간 : 10년납</option><option value="11">납입기간 : 11년납</option><option value="12">납입기간 : 12년납</option><option value="13">납입기간 : 13년납</option><option value="14">납입기간 : 14년납</option><option value="15">납입기간 : 15년납</option><option value="16">납입기간 : 16년납</option><option value="17">납입기간 : 17년납</option><option value="18">납입기간 : 18년납</option><option value="19">납입기간 : 19년납</option><option value="20">납입기간 : 20년납</option><option value="21">납입기간 : 21년납</option><option value="22">납입기간 : 22년납</option><option value="23">납입기간 : 23년납</option><option value="24">납입기간 : 24년납</option><option value="25">납입기간 : 25년납</option><option value="26">납입기간 : 26년납</option><option value="27">납입기간 : 27년납</option><option value="28">납입기간 : 28년납</option><option value="29">납입기간 : 29년납</option><option value="30">납입기간 : 30년납</option><option value="31">납입기간 : 31년납</option><option value="32">납입기간 : 32년납</option><option value="33">납입기간 : 33년납</option><option value="34">납입기간 : 34년납</option><option value="99">납입기간 : 65세납</option></select>
							</div>
						</li>
						<!-- 저축보험 라디오 납입기간 -->
						<li class="label-btn none" id="radio_esaving_nap">
							<dl>
								<dt class="tit">납입기간</dt>
								<dd>
									<span class="label-btn2 col7">
										<label for="esanDay2_1" disabled="disabled">2년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_1" value="2">
										<label for="esanDay2_2">3년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_2" value="3">
										<label for="esanDay2_3">5년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_3" value="5">
										<label for="esanDay2_4">7년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_4" value="7">
										<label for="esanDay2_5">10년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_5" value="10">
										<label for="esanDay2_6">12년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_6" value="12">
	    								<label for="esanDay2_7" class="">15년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_7" value="15">
										<label for="esanDay2_8" class="">20년</label>
										<input type="radio" name="esaving_nday1" id="esanDay2_8" value="20">
									</span>
								</dd>
							</dl>
						</li>
						<!-- 납입금액1 -->
						<li class="block input-chk">
							<label for="napMoney1" class="tit">납입금액</label>
							<div class="form-wrap3">
								<input type="number" id="napMoney1" class="numOnly" placeholder="6~150만원까지">
								<span>만원</span>
							</div>
						</li>
						<!-- 납입금액2 -->
						<li class="block none">
							<label for="napMoney2" class="tit">납입금액</label>
							<div class="form-wrap3">
								<input type="number" id="napMoney2" class="numOnly" placeholder="5만원이상">
								<span>만원</span>
							</div>
						</li>
						
						<!-- 상품선택 -->
						
						
						<!-- 의료수급권자 여부 -->
						<li class="block input-chk none">
							<a href="#tipPro9Con4" class="icon-tip">안내문구보기</a>
							<label for="napTerm" class="tit line2">의료수급권자 여부</label>
							<span class="label-btn1">
								<label for="mdcrRcbfrYn-1" class="">예</label>
								<input type="radio" name="mdcrRcbfrYn" id="mdcrRcbfrYn-1" value="Y">
								<label for="mdcrRcbfrYn-2">아니오</label>
								<input type="radio" name="mdcrRcbfrYn" id="mdcrRcbfrYn-2" value="N">
							</span>
						</li>
						
					</ul>
					<div class="btn-area">
						<a href="#none" class="btn-com c1" id="btnCalculate">내 수령액 계산/가입</a>
					</div>
				</div>
			</div>
		</fieldset>
	</form>
</section>
		<!-- 머리끝 -->
		<!-- 푸터시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>