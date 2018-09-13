<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>정기 보험</title>
</head>
<!-- <script type="text/javascript"
   src="../www.googleadservices.com/pagead/f.txt">   
</script> -->
<script type="text/javascript"
   src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
   charset="utf-8"></script>
    <%@ include file="../include/header.jsp"%>
</head>
<body>
   <div id="wrapper"> 
    <!-- 머리 -->
     
  <script>
$(function()
{
   $('.list-result').hide();
});
function premiPlus()
{
   
   $.ajax
   ({
      url:"./termPrem.do",
      type : "post",
      data : 
      {
         paytime : $('#paytime').val(),
         instime : $('#instime').val(),
         gender1 : $('#calcGender1').val(),
         gender2 : $('#calcGender2').val(),
         birth : $('#birth').val(),
         death : $('#death').val()
      },
      dataType : "json",
      contentType : "application/x-www-form-urlencoded; charset=utf-8",//post타입의 content타입 : application/x-www-form-urlencoded;charset=utf-8
      success:function(resD)
      {
         
         $('#resultPremium0').text(resD.mini_result);
         $('#resultPremium2').text(resD.custom_result);
         $('#resultPremium1').text(resD.max_result);
         $('#gobirth').val($('#birth').val()),
         $('#goinstime').val($('#instime').val()),
         $('#gopaytime').val($('#paytime').val()),
         $('#gopayprem').val(resD.custom_result),
         $('.list-result').show();
      },
      error:function(errorData){
         alert("오류발생 : "+errorData.status+":"+errorData.statusText);
      }
   });   
}
</script>
 <!-- # 보험료 계산하기 # -->
  <script>
     function atag() {
        if (birth.value.length <= 7) {
           alert("생년월일을 8개의 숫자로 작성해주세요.");
        } else if (!($("#male").hasClass("on")||$("#female").hasClass("on"))){
                 alert("성별을 선택해주세요.")
        } else if (instime.value == "") {
           alert("보험기간을 선택해주세요.");
        } else if (paytime.value == "") {
           alert("납입기간을 선택해주세요.");
        } else {
           premiPlus();
        }
        return false;
     };
  </script>
  
      <link rel="stylesheet" href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
      <div id="container">
         <%@ include file="../include/Head.jsp"%>
         <!-- page : content /////////////////////////////////////////////////// -->
         <div id="content" class="page-product product2">
            
            <!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
            <div class="product-basic page-change">
            <!-- # 상품기본정보 # -->
      
            <!-- CMS 영역 -->
            <div class="info">
               <h1><span>ISM 다이렉트 </span><strong>인터넷정기보험</strong><em>4.0(무배당)</em></h1>
               <p class="com1">다이렉트로 가입하니까!<br><strong>27% 더 저렴</strong>한 보험료로 사망보험금 준비<br><span class="notice">(자사동일유형 타상품대비)</span></p>
               <p class="com2"><span>필요한만큼만 보장기간을 정해서 합리적인 보험료로 가입<br>(자사 동일유형 타상품대비)</span></p>
            </div>
              
               <form action="" id="formCalculator" onsubmit="premiPlus();">
                     <fieldset>
                     <legend>보험료계산기</legend>
                     <div class="calculator-form">
                        <div class="heading">
                           <h2><strong>간편</strong>계산기</h2>
                           <p class="txt">나의 보험료를 계산해 보세요.</p>
                           <!-- <p class="banner"><img src="../../images/tmp/@banner_calculator.png" alt="@관리자등록배너텍스트"/></p> -->
                        </div>
                        <div class="form">
                           <ul>
                              <!-- 생년월일 -->
                              <li>
                                 <div class="form-wrap1">
                                    <label for="birthday" class="label">생년월일 <span>(예 : 19851015 )</span></label>
                                    <input type="text" autocomplete="off" class="text placeholder numOnly" id="birth" maxlength="8" placeholder="" value="${param.birthday }"/>
                                 </div>
                              </li>
                              <!-- 성별 -->
                              <li>
                                 <div class="label-radiobtn gender">
                                    <span>
                                       <label for="calcGender1" id="male">남자</label>
                                       <input type="radio" name="gender1" class="radio" id="calcGender1" value="1"/>
                                    </span>
                                    <span>
                                       <label for="calcGender2" id="female">여자</label>
                                       <input type="radio" name="gender2" class="radio" id="calcGender2" value="2"/>
                                    </span>
                                 </div>
                              </li>
                              <!-- 보험기간 -->
                              <li>
                                 <span class="select-box">
                                    <select id="instime" name="instime" title="보험기간">
                                       <option value="">보험기간 선택</option>
                                       <option value="10">보험기간 : 10년</option>
                                       <option value="20">보험기간 : 20년</option>
                                       <option value="60">보험기간 : 60세까지</option>
                                       <option value="70">보험기간 : 70세까지</option>
                                    </select>
                                 </span>
                              </li>
                              <!-- 납입기간-->
                              <li>
                                 <span class="select-box">
                                    <select id="paytime" name="paytime" title="납입기간">
                                       <option value="">---납입기간 선택---</option>
                                       <option value="10">납입기간 : 10년</option>
                                       <option value="20">납입기간 : 20년</option>
                                    </select>
                                 </span>
                              </li>
                           </ul>
                           <a href="#" class="btn" onclick="atag();"><span>내 보험료 확인 / 가입</span></a>
                        </div>            
                     </div>
                  </fieldset>
               </form>
            </div>

            <!-- ## 계산결과 /////////////////////////////////////////////////////////////////////////////////////// -->
            <div class="product-result open" id="uiProductResult1" style="display:block;" tabindex="0">
               <!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
               <div class="result-area">
                  <h3>보험료 계산결과</h3>
                  <div class="list-result thum ui-list-mode">
                     <div class="data-case2 col1">
                        <!-- 결과1 : 최저보험료 ///////////////////////////////////////////////////////////// -->
                        <div class="box box-result1" id="termCalcResult1-1">
                           <h4 class="heading">
                              <span>최저보험료</span>
                              <strong><span>월</span><span id="resultPremium0">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist1" id="savePlan1" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_1',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt1">5,000</span>만원</strong>
                                 </div>
                              </div>
                              <div class="btn">
                                 <a href="#popSendEmail" class="btn-c1 adb-dist1" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2 adb-dist1" id="goPlan1" onclick="ga('send','event','Direct','Entry','term-top_list_1',1);"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData1" name="jsonResultData" />
                              </div>
                           </div>
                        </div>
                        <!-- 결과2 : 맞춤설계 ////////////////////////////////////////////////////////////// -->
                        
                        <div class="box box-result2 on" id="termCalcResult1-2">
                        <form action="../product/insert_term.do" method="post" name="term_form">
                        <input type="hidden" name="gobirth" id="gobirth"/>
                        <input type="hidden" name="goinstime" id="goinstime"/>
                        <input type="hidden" name="gopaytime" id="gopaytime"/>
                        <input type="hidden" name="gopayprem" id="gopayprem"/>
                        <input type="hidden" name="mode" value="term" />
                           <h4 class="heading">
                              <span>맞춤설계</span>
                              <strong><span>월</span><span id="resultPremium2">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist2" id="savePlan2" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
                              <div class="">
                                 <div class="label"><label for="reCalcPrice1">사망보험금</label></div>
                                 <div class="data">
                                    <span class="select-box">
                                       <select id="death" name="death">
                                          <option value="50000000">5,000만원</option>
                                          <option value="60000000">6,000만원</option>
                                          <option value="70000000">7,000만원</option>
                                          <option value="80000000">8,000만원</option>
                                          <option value="90000000">9,000만원</option>
                                          <option value="100000000">1억</option>
                                          <option value="110000000">1억1000만</option>
                                          <option value="120000000">1억2000만</option>
                                          <option value="130000000">1억3000만</option>
                                          <option value="140000000">1억4000만</option>
                                          <option value="150000000">1억5000만</option>
                                          <option value="160000000">1억6000만</option>
                                          <option value="170000000">1억7000만</option>
                                          <option value="180000000">1억8000만</option>
                                          <option value="190000000">1억9000만</option>
                                          <option value="200000000">2억</option>
                                       </select>
                                    </span>
                                 </div>
                              </div>
                              <div class="btn">
                                 <span class="img-gift"></span>
                                 <a href="#popSendEmail" class="btn-c1 adb-dist2" onclick='atag();'><span>재계산하기</span></a>
                                 <button type="submit"id="goPlan2" ><a href="#" class="btn-c2 adb-dist2"><span>가입하기</span></a></button>
                                 <input type="hidden" id="jsonResultData2" name="jsonResultData" />
                              </div>
                              <div class="btn btn-reset">
                                 <a href="#none" class="btn-c2" id="reCalcPremium" onclick="premiPlus();"><span>재계산하기</span></a>
                              </div>      
                           </div>
                           </form>
                        </div>
                        
                        <!-- 결과3 : 추천보장 ///////////////////////////////////////////////////////////// -->
                        <div class="box box-result3" id="termCalcResult1-3">
                           <h4 class="heading">
                              <span>추천보장</span>
                              <strong><span>월</span><span id="resultPremium1">1억 5천</span>만원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist3" id="savePlan3" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_3',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt3">1억 5천</span>만원</strong>
                                 </div>
                              </div>
                              <div class="btn">
                                 <a href="#popSendEmail" class="btn-c1 adb-dist3" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2 adb-dist3" id="goPlan3" onclick="ga('send','event','Direct','Entry','term-top_list_3',1);"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData3" name="jsonResultData" />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <!-- //계산결과 -->
                  <!-- 팝업링크 -->
                  <div class="view-pop">
                     <a href="#popProResult" class="link-type1" onclick="clickDetailTab(1);"><span>보장내용보기</span></a>
                     <a href="#popProResult" class="link-type1" onclick="clickDetailTab(2);"><span>해지환급금</span></a>
                  </div>
                  <!-- 유틸버튼 -->
                  <div class="area-util">
                     <a href="#none" class="icon-util print" title="인쇄하기" id="doPrintNew" onclick="fn_printEntire();">인쇄하기</a>
                     <a href="#popSendEmail" class="icon-util email" title="이메일보내기" onclick='clearMail("삼성생명 인터넷정기보험3.0(무배당)");'>이메일보내기</a>
                  </div>
               </div>
            </div>
            
            <!-- # 계산영역으로 이동 ////////////////////////////////////////////////////////////////////////////// -->
				<div class="product-skip">
					<a href="#formCalculator">보험료계산 영역으로 이동<span></span></a>
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
						<li><a href="#uiTabProduct1" onclick="n_logging('annuity','annuity-tab1','','');ga('send','event','Direct','Etc','annuity_sub-menu_1',1);"><span>정기보험 필요성</span></a></li>
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
		<li class="pm1"><a href="#uiTab1-1"><span>예상치 못한<br /> <em>다양한 위험</em></span></a></li>
		<li class="pm2"><a href="#uiTab1-2"><span>우리가족 필요자산<br /><em>약 2억원</em></span></a></li>
		<li class="pm3"><a href="#uiTab1-3"><span>기혼자 사망보험<br />준비 <em>약 25%</em></span></a></li>
		<li class="pm4"><a href="#uiTab1-4"><span><em>빠른 준비<br/>= </em>보험료 절약<em></span></a></li>
	</ul>
</div>
<div class="section">
	<!-- # 탭1-1 : 예상치 못한 위험 -->
	<div id="uiTab1-1" class="con-type1">
		<h3><span class="txt-count">첫번째</span>예상치 못한<br /><em class="pen2 w188 pen-m5">다양한 위험</em></h3>
		<p>갑작스런 사고나 질병, 당장 누구에게나 일어날 수 있습니다. <br />만약 <em>생계를 책임지는 가장이 부재</em>하게 된다면?</p>
		<div class="visual">
			<div class="con">
				<h4>연령별 남성 사망자 비율</h4>
				<ul>
					<li>0~29세 : 남성사망자 비율 2%</li>
					<li>30~59세 : 남성사망자 비율 18%</li>
					<li>60~69세 : 남성사망자 비율 13%</li>
					<li>70세 이상 : 남성사망자 비율 67%</li>
				</ul>
				<p>출처 : 통계청 사망원인통계(2015)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con1_1.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-2 : 우리가족 필요자산 약 2억원 -->
	<div id="uiTab1-2" class="con-type1">
		<h3><span class="txt-count">두번째</span>우리가족 필요자산<br /><em class="pen2">약 2억원</em></h3>
		<p><em>남겨진 가족은 경제적 위기</em>에 놓입니다. <br />최소 1억 9천만원은 있어야 생활이 유지됩니다.</p>
		<div class="visual">
			<div class="con">
				<p>
					4인가족 생활비 : 3년간 8,856만원(출처 : 2014. 통계청 가계동향 조사) +
					자녀 교육비 : 1인당 약 1억원(출처 : 2014. 통계청 가계동향 조사) +
					가구당 부채 : 평균 6,181만원(출처 : 2015. 금융감독원)
				</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con1_2.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-3 : 기혼자 사망보험 준비 25% -->
	<div id="uiTab1-3" class="con-type1">
		<h3><span class="txt-count">세번째</span>기혼자<br /><em class="pen2 w223 pen-m10">사망보험 준비</em><br />약 25%</h3>
		<p>가장의 빈자리를 대신해 <em>가족을 지켜줄 보장자산</em>이 필요하지만<br />그에 대한 준비는 부족합니다.</p>
		<div class="visual">
			<div class="con">
				<p>사망자의 절반 이상이 1,000만원도 안되는 사망보험금을 받고 있습니다.</p>
				<table summary="결혼여부별 사망보험 가입률 안내">
					<caption>결혼여부별 사망보험 가입률</caption>
					<thead>
						<tr>
							<th scope="col">기혼</th>
							<th scope="col">미혼</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>24.9%</td>
							<td>12.8%</td>
						</tr>
					</tbody>
				</table>
				<p>출처 : 보험연구원 보험소비자 설문조사(2015)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con1_3.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭1-4 : 빠른 준비 = 보험료절약 -->
	<div id="uiTab1-4" class="con-type1">
		<h3><span class="txt-count">네번째</span>빠른 준비 <br />= <em class="pen2 w188">보험료절약</em></h3>
		<p><em>한 살이라도 빠를수록</em>, 보다 합리적인 가격으로<br />가정의 미래를 지킬 수 있습니다.</p>
		<div class="visual">
			<div class="con">
				<h4>보험금 2억 보장 가정시</h4>
				<p>오프라인 대비 27% ↓ *40세 기준</p>
				<ul>
					<li>20세 월 14,000원</li>
					<li>30세 월 22,000원(20세 보다 월 8,000원 96만원 추가 납부)</li>
					<li>40세 월 48,000원(30세 보다 월 26,000원 312만원 추가 납부)</li>
					<li>50세 월 108,000원(40세 보다 월 60,000원 720만원 추가 납부)</li>
				</ul>
				<p>(삼성생명 인터넷 정기보험4.0(무) 보험기간 20년 납입기간 전기납 기준)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con1_4.gif" alt=""/></div>
		</div>
	</div>
	<a href="#none" class="btn-link" onclick="$('#tabProduct2').click();"><span>그렇다면, <em>삼성생명 인터넷정기보험</em>은 어떻게 다를까요?</span></a>
</div>
</div>

					<!-- ## 탭2 : 상품강점 ////////////////////////////////////////////////////////////////  -->
					<!-- CMS 영역 -->
					<div id="uiTabProduct2" class="product-con detail-tab2 on">
						
<h2 class="hd">상품강점</h2>
<div class="menu-skip">
	<ul>
		<li class="pm1"><a href="#uiTab2-1"><span><em>합리적</em>인 <em>가격</em><br/><em>합리적</em>인 <em>보장</em></span></a></li>
		<li class="pm2"><a href="#uiTab2-2"><span><em>필요한 기간만큼</em><br/>보장 가능</span></a></li>
		<li class="pm3"><a href="#uiTab2-3"><span>보험금<br/>최대 <em>2억원</em> 보장</span></a></li>
		<li class="pm4"><a href="#uiTab2-4"><span>든든한<br/><em>1등 삼성생명</em></span></a></li>
	</ul>
</div>
<div class="section">
	<!-- # 탭2-1 : 합리적인 보험료 -->
	<div id="uiTab2-1" class="con-type1">
		<h3><span class="txt-count">첫번째</span>합리적인 가격<br /><em class="pen2 w230 pen-m10">합리적인 보장</em></h3>
		<p>종신보험보다 <em>합리적인 보험료</em> 인터넷 가입으로 <em>27% 더 저렴하게!</em></p>
		<p>
			<span class="txt-check">필요한 기간만큼만 집중 보장 받으니까 <strong class="txt-c2">보험료 DOWN!</strong></span>
		</p>
		<p>	
			<span class="txt-check">인터넷으로 쉽고 편리하게 가입하니까 <strong class="txt-c2">한번 더 보험료 DOWN!</strong><span class="txt-smaller">(자사 동일유형 타상품 대비)</span></span>
		</p>
		<div class="visual">
			<div class="con">
				<h4>40세 남자 사망보장 1억 기준 정기보험, 종신보험 보험료 비교<span>(종신보험:60세납/평생 보장, 정기보험:60세납/60세 보장)</span></h4>
				<dl>
					<dt>자사 통합유니버설종신보험 3.0(무배당)</dt>
					<dd>월 287,000원</dd>
				</dl>
				<p>내가 정한 기간만큼 합리적으로 보장<br/>종신보험 대비 86% 저렵하게!</p>
				<dl>
					<dt>VIP정기보험 5.0(무배당)</dt>
					<dd>월 38,000원</dd>
				</dl>
				<p>같은 정기보험도<br/>인터넷으로 가입하면 27% 더 절약!</p>
				<dl>
					<dt>인터넷 정기보험 4.0(무배당)</dt>
					<dd>월 24,000원</dd>
				</dl>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con2_1.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭2-2 : 필요한 기간만큼 보장 가능 -->
	<div id="uiTab2-2" class="con-type1">
		<h3>
			<span class="txt-count">두번째</span>
			<em class="pen2 w188 pen-m10">필요한 기간</em>만큼<br />
			보장 가능
		</h3>
		<p>
			자녀 교육자금, 결혼, 은퇴시기에 따라<br />
			<em>집중보장 기간</em>을 자유롭게 선택할 수 있습니다.
		</p>
		<div class="visual">
			<div class="con">
				<ul>
					<li>부모 30세 : 가입시점</li>
					<li>부모 50세(자녀 20세) : 본인은퇴(20년 만기)</li>
					<li>부모 60세(자녀 30세) : 자녀결혼(60세 만기)</li>
					<li>부모 70세(자녀 40세) : 노후(70세 만기)</li>
				</ul>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con2_2.gif" alt=""/></div>
		</div>
	</div>
	<!-- # 탭2-3 : 보험금 최대 2억원 보장 -->
	<div id="uiTab2-3" class="con-type1">
		<h3><span class="txt-count">세번째</span>보험금<br /><em class="pen2">최대 2억원</em> 보장</h3>
		<p>가족의 생활자금부터 자녀 교육까지<br><em>최대 2억</em>까지 보장해드립니다.<br><span class="txt-smaller">(고의적 사고 및 2년 이내 자살은 보장되지 않습니다)</span></p>
		<div class="visual">
			<div class="con">
				<dl>
					<dt>4인가족 3년 소비지출</dt>
					<dd>월평균 소비지출 300만원 X 36개월 = 약 1억 8백만원</dd>
					<dt>필수 목돈 지출</dt>
					<dd>1인당 자녀 교육비 약 1.1억원</dd>
				</dl>
				<p>결론적으로 둘을 합친 금액은 최소 생활비 = 약 2억 2천만원 이 됩니다.</p>
				<p>출처 : 통계청 가계동향조사(2016)</p>
			</div>
			<div class="img"><img src="../resources/cms/pc/images/product/pro2_con2_3.gif" alt=""/></div>
		</div>
		<!-- 용어설명 툴팁 -->
		<div class="tooltip ui-tip-con" id="tipProCon1">
			<dl>
				<dt>종신보험</dt>
				<dd>생명보험 중 사망보험에 속하는 보험. 보험기간을 한정하지 않고, 피보험자가 사망할 때까지를 보험기간으로 한다.</dd>
			</dl>
		</div>
	</div>
	<!-- # 탭2-4 : 든든한 1등 삼성생명-->
		<div id="uiTab2-4" class="con-type1">
			<h3><span class="txt-count">네번째</span>든든한<br><em class="pen2 w188">1등 삼성생명</em></h3>
			<p><em>생명보험사 자산규모 1위 기업</em><br>대한민국이 인정한 든든한 삼성생명!</p>
			<ul class="list-data list4">
				<li class="ic1">신용등급 <strong>13년 연속 AAA</strong> <span>(2016.11 한국신용평가)</span></li>
				<li class="ic2">국가고객만족도(NCSI) <strong>14년 연속 1위</strong> <span>(2017 생명보험부문, 한국생산성본부)</span></li>
				<li class="ic5">보유계약건수 <strong>1위</strong> <span>(2017.12, 금감원통계)</span></li>
				<li class="ic6">전용 콜센터 <strong>전문가 1:1 상담</strong></li>
			</ul>
		</div>
<!-- # 탭2-5 : 1위에 빛나는 삼성생명 -->
		<div id="uiTab2-5" class="con-award">
			<h3>1위에 빛나는 <em class="txt-c2">삼성생명!</em></h3>
			<p>역시 생명보험사 <strong>판매 1위 삼성생명</strong><br><span class="txt-smaller">(금감원 통계 가입건수.수입보험료 기준,2017.12)</span><br>대외기관 수상으로 공신력을 더욱 인정받았습니다</p>
			<img src="../resources/cms/pc/images/product/img_product_award3.png" alt="생활형 재테크 정보가 가득한 은퇴라운지 오픈">
			<ul class="hd">
				<li>국가고객만족도<strong>13년 연속 1위</strong> <span>(한국생산성본부)</span></li>
				<li>소비자 평가 No.1 브랜드 <strong>대상 수상</strong> <span>(2016. 중앙일보 선정)</span></li>
				<li>소비자 선정 올해의 톱브랜드<strong>대상 수상</strong> <span>(2016. 조선비즈 선정)</span></li>
			</ul>
		</div>
</div>
</div>

					<!-- ## 탭3 : 상품세부정보 /////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct3" class="product-con detail-tab3">
						
<form id = "planDocForm">
    <input type="hidden" name="prcd" value="A028901ANNNNNNN"/>
</form>
<h2 class="hd">상품세부내용</h2>
<div class="section">
	<div class="top">
		<ul class="tab-sub1">
			<li class="on"><a href="#uiTab3-1" onClick="n_logging('term','term-tab3','tab1','');">상품 기본 정보 요약</a></li>
			<li><a href="#uiTab3-2" onClick="n_logging('term','term-tab3','tab2','');">보장 내용 예시</a></li>
			<li class="last"><a href="#uiTab3-3" onClick="n_logging('term','term-tab3','tab3','');">보험료 및 해지환급금 예시</a></li>
		</ul>
		<a href="#none" class="btn-type1 down" title="약관 다운로드" onclick="policyDown(true);ga('send','event','Direct','Etc','term_sub-menu_2_download',1);"><span>약관 다운로드</span></a>
	</div>
	<!-- # 탭3-1 : 상품 기본 정보 요약 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-1" class="on">
		<h3 class="hd">상품 기본 정보 요약</h3>
		<div class="tit-type3">
			<h4 class="heading">기본 정보</h4>
		</div>
		<table class="tbl-type3 form" summary="보험상품명/보험계약자,피보험자/가입연령/보험기간/납입기간/보험료 납입주기/가입한도/보험료 지급형태 안내">
			<caption>정기보험 상품 기본 정보 요약 안내</caption>
			<colgroup>
				<col width="20%" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th scope="row">보험상품명</th>
					<td>삼성생명 인터넷정기보험4.0(무배당)</td>
				</tr>
				<tr>
					<th scope="row">보험계약자,피보험자</th>
					<td class="ui-tip-wrapper">
						<a href="#tipMemo2-1" class="link-icon tip2 ui-tip-position" title="용어설명">보험계약자</a>, <a href="#tipMemo2-2" class="link-icon tip2 ui-tip-position" title="용어설명">피보험자</a> 동일한 경우만 가입 가능
						<div class="tooltip ui-tip-con" id="tipMemo2-1">
							<dl>
								<dt>보험계약자</dt>
								<dd>보험자인 보험 회사를 상대로 하여 보험 계약을 맺고 보험 회사에 보험료를 지급하는 사람을 말합니다.</dd>
							</dl>
						</div>
						<div class="tooltip ui-tip-con" id="tipMemo2-2">
							<dl>
								<dt>피보험자</dt>
								<dd>생명보험에서 보험사고 발생의 대상이 되는 사람을 의미합니다.</dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">가입연령</th>
					<td>20~49세 (※ 보험기간 및 납입기간에 따라 가입나이는 차이가 있을 수 있음)</td>
				</tr>
				<tr>
					<th scope="row">보험기간</th>
					<td>10년 / 20년 만기, 60세 / 65세 / 70세 만기</td>
				</tr>
				<tr>
					<th scope="row">납입기간</th>
					<td class="ui-tip-wrapper">
						10년 / 20년납, <a href="#tipMemo2-3" class="link-icon tip2 ui-tip-position" title="용어설명">전기납</a>
						<div class="tooltip ui-tip-con" id="tipMemo2-3">
							<dl>
								<dt>전기납</dt>
								<dd>보험기간의 전 기간에 걸쳐 보험료를 납입하는 방법입니다.</dd>
							</dl>
						</div>
					</td>
				</tr>
				<tr>
					<th scope="row">보험료 납입주기</th>
					<td>월납</td>
				</tr>
				<tr>
					<th scope="row">가입한도</th>
					<td>5,000만원 ~ 2억원(기계약 합산 기준)</td>
				</tr>
				<tr>
					<th scope="row">보험금 지급형태</th>
					<td>일시금 지급</td>
				</tr>
			</tbody>
		</table>
	</div>
	
	<!-- # 탭3-2 : 보장 내용 예시 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-2">
		<h3 class="hd">보장 내용 예시</h3>
		<div class="tit-type3">
			<h4 class="heading">주 보험 보장내용</h4>
			<p class="txt-type4">가입금액 2억원 기준</p>
			<div class="btn">
				<a href="#popPro2Notice2" class="btn-type4 arr" title="주 보험 보장내용 안내"><span>알려드립니다.</span></a>
			</div>
		</div>
		<table class="tbl-type3 list" summary="사망보험금 지급사유별 지급금액 안내">
			<caption>주 보험 보장내용</caption>
			<colgroup>
				<col width="20%" />
				<col width="*" />
				<col width="20%" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">구분</th>
					<th scope="col">지급사유</th>
					<th scope="col">지급금액</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th>사망 보험금</th>
					<td class="txt">피보험자가 보험기간 중 사망시</td>
					<td>20,000만원</td>
				</tr>
			</tbody>
		</table>
		<p class="txt-type2">만기환급금이 없는 순수보장형 상품입니다.</p>
		<p class="line-top">준법감시필(신채널사업부 제15-114호, '15.11.26)</p>
	</div>
	
	<!-- # 탭3-3 : 보험료 및 해지환급금 예시 -->
	<!-- CMS 영역 -->
		<div id="uiTab3-3">
		<h3 class="hd">보험료 및 해지환급금 예시</h3>
		<div class="tit-type3">
			<h4 class="heading">보험료 및 해지환급금</h4>
			<p class="txt-type4">월 22,000원씩 전기납으로 납입 할 시(보험나이 30세 남자, 보험기간 20년 기준)</p>
		</div>
		<table class="tbl-type3 data-type2" summary="기간(3개월~20년)별 납입보험료 누계, 해지환급금, 환급률 안내">
			<caption>보험료 및 해지환급금</caption>
			<colgroup>
				<col width="15%" />
				<col width="*" />
				<col width="*" />
				<col width="*" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col">기간</th>
					<th scope="col">납입보험료 누계</th>
					<th scope="col">해지환급금</th>
					<th scope="col">환급률</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>3개월</td>
					<td>66,000원</td>
					<td>0원</td>
					<td>0%</td>
				</tr>
				<tr>
					<td>6개월</td>
					<td>132,000원</td>
					<td>0원</td>
					<td>0%</td>
				</tr>
				<tr>
					<td>9개월</td>
					<td>198,000원</td>
					<td>0원</td>
					<td>0%</td>
				</tr>
				<tr class="on">
					<td>1년</td>
					<td>264,000원</td>
					<td>0원</td>
					<td>0%</td>
				</tr>
				<tr>
					<td>2년</td>
					<td>528,000원</td>
					<td>64,570원</td>
					<td>12.2%</td>
				</tr>
				<tr>
					<td>3년</td>
					<td>792,000원</td>
					<td>174,850원</td>
					<td>22%</td>
				</tr>
				<tr>
					<td>4년</td>
					<td>1,056,000원</td>
					<td>285,140원</td>
					<td>27%</td>
				</tr>
				<tr class="on">
					<td>5년</td>
					<td>1,320,000원</td>
					<td>387,420원</td>
					<td>29.3%</td>
				</tr>
				<tr>
					<td>10년</td>
					<td>2,640,000원</td>
					<td>724,000원</td>
					<td>27.4%</td>
				</tr>
				<tr>
					<td>15년</td>
					<td>3,960,000원</td>
					<td>744,000원</td>
					<td>18.7%</td>
				</tr>
				<tr>
					<td>20년</td>
					<td>5,280,000원</td>
					<td>0원</td>
					<td>0%</td>
				</tr>
			</tbody>
		</table>
		<p class="txt-type2">상기 예시된 해지환급금 및 환급률은 보험료가 예정납입기간 동안 보험료 납입기일(매월 계약해당일)에 정상적으로 납입되었다는 가정하에 산출되었습니다.</p>
		<p class="line-top">준법감시필(신채널사업부 제16-40호, '16.03.29)</p>
	</div>
	
</div>

<!-- ## POPUP : 알려드립니다(주보험) -->
<div id="popPro2Notice2" class="pop-modal3 ui-pop-call"><!-- open클래스는 스크립트를 통해 추가됨 -->
	<div class="header">
		<h2>알려드립니다</h2>
		<button type="button" class="ui-close">알려드립니다 닫기<span></span></button>
	</div>
	<div class="content">
		<!-- ## 기본내용 ## -->
		<div class="con-notice">
			<ul>
				<li><strong>납입면제사유</strong> : 보험료 납입기간 중 피보험자가 장해분류표 중 동일한 재해 또는 재해 이외의 동일한<br />원인으로 여러 신체부위의 장해지급률을 더하여 50%이상인 장해상태가 되었을 경우 보험료 납입을<br />면제하여 드립니다.</li>
				<li><strong>계약소멸사유</strong> : 피보험자가 보험기간 중 사망하였을 경우 계약 소멸됩니다.</li>
				<li>이 보험에서 '재해'란 약관의 「재해분류표」에서 정한 '보장대상이 되는 재해'를 말하는 것으로서,
					<ul class="list-num">
						<li><span class="num">①</span> 한국표준질병·사인분류상의 (S00~Y84)에 해당하는 원인 중 우발적인 외래의 사고에 의한 것과</li>
						<li><span class="num">②</span> 감염병의 예방 및 관리에 관한 법률 제2조 제2호에서 규정한 감염병을 말합니다.</li>
					</ul>
					<p class="txt-type4">단, 다음에 해당하는 경우 보장대상에서 제외하여 보험금을 지급하지 않습니다.</p>
					<ul>
						<li>질병 또는 체질적 요인이 있는 자로서 경미한 외부요인에 의하여 발병하거나 또는 그 증상이 더욱<br />악화된 경우</li>
						<li>과로 및 격심한 또는 반복적 운동(X50), 탈수, 질병에 의한 호흡장해 및 삼킴장해 등 우발적인 외래의<br />사고로 보기 어려운 경우 등</li>
					</ul>
					<p class="txt-type2">보다 자세한 사항은 약관의 별표 중 재해분류표를 확인하시기 바랍니다.</p>
				</li>
				<li>장해지급률의 결정은 약관의 장해분류표를 기준으로 합니다.</li>
				<li>동일한 원인으로 두 가지 이상의 장해가 생긴 때에는 각각에 해당하는 장해지급률을 더하여 최종<br />장해지급률을 결정하지만, 동일한 신체부위에 장해분류표상의 2가지 이상의 장해가 발생한 경우에는<br />더하지 않고 그 중 높은 장해지급률을 적용합니다.</li>
			</ul>
			<p class="txt-type4">상기 내용은 고객님의 이해를 돕기 위해 보장내용을 간단히 요약한 것이므로 단순 참고만 하시고,<br />보다 자세한 사항은 약관, 상품설명서, 가입설계서 등을 반드시 확인하시기 바랍니다.</p>
		</div>
		<!-- ## 하단 버튼 ## -->
		<div class="btn-area">
			<a href="#none" class="btn-type2 c1 ui-close"><span>확인</span></a>
		</div>
	</div>
</div>
<script type="text/javascript">
<!--
	$plugin.togglecon($('.tab-sub1 li'),{
		toggle_type : 'tab',
		selector : '.tab-sub1 li',
		selector_group : true,
		selector_btn: '>a',
		selector_con: '#href',
		class_open : 'on'
	});
//-->
</script>
					</div>
					<!-- ## 탭4 : 자주하는 질문 ////////////////////////////////////////////////////////////////  -->
					<div id="uiTabProduct4" class="product-con detail-tab4">
						
<h2 class="hd">자주하는 질문</h2>
<div class="section">
	</div>
</div>
         <!-- 머리끝 -->

      </div>
      <div id="footer">
         <%@ include file="../include/footer.jsp"%>
      </div>
      <!-- 푸터끝 -->
		
   </div>
</body>
</html>