<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page session="true"%>
<html>
<head>
<title>Home</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>

<script type="text/javascript">
	//캡챠 그림 새로고침
	function imgRefresh() {
		$.ajax({
			url : "../captcha.do",
			type : "get",
			success : function(result) {

				$("#captchaImg").attr("src",
						"../captcha.do?id=" + Math.random());

			}
		});

	}

	$(document).ready(function() {

		$("#confirm").click(function() {
			var captcha = $("#captcha").val();

			$.ajax({
				url : "../capCharConfirm.do?capcha=" + captcha,
				type : "get",
				success : function(result) {
					if (result == "SUCCESS") {
						$("#captchaConfirmvalue").text("로봇이 아닙니다.");
						$("#captcha").val("");
						$("#captconf").val()
						$("#captchadiv").hide();

					} else {
						$("#captcha").val("");
						imgRefresh();
					}
				}
			});

		});

	});
	$(document).ready(function() {

		$("#btnDelete").click(function() {
			if (confirm("삭제하시겠습니까?")) {
				document.deleteform.action = "../member/deletemember.go";
				document.deleteform.submit();
			}
		});
	});
</script>

<body>
	<div id="wrapper">
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용시작 -->
			<div id="content" class="page-guide">

				<div class="box-content4">
					<div class="line"></div>
					<div>
						<h1 class="heading">본인인증 로그인</h1>
						<div class="form-content1 small">
							<form name="deleteform" id="deleteform" autocomplete="off"
								method="post">
								<fieldset id="field">
									<legend>비밀번호확인</legend>

									<dl>
										<dt class="heading">
											<label for="pass">비밀번호</label>
										</dt>
										<dd class="wrap">
											<input type="hidden" name="id" value="${USER_ID }" /> <input
												type="password" class="text" id="pass" name="pass"
												title="비밀번호" maxlength="12" />
										</dd>
									</dl>
									<div id="captchadiv" style="margin: 10px 0px 30px 0px">
										<img src="../captcha.do" id="captchaImg" alt="captcha img"><a
											href="#" onclick="imgRefresh()" id="refreshBtn"><i
											class="glyphicon glyphicon-refresh"></i>새로고침</a> </a> <br />
										<input type="text" placeholder="보안문자를 입력하세요" name="captcha"
											id="captcha"> <input type="hidden" name="captconf"
											id="captconf" />
											<span id="captchaConfirmvalue" style="color: red;"></span>
											<a href="#" id="confirm">확인 
									</div>

								</fieldset>

								<div class="btn-sub">
									<a href="" class="btn-type2 c3 arr" id="btnDelete" value="탈퇴"
										target="_blank"><span>회원탈퇴</span></a> <a
										href="../member/mypage" class="btn-type2 c3 arr" value="취소"
										target="_blank"><span>취소</span></a>
								</div>
							</form>
						</div>
					</div>
					<div class="line"></div>
					<a href="" class="ban-mypage"><img
						src="resources/cms/pc/images/event/1808_mypage_ban.jpg" alt=""></a>
				</div>
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
