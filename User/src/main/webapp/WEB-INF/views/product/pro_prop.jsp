<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>실손 보험</title>
</head>
<script type="text/javascript"
	src="../www.googleadservices.com/pagead/f.txt">
	
</script>

<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">
		  <!-- 머리 -->
      
      <link rel="stylesheet"
         href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
      <div id="container">
         <%@ include file="../include/Head.jsp"%>
         
         <!-- 내용시작 -->
         <!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
         <div class="product-basic page-change">
            <!-- # 상품기본정보 # -->
            <!-- CMS 영역 -->
         <div class="info">
            <h1><span>삼성생명</span><strong>인터넷 실손의료비보장보험</strong><em>1.0 (기본형/갱신형/무배당)</em></h1>
            <p class="com1"><strong>입원</strong>과 <strong>통원</strong>,<br/><strong>질병</strong>과 <strong>상해</strong>에 대비!</p>
            <p class="com2"><span>이제 인터넷으로 간편하게<br/>실손의료비보장보험을 만나보세요!</span></p>
         </div>
         
         <!-- # 보험료 계산하기 # -->
         <form action="#" id="formCalculator">
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
                              <input type="text" autocomplete="off" class="text placeholder numOnly" maxlength="8" id="birthday"/>
                           </div>
                        </li>
                        <!-- 성별 -->
                        <li>
                           <div class="label-radiobtn gender">
                              <span>
                                 <label for="calcGender1">남자</label>
                                 <input type="radio" name="pgender" class="radio" id="calcGender1" value="1"/>
                              </span>
                              <span>
                                 <label for="calcGender2">여자</label>
                                 <input type="radio" name="pgender" class="radio" id="calcGender2" value="2"/>
                              </span>
                           </div>
                        </li>
                                       
                        <!-- 보험기간 -->
                        <li>
                           <span class="select-box" style="display:none;">
                              <select id="insTerm" title="보험기간">
                                 <option value="">보험기간 선택</option>
                              </select>
                           </span>
                        </li>
                        <li>
                           <span class="label-check">
                              <label for="mdcrRcbfrYn">의료수급권자 여부</label>
                              <input type="checkbox" class="check" id="mdcrRcbfrYn" name="mdcrRcbfrYn" value="Y"  title="의료수급권자선택"  />
                           </span>
                           <div class="tooltip-area ui-tip-move">
                              <a href="#tipMedical9-3" class="icon-tip side">안내문구보기</a>
                              <div class="tooltip right" id="tipMedical9-3">
                                 <dl>
                                    <dt>* 의료수급권자</dt>
                                    <dd>　생활이 어려운 저소득자 대상으로 국가가<br/>　의료비를 보장해 주는 의료급여제도의 대상자</dd>
                                 </dl>
                              </div>
                           </div>
                        </li>
                     </ul>
                     <input type="hidden" id="napTerm" name="napTerm" value="1" />
                     <a href="#none" class="btn" id="calcPremium"><span>내 보험료 확인 / 가입</span></a>
                  </div>
               </div>
            </fieldset>
         </form>
         </div>
         
         <div class="product-result open" id="uiProductResult1" style="display:block;" tabindex="0">
         <!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
         <div class="result-area">
            <h3>보험료 계산결과</h3>
            <!-- 계산결과 : .list-result.thum  -->
            <div class="list-result thum ui-list-mode">
               <div class="data-case1">
                  <!-- 결과 ///////////////////////////////////////////////////////////// -->
                  <div class="box box-result1 on">
                     <h4 class="heading">
                        <span id="prdtgb"></span>
                        <strong><span>월납</span><span id="monthlyPremium1" data-gtm-vis-recent-on-screen-8355294_25="29377" data-gtm-vis-first-on-screen-8355294_25="29377" data-gtm-vis-total-visible-time-8355294_25="100" data-gtm-vis-has-fired-8355294_25="1">0,000</span>원</strong>
                        <a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga('send','event','Direct','Etc','Check-info_medical-top_list_1',1);" rel="history">설계저장</a>
                     </h4>
                     <div class="con">
                        <span class="sub-tit">주보험</span>
                        <ul>
                           <li data-role="ui-guarantee-disease">
                              <div class="label"><span>질병입원보장</span></div>
                              <div class="data">
                                 <strong>5,000만원 한도</strong>
                              </div>
                              <div class="select">
                                 <div class="tooltip-area">
                                    <a href="#tipMedicalTip1" class="icon-tip " rel="history">안내문구보기</a>
                                    <div class="tooltip right" id="tipMedicalTip1">
                                       <dl>
                                          <dt>* 표준형</dt>
                                          <dd>　급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
                                       <br>
                                          <dt>* 선택형Ⅱ</dt>
                                          <dd>　급여 중 본인부담금의 90%, 비급여의 80%</dd>
                                       </dl>
                                    </div>
                                 </div>
                                 <!-- 상품개정 ui 수정 by syi-->
                                 <span class="select-box">
                                    <select id="selji" title="상품 선택" onchange="setProType(this);">
                                       <option value="9">표준형</option>
                                       <option value="10">선택형Ⅱ</option>
                                       <option value="-999">선택안함</option>
                                    </select>
                                 </span>
                              </div>
                           </li>
                           <li data-role="ui-guarantee-disease">
                              <div class="label"><span>질병통원보장</span></div>
                              <div class="data">
                                 <strong>외래 20만원/처방10만원</strong>
                              </div>
                              <div class="select">
                                 <div class="tooltip-area">
                                    <a href="#tipMedicalTip2" class="icon-tip " rel="history">안내문구보기</a>
                                    <div class="tooltip right" id="tipMedicalTip2">
                                       <dl>
                                          <dt>* 표준형</dt>
                                          <dd>　급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
                                       <br>
                                          <dt>* 선택형Ⅱ</dt>
                                          <dd>　급여 중 본인부담금의 90%, 비급여의 80%</dd>
                                       </dl>
                                    </div>
                                 </div>
                                 <!-- 상품개정 ui 수정 by syi-->
                                 <span class="select-box">
                                    <select id="seljt" title="상품 선택" onchange="setProType(this);">
                                       <option value="11">표준형</option>
                                       <option value="12">선택형Ⅱ</option>
                                       <option value="-999">선택안함</option>
                                    </select>
                                 </span>
                              </div>
                           </li>
                           <li data-role="ui-guarantee-accident">
                              <div class="label"><span>상해입원보장</span></div>
                              <div class="data">
                                 <strong>5,000만원 한도</strong>
                              </div>
                              <div class="select">
                                 <div class="tooltip-area">
                                    <a href="#tipMedicalTip3" class="icon-tip " rel="history">안내문구보기</a>
                                    <div class="tooltip right" id="tipMedicalTip3">
                                       <dl>
                                          <dt>* 표준형</dt>
                                          <dd>　급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
                                       <br>
                                          <dt>* 선택형Ⅱ</dt>
                                          <dd>　급여 중 본인부담금의 90%, 비급여의 80%</dd>
                                       </dl>
                                    </div>
                                 </div>
                                 <!-- 상품개정 ui 수정 by syi-->
                                 <span class="select-box">
                                    <select id="selsi" title="상품 선택" onchange="setProType(this);">
                                       <option value="13">표준형</option>
                                       <option value="14">선택형Ⅱ</option>
                                       <option value="-999">선택안함</option>
                                    </select>
                                 </span>   
                              </div>
                           </li>
                           <li data-role="ui-guarantee-accident">
                              <div class="label"><span>상해통원보장</span></div>
                              <div class="data">
                                 <strong>외래 20만원/처방10만원</strong>
                              </div>
                              <div class="select">
                                 <div class="tooltip-area">
                                    <a href="#tipMedicalTip4" class="icon-tip " rel="history">안내문구보기</a>
                                    <div class="tooltip right" id="tipMedicalTip4">
                                       <dl>
                                          <dt>* 표준형</dt>
                                          <dd>　급여 중 본인부담금과 비급여를 합한 금액의 80%</dd>
                                       <br>
                                          <dt>* 선택형Ⅱ</dt>
                                          <dd>　급여 중 본인부담금의 90%, 비급여의 80%</dd>
                                       </dl>
                                    </div>
                                 </div>
                                 <!-- 상품개정 ui 수정 by syi-->
                                 <span class="select-box">
                                    <select id="selst" title="상품 선택" onchange="setProType(this);">
                                       <option value="16">표준형</option>
                                       <option value="17">선택형Ⅱ</option>
                                       <option value="-999">선택안함</option>
                                    </select>
                                 </span>   
                              </div>
         
                           </li>
                        </ul>
                     </div>
                  </div>
                  <!-- 특약 재계산 ////////////////////////////////////////////////////////////// -->
                  <div class="box box-result2 on">
                     <h4 class="heading">
                        <strong>※ 원하는 특약을 <em class="txt-c1">선택</em>하세요.</strong>
                     </h4>
                     <div class="con">
                        <p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
                        <div class="tooltip-area">
                           <span class="sub-tit">선택특약</span>
                           <a href="#none" class="icon-tip" style="margin: 10px 0 -8px 6px;" rel="history">안내문구보기</a>
                           <div class="tooltip">
                              <dl>
                                 <dt>* 도수치료</dt>
                                 <dd>　손을 이용하여 환자의 근골격 기능 개선,<br>　통증 완화를 위해 시전하는 치료</dd>
                              <br>
                                 <dt>* 체외충격파치료</dt>
                                 <dd>　체외에 충격파를 가해 혈관의 재형성,<br>　힘줄 및 뼈의 치유를 자극하는 치료방법</dd>
                              <br>
                                 <dt>* 증식치료</dt>
                                 <dd>　통증의 소실 및 완화를 목적으로<br>　증식물질을 주사하는 치료</dd>
                              <br>
                                 <dt>* 주사료</dt>
                                 <dd>　주사치료 중 본인이 실제로 부담하는<br>　비급여 주사료를 공제한 금액 내에서 보상</dd>
                              <br>
                                 <dt>* 자기공명영상진단</dt>
                                 <dd>　자기공명영상 장치인 MRI/MRA를<br>　활용하여 환자의 상태를 진단</dd>
                              </dl>
                           </div>
                        </div>
                        <ul>
                           <div id="treatyList1"></div>
                        </ul>
                        <div class="btn">
                           <a href="#popSendEmail" class="btn-c1" onclick="clearMail(&quot;인터넷실손의료비보장보험1.0&quot;);" rel="history"><span>메일발송</span></a>
                           <a href="#none" class="btn-c2" id="goPlan2" onclick="ga('send','event','Direct','Entry','medical-top_list_1',1);" rel="history"><span>가입하기</span></a>
                           <input type="hidden" id="jsonResultData1" name="jsonResultData">
                        </div>
                        
                        <div class="btn btn-reset" style="display: none;">
                           <a href="#none" class="btn-c2" id="reCalcPremium" rel="history"><span>재계산하기</span></a>
                        </div>
            
                     </div>
                  </div>
               </div>
            </div>
            <!-- //계산결과 -->
            <!-- 팝업링크 -->
            <div class="view-pop">
               <a href="#popProResult" class="link-type1" onclick="clickDetailTab(1);" rel="history"><span>보장내용보기</span></a>
               <a href="#popProResult" class="link-type1" onclick="clickDetailTab(2);" rel="history"><span>해지환급금</span></a>
            </div>
            <!-- //팝업링크 -->
            <!-- //이벤트 문구 삽입
            <div class="result-sms-event mes-type2">
               <p class="sub"><span class="on-icon"></span><em class="txt-c1">클릭! </em>가입 1건당 연탄 <em class="txt-c1">10장 기부!</em></p>
            </div> -->
            <!-- 유틸버튼 -->
            <div class="area-util">
               <!-- <a href="#none" class="icon-util print" title="인쇄하기" id="doPrint">인쇄하기</a> -->
               <a href="#none" class="icon-util print" title="인쇄하기" id="doPrintNew" onclick="fn_printEntire();" rel="history">인쇄하기</a>
               <a href="#popSendEmail" class="icon-util email" title="이메일보내기" onclick="clearMail(&quot;인터넷실손의료비보장보험1.0&quot;);" rel="history">이메일보내기</a>
               <!-- <a href="#none" class="icon-util email" title="이메일보내기" id="sendEmail">이메일보내기</a> -->
               <!-- <a href="#none" class="icon-util sms" title="SMS보내기" id="sendSms">SMS보내기</a> -->
            </div>
            <!-- //유틸버튼 -->
         </div>
         <!-- # 다른고객님의 선택 //////////////////////////////////////////////////////////////////////////// -->
         <div class="product-other none">
            <h3 class="heading2">
               <a href="#none" class="btnarea-curve" id="btnToggleAreaCurve" rel="history"><span class="btn-curve"></span><span class="txt-area">다른 고객님의 가입정보로<em>맞춤설계</em>를 해보세요</span></a>
            </h3>
            <div>
               <p class="mes-type1">
                  <span class="block">다른 고객님은 <strong>보장금액</strong>을 어떻게 설계했을까요? <em>('15년 통계 기준)</em></span>
               </p>
               <!-- .graph-data1 -->
               <div class="graph-data1">
                  <dl>
                     <dt>일반암</dt>
                     <dd class="case1">
                        <span>3천만원</span><em>66.4%</em>
                        <img class="img-graph" src="/resources/web/images/product/pro1_other1.gif" alt="">
                     </dd>
                     <dd class="case2">
                        <span>2천만원</span><em>33.5%</em>
                     </dd>
                  </dl>
                  <dl>
                     <dt>암사망</dt>
                     <dd class="case1">
                        <span>2천만원</span><em>27.0%</em>
                        <img class="img-graph" src="/resources/web/images/product/pro1_other2.gif" alt="">
                     </dd>
                     <dd class="case2">
                        <span>6천만원</span><em>25.4%</em>
                     </dd>
                  </dl>
                  <dl class="data type1">
                     <dt>주요 암 치료비</dt>
                     <dd>
                        <span class="tit">간암 :</span>
                        <em>6,662만원</em>
                     </dd>
                     <dd>
                        <span class="tit">대장암 :</span>
                        <em>2,352만원</em>
                     </dd>
                     <dd>
                        <span class="tit">폐암 :</span>
                        <em>4,657만원</em>
                     </dd>
                     <dd>
                        <span class="tit">유방암 :</span>
                        <em>1,768만원</em>
                     </dd>
                     <dd class="info"><em>2013 국립암센터</em></dd>
                  </dl>
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
</body>
</html>