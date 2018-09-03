<%@page import="java.util.Date"%>
<%@page import="java.text.SimpleDateFormat"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>고객센터</title>
</head>
<%
//현재시간 구하기
long time = System.currentTimeMillis(); 
SimpleDateFormat dayTime = new SimpleDateFormat("yy/MM/dd");
String str = dayTime.format(new Date(time));
System.out.println(str);

long start = System.currentTimeMillis() ; 
long end = System.currentTimeMillis(); 

pageContext.setAttribute("str", str);
%>
<body>
	<div id="wrapper">

		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content" class="page-counsel">
				<div id="popCounselEmail" class="">
		<!-- # 상담신청입력폼 # -->
		<h3 class="mes-top">이메일 주소와 상담하실 내용을 입력해 주세요.</h3>
		<form src="<%=request.getContextPath()%>/custom/sendemail" method="post">
		<fieldset class="form-content3">
			<legend>이메일상담 신청정보입력</legend>
			<dl>
				<dt class="heading"><label for="applyUserName">이름</label></dt>
				<dd class="wrap">
					<input type="text" class="text" id="applyUserName" title="신청인 이름" style="ime-mode:active;" maxlength="30" name="name"/>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<span class="heading"><label for="applyUserName">작성일</label></span>
					<input type="text" class="text" id="applyUserName" title="신청날짜" style="ime-mode:active;" maxlength="30" name="regidate" value="${str }"/>
				</dd>
			</dl>
			<dl>
				<dt class="heading"><label for="applyUserName">모바일</label></dt>
				<dd class="wrap">
					<input type="text" class="text" id="applyUserEmail1" title="이메일아이디" style="ime-mode:active;" name="mobile1"/>
						<span class="unit">-</span>
					<input type="text" class="text" id="applyUserEmail1" title="이메일아이디" style="ime-mode:active;" name="mobile2"/>
						<span class="unit">-</span>
					<input type="text" class="text " id="applyUserEmail2" title="이메일도메인" style="ime-mode:active;" name="mobile3"/>
				</dd>
			</dl>
			<dl>
				<dt class="heading"><label for="applyUserEmail1">이메일</label></dt>
				<dd class="wrap">
					<div class="form-email">
						<input type="text" class="text" id="applyUserEmail1" title="이메일아이디" style="ime-mode:disabled;" name="email1"/>
						<span class="unit">@</span>
						<input type="text" class="text " id="applyUserEmail2" title="이메일도메인" style="ime-mode:disabled;"  name="email2"/>
						<span class="select-box">
							<select title="이메일도메인 선택" id="popEmailCombobox">
								<option>직접입력</option>
								<option>naver.com</option>
								<option>daum.net</option>
								<option>nate.com</option>
								<option>gmail.com</option>
								<option>hotmail.com</option>
								<option>hanmail.net</option>
								<option>chol.com</option>
								<option>dreamwiz.com</option>
							</select>
						</span>
					</div>
				</dd>
			</dl>
			<dl class="block">
				<dt class="hd">문의내용</dt>
				<dd class="wrap">
					<div class="form-wrap1 textform">
						<label for="popEmailapplyCounselMemo" class="label">상담에 대한 간략한 내용과 함께 문의가 필요한 보험상품과<br/>본인 정보등을 함께 작성해 주시면, 보다 빠른 상담이 가능합니다.</label>
						<textarea rows="4" cols="20" id="popEmailapplyCounselMemo" class="textarea placeholder" title="문의내용(2000자까지 입력가능)" maxlength="2000" name="contents" style="ime-mode:active;">
							아래 내용을 기입해 주시면 보다 빠르고 자세한 상담이 가능합니다.
							- 문의상품 :
							- 생년월일 :
							- 성       별 :
							- 문의내용 :
						</textarea>
					</div>
					<div class="txt-sub"><span class="txt-num">(<em id="popEmailContentLength">0</em>/2000자)</span></div>
				</dd>
			</dl>
		</fieldset>
		<!-- # 하단버튼 # -->
		<div class="btn-area">
				<input type="submit" /><span>취소</span>
				<input type="submit" /><span>상담신청</span>
		</div>
			</form>
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