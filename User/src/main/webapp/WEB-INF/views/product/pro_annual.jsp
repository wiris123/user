<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>연금 보험</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
   src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
   charset="utf-8"></script>
</head>
<body>
   <div id="wrapper"> <!-- 머리 -->
  <%@ include file="../include/header.jsp"%>
  <link rel="stylesheet"  href="<%=request.getContextPath()%>/resources/cms/pc/css/page_main.css" />
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
            {   //성공 시 월납입액, 납부연한에 값 입력
               
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
<style>
    
</style>
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
                                       class="text placeholder numOnly" id="birth" value="${param.birthday }"
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
            <div class="product-result open" id="uiProductResult1" tabindex="0" style="background-color: white;">
               <!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
               <div class="product-result-tab" data-tab="resultTab">
                  <div id="tabDirectPlan" class="on">직접 설계</div>
                  <div id="tabRecommendPlan">추천 설계</div>
               </div>

               <!-- tab1 직접 설계 -->
             <form action="../product/annu_cal.do"id="formReCalculator">
             <input type="hidden" name="interest" id="interest" value="3" />
            <input type="hidden" name="gobirth" id="gobirth" />
            <input type="hidden" name="gomonthann" id="gomonthann" />
            <input type="hidden" name="gobonus" id="gobonus"/>
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
                           <span class="tel-icon"><img src="../resources/cms/pc/images/com/icon_telephone.png" alt="" /></span>

                           <strong>010-1234-5678</strong> <span>평일 08:30~17:30 (무료)</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div id="navPathGnb" class="nav-path gnb-scroll">
				<div>
					<a href="/index.eds" class="home" rel="history">홈</a>
					<div id="ui-path-cate1" class="select-list" style="min-width: 220px;">
						<a href="#none" class="headline" rel="history">상품소개</a>
						<ul class="list-option hd" style="min-width: 218px;">
							<li class="selected"><a href="#none" rel="history">상품소개</a></li>
							<li><a href="/guide/guideBefore.eds" rel="history">가입 전 · 후 가이드</a></li>
							<li><a href="/customerCenter/faq/list.eds" rel="history">고객센터</a></li>
						</ul>
					</div>
					<div id="ui-path-cate2" class="select-list" style="min-width: 220px;">
						<a href="#none" class="headline" rel="history"><span>ISM생명 인터넷</span>연금저축보험<span>1.8</span><span>(무배당)</span></a>
						<ul class="list-option hd" style="min-width: 218px;">
							<li><a href="/iAnnuity.eds" rel="history"><span>ISM생명 인터넷</span>연금보험<span>1.5</span><span>(무배당)</span></a></li>
							<li class="selected"><a href="#none" rel="history"><span>ISM생명 인터넷</span>연금저축보험<span>1.8</span><span>(무배당)</span></a></li>
							<li><a href="/esaving.eds" rel="history"><span>ISM생명 인터넷</span>저축보험<span>1.8</span><span>(무배당)</span></a></li>
							<li><a href="/variableSaving.eds" rel="history"><span>ISM생명 인터넷</span>변액적립보험<span>1.1</span><span>(무배당)</span></a></li>
							<li><a href="/cancer.eds" rel="history"><span>ISM생명 인터넷</span>암보험<span>6.0</span><span>(갱신형/무배당)</span></a></li>
							<li><a href="/term.eds" rel="history"><span>ISM생명 인터넷</span>정기보험<span>4.0</span><span>(무배당)</span></a></li>
							<li><a href="/accident.eds" rel="history"><span>ISM생명 인터넷</span>상해보험<span>4.0</span><span>(무배당)</span></a></li>
							<li><a href="/medical.eds" rel="history"><span>ISM생명 인터넷</span>실손의료비보장보험<span>(기본형,갱신형,무배당)</span></a></li>
							<li><a href="/dental.eds" rel="history"><span>ISM생명 인터넷</span>치아보험<span>(재가입형,무배당)</span></a></li>
							<li><a href="/guide/pension.eds" rel="history"><span>ISM생명 </span>퇴직연금 IRP</a></li>
						</ul>
					</div>
				</div>
			</div>
				<!-- # 상품기본탭 /////////////////////////////////////////////////////////////////////////////////////// -->
				<div class="product-tab" id="uiNavFloat" >
					<ul>
						<li><a href="#uiTabProduct1" onclick="n_logging('annuity','annuity-tab1','','');ga('send','event','Direct','Etc','annuity_sub-menu_1',1);"><span>연금저축보험 필요성</span></a></li>
						<li class="on"><a href="#uiTabProduct2" onclick="n_logging('annuity','annuity-tab2','','');ga('send','event','Direct','Etc','annuity_sub-menu_2',1);" id="tabProduct2"><span>상품강점</span></a></li>
						<li><a href="#uiTabProduct3" onclick="n_logging('annuity','annuity-tab3','','');ga('send','event','Direct','Etc','annuity_sub-menu_3',1);"><span>상품세부정보</span></a></li>
						<li><a href="#uiTabProduct4" onclick="n_logging('annuity','annuity-tab4','','');ga('send','event','Direct','Etc','annuity_sub-menu_4',1);"><span>자주하는 질문</span></a></li>
					</ul>
				</div>

				<!-- ## 상품 상세정보 /////////////////////////////////////////////////////////////////////////// -->
				<div class="product-detail">
					<!-- ## 탭1 : 연금저축보험 필요성 ## -->
					<!-- CMS 영역 -->
					<div id="uiTabProduct1" class="product-con detail-tab1">
						
<h2 class="hd">연금저축보험 필요성</h2>
<div class="menu-skip">
	<ul>
		<li class="pm1"><a href="#uiTab1-1"><span>노후 생활비<br /> <em>월 236만원</em></span></a></li>
		<li class="pm2"><a href="#uiTab1-2"><span>국민연금<br /> 하나로는 <em>부족</em></span></a></li>
		<li class="pm3"><a href="#uiTab1-3"><span>저금리시대<br /> <em>실속 재테크</em></span></a></li>
		<li class="pm4"><a href="#uiTab1-4"><span><em>노후자금</em> 마련에<br /><em>세액공제</em>까지</span></a></li>
	</ul>
</div>
<div class="section">
	<!-- # 탭1-1 : 노후 생활비 월 236만원 -->
	<div id="uiTab1-1" class="con-type1">
		<h3><span class="txt-count">첫번째</span>노후 생활비<br /><em class="pen2">월 236만원</em></h3>
		<p>은퇴 후 30년, 인생의 3분의 1이 노후입니다. <br />안정적인 노후를 위해 <em>월 생활비 236만원</em>이 필요합니다.</p>
		<div class="visual">
			<div class="con">
				<table summary="부부, 개인별 최소생활비와 적정생활비">
					<caption>부부, 개인별 최소생활비와 적정생활비</caption>
					<thead>
						<tr>
							<th>구분</th>
							<th scope="col">최소생활비</th>
							<th scope="col">적정생활비</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">부부</th>
							<td>174만원</td>
							<td>236만원</td>
						</tr>
						<tr>
							<th scope="row">개인</th>
							<td>104만원</td>
							<td>145만원</td>
						</tr>
					</tbody>
				</table>
				<p>출처 : 2017년 국민연금공단(국민노후보장패널조사 6차연도 2015년 조사결과)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con1_1.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-2 : 국민연금 하나로는 부족 -->
	<div id="uiTab1-2" class="con-type1">
		<h3><span class="txt-count">두번째</span>국민연금<br />하나로는 <em class="pen2 w85">부족</em></h3>
		<p>많은 분들이 의지하는 국민연금, 얼마 정도를 받을까요?<br />부족한 금액, <em>해답은 개인연금</em>에 있습니다.</p>
		<div class="visual">
			<div class="con">
				<p>예상 노후 월 생활비 약 236만원(부부기준)<span>출처 : 2017년 국민연금공단(국민노후보장패널조사 6차연도 2015년 조사결과)</span></p>
				<p>2015년 국민연금 평균수령액  32만5130원<span>출처 : 2015 국민연금공단</span></p>
				<p>236만원 - 32만 5,130원 = 2,034,870원 부족</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con1_2.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-3 : 저금리시대 실속 재테크 -->
	<div id="uiTab1-3" class="con-type1">
		<h3><span class="txt-count">세번째</span>저금리시대<br />실속 <em class="pen2">재테크</em></h3>
		<p>저금리 시대, <em>수익성과 절세혜택</em>까지! <br />실속에 실속을 더한 상품! 바로 연금저축입니다.</p>
		<div class="visual">
			<div class="con">
				<dl>
					<dt>한국은행 기준금리 추이(단위:%)</dt>
					<dd>2014년 8월 : 2.25%</dd>
					<dd>2014년 10월 : 2.00%</dd>
					<dd>2015년 3월 : 1.75%</dd>
					<dd>2015년 6월 : 1.50%</dd>
					<dd>2016년 6월 : 1.25%</dd>
				</dl>
				<p>출처 : 한국은행 기준금리 변경 추이(2017년)</p>
				<dl>
					<dt>소비자물가 추이(전년동월 대비, 단위:%)</dt>
					<dd>2016년 3월 : 1.0%</dd>
					<dd>2016년 4월 : 1.0%</dd>
					<dd>2016년 5월 : 0.8%</dd>
					<dd>2016년 6월 : 0.8%</dd>
					<dd>2016년 7월 : 0.7%</dd>
					<dd>2016년 8월 : 0.4%</dd>
					<dd>2016년 9월 : 1.2%</dd>
					<dd>2016년 10월 : 1.3%</dd>
					<dd>2016년 11월 : 1.3%</dd>
				</dl>
				<p>출처 : 통계청 소비자 물가상승률 변화(2016년)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con1_3.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-4 : 노후자금 마련에 세액공제까지 -->
	<div id="uiTab1-4" class="con-type1">
		<h3><span class="txt-count">네번째</span>노후자금 마련에<br /><em class="pen2">세액공제</em>까지</h3>
		<p><em>노후자금</em>과 <a href="#tipProCon4" class="ui-tip-position" title="용어설명"><em>세액공제</em></a> 두가지를 한번에 해결! <br />보험료 부담은 줄이고 넉넉한 은퇴자산을 준비할 때입니다.</p>
		<div class="visual">
			<div class="con">
				<p>노후자금 준비 + 목돈마련 + 세액공제</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con1_4.gif" alt=""/></div>
		</div>
		<!-- 용어설명 툴팁 -->
		<div class="tooltip ui-tip-con" id="tipProCon4">
			<dl>
				<dt>세액공제</dt>
				<dd>산출된 세액에서, 정책적으로 일정액을 공제하고 납부할 세금을 정하는 세법 규정을 말합니다.</dd>
			</dl>
		</div>
	</div>
	<a href="#none" class="btn-link" onclick="$('#tabProduct2').click();"><span>그렇다면, <em>ISM생명 인터넷연금저축보험</em>은 어떻게 다를까요?</span></a>
</div>
</div>

					<!-- ## 탭2 : 상품강점 ////////////////////////////////////////////////////////////////  -->
					<!-- CMS 영역 -->
					<div id="uiTabProduct2" class="product-con detail-tab2 on">
						
<h2 class="hd">상품강점</h2>
<div class="menu-skip">
	<ul>
		<li class="pm1"><a href="#uiTab2-1"><span><em>연말정산</em><br><em>세액공제</em> 혜택</span></a></li>
		<li class="pm2"><a href="#uiTab2-2"><span>ISM생명 연금 중<br><em>최고 공시이율</em></span></a></li>
		<li class="pm3"><a href="#uiTab2-3"><span><em>연복리</em> 운영<br><em>최저보증이율</em> <span class="txt-s">(사업비 차감 후 복리부리)</span></span></a></li>
		<li class="pm4"><a href="#uiTab2-4"><span>생명/손보통합<br><em>연금가입 1위</em></span><span class="txt-s">('17.12 금감원 통계기준)</span></a></li>
	</ul>
</div>
<div class="section">
	<!-- # 탭2-1 : 연말정산 세액공제 혜택 -->
	<div id="uiTab2-1" class="con-type1">
		<h3><span class="txt-count">첫번째</span>연말정산<br /><em class="pen2 w230 pen-m10">세액공제 혜택</em></h3>
		<p>노후도 준비하면서 연간 납입보험료의 <em>최대 16.5%</em>까지 <br><em>연말정산</em> <a href="#tipProCon1-1" class="ui-tip-position" title="용어설명" rel="history"><em>세액공제</em></a> 혜택을 받으실 수 있습니다.
			<span class="txt-small">※연금저축계좌 합산 <a href="#tipProCon1-2" class="ui-tip-position" title="용어설명" rel="history">연 400만원 또는 300만원</a> 한도 (관련 세법 요건 부합시)</span>
			<span class="txt-small">※연금저축보험 중도해지시 기타소득세 16.5%가 과세될 수 있습니다.</span>
		</p>
		<div class="visual">
			<div class="con">
				<h4>연금저축 세금절감 효과</h4>
				<p>
					<dl>
						<dt>최대 66만원 세액공제</dt>
						<dd>총급여 5,500만원 이하 근로자 또는 종합소득금액 4,000만원 이하 거주자</dd>
						<dd>연간 납입 보험료 최대 400만원 × 16.5%(지방소득세 1.5% 포함)</dd>
					</dl>
				</p>
				<p>
					<dl>
						<dt>최대 52.8만원 세액공제</dt>
						<dd>그외 거주자 및 근로자</dd>
						<dd>연간 납입 보험료 최대 400만원 × 13.2%(지방소득세 1.2% 포함)</dd>
					</dl>
				</p>
				<p>
					<dl>
						<dt>최대 39.6만원 세액공제</dt>
						<dd>총급여 1억 2천만원 초과 근로자 또는 종합소득금액 1억원 초과 거주자</dd>
						<dd>연간 납입 보험료 최대 300만원 × 13.2%(지방소득세 1.2% 포함)</dd>
					</dl>
				</p>	
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con2_1_1.gif" alt=""/></div>
			<div class="line"></div>

		</div>
		<p><em>연말정산 세액공제</em> vs 비과세혜택 중 무엇을 원하시나요?<br />연금저축보험은 <em>현재의 절세 혜택</em>을 원하시는 분이 선택합니다.</p>
		<div class="visual">
			<div class="con">
				<dl>
					<dt>연금저축보험 연말정산시 절세 혜택</dt>
					<dd>납입기간동안 연말정산 세액공제</dd>
					<dd>추천대상 : 연금저축 미가입자, 자영업자, 직장인</dd>
					<dd>연금개시시점 : 만 55세 부터</dd>
				</dl>
				<dl>
					<dt>연금보험 연금 수령시 절세 혜택</dt>
					<dd>10년 유지시 보험차익 비과세</dd>
					<dd>추천대상 : 금융소득 종합과세 대상자, 주부, 학생, 연금저축 한도 초과자</dd>
					<dd>연금개시시점 : 만 45세 부터</dd>
				</dl>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con2_1_2.gif" alt=""/></div>
		</div>
		<!-- 용어설명 툴팁 -->
		<div class="tooltip ui-tip-con" id="tipProCon1-1">
			<dl>
				<dt>세액공제</dt>
				<dd>산출된 세액에서, 정책적으로 일정액을 공제하고 납부할 세금을 정하는 세법 규정을 말합니다.</dd>
			</dl>
		</div>
		<!-- 용어설명 툴팁 -->
		<div class="tooltip ui-tip-con" id="tipProCon1-2">
			<dl>
				<dt>단, 총급여 1.2억원 또는<br>종합소득금액 1억원 초과자는 300만원</dt>
			</dl>
		</div>
	</div>
	<!-- # 탭2-2 : 당사 최고 공시이율로 더 높은 환급률 -->
	<div id="uiTab2-2" class="con-type1">
		<h3><span class="txt-count">두번째</span>ISM생명 연금 중<br/>최고 공시이율로<br><em class="pen2 w223">더 높은 환급률!</em></h3>
		<p>오직 인터넷에서만 가입가능!<br/><em>ISM생명 최고 공시이율 3.0%!</em><span class="txt-smaller">(’18.8월 기준, 사업비 차감 후 복리부리)</span><br/>오프라인 대비 더 높은 <a href="#tipProCon2" class="ui-tip-position" title="용어설명" rel="history">환급률</a>로 더 많은 연금액 지급!</p>
		<div class="visual">
			<div class="con">
				<h4>환급률 비교</h4>
				<p>환급률 23% UP!</p>
				<dl>
					<dt>연금저축 골드연금보험 2.2</dt>
					<dd>연금액 연 440만원(환급률 149.6%)</dd>
				</dl>
				<dl>
					<dt>인터넷 연금저축보험 1.8</dt>
					<dd>연금액 연 539만원(환급률 172.6%)</dd>
				</dl>
			</div>
			<div class="img">
				<img src="../resources/cms/pc/images/product/pro5_con2_2_1.gif" alt=""/>
				<ul class="txt-type4 mb60">
					<li>기준 : 40세 남, 10년납 65세 연금개시, 월 50만원 납입 시(총 납입액 6,000만원), 종신형 10회 보증</li>
					<li>상기 예상 환급률 및 연금액은 현재 공시이율 3.0% ('18.8월)이 지속된다는 가정하에 산출되었으며<br>공시이율 변동에 따라 변동될 수 있습니다.(공시이율매월변동)</li>
				</ul>
			</div>
			<div class="line"></div>
		</div>
		
		<p style="margin: 40px 0 10px;"><span class="txt-check">연말정산 세액공제 혜택을 최대로 받으려면? <strong class="txt-c2">월 34만원 씩!</strong>(관련세법충족시)</span></p>
		<p><span class="txt-check">평생동안 매월 100만원씩의 연금을 받고 싶다면 <strong class="txt-c2">추천 플랜을 따라 준비해보세요!</strong></span></p>
		
		<div class="visual">
			<div class="con">
				<table>
					<caption>인터넷 연금저축보험 해지 환급금/환급률 예시</caption>
					<thead>
						<tr>						
							<th scope="colgroup" colspan="6">추천플랜1(30세 남성) 매월 100만원씩 연금받는 플랜</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="col">연금개시나이</th>
							<th scope="col">납입기간</th>
							<th scope="col">월 납입 금액</th>
							<th scope="col">총 이자</th>
							<th scope="col">환급률</th>
							
						</tr>
						<tr>
							<td>65세</td>
							<td>20년</td>
							<td>50만원</td>
							<td>1억 2,444만원</td>
							<td>환급률 203.7%</td>
						</tr>
					</tbody>
					<tfoot>
					    <tr>
					        <td>매년 연말정산 시 66만원 세액공제 혜택</td>
					        <td>평생토록 매년 1,251만원의 연금 수령</td>
					    </tr>
					</tfoot>
				</table>
				<table>
					<caption>인터넷 연금저축보험 해지 환급금/환급률 예시</caption>
					<thead>
						<tr>
						<th scope="colgroup" colspan="6">추천플랜2(40세 남성) 매월 100만원씩 연금받는 플랜</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="col">연금개시나이</th>
							<th scope="col">납입기간</th>
							<th scope="col">월 납입 금액</th>
							<th scope="col">총 이자</th>
							<th scope="col">환급률</th>
							
						</tr>
						<tr>
							<td>65세</td>
							<td>10년</td>
							<td>120만원</td>
							<td>1억 526만원</td>
							<td>환급률 173.1%</td>
						</tr>
					</tbody>
					<tfoot>
					    <tr>
					        <td>매년 연말정산 시 66만원 세액공제 혜택</td>
					        <td>평생토록 매년 1,297만원의 연금 수령</td>
					    </tr>
					</tfoot>
				</table>
			</div>
			<div class="img">
				<img src="../resources/cms/pc/images/product/pro5_con2_2_2.gif" alt="">
				<ul class="txt-type4 mb60">
					<li>종신형 10회 보증 연금수령선택시</li>
					<li>해당 예시는 현재 공시이율이 지속 될 경우이며, 공시이율에 따라 변동될 수 있습니다.</li>
					<li>연간 납입보험료 66만원 세액공제(400만원 한도, 15.6%) 총급여 5,500만원 이하 근로자<br>또는 종합소득 4,000만원 이하 거주자</li>
				</ul>

			</div>
		</div>
		<!-- 용어설명 툴팁 -->
		<div class="tooltip ui-tip-con" id="tipProCon2">
			<dl>
				<dt>환급률</dt>
				<dd>보험계약 후 만기 또는 해지로 인하여 보험사가 고객님에게 보험료를 돌려드릴 경우 원금 대비 지급받은 비율을 의미합니다.</dd>
			</dl>
		</div>
	</div>
	<!-- # 탭2-3 : 연복리 운영 최저금리 보증 -->
	<div id="uiTab2-3" class="con-type1">
		<h3><span class="txt-count">세번째</span>연복리 운영 <br /><em class="pen2 w260">최저보증이율 적용</em></h3>
		<p><em>연복리</em>와 <em>최저보증이율 적용</em>으로 수익성은 물론 안정성까지! <br />은퇴 준비를 위한 필수 상품!</p>
		<div class="visual">
			<div class="con">
				<table>
					<caption>복리와 단리 비교</caption>
					<thead>
						<tr>
							<th scope="col">구분</th>
							<th scope="col">1년</th>
							<th scope="col">10년</th>
							<th scope="col">30년</th>
							<th scope="col">50년</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th scope="row">복리</th>
							<td>4,115,709원</td>
							<td>48,779,317원</td>
							<td>219,151,425원</td>
							<td>582,453,996원</td>
						</tr>
						<tr>
							<th scope="row">단리</th>
							<td>4,154,786원</td>
							<td>47,760,888원</td>
							<td>184,702,824원</td>
							<td>376,871,640원</td>
						</tr>
					</tbody>
				</table>
				<p>월 34만원, 4% 가정시</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro5_con2_3.gif" alt=""/>
				<ul class="txt-type4 mb60">
					<li>예시 수익률은 당사 보험상품의 실제 수익률과는 무관하며 복리효과를 비교하기 위한 예시</li>
					<li>변동금리, 사업비 차감 후 부리</li>
				</ul>
			</div>
		</div>
	</div>
	<!-- # 탭2-4 : 생명/손보통합 연금가입 1위 -->
	<div id="uiTab2-4" class="con-type1">
		<h3><span class="txt-count">네번째</span>생명/손보통합 <br /><em class="pen2 w196 pen-m5">연금가입 1위</em></h3>
		<p>생명&middot;손해보험 통합 <em>연금가입 1위!</em><br />가장 많은 고객이 선택한, 든든한 ISM생명 연금저축보험!</p>
		<ul class="list-data list4">
			<li class="ic1">신용등급 <strong>13년 연속 AAA</strong> <span>(2016.11 한국신용평가)</span></li>
			<li class="ic2">국가고객만족도(NCSI) <strong>14년 연속 1위</strong> <span>(2017 생명보험부문, 한국생산성본부)</span></li>
			<li class="ic5">보유계약건수 <strong>1위</strong> <span>(2017.12, 금감원통계)</span></li>
			<li class="ic6">전용 콜센터 <strong>전문가 1:1 상담</strong></li>
		</ul>
	</div>
<!-- # 탭2-5 : 1위에 빛나는 ISM생명 -->
	<div id="uiTab2-5" class="con-award">
		<h3>1위에 빛나는 <em class="txt-c2">ISM생명!</em></h3>
		<p>역시 생명보험사 <strong>판매 1위 ISM생명</strong><br><span class="txt-smaller">(금감원 통계 가입건수.수입보험료 기준,2017.12)</span><br>대외기관 수상으로 공신력을 더욱 인정받았습니다</p>
		<img src="../resources/cms/pc/images/product/img_product_award3.png" alt="생활형 재테크 정보가 가득한 은퇴라운지 오픈">
		<ul class="hd">
			<li>국가고객만족도<strong>13년 연속 1위</strong> <span>(한국생산성본부)</span></li>
			<li>소비자 평가 No.1 브랜드 <strong>대상 수상</strong> <span>(2016. 중앙일보 선정)</span></li>
			<li>소비자 선정 올해의 톱 브랜드<strong>대상 수상</strong> <span>(2016. 조선비즈 선정)</span></li>
		</ul>
	</div>
</div>
</div>

					<!-- ## 탭3 : 상품세부정보 /////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct3" class="product-con detail-tab3">
						
<form id = "planDocForm">
    <input type="hidden" name="prcd" value="A028501ANN"/>
</form>
<h2 class="hd">상품세부내용</h2>
<div class="section">
	<div class="top">
		<ul class="tab-sub1">
			<li class="on"><a href="#uiTab3-1" onClick="n_logging('annuity','annuity-tab3','tab1','');">상품 기본 정보 요약</a></li>
			<li><a href="#uiTab3-2" onClick="n_logging('annuity','annuity-tab3','tab2','');">보장 내용 예시</a></li>
			<li class="last"><a href="#uiTab3-3" onClick="annuityExampleCalc();n_logging('annuity','annuity-tab3','tab3','');">보험료 및 해지환급금 예시</a></li>
		</ul>
		<a href="#none" class="btn-type1 down" title="약관 다운로드" onclick="policyDown();ga('send','event','Direct','Etc','annuity_sub-menu_2_download',1);"><span>약관 다운로드</span></a>
	</div>
	<!-- # 탭3-1 : 상품상세정보 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-1" class="on">
		<h3 class="hd">상품 기본 정보 요약</h3>
		<!-- 기본정보 -->
		<div class="tit-type3">
			<h4 class="heading">기본정보</h4>
		</div>
		<table class="tbl-type3 form" summary="보험상품명/보험계약자,피보험자/가입연령/보험료 납입기간/보험료 납입주기/가입한도/연금지급개시나이/연금 지급방법 안내">
			<caption>연금보험 상품 기본 정보</caption>
			<colgroup><col width="20%" /><col width="*" /></colgroup>
			<tbody>
				<tr>
					<th scope="row">보험상품명</th>
					<td>ISM생명 인터넷연금저축보험1.8(무배당)</td>
				</tr>
				<tr>
					<th scope="row">보험계약자, 피보험자</th>
					<td class="ui-tip-wrapper">
						<a href="#tipMemo1-1" class="link-icon tip2 ui-tip-position" title="용어설명">보험계약자</a>와 <a href="#tipMemo1-2" class="link-icon tip2 ui-tip-position" title="용어설명">피보험자</a>가 동일한 경우에 한하여 가입 가능
						<div class="tooltip ui-tip-con" id="tipMemo1-1">
							<dl>
								<dt>보험계약자</dt>
								<dd>보험자인 보험 회사를 상대로 하여 보험 계약을 맺고 보험 회사에 보험료를 지급하는 사람을 말합니다.</dd>
							</dl>
						</div>
						<div class="tooltip ui-tip-con" id="tipMemo1-2">
							<dl>
								<dt>피보험자</dt>
								<dd>생명보험에서 보험사고 발생의 대상이 되는 사람을 의미합니다.</dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">가입연령</th>
					<td>20세 ~ 최대 75세</td>
				</tr>
				<tr>
					<th scope="row">보험료 납입기간</th>
					<td class="ui-tip-wrapper">
						5년/7년/10년이상납, <a href="#tipMemo1-3" class="link-icon tip2 ui-tip-position" title="용어설명">전기납</a>
						<p class="txt-type4">전기납은 보험료 납입기간이 10년 초과인 경우에만 적용</p>
						<div class="tooltip ui-tip-con" id="tipMemo1-3">
							<dl>
								<dt>전기납</dt>
								<dd>보험기간의 전 기간에 걸쳐 보험료를 납입하는 방법입니다.</dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">보험료 납입주기</th>
					<td>
						<ul>
							<li>기본보험료 : 월납</li>
							<li>추가납입보험료 : 수시납</li>
						</ul>
					</td>
				</tr>
				<tr>
					<th scope="row">가입한도</th>
					<td>월 6만원 ~ 150만원</td>
				</tr>
				<tr>
					<th scope="row">연금지급개시나이</th>
					<td>만 55세~80세 (연단위로 선택가능)
						<p class="txt-type4">연금지급개시 전까지 연금지급개시나이 범위 내에서 단축 및 연장가능 (단, 확정기간연금형 5년형 선택가능 요건 충족 필요)</p>
						<p class="txt-type4">연금지급개시나이가 만55세 이상에 해당되는지 여부의 판단은 실제 만 나이 적용 </p>
					</td>
				</tr>
				<tr>
					<th scope="row">연금 지급방법</th>
					<td>
						 <ul>
							<li>종신연금형 : 10회 / 20회 / 30회 / 100세 </li>
							<li> 확정기간연금형 : 5년 / 10년 / 15년 / 20년 / 30년</li>
						 </ul>
						 <ul class="txt-type4">
							<li>최초가입시 종신연금형으로 가입, 연금지급개시 신청시 연금지급형태 변경가능</li>
							<li>단, 확정기간연금 5년형을 만 50세 이전 가입시는 만 60세 이상 연금지급개시시 <br />만 50세 이후 가입시는 10년 경과후 연금지급개시시 선택 가능</li>
						</ul>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 납입기간과 가입나이 -->
		<div class="tit-type3">
			<h4 class="heading">납입기간과 가입나이</h4>
			<p class="txt-type4">A : 연금지급개시나이, M: 납입기간</p>
		</div>
		<table class="tbl-type3 list" summary="기본보험료별 5년 납입, 7년 납입, 10년납 이상, 전기납 안내">
			<caption>기본보험료별 나입기간과 가입나이 안내</caption>
			<colgroup><col width="30%" /><col span="4" width="17.5%" /></colgroup>
			<thead>
				<tr>
					<th scope="col">기본보험료</th>
					<th scope="col">5년 납입</th>
					<th scope="col">7년 납입</th>
					<th scope="col">10년납 이상</th>
					<th scope="col">전기납</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td> 6만원 이상~7만원 미만</td>
					<td>31~47세</td>
					<td>20~45세</td>
					<td rowspan="6">20~(A-M)세</td>
					<td rowspan="6">20~(A-M)세</td>
				</tr>
				<tr>
					<td> 7만원 이상~8만원 미만</td>
					<td>20~48세</td>
					<td>20~46세</td>
				</tr>
				<tr>
					<td> 8만원 이상~10만원 미만</td>
					<td>20~48세</td>
					<td>20~47세</td>
				</tr>
				<tr>
					<td> 10만원 이상~13만원 미만</td>
					<td>20~49세</td>
					<td>20~47세</td>
				</tr>
				<tr>
					<td>13만원 이상~26만원 미만</td>
					<td>20~49세</td>
					<td>20~(A-7)세</td>
				</tr>
				<tr>
					<td>26만원 이상</td>
					<td>20~(A-5)세</td>
					<td>20~(A-7)세</td>
				</tr>
			</tbody>
		</table>
		<ul class="txt-type2">
			<li>전기납은 보험료 납입기간이 10년 초과인 경우에만 적용</li>
			<!-- <li>가입한도 내에서 1,000원 단위로 가입가능</li> -->
		</ul>
	</div>

	<!-- # 탭3-2 : 보장 내용 예시 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-2">
		<h3 class="hd">보장 내용 예시</h3>
		<div class="tit-type3">
			<h4 class="heading">주 보험 보장내용</h4>
			<div class="btn">
				<a href="#popPro5Notice2" class="btn-type4 arr" title="주 보험 보장내용 안내"><span>알려드립니다</span></a>
			</div>
		</div>
		<table class="tbl-type3 list" summary="연금지급 개시 전과 연금지급 개시 후의 지금방법, 지급사유, 지금금액 안내">
			<caption>연금저축보험 보장내용</caption>
			<colgroup><col span="2" width="15%" /><col span="2" width="35%" /></colgroup>
			<thead>
				<tr>
					<th scope="col">구분</th>
					<th scope="col">지급방법</th>
					<th scope="col">지급사유</th>
					<th scope="col">지급금액</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">연금지급 개시 전</th>
					<td>-</td>
					<td class="txt ui-tip-wrapper">
						<a href="#tipMemo2-1" class="link-icon tip2 ui-tip-position" title="용어설명">피보험자</a> 사망시
						<div class="tooltip ui-tip-con" id="tipMemo2-1">
							<dl>
								<dt>피보험자</dt>
								<dd>생명보험에서 보험사고 발생의 대상이 되는 사람을 의미합니다.</dd>
							</dl>
						</div>
					</td>
					<td class="txt">사망 당시 적립액</td>
				</tr>
				<tr>
					<th scope="row" rowspan="2">연금지급 개시 후</th>
					<td>종신 연금형</td>
					<td class="txt">연금개시후 보험기간 중 피보험자가  <br/>매년 연계약해당일에 살아 있을 때<br/><p class="txt-type4"><span>단, 피보험자가 사망한 경우에도 보증지급횟수까지의<br/>잔여분은 지급</span></td>
					<td class="txt">연금지급개시시점의 적립액을 기준으로 연금사망률 및 공시이율을 적용하여 산출방법서에 따라 나누어 계산한 연금연액</td>
				</tr>
				<tr class="sub">
					<td>확정기간 연금형</td>
					<td class="txt">연금지급개시시점에 피보험자가 살아있는 경우 연금개시후 보험기간(5년, 10년, 15년, 20년 또는 30년)의 매년 연계약해당일에 피보험자의 생존여부와 관계없이 지급</td>
					<td class="txt">연금지급개시시점의 적립액을 기준으로 공시이율을<br/> 적용하여 산출방법서에 따라 나누어 계산한 연금연액</td>
				</tr>
			</tbody>
		</table>
	</div>

	<!-- # 탭3-3 : 보험료 및 해지환급금 예시 -->
	<!-- CMS 영역 -->
	<div id="uiTab3-3" class="on">
		<h3 class="hd">보험료 및 해지환급금 예시</h3>
		<div class="tit-type3">
			<h4 class="heading">보험료 및 해지환급금</h4>
			<p class="txt-type4">월 34만원씩 10년 동안 납입 할 시(보험나이 30세 남자, 연금개시나이 65세 기준)</p>
		</div>
		<table class="tbl-type3 data-type2" summary="납입보험료 누계, 최저보증이율 가정시와 연복리 임의 가정시의 해지환급금, 환급률 안내">
			<caption>보험료 및 해지환급금</caption>
			<colgroup><col width="8%"><col width="14%"><col span="6" width="13%"></colgroup>
			<thead>
				<tr>
					<th scope="col" rowspan="2">기간</th>
					<th scope="col" rowspan="2">납입보험료 누계</th>
					<th scope="col" colspan="2">최저보증이율 가정시</th>
					<th scope="col" colspan="2">평균공시이율 연복리 2.5% 가정시</th>
					<th scope="col" colspan="2">현재공시이율 연복리 3.0% 가정시</th>
				</tr>
				<tr class="sub">
					<th scope="col">해지환급금</th>
					<th scope="col">환급률</th>
					<th scope="col">해지환급금</th>
					<th scope="col">환급률</th>
					<th scope="col">해지환급금</th>
					<th scope="col">환급률</th>
				</tr>
			</thead>
			<tbody>

<tr><td>3개월</td>						<td>1,020,000원</td><td>973,060원</td><td>95.3%</td>			<td>975,080원</td><td>95.5%</td>    	<td id="0rtnMoney">-원</td><td id="0rtnRatio">-%</td>    	</tr>
<tr><td>6개월</td>						<td>2,040,000원</td><td>1,949,160원</td><td>95.5%</td>    <td>1,956,240원</td><td>95.8%</td>  	<td id="1rtnMoney">1,959,070원</td><td id="1rtnRatio">96%</td>      </tr>
<tr><td>9개월</td>						<td>3,060,000원</td><td>2,928,290원</td><td>95.6%</td>    <td>2,943,460원</td><td>96.1%</td>  	<td id="2rtnMoney">2,949,530원</td><td id="2rtnRatio">96.3%</td>    </tr>
<tr class="on"><td>1년</td>		<td>4,080,000원</td><td>3,910,450원</td><td>95.8%</td>    <td>3,936,750원</td><td>96.4%</td>  	<td id="3rtnMoney">3,947,270원</td><td id="3rtnRatio">96.7%</td>    </tr>
<tr><td>2년</td>							<td>8,160,000원</td><td>7,869,790원</td><td>96.4%</td>    <td>7,971,930원</td><td>97.6%</td>  	<td id="4rtnMoney">8,012,970원</td><td id="4rtnRatio">98.1%</td>    </tr>
<tr><td>3년</td>							<td>12,240,000원</td><td>11,878,630원</td><td>97%</td>    <td>12,107,990원</td><td>98.9%</td> 	<td id="5rtnMoney">12,200,640원</td><td id="5rtnRatio">99.6%</td>   </tr>
<tr><td>4년</td>							<td>16,320,000원</td><td>15,937,570원</td><td>97.6%</td>  <td>16,347,440원</td><td>100.1%</td>	<td id="6rtnMoney">16,513,930원</td><td id="6rtnRatio">101.1%</td>  </tr>
<tr class="on"><td>5년</td>		<td>20,400,000원</td><td>20,047,250원</td><td>98.2%</td>  <td>20,692,890원</td><td>101.4%</td>	<td id="7rtnMoney">20,956,630원</td><td id="7rtnRatio">102.7%</td>  </tr>
<tr><td>6년</td>							<td>24,480,000원</td><td>24,152,920원</td><td>98.6%</td>  <td>25,146,970원</td><td>102.7%</td>	<td id="8rtnMoney">25,532,600원</td><td id="8rtnRatio">104.2%</td>  </tr>
<tr><td>7년</td>							<td>28,560,000원</td><td>28,299,650원</td><td>99%</td>    <td>29,712,400원</td><td>104%</td>  	<td id="9rtnMoney">30,245,860원</td><td id="9rtnRatio">105.9%</td>  </tr>
<tr><td>8년</td>							<td>32,640,000원</td><td>32,541,170원</td><td>99.6%</td>  <td>34,445,730원</td><td>105.5%</td>	<td id="10rtnMoney">35,154,420원</td><td id="10rtnRatio">107.7%</td>  </tr>
<tr><td>9년</td>							<td>36,720,000원</td><td>36,825,110원</td><td>100.2%</td> <td>39,297,390원</td><td>107%</td>  	<td id="11rtnMoney">40,210,230원</td><td id="11rtnRatio">109.5%</td>  </tr>
<tr class="on"><td>10년</td>	<td>40,800,000원</td><td>41,151,880원</td><td>100.8%</td> <td>44,270,340원</td><td>108.5%</td>	<td id="12rtnMoney">45,417,710원</td><td id="12rtnRatio">111.3%</td>  </tr>
<tr><td>15년</td>							<td>40,800,000원</td><td>42,069,490원</td><td>103.1%</td> <td>49,959,960원</td><td>122.4%</td>	<td id="13rtnMoney">52,522,090원</td><td id="13rtnRatio">128.7%</td>  </tr>
<tr class="on"><td>20년</td>	<td>40,800,000원</td><td>43,010,260원</td><td>105.4%</td> <td>56,397,250원</td><td>138.2%</td>	<td id="14rtnMoney">60,758,010원</td><td id="14rtnRatio">148.9%</td>  </tr>
<tr><td>25년</td>							<td>40,800,000원</td><td>43,974,790원</td><td>107.7%</td> <td>63,680,460원</td><td>156%</td>  	<td id="15rtnMoney">70,305,690원</td><td id="15rtnRatio">172.3%</td>  </tr>
<tr class="on"><td>30년</td>	<td>40,800,000원</td><td>44,963,670원</td><td>110.2%</td> <td>71,920,730원</td><td>176.2%</td>	<td id="16rtnMoney">81,374,080원</td><td id="16rtnRatio">199.4%</td>  </tr>
<tr><td>35년</td>							<td>40,800,000원</td><td>45,977,530원</td><td>112.6%</td> <td>81,243,850원</td><td>199.1%</td>	<td id="17rtnMoney">94,205,370원</td><td id="17rtnRatio">230.8%</td>	</tr>

		
			</tbody>
		</table>
		<ul class="txt-type2">
			<li>상기 예시된 해지환급금 및 환급률은 보험료가 예정납입기간 동안 보험료 납입기일(매월 계약해당일)에 정상적으로 납입되었다는 가정하에 산출되었습니다.</li>
			<li>실제 해지환급금은 공시이율을 적용하여 계산되며, 공시이율 변동 시 해지환급금도 변동됩니다.</li>
                        <li>최저보증이율은 가입 후 5년 이내 연복리 1.25%, 5년 초과 10년 이내 연복리 1.0%, 10년 초과 연복리 0.5%를 말합니다.</li>
		</ul>
	</div>
	</div>
			<!-- ## 탭4 : 자주하는 질문 ////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct4" class="product-con detail-tab4">
						dsds

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