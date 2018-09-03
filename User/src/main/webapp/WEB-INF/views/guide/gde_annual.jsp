<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>연금가입가이드</title>
</head>
<body>
	<div id="wrapper">
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"  %>
		<div id="container">
			<%@ include file="../include/Head.jsp" %>

			<!-- 내용시작 -->
			<div id="content">
		<div id="wrapper">

<script type="text/javascript" src="../resources/web/js/planDirect.js"></script>
<script language="javascript" type="text/javascript">
	var currentStepIndex = 0; // 현재 상품표시할 인덱스번호 0:연금저축 1:연금 2:저축
	
	jQuery(function() {
		// 계산버튼클릭 이벤트
		jQuery("#planApply").on("click",function() {
			var prdtIdx = 0; // 계산버튼으로 얻을 상품번호변수 1: 연금저축 2: 연금 3: 저축
//			switch($(".select option:selected").val()){
			var selBoxObj = $("#prodSelBox");
			var selectedBoxVal = selBoxObj.val();
			switch(selectedBoxVal){
				case "1":
					prdtIdx = 1;
					break;
				case "2":
					prdtIdx = 2;
					break;
				case "3":
					prdtIdx = 3;
					break;
			}
			currentStepIndex = prdtIdx - 1;
			var contBirth = $("#inputBirthday").val();
			var contGender = ($("input[name=radioGender]:checked").val()=="남자")?"1":"2";
			$("#contBirth").val(contBirth);
			$("#contGender").val(contGender);

			var product = $("#product"+prdtIdx).val();
			var proInfo = product.split("_");
			var proType = proInfo[0];

			$("#proType").val(proType);
			$("#staAge").val(proInfo[1]);
			$("#endAge").val(proInfo[2]);

			if (!validation(contBirth, contGender, prdtIdx)) return;

			var age = checkAge(prdtIdx);

			if(age!=0){
				setFormDefValue(proType, age);

				// 보험료계산
				ga('send','event','Direct','Calculation','annuity-guide',1);

				//	계산기 wiselog
				calc_logging("before_" + getProductName(proType));
				
				setCalculatorEvent();

				var jsonData = JSON.stringify($("#mainFrm").serializeObject());
				$.cookie("mainPlanData",jsonData ,{path:'/'});
				var tempPrdtNm = "";
				if(proType == "4"){
					tempPrdtNm = "esaving";		
				}else if(proType == "5"){
					tempPrdtNm = "annuity";
				}else if(proType == "7"){
					tempPrdtNm = "iAnnuity";
				}
				location.href = getPlanUrl(proType) + "?org=nodaplanding&pro=" + tempPrdtNm + "&area=nodap&cid=direct+org_landing+" + tempPrdtNm + "+img_1804_l0406_nodap_low_btn1+_+_+_+_"; // 페이지 이동
			}
		});
		//초기세팅
		//$('.select').css({'z-index':10,'opacity':0,'-khtml-appearance':'none'}).after('<span class="select">' + $('.select option:selected').text() + '</span>');
	    overStep(currentStepIndex);
	    
		//180207 연금가입가이드 변경 ui 관련 함수
		$(".step1 .box").on('mouseenter',function(){
			overStep($(this).index()-1);
		});
		//180207 연금가입가이드 변경 ui 관련 함수
		$(".step1 .box").on('mouseleave',function(){
			overStep(currentStepIndex);
		});
		//180207 연금가입가이드 변경 ui 관련 함수
	    $(".step1 .box").on('click',function(){
			currentStepIndex = $(this).index()-1;
			$(".select option[value="+ (currentStepIndex+1) +"]").prop("selected",true);
	        overStep(currentStepIndex);
	        activeStep(currentStepIndex);
	        return false;
		});
	  	
	  	
	  	//셀렉트박스 변경시
	  	$('.select').change(function(){
//			currentStepIndex = $('.select option:selected').val() - 1;
			var selBoxObj = $("#prodSelBox");
			var selectedBoxVal = selBoxObj.val();
			currentStepIndex = selectedBoxVal-1;
	  		overStep(currentStepIndex);
	  		activeStep(currentStepIndex);
	  	});
	  	
	  	
	  	
	  	
	});
		

	//가입나이 체크
	function checkAge(prdtIdx){
		// 만나이
	    var age = getInsuAgeByYmd(jQuery("#inputBirthday").val());
		if(age != "") {
			if ((age >= $("#staAge").val()) && (age <= $("#endAge").val())){}else{
		    	if (!chkDate(jQuery("#inputBirthday").val())) {
		    		alert("생년월일을 올바르게 입력해주세요.");
		    		//$('#pbirthday').focus();
		    		$('#inputBirthday').val("");
		    		return false;
		    	}
	    		alert("고객님의 보험가입 나이는 "+age+"세 입니다. \n\보험가입은 "+$("#staAge").val()+"세 이상 "+$("#endAge").val()+"세 이하만 가능합니다. ");
	    		return 0;
			}
		}
		return age;
	}


	//입력값 체크
	function validation(contBirth, contGender, prdtIdx){
		if (getInsuAgeByYmd(contBirth)> 0){
		}else{
			alert("생년월일을 올바르게 입력해주세요.");
			$('#inputBirthday').val("");
			$("#inputBirthday").focus();
			return false;
		}
		if (!chkDate(contBirth)) {
			alert("생년월일을 올바르게 입력해주세요.");
			$('#inputBirthday').val("");
			$('#inputBirthday').focus();
			return false;
		}

		if (typeof contGender == 'undefined' || contGender ==""){
			alert("성별을 선택해주세요");
			//$('input[name=radio'+prdtIdx+']').focus();
			return false;
		}
		return true;
	}
	
	//180207 연금가입가이드 변경 ui함수
	function overStep(index){
        $('.step1 .box').each(function(i){
            if(index == i){
                $(this).addClass('on');
                $(this).find('.btn a').text('상세혜택확인');
            }else{
                $(this).removeClass('on');
                $(this).find('.btn a').text('Click');
            }
        });
    }

	//180207 연금가입가이드 변경 ui함수
    function activeStep(index){
        $('.step2_in .content').each(function(i){
            if(index == i){
                $(this).show();
            }else{
                $(this).hide();
            }
        });
        $('.step2_in').attr('class', 'step2_in '+ 'box_'+(index+1));
        activeSelect(index);
        animateScroll();
    }

	//180207 연금가입가이드 변경 ui함수
    function activeSelect(index){
        //$('.content select.select:eq('+index+')')[0].selectedIndex = index;
        //$('.content span.select').text($('.content select.select option').eq(index).text());
        $(".sel span").text( $(".select option:selected").text() );
    }
	
  	//180207 연금가입가이드 변경 ui함수
    function animateScroll(){
        $('html, body').stop().animate({scrollTop:$('.step2_in').offset().top}, 500);
    }
	
	
</script>	

</div>
<!-- ### layout : container ////////////////////////////////////////////// -->
	<div id="container">		
		
		<!-- page : content /////////////////////////////////////////////////// -->
		<div id="content" class="page-guide">
			<!-- 추가 : 20180207 -->
			<div class="product-feature01">
				<div id="product_wrap">
				
					<div class="product_top">
						<p>노후준비 하고 계신가요?</p>
						<span>(2017 통계청 가계금융 복지조사)</span>
						<p>노후 준비가 잘된 사람 10명 중 단 1명
						은퇴 후 월 적정생활비 무려 276만원
						....노답 이라면?</p>
						<p>이제 삼성생명 다이렉트와 함께 노후준비의 답을 찾으세요</p>
					</div>
					
					<div class="step1">
						<p class="tit">원하시는 상품을 <strong>선택</strong>하세요</p>
			
						<!-- box -->
						<dl class="box box1 on">
							<dt class="stit"><em>추천상품 1</em><strong>13월의 보너스</strong>를 위한<br/> <strong class="ac">연금저축보험</strong></dt>
							<dd class="txt">
								<strong>노후준비<br> + <br/></strong>최대 <strong>66만원 세액공제</strong> 혜택!<br/><span>(관련 세법요건 충족시)</span>
								<span>* 최대 66만원(52만원) 세액공제(16.5%/13.2%)</span>
							</dd>
							<dd class="btn"><a href="#">상세혜택확인</a></dd>
						</dl>
						<!-- //box -->
			
						<!-- box -->
						<dl class="box box2">
							<dt class="stit"><em>추천상품 2</em><strong>안정적인 노후</strong>를 위한<br> <strong class="ac">연금보험</strong></dt>
							<dd class="txt">
								<strong>장기유지보너스 최대 3회 지급!<br>+<br>비과세혜택</strong>으로<br>더 많은 연금액!<br><span>(관련 세법요건 충족시)</span>
							</dd>
							<dd class="btn"><a href="#">Click</a></dd>
						</dl>
						<!-- //box -->
			
						<!-- box -->
						<dl class="box box3">
							<dt class="stit"><em>추천상품 3</em><strong>목돈 or 연금</strong> 골라 받는<br><strong class="ac">저축보험</strong></dt>
							<dd class="txt">
								한 달만 지나도 <strong>원금보장<br>연복리, 비과세 혜택<br><span>(사업비 차감 후 부리, 관련 세법요건 충족시)</span>+<br>노후 연금전환</strong>가능!<br>
							</dd>
							<dd class="btn"><a href="#">Click</a></dd>
						</dl>
						<!-- //box -->
					</div>
					<div class="step2_in box_1">
						<p class="tit">상품별 상세 혜택을 확인하시고 <strong>내 수령액을 계산</strong>해 보세요</p>
						
						<div class="in">
							<p class="stit">간 편 계 산 기</p>
		
							<div class="inbox">
								<div class="sel">
									<select class="select" id="prodSelBox" title="상품 선택">
										<option selected value="1">인터넷연금저축보험</option>
										<option value="2">인터넷연금보험</option>
										<option value="3">인터넷저축보험</option>
									</select>
								</div>
		
								<input type="text" id="inputBirthday" class="txt" onfocus="this.value=''" onblur="if(this.value == '') this.value='생년월일 (예:19800101)';" value="생년월일 (예:19800101)" />
		
								<div class="rawrap">
									<p class="ra1"><label><input name="radioGender" value="남자" type="radio" checked /></label></p>
									<p class="ra2"><label><input name="radioGender" value="여자" type="radio" /></label></p>
								</div>
		
								<a href="#none" id="planApply" class="btn">내 수령액 확인/가입</a>
							</div>
						</div>	
						<!-- box1 -->
						<div class="box1 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷연금저축보험</em></strong><br />미리 준비할수록 든든한 노후준비 + 연말정산 세액공제까지!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>월급을 받는 <strong>직장인</strong><br />
												및 <strong>자영업자</strong></span>
												<span>근로소득이 있는<br />
												<strong>연말정산 대상자</strong></span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												연말정산 시<br />
												매년 최대 <strong>66만원<br />
												세액공제 혜택</strong><br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt">
												<span><strong>3.0% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span>삼성생명 연금상품 중<br />
												<strong>최고 공시이율</strong></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 연금저축 연말정산 세액공제 참고사항<br />
									- 종합소득금액 4,000만원 초과(근로소득만 있는 경우에는 총급여액 5,500만원 초과)인 거주자 납입금액(연간 400만원 한도)의 13.2％(지방소득세 1.2％포함)<br />
									- 종합소득금액 4,000만원 이하(근로소득만 있는 경우에는 총급여액 5,500만원 이하)인 거주자 납입금액(연간 400만원 한도)의 16.5％(지방소득세 1.5％포함)<br />
									- 종합소득금액 1억원 초과자(근로소득만 있는 경우에는 총급여액 1억2천만원 초과자) 세액공제 한도 300만원</li>
								<li>* 연금저축보험 중도해지시 기타소득세 16.5%가 과세될 수 있습니다</li>
							</ul>
						</div>
						<!-- //box1 -->
						<!-- box2 -->
						<div class="box2 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷연금보험</em></strong><br />장기유지 보너스 + 비과세 혜택으로 더 많은 연금액 수령 가능!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>연말정산 대상자가<br />아닌 분</span>
												<span>이미 연말정산 혜택을<br />최대로 받고 있는 분</span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												이자소득세<br />
												<strong>15.4% 비과세</strong>혜택<br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt box2_icn">
												<span><strong>2.67% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span><strong>장기유지 보너스<br/>최대 3회 지급</strong><br />
												<span class="sm">(계약 이후 5년 / 10년 / 연금개시 전 최대 3번 지급)</span></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
			
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 비과세 혜택 : 5년납 이상, 10년 이상 유지시, 전 금융사 합계 월납 보험료 최대 150만원 한도</li>
								<li>* 장기유지보너스의 경우 연금 가입 11년 후 연금개시시 최대 3회 지급 됩니다.</li>	
							</ul>
						</div>
						<!-- //box2 -->
						<!-- box3 -->
						<div class="box3 content">
							<div class="leftarea">
								<dl>
									<dt>
										<strong>삼성생명 <em>인터넷저축보험</em></strong><br />한달만 유지해도 100% 원금보장+연금으로도 수령가능!
									</dt>
									<dd>
										<div>
											<p class="stit">추천 대상</p>
											<p class="txt">
												<span>높은 금리로 안전하게<br />목돈을 마련하고 싶은 분</span>
												<span>만기시 <strong>목돈</strong>이나 <strong>연금</strong>으로<br />받고 싶은 분</span>
											</p>
										</div>
										<div>
											<p class="stit">세금 혜택</p>
											<p class="txt">
												이자소득세<br />
												<strong>15.4% 비과세</strong>혜택<br />
												<span class="sm">(관련세법 충족시)</span>
											</p>
										</div>
										<div>
											<p class="stit">공시 이율</p>
											<p class="txt box2_icn">
												<span><strong>2.78% 연복리</strong><br />
												<span class="sm">(’18.8월, 사업비 차감 후 복리부리)</span></span>
												<span><strong>100% 원금보장</strong><br />
												<span class="sm">(한달 이상 유지시)</span></span>
											</p>
										</div>
									</dd>
								</dl>
							</div>
			
							<ul class="list">
								<li>* 공시이율형 상품이므로, 이율 변동에 따라 환급금이 변동할 수 있습니다.</li>
								<li>* 비과세 혜택 : 5년납 이상, 10년 이상 유지시, 전 금융사 합계 월납 보험료 최대 150만원 한도</li>
							</ul>
						</div>
						<!-- //box3 -->
					</div>
			
					<div class="banner">
						<p class="tit">연금저축, 연금보험, 저축보험 <strong>가입 이벤트</strong></p>
						<div class="left"><img src="../resources/cms/pc/images/guide/gda_giftevt_img.png" alt="신세계상품권 3만원 이미지"></div>
						<dl class="right">
							<dt><strong>보험 가입</strong>하면 <strong class="ac">신세계 상품권 3만원</strong> 증정</dt>
							<dd class="stxt">(저축보험은 월 보험료 10만원 이상 가입시 제공)</dd>
							<dd><p><em>이벤트 기간</em>2018.8.1 ~ 2018.8.31</p><p><em>당첨자 발표</em>10월 15일 <span>(계약유지고객대상)</span></p></dd>
						</dl>
					</div>
			
					<div class="boxzone">
						<div class="tit">
							100세 시대, <strong>연금</strong>은 가입보다 <strong>타는 것</strong>이 중요하니까
							<p><span><strong>1등 회사가 만든 인터넷보험,</strong> 삼성생명 다이렉트</span>를 선택하세요!</p>
						</div>
			
						<ul>
							<li>
								생명보험사<br />
								<strong>연금가입 1위</strong><br />
								<span>(’17.6월 금감원 통계 기준)</span>
							</li>
							<li>
								국가고객만족도<br />
								<strong>13년 연속 1위</strong><br />
								<span>(한국생산성본부)</span>
							</li>
							<li>
								생명보험사<br />
								<strong>자산규모 1위</strong><br />
								<span>(17.6월 금감원 통계 기준)</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			</div>
			<!-- 상품정보 히든 input에 설정 -->
						<input type="hidden" id="product1" value="5_20_75"/>			
						<input type="hidden" id="product3" value="4_20_65"/>
						<input type="hidden" id="product2" value="7_20_65"/>
					
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