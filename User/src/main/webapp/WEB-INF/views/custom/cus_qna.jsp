<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>고객센터</title>
<script>
function qnaCheck(fn) {
   if(fn.name.value == "") {
      alert("이름을 입력하세요.");
       fn.name.focus();
    
    return false;
   }
   
   if(fn.mobile1.value == "") {
      alert("연락처를 선택하세요.");
       fn.mobile1.focus();
    
    return false;
   }
   
   if(fn.mobile2.value == "") {
      alert("연락처를 입력하세요.");
       fn.mobile2.focus();
    
    return false;
   }
   
   if(fn.mobile2.value.length == "" || (fn.mobile2.value.length<8 && fn.mobile2.value.length<7)) {
      alert("연락처를 7~8개의 숫자로 입력하세요.");
       fn.mobile2.focus();
    
    return false;
   }
   
   if(fn.email1.value == "") {
      alert("이메일을 입력하세요.");
       fn.email1.focus();
    
    return false;
   }
   
   if(fn.email2.value == "") {
      alert("이메일을 선택하세요.");
       fn.email2.focus();
    
    return false;
   }
   
   if(fn.contents.value == "") {
      alert("내용을 입력하세요.");
       fn.contents.focus();
    
    return false;
   }
   
}
</script>
<%@ include file="../include/header.jsp"%>
</head>
<%
   //현재시간 구하기
   long time = System.currentTimeMillis();
   SimpleDateFormat dayTime = new SimpleDateFormat("yy/MM/dd");
   String str = dayTime.format(new Date(time));
   System.out.println(str);

   long start = System.currentTimeMillis();
   long end = System.currentTimeMillis();

   pageContext.setAttribute("str", str);
%>
<body>
   
   <div id="wrapper">

      <!-- 머리 -->
      
      <div id="container">
         <%@ include file="../include/Head.jsp"%>

         <!-- 내용시작 -->
         <div id="content" class="page-counsel">
            <!-- ## 페이지타이틀 ## -->
            <div class="tit-page">
               <h1>고객 상담신청</h1>
            </div>
            <!-- ## 상단 비쥬얼문구 ## -->
            <div class="box-content visual">
               <div class="line"></div>
               <div>
                  <div>
                     <p class="mes">
                        <strong>어떤 내용이 궁금하신가요?</strong> 전화 상담 예약을 하시면 원하는 시간에 전문상담원이 연락드립니다.
                     </p>
                     <ul class="info">
                        <li><strong class="tel">080<span>-</span>789<span>-</span>3300
                        </strong></li>
                        <li>상담가능시간 - (평일) 08:30-17:30</li>
                     </ul>
                     <a href="#" onclick="openPopCounsel('telReserve', this)" class="btn-sub btn-type2 c1"><span>전화상담 예약</span></a>
                  </div>
               </div>
               <div class="line"></div>
            </div>

            <!-- ## 상담방법목록 ## -->
            <ul class="counsel-list">
               <li class="list1"><a href="../custom/chat/" onclick="openPopCounsel('chat');"> <strong><span>채팅</span>상담</strong> <em name="chatStatus" class="icon-state off">OFF</em>
               </a></li>
               <li class="list2"><a href="#" onclick="openPopCounsel('popCounselEmail', this)"> <strong><span>이메일</span>상담</strong> <em name="emailStatus" class="icon-state on">ON</em>
               </a></li>
               <li class="list3"><a href="<%=request.getContextPath() %>/custom/response" onclick="openPopCounsel('remote');"> <strong><span>1:1문의</span>요청</strong> <em name="remoteStatus" class="icon-state on">ON</em>
               </a></li>
            </ul>
            <p class="mes-type1">
               궁금하신 내용은 언제든지 부담없이 저희 상담원에게 물어보세요.<br />가입을 유도하거나 권유하지 않고, <strong class="txt-c1">전문상담원이 친절하고 자세하게 답변</strong>해드립니다.
            </p>
            <!-- ## 안내문구 ## -->
            <div class="section line">
               <div class="box-mes3">
                  <h2 class="heading">안내</h2>
                  <ul class="txt-type1">
                     <li>전문상담원과의 상담은 평일 08시 30분부터 17시 30분까지 이용하실 수 있습니다.</li>
                     <li>상담 가능시간 외 이메일 상담을 이용하신 고객님께는 익일 상담시간 내 최대한 빠르게 답변해 드리겠습니다.</li>
                     <li>원격지원을 요청하신 고객님께서는 상담원과 통화 후 연결이 진행됩니다.</li>
                  </ul>
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