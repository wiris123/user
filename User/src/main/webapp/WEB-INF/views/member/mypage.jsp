<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>마이페이지</title>
</head>
<script type="text/javascript" src="http://code.jquery.com/jquery-1.12.0.min.js" ></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<style>
   h1 {
       padding: 50px 0;
       font-weight: 400;
       text-align: center;}

   p {
       margin: 0 0 20px;
       line-height: 1.5;}

   .main {
       min-width: 320px;
       max-width: 1000px;
       padding: 50px;
       margin: 0 auto;
       background: #ffffff;}

   section {
       display: none;
       padding: 20px 0 0;
       border-top: 1px solid #ffffff;}

   /*라디오버튼 숨김*/
     input {
         display: none;}

   label {
   	width: 150px;
   	height: 50px;
       display: inline-block;
       margin: 0 0 -1px;
       padding: 15px 25px;
       font-weight: 600;
       text-align: center;
       color: #bbb;
       border: 1px solid transparent;}

   label:hover {
       color: #2e9cdf;
       cursor: pointer;}

   /*input 클릭시, label 스타일*/
   input:checked + label {
         color: #555;
         border: 1px solid #ddd;
         border-top: 2px solid #2e9cdf;
         border-bottom: 1px solid #ffffff;}

   #tab1:checked ~ #content1,
   #tab2:checked ~ #content2,
   #tab3:checked ~ #content3,
   #tab4:checked ~ #content4,
   #tab5:checked ~ #content5
   
    {
       display: block;}
       
    .btn{  
      text-decoration: none;
      font-size:0.8em;
      color:white;
      padding:2px 5px 2px 5px;
      margin:5px 2px 2px 5px;
      display:inline-block;
      border-radius: 5px;
      transition:all 0.1s;
    }
    .btn:active{
      transform: translateY(3px);
    }
    .btn.blue{
      background-color: #1f75d9;
    }
    
	
</style>
<script>
function contactEdit(mode,insnum,product)
{
	var	modeSel = mode;
	var insnumber = insnum;
	var prod = product;
	
	if(modeSel=='cancel')
	{
		if(confirm("선택한 상품을 해지하시겠습니까?"))
		{
			location.href="../product/pro_status?insnum="+insnumber+"&mode="+mode+"&product="+prod;	
		}
	
	}
	else if(modeSel=='pause')
	{
		if(confirm("선택한 상품의 납입을 유예하시겠습니까?"))
		{
			location.href="../product/pro_status?insnum="+insnumber+"&mode="+mode+"&product="+prod;	
		}
	}
	
}



</script>
<body>
   <div id="wrapper">
      <!-- 머리 -->
      <%@ include file="../include/header.jsp"  %>
      <div id="container"> 
         <%@ include file="../include/Head.jsp" %>
            <div class="main">
    <input id="tab1" type="radio" name="tabs" checked> <!--디폴트 메뉴-->
    <label for="tab1"><br />마이페이지</label>
	
    <input id="tab2" type="radio" name="tabs">
    <label for="tab2"><br />보유계약조회</label>

    <input id="tab3" type="radio" name="tabs">
    <label for="tab3"><br />가입계속하기</label>

    <input id="tab4" type="radio" name="tabs">
    <label for="tab4"><br />나의 이벤트</label>
    
    <input id="tab5" type="radio" name="tabs">
    <label for="tab5"><br />나의 상담</label>
    
	<!-- 마이페이지 -->
    <section id="content1"> <br /><br />
        <!-- ## 기본정보 ## -->
         <div class="box-content2">
            <div class="line" id="field"></div>
            <div class="info-personal">
               <!-- CASE1 : 고객정보 있을경우 -->
               
               <h2 class="heading"><strong>${member.name }</strong> 고객님 기본정보 <a href="../logout" class="btn-type4 logout"><span>본인인증 종료</span></a></h2>
               <!-- <p class="txt"><span>최근 접속 일시</span> 2018-09-03 21:36:43</p> -->
              
             
               <ul>
                  <li><span>생년월일</span>${member.birth }</li>
                  <li><span>휴대폰</span>${member.mobile }</li>
                  <li><span>이메일</span>${member.email }</li>
                  <li><span>주소</span> 니네집</li>
               </ul>
            </div>
            <div class="bottom">
             <form:form method="post" action="../logout">
               		<input type="submit" value="로그아웃" />
               </form:form>
               <p class="txt">개인정보 변경은 삼성생명 사이버창구를 이용해주시기 바랍니다.</p>
               <div class="btn-sub">
                  <a href="https://pcyber.samsunglife.com/pcyber/person/person/baseInfoChng/addressPhone.do" class="btn-type2 c3 arr" target="_blank" title="새창) 삼성생명 사이버창구"><span>사이버창구 이동</span></a>
               </div>
            </div>
            <div class="line"></div>
         </div>
         <!--## 추천보험 ## -->
         <div class="box-content2 line">
            <h2 class="hd">추천보험</h2>
            <div class="info-suggest">
               <p id="keyWordSubTitle">
                  <strong><span>20대 남성</span> 추천 보험 키워드</strong>
               <span class="txt">보험은 부담이 아닌 편안한 노후와 건강한 삶을 위한 든든한 미래의 자산입니다.  </span></p>
               <ul id="KeyWordList"><li class="bg1"><strong>세액공제</strong><span>직장인 필수보험, 세액공제 매년 최대 66만원 환급으로 현재와 미래를 함께 대비!    </span></li><li class="bg2"><strong>저축    </strong><span>저금리 시대, 절세는 필수! 연복리 운영, 이자소득세 15.4% 비과세까지!           </span></li><li class="bg3"><strong>건강    </strong><span>대한민국 국민 사망원인 1위 암! 건강할 때 미리 준비하고 더 크게 보장받고!      </span></li></ul>
            </div>
            <div class="bottom">
               <p class="txt">보험과 관련된 다양한 정보를 뉴스레터로 전달받으세요.</p>
               <div class="btn-sub">
                  <a href="#none" onclick="popMypage5El.openOutput();"class="btn-type2 c3 arr" ><span>뉴스레터 신청</span></a>
               </div>
            </div>
           <div class="line"></div>
         </div>
	         <ul class="box-content3 list-product" id="productList" style="width: 1000px; margin:0 auto;">
	            <!-- case1 : 미가입시 -->
	            <li id="prodType7">   <h3 class="tit" id="simpleName7">연금보험</h3>   <p class="con">한 살이라도 빨리 준비할 수록 <br>적은 부담으로 <br>높은 연금 수령 가능!</p>   <div class="btn">      <a href="javascript:goPlan('7');" class="btn-type2 c1"><span>가입하기</span></a>   </div></li>
	            <li id="prodType2">   <h3 class="tit" id="simpleName2">정기보험</h3>   <p class="con">사랑하는 가족의<br>꿈과 미래를 지켜주는<br>가족보험!</p>   <div class="btn">      <a href="javascript:goPlan('2');" class="btn-type2 c1"><span>가입하기</span></a>   </div></li>
	            <li id="prodType9">   <h3 class="tit" id="simpleName9">실손보험</h3>   <p class="con">질병, 상해로부터<br>비급여와 급여 중 본인부담금을<br>보장하는 보험</p>   <div class="btn">      <a href="javascript:goPlan('9');" class="btn-type2 c1"><span>가입하기</span></a>   </div></li>
	         </ul>
    </section>

	<!-- 보유계약조회 -->
    <section id="content2"> <br /><br />
    	<h1 class="hd">보유계약 조회</h1>
    		<!-- ##연금보험  보유 현황-->
    		<!-- ## 검색결과 ## -->
			<p class="txt-num tbl-info"><strong>${USER_ID }</strong>님의 보유 <b>연금보험</b>이 총 <em id="count">${fn:length(dto3)} </em>건 조회되었습니다.</p>

			<!-- ## 보유계약조회 목록 ## -->
			<table class="tbl-type2 list" cellspacing="0" summary="보유계약목록 : 보유계약의 보험계약번호/상품명, 계약기간/납입기간, 최종 납입사항(남은횟수), 현재 납입한 보험료, 보험료, 계약상태, 보험관련 문서 다운로드 안내">
				<caption>보유계약조회 목록</caption>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">보험계약번호<br/></th>
						<th scope="col">계약일자<br/>납입기간</th>
						<th scope="col">최종 납입사항<br/>(남은횟수)</th>
						<th scope="col">현재<br/>납입한 보험료</th>
						<th scope="col">보험료</th>
						<th scope="col">계약상태</th>
						<th scope="col">납입유예</th>
						<th scope="col">계약해지</th>
						
					</tr>
					<c:forEach items="${dto3 }" var="rows">
					<form method="get">
						<tr>
							<th scope="col" style="background-color: white;">${rows.num }</th>
								<th scope="col" style="background-color: white;"><span name="insnum">${rows.insnum }</span></th>
								<th scope="col" style="background-color: white;">${rows.remainpay }</th>
								<th scope="col" style="background-color: white;">${rows.remainpay }</th>
								<th scope="col" style="background-color: white;">${rows.paidprem }</th>
								<th scope="col" style="background-color: white;"><fmt:formatNumber value="${rows.prem }" type="currency" currencySymbol="￦" />
								</th>
								<th scope="col" style="background-color: white;">${rows.contstat }</th>
								<th scope="col" style="background-color: white;">
									<a href="javascript:contactEdit('pause',${rows.insnum },'annu')" class="btn blue"
									><span style="color:white;">납입유예</span></a>
								</th>
								<th scope="col" style="background-color: white;">
									<a href="javascript:contactEdit('cancel',${rows.insnum },'annu')" class="btn blue"
									><span style="color:white;">계약해지</span></a>
								</th>						
						</tr>
					</form>
					</c:forEach>
				</thead>
				<tbody id="contractList">
				</tbody>
			</table>
			<br /><br /><br />
    		<!-- ##정기보험  보유 현황-->
    		<!-- ## 검색결과 ## -->
			<p class="txt-num tbl-info"><strong>${USER_ID }</strong>님의 보유 <b>정기보험</b>이 총 <em id="count">${fn:length(dto)}</em>건 조회되었습니다.</p>

			<!-- ## 보유계약조회 목록 ## -->
			<table class="tbl-type2 list" cellspacing="0" 
				summary="보유계약목록 : 보유계약의 보험계약번호/상품명, 계약기간/납입기간, 최종 납입사항(남은횟수), 현재 납입한 보험료, 보험료, 계약상태, 보험관련 문서 다운로드 안내">
				<caption>보유계약조회 목록</caption>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">보험계약번호<br/></th>
						<th scope="col">계약일자<br/>납입기간</th>
						<th scope="col">최종 납입사항<br/>(남은횟수)</th>
						<th scope="col">현재<br/>납입한 보험료</th>
						<th scope="col">보험료</th>
						<th scope="col">계약상태</th>
						<th scope="col">사망보험금</th>
						<th scope="col">계약해지</th>
					</tr>
					<tr>
					<c:forEach items="${dto }" var="rows">
						<th scope="col" style="background-color: white;">${rows.num }</th>
							<th scope="col" style="background-color: white;">${rows.insnum }</th>
							<th scope="col" style="background-color: white;">${rows.remainpay }</th>
							<th scope="col" style="background-color: white;">${rows.remainpay }</th>
							<th scope="col" style="background-color: white;">${rows.paidprem }</th>
							<th scope="col" style="background-color: white;"><fmt:formatNumber value="${rows.prem }" type="currency" currencySymbol="￦" /></th>
							<th scope="col" style="background-color: white;">${rows.contstat }</th>
							<th scope="col" style="background-color: white;"><fmt:formatNumber value="${rows.death_ins }" type="currency" currencySymbol="￦" /></th>
							<th scope="col" style="background-color: white;">
								<a href="javascript:contactEdit('cancel',${rows.insnum },'term')" class="btn blue"
								><span style="color:white;">계약해지</span></a>
							</th>	
							
					</tr>
					</c:forEach>
				</thead>
				<tbody id="contractList">
				</tbody>
			</table>
			<br /><br /><br />
			<!-- ##실손보험  보유 현황-->		
			<!-- ## 검색결과 ## -->
			<p class="txt-num tbl-info"><strong>${USER_ID }</strong>님의 보유 <b>실손보험</b>이 총 <em id="count">${fn:length(dto2)}</em>건 조회되었습니다.</p>

			<!-- ## 보유계약조회 목록 ## -->
			<table class="tbl-type2 list" cellspacing="0" summary="보유계약목록 : 보유계약의 보험계약번호/상품명, 계약기간/납입기간, 최종 납입사항(남은횟수), 현재 납입한 보험료, 보험료, 계약상태, 보험관련 문서 다운로드 안내">
				<caption>보유계약조회 목록</caption>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">보험계약번호<br/></th>
						<th scope="col">계약일자<br/>납입기간</th>
						<th scope="col">최종 납입사항<br/>(남은횟수)</th>
						<th scope="col">현재<br/>납입한 보험료</th>
						<th scope="col">보험료</th>
						<th scope="col">계약상태</th>
						<th scope="col">계약해지</th>
						<!-- <th scope="col">사망보험금</th> -->
					</tr>
					<tr>
					<c:forEach items="${dto2 }" var="rows">
						<th scope="col" style="background-color: white;">${rows.num }</th>
							<th scope="col" style="background-color: white;">${rows.insnum }</th>
							<th scope="col" style="background-color: white;">${rows.remainpay }</th>
							<th scope="col" style="background-color: white;">${rows.remainpay }</th>
							<th scope="col" style="background-color: white;">${rows.paidprem }</th>
							<th scope="col" style="background-color: white;"><fmt:formatNumber value="${rows.prem }" type="currency" currencySymbol="￦" /></th>
							<th scope="col" style="background-color: white;">${rows.contstat }</th>
							<th scope="col" style="background-color: white;">
								<a href="javascript:contactEdit('cancel', ${rows.insnum },'prop')" class="btn blue"
								><span style="color:white;">계약해지</span></a>
							</th>	
							<%-- <th scope="col">${row.death_ins }</th> --%>
					</tr>
					</c:forEach>
				</thead>
				<tbody id="contractList">
				</tbody>
			</table>
    </section>
	<!-- 가입 계속하기 -->
    <section id="content3"> <br /><br />
        <h1 class="hd">가입 계속하기</h1>		
			<!-- ## 검색결과 ## -->
			<p class="txt-num tbl-info"><strong>${USER_ID }</strong>님의 가입 진행 중인 보험이 총 <em id="count">0</em>건 조회되었습니다. (최대 30일까지 저장)</p>

			<!-- ## 보유계약조회 목록 ## -->
			<table class="tbl-type2 list" cellspacing="0" summary="보유계약목록 : 보유계약의 보험계약번호/상품명, 계약기간/납입기간, 최종 납입사항(남은횟수), 현재 납입한 보험료, 보험료, 계약상태, 보험관련 문서 다운로드 안내">
				<caption>가입 진행중인 계약 목록</caption>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">보험상품</th>
						<th scope="col">진행 단계</th>
						<th scope="col">보험료</th>
						<th scope="col">청약 신청일자</th>
						<th scope="col">바로가기</th>
					</tr>
				</thead>
				<tbody id="contractList">
				</tbody>
			</table>
    </section>
    
    <!-- 나의 이벤트 -->
    <section id="content4"> <br /><br />
        <h1 class="hd">나의 이벤트</h1>
			<p class="txt-check small">이벤트 응모 시 입력한 이메일 또는 전화번호가 등록되어있는 개인정보와 동일한 경우에만 확인 가능합니다.</p>

			<!-- ## 나의 이벤트 목록 ## -->
			<table class="tbl-type2 list" cellspacing="0" summary="나의 이벤트 신청 목록 중 이벤트명/이벤트 기간/진행상태/당첨여부 안내">
				<caption>나의 이벤트 목록</caption>
				<colgroup>
					<col width="5%" />
					<col width="*" />
					<col width="20%" />
					<col width="10%" />
					<col width="10%" />
				</colgroup>
				<thead>
					<tr>
						<th scope="col">NO.</th>
						<th scope="col">이벤트 명</th>
						<th scope="col">이벤트 기간</th>
						<th scope="col">진행상태</th>
						<th scope="col">당첨여부</th>
					</tr>
				</thead>
				<tbody id="eventList">
				</tbody>
			</table>
    </section>
    <!-- 나의 상담 -->
    <section id="content5"> <br /><br />
    <!-- ## 타이틀 ## -->
			<h1 class="hd">나의 상담</h1>
			<p class="txt-check small">상담신청 시 입력한 이메일 또는 전화번호가 등록되어있는 개인정보와 동일한 경우에만 확인 가능합니다.</p>

			<!-- ## 테이블 탭 : 이메일 상담 / 상담예약 ## /////////////////////////////////////// -->
			<ul class="tab-tbl" >
				<li class="on"><a href="#tabCounsel1" onClick="getConsultList('2');"><span>이메일 상담</span></a></li>
				<li><a href="#tabCounsel2" onClick="getConsultList('1');"><span>상담예약</span></a></li>
			</ul>
			<!-- ## 탭1 : 이메일 상담 ## /////////////////////////////////////// -->
			<div id="tabCounsel1" class="ui-tab-con on">
				<h2 class="hd">이메일상담</h2>
				<!-- ## 이메일 상담 목록 ## -->
				<table class="tbl-type2 list" cellspacing="0" summary="나의 상담내역별 문의내용/이메일/상담신청일자/답변여부 안내">
					<caption>이메일 상담 목록</caption>
					<colgroup>
						<col width="5%" />
						<col width="*" />
						<col width="15%" />
						<col width="12%" />
					</colgroup>
					<thead>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">문의 내용</th>
							<th scope="col">이메일</th>
							<th scope="col">상담신청일자</th>
						</tr>
					</thead>
					<tbody id="emailConsultList">
					</tbody>
				</table>
			</div>
			<!-- ## 탭2 : 상담예약 ## /////////////////////////////////////// -->
			<div id="tabCounsel2" class="ui-tab-con">
				<h2 class="hd">상담예약</h2>
				<!-- ## 상담예약 목록 ## -->
				<table class="tbl-type2" cellspacing="0" summary="나의 상담내역별 문의내용/통화가능시간/상담신청일자 안내">
					<caption>상담예약 목록</caption>
					<colgroup>
						<col width="5%" />
						<col width="*" />
						<col width="35%" />
						<col width="12%" />
					</colgroup>
					<thead>
						<tr>
							<th scope="col">NO.</th>
							<th scope="col">문의내용</th>
							<th scope="col">통화가능시간</th>
							<th scope="col">상담신청일자</th>
						</tr>
					</thead>
					<tbody id="telConsultList">
					</tbody>
				</table>
			</div>
			<script type="text/javascript">
			<!--
				$plugin.togglecon($('.tab-tbl li'),{
					toggle_type : 'tab',
					selector_group : true,
					selector_btn: '>a',
					selector_con: '#href',
					class_open : 'on'
				});
			//-->
			</script>
		</div>
    </section>
</div>
         </div>   <!-- container end -->
      <!-- 머리끝 -->
      <!-- 푸터시작 -->
      <div id="footer">
         <%@ include file="../include/footer.jsp"%>
      </div>
      <!-- 푸터끝 -->
   </div>
</html>