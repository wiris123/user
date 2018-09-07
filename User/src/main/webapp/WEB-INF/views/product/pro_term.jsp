<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<<<<<<< HEAD
<script>
	function premiPlus() {

		$
				.ajax({
					url : "./termPrem.do",
					type : "post",
					data : {
						paytime : $('#paytime').val(),
						instime : $('#instime').val(),
						death_hid : $('#death_hid').val(),
						birth : $('#birth').val(),
						death : $('#death').val()
					},
					dataType : "html",
					contentType : "application/x-www-form-urlencoded;charset=utf-8",//post타입의 content타입 : application/x-www-form-urlencoded;charset=utf-8
					success : function(resD) {
						alert("갔다왔어 시발놈아");
						$('#resultPremium2').html(resD);
					},
					error : function(errorData) {
						alert("오류발생 : " + errorData.status + ":"
								+ errorData.statusText);
					}

				});

	}
</script>
=======
>>>>>>> branch '180904branch' of https://github.com/wiris123/user.git
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>정기 보험</title>
</head>
<<<<<<< HEAD
<script type="text/javascript" src="../www.googleadservices.com/pagead/f.txt">
	
</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js" charset="utf-8"></script>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
=======
<!-- <script type="text/javascript"
	src="../www.googleadservices.com/pagead/f.txt">	
</script> -->
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js"
	charset="utf-8"></script>
>>>>>>> branch '180904branch' of https://github.com/wiris123/user.git
</head>
<body>
<<<<<<< HEAD
	<div id="wrapper">

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
						<h1>
							<span>ISM </span><strong>인터넷정기보험</strong><em>4.0(무배당)</em>
						</h1>
						<p class="com1">
							다이렉트로 가입하니까!<br>
							<strong>27% 더 저렴</strong>한 보험료로 사망보험금 준비<br>
							<span class="notice">(자사동일유형 타상품대비)</span>
						</p>
						<p class="com2">
							<span>필요한만큼만 보장기간을 정해서 합리적인 보험료로 가입<br>(자사 동일유형 타상품대비)
							</span>
						</p>
					</div>
					<!-- # 보험료 계산하기 # -->
					<form action="" id="formCalculator" onsubmit="premiPlus();">
						<input type="hidden" id="death_hid" value="100000000" />
						<fieldset>
							<legend>보험료계산기</legend>
							<div class="calculator-form">
								<div class="heading">
									<h2>
										<strong>간편</strong>계산기
									</h2>
									<p class="txt">나의 보험료를 계산해 보세요.</p>
									<!-- <p class="banner"><img src="../../images/tmp/@banner_calculator.png" alt="@관리자등록배너텍스트"/></p> -->
								</div>
								<div class="form">
									<ul>
										<!-- 생년월일 -->
										<li>
											<div class="form-wrap1">
												<label for="birthday" class="label">생년월일 <span>(예 : 19851015 )</span></label> <input type="text" autocomplete="off" class="text placeholder numOnly" id="birth" maxlength="8" placeholder="" />
											</div>
										</li>
										<!-- 성별 -->
										<!--    <li>
=======
	<div id="wrapper"> 
		 <!-- 머리 -->
      <%@ include file="../include/header.jsp"%>
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
			death_hid : $('#death_hid').val(),
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
			$('.list-result').show();
		},
		error:function(errorData){
			alert("오류발생 : "+errorData.status+":"+errorData.statusText);
		}

	});	

}

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
               <!-- # 보험료 계산하기 # -->
               <form action="" id="formCalculator" onsubmit="premiPlus();">
                  <input type="hidden" id="death_hid" value="100000000"/>
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
                                    <input type="text" autocomplete="off" class="text placeholder numOnly" id="birth" maxlength="8" placeholder=""/>
                                 </div>
                              </li>
                              <!-- 성별 -->
                              <li>
>>>>>>> branch '180904branch' of https://github.com/wiris123/user.git
                                 <div class="label-radiobtn gender">
                                    <span>
                                       <label for="calcGender1">남자</label>
                                       <input type="radio" name="gender1" class="radio" id="calcGender1" value="1"/>
                                    </span>
                                    <span>
                                       <label for="calcGender2">여자</label>
                                       <input type="radio" name="gender2" class="radio" id="calcGender2" value="2"/>
                                    </span>
                                 </div>
<<<<<<< HEAD
                              </li> -->
										<!-- 보험기간 -->
										<li><span class="select-box"> <select id="instime" name="instime" title="보험기간">
													<option value="">보험기간 선택</option>
													<option value="10">보험기간 : 10년</option>
													<option value="20">보험기간 : 20년</option>
													<option value="60">보험기간 : 60세까지</option>
													<option value="70">보험기간 : 70세까지</option>
												</select>
										</span></li>
										<!-- 납입기간-->
										<li><span class="select-box"> <select id="paytime" name="paytime" title="납입기간">
													<option value="">---납입기간 선택---</option>
													<option value="10">납입기간 : 10년</option>
													<option value="20">납입기간 : 20년</option>
												</select>
										</span></li>
									</ul>
									<a href="#" class="btn" onclick="premiPlus();"><span>내 보험료 확인 / 가입</span></a>
								</div>
							</div>
						</fieldset>
					</form>
				</div>



				<!-- ## 계산결과 /////////////////////////////////////////////////////////////////////////////////////// -->
				<div class="product-result open" id="uiProductResult1" style="display: block;" tabindex="0">
					<!-- # 계산결과 출력 //////////////////////////////////////////////////////////////////////////// -->
					<div class="result-area">
						<h3>보험료 계산결과</h3>
						<div class="list-result thum ui-list-mode">
							<div class="data-case2 col1">
								<!-- 결과1 : 최저보험료 ///////////////////////////////////////////////////////////// -->
								<div class="box box-result1" id="termCalcResult1-1">
									<h4 class="heading">
										<span>최저보험료</span> <strong><span>월</span><span id="monthlyPremium1">0,000</span>원</strong> <a href="#popProductCart" class="btn-save adb-dist1" id="savePlan1" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_1',1);">설계저장</a>
									</h4>
									<div class="con">
										<div class="form">
											<div class="label">
												<span>사망보험금</span>
											</div>
											<div class="data">
												<strong><span id="deathAmt1">5,000</span>원</strong>
											</div>
										</div>
										<div class="btn">
											<a href="#popSendEmail" class="btn-c1 adb-dist1" onclick='clearMail("ISM 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a> <a href="#none" class="btn-c2 adb-dist1" id="goPlan1" onclick="ga('send','event','Direct','Entry','term-top_list_1',1);"><span>가입하기</span></a> <input type="hidden" id="jsonResultData1" name="jsonResultData" />
										</div>
									</div>
								</div>
								<!-- 결과2 : 맞춤설계 ////////////////////////////////////////////////////////////// -->
								<div class="box box-result2 on" id="termCalcResult1-2">
									<h4 class="heading">
										<span>맞춤설계</span> <strong><span>월</span><span id="resultPremium2">0,000</span>원</strong> <a href="#popProductCart" class="btn-save adb-dist2" id="savePlan2" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
									</h4>
									<div class="con">
										<p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
										<div class="form">
											<div class="label">
												<label for="reCalcPrice1">사망보험금</label>
											</div>
											<div class="data">
												<span class="select-box"> <select id="death">
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
											<span class="img-gift"></span> <a href="#popSendEmail" class="btn-c1 adb-dist2" onclick='clearMail("ISM 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a> <a href="#none" class="btn-c2 adb-dist2" id="goPlan2" onclick="ga('send','event','Direct','Entry','term-top_list_2',1);"><span>가입하기</span></a> <input type="hidden" id="jsonResultData2" name="jsonResultData" />
										</div>
										<div class="btn btn-reset">
											<a href="#none" class="btn-c2" id="reCalcPremium"><span>재계산하기</span></a>
										</div>
									</div>
								</div>
								<!-- 결과3 : 추천보장 ///////////////////////////////////////////////////////////// -->
								<div class="box box-result3" id="termCalcResult1-3">
									<h4 class="heading">
										<span>추천보장</span> <strong><span>월</span><span id="monthlyPremium3">0,000</span>원</strong> <a href="#popProductCart" class="btn-save adb-dist3" id="savePlan3" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_3',1);">설계저장</a>
									</h4>
									<div class="con">
										<div class="form">
											<div class="label">
												<span>사망보험금</span>
											</div>
											<div class="data">
												<strong><span id="deathAmt3">2</span>원</strong>
											</div>
										</div>
										<div class="btn">
											<a href="#popSendEmail" class="btn-c1 adb-dist3" onclick='clearMail("ISM 인터넷정기보험4.0(무배당)");'><span>메일발송</span></a> <a href="#none" class="btn-c2 adb-dist3" id="goPlan3" onclick="ga('send','event','Direct','Entry','term-top_list_3',1);"><span>가입하기</span></a> <input type="hidden" id="jsonResultData3" name="jsonResultData" />
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- //계산결과 -->
						<!-- 팝업링크 -->
						<div class="view-pop">
							<a href="#popProResult" class="link-type1" onclick="clickDetailTab(1);"><span>보장내용보기</span></a> <a href="#popProResult" class="link-type1" onclick="clickDetailTab(2);"><span>해지환급금</span></a>
						</div>
						<!-- 유틸버튼 -->
						<div class="area-util">
							<a href="#none" class="icon-util print" title="인쇄하기" id="doPrintNew" onclick="fn_printEntire();">인쇄하기</a> <a href="#popSendEmail" class="icon-util email" title="이메일보내기" onclick='clearMail("ISM 인터넷정기보험4.0(무배당)");'>이메일보내기</a>
						</div>
					</div>
				</div>
			</div>
			<!-- 머리끝 -->
=======
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
                           <a href="#" class="btn" onclick="premiPlus();"><span>내 보험료 확인 / 가입</span></a>
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
                           <h4 class="heading">
                              <span>맞춤설계</span>
                              <strong><span>월</span><span id="resultPremium2">0,000</span>원</strong>
                              <a href="#popProductCart" class="btn-save adb-dist2" id="savePlan2" onclick="ga('send','event','Direct','Etc','Check-info_term-top_list_2',1);">설계저장</a>
                           </h4>
                           <div class="con">
                              <p class="hd">아래 수정 후 재계산하기 버튼을 클릭하시면 맞춤설계 내역이 재계산됩니다.</p>
                              <div class="form">
                                 <div class="label"><label for="reCalcPrice1">사망보험금</label></div>
                                 <div class="data">
                                    <span class="select-box">
                                       <select id="death">
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
                                 <a href="#none" class="btn-c2 adb-dist2" id="goPlan2" onclick="location.href='../product/insert_term.do'"><span>가입하기</span></a>
                                 <input type="hidden" id="jsonResultData2" name="jsonResultData" />
                              </div>
                              <div class="btn btn-reset">
                                 <a href="#none" class="btn-c2" id="reCalcPremium" onclick="premiPlus();"><span>재계산하기</span></a>
                              </div>      
                           </div>
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
         </div>
         <!-- 머리끝 -->
>>>>>>> branch '180904branch' of https://github.com/wiris123/user.git

		</div>
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터끝 -->

	</div>
</body>
</html>