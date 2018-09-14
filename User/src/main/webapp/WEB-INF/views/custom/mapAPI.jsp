<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>map</title>
<%@ include file="../include/header.jsp"%>
<style>
.customoverlay_main {
	position: relative;
	bottom: 58px;
	border-radius: 6px;
	border: 1px solid #ccc;
	border-bottom: 2px solid #ddd;
	float: left;
}

.customoverlay_main:nth-of-type(n) {
	border: 0;
	box-shadow: 0px 1px 2px #888;
}

.customoverlay_main a {
	display: block;
	text-decoration: none;
	color: #fff;
	text-align: center;
	border-radius: 6px;
	font-size: 11px;
	font-weight: bold;
	overflow: hidden;
	background: #d95050;

	/*background: #ffcc00 url(../img/arrow_white.png) no-repeat right 14px center;*/
}

.customoverlay_main .title {
	display: block;
	text-align: center;
	background: #000;
	/*margin-right: 35px;*/
	padding: 6px 11px;
	font-size: 11px;
	font-weight: bold;
}

.customoverlay_main:after {
	content: '';
	position: absolute;
	margin-left: -12px;
	left: 50%;
	bottom: -12px;
	width: 22px;
	height: 12px;
	background: url('/img/bult_titDep2.gif')
}
</style>
</head>
<body>
	<div id="wrapper">
		<!-- 머리 시작 -->
		<div id="container">
			<%@ include file="../include/Head.jsp"%>
			<!-- 내용 시작 -->
			<div id="content">
					<div id="agency_00" style="width: 100%; height: 400px;"></div>
				<!-- 맵이들어간 부분 css - widht, height 주기-->
				<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2a7ae288dbc4d9f905fac3f833a19964&APIKEY&libraries=services,clusterer,drawing"></script>

				<script>
					var mapContainer = document.getElementById('agency_00'), // 지도를 표시할 div 

					mapOption = {

						center : new daum.maps.LatLng(36.6309418,127.4976405), // 지도의 중심좌표

						level : 13
					// 지도의 확대 레벨

					};

					var map = new daum.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

					// 마커를 표시할 위치와 title 객체 배열입니다 

					var positions = [

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_1.php">' + //여기에 링크를 주어 클릭시 페이지이동 가능

								'    <span class="title">인천 윤정점</span>' +

								'  </a>' +

								'</div>',

								title : 'ISM',

								latlng : new daum.maps.LatLng(37.4258456,126.6619599)	//마커위치 좌표

							},

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_2.php">' +

								'    <span class="title">강릉 영익점</span>' +

								'  </a>' +

								'</div>',

								title : 'ISM',

								latlng : new daum.maps.LatLng(37.7595708,128.8985316)

							},

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_3.php">' +

								'    <span class="title">광주 짐배점</span>' +

								'  </a>' +

								'</div>',

								title : 'ISM',

								latlng : new daum.maps.LatLng(35.151334, 126.852170)

							},

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_4.php">' +

								'    <span class="title">ISM 본사</span>' +

								'  </a>' +

								'</div>',

								title : 'ISM',

								latlng : new daum.maps.LatLng(37.4785799,126.8782469)

							},

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_5.php">' +

								'    <span class="title">태일시스템</span>' +

								'  </a>' +

								'</div>',

								title : '원미디어',

								latlng : new daum.maps.LatLng(35.8244129,	128.5083978)

							},

							{

								content : '<div class="customoverlay_main">' +

								'  <a  href="/sub_agency_6.php">' +

								'    <span class="title">대구 광래점</span>' +

								'  </a>' +

								'</div>',

								title : 'ISM',
								
								latlng : new daum.maps.LatLng(35.817382, 128.524517)

							}

					];

					//마커이미지주소 

					var imageSrc = "/img/marker.png";

					/* 마커, 오버레이*/

					for (var i = 0; i < positions.length; i++) {

						var imageSize = new daum.maps.Size(45, 45);

						var markerImage = new daum.maps.MarkerImage(imageSrc,	imageSize);

						var marker = new daum.maps.Marker({

							map : map, // 마커를 표시할 지도

							position : positions[i].latlng, // 마커를 표시할 위치

							image : markerImage
						// 마커 이미지 

						});

						var overlay = new daum.maps.CustomOverlay({
							content : positions[i].content,
							map : map,
							position : marker.getPosition()
						});

					} //for문 끝

					/* for문이라 클로저 생성(필수) */

					function makeClickListener(map, marker, overlay) {

						return function() {

							overlay.open(map, marker);

						};

					}
				</script>
			</div>
			<!-- 내용 끝 -->
		</div>
		<!-- 머리 끝 -->
		<!-- 푸터 시작 -->
		<div id="footer">
			<%@ include file="../include/footer.jsp"%>
		</div>
		<!-- 푸터 끝 -->
	</div>
</body>
</html>