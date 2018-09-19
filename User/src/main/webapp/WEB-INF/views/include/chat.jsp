<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ISM채팅 상담</title>
<style>

body {
    height: 100%;
    margin-bottom: 30px;
    background-color: #f5f5f5;
}
.chat-box {
	display: inline-block;
	color: #34495e;
	margin: 0 0 30px 0;
}

.chat-box li {
	display: table;
	padding: 13px;
	margin: 7px 10px;
	font-size: 18px;
	line-height: 25px;
	-webkit-border-top-left-radius: 6px;
	-webkit-border-top-right-radius: 6px;
	-webkit-border-bottom-right-radius: 6px;
	-webkit-border-bottom-left-radius: 6px;
	-moz-border-radius-topleft: 6px;
	-moz-border-radius-topright: 6px;
	-moz-border-radius-bottomright: 6px;
	-moz-border-radius-bottomleft: 6px;
	border-top-left-radius: 6px;
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
	border-bottom-left-radius: 6px;
}

.chat-box .odd {
	background-color: #9df796;
	max-width: 60%;
	clear: both;
	float: left;
}

.chat-box .odd:after {
	content: ' ';
	position: relative;
	top: auto;
	bottom: auto;
	border: 12px solid;
	border-color: transparent transparent #9df796	 transparent;
	margin: 0 0 0 -24px;
	float: left;
}

.chat-box .even {
	background-color: #C1E4EC;
	max-width: 60%;
	height: auto;
	clear: both;
	float: right;
}

.chat-box .even:after {
	content: ' ';
	position: relative;
	bottom: auto;
	border: 12px solid;
	border-color: transparent transparent #C1E4EC transparent;
	margin: 0 -24px 0 0;
	float: right;
}

.chat-box li span {
	padding: 0 0 5px;
	color: #7f8c8d;
	display: block;
}

.footer {
	position:relative;
	bottom: 0;
	width: 100%;
	height: 70px;
	background: #f5f5f5;
	text-align:center;
}
input{
      margin:0;
    }
    input[type="text"]{
      width:85%;
      height:100%;
      border:none;
      font-size:1em;
      padding-left: 5px;
      font-style: oblique;
      display:inline;
      outline:none;
      box-sizing: border-box;
      color:black;

    }
    input[type=button]{
      width: 15%;
      height:100%;
      background-color: lightgray;
      border:none;
      background-color: white;
      font-size:1em;
      color:#042AaC;
      outline:none;
      display:inline;
      margin-left: -10px;
      box-sizing: border-box;
    }
    input[type=button]:hover{
      background-color: lightgray;
    }


</style>
</head>
<body>
	<div class="wrap" id="wrap">
    <div class="content">
        <div class="header"><img src="/img/layout_logo3.png"></div>
	        <div class="chat-box" height="100%" style="width: 100%;">
				<ul id="list">
				</ul>
			</div>
        <div class="footer">
			<input id="inputMessage" onkeyup="enterkey()" type="text" /> 
			<input type="button" value="send" onclick="send()" />
		</div>   
    </div>     
</div>

</body>
<script type="text/javascript">
	var textarea = document.getElementById("messageWindow");
	var webSocket = new WebSocket('ws://localhost:8080/Admin/broadcasting');
	var inputMessage = document.getElementById('inputMessage');
	webSocket.onerror = function(event) {
		onError(event)
	};
	webSocket.onopen = function(event) {
		onOpen(event)
	};
	webSocket.onmessage = function(event) {
		onMessage(event)
	};
	function onMessage(event) {
		var ul = document.getElementById("list");
		var li = document.createElement("li");
		li.classList.add("odd")
		li.appendChild(document.createTextNode(event.data));
		ul.appendChild(li);
		window.scrollTo(0, document.body.scrollHeight);
	}
	function onOpen(event) {
		var ul = document.getElementById("list");
		var li = document.createElement("li");
		li.classList.add("odd")
		li.appendChild(document.createTextNode("ISM 채팅 상담입니다. 무엇을 도와드릴까요?"));
		ul.appendChild(li);
	}
	function onError(event) {
		alert(event.data);
	}
	function send() {
		webSocket.send(inputMessage.value);
		var ul = document.getElementById("list");
		var li = document.createElement("li");
		li.classList.add("even")
		li.appendChild(document.createTextNode(inputMessage.value));
		ul.appendChild(li);
		inputMessage.value = "";
		window.scrollTo(0, document.body.scrollHeight);
	}
	function enterkey() {
		if (window.event.keyCode == 13) {

			// 엔터키가 눌렸을 때 실행할 내용
			send();
		}
	}
</script>
</html>