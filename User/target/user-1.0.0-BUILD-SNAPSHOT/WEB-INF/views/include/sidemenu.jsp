<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>TITLE</title>

</head>
<body>
<script type="text/javascript" src="../resources/web/js/banner.js"></script>
<div id="uiNavQuick" >
   <dl>
      <dt>다이렉트<br/>상담현황</dt>
      <dd class="m1">
         <!-- 
         <div>
            <em name="telStatus" class="icon-state1 off">[OFF]</em><span>전화상담</span>
         </div>
          -->
         <div>
            <span>전화상담</span>
            <span>080<br/>789<br/>3300</span>
            <span>평일 8:30~17:30</span>
         </div>
      </dd>
      <dd class="m2">
         <a href="#none" onclick="openPopCounsel('chat');ga('send','event','Direct','Etc','Rightside-Navi_Chat',1);" title="새창">
            <em name="chatStatus" class="icon-state1 off">[OFF]</em><span>채팅상담</span>
         </a>
      </dd>
      <dd class="m3">
         <a href="#none" onclick="openPopCounsel('popCounselEmail', this)">
            <em name="emailStatus" class="icon-state1 on">[ON]</em>
            <span>이메일상담</span>
         </a>
      </dd>
      <dd class="m4">
         <a href="#none" onclick="openPopCounsel('telReserve', this);ga('send','event','Direct','Etc','Rightside-Navi_Counsil',1);">
            <em name="telReserveStatus" class="icon-state1 off">[OFF]</em>
            <span>1:1문의요청</span>
         </a>
      </dd>
      <dd class="m6">
         <a href="#none" onclick="openPopCounsel('remote');ga('send','event','Direct','Etc','Rightside-Navi_Remote',1);">
            <em name="remoteStatus" class="icon-state1 off">[OFF]</em>
            <span>원격지원</span>
         </a>
      </dd>
      <dd class="m5">
         <a href="cus_faq" onclick="ga('send','event','Direct','Etc','Rightside-Navi_FAQ',1);"><em>FAQ</em><span>자주하는 질문</span></a>
      </dd>
   </dl>
   <a href="#wrapper" class="btn-top">페이지상단으로 이동</a>
</div>         
</body>
</html>