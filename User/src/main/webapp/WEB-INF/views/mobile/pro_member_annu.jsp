<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금보험 가입하기</title>
<!-- 부트스트랩 -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
<style>

/* input[type=text], select {
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
	width:flex;
	height:flex;
    border-radius: 5px;
    background-color: #4374D9;
    padding: 20px;
} */
</style>
<script type="text/javascript" src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js" charset="utf-8"></script>
</head>
<script type="text/javascript">

   
// 아이디 중복 체크
function check_id() {
  document.getElementById("chk_id2").value=0;
  var id=document.getElementById("chk_id1").value;

  if(!document.join.id.value) {
    window.alert('아이디를 입력해 주세요');
    document.join.id.focus();
    return false;
   }

  /* ifrm1.location.href="m_join_check.php?id="+id; */
}

// 닉네임 중복 체크
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

// 빈 값 체크
function mValidate(fn,mode) {
	
	if(fn.id.value==""){
      alert("아이디를 입력해주세요");
      fn.id.focus();
      return false;
	}
	
  if(!document.join.pass.value) {
    window.alert('비밀번호를 입력해 주세요');
    document.join.pw.focus();
    return false;
   }

  if(!document.join.pass2.value) {
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
  
  if(!document.join.nick.value) {
    window.alert('닉네임을 입력해 주세요');
    document.join.nick.focus();
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

function subCheck()
{
	var fn = document.memberFrm;

		fn.action = "../mobile/mobile_annu.do";
		fn.submit();

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
    <div id="container">
   	 <!-- 머리 -->
   		 <!-- page : content /////////////////////////////////////////////////// -->
   		<div id="content" class="form-group">
			<div><h1 class="heading">회원가입</h1></div>
			<div class="join_wrap" class="dropdown-menu">   
				<form name="memberFrm" onsubmit="return mValidate(this);" method="post">
					<div id="join"  class="form-group">
					<input type="hidden" name="userInfo" id="userInfo" value='${basicInfo}'>
					
					
					<input type="text" name="ins_name" class="form-control" value="인터넷 연금보험 3.0(무배당)"/>
      				<tr> 
        				<td>아이디</td><br />
        				<td><input type=text class="form-control" name="id" size=15 maxlength=15 id="chk_id1" style="width: 70%;" value="${USER_ID }">
        					<input type=button class="btn" value="중복검사" id="idOverlap" onclick="check_id();" style="width: 29%; position: relative;top: 2px;"></td>
        					<input type=hidden id="chk_id2" name=chk_id2" value="0"><br />
      				</tr>
      				
						<tr>
							<td><label for="name">이름</label></td>
							<td><input type="text" id="name" name="name" placeholder="이름" class="form-control" value="${USER_NAME }"></td>						
						</tr>
					
				     	<label for="email">이메일</label><br />
						<input type="text" class="form-control"  name="email1" placeholder="이메일을 입력하세요" style="width: 33%;">  @ 
						<input type="text"  class="form-control" name="email2" style="width: 31%" readonly />
	      					<select name="" class="input-group-text" id="" onChange="email_input(this,this.form);" style="width: 31%; height: 45px; top: 2px;">
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
	      				
	      				<label for="phone">전화번호</label> <br />
						<select name="phone1" class="input-group-text" id="phone1" style="width: 30%; height: 45px; top: 2px;">
							<option value="">선택하세요</option>
							<option value="02">010</option>
							<option value="031">031</option>
							<option value="032">032</option>
							<option value="033">033</option>
							<option value="041">041</option>
							<option value="042">042</option>
							<option value="043">043</option>
							<option value="044">044</option>
							<option value="051">051</option>
							<option value="052">052</option>
							<option value="053">053</option>
							<option value="054">054</option>
							<option value="055">055</option>
							<option value="061">061</option>
							<option value="062">062</option>
							<option value="063">063</option>
							<option value="064">064</option>
						</select> - 
							<input type="text" id="phone2" name="phone2"  style="width: 30%;"> - 
							<input type="text" id="phone3" name="phone3" maxlength=4 style="width: 31%;"><br />
						
						
						<label for="phone">핸드폰 번호</label> <br />
						<select name="mobile1" class="input-group-text" id="" style="width: 30%; height: 45px; top: 2px;">
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
						
						<label for="drive">운전여부</label><br />
							<select name="drive" class="input-group-text" id="" style="width: 30%; height: 45px;">
								<option value="">선택</option>
								<option value="1">예</option>
								<option value="0">아니오</option>
							</select>&nbsp; <br />
							
						<label for="cigar">흡연여부</label><br />
						<select name="cigar" class="input-group-text" id="" style="width: 30%; height: 45px;">
							<option value="">선택</option>
							<option value="2">예</option>
							<option value="0">아니오</option>
						</select><br />
						
						<label for="birth">당뇨, 고혈압, 고지혈증 혈관 관련 질환이 있으십니까?</label><br />
						<select name="hospit1" class="input-group-text" id="" style="width: 30%; height: 45px;">
							<option value="">선택</option>
							<option value="2">예</option>
							<option value="0">아니오</option>
						</select><br />
						
						<label for="birth">폐렴, 천식 등 기관지 관련 질환이 있으십니까?</label><br />
						<select name="hospit2" class="input-group-text" id="" style="width: 30%; height: 45px;">
							<option value="">선택</option>
							<option value="2">예</option>
							<option value="0">아니오</option>
						</select><br />
						
						<label for="birth">최근 3년간 위염, 위궤양, 역류성 식도염등의 질환이 있으십니까?</label><br />
						<select name="hospit3" class="input-group-text" id="" >
							<option value="">선택</option>
							<option value="2">예</option>
							<option value="0">아니오</option>
						</select><br />
						
						<!-- <input type="hidden" name="rprem" value=""/> -->
						
						
						<input type="button" class="btn btn-success"value="가입하기" onclick='subCheck();'>
				</form>				
				<iframe src="" id="ifrm1" scrolling=no fSrameborder=no width=0 height=0 name="ifrm1"></iframe>
			</div>
			</div>
			<!---div join-->
		</div>
   	 <!-- 머리끝 -->


    </div>
</body>
</html>
