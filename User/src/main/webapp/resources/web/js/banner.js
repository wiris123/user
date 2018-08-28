var layerErmsDomainId;
var layerErmsNodeId;
var layerErmsChannelId;

// 전화상담 팝업
var popCounselTel;

// 이메일상담 팝업
var popCounselEmail;

// 상담가능 여부
var checkServiceChat ='N';
var checkServiceEmail ='N';
var checkServiceTel ='N';
var checkServiceTelReserve ='N';
var checkServiceRemote ='N';

// 상담가능 여부에 따른 메세지 내용
var checkServiceTimeMessage;
var checkServiceTimeSuccess;

var checkReservationDateResult = false;

// 상담가능 여부(주말/공휴일/평일18시이전) N:가능, Y:불가능
var serviceClosed = 'N';

$(document).ready(function(){
	popCounselTel = $plugin.popmodal($('#popCounselTel'));
	popCounselEmail = $plugin.popmodal($('#popCounselEmail'));

	checkServiceTime();

	$("#sendEmailCounsel").click(function () {
		// ERMS 정보 가져오기
		$.ajax({
			type : "POST",
			url : "/customerCenter/getErmsInfo.eds",
			data : {},
			dataType : 'json',
			success : function(result) {
				if (result.success) {
					layerErmsDomainId = result.data.domainNodeId;
					layerErmsNodeId = result.data.emailNodeId;
					layerErmsChannelId = result.data.ermsChannelId;
					emailCounsel();
				} else {
					alert(result.message);
				}
			},
			error : function() {
				// alert('서버와 통신 중 오류가 발생했습니다.');
			}
		});
	});

	// 전화상담 신청
	$('#sendTelCounsel').click(function(){
		sendTelCounsel();
	});

	// 오늘 날짜
	var d = new Date();
	var year = (d.getFullYear()).toString();
	var month = (d.getMonth()+ 1).toString();
	if (month.length == 1) {
		month = '0' + month;
	}
	var hour = (d.getHours()).toString();
	if (hour.length == 1) {
		hour = '0' + hour;
	}
	var day = (d.getDate()).toString();


	// 월 마지막 날
	// day = (tomorrow.getDate()).toString();

	if (Number(hour) >= 17) {
		// 오늘 날짜 하루 더함.
		var tomorrow = new Date(Date.parse(d) + 1 * 1000 * 60 * 60 * 24); // 오늘 날짜의 하루 더함.
		year = (tomorrow.getFullYear()).toString();
		month = (tomorrow.getMonth() + 1).toString();
		if (month.length == 1) {
			month = '0' + month;
		}
		hour = (tomorrow.getHours()).toString();
		if (hour.length == 1) {
			hour = '0' + hour;
		}
		day = (tomorrow.getDate()).toString();
	}
	if (day.toString().length == 1) {
		day = '0' + day;
	}

	// var min = (d.getMinutes()).toString();
	// var sec = (d.getSeconds()).toString();

	$('#telYear1').val(year + month + day);
	// $('#telYear2').val(year + month + day);

	var initEndTime1 = (Number($('#telStartTime1 option:selected').text()) + 1);
	$.each($('#telEndTime1').find('option'), function(){
		if ($(this).text() == initEndTime1) {
			$(this).prop('selected', true);
		}
	});
	var initEndTime2 = (Number($('#telStartTime2 option:selected').text()) + 1);
	$.each($('#telEndTime2').find('option'), function(){
		if ($(this).text() == initEndTime2) {
			$(this).prop('selected', true);
		}
	});

	$.each($('#telStartTime1').find('option'), function(){
		if ($(this).text() == (Number(hour) + 1)) {
			$(this).prop('selected', true);
		}
	});
	$('#telStartTime1').change(function(){
		if ($('#telStartTime1 option:selected')) {
			$.each($('#telEndTime1').find('option'), function(){
				if ($.trim($(this).text()) == (Number($('#telStartTime1 option:selected').text()) + 1)) {
					$(this).prop('selected', true);
					TelCounselDuCheck();
				}
			});
		}
	});
	$('#telEndTime1').change(function(){
		if ($('#telEndTime1 option:selected')) {
			if ($('#telEndTime1 option:selected').text() <= $('#telStartTime1 option:selected').text()) {
				alert('종료 예약 시간이 시작 예약 시간보다 작거나 같을수 없습니다.');
				return false;
			} else {
				TelCounselDuCheck();
			}
		}
	});
	$.each($('#telEndTime1').find('option'), function(){
		if ($.trim($(this).text()) == (Number(hour) + 2)) {
			$(this).prop('selected', true);
		}
	});

	$('#telStartTime2').change(function(){
		if ($('#telStartTime2 option:selected')) {
			$.each($('#telEndTime2').find('option'), function(){
				if ($.trim($(this).text()) == (Number($('#telStartTime2 option:selected').text()) + 1)) {
					$(this).prop('selected', true);
					TelCounselDuCheck();
				}
			});
		}
	});
	$('#telEndTime2').change(function(){
		if ($('#telEndTime2 option:selected')) {
			if ($('#telEndTime2 option:selected').text() <= $('#telStartTime2 option:selected').text()) {
				alert('종료 예약 시간이 시작 예약 시간보다 작거나 같을수 없습니다.');
				return false;
			} else {
				TelCounselDuCheck();
			}
		}
	});
	$.each($('#telStartTime2').find('option'), function(){
		if ($(this).text() == (Number(hour) + 1)) {
			$(this).prop('selected', true);
		}
	});
	$.each($('#telEndTime2').find('option'), function(){
		if ($.trim($(this).text()) == (Number(hour) + 2)) {
			$(this).prop('selected', true);
		}
	});

	// 전화 상담예약 - 예약시간1
	$('#telYear1').change(function() {
		$.ajax({
			type : "POST",
			url : "/customerCenter/checkReservationDate.eds",
			data : {
				reservationDate: $.trim($('#telYear1').val())
			},
			dataType : 'json',
			success : function(result) {
				if (!result.success) {
					alert(result.message);
					$('#telYear1').focus();
					return false;
				} else {
					TelCounselDuCheck();
				}
			},
			error : function() {
				alert('서버와 통신 중 오류가 발생했습니다.');
			}
		});
	});

	// 전화 상담예약 - 예약시간1
	$('#telYear2').change(function() {
		$.ajax({
			type : "POST",
			url : "/customerCenter/checkReservationDate.eds",
			data : {
				reservationDate: $.trim($('#telYear2').val())
			},
			dataType : 'json',
			success : function(result) {
				if (!result.success) {
					alert(result.message);
					$('#telYear2').focus();
					return false;
				} else {
					TelCounselDuCheck();
				}
			},
			error : function() {
				alert('서버와 통신 중 오류가 발생했습니다.');
			}
		});
	});
});

// 상담가능 여부 확인
function checkServiceTime() {
	var setStatus = function($obj, onOff){
		if(onOff == 'on'){
			$obj.removeClass('off').addClass('on').text('[ON]');
		}else{
			$obj.removeClass('on').addClass('off').text('[OFF]');
		}
	}
	
	$.ajax({
		type : "POST",
		url : "/customerCenter/checkServiceTimeAll.eds",
		data : {servGbn: "C"},
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				
				// 채팅상담 ON
				if (result.chkChat == 'Y') {
					setStatus($('em[name=chatStatus]'), 'on');
					setStatus($('div[data-role="ui-main-counsel"]').find('dd.m2').find('em'), 'on');
				}

				// 이메일상담, 전화상담 - 이름
				if (result.chkEmail == 'Y') {
					setStatus($('em[name=emailStatus]'), 'on');
					setStatus($('div[data-role="ui-main-counsel"]').find('dd.m3').find('em'), 'on');

					if (result.custName != '') {
						$('#customerName').val(result.custName);
						$('#applyUserName').val(result.custName);
					}

					// 이메일 상담 고객 이메일 설정
					if (result.custEmail != '') {
						$('#applyUserEmail1').val(result.custEmail1);
						$('#applyUserEmail2').val(result.custEmail2);
					}
				}

				// 전화상담
				if (result.chkTel == 'Y') {
					setStatus($('em[name=telStatus]'), 'on');
				}

				// 전화상담예약 ON
				if (result.chkTelReserve == 'Y') {
					setStatus($('em[name=telReserveStatus]'), 'on');
					setStatus($('div[data-role="ui-main-counsel"]').find('dd.m4').find('em'), 'on');
					
					// 전화상담 전화번호
					if (result.custPhone2 != '' && result.custPhone3 != '') {
						$('#telNum2').val(result.custPhone2 + result.custPhone3);
					}
				}

				// 원격지원 ON
				if (result.chkRemote == 'Y') {
					setStatus($('#remoteStatus'), 'on');
					setStatus($('em[name=remoteStatus]'), 'on');
					setStatus($('div[data-role="ui-main-counsel"]').find('dd.m5').find('em'), 'on');
				}

				// 상태값 전역변수 저장
				checkServiceChat = result.chkChat;
				checkServiceEmail = result.chkEmail;
				checkServiceTel = result.chkTel;
				checkServiceTelReserve = result.chkTelReserve;
				checkServiceRemote = result.chkRemote;
			} else {
				// 채팅상담 OFF
				setStatus($('em[name=chatStatus]'), 'off');

				// 전화상담 OFF
				setStatus($('em[name=telStatus]'), 'off');

				// 전화상담예약 ON 24시간
				setStatus($('em[name=telReserveStatus]'), 'on');
				checkServiceTelReserve = 'Y';

				// 원격지원 OFF
				setStatus($('#remoteStatus'), 'off');
				setStatus($('em[name=remoteStatus]'), 'off');

				// 이메일상담 ON 24시간
				setStatus($('em[name=emailStatus]'), 'on');
				checkServiceEmail = 'Y';
			}

			// 메세지 전역메세지로 저장
			checkServiceTimeSuccess = result.success;
			checkServiceTimeMessage = result.message;

			// 상담가능 여부(주말/공휴일/평일18시이전) N:가능, Y:불가능
			serviceClosed = result.serviceClosed;
		},
		error : function() {
		} 
	});
}

// 예약시간 선택 가능여부 결과

// 상담팝업 실행
function openPopCounsel(counselType, obj) {
	checkServiceTime();

	var setOpenerFocus = function(popmodalObj){
		if(typeof obj != 'undefined'){
			popmodalObj.find('.ui-close').click(function(){
				$(obj).focus();
			});
		}
	};
	
	// 채팅상담
	if (counselType == 'chat') {
		if (checkServiceChat == 'Y'){
			var url = "https://erms.samsunglife.com/m_eds/talk/TalkContents.jsp";
			var nodeAlias = "SSLIFE_EDS_TALK_ROOT";
			var custName = "고객님";

			url = url + "?nodeAlias="+nodeAlias + "&cust_name="+custName + "&direct_yn=Y";	//팝업창에 출력될 페이지 URL

			var oWin = window.open(url, "talk", "width=400, height=580 toolbar=no, menubar=no, status=no, scrollbars=no");
			if (oWin && !oWin.closed) {
				oWin.location = url;
				oWin.focus();
			}

			//self.close();
			if (oWin) {
				oWin.focus();
			}
		} else {
			alert(checkServiceTimeMessage);
			return;
		}
	}

	// 이메일상담
	if (counselType == 'email') {
		if (checkServiceEmail == 'Y') {
			popCounselEmail.openOutput();
			setOpenerFocus(popCounselEmail);
		} else {
			alert(checkServiceTimeMessage);
			return;
		}
	}

	// 전화상담 예약
	if (counselType == 'telReserve') {
		if (checkServiceTelReserve == 'Y') {
			popCounselTel.openOutput();
			setOpenerFocus(popCounselTel);
		} else {
			alert(checkServiceTimeMessage);
			return;
		}
	}

	// 원격지원
	if (counselType == 'remote') {
		if (checkServiceRemote == 'Y'){
			var width = "1100";
			var height = "900";

			width =(screen.width-10<width)?   screen.width  -10 : width;
			height=(screen.height-10<height)? screen.height -57 : height;

			var left   = (screen.width - width -10) / 2;
			var top    = (screen.height- height-57) / 2;

			left = (left<0)? 0 : left;
			top  = (top <0)? 0 : top;

			var popUrl = "https://remote.samsunglife.com/";
			window.open(popUrl, "rsweb", "width="+width+", height="+height+", left="+left+", top="+top+", scrollbars=yes, location=yes");			
		} else {
			alert(checkServiceTimeMessage);
			return;
		}
	}
}

/**
 * 같은 시간대에 N번 이상 상담 신청 못하도록 체크
 */
function TelCounselDuCheck() {
	var customerName = $.trim($('#customerName').val()); // 고객 이름
	var telNum1 = $('#telNum1 option:selected').text(); // 휴대폰 앞번호 3자리
	var telNum2 = $('#telNum2').val(); // 휴대폰 중간 + 끝 번호 8자리

	var telYear1 = $.trim($('#telYear1').val()); // 첫번째 예약 날짜
	var telStartTime1 = $('#telStartTime1 option:selected').text(); // 시간
	var telEndTime1 = $('#telEndTime1 option:selected').text(); // 시간

	var telYear2 = $('#telYear2').val(); // 두번째 예약 날짜
	var telStartTime2 = $('#telStartTime2 option:selected').text();
	var telEndTime2 = $('#telEndTime2 option:selected').text();

	if (customerName == '') {
		$('#customerName').focus();
		alert('이름을 입력해 주세요!');
		return;
	}
	if (telNum2 == '') {
		$('#telNum2').focus();
		alert('전화번호를 입력해 주세요.');
		return;
	}
	if (isNaN(telNum2)) {
		$('#telNum2').focus();
		alert('전화번호는 숫자만 입력해 주세요.');
		return;
	}
	if (telNum2.length < 7) {
		$('#telNum2').focus();
		alert('전화번호를 바르게 입력해 주세요!');
		return;
	}
	if (telNum2.length > 8) {
		$('#telNum2').focus();
		alert('전화번호는 8글자 이내로 입력해 주세요!');
		return;
	}
	if (telYear1 == '') {
		$('#telYear1').focus();
		alert('첫번째 예약 날짜를 선택해 주세요!');
		return;
	}
	if (telEndTime1 <= telStartTime1) {
		alert('첫번째 선택한 예약 시간보다 작거나 같을수 없습니다.');
		return;
	}

	$.ajax({
		type : 'POST',
		url : '/customerCenter/getCounselTels.eds',
		data : {
			"telNum1" : telNum1,
			"telNum2" : telNum2,
			"telYear1" : telYear1,
			"telStartTime1" : telStartTime1,
			"telEndTime1" : telEndTime1,
			"telYear2" : telYear2,
			"telStartTime2" : telStartTime2,
			"telEndTime2" : telEndTime2
		},
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				return;
			} else {
				alert(result.message);
				return false;
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다!');
		}
	});
}

/**
 * 전화상담 예약
 */
function sendTelCounsel() {
	var customerName = $.trim($('#customerName').val()); // 고객 이름
	var telNum1 = $('#telNum1 option:selected').text(); // 휴대폰 앞번호 3자리
	var telNum2 = $('#telNum2').val(); // 휴대폰 중간 + 끝 번호 8자리

	var telYear1 = $.trim($('#telYear1').val()); // 첫번째 예약 날짜
	var telStartTime1 = $('#telStartTime1 option:selected').text(); // 시간
	var telEndTime1 = $('#telEndTime1 option:selected').text(); // 시간

	var telYear2 = $('#telYear2').val(); // 두번째 예약 날짜
	var telStartTime2 = $('#telStartTime2 option:selected').text();
	var telEndTime2 = $('#telEndTime2 option:selected').text();

	if (customerName == '') {
		$('#customerName').focus();
		alert('이름을 입력해 주세요!');
		return;
	}
	if (telNum2 == '') {
		$('#telNum2').focus();
		alert('전화번호를 입력해 주세요.');
		return;
	}
	if (isNaN(telNum2)) {
		$('#telNum2').focus();
		alert('전화번호는 숫자만 입력해 주세요.');
		return;
	}
	if (telNum2.length < 7) {
		$('#telNum2').focus();
		alert('전화번호를 바르게 입력해 주세요!');
		return;
	}
	if (telNum2.length > 8) {
		$('#telNum2').focus();
		alert('전화번호는 8글자 이내로 입력해 주세요!');
		return;
	}
	if (telYear1 == '') {
		$('#telYear1').focus();
		alert('첫번째 예약 날짜를 선택해 주세요!');
		return;
	}
	if (telEndTime1 <= telStartTime1) {
		alert('첫번째 선택한 예약 시간보다 작거나 같을수 없습니다.');
		return;
	}

	// 예약시간 선택 가능여부 결과 체크
	$.ajax({
		type : "POST",
		url : "/customerCenter/checkReservationDate.eds",
		data : {
			reservationDate: $.trim($('#telYear1').val())
		},
		dataType : 'json',
		success : function(result) {
			if (!result.success) {
				alert(result.message);
			} else {
				if (telYear2 == '') {
					telStartTime2 = '';
					telEndTime2 = '';
				} else {
					$.ajax({
						type : "POST",
						url : "/customerCenter/checkReservationDate.eds",
						data : {reservationDate: $.trim($('#telYear2').val())},
						dataType : 'json',
						success : function(result) {
							if (!result.success) {
								alert(result.message);
								return false;
							}
						},
						error : function() {
							alert('서버와 통신 중 오류가 발생했습니다.');
						}
					});

					telStartTime2 = $('#telStartTime2 option:selected').text(); // 시간
					telEndTime2 = $('#telEndTime2 option:selected').text(); // 시간
				}

				var contents = $.trim($('#applyCounselMemo2').val()); // 문의 내용
				var telAgree = $("#telCounselAgreechk1").is(":checked"); // 동의함

				if (contents == '') {
					$('#applyCounselMemo2').focus();
					alert('문의내용을 입력해 주세요');
					return;
				}
				if (!telAgree) {
					alert('개인정보 수집 및 이용에 관한 동의를 하셔야 전화상담 예약을 하실 수 있습니다!');
					$('#telCounselAgreechk1').focus();
					return;
				}

				var d = new Date();
				var year = (d.getFullYear()).toString();
				var month = (d.getMonth()+ 1).toString();
				if (month.length == 1) {
					month = '0' + month;
				}
				var day = (d.getDate()).toString();
				if (day.length == 1) {
					day = '0' + day;
				}
				var hour = (d.getHours()).toString();
				if (hour.length == 1) {
					hour = '0' + hour;
				}

				// 현재시간보다 작거나 같을경우는 리턴
				var nowTime = year+month+day+hour;
				var reserveTime = Number(telYear1+telStartTime1); 
				var reserveTime2 = Number(telYear2+telStartTime2);

				if (reserveTime <= nowTime){
					alert("예약시간은 현재시간 이후로 선택해 주세요.");
					$('#telYear1').focus();
					return;
				}

				if (reserveTime2.toString().length == 10) {
					if ((telYear2+telStartTime2) <= (year+month+day+hour)) {
						alert("예약시간은 현재시간 이후로 선택해 주세요.");
						$('#telYear2').focus();
						return;
					}	
				}

				if (reserveTime2.toString().length == 10) {
					if (reserveTime == reserveTime2) {
						alert('첫번째 예약시간과 다르게 설정해 주세요.');
						$('#telYear2').focus();
						return false;
					}
					if (reserveTime2 <= reserveTime) {
						alert('첫번째 예약날짜보다 작게 설정할 수 없습니다.');
						$('#telYear2').focus();
						return false;
					}
				}
				if (telYear2 != '') {
					if (telYear2.toString().length < 8) {
						alert('두번째 예약날짜가 올바른지 확인해 주세요.');
						$('#telYear2').focus();
						return false;
					}
				}

				$.ajax({
					type : 'POST',
					url : '/customerCenter/counselTelJson.eds',
					data : {
						"customerName" : customerName,
						"birthDay" : '',
						"telNum1" : telNum1,
						"telNum2" : telNum2,
						"telYear1" : telYear1,
						"telStartTime1" : telStartTime1,
						"telEndTime1" : telEndTime1,
						"telYear2" : telYear2,
						"telStartTime2" : telStartTime2,
						"telEndTime2" : telEndTime2,
						"contents" : contents
					},
					dataType : 'json',
					success : function(result) {
						if (result.success) {
							alert('예약된 시간에 전문상담원이 연락드리도록 하겠습니다.\n항상 삼성생명 다이렉트를 찾아주셔서 감사합니다.');
							popCounselTel.closeOutput();
							$('#customerName').val(''); // 고객 이름
							// $('#birthDay').val(''); // 고객 생년월일
							$('#telNum2').val(''); // 휴대폰 중간 + 끝 번호 8자리
							$('#telYear1').val(''); // 첫번째 예약 날짜
							$('#telYear2').val(''); // 두번째 예약 날짜
							$('#contents').val(''); // 문의 내용
						} else {
							alert(result.message);
							return;
						}
					},
					error : function() {
						alert('서버와 통신 중 오류가 발생했습니다!');
					}
				});
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다.');
		}
	});
}

/**
 * 이메일 유효성 체크
 * @param emailAddress
 * @param id
 * @returns {Boolean}
 */
function isValidEmailAddress(emailAddress, id) {
	var emailRegEx = /^[\w_-]+(\.[\w_-]+)*@[\w_-]+(\.[\w_-]+)*\.\w{2,3}$/;

	if (!emailRegEx.test(emailAddress)) {
		alert("유효하지 않은 메일 형식입니다.");
		$('#'+id).focus();
		return false;
	}

	return true;
}

/**
 * 이메일 상담
 */
function emailCounsel() {
	var applyUserName = $.trim($("#applyUserName").val());
	var custEmail = $.trim($("#applyUserEmail1").val()) + "@" + $.trim($("#applyUserEmail2").val());
	var applyCounselMemo = $.trim($("#popEmailapplyCounselMemo").val());
	var mailAgree = $("#counselAgreechk1").is(":checked");

	// 이메일 주소 형식
	var emailAddress = $.trim($('#applyUserEmail1').val()) + '@' + $.trim($('#applyUserEmail2').val());

	//validation
	if (applyUserName == '') {
		alert("이름을 입력해 주세요.");
		$('#applyUserName').focus();
		return false;
	}
	if ($('#popEmailCombobox option:selected').text() == '직접입력') {
		if ($.trim($("#applyUserEmail1").val()) == '') {
			alert("이메일 주소를 입력해 주세요.");
			$('#applyUserEmail1').focus();
			return false;
		}
		if ($.trim($("#applyUserEmail2").val()) == '') {
			alert("이메일 주소를 입력해 주세요.");
			$('#applyUserEmail2').focus();
			return false;
		}
	}
	if (!isValidEmailAddress(emailAddress, 'applyUserEmail1')) {
		return false;
	}
	if (applyCounselMemo == '' || applyCounselMemo == undefined) {
		alert("문의 내용을 입력해 주세요.");
		$('#popEmailapplyCounselMemo').focus();
		return false;
	}
	if (!mailAgree) {
		alert("개인정보 수집 및 이용에 관한 동의를 하셔야 이메일 상담을 하실 수 있습니다!");
		$('#counselAgreechk1').focus();
		return false;
	}

	var command = "insertQnaByMobileWeb";
	var form = "qnaWeb";
	var service = "qna";

	var domainId = layerErmsDomainId;
	var localNodeId = layerErmsNodeId;
	var channelId = layerErmsChannelId;

	var customerId = "lounge_customer";
	var customerEmail = encodeURIComponent(custEmail);
	var customerName = encodeURIComponent(applyUserName);
	var customerTel = " ";

	var questionTitle = encodeURIComponent(applyCounselMemo.substring(0,20));
	var questionContents = encodeURIComponent(applyCounselMemo);

	var authType = "SELF";
	var reqSeq = "0";
	var publicFlag = "Y";
	var webviewFlag = "Y";
	var serviceType = "SVQNA";
	
	var reqData = "{\"command\":\""+command+"\",\"form\":\""+form+"\",\"service\":\""+service+"\", \"domainId\":\""+domainId+"\",\"nodeId\":\"" + localNodeId+"\"" +
					", \"customerId\":\""+customerId+"\", \"customerEmail\":\""+customerEmail+"\", \"customerName\":\""+customerName+"\", \"customerTel\":\""+customerTel+"\"" +
					", \"channelId\":\""+channelId+"\", \"questionTitle\":\""+questionTitle+"\", \"questionContents\":\""+questionContents+"\", \"authType\":\""+authType+"\"" +
					", \"reqSeq\":\""+reqSeq+"\", \"publicFlag\":\""+publicFlag+"\", \"webviewFlag\":\""+webviewFlag+"\", \"serviceType\":\""+serviceType+"\"}";
	$.ajax({
		type : "POST",
		url : "/customerCenter/getErms.eds",
		data : {
			"dataType" : "json",
			"cmd" : reqData
		},
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				if (serviceClosed == 'N') {
					alert("보내 주신 내용 확인 후 신속하게 답변 드리도록 하겠습니다.\n항상 삼성생명 다이렉트를 찾아주셔서 감사합니다.");
				} else if (serviceClosed == 'Y') {
					alert("평일 6시 이후, 주말/공휴일 접수 건은 다음 업무일부터\n접수 순서대로 답변 드립니다.\n이 점 양해 부탁드립니다.");
				}
				popCounselEmail.closeOutput();
				$('#applyUserName').val('');
				$('#applyUserEmail1').val('');
				$('#applyUserEmail2').val('');
				$('#popEmailapplyCounselMemo').val('');
			} else {
				alert(result.error_message);
				return false;
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다!');
		}
	});
}

/**
 * 예약시간 두번째 활성화
 */
function addTel() {
	$('#addTel').show();
	$('#telYear2').prop('disabled', false);
	$('#telStartTime2').prop('disabled', false);
	$('#telEndTime2').prop('disabled', false);
}

/**
 * 예약시간 두번째 비활성화
 */
function removeTel() {
	$('#addTel').hide();
	$('#telYear2').prop('disabled', true);
	$('#telStartTime2').prop('disabled', true);
	$('#telEndTime2').prop('disabled', true);
}

/**
 * 채팅상담 팝업
 */
function chattingPop(){
	$.ajax({
		type : "POST",
		url : "/customerCenter/checkServiceTime.eds",
		data : {servGbn: "C", insuType: "1"},
		dataType : 'json',
		success : function(result) {
			if (result.success) {
				// var sf = document.sendForm;
				var url = "https://erms.samsunglife.com/m_eds/talk/TalkContents.jsp";
				var nodeAlias = "SSLIFE_EDS_TALK_ROOT";
				var custName = "고객님";

				url = url + "?nodeAlias="+nodeAlias + "&cust_name="+custName + "&direct_yn=Y";	//팝업창에 출력될 페이지 URL

				var oWin = window.open(url, "talk", "width=400, height=580 toolbar=no, menubar=no, status=no, scrollbars=no");
				if (oWin && !oWin.closed) {
					oWin.location = url;
					oWin.focus();
				}

				//self.close();
				if (oWin) {
					oWin.focus();
				}
			} else {
				alert(result.message);
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다.');
		} 
	});
}
