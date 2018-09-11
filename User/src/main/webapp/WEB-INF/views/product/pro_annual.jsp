<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>
</head>
<body>
	<div id="wrapper"> <!-- 머리 -->
  <%@ include file="../include/header.jsp"%>
      <link rel="stylesheet"  href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
      <div id="container">
         <%@ include file="../include/Head.jsp"%>
         <!-- page : content /////////////////////////////////////////////////// -->
         <div id="content" class="page-product product4">
            <!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
            <div class="product-basic page-change">
               <!-- # 상품기본정보 # -->
<script type="text/javascript">


$(function(){
	$('.result-info-area').hide();
		
})

function premCal()
{
	$(function()
	{
			$.ajax
			({
				url:"./annuPrem.do",
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
				{	//성공 시 월납입액, 납부연한에 값 입력
					
					$('#resultAnnu').text(resp.result);		
					$('#spanBonusAmount').text(resp.bonus);
					$('#returnPer').text(resp.returnPer);
					$('.result-info-area').show();
					$('#gobirth').val($('#birth').val())
					$('#gomonthann').val(resp.gomonthann);
					$('#gobonus').val(resp.bonus);
					
				},
				error:function(errorData)
				{
					
				}

			});	

		});	
}
</script>
               <!-- CMS 영역 -->
               <div class="info">
                  <h1>
                     <span>ISM 다이렉트</span><strong>인터넷 연금보험</strong><em>3.0(무배당)</em>
                  </h1>
                  <p class="com1">
                     <strong>장기유지 보너스</strong>와 <br />
                     <strong>비과세 혜택</strong>으로 더 많은 연금액!<br /> <span class="notice">(전금융사
                        합계 월납보험료 최대 150만원 한도, 관련세법 충족시)</span>
                  </p>
                  <p class="com2">
                     <span>이자수익에 대한 세금 15.4%까지 절약하여 연금으로 받으세요!</span> <span
                        class="notice">(관련세법 충족시)</span>
                  </p>
               </div>
				<script>
				 function atag()
	               {
		               	if(birth.value.length <=7){
		               		alert("생년월일을 8개의 숫자로 작성해주세요.");
		               	}	
		               	else{
		               		premCal();
		               	}
	               	return false;
	               };
				</script>
               <!-- # 보험료 계산하기 # -->
               <form action="#" id="formCalculator">
                  <fieldset>
                     <legend>보험료계산기</legend>
                     <div class="calculator-form">
                        <div class="heading">
                           <h2 class="cal-tit">
                              <span>생년월일만으로</span><strong>빠르고 간편하게</strong>
                           </h2>
                           <p class="txt">나의 보험료를 계산해 보세요.</p>
                           <!-- <p class="banner"><img src="../../images/tmp/@banner_calculator.png" alt="@관리자등록배너텍스트"/></p> -->
                        </div>
                        <div class="form">
                           <ul>
                              <!-- 생년월일 -->
                              <li>
                                 <div class="form-wrap1">
                                    <label for="birthday" class="label">생년월일 <span>(예
                                          : 19851015 )</span></label> <input type="text" autocomplete="off"
                                       class="text placeholder numOnly" id="birth"
                                       maxlength="8" />
                                 </div>
                              </li>
                              <!-- 성별 -->
                              <li>
                                 <div class="label-radiobtn gender">
                                    <span> <label for="calcGender1">남자</label> <input
                                       type="radio" name="pgender" class="radio" id="calcGender1"
                                       value="1" />
                                    </span> <span> <label for="calcGender2">여자</label> <input
                                       type="radio" name="pgender" class="radio" id="calcGender2"
                                       value="2" />
                                    </span>
                                 </div>
                              </li>
					
                           </ul>
                           <a href="#none" class="btn" id="calcPremium" onclick="atag();"><span>내 수령액 확인 / 가입</span></a>
                        </div>
                     </div>
                  </fieldset>
               </form>
            </div>

            <!-- 연금계산결과 -->
            <!-- ## 계산결과 /////////////////////////////////////////////////////////////////////////////////////// -->
            <div class="product-result open" id="uiProductResult1" tabindex="0">
               <!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
               <div class="product-result-tab" data-tab="resultTab">
                  <div id="tabDirectPlan" class="on">직접 설계</div>
                  <div id="tabRecommendPlan">추천 설계</div>
               </div>

               <!-- tab1 직접 설계 -->
    			<form action="../product/annu_cal.do"id="formReCalculator">
    			<input type="hidden" name="interest" id="interest" value="3" />
				<input type="hid den" name="gobirth" id="gobirth" />
				<input type="hid den" name="gomonthann" id="gomonthann" />
				<input type="hid den" name="gobonus" id="gobonus"/>
               <div data-tab-target="resultTab">
                  <div class="direct-planning">
                     <div class="result-area">
                        <h3>
                           <span class="blind">보험료 계산결과</span>
                        </h3>
                           <fieldset>
                              <legend>보험료 다시 계산하기</legend>
                              <div class="re-calculator-form">
                                 <ul>
                                    <!-- 연금개시나이 -->
                                    <li><label for="annAge" class="re-cal-tit">연금개시나이</label>
                                       <span class="select-box"> <select name="instart" id="instart">
                                             <option value="55">55세</option>
                                             <option value="65">65세</option>
                                             <option value="75">75세</option>
                                       </select>
                                    </span></li>
                                    <!-- 납입기간 -->
                                    <li><label for="napTerm" class="re-cal-tit">납입기간</label>
                                       <span class="select-box"> <select name="paytime" id="paytime">
                                             <option value="10">10년</option>
                                             <option value="15">15년</option>
                                             <option value="20">20년</option>
                                       </select>
                                    </span></li>
                                    <!-- 납입금액 -->
                                    <li><label for="napMoney" id="napMoneyExample"
                                       class="re-cal-tit">납입금액 10만원 이상</label>
                                       <div class="input-wrap">
                                          <input type="text" class="text placeholder numOnly" id="payment" name="payment" value="10"
                                             maxlength="5" size="5" title="단위(만원)" /> <span
                                             class="label">만원</span>
                                       </div></li>
                                    <li class="how-to-get"><span class="re-cal-tit">수령방법</span>
                                       <div class="tooltip-col">
                                          <div class="tooltip-area">
                                             <span>종신연금형 <br />10회 보증
                                             </span> <a href="#none" class="icon-tip small" rel="history">종신연금형
                                                10회 보증이란?</a>
                                             <div class="tooltip">
                                                <div>
                                                   <p>종신연금형은 연금개시이후 피보험자가 사망하기 전까지 매년 일정한 연금액을 수령하는
                                                      형태입니다.</p>
                                                   <br />
                                                   <p>또 다른 수령 형태인 확정연금형은 확정적으로 연금수령기간을 설정하며 연금수령기간 중
                                                      피보험자가 사망하여도 남은 연금금액을 지급하여 드리는 형태입니다.</p>
                                                   <br />
                                                   <p>가입(청약)시점에는 종신연금형으로 가입(청약)이 되며, 하지만 향후 연금 개시 전일에
                                                      확정연금형으로 변경 가능합니다.</p>
                                                </div>
                                             </div>
                                          </div>
                                       </div></li>
                                 </ul>
                                 <button type="button" class="re-calcul-btn" id="reCalcPremium2" onclick="premCal();" >
                                    <span>다시계산하기</span>
                                 </button>
                              </div>
                             <div class="result-info-area">
								<div class="result-info">
									<div class="info-header">연금개시 시 <strong>장기유지보너스 </strong><strong><span id="spanBonusAmount">000</span>원 </strong>추가적립!
										<div class="tooltip-area">
											<a href="#none" class="icon-tip big" rel="history">장기유지보너스 지급</a>
											<div class="tooltip">
												<div>
													<p>※ 계약일로부터 5년/10년/연금개시시점 최대 3회 지급(계약 요건 충족시)</p>
												</div>
											</div>
										</div>
									</div>
									<div class="info-content">
										<strong>평생받는</strong> 예상 <strong class="annually-refund">연금수령액은 매월 <span id="resultAnnu">000</span>원</strong>입니다<br>
    									(<strong class="refund">환급률 <span><span id="returnPer">000</span>%</span></strong>)
    								</div>
									<div class="info-footer"><p class="tit">※해당예시는 현재 공시이율 지속 가정시이며, 공시이율 변동에 따라 바뀔 수 있습니다. (공시이율 매월 변동)</p></div>
								</div>
								
								<div class="join-refund">
									<a href="#none" class="btn-join" id="goPlan2" rel="history"><button type="submit"><img src="../resources/cms/pc/images/com/btn_join_refund.png" alt="바로 가입하기"></button>
									</a>
								</div>								
							</div>
                           </fieldset>
                       </form>
                     </div>
                     <!-- resultArea end -->
                  </div>
                  <!-- direct-planning end -->
               </div>
               <!-- resultTab end -->

               <!-- 친절한 설명 -->
               <div class="box-advice" id="areaBoxAdvice">
                  <div class="case1">
                     <h2>
                        <span>안 친절안내</span>
                     </h2>
                     <div class="box-row">
                        <div class="advice-txt-box">
                           <strong class="advice-tit">어떻게 설계할지 고민 되시나요?</strong>
                           <p>연락 주시면 조장님이 친절히 도와드립니다.</p>
                        </div>
                        <div class="advice-tel">
                           <span class="tel-icon"><img src="resources/cms/pc/images/com/icon_telephone.png" alt="" /></span>

                           <strong>010-1234-5678</strong> <span>평일 08:30~17:30 (무료)</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
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