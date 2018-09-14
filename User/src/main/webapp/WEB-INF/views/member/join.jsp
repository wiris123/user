<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>




<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://dmaps.daum.net/map_js_init/postcode.v2.js"></script>
<title>회원가입</title>
		<%@ include file="../include/header.jsp"  %>
</head>
	<!-- 머리 -->
		

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

	
//캡챠 그림 새로고침
function imgRefresh()
{
	$.ajax({    	
    	url:"../captcha.do",
    	type:"get",
    	success:function(result){
   		
    		    $("#captchaImg").attr("src", "../captcha.do?id=" + Math.random()); 			
    			
    	}    	
    });

}

$(document).ready(function(){
	
	$("#confirm").click(function(){
		var captcha=$("#captcha").val();
		
		$.ajax({
			url:"../capCharConfirm.do?capcha="+captcha,
		   	type:"get",
	    	success:function(result){
				if(result=="SUCCESS"){		
					$("#captchaConfirmvalue").text("로봇이 아닙니다.");
					$("#captcha").val("");
					$("#captchadiv").hide();
					$("#captresult").val(result);
					
				}else{
					$("#captcha").val("");
					imgRefresh();
				}
			}
		});

		
	});
	
});	


/*  우편번호 */
function zipcodeFind(){
    new daum.Postcode({
        oncomplete: function(data) {
            var fn = document.memberFrm;
            fn.zipcode.value = data.zonecode;//우편번호
            fn.zipcode1.value = data.address;//기본주소
            fn.zipcode2.focus();//상세주소로 포커스 이동
        }
    }).open();
}

function mValidate(fn) {
	
	if(idcheck==false){
		document.getElementById("idDiv").innerHTML =
			" 중복 검사를 통과하지 못했습니다.";
		document.getElementById("idDiv").style.color=
			'red';
		document.getElementById("id").focus();
		
		return false;
	} 
	//비밀번호에 입력한 값과 비밀번호 확인에 입력한 값이
	//일치 하지 않으면 서버로 전송하지 않도록
	var pass = document.getElementById("pass");
	var pass2 = document.getElementById("pass2");
	if(pass.value != pass2.value){
		alert("두 개의 비밀번호는 일치해야 합니다.");
		pass.focus();
		return false;
	}
	
	//비밀번호는숫자,영문자 , 특수문자 1개 이상으로 8자 이상
	//만들어 졌는지 검사  정규식이용
	var p1 =/[0-9]/;
	var p2 =/[a-zA-Z]/;
	var p3 =/[~!@#$%^&*()]/;
	if(!p1.test(pass.value) || !p2.test(pass.value) ||
	!p3.test(pass.value) || pass.value.length < 8){
		alert("비밀번호는 8자 이상 숫자 , 영문자 , 특수문자를 포함해야 합니다.");
		pass.focus();
		return false;
	}

	/*  	if(fn.id.value=="")
	 	{
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
		  */
		if(!$("#captresult").val()) 
		{
		 alert('캡챠를 입력해 주세요');
		 document.captcha.focus();
		 return false;
		}
			
		
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
 
function idCheck()
{   
	$.ajax({
		
		url : "../member/idCheck.do",
		type : 'get',
		data : 
		{
			id : $('#id').val()
		}
		,		
		dataType : "json",
		contentType : "text/html;charset=utf-8",
		success : function(data) {
			
			if (data.aff==1) 
			{ 
				

				$("#id").css("border",'solid red'); 
			}
			else
			{ 
				
				$("#id").css("border",'solid green');  
				$("#id").focus();
			}
		},
		error : function(errorData)
		{
			alert("오류"+errorData.status+" "+errorData.statusText);
		}
	});	
}

</script>
<body onload= "document.getElementById('id').focus();">
	<div id="wrapper">
	
	
		<div id="container"> 
			<%@ include file="../include/Head.jsp" %>
			
		<!-- 내용시작 -->
		<div id="content">
			<div><a href="${pageContext.request.contextPath}/user/register"><h3 class="box-title">회원가입</h3></a></div>
			<div class="join_wrap">   

				<form name="memberFrm" method="post" action="../member/insertjoin.do" onsubmit="return mValidate(this);" >
					<div id="join" style="width: 500px; margin: 0 auto;" >
      				<tr> 
        				<td>아이디</td><br />
        				<td>
        					<input type=text name="id" size=15 maxlength=15 id="id" onkeyup="idCheck();" required="required">
        					
        				</td>		
      				</tr>
      				<p></p>
      				<tr> 
			        	<td>비밀번호</td>
			        	<td><input type=password name="pass" id="pass" size=15 maxlength=15 required="required"></td>
			      	</tr>
      				<tr>
				        <td>비밀번호 확인</td>
				        <td><input type=password name=pass2 id="pass2" size=15 maxlength=15 required="required"></td>
					</tr>   
						<label for="name">이름</label>
						<input type="text" id="name" name="name" pattern="([a-z, A-Z, 가-힣]){2,}" required="required" title="이름은 문자 2자 이상입니다.">
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
								<%for(int i=1940; i<=2018; i++){ %>
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
							</select>일<br />
						<tr>
							<td>주소</td><br />
							<td>
								<input type="text" name="zipcode" id="zipcode" value=""  class="join_input" style="width:100px;" />
								<a href="javascript:;" title="새 창으로 열림" onclick="zipcodeFind();" onkeypress="">[우편번호검색]</a><br/>
								<input type="text" name="zipcode1" value="" id="zipcode1" class="join_input" style="width:550px; margin-top:5px;" /><br>
								<input type="text" name="zipcode2" value="" id="zipcode2" class="join_input" style="width:550px; margin-top:5px;" />
							</td>	
						</tr>	
							
							
						<div id="captchadiv" style="margin: 10px 0px 30px 0px">	
						<input type="hidden" id="captresult" name="captresult" />
						<img src="../captcha.do" id="captchaImg" alt="captcha img">
						<input type="text" placeholder="보안문자를 입력하세요" name="captcha"  id="captcha">
						<a href="#" onclick="imgRefresh()" id="refreshBtn" ><i class="glyphicon glyphicon-refresh"></i>새로고침</a>					
						<a href="#" id="confirm">확인</button></a></div>
						<span id="captchaConfirmvalue" style="color:red;"></span>	
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