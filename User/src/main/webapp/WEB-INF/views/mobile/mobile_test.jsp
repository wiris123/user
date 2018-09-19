<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<!-- 공통 css -->
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/mobile/css/common.css"/>
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/mobile/css/content62ea.css"/>
<%-- <link rel="stylesheet" href="<%=request.getContextPath() %>/resources/cms/mobile/css/common.css?ver=1.2"/>
<link rel="stylesheet" href="<%=request.getContextPath() %>/resources/cms/mobile/css/content.css?ver=1.2"/> --%>
<!-- 공통 script -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/mobile/js/ui.plugin.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/mobile/js/ui.common.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/mobile/js/dev.plugin.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/mobile/js/dev.common.js" charset="utf-8"></script>

<!-- 어도비 스크립트 -->
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/mobile/js/adobeDtm.js" charset="utf-8"></script>
<script src="//assets.adobedtm.com/70e7c1e41a15664b7412b48a9e091675a718223f/satelliteLib-ca1e208783476d525a421be25e9cd460655f0fe0.js"></script>

<!-- GTM헤더 스크립트 <head> 가능한 높은 위치 -->
</head>
<script>
function premCal()
{
   $(function()
   {
         $.ajax
         ({
            url:"../product/annuPrem.do",
            type : "post",
            data : 
            {
               payment : $('#payment').val(),
               instart : $('#instart').val(),
               interest : $('#interest').val(),
               birth : $('#birth').val(),
               gender : $('#calcGender1').val() + $('#calcGender2').val(),
               paytime : $('#paytime').val(),
            },
            dataType : "json",
            contentType : "application/x-www-form-urlencoded;charset=utf-8",//post타입의 content타입 : application/x-www-form-urlencoded;charset=utf-8
            success:function(resp)
            {   //성공 시 월납입액, 납부연한에 값 입력
               
               $('#resultAnnu').text(resp.result);      
               $('#spanBonusAmount').text(resp.bonus);
               $('#returnPer').text(resp.returnPer);
               $('#gobirth').val($('#birth').val())
               $('#gomonthann').val(resp.gomonthann);
               $('#gobonus').val(resp.bonus);
               $('#annumonth').text($('#payment').val());
               $('#payment1').val($('#payment').val());
               $('#paytime1').val($('#paytime').val());
               $('#instart1').val($('#instart').val());
               
            },
            error:function(errorData)
            {
               
            }
         });   
      });   
}


</script>

<body>
<div class="wrapper">
<section id="productCalculator" class="product-calculator">
	<header class="hd">
		<h2>
			보험료 계산기
		</h2>
	</header>
	<form action="#none" class="calculator-product stepon" >
		<fieldset class="step">
			<legend>상품상세 계산기</legend>
			<div class="area">
				<div class="info">
					<p class="info-step s1" style="display: none;"><span>“</span><strong id="msgCalculator">매월 얼마를 납입하시겠어요?</strong><span>”</span></p>
				</div>
				<div class="box-area">
				<input type="hidden" id="interest" name="interest" value="3"/>
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
								<input type="number" id="birth" name="birth" placeholder="생년월일 (예:19851015)" maxlength="8" size="8" autocomplete="off" class="numOnly">
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
						
						<!-- 연금개시나이 -->
						<li class="block input-chk" id="li_annAge">
							<label for="annAge" class="tit">연금개시나이</label>
							<div class="form-wrap3">
								<select id="instart" name="instart"><option value="55">연금개시나이 : 55세</option><option value="56">연금개시나이 : 56세</option><option value="57">연금개시나이 : 57세</option><option value="58">연금개시나이 : 58세</option><option value="59">연금개시나이 : 59세</option><option value="60">연금개시나이 : 60세</option><option value="61">연금개시나이 : 61세</option><option value="62">연금개시나이 : 62세</option><option value="63">연금개시나이 : 63세</option><option value="64">연금개시나이 : 64세</option><option value="65">연금개시나이 : 65세</option><option value="66">연금개시나이 : 66세</option><option value="67">연금개시나이 : 67세</option><option value="68">연금개시나이 : 68세</option><option value="69">연금개시나이 : 69세</option><option value="70">연금개시나이 : 70세</option><option value="71">연금개시나이 : 71세</option><option value="72">연금개시나이 : 72세</option><option value="73">연금개시나이 : 73세</option><option value="74">연금개시나이 : 74세</option><option value="75">연금개시나이 : 75세</option><option value="76">연금개시나이 : 76세</option><option value="77">연금개시나이 : 77세</option><option value="78">연금개시나이 : 78세</option><option value="79">연금개시나이 : 79세</option><option value="80">연금개시나이 : 80세</option></select>
							</div>
						</li>
						<!-- 납입기간 -->
						<li class="block input-chk" id="li_napTerm">
							<label for="napTerm" class="tit">납입기간</label>
							<div class="form-wrap3">
								<select id="paytime" name="paytime"><option value="10">납입기간 : 10년납</option><option value="15">납입기간 : 15년납</option><option value="20">납입기간 : 20년납</option><option value="21">납입기간 : 21년납</option><option value="22">납입기간 : 22년납</option><option value="23">납입기간 : 23년납</option><option value="24">납입기간 : 24년납</option><option value="25">납입기간 : 25년납</option><option value="26">납입기간 : 26년납</option><option value="27">납입기간 : 27년납</option><option value="28">납입기간 : 28년납</option><option value="29">납입기간 : 29년납</option><option value="30">납입기간 : 30년납</option></select>
							</div>
						</li>
						
						<!-- 납입금액1 -->
						<li class="block input-chk">
							<label for="napMoney1" class="tit">납입금액</label>
							<div class="form-wrap3">
								<input type="number" id="payment" name="payment"  class="numOnly" placeholder="10~100만원까지">
								<span>만원</span>
							</div>
						</li>
						
					</ul>
					<div class="btn-area">
						<a href="#none" class="btn-com c1" id="btnCalculate" onclick="premCal();">내 수령액 계산/가입</a>
					</div>
				</div>
			</div>
		</fieldset>
	</form>
</section>


<!-- 결과 -->
<div class="product-result open">
<form action="../mobile/annu_cal.do">
			<input type="hidden" name="interest" id="interest" value="3" />
            <input type="hidden" name="gobirth" id="gobirth" />
            <input type="hidden" name="gomonthann" id="gomonthann" />
            <input type="hidden" name="gobonus" id="gobonus"/>
            <input type="hidden" name="payment1" id="payment1" />
            <input type="hidden" name='paytime1' id="paytime1" />
             <input type="hidden" name='instart1' id="instart1" />
					<!-- #결과목록 -->
					<ul class="list-result pro4" id="annuityResult">
						<!-- 맞춤설계 -->
						<li class="on" style="display:list-item;">
							<a href="#none">
								<span>월 납입액</span>
								<span>월</span><strong id="annumonth"></strong><span>만원</span>
							</a>
							<div class="box on">
								<ul class="con">
									<li>
										<div class="area-result">
											<p>평생동안 매년 수령하는 <b>연금액</b></p>
											<strong><span id="resultAnnu" style="font-size:2em"></span></strong>원
										</div>
									</li>
									<li>
										<div class="ratio">
											<span>(환급률</span>
											<strong id="returnPer"></strong>
											<span>%)</span>
										</div>
									</li>
								
								</ul>
								
								<!-- #추가버튼 -->
								
								<div class="btn-area2" id="switchReCalc">
							        <a href="#" class="btn-com c5" onclick="premCal();">다시 설계하기</a>
							        <a href="#none" class="btn-com c5" id="annuitySubscribe1"><button type="submit">가입하기</button></a>
							    </div>
							    <div class="btn-area2" style="display:none;">
							        
							    </div>
							</div>
						</li>				
					</ul>
				</div>
				</div>
				</form>
</body>
</html>