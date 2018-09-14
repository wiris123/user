<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금가입가이드</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<script>
function moveCalc(frm)
{
	var mode = document.getElementById("product");	
	var birthday = document.getElementById("birthday");
	
	
	/* location.href="/user/product/pro_"+mode.value+"?birthday="+birthday; */
	frm.action = "/user/product/pro_"+mode.value+"?birthday="+birthday;;
	frm.submit();
	
}

</script>
<body>
	<div id="wrapper">

		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용시작 -->
			<div id="content" class="page-guide">
				<div class="product-feature01">
					<div id="product_wrap">
						<div class="product_top">
							<p>노후준비 하고 계신가요?</p>
							<span>(2017 통계청 가계금융 복지조사)</span>
							<p>노후 준비가 잘된 사람 10명 중 단 1명 은퇴 후 월 적정생활비 무려 276만원 ....노답 이라면?</p>
							<p>이제 ISM 다이렉트와 함께 노후준비의 답을 찾으세요</p>
						</div>

						<div class="step1">
							<p class="tit">
								원하시는 상품을 <strong>선택</strong>하세요
							</p>

							<!-- box -->
							<dl class="box box1 on">
								<dt class="stit">
									<em>추천상품 1</em><strong>갑작스러운 병원비</strong>를 위한 <strong class="ac">실손보험</strong>
								</dt>
								<dd class="txt">
									<strong>급여보장<br> + <br /></strong>비급여 <strong>입원 및 통원보장</strong> 혜택!<br />
									상해입원 5,000만원까지 보장!
								</dd>
								<dd class="btn">
									<a href="#">상세혜택확인</a>
								</dd>
							</dl>
							<!-- //box -->

							<!-- box -->
							<dl class="box box2">
								<dt class="stit">
									<em>추천상품 2</em><strong>안정적인 노후</strong>를 위한<br> <strong class="ac">연금보험</strong>
								</dt>
								<dd class="txt">
									<strong>장기유지보너스 최대 3회 지급!<br>+<br>비과세혜택
									</strong>으로<br>더 많은 연금액!<br>
									<span>(관련 세법요건 충족시)</span>
								</dd>
								<dd class="btn">
									<a href="../product/pro_annual">Click</a>
								</dd>
							</dl>
							<!-- //box -->

							<!-- box -->
							<dl class="box box3">
								<dt class="stit">
									<em>추천상품 3</em><strong>27% 저렴한 보험료로</strong> 위험 대비를!
									<strong class="ac">정기보험</strong>
								</dt>
								<dd class="txt">
									다이렉트로 가입하니까 <strong>27%<br>저럼한 보험료!<br>
									<span>(사업비 차감 후 부리, 관련 세법요건 충족시)</span>+<br>만기 환급금 지금
									</strong><br>
								</dd>
								<dd class="btn">
									<a href="../product/pro_term">Click</a>
								</dd>
							</dl>
							<!-- //box -->
						</div>

						<div class="step2_in box_1">
							<p class="tit">
								상품별 상세 혜택을 확인하시고 <strong>내 수령액을 계산</strong>해 보세요
							</p>

							<div class="in">
								<p class="stit">간 편 계 산 기</p>
								<form method="get" onsubmit="moveCalc(this);">
								<div class="inbox">
									<div class="sel">
										<select class="select" id="product" title="상품 선택">
											<option selected="" value="prop">인터넷실손보장보험</option>
											<option value="annual">인터넷연금보험</option>
											<option value="term">인터넷정기보험</option>
										</select>
									</div>
									<input type="text" id="birthday" name="birthday" class="txt" onfocus="this.value=''" onblur="if(this.value == '') this.value='생년월일 (예:19800101)';" value="생년월일 (예:19800101)">
									<div class="rawrap">
										<p class="ra1">
											<label><input name="radioGender" value="1" type="radio" checked="" style="position: absolute; z-index: -1; visibility: hidden;"><span class="jquery-checkbox jquery-checkbox-checked"><span class="mark"><img src="<%=request.getContextPath()%>/resources/cms/pc/images/guide/gda_empty.png"></span></span></label>
										</p>
										<p class="ra2">
											<label><input name="radioGender" value="2" type="radio" style="position: absolute; z-index: -1; visibility: hidden;"><span class="jquery-checkbox"><span class="mark"><img src="<%=request.getContextPath()%>/resources/cms/pc/images/guide/gda_empty.png"></span></span></label>
										</p>
									</div>

									<a href="#" id="" class="btn"><button type="submit"><span>내 수령액 확인/가입</span></button></a>
								</div>
								</form>
							</div>

							<!-- box1 -->
							<div class="box1 content">
								<div class="leftarea">
									<dl>
										<dt>
											<strong>ISM <em>인터넷연금보험</em></strong><br>미리 준비할수록 든든한 노후준비 + 연말정산 세액공제까지!
										</dt>
										<dd>
											<div>
												<p class="stit">추천 대상</p>
												<p class="txt">
													<span>월급을 받는 <strong>직장인</strong><br> 및 <strong>자영업자</strong></span> <span>근로소득이 있는<br> <strong>연말정산 대상자</strong></span>
												</p>
											</div>
											<div>
												<p class="stit">세금 혜택</p>
												<p class="txt">
													연말정산 시<br> 매년 최대 <strong>66만원<br> 세액공제 혜택
													</strong><br> <span class="sm">(관련세법 충족시)</span>
												</p>
											</div>
											<div>
												<p class="stit">공시 이율</p>
												<p class="txt">
													<span><strong>3.0% 연복리</strong><br> <span class="sm">(’18.9월, 사업비 차감 후 복리부리)</span></span> <span>ISM 연금상품 중<br> <strong>최고 공시이율</strong></span>
												</p>
											</div>
										</dd>
									</dl>
								</div>
							</div>
							<!-- //box1 -->
						</div>
					</div>
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
</html>