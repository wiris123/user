<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금 보험</title>
</head>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
      <%@ include file="../include/header.jsp"%>
      <link rel="stylesheet"
         href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
      <div id="container">
         <%@ include file="../include/Head.jsp"%>
         <!-- page : content /////////////////////////////////////////////////// -->
         <div id="content" class="page-product product2">
            
            <!-- ## 상품 기본정보 및 계산기 ////////////////////////////////////////////////////////////// -->
            <div class="product-basic page-change">
            <!-- # 상품기본정보 # -->
      
            <!-- CMS 영역 -->
            <div class="info">
               <h1><span>삼성생명 </span><strong>인터넷정기보험</strong><em>4.0(무배당)</em></h1>
               <p class="com1">다이렉트로 가입하니까!<br><strong>27% 더 저렴</strong>한 보험료로 사망보험금 준비<br><span class="notice">(자사동일유형 타상품대비)</span></p>
               <p class="com2"><span>필요한만큼만 보장기간을 정해서 합리적인 보험료로 가입<br>(자사 동일유형 타상품대비)</span></p>
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
                                    <input type="text" autocomplete="off" class="text placeholder numOnly" id="birthday" maxlength="8"/>
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
                                 <span class="select-box">
                                    <select id="insTerm" title="보험기간">
                                       <option>보험기간 선택</option>
                                    </select>
                                 </span>
                              </li>
                              <!-- 납입기간-->
                              <li>
                                 <span class="select-box">
                                    <select id="napTerm" title="납입기간">
                                       <option>납입기간 선택</option>
                                    </select>
                                 </span>
                              </li>
                           </ul>
                           <a href="#none" class="btn" id="calcPremium"><span>내 보험료 확인 / 가입</span></a>
                        </div>            
                     </div>
                  </fieldset>
               </form>
            </div>
            
            <!-- ## 계산결과 /////////////////////////////////////////////////////////////////////////////////////// -->
            <div class="product-result" id="uiProductResult1" style="display:none;" tabindex="0">
               <!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
               <div class="result-area">
                  <h3>보험료 계산결과</h3>
                  <div class="list-result thum ui-list-mode">
                     <div class="data-case2 col1">
                        <!-- 결과1 : 최저보험료 ///////////////////////////////////////////////////////////// -->
                        <div class="box box-result1">
                           <h4 class="heading">
                              <span>최저보험료</span>
                              <strong><span>월</span><span id="monthlyPremium1">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save" id="savePlan1" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_1',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt1">5,000</span>원</strong>
                                 </div>
                              </div>
                              <div class="btn">
                                 <a href="#popSendEmail" class="btn-c1" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2" id="goPlan1" onclick="ga('send','event','Direct','Entry','term-top_list_1',1);"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData1" name="jsonResultData" />
                              </div>
                           </div>
                        </div>
                        <!-- 결과2 : 맞춤설계 ////////////////////////////////////////////////////////////// -->
                        <div class="box box-result2 on">
                           <h4 class="heading">
                              <span>맞춤설계</span>
                              <strong><span>월</span><span id="monthlyPremium2">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save" id="savePlan2" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
                              <div class="form">
                                 <div class="label"><label for="reCalcPrice1">사망보험금</label></div>
                                 <div class="data">
                                    <span class="select-box">
                                       <select id="reCalcPrice1">
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
                                 <span class="img-gift"><img src="resources/cms/pc/images/com/icon_gift.png" alt="선물증정"></span>
                                 <a href="#popSendEmail" class="btn-c1" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2" id="goPlan2" onclick="ga('send','event','Direct','Entry','term-top_list_2',1);"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData2" name="jsonResultData" />
                              </div>
                              <div class="btn btn-reset">
                                 <a href="#none" class="btn-c2" id="reCalcPremium"><span>재계산하기</span></a>
                              </div>
                           </div>
                        </div>
                        <!-- 결과3 : 추천보장 ///////////////////////////////////////////////////////////// -->
                        <div class="box box-result3">
                           <h4 class="heading">
                              <span>추천보장</span>
                              <strong><span>월</span><span id="monthlyPremium3">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save" id="savePlan3" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_3',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt3">2</span>원</strong>
                                 </div>
                              </div>
                              <div class="btn">
                                 <a href="#popSendEmail" class="btn-c1" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2" id="goPlan3" onclick="ga('send','event','Direct','Entry','term-top_list_3',1);"><span>가입하기</span></a>
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
                     <a href="#popSendEmail" class="icon-util email" title="이메일보내기" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'>이메일보내기</a>
                  </div>
                  <!-- //유틸버튼 -->
               </div>
               <!-- # 다른고객님의 선택 //////////////////////////////////////////////////////////////////////////// -->
               <div class="product-other open">
                  <h3 class="heading2">
                     <a href="#none" class="btnarea-curve" id="btnToggleAreaCurve"><span class="btn-curve"></span><span class="txt-area">다른 고객님의 가입정보로<em>맞춤설계</em>를 해보세요</span></a>
                  </h3>
                  <div>
                     <p class="mes-type1">
                        <span class="block">다른 고객님의 <strong>보장금액</strong>과 <strong>통계자료</strong>를 참고하여 본인의 보장을 설계하세요 <em>('15년 통계 기준)</em></span>
                     </p>
                     <!-- .graph-data1 -->
                     <div class="graph-data1">
                        <dl>
                           <dt>보장금액</dt>
                           <dd class="case1">
                              <span>2억원</span><em>36.7%</em>
                              <img class="img-graph" src="resources/web/images/product/pro2_other1.gif" alt="" />
                           </dd>
                           <dd class="case2">
                              <span>1억원</span><em>33.2%</em>
                           </dd>
                        </dl>
                        <dl class="data type2">
                           <dt>4인가족 3년간 생활비</dt>
                           <dd>월 246만원 × 36개월<strong class="st1">= 총 8,856만원</strong></dd>
                           <dd class="info"><em>2014. 통계청 가계동향 조사</em></dd>
                        </dl>
                        <dl class="data type2">
                           <dt>프렌차이즈 평균 창업비용</dt>
                           <dd><strong class="st2">1억 1,784만원</strong></dd>
                           <dd class="info"><em>2012. 대한상공회의소</em></dd>
                        </dl>
                     </div>
                  </div>
               </div>
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
                              <strong><span>월</span><span id="monthlyPremium1">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist1" id="savePlan1" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_1',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt1">5,000</span>원</strong>
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
                           <h4 class="heading">
                              <span>맞춤설계</span>
                              <strong><span>월</span><span id="monthlyPremium2">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist2" id="savePlan2" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
                              <div class="form">
                                 <div class="label"><label for="reCalcPrice1">사망보험금</label></div>
                                 <div class="data">
                                    <span class="select-box">
                                       <select id="reCalcPrice1">
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
                                 <a href="#popSendEmail" class="btn-c1 adb-dist2" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a>
                                 <a href="#none" class="btn-c2 adb-dist2" id="goPlan2" onclick="ga('send','event','Direct','Entry','term-top_list_2',1);"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData2" name="jsonResultData" />
                              </div>
                              <div class="btn btn-reset">
                                 <a href="#none" class="btn-c2" id="reCalcPremium"><span>재계산하기</span></a>
                              </div>      
                           </div>
                        </div>
                        <!-- 결과3 : 추천보장 ///////////////////////////////////////////////////////////// -->
                        <div class="box box-result3" id="termCalcResult1-3">
                           <h4 class="heading">
                              <span>추천보장</span>
                              <strong><span>월</span><span id="monthlyPremium3">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist3" id="savePlan3" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_3',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <div class="form">
                                 <div class="label"><span>사망보험금</span></div>
                                 <div class="data">
                                    <strong><span id="deathAmt3">2</span>원</strong>
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
                     <a href="#popSendEmail" class="icon-util email" title="이메일보내기" onclick='clearMail("삼성생명 인터넷정기보험4.0(무배당)");'>이메일보내기</a>
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