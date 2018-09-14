<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금 보험</title>
<script type="text/javascript" src="../www.googleadservices.com/pagead/f.txt">
<link rel="stylesheet" href="<%=request.getContextPath()%>/resources/cms/pc/css/calculator.css" />
</script>

<script type="text/javascript" src="<%=request.getContextPath()%>/resources/web/js/planiAnnuity.js" charset="utf-8"></script>
<!-- 머리 -->

<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">

		
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- page : content /////////////////////////////////////////////////// -->
			<div class="section">
				<h2 class="tit-type1">
					<span id="cName">김희택</span> 고객님의 <strong class="mark">기본정보</strong>를 입력해 주세요. <em class="sub"><span class="required">(필수)</span> 표시는 필수</em>
					<!-- @2015-12-15 : 필수안내문구 추가 -->
				</h2>
				<!-- ## ISM 기존 고객인 경우 메세지 표시 ## -->

				<div class="box-mes2">
					<p class="txt-check small">
						기존에 입력하신 내용이 <strong>변경되지 않았는지</strong> 꼭! 확인하시고 다음 단계로 이동해 주세요.
					</p>
				</div>

				<input type="hidden" name="custId" id="custId" value="0960845311">
				<div class="form-content1">
					<!-- ## 휴대폰 ##-->
					<fieldset>
						<legend>휴대폰(필수)</legend>
						<div class="heading">
							<label for="cphone1">휴대폰<span class="required">(필수)</span></label>
						</div>
						<div class="wrap">
							<div class="form-telnum">
								<span class="select-box"> <select id="cphone1" title="휴대폰(앞자리)" selected="selected">
										<option value="010" selected="selected">010</option>
										<option value="011">011</option>
										<option value="016">016</option>
										<option value="017">017</option>
										<option value="018">018</option>
										<option value="019">019</option>
									</select>
								</span> <span class="unit">-</span>
								<!-- @2015-12-11 : 안내문구 placeholder형으로 변형 -->
								<span class="form-wrap1"> <label for="cphone2N3" class="label"></label> <input type="text" class="text placeholder numOnly valueon" title="휴대폰(중간자리, 끝자리) : - 없이 숫자만 입력" id="cphone2N3" maxlength="8"> <input type="hidden" id="cphone2" name="cphone2"> <input type="hidden" id="cphone3" name="cphone3">
								</span>
								<!-- //2015-12-11 -->
							</div>
						</div>
					</fieldset>
					<!-- ## 이메일 ##-->
					<fieldset>
						<legend>이메일(필수)</legend>
						<div class="heading">
							<label for="email">이메일<span class="required">(필수)</span></label>
							<div class="tooltip-area">
								<a href="#none" class="icon-tip">안내문구보기</a>
								<div class="tooltip">
									<p>입력하신 이메일로 보험증권 및 계약관리를 위한 내용이 발송되오니 정확하게 입력해 주세요.</p>
								</div>
							</div>
						</div>
						<div class="wrap">
							<div class="form-email">
								<input type="text" class="text" id="email" title="이메일아이디" style="ime-mode: disabled;"> <span class="unit">@</span> <input type="text" class="text" id="emailProvider" name="emailProvider" title="이메일도메인" style="ime-mode: disabled;"> <span class="select-box"> <select title="이메일도메인 선택" id="emailSuffix" name="emailSuffix">
										<option value="">직접입력</option>
										<option value="naver.com">naver.com</option>
										<option value="daum.net">daum.net</option>
										<option value="nate.com">nate.com</option>
										<option value="gmail.com">gmail.com</option>
										<option value="hotmail.com">hotmail.com</option>
										<option value="hanmail.net">hanmail.net</option>
										<option value="chol.com">chol.com</option>
										<option value="dreamwiz.com">dreamwiz.com</option>
									</select>
								</span>
							</div>
						</div>
					</fieldset>

					<!-- ## 우편물수령지 ##-->
					<!-- fieldset style="display:none;">
						<legend>우편물수령지</legend>
						<div class="heading">
							<span class="label">우편물수령지<span class="required">(필수)</span></span><!-- @2015-12-28 : 필수항목표시 추가
						</div>
						<div class="wrap">
							<div class="label-radiobtn">
								<span>
									<label for="postHome" id="postHomeLabel"><span class="hd">(우편물수령지)</span>자택</label>
									<input type="radio" class="radio" name="postLocation" id="postHome" value="home" checked="checked" title="우편물수령지 자택"/>
								</span>
								
								<span>
									<label for="postCompany" id="postCompanyLabel"><span class="hd">(우편물수령지)</span>직장</label>
									<input type="radio" class="radio" name="postLocation" id="postCompany" value="company" title="우편물수령지 직장"/>
								</span>
							</div>
						</div>
					</fieldset -->

					<!-- ## 주소 ##-->
					<fieldset>
						<legend>주소(필수)</legend>
						<div class="heading">
							<label for="totalHomeAddr">주소<span class="required">(필수)</span></label>
							<!-- @2015-12-30 : label형태로 수정 -->
							<div class="tooltip-area">
								<a href="#none" class="icon-tip">안내문구보기</a>
								<div class="tooltip">
									<p>보험증권은 우편으로 별도 발송되지 않습니다.</p>
								</div>
							</div>
						</div>
						<div class="wrap">
							<div class="form-sub form-zipcode">
								<a href="#popFindZip2" class="btn-type2 c1" onclick="resetEffectValue2(setHomeAddress);"><span>우편번호 찾기</span></a>
								<!-- @2015-12-15 : 버튼클래스 변경 c2에서 c1으로 -->
								<input type="text" class="text" title="자택주소(필수)" id="totalHomeAddr" readonly="readonly"> <input type="hidden" id="hpostSeq" name="hpostSeq" value=""> <input type="hidden" class="text" title="우편번호" id="hpost" name="hpost" value="08586"> <input type="hidden" title="우편번호 앞자리 입력" id="hpost1" name="hpost1" value="085"> <input type="hidden" title="우편번호 뒷자리 입력" id="hpost2" name="hpost2" value="86"> <input type="hidden" title="기본주소" id="city" name="city" value="서울 금천구 범안로13길"> <input type="hidden" title="상세주소" id="street" name="street" value=" "> <input type="hidden" title="건물번호" id="building" name="building" value="5"> <input type="hidden" title="부가주소" id="strSuppl" name="strSuppl" value="(독산동)"> <input type="hidden" title="전체상세주소" id="haddr2" name="haddr2" value="5  "> <input type="hidden" name="haddrScCd" id="haddrScCd" value="2"> <input type="hidden" name="haddrStCd" id="haddrStCd" value="11">
								<input type="hidden" name="haddrRernCd" id="haddrRernCd" value="01"> <input type="hidden" name="haddrChange" id="haddrChange" value="N">
							</div>
						</div>
					</fieldset>

					<!-- ## 직장주소 ##-->
					<!-- @2015-12-29 : fieldset 클래스 삭제 -->
					<fieldset id="companyArea1" style="display: none;">
						<legend>직장주소</legend>
						<div class="heading">
							<label for="totalCompanyAddr">직장주소<span class="required">(필수)</span></label>
							<!-- @2015-12-10 : (접근성) 직장주소 타이틀 span.label에서 label로 수정 -->
						</div>
						<div class="wrap">
							<div class="form-sub form-zipcode">
								<a href="#popFindZip" class="btn-type2 c1" onclick="resetEffectValue(setCompanyAddress);"><span>우편번호 찾기</span></a>
								<!-- @2015-12-15 : 버튼클래스 변경 c2에서 c1으로 -->
								<input type="text" class="text" id="totalCompanyAddr" title="직장주소(선택)" readonly="readonly">
								<!-- @2015-12-10 : (접근성)  id / title 추가 -->
								<input type="hidden" id="cpostSeq" name="cpostSeq"> <input type="hidden" class="text" title="우편번호" id="cpost" name="cpost"> <input type="hidden" title="우편번호 앞자리 입력" id="cpost1" name="cpost1"> <input type="hidden" title="우편번호 뒷자리 입력" id="cpost2" name="cpost2"> <input type="hidden" class="text" title="주소 입력" id="caddr1" name="caddr1"> <input type="hidden" class="text" title="상세주소 입력" id="caddr2" name="caddr2"> <input type="hidden" name="oldNew" id="companyOldNew" value="">
							</div>
						</div>
					</fieldset>
					<!-- ## 직업 ##-->
					<fieldset>
						<legend>직업(필수)</legend>
						<div class="heading">
							<label for="jobName">직업<span class="required">(필수)</span></label>
						</div>
						<div class="wrap">
							<span class="form-wrap4"> <a href="#none" class="btn-type2 c1" style="margin-right: 5px;" id="jobSerch" onclick="effectJobCodePopup(setJobCode);"><span>직업선택</span></a> <input type="text" class="text" style="width: 240px; border-color: #fd806e;" id="jobName" value="직업을 선택해주세요." onclick="effectJobCodePopup(setJobCode);" readonly="readonly"> <input type="hidden" name="amlJobScCd" id="amlJobScCd" value="3"> <input type="hidden" name="jobCode" id="jobCode" value="113301"> <input type="hidden" name="jobRskGrdCd" id="jobRskGrdCd" value="1"> <input type="hidden" name="jobHspzRskGrdCd" id="jobHspzRskGrdCd" value="1"> <input type="hidden" name="jobInjryRskGrdCd" id="jobInjryRskGrdCd" value="1"> <input type="hidden" name="jobNameValidation" id="jobNameValidation" value="남자 무직(16~60세)">
							</span> <input type="text" class="text placeholder" name="companyNm" id="companyNm" title="직장명" disabled="disabled" style="display: none;">
						</div>
					</fieldset>
					<!-- ## 운전여부 ##-->
					<fieldset>
						<legend>운전여부(필수)</legend>
						<div class="heading">
							<span class="label">운전여부<span class="required">(필수)</span></span>
						</div>
						<div class="wrap">
							<div class="label-radiobtn">
								<span> <label for="driCheck1" class="on">운전</label> <input type="radio" class="radio" id="driCheck1" name="drive" value="Y" title="운전" checked="checked">
								</span> <span> <label for="driCheck2">비운전</label> <input type="radio" class="radio" id="driCheck2" name="drive" value="N" title="비운전">
								</span>
							</div>
						</div>
						<!--  운전여부 : 운전일때 추가노출 -->
						<div class="wrap-sub" id="driArea">
							<ul class="label-check">
								<li><label for="dri01" class="on">승용차(자가용)</label> <input type="checkbox" class="check" id="dri01" name="dri" value="01" title="승용차(자가용)" checked="checked"></li>
								<li><label for="dri02">승용차(영업용)</label> <input type="checkbox" class="check" id="dri02" name="dri" value="01" title="승용차(영업용)"></li>
								<li><label for="dri03">소형화물차(자가용)</label> <input type="checkbox" class="check" id="dri03" name="dri" value="05" title="소형화물차(자가용)"></li>
								<li><label for="dri04">중/대형화물차(자가용)</label> <input type="checkbox" class="check" id="dri04" name="dri" value="05" title="중/대형화물차(자가용)"></li>
								<li><label for="dri05">중형승합차(자가용)</label> <input type="checkbox" class="check" id="dri05" name="dri" value="02" title="중형승합차(자가용)"></li>
								<li><label for="dri06">대형승합차(자가용)</label> <input type="checkbox" class="check" id="dri06" name="dri" value="02" title="대형승합차(자가용)"></li>
								<li><label for="dri07">소형화물차(영업용)</label> <input type="checkbox" class="check" id="dri07" name="dri" value="04" title="소형화물차(영업용)"></li>
								<li><label for="dri08">중/대형화물차(영업용)</label> <input type="checkbox" class="check" id="dri08" name="dri" value="04" title="중/대형화물차(영업용)"></li>
								<li><label for="dri09">중형승합차(영업용)</label> <input type="checkbox" class="check" id="dri09" name="dri" value="03" title="중형승합차(영업용)"></li>
								<li><label for="dri10">대형승합차(영업용)</label> <input type="checkbox" class="check" id="dri10" name="dri" value="03" title="대형승합차(영업용)"></li>
								<li><label for="dri11">건설기계/중장비</label> <input type="checkbox" class="check" id="dri11" name="dri" value="09" title="건설기계/중장비"></li>
								<li><label for="dri12">농기구</label> <input type="checkbox" class="check" id="dri12" name="dri" value="07" title="농기구"></li>
								<li><label for="dri13">오토바이</label> <input type="checkbox" class="check" id="dri13" name="dri" value="06" title="오토바이"></li>
								<li><label for="driEtc">기타</label> <input type="checkbox" class="check" id="driEtc" name="driEtc" value="" title="기타"></li>
								<!--
								<li>
									<label for="dri10">폭발물차</label>
									<input type="checkbox" class="check" id="dri10" name="dri" value="10" />
								</li>
								<li>
									<label for="dri11">헬기/경비행기조정</label>
									<input type="checkbox" class="check" id="dri11" name="dri" value="11" />
								</li>
								<li>
									<label for="dri8">특장차량</label>
									<input type="checkbox" class="check" id="dri8" name="dri" value="08" />
								</li>
								-->
							</ul>
						</div>
						<!-- @2015-12-29 : div구조 별도분리 -->
						<!-- @2015-12-15 : 기타 선택항목 구조변경(ul > div) 및 기타입력필드 추가  -->
						<div class="wrap-sub box" id="divDriEtc" style="display: none;">
							<span class="label-check"> <label for="dri14"><span class="hd">기타추가선택:</span>특장차량</label> <input type="checkbox" class="check" id="dri14" name="dri" value="08" title="기타(특장차량)">
							</span> <span class="label-check"> <label for="dri15"><span class="hd">기타추가선택:</span>폭발물차</label> <input type="checkbox" class="check" id="dri15" name="dri" value="10" title="기타(폭발물차)">
							</span> <span class="label-check"> <label for="dri16"><span class="hd">기타추가선택:</span>헬기/경비행기</label> <input type="checkbox" class="check" id="dri16" name="dri" value="11" title="기타(헬기/경비행기)">
							</span> <span class="label-check"> <label for="driSelfInp"><span class="hd">기타추가선택:</span>직접입력</label> <input type="checkbox" class="check" id="driSelfInp" name="driSelfInp" value=""> <input type="text" class="text" id="carKndNmVal" readonly="readonly" title="기타추가선택 직접입력">
							</span>
						</div>
						<!-- //2015-12-29 -->
					</fieldset>
					<!-- ## 미국 납세여부 : @2015-12-07 : step2로 이동 ##-->
					<!-- ## 실제소유자 정보 ##-->
					<!-- @2015-12-29 : 신규추가 -->
					<fieldset>
						<legend>실제소유자 정보(필수)</legend>
						<div class="heading">
							<span class="label">실제소유자 정보<span class="required">(필수)</span></span>
						</div>
						<div class="wrap ui-tip-wrapper">
							<p class="txt-check small">
								귀하는 해당 금융거래에 대해 <a href="#uiTipOwner" class="link-icon tip2 ui-tip-position" title="용어설명">실제 소유자</a>가 맞습니까?
							</p>
							<div class="tooltip ui-tip-con" id="uiTipOwner">
								<dl>
									<dt class="hd">실제 소유자</dt>
									<dd>고객을 최종적으로 지배하거나 통제하는 자연인으로서 해당 금융거래를 통하여 궁극적으로 혜택을 보는 개인</dd>
								</dl>
							</div>
							<div class="label-radiobtn">
								<span> <label for="realOwnerY" class="on">예</label> <input type="radio" id="realOwnerY" name="realOwnerYn" value="Y" checked="checked" title="실제 소유자(예)" class="radio">
								</span> <span> <label for="realOwnerN">아니요</label> <input type="radio" id="realOwnerN" name="realOwnerYn" value="N" class="radio" title="실제 소유자(아니요)">
								</span>
							</div>
						</div>
						<div class="wrap-sub box" id="realOwnerDiv" style="display: none;">
							<dl>
								<dt>
									<label for="ownerName">성명</label>
								</dt>
								<dd>
									<input type="text" class="text" style="ime-mode: active;" id="ownerName" name="ownerName" maxlength="30" title="소유자성명">
								</dd>
								<dt>
									<label for="ownerFirstIdn1">주민번호</label>
								</dt>
								<dd>
									<div class="form-wrap2">
										<input type="text" class="text numOnly" title="실명번호1(주민등록번호앞자리)" id="ownerFirstIdn1" name="ownerFirstIdn1" maxlength="6"> <span class="unit">-</span> <input type="password" class="text numOnly" title="실명번호2(주민등록번호뒷자리)" id="ownerFirstIdn2" name="ownerFrstIdn2" maxlength="7"> <input type="hidden" id="idn" name="idn" value="">
									</div>
								</dd>
								<dt>
									<label for="nationality">국적</label>
								</dt>
								<dd>
									<input type="text" class="text" title="국적 입력" style="width: 110px; ime-mode: active;" id="nationality" name="nationality" maxlength="30">
								</dd>
							</dl>
						</div>
					</fieldset>
					<!-- //2015-12-29 -->
				</div>
			</div>

			<!-- ## 정보제공동의 //////////////////////////////////////////////////////// -->
			<div class="section">
				<!-- <h2 class="tit-type1"><span name="cName"></span>  고객님의 <strong class="mark">정보 제공</strong>에 동의해 주세요.</h2> -->
				<div class="form-content1">
					<!-- ## 계약 체결 및 이행 등을 위한 동의 ##-->
					<fieldset>
						<legend>계약 체결 및 이행 등을 위한 동의 (필수)</legend>
						<div class="heading agree-form">
							<p class="label">
								계약 체결 및 이행 등을 위한 동의를 선택하세요 (필수)<span class="required"> (필수)</span>
							</p>
							<p class="small">
								<span class="txt-type4">동의를 하셔야 보험 가입이 가능합니다.</span>
							</p>
						</div>
						<div class="wrap2 ui-tip-wrapper">
							<div class="label-radiobtn">
								<span> <label for="personalAgree" id="personalAgreeLabel">동의</label> <input type="radio" class="radio" id="personalAgree" name="personalAgree" value="Y" onclick="popAgree1.openOutput(); $('#popAgree1').focus();ga('send','event','Direct','Step1','consent_1',1);" title="계약 체결 및 이행 등을 위한 동의(동의)">
								</span> <span> <label for="personalAgreeN" id="personalAgreeNLabel">미동의</label> <!-- <input type="radio" class="radio" id="personalAgreeN" name="personalAgree" value="N" onclick="popAgree1.openOutput(); $('#popAgree1').focus();" title="계약 체결 및 이행 등을 위한 동의(미동의) : 동의하셔야 상품가입가능"/> --> <input type="radio" class="radio" id="personalAgreeN" name="personalAgree" value="N" onclick="alert('보험가입을 위해서는 계약 체결 및 이행 등을 위한 개인(신용)정보 처리에 모두 동의해 주셔야 합니다.');" title="계약 체결 및 이행 등을 위한 동의(미동의) : 동의하셔야 상품가입가능">
								</span>
							</div>
						</div>
					</fieldset>
					<!-- ## 상품 소개 등을 위한 동의 ##-->
					<fieldset>
						<legend>보험계약상담, 이벤트, 세미나 정보제공 등을 위한 동의 (선택)</legend>
						<div class="heading agree-form">
							<p class="label">
								보험계약상담, 이벤트, 세미나 정보제공 등을 위한 동의를 선택하세요 (선택)<span class="required">(선택)</span>
							</p>
							<p class="small">
								<span class="txt-type4">동의하지 않으시면, 보험계약상담 및 이벤트 혜택 안내 등이 제한될 수 있습니다.</span>
							</p>
						</div>
						<div class="wrap2 ui-tip-wrapper">
							<div class="label-radiobtn">
								<span> <label for="markettingAgreeY" id="markettingAgreeYLabel"><span class="mark">동의</span></label> <input type="radio" class="radio" id="markettingAgreeY" name="markettingAgreeYN" value="Y" onclick="popAgree2.openOutput(); $('#popAgree2').focus();ga('send','event','Direct','Step1','consent_2',1);" title="상품 소개 등을 위한 동의(동의함)"> <input type="hidden" id="markettingAgree" name="markettingAgree" value="N">
								</span> <span> <label for="markettingAgreeN" id="markettingAgreeNLabel">미동의</label> <input type="radio" class="radio" id="markettingAgreeN" name="markettingAgreeYN" value="N" onclick="" title="상품 소개 등을 위한 동의(미동의)">
								</span>
							</div>
							<!-- ## 상품동의 이벤트 문구 ## -->






							<img src="https://direct.samsunglife.com/upload/201804/4671.jpg" alt="문자, 이메일에 동의하시면 스타벅스 아메리카노를 드립니다(100명추첨)">






						</div>
					</fieldset>
				</div>
			</div>
			<!-- ## 하단 버튼 //////////////////////////////////////////////////////// -->
			<div class="btn-area s8">
				<a href="#none" class="btn-com next" onclick="nextStep(); return false;"><span id="btnNextText">1단계 저장 후 알릴 의무 작성하기</span></a>
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