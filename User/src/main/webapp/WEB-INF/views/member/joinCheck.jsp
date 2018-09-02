<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dojo/dojo.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>약관동의</title>
</head>
<script type="text/javascript">
	//전체선택
    function selectAll(obj) {
    	var chkObj = document.getElementsByName("select_chkbox");
    	var rowCnt = chkObj.length - 1;
    	// 대가리에 노드를 체크로 전환시
    	if (obj.checked == true) 
    	{
    		// 전부 선택으로 바꿔줌
    		for (var i = 0; i <= rowCnt; i++) 
    		{
    			chkObj[i].checked = true;
    		}
    		
    		// 체크 해제시
    	} else {
    		// 전부 체크 해제
    		for (var i = 0; i <= rowCnt; i++) {
    			chkObj[i].checked = false;
    		}
    	}
    	
    }
	
	function selectOne(obj){
		var chkObj = document.getElementById("select_all");
		
		if(obj.checked!=true)
		{
			chkObj.checked = false;	
		}
		else if(obj.checked==true)
		{
			chkObj.checked = true;
		}
	}

</script>
 
  <style type="text/css">
  	.provision_wrap {
  		margin: 0 auto;
  		width: 800px;
  		height: 740px;
  		border: 1px solid #eee;
  	}

  	.agree {
  		margin: auto;
  		float: left;
  		width: 700px;
  		padding: 20px;
  		font-family: 돋움;
  		font-size: 11pt;
  		color: #252525;
  		font-weight: bold;
  	}

  	.button {
  		padding-top: 20px;
  	}

  	.provision {
  		margin: 0 auto;
  		width: 750px;
  		height: 200px;
  		overflow:auto; 
  		padding:5px;
  		background: #f7f7f7;
  		font-family: 돋움;
  		font-size: 9pt;
  		color: #666;
  		line-height: 170%;
  		border: 1px solid #f2f2f2;
  	}

  	.yesno_wrap {
  		padding-top: 20px;
  		margin: auto;
  		width: 710px;
  		position: relative;
  	}

  	.pro_no {
  		float: left;
  		margin-right: 15px;
  		font-family: 돋움;
  		font-size: 14pt;
  		font-weight: bold;
  		width: 345px;
  		height: 70px;
  		background: #fff;
  		border: 1px solid #eee;
  		text-align: center;
  		line-height: 70px;
  		
  	}

  	.pro_yes {
  		margin-left: 25px;
  		font-family: 돋움;
  		font-size: 14pt;
  		font-weight: bold;
  		color: white;
  		width: 345px;
  		height: 70px;
  		background: #4374D9;
  		border: 1px solid #4374D9;
  		display: table-cell;
    	vertical-align: middle;
    	text-align: center;
  	}
  	.checkbox-wrap { cursor: pointer; }
	.checkbox-wrap .check-icon  { 
		display: inline-block; 
		width: 24px; 
		height: 24px; 
		background: url(../resources/images/radio_btn1.PNG) left center no-repeat; 
		vertical-align: middle; transition-duration: .3s; 
	}
	.checkbox-wrap input[type=checkbox] { display: none; }
	.checkbox-wrap input[type=checkbox]:checked + .check-icon { background-image: url(../resources/images/radio_btn2.PNG); }
  </style>
<body>
	<div id="wrapper">
	
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"  %>
		<div id="container"> 
			<%@ include file="../include/Head.jsp" %>
			
			<!-- 내용시작 -->
			<div id="content">
			<div class="join_wrap">   
    <div class="provision_wrap">
    <form name="agreeForm" method="post" action="join.jsp">
		<div class="agree">이용약관, 개인정보 수집 및 이용, 프로모션 안내 메일 수신(선택)에 모두 동의합니다.</div>
		<div class="button"><label class="checkbox-wrap"><input type="checkbox" name="select_chkbox" id="select_all" value="" onclick="selectAll(this)"><i class="check-icon"></i></label></div>
		<br /><br />
		<div class="agree">ISM 이용약관 동의(필수)</div>
		<div class="button"><label class="checkbox-wrap"><input type="checkbox" name="select_chkbox" value="" id="select_one" onclick="selectOne(this);"><i class="check-icon"></i></label></div>
		<div class="provision">
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	</div><br />
    	<div class="agree">개인정보 수집 및 이용에 대한 안내(필수)</div>
		<div class="button"><label class="checkbox-wrap"><input type="checkbox" name="select_chkbox" id="select_one1" value="" onclick="selectOne(this);"><i class="check-icon"></i></label></div>
		<div class="provision">
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	이용약관을 구구절절 적어요<br />
    	</div>
    </div>
	</div>
		<div class="yesno_wrap">
			<a href="#"><div class="pro_no">비동의</div></a>
			<a href="javascript:agreeSendit();"><div class="pro_yes">동의</div></a>
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
</html>