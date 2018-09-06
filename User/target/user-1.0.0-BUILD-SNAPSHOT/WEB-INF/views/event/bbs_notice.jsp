<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>공지사항</title>
</head>
<body>
	<div id="wrapper">
		<!-- 머리 -->
		<%@ include file="../include/header.jsp"%>
		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content" class="page-notice">
				<!-- ## 페이지타이틀 ## -->
				<div class="tit-page">
					<h1>공지사항</h1>
				</div>

				<!-- ## 상단 중요공지사항 : @2015-12-02 : 신규추가 ## -->
				<div class="box-content visual">
					<div class="line"></div>
					<div>
						<div class="banner-bbs">
							<div class="banner ui-banner1">
								<div class="bx-wrapper" style="max-width: 100%;">
									<div class="bx-viewport" aria-live="polite" style="width: 100%; overflow: hidden; position: relative; height: 116px;">
										<ul class="list" id="fixedNotice" style="width: auto; position: relative; transition-duration: 0.5s; transform: translate3d(0px, -232px, 0px);">
											<li aria-hidden="true" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1655')">보험 가입 일시 중단 안내</a></strong> <em class="date">2017-09-20</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre></pre>
													</div>
												</div>
											</li>
											<li aria-hidden="true" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1581')">크롬 사용자 청약시 유의사항 안내</a></strong> <em class="date">2017-04-21</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre></pre>
													</div>
												</div>
											</li>
											<li aria-hidden="false" style="float: none; list-style: none; position: relative; width: 638px;">
												<div class="tit">
													<strong><a href="javascript:;" onclick="view('1451')">2016 소비자평가 No.1 브랜드 대상 선정!</a></strong> <em class="date">2016-08-03</em>
												</div>
												<div class="con" tabindex="0">
													<div class="wrap-admin">
														<pre>"2016 소비자평가 No.1 브랜드 대상"에서
인터넷 생명보험 부문, No.1 브랜드로 선정!!</pre>
													</div>
												</div>
											</li>
										</ul>
									</div>
									<div class="bx-controls bx-has-controls-auto bx-has-pager">
										<div class="bx-controls-auto">
											<div class="bx-controls-auto-item">
												<a class="bx-start" href="">Start</a>
											</div>
											<div class="bx-controls-auto-item">
												<a class="bx-stop active" href="">Stop</a>
											</div>
										</div>
										<div class="bx-pager bx-custom-pager">
											<div class="bx-pager-item">
												<a href="" data-slide-index="0" class="bx-pager-link">주요공지사항1</a>
											</div>
											<div class="bx-pager-item">
												<a href="" data-slide-index="1" class="bx-pager-link">주요공지사항2</a>
											</div>
											<div class="bx-pager-item">
												<a href="" data-slide-index="2" class="bx-pager-link active">주요공지사항3</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="line"></div>
				</div>

				<!-- ## 상단검색 ## -->
				<div class="form-search">
					<fieldset>
						<legend>게시물검색</legend>
						<span class="select-box"> <select id="searchWhere" name="searchWhere" title="검색조건">
								<option value="all">전체</option>
								<option value="subject">제목</option>
								<option value="content">내용</option>
							</select>
						</span> <span class="form-wrap1"> <label for="searchText" class="label">검색어를 입력해보세요.</label> <input type="text" id="searchText" name="searchText" class="text placeholder" value="" title="게시물검색 검색어" autocomplete="off">
						</span> <a href="#none" class="btn-type2 c1" id="noticeSearch" rel="history"><span>검색</span></a>
					</fieldset>
				</div>

				<p class="txt-num">
					총 <em id="total">20</em>건
				</p>

				<!-- ## 게시물출력 ## -->
				<ul class="board-list" id="noticeList">
					<li id="view_1859"><a href="#list?searchWhere=all&amp;searchText=[공지] 전자금융약거래약관 내용변경 안내&amp;page=1&amp;id=1859" class="tit" title="상세내용열기"> <span class="num">20</span> <strong>[공지] 전자금융약거래약관 내용변경 안내</strong> <em class="date">2018-06-12</em>
					</a>
						<div class="con">
							<div class="wrap-admin">
								[공지사항] <br>삼성생명 다이렉트 홈페이지를 이용해주셔서 감사합니다.<br>2018년 7월 1일부터 삼성생명 다이렉트 홈페이지 전자금융거래 약관이 아래와 같이 변경됨을 알려드립니다.<br> <br>(현행규정)<br>제2조(용어의 정의) <br>중략) 4. "접근매체"라 함은 전자금융거래에 있어서 이용자가 거래지시를 하거나 또는 이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 다음 각호 어느 하나에 해당하는 수단 또는 정보를 말한다.<br>가. 전자식카드 및 이에 준하는 전자적 정보<br>나. 전자서명법에 따른 공인인증서<br>다. 회사에 등록된 이용자 번호 <br>라. 등록되어 있는 이용자의 생체정보<br>마. 가호 또는 나호의 수단이나 정보를 사용하는데 필요한 비밀번호<br> <br>(개정규정)<br>중략) 4."접근매체"라 함은 전자금융거래에 있어서 이용자가 거래지시를 하거나 또는 이용자 및 거래내용의 진실성과 정확성을 확보하기 위하여 사용되는 다음 각호 어느 하나에 해당하는 수단 또는 정보를 말한다<br>가. 전자식 카드 및 이에 준하는 전자적정보<br>나. 전사서명법에 따른 공인인증서<br>다. 회사에 등록된 이용자 번호<br>라. 등록되어 있는 이용자의 생체정보<br>마. 가호 또는 나호의 수단이나 정보를 사용하는데 필요한 비밀번호<br>바. 기타 회사가 인정하는 인증 수단(카카오 페이 인증 등)
							</div>
						</div></li>
					<li id="view_1775"><a href="#list?searchWhere=all&amp;searchText=시스템 작업 일정 공지&amp;page=1&amp;id=1775" class="tit" title="상세내용열기"> <span class="num">19</span> <strong>시스템 작업 일정 공지</strong> <em class="date">2018-02-08</em>
					</a>
						<div class="con">
							<div class="wrap-admin">
								안녕하세요.<br>삼성생명 다이렉트입니다.<br> <br>시스템 장비 교체 작업으로 인하여, 아래 시간동안 서비스 이용시 일시적인<br>끊김 현상이 발생할 수 있어 안내드립니다.<br> <br>일시 : 18년 2월 8일(목), 19:00~20:00 (총 1시간)<br>영향서비스 : 홈페이지, 모바일 창구 등 삼성생명 주요 IT 서비스 <br> <br>추운 겨울 건강 유의하시기 바랍니다.<br>항상 고객님의 사랑과 관심에 감사드립니다.
							</div>
						</div></li>
					<li id="view_1655"><a href="#list?searchWhere=all&amp;searchText=보험 가입 일시 중단 안내&amp;page=1&amp;id=1655" class="tit" title="상세내용열기"> <span class="num">18</span> <strong>보험 가입 일시 중단 안내</strong> <em class="date">2017-09-20</em>
					</a>
						<div class="con">
							<div class="wrap-admin">
								안녕하세요. 삼성생명 다이렉트입니다.<br>고객님의 편의를 위해 시스템 개편 작업이 아래와 같이 진행됩니다.<br>개편 작업 동안은 가입이 불가하오니, 가입을 원하시는 고객님은<br>미리 가입해 주시기 바랍니다.<br> <br>중단 일정<br>암, 정기, 상해, 실손 : 9월 26일(화) 밤 11시 부터, 10월 10일(화) 오후 1시까지<br>저축, 연금저축, 연금, 변액 : 9월 29일(금) 밤 8시 부터, 10월 10일(화) 오후 1시까지<br> <br>오늘도 행복 가득한 하루가 되시길 바랍니다.<br>
							</div>
						</div></li>
					<li id="view_1581"><a href="#list?searchWhere=all&amp;searchText=크롬 사용자 청약시 유의사항 안내&amp;page=1&amp;id=1581" class="tit" title="상세내용열기"> <span class="num">17</span> <strong>크롬 사용자 청약시 유의사항 안내</strong> <em class="date">2017-04-21</em>
					</a>
						<div class="con">
							<div class="wrap-admin">
								안녕하세요. 삼성생명 다이렉트입니다.<br> <br>크롬 최신버전인 58.0.3029.81 버전에서 <br>크롬 정책 변경으로 인해 청약이 일시적으로 진행되지 않을수가 있습니다.<br> <br>혹 청약 진행이 안되시는 분들께서는 <br>인터넷익스플로어를 통해 청약을 진행하시면 감사하겠습니다.<br> <br>따사로운 봄날의 기운과 같이 고객님에게도 행복이 가득하시길 기원합니다.<br>감사합니다.
							</div>
						</div></li>
					<li id="view_1570"><a href="#list?searchWhere=all&amp;searchText=[공지] 삼성생명 다이렉트 상담서비스 일시중단 안내 (4/6 목 09:00~18:00)&amp;page=1&amp;id=1570" class="tit" title="상세내용열기"> <span class="num">16</span> <strong>[공지] 삼성생명 다이렉트 상담서비스 일시중단 안내 (4/6 목 09:00~18:00)</strong> <em class="date">2017-04-05</em>
					</a>
						<div class="con">
							<div class="wrap-admin">
								안녕하세요. 고객과 함께하는 삼성생명 다이렉트입니다. <br> <br>보다 나은 상담서비스를 위해 상담시스템 개선작업으로<br>4월6일 하루 상담서비스가 일시 중단될 예정입니다. <br> <br>□ 일 시 : 2017. 4 .6(목) 09:00 ~ 18:00<br>□ 내 용 : 전화(ARS콜백)/채팅/원격상담, 상담예약 이용 불가<br> ① 상품가입은 정상적으로 가능합니다.<br> ② ARS콜백, 상담예약 등 문의내용을 남겨주시면<br> 상담서비스 시작 후 순차적으로 연락드리겠습니다.<br> <br>이용에 불편을 드려서 죄송합니다. <br>보다 안정적인 서비스를 제공하도록 최선을 다하겠습니다. <br>감사합니다
							</div>
						</div></li>
				</ul>

				<!-- ## 페이징 ## -->
				<div class="paging">
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