<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/dojo/1.13.0/dojo/dojo.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>약관동의</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<script type="text/javascript">
	//전체선택
	function selectAll(obj) {
		var chkObj = document.getElementsByName("select_chkbox");
		var rowCnt = chkObj.length - 1;
		// 대가리에 노드를 체크로 전환시
		if (obj.checked == true) {
			// 전부 선택으로 바꿔줌
			for (var i = 0; i <= rowCnt; i++) {
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

	function selectOne() {
		var chkObj = document.getElementById("select_all");
		var selObj = document.getElementById("select_one");
		var selObj2 = document.getElementById("select_one1");

		if (selObj.checked == true && selObj2.checked == true) {
			chkObj.checked = true;
		} else {
			chkObj.checked = false;
		}
	}

	function agreeCheck() {
		var chkObj = document.getElementById("select_all");
		if (chkObj.checked != true) {
			alert("약관에 동의하셔야 가입할 수 있습니다.");
			$('#select_one').focus();
		} else {
			location.href = "../member/join"
		}

	}
</script>

<style type="text/css">
.provision_wrap {
	margin: 0 auto;
	width: 800px;
	height: 740px;
	border: 1px solid #eee;
	background: #f7f7f7;
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
	overflow: auto;
	padding: 5px;
	background: #f7f7f7;
	font-family: 돋움;
	font-size: 9pt;
	color: #666;
	line-height: 170%;
	border: 1px solid #f2f2f2;
	resize: none;
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

.checkbox-wrap {
	cursor: pointer;
}

.checkbox-wrap .check-icon {
	display: inline-block;
	width: 24px;
	height: 24px;
	background: url(../resources/images/radio_btn1.PNG) left center
		no-repeat;
	vertical-align: middle;
	transition-duration: .3s;
}

.checkbox-wrap input[type=checkbox] {
	display: none;
}

.checkbox-wrap input[type=checkbox]:checked+.check-icon {
	background-image: url(../resources/images/radio_btn2.PNG);
}
</style>
<body>
	<div id="wrapper">


		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content">
				<div class="join_wrap">
					<div class="provision_wrap">
						<form name="agreeForm" method="post" action="join.jsp">
							<div class="agree">이용약관, 개인정보 수집 및 이용, 프로모션 안내 메일 수신(선택)에 모두 동의합니다.</div>
							<div class="button">
								<label class="checkbox-wrap"><input type="checkbox" name="select_all" id="select_all" value="" onclick="selectAll(this)"><i class="check-icon"></i></label>
							</div>
							<br />
							<br />
							<div class="agree">ISM 이용약관 동의(필수)</div>
							<div class="button">
								<label class="checkbox-wrap"><input type="checkbox" name="select_chkbox" value="" id="select_one" onclick="selectOne();"><i class="check-icon"></i></label>
							</div>
							<div>
								<textarea rows="50" cols="100" class="provision">
   		제 1조 (목적)
이 약관은 ISM보험주식회사가 운영하는 ISM홈페이지(이하 "홈페이지"이라 한다)에서 제공하는 인터넷 관련 서비스 (이하 "서비스"라 한다)의 이용과 관련한 제반 사항을 규정함을 목적으로 합니다.

제 2조 (정의)
홈페이지란 ISM주식회사가 컴퓨터 등 정보통신설비를 이용하여 재화 또는 용역을 이용자에게 제공하고 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 홈페이지를 운영하는 사업자의 의미로도 사용합니다.
"이용자"란 "홈페이지"에 접속하여 이 약관에 따라 "홈페이지"에서 제공하는 서비스를 받는 회원 또는 비회원을 말합니다.
'회원'이라 함은 "홈페이지"에 개인정보를 제공하여 회원등록을 한 자로서, "홈페이지"의 정보를 지속적으로 제공받으며, "홈페이지"에서 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
'비회원'이라 함은 회원에 가입하지 않고 "홈페이지"가 제공하는 서비스를 이용하는 자를 말합니다.
제 3조 (약관의 명시와 개정)
"홈페이지"는 이 약관의 내용과 상호, 영업소 소재지, 대표자의 이름, 사업자등록번호, 연락처(전화, 팩스, 전자우편 주소 등) 등을 이용자가 알 수 있도록 "홈페이지"의 초기 서비스화면(전면)에 게시합니다.
"홈페이지"는 약관의 규제 등에 관한 법률, 정보통신망 이용촉진 등에 관한 법률, 방문판매 등에 관한 법률, 소비자보호법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
"홈페이지"가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행약관과 함께 홈페이지의 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지(약관 변경이 소비자에게 불리한 경우 변경 30일 이상) 공지합니다.
"홈페이지"가 약관을 개정할 경우에는 그 개정약관은 그 적용일자 이후에 가입한 회원에만 적용되고 그 이전에 이미 가입한 회원에 대해서는 개정전의 약관조항이 그대로 적용됩니다. 다만 홈페이지가 "이용자가 개정약관 공지 기간 내에 변경 약관에 대한 적용거절 여부를 표명하지 아니하는 때에는 변경약관의 적용을 받는 것으로 본다"는 취지의 통지를 하였음에도 이용고객이 거절 여부를 표명하지 아니한 경우 또는 부득이한 사유로 그러한 통지를 할 수 없는 경우에는 개정 전에 가입한 회원에도 개정약관이 적용됩니다.
이 약관에서 정하지 아니한 사항과 이 약관의 해석에 관하여는 정부가 제정한 전자거래소비자보호지침 및 관계법령 또는 상관례에 따릅니다.
제 4조 (서비스의 제공 및 변경)
"홈페이지"는 이용자에게 다음과 같은 서비스를 제공합니다. 다만, 비회원에게는 서비스 중 일부만을 제공할 수 있습니다.
보험·대출 등 ISM이 취급하는 금융상품의 설명, 안내(e-mail 발송 등), 가상설계, 가입·환매신청
ISM과 보험계약, 대출 및 펀드 등의 거래가 있는 이용자를 위한 금융거래내역의 조회 및 입출금 서비스 등 홈페이지 금융거래 서비스의 운영 (다만, 홈페이지 금융거래 서비스를 이용하기 위해서는 별도의 이용신청을 하여야 합니다)
금융상품을 거래할 수 있는 사이버몰 운영
기타 "홈페이지"가 정하는 서비스
제 5조 (서비스의 중단)
"홈페이지"는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.
제1항에 의한 서비스 중단의 경우에는 "홈페이지"는 제8조에 정한 방법으로 이용자에게 통지합니다.
"홈페이지"는 제1항의 사유로 서비스의 제공 중단으로 인하여 이용자에게 발생하는 문제에 대해서는 어떠한 책임도 부담하지 않습니다.
제 6조 (회원가입)
이용자는 "홈페이지"가 정한 가입 양식에 따라 회원정보를 기입한 후 이 약관에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다.
"홈페이지"는 제1항과 같이 회원으로 가입할 것을 신청한 이용자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다.
가입신청자가 이 약관 제7조 제3항에 의하여 이전에 회원자격을 상실한 적이 있는 경우, 다만 제7조 제3항에 의한 회원자격 상실 후 3년이 경과한 자로서 "홈페이지"의 회원 재가입 승낙을 얻은 경우에는 예외로 한다.
등록 내용에 허위, 기재누락, 오기가 있는 경우
기타 회원으로 등록하는 것이 "홈페이지"의 업무수행상 현저히 지장이 있다고 판단되는 경우
회원은 등록사항에 변경이 있는 경우, 원활한 서비스 제공을 위해 "홈페이지"의 회원정보 수정을 통해 그 변경사항을 알려야 합니다.
이용자가 회원가입을 한 때는 "홈페이지"가 회원에 대하여 전송하는 정보의 수신에 동의한 것으로 간주합니다. 다만, 회원은 언제든지 정보 전송의 수신을 거부할 수 있습니다.
제 7조 (회원 탈퇴 및 자격 상실 등)
회원은 "홈페이지"에 언제든지 탈퇴를 요청할 수 있으며 "홈페이지"는 즉시 회원탈퇴를 처리합니다. 단, 회사가 운영하는 하나의 "홈페이지"(또는 일부의 "홈페이지") 에서 탈퇴하게 되면 나머지 모든 "홈페이지"에서 탈퇴하게 됩니다.
회원이 다음 각호의 사유에 해당하는 경우, "홈페이지"는 회원자격을 제한 및 정지시킬 수 있습니다.
가입 신청 시에 허위 내용을 등록한 경우
다른 사람의 "홈페이지" 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우
"홈페이지"를 이용하여 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하는 경우
"홈페이지"가 회원 자격을 제한·정지 시킨 후, 동일한 행위가 2회 이상 반복되거나 30일 이내에 그 사유가 시정되지 아니하는 경우 "홈페이지"는 회원자격을 상실시킬 수 있습니다.
"홈페이지"가 회원자격을 상실시키는 경우에는 회원등록을 말소합니다. 이 경우 회원에게 이를 통지하고, 회원등록 말소 전에 소명할 기회를 부여합니다.
회원탈퇴는 시스템 반영시점으로 하며, 내부 업무프로세스 상의 이유로 탈퇴이전에 발생한 업무행위에 대해서는 회원자격을 인정합니다.
회원탈퇴는 사이트의 회원탈퇴란을 통하여 하는 것을 원칙으로 합니다.
정보통신망법에 따른 회원정보 보호를 위해 "홈페이지" 웹회원이 1년간 로그인을 하지 않은 경우 이를 통지하고, 회원정보를 삭제 합니다. 단, 금융거래가 있는 회원의 경우 전자금융거래법 적용으로 5년간 로그인을 하지 않은 경우 이를 통지하고, 회원정보를 삭제 합니다. 이용자의 요청에 따라 달리 정한 경우가 있을 경우, 달리 정한 기간을 적용할 수 있습니다.
제 8조 (회원에 대한 통지)
"홈페이지"가 회원에 대한 통지를 하는 경우, 회원이 "홈페이지"에 제출한 전자우편 주소로 할 수 있습니다.
"홈페이지"는 불특정다수 회원에 대한 통지의 경우 1주일이상 "홈페이지" 게시판에 게시함으로써 개별 통지에 갈음할 수 있습니다.
제 9조 (개인정보보호)
"홈페이지"는 이용자의 정보수집 시 원활한 서비스제공을 위해 필요한 최소한의 정보를 수집합니다.
"홈페이지"는 이용자의 개인식별이 가능한 개인정보를 수집하는 때에는 반드시 당해 이용자의 동의를 받습니다.
이용자는 언제든지 본인의 개인정보 열람 및 수정/삭제를 요청할 수 있으며, 홈페이지는 이에 대해 지체 없이 필요한 조치를 취할 의무를 가집니다.
기타 개인정보관련 사항은 "ISM 홈페이지 이용자에 대한 개인정보처리방침"에 의거합니다.
"홈페이지"는 이용자의 개인정보 분실·도난·누출 사실을 알았을 시, 이를 지체 없이 이용자에게 알리고 방송통신위원회에 신고할 의무를 가집니다.
제 10조 ("홈페이지"의 의무)
"홈페이지"는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관에서 정하는 서비스를 안정적으로 제공하기 위해 최선을 다합니다.
"홈페이지"는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 이용자의 개인정보(신용정보 포함)보호를 위한 보안 시스템을 갖추어야 합니다.
"홈페이지"가 상품이나 용역에 대하여 「표시·광고의 공정화에 관한 법률」 제3조 소정의 부당한 표시·광고행위를 함으로써 이용자가 손해를 입은 때에는 이를 배상할 책임을 집니다.
"홈페이지"는 이용자가 원하지 않는 영리목적의 광고성 전자우편을 발송하지 않습니다.
제 11조 (회원의 ID 및 비밀번호, e-mail 주소에 대한 의무)
ID와 비밀번호에 관한 관리책임은 회원에게 있으며, ID와 비밀번호의 분실로 인해 발생하는 모든 문제에 대해서는 회원이 책임을 부담합니다.
회원은 자신의 ID 및 비밀번호를 제3자에게 이용하게 해서는 안됩니다.
회원이 자신의 ID 및 비밀번호, e-mail주소를 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 "홈페이지"에 통보하고 "홈페이지"의 안내가 있는 경우에는 그에 따라야 합니다.
비밀번호 분실 시 통보는 e-mail 또는 단문 메세지 서비스(SMS)로 안내하며 전 항의 규정에 불구하고 회원의 e-mail주소 또는 휴대전화번호 기입 잘못 등 본인 과실 및 본인 정보 관리 소홀로 발생하는 문제의 책임은 회원에게 있습니다.
제 12조 (이용자의 의무)
이용자는 다음 행위를 하여서는 안됩니다.
신청 또는 변경 시 허위내용의 등록
"홈페이지"에 게시된 정보의 변경
"홈페이지"가 정한 정보 이외의 정보(컴퓨터프로그램 등)의 송신 또는 게시
"홈페이지" 기타 제3자의 저작권 등 지적재산권에 대한 침해
"홈페이지" 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
외설 또는 폭력적인 메시지·화상·음성 기타 공서양속에 반하는 정보를 홈페이지에 공개 또는 게시하는 행위
다른 이용자의 개인정보를 수집 또는 저장하는 행위
제 13조 (저작권의 귀속 및 이용제한)
"홈페이지"가 작성한 저작물에 대한 저작권 기타 지적재산권은 "홈페이지"에 귀속합니다.
이용자는 "홈페이지"를 이용함으로써 얻은 정보를 "홈페이지"의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는 안됩니다.
제 14조 (분쟁조정)
이용자가 회사의 전자거래의 처리에 관하여 이의가 있을 때에는 회사의 분쟁처리기구에 그 해결을 요구하거나 금융감독원의 금융분쟁조정위원회, 한국소비자보호원의 소비자분쟁조정위원회 등을 통하여 분쟁조정을 신청할 수 있습니다.

제 15조 (준거법)
이 약관에서 정하지 아니한 사항은 대한민국법령을 적용합니다.
   		</textarea>
							</div>
							<br />
							<div class="agree">개인정보 수집 및 이용에 대한 안내(필수)</div>
							<div class="button">
								<label class="checkbox-wrap"><input type="checkbox" name="select_chkbox" id="select_one1" value="" onclick="selectOne();"><i class="check-icon"></i></label>
							</div>
							<div>
								<textarea class="provision" id="" cols="100" rows="50">
		정기적인 메일발송, 회원만을 위한 컨텐츠 제공, 상담실 등 게시판 글 작성 등을 위해 필요한 최소한의 개인정보를 수집하고 있습니다. 이에 개인정보의 수집 및 이용에 관하여 아래와 같이 고지하오니 충분히 읽어보신 후 동의하여 주시기 바랍니다.

1. 수집 및 이용목적
웹 회원가입, 서비스 이용시 본인의 확인
회원 관심분야에 따른 각종 개인 맞춤 서비스의 제공
2. 수집 및 이용하는 개인정보 항목
- 웹 회원가입
이름, 생년월일, 성별, 회원ID, 비밀번호, e-mail 주소, 자택주소, 연락처, 휴대폰번호, 직장명/학교명, 부서, 직장주소, 직장전화번호
※ 직장명/학교명, 부서, 직장주소, 직장전화번호는 우편물수령지를 직장으로 선택한 경우에만 수집 및 이용

- 본인의 확인
이름, 생년월일, 성별, 암호화된 동일인 식별정보(CI), 휴대폰번호(휴대폰 인증 선택시), 본인 명의로 가입된 휴대전화의 이동통신사(휴대폰 인증 선택시), 아이핀번호(아이핀 인증 선택시), 내/외국인 정보
- 홈페이지 이용 정보
홈페이지 접속 정보 및 서비스 이용정보
3. 수집방법
실명확인을 위하여 마련된 대체수단(핸드폰, 공인인증서, i-pin)에 직접 입력하는 방식
홈페이지 회원가입란에 마련된 개인정보 입력란에 회원 본인이 직접 입력하는 방식
생성정보 수집 툴을 통한 수집
4. 보유 및 이용기간
이용자가 회원 탈회를 요청하거나 개인정보의 수집·이용 등에 대한 동의를 철회할 때까지 보유·이용하며, 수집·이용목적을 달성한 경우 또는 탈회 ·동의 철회의 요청이 있는 경우 해당 개인정보를 즉시 파기합니다.
다만, 다음의 정보에 대해서는 아래의 이유로 예외로 합니다.

고객님이 ISM보험주식회사에 대하여 '별도의 개인(신용)정보에 관한 동의'를 한 경우(금융거래 등 상거래의 체결 유지 관리 목적 등)로서 해당 동의 목적으로 위 개인정보가 수집 및 이용되는 경우에는 해당 동의에 따른 보유 및 이용기간이 적용됩니다.
기타 법률에 의해 이용자의 개인정보를 보존해야 할 필요가 있는 경우에는 해당 법률의 규정에 따릅니다.
정보통신망 이용촉진 및 정보보호 등에 관한 법률에 따라 홈페이지를 대통령령으로 정하는 기간 동안 로그인하지 아니하는 이용자의 개인정보를 보호하기 위하여 개인정보 파기 등 필요한 조치를 취합니다. 홈페이지 웹회원은 1년간 미로그인시 회원정보 삭제 및 탈퇴처리가 되며, 금융거래가 있는 회원의 경우 전자금융거래법 적용으로 5년간 미로그인시 회원정보 삭제 및 탈퇴처리가 됩니다. 이용자의 요청에 따라 달리 정한 경우가 있을 경우, 달리 정한 기간을 적용할 수 있습니다.
		</textarea>
							</div>
					</div>
				</div>
				<div class="yesno_wrap">
					<a href="../"><div class="pro_no">비동의</div></a> <a href="javascript:agreeCheck()"><div class="pro_yes">동의</div></a>
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