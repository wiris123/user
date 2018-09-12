<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>암보험</title>
<!-- 머리 -->
<%@ include file="../include/header.jsp"%>
</head>
<body>
	<div id="wrapper">


		<div id="container">
			<%@ include file="../include/Head.jsp"%>

			<!-- 내용시작 -->
			<div id="content">

				<ul>
					<div id="treatyList1">
						<li><span>비급여 도수치료ㆍ체외충격파치료ㆍ증식치료</span> <span
							class="label-check"> <label for="treaty1-1" class="on">선택</label>
								<input type="checkbox" class="check" id="treaty1-1"
								name="treatyList1" value="R017901ANNNNNNN" title="특약리스트"
								onclick="setReCalculator()" checked="checked">
						</span></li>
						<li><span>비급여 주사료</span> <span class="label-check"> <label
								for="treaty1-2" class="on">선택</label> <input type="checkbox"
								class="check" id="treaty1-2" name="treatyList1"
								value="R018001ANNNNNNN" title="특약리스트"
								onclick="setReCalculator()" checked="checked">
						</span></li>
						<li><span>비급여 자기공명영상진단(MRI/MRA)</span> <span
							class="label-check"> <label for="treaty1-3" class="on">선택</label>
								<input type="checkbox" class="check" id="treaty1-3"
								name="treatyList1" value="R018101ANNNNNNN" title="특약리스트"
								onclick="setReCalculator()" checked="checked">
						</span></li>
					</div>
				</ul>



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