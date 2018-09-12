<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>회원가입</title>
		<!-- 머리 -->
		<%@ include file="../include/header.jsp" %>
</head>
<style>
input[type=text], select {
    width: 100%;
    padding: 15px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=password], select {
    width: 100%;
    padding: 15px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

input[type=submit] {
    width: 100%;
    background-color: #4374D9;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
	font-family: "맑은고딕";
}

input[type=button] {
    width: 100%;
    background-color: #4374D9;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
	font-family: "맑은고딕";
}

input[type=submit]:hover {
    background-color: #4374D9;
}

join {
    border-radius: 5px;
    background-color: #4374D9;
    padding: 20px;
}
</style>
<script type="text/javascript">
//아이디 중복 체크
function check_id() {
if(!document.join.id.value) {
 window.alert('아이디를 입력해 주세요');
 document.join.id.focus();
 return false;
}

/* ifrm1.location.href="m_join_check.php?id="+id; */
}

//닉네임 중복 체크
function check_nick() {
document.getElementById("chk_nick2").value=0;
var nick=document.getElementById("chk_nick1").value;

if(!document.join.nick.value) {
 window.alert('닉네임을 입력해 주세요');
 document.join.nick.focus();
 return false;
}

/* ifrm1.location.href="m_join_check_nick.php?nick="+nick; */
}

//핸드폰 번호 체크
/*function check_phone(){
var phone = document.getElementById("phone").value;
if(!(phone>=0 && phone<=10000000000000)){
 window.alert('핸드폰번호를 다시 입력하세요');
 document.join.phone.focus();
 return false;
}
}*/

//빈 값 체크
function mValidate(fn) {
	if(fn.id.value==""){
   alert("아이디를 입력해주세요");
   fn.id.focus();
   return false;
}
	
if(!document.join.pw.value) {
 window.alert('비밀번호를 입력해 주세요');
 document.join.pw.focus();
 return false;
}

if(!document.join.pw2.value) {
 window.alert('비밀번호 확인을 입력해 주세요');
 document.join.pw2.focus();
 return false;
}

if( (document.join.pw.value) != (document.join.pw2.value) )  {
 window.alert('비밀번호가 같지 않습니다.');
 document.join.pw2.focus();
 return false;
}


if(fn.name.value==""){
  alert("이름을 입력해주세요");
  fn.name.focus();
  return false;
}

if(!document.join.birth.value) {
 window.alert('생년월일을 입력해 주세요');
 document.join.birth.focus();
 return false;
}

if(!document.join.email.value) {
 window.alert('이메일을 입력해 주세요');
 document.join.email.focus();
 return false;
}    

if(!document.join.phone.value) {
 window.alert('핸드폰 번호를 입력해 주세요');
 document.join.phone.focus();
 return false;
}


/*핸드폰, 이메일, 생년월일 검사*/
/* if(document.join.phone.value<0 || document.join.phone.value>999999999999) {
 window.alert('핸드폰 번호를 제대로 입력해주세요');
 document.join.phone.focus();
 return false;
}*/


}

function email_input(em, frm){
	//선택한 select의 값이 빈값이 아닐때만 동작
	if(em.value!=""){
		if(em.value=="1"){
			//직접입력 선택한 경우
			//readonly속성 해제
			frm.email2.readOnly = false;
			//도메인부분 비워주기
			frm.email2.value = "";
		}
		else{
			//도메인을 선택한 경우
			//선택한 도메인을 입력한다.
			frm.email2.value = em.value;
			//readonly속성을 활성화한다.
			frm.email2.readOnly = true;
		}
	}
} 
</script>
<body>
	<div id="wrapper">
	

		<div id="container"> 
			<%@ include file="../include/Head.jsp" %>
			
		<!-- 내용시작 -->
		<div id="content">
			<div><h1 class="heading">회원가입</h1></div>
			<div class="join_wrap">   
				<form name=memberFrm" method="post" action="../member/insertjoin.do" onsubmit="return mValidate(this);";" >
					<div id="join" style="width: 500px; margin: 0 auto;" >
      				<tr> 
        				<td>아이디</td><br />
        				<td><input type=text name="id" size=15 maxlength=15 id="chk_id1" style="width: 70%;">
        					<input type=button value="중복검사" id="idOverlap" onclick="check_id();" style="width: 29%; position: relative;top: 2px;"></td>
        					<input type=hidden id="chk_id2" name=chk_id2 value="0">
      				</tr>
      				<p></p>
      				<tr> 
			        	<td>비밀번호</td>
			        	<td><input type=password name="pass" size=15 maxlength=15></td>
			      	</tr>
      				<tr>
				        <td>비밀번호 확인</td>
				        <td><input type=password name=pass2 size=15 maxlength=15></td>
					</tr>   
						<label for="name">이름</label>
						<input type="text" id="name" name="name" placeholder="이름">
				     	<label for="email">이메일</label><br />
						<input type="text"  name="email1" placeholder="이메일을 입력하세요" style="width: 33%;">  @ 
						<input type="text"  class="pass" name="email2" style="width: 31%" readonly />
	      					<select name="" id="" onChange="email_input(this,this.form);" style="width: 31%; height: 45px; position: relative;top: 2px;">
						      	<option selected="" value="">선택하세요</option>
							    <option value="1" >직접입력</option>
							    <option value="dreamwiz.com" >dreamwiz.com</option>
							    <option value="empal.com" >empal.com</option>
							    <option value="empas.com" >empas.com</option>
							    <option value="freechal.com" >freechal.com</option>
							    <option value="hanafos.com" >hanafos.com</option>
							    <option value="hanmail.net" >hanmail.net</option>
							    <option value="hotmail.com" >hotmail.com</option>
							    <option value="intizen.com" >intizen.com</option>
							    <option value="korea.com" >korea.com</option>
							    <option value="kornet.net" >kornet.net</option>
							    <option value="msn.co.kr" >msn.co.kr</option>
							    <option value="nate.com" >nate.com</option>
							    <option value="naver.com" >naver.com</option>
							    <option value="netian.com" >netian.com</option>
							    <option value="orgio.co.kr" >orgio.co.kr</option>
							    <option value="paran.com" >paran.com</option>
							    <option value="sayclub.com" >sayclub.com</option>
							    <option value="yahoo.co.kr" >yahoo.co.kr</option>
							    <option value="yahoo.com" >yahoo.com</option>
	      					</select>
	      				
						<label for="phone">핸드폰 번호</label> <br />
						<select name="mobile1" id="" style="width: 30%; height: 45px; position: relative; top: 2px;">
							<option value="">선택하세요</option>
							<option value="010">010</option>
							<option value="011">011</option>
							<option value="016">016</option>
							<option value="017">017</option>
							<option value="018">018</option>
							<option value="019">019</option>
						</select> - 
							<input type="text" id="phone" name="mobile2"  style="width: 30%;"> - 
							<input type="text" id="phone" name="mobile3" maxlength=4 style="width: 31%;"><br />

						<label for="birth">생년월일</label><br />
							<select name="birth1" id="" style="width: 30%; height: 45px;">
								<option value="">출생년도</option>
								<%for(int i=1900; i<=2018; i++){ %>
								<option value="<%=i%>"><%=i %></option>
								<%} %>
							</select>년 &nbsp;
							<select name="birth2" id="" style="width: 30%; height: 45px;">
								<option value="">월</option>
								<%for(int i=1; i<=9; i++){ %>
								<option value="0<%=i%>"><%=i %></option>
								<%} %>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>월
							<select name="birth3" id="" style="width: 29%; height: 45px;">
								<option value="">일</option>
								<%for(int i=1; i<=9; i++){ %>
								<option value="0<%=i%>"><%=i %></option>
								<%} %>
								<%for(int i=10; i<=30; i++){ %>
								<option value="<%=i%>"><%=i %></option>
								<%} %>
							</select>일    
							<input type="submit" value="가입하기" onclick="">
				</form>
				<iframe src="" id="ifrm1" scrolling=no fSrameborder=no width=0 height=0 name="ifrm1"></iframe>
			</div><!---div join-->
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
</html>