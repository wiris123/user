// 이벤트 ID 전역 변수
var eventid = 0;

/*************************************************************************************
*
* 숫자만 입력
* 사용할 input박스에다가 class="numOnly" 추가
*
**************************************************************************************/
$(document).ready(function(){
	/*숫자만 입력되도록 처리*/
	$('.numOnly').css('imeMode','disabled').keypress(function(event) { //ie처리
		if(event.which && (event.which < 48 || event.which > 57) && event.which != 8 ) {
			event.preventDefault();
		}
	}).keyup(function(){ //크롬, 파폭 처리
		if( $(this).val() != null && $(this).val() != '' ) {
			$(this).val( $(this).val().replace(/[^0-9]/g, '') );
		}
	});  
	
	/*문자만 입력되도록 처리*/
	$('.txtOnly').keyup(function(){ //크롬, 파폭 처리
		if( $(this).val() != null && $(this).val() != '' ) {
			$(this).val( $(this).val().replace(/[0-9]/g, '') );
		}
	});
	
	// 추가 (숫자 + 특수문자 '.')
	$('.numAndText').css('imeMode','disabled').keypress(function(event) { //ie처리
		if(event.which && (event.which < 48 || event.which > 57) && event.which != 46 ) {
			event.preventDefault();
		}
	});
	
/*	//history 초기화
    window.history.forward(0);
    //마우스 우클릭 방지
    document.oncontextmenu=function(){return false;};
    
    // 드래그 방지
    document.ondragstart=function(){return false;};

    // 선택복사 방지
    document.onselectstart=function(){return false;};
    
	//새로고침
	document.onkeydown = function(e) {
		key = (e) ? e.keyCode : event.keyCode;
		if(key==116) {
			if(e) {
				e.preventDefault();
			} else {
				event.keyCode = 0;
				event.returnValue = false;
			}
		}
	};*/
});

/* **********************************************
 * 공통으로 사용하는 스크립트 함수 정의
*********************************************** */

/**
 * 숫자 추출
 * @param obj
 * @returns
 */
function extractNumberOnly(obj){
    var val = obj;
    val = new String(val);
    var regex = /[^0-9]/g;
    val = val.replace(regex, '');
    
    return val;
}

/**
 * 유효성검사. 사용법fnRRNCheck("8201011234567");
 * @param rrn
 * @returns {Boolean}
 */
function fncIsValidSocno(rrn){
    if (fnrrnCheck(rrn) || fnfgnCheck(rrn)) {
        return true;
    }
    return false;
}

/**
 * 주민등록번호유효성검사.
 * @param rrn
 * @returns {Boolean}
 */
function fnrrnCheck(rrn){
    var sum = 0;
    if (rrn.length != 13) {
        return false;
    }
    else if (rrn.substr(6, 1) != 1 && rrn.substr(6, 1) != 2 && rrn.substr(6, 1) != 3 && rrn.substr(6, 1) != 4) {
        return false;
    }
    for (var i = 0; i < 12; i++) {
        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);
    }
    if (((11 - (sum % 11)) % 10) == Number(rrn.substr(12, 1))) {
        return true;
    }
    return false;
}

/**
 * 외국인등록번호유효성검사.
 * @param rrn
 * @returns {Boolean}
 */
function fnfgnCheck(rrn){
    var sum = 0;
    if (rrn.length != 13) {
        return false;
    }
    else if (rrn.substr(6, 1) != 5 && rrn.substr(6, 1) != 6 && rrn.substr(6, 1) != 7 && rrn.substr(6, 1) != 8) {
        return false;
    }
    if (Number(rrn.substr(7, 2)) % 2 != 0) {
        return false;
    }
    for (var i = 0; i < 12; i++) {
        sum += Number(rrn.substr(i, 1)) * ((i % 8) + 2);
    }
    if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(rrn.substr(12, 1))) {
        return true;
    }
    return false;
}

/**
 * Function Name : fncIsValidSocno()
 * Description   : 주민번호, 외국인 등록번호의 validation 체크 함수
 *                 ### 주민번호 7번째 자리의 규칙 ###
 *                 1800년대: 남자 9, 여자 0
 *                 1900년대: 남자 1, 여자 2
 *                 2000년대: 남자 3, 여자 4
 *                 2100년대: 남자 5, 여자 6
 *                 외국인 등록번호: 남자 7, 여자 8
 * Param         : socno (주민번호)
 * Return        : boolean
 */
function fncIsValidSocno1(socno){
	var socnoStr = socno.toString();
	a = socnoStr.substring(0, 1);
	b = socnoStr.substring(1, 2);
	c = socnoStr.substring(2, 3);
	d = socnoStr.substring(3, 4);
	e = socnoStr.substring(4, 5);
	f = socnoStr.substring(5, 6);
	g = socnoStr.substring(6, 7);
	h = socnoStr.substring(7, 8);
	i = socnoStr.substring(8, 9);
	j = socnoStr.substring(9, 10);
	k = socnoStr.substring(10, 11);
	l = socnoStr.substring(11, 12);
	m = socnoStr.substring(12, 13);
	month = socnoStr.substring(2,4);
	day = socnoStr.substring(4,6);
	socnoStr1 = socnoStr.substring(0, 7);
	socnoStr2 = socnoStr.substring(7, 13);

	var sum = 0;
	 // 월,일 Validation Check
	 if(month <= 0 || month > 12) { return false; }
	 if(day <= 0 || day > 31) { return false; }

	 // 주민등록번호에 공백이 들어가도 가입이 되는 경우가 발생하지 않도록 한다.
	 if (isNaN(socnoStr1) || isNaN(socnoStr2))  { return false; }

	if(g == "1" || g == "2" || g == "3" ||  g == "4") {
		 // alert('국내');
		 temp=a*2+b*3+c*4+d*5+e*6+f*7+g*8+h*9+i*2+j*3+k*4+l*5;
		 temp=temp%11;
		 temp=11-temp;
		 temp=temp%10;
		 	
		 	if(temp == m) {
		 		return true;
	 		} else {
		 		return false;
	 		}
	}else if(g == "5" || g == "6" || g == "7" ||  g == "8"){	
		//alert("외국인");	 
		if (Number(socnoStr.substr(7, 2)) % 2 != 0) {
        return false;
    }
    for (var i = 0; i < 12; i++) {
        sum += Number(socnoStr.substr(i, 1)) * ((i % 8) + 2);
    }    
    if ((((11 - (sum % 11)) % 10 + 2) % 10) == Number(socnoStr.substr(12, 1))) {
		//alert("true");	 
        return true;
    }
	}
	//alert("false");	 
	return false;
}

/**
 * 생년월일로 만 나이를 구한다.
 * @param ymd
 * @returns
 */
function getInsAgeByYmd(ymd) {
    if(ymd == "" || ymd.length != 8) return "";
    
    var year  = parseInt(ymd.substring(0,4),10);
    var month = parseInt(ymd.substring(4,6),10);
    var day   = parseInt(ymd.substring(6,8),10);
    
    var d=new Date(); //데이트객체
    var thisYear=d.getYear(); //올해
    var thisMonth=d.getMonth()+1;//이번달
    var thisDay=d.getDay();//이번달
    
	var tYear  = parseInt(thisYear,10);
	var tMonth = parseInt(thisMonth,10);
	var tDay   = parseInt(thisDay,10);

	//오늘 이후 날짜인 경우
	if(year > tYear || (year == tYear && month > tMonth) || (year == tYear && month == tMonth && day > tDay)) {
		return -1;
	}
	
	month = month + 6;
	
	if(month > 12) {
		month = month - 12;
		year = year + 1;
	}
	
	if(tMonth > month || (tMonth == month && tDay >= day)) {
		age = tYear - year + 1;
	} else {
		age = tYear - year;
	}
	
	return age;
}

/**
 * 숫자에 ',' 표시
 * @param nStr
 * @returns
 */
function addCommas(nStr) {
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

/**
 * null값 체크
 * @param id
 * @param alertMessage
 * @returns {Boolean}
 */
function isEmptyValue(id, alertMessage) {
	
	if (jQuery.trim(jQuery('#'+id).val()) == '') {
		alert(alertMessage);
		jQuery('#'+id).focus();
		return true;
	} 
	return false;
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
		jQuery('#'+id).focus();
		return false;
	}
	
	return true;
}

/**
 * 쿠키 저장
 * @param name
 * @param value
 * @param expiredays
 */
function setCookie(name, value, expiredays, type) {
	//expiredays의 값이 팝업창 뜨지 않는 날짜임
	var todayDate = new Date();
	todayDate.setDate(todayDate.getDate() + expiredays);
	if (type == 'lounge') {
		todayDate.setHours(0, 0, 0, 0);
	}
	document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
}

/**
 * 모바일 브라우저 체크
 * @returns {Boolean}
 */
function checkMobile() {
	var UserAgent = navigator.userAgent; 
	if(UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

/**
 * 브라우저 체크 
 * @returns
 */
function checkBrowser(){
	var ba = new Array("MSIE 10", "MSIE 9", "MSIE 8", "MSIE 7", "MSIE 6", "Chrome", "Safari", "Opera", "Firefox");
	var userinfo = navigator.userAgent;
	var browser;
	
	for(var i=0;i < ba.length;i++){
		if(userinfo.indexOf(ba[i]) != -1){
			if(ba[i] == "Safari"){
				if(userinfo.indexOf("Android") != -1){//Android Mobile Check
					browser = "Android Browser";
					break;
				}
			}
			browser = ba[i];
			break;
		}
	}
	return browser;
}

/**
 * OS 체크
 * @returns
 */
function checkOS(){
	var ba = new Array("NT 6.2", "NT 6.1", "NT 6.0", "NT 5.2", "NT 5.1", "NT 5.0", "iPhone", "iPad", "iPod", "Android", "Macintosh", "Linux");
	var fname = new Array("Window 8", "Window 7", "Window Vista/Server 2008", "Window Server 2003", "Window XP", "Window 2000", "iPhone", "iPad", "iPod", "Android", "Macintosh", "Linux");
	var userinfo = navigator.userAgent;
	//var cpubit = navigator.cpuClass;
	var os;
	for(var i=0;i < ba.length;i++){
		if(userinfo.indexOf(ba[i]) != -1){
			//os = fname[i]+"("+cpubit+")";
			os = fname[i];
			break;
		}
	}		
	return os;
}

/**
 * Date 체크 yyyyMMdd
 * @param yyyyMMdd
 * @returns {Boolean}
 */
function checkDate(yyyyMMdd){
	var format = /^(19[5-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if(!format.test(yyyyMMdd))  {
     return false;
    }else {
     return true;
    }
}

var onLoc = {
	on : function(loc){
		$(".gnb"+loc +" a").addClass("on");
	}
};

/**
 * 날짜입력이 제대로 되어있나 확인하는작업
 * @param obj 날짜
 * 20102222 이렇게 입력하게되면 이제 false로 return한다
 */
function chkDate(obj){
	
	if (obj.length > 8) return false;
	
	var input = obj.replace(/-/g,"");
	
	if (input == null || input == ''){ return false;}
	if (input.length < 8){ return false;}
	
	var inputYear = input.substr(0,4);
	var inputMonth = input.substr(4,2) - 1;
	var inputDate = input.substr(6,2);
	
	var resultDate = new Date(inputYear, inputMonth, inputDate);
	
	if ( resultDate.getFullYear() != inputYear ||
		resultDate.getMonth() != inputMonth ||
		resultDate.getDate() != inputDate) {
		return false;
	} else {
		return true;
	}
}

// WiseLog (makePCookie.js)
function Nethru_getCookieVal(offset){
	var endstr = document.cookie.indexOf (";", offset);
	if (endstr == -1)
		endstr = document.cookie.length;
	return unescape(document.cookie.substring(offset, endstr));
}

function Nethru_SetCookie(name, value){
   var argv = Nethru_SetCookie.arguments;
   var argc = Nethru_SetCookie.arguments.length;
   var expires = (2 < argc) ? argv[2] : null;
   var path = (3 < argc) ? argv[3] : null;
   var domain = (4 < argc) ? argv[4] : null;
   var secure = (5 < argc) ? argv[5] : false;

   document.cookie = name + "=" + escape (value) +
        ((expires == null) ? "" : ("; expires="+expires.toGMTString())) +
     ((path == null) ? "" : ("; path=" + path)) +
     ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");

}

function Nethru_GetCookie(name){
   var arg = name + "=";
   var alen = arg.length;
   var clen = document.cookie.length;
   var i = 0;
   while (i < clen)
      {
      var j = i + alen;
      if (document.cookie.substring(i, j) == arg)
         return Nethru_getCookieVal (j);
      i = document.cookie.indexOf(" ", i) + 1;
      if (i == 0)
         break;
      }
  return null;
}

function Nethru_makePersistentCookie(name,length,path,domain){
    var today = new Date();
    var expiredDate = new Date(2100,1,1);
    var cookie;
	var value;

    cookie = Nethru_GetCookie(name);
    if ( cookie ) {
        return 1;
	}

	var values = new Array();
	for ( i=0; i < length ; i++ ) {
		values[i] = "" + Math.random();
	}

	value = today.getTime();
	for ( i=0; i < length ; i++ ) {
		value += values[i].charAt(2);
	}

    Nethru_SetCookie(name,value,expiredDate,path,domain);
}


function Nethru_makePersistentCookie1(name,length,path,domain){
	if ( domain == null ) return 1;
   	var expiredDate = new Date(2100,1,1);
   	var vn_screenx = screen.width; 					
    var vn_screeny = screen.height; 					
	var vn_screenc = screen.colorDepth; 					
		
	var resolution_cookiename = name + "_RESOLUTION";			
	var color_cookiename = name + "_COLOR";				
	
	var resolution_value = screen.width + "*" + vn_screeny;
	var color_value = vn_screenc;
	
	var resolution_cookie;
	var color_cookie;

	resolution_cookie = Nethru_GetCookie(resolution_cookiename);
	color_cookie = Nethru_GetCookie(color_cookiename)
    if ( resolution_cookie ) {
       	if ( resolution_cookie != resolution_value ) {			
       		Nethru_SetCookie(resolution_cookiename,resolution_value,expiredDate,path,domain);  	
		}
	}else{	
       	Nethru_SetCookie(resolution_cookiename,resolution_value,expiredDate,path,domain);
	}
   	if ( color_cookie ) {							
   		if ( color_cookie != color_value ) {			
        	Nethru_SetCookie(color_cookiename,color_value,expiredDate,path,domain);  	
		}
	}else{								
        Nethru_SetCookie(color_cookiename,color_value,expiredDate,path,domain);
	}
}

function Nethru_getDomain() {
	var _host   = document.domain;
	var so      = _host.split('.');
	var dm    = so[so.length-2] + '.' + so[so.length-1];
	return (so[so.length-1].length == 2) ? so[so.length-3] + '.' + dm : dm;
}

var Nethru_domain  = Nethru_getDomain();

Nethru_makePersistentCookie("PCID",10,"/",Nethru_domain);
// End of WiseLog



/**
 * 글자수 체크.
 * @param obj
 * @param maxByte
 * @param countObj
 */
function checkCharacterLength(obj, maxByte, countObj) {
	 
    var strValue = obj.value;
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";
    var str2 = "";

    for (var i = 0; i < strLen; i++) {
        oneChar = strValue.charAt(i);
        if (escape(oneChar).length > 4) {
            totalByte += 2;
        } else {
            totalByte++;
        }

        // 입력한 문자 길이보다 넘치면 잘라내기 위해 저장
        if (totalByte <= maxByte) {
            len = i + 1;
        }
    }

    // 넘어가는 글자는 자른다.
    if (totalByte > maxByte) {
        alert(maxByte + "자를 초과 입력 할 수 없습니다.");
        str2 = strValue.substr(0, len);
        obj.value = str2;
        chkword(obj, 4000);
    }
    
    if (typeof(countObj) != "undefined") {
    	
    	countObj.text(obj.value.length);
    }
}


/**
 * javascrip hashMap
 * @returns {Map}
 */
Map = function(){
	this.map = new Object();
};
Map.prototype = {   
    put : function(key, value){   
        this.map[key] = value;
    },   
    get : function(key){   
        return this.map[key];
    },
    containsKey : function(key){    
     return key in this.map;
    },
    containsValue : function(value){    
     for(var prop in this.map){
      if(this.map[prop] == value) return true;
     }
     return false;
    },
    isEmpty : function(key){    
     return (this.size() == 0);
    },
    clear : function(){   
     for(var prop in this.map){
      delete this.map[prop];
     }
    },
    remove : function(key){    
     delete this.map[key];
    },
    keys : function(){   
        var keys = new Array();   
        for(var prop in this.map){   
            keys.push(prop);
        }   
        return keys;
    },
    values : function(){   
     var values = new Array();   
        for(var prop in this.map){   
         values.push(this.map[prop]);
        }   
        return values;
    },
    size : function(){
      var count = 0;
      for (var prop in this.map) {
        count++;
      }
      return count;
    }
};
	
/**
 * 해쉬 파라미터 값 가져오기
 * 예) #test?key=value
 * getHashParameter()['key'];
 */
function getHashParameter() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

/**
 * 3자리 마다 콤마 삽입
 * @param n
 * @returns
 */
function commify(n) {
    var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
    n += ''; // 숫자를 문자열로 변환
    while (reg.test(n))
        n = n.replace(reg, '$1' + ',' + '$2');
    return n;
}

/**
 * 날짜 (yyyy-MM-dd)
 * @param date
 * @returns
 */
function formatDate(date) {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
}

/**
 * 페이징 Anchor 히스토리
 * @returns {Boolean}
 */
function handlePaginationClick() {
	$("#Pagination a").attr("rel", "history");
	return false;
}


/************************************************
 * 공통로그 정의
************************************************/

/**
 * 페이지로그 적재
 * @param logType
 * pv : page view 로그 (기본적재)
 * pa : page action 행위로그 (옵션)
 * rt : real time 실시간 로그 (옵션)
 * @param logCode
 * main, step1, step2 정의
 */
function insertLog(logType, logCode){
	
	var url = location.href;			// 현재 URL
	var refererUrl = document.referrer;	// Referer URL
	var d = new Date(),
	    year = (d.getFullYear()).toString(),
	    month = (d.getMonth()+ 1).toString(),
	    day = (d.getDate()).toString(),
	    hours = (d.getHours()).toString(),
	    minutes = (d.getMinutes()).toString(),
	    seconds = (d.getSeconds()).toString();
	var random = (Math.floor(Math.random()*100)).toString();
	
	if (month.length < 2) month = '0'+month;
    if (day.length < 2) day = '0'+day;
    if (hours.length < 2) hours = '0'+hours;
    if (minutes.length < 2) minutes = '0'+minutes;
    if (seconds.length < 2) seconds = '0'+seconds;
    if (random.length < 2) random = '0'+random;

	// Unique 쿠키발행
    var createCookieLogId = "cid" + year + month + day + hours + minutes + seconds + random;
    var cookieLogId = $.cookie("cookieLogId");

    if (typeof cookieLogId =="undefined"){
    	$.cookie("cookieLogId", createCookieLogId);
    	cookieLogId = createCookieLogId;
    }else{
    	
    }
	
	/*
	var fingerprint = new Fingerprint2().get(function(result, components){
	
		alert("result" + result);
		alert("components" + components);
	});
	*/
    // fingerPrinting 아이디발행
    // 쿠카 발행보다 Unique 한 값이나, 아직 사용하기에는 시기상조
	var fingerId = new Fingerprint().get();
	
	var jsonData = '{';
		jsonData += '"logType" : "'+logType+'"';
		jsonData += ',"logCode" : "'+logCode+'"';			
		jsonData += ',"cookieId" : "'+cookieLogId+'"';	
		jsonData += ',"fingerId" : "'+fingerId+'"';	
		jsonData += ',"url" : "'+url+'"';	
		jsonData += ',"refererUrl" : "'+refererUrl+'"';		
		jsonData += '}';
	
	jQuery.ajax({
		type : "POST",
		url : "/insertLog.eds",
		data : jsonData,
		dataType : 'json',
		success : function(result) {
			if (result.success) {
			}
		},
		error : function() {
			//alert("error");
		}
	});
}



/**
 * 스텝이동
 * @param step
 */
function goStep(step) {
	var goStep = document.getElementById("goStep");
	goStep.action = "/m/"+step+".eds";
	$('#goStep').submit();
}

/**
 * 오늘날짜 가져오기 YYYYMMDD
 * @returns {String}
 */
function getDateYMD(){
	var d = new Date();
    var year = (d.getFullYear()).toString();
    var month = (d.getMonth()+ 1).toString();
    var day = (d.getDate()).toString();	

	if (month.length < 2) month = '0'+month;
	if (day.length < 2) day = '0'+day;
	
	return year+month+day;
}

/**
 * 오늘날짜 가져오기 YYYYMMDDHHMISS
 * @returns {String}
 */
function getDateYMDHMS(){
	var d = new Date();
    var year = (d.getFullYear()).toString();
    var month = (d.getMonth()+ 1).toString();
    var day = (d.getDate()).toString();	
    var hour = (d.getHours()).toString();
    var min = (d.getMinutes()).toString();
    var sec = (d.getSeconds()).toString();    
	if (month.length < 2) month = '0'+month;
	if (day.length < 2) day = '0'+day;
	if (hour.length < 2) hour = '0'+hour;
	if (min.length < 2) min = '0'+min;
	if (sec.length < 2) sec = '0'+sec;
	
	return year+month+day+hour+min+sec;
}

/**
 * 최대세액공제액 가져오기 
 * 월납입금액을 넣으면 최대 세액공제액 계산한다.
 * 총급여 5,500만원 초과, 종합소득 4,000만원 초과
 * ex) 300000
 * @param inputMoney
 * @returns {Number}
 */
function getTaxMoney(inputMoney){
	var monthlyPremium = parseInt(inputMoney / 10000); 
	/*var taxCredit = (monthlyPremium * 12 * 13.07 / 100).toFixed(1);

	//	최대 세액공제액	(납입금액 * 12 * 13.07% : 소수점 첫째자리까지만 표시)
	if (taxCredit >= 52.8) taxCredit = 52.8;*/
	
	var taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);
	
	//	최대 세액공제액	(납입금액 * 12 * 16.5% : 소수점 첫째자리까지만 표시)
	if (taxCredit >= 66) taxCredit = 66;
	
	//taxCredit = taxCredit *10000;
	return taxCredit;
}

/**
 * 최대세액공제액 가져오기 
 * 월납입금액을 넣으면 최대 세액공제액 계산한다.
 * 총급여 5,500만원 이하, 종합소득 4,000만원 이하
 * ex) 300000
 * @param inputMoney
 * @returns {Number}
 */
function getTaxMoney2(inputMoney){
	var monthlyPremium = parseInt(inputMoney / 10000); 
	var taxCredit = (monthlyPremium * 12 * 16.5 / 100).toFixed(1);

	//	최대 세액공제액	(납입금액 * 12 * 16.5% : 소수점 첫째자리까지만 표시)
	if (taxCredit >= 66) taxCredit = 66;
	
	//taxCredit = taxCredit *10000;
	return taxCredit;
}


// 청약 toggle
function toggleBox(eleId){
	$(eleId).toggle();
	return false;
}
function toggleConfirm(eleId, thisEle){
	thisEle.toggleClass('on');
	toggleBox(eleId);
	return false;
}


/**
 * 만나이 구하기 
 * @param ymd
 * @returns
 */
function getFullAgeByYmd(ymd) {
    if(ymd == "" || ymd.length != 8) return "";
    
	var today  = new Date();
    var tYear  = parseInt(today.getFullYear(),10);
    var tMonth = parseInt(today.getMonth(),10) + 1;
    var tDay   = parseInt(today.getDate(),10);

    var year  = parseInt(ymd.substring(0,4),10);
    var month = parseInt(ymd.substring(4,6),10);
    var day   = parseInt(ymd.substring(6,8),10);

	var age = 0;
	if((tMonth > month) || (tMonth == month && tDay >= day)) {
	    age = tYear - year;
	} else {
	    age = tYear - year - 1;
	}
	return age;
}	
	
  
/**
 * 보험나이 구하기 (삼성생명 Ver.)
 * @param ymd
 * @returns
 */
function getInsuAgeByYmd(ymd) {
    if(ymd == "" || ymd.length != 8) return "";

    var today  = new Date();
    var tYear  = parseInt(today.getFullYear(),10);
    var tMonth = parseInt(today.getMonth(),10) + 1;
    var tDay   = parseInt(today.getDate(),10);
    
    var year  = parseInt(ymd.substring(0,4),10);
    var month = parseInt(ymd.substring(4,6),10);
    var day   = parseInt(ymd.substring(6,8),10);
    
	
    var dateChk = false;
	if (((tMonth == 1 || tMonth == 3 || tMonth == 5 || tMonth == 7 || tMonth == 8 || tMonth == 10 || tMonth == 12) && tDay == 31) || 
		((tMonth == 4 || tMonth == 6 || tMonth == 9 || tMonth == 11) && tDay == 30) || 
		(tMonth == 2 && (tDay == 28 || tDay == 29))) {
		dateChk = true;
	}

	var calDay = tDay - day;
	if (calDay < 0 && dateChk == false) {
		tMonth--;
	}

	var calMonth = tMonth - month;
	if (calMonth < 0) {
		tYear--;
		calMonth = calMonth + 12;
	}

	var age = 0;
	age = tYear - year;
	if (calMonth > 5) {
		age++;
	}

	return age;	    
}


/**
 * 숫자인지 체크
 * @param num
 * @returns
 */
function checkNumber(num) {
	var reg = /[^0-9]/gi;
	return reg.test(num);
}


/**
 * 글자수 제한 스크립트
 * @param textid
 * @param limit
 * @param limitid
 * @returns {Boolean}
 */
function limitCharacters(textid, limit, limitid){         
	var text = $('#'+textid).val(); // 입력값 길이 저장        
	var textlength = text.length;        
	if(textlength > limit){
		$('#' + limitid).html('('+ (limit) +' / '+ (limit) +')');
		$('#'+textid).blur() ;
		$('#'+textid).val(text.substr(0,limit));
		$('#'+textid).focus() ;
		
		return false;
	}else{
		$('#' + limitid).html('('+ (textlength) +' / '+ (limit) +')');
		return true;
	}
	
}

/**
 * 금액 억 표기
 * @param amt
 * @returns {String}
 */
function wonToStr(amt) {
	var result;
	if (amt >= 10000){
		var firstAmt = parseInt(amt / 10000, 10);
		var lastAmt = parseInt(String(amt).substring(1), 10);
		if (lastAmt == 0) {
			result = firstAmt + "억";
		} else {
			result = firstAmt + "억" + addCommas(lastAmt);
		}
	} else {
		result = addCommas(amt);
	}
	return result;
}

/**
 * 금액 억 표기
 * @param amt
 * @returns {String}
 */
function wonToStr2(amt) {
	var result;
	if (amt >= 10000){
		var firstAmt = parseInt(amt / 10000, 10);
		var lastAmt = parseInt(String(amt).substring(1), 10);
		if (lastAmt == 0) {
			result = firstAmt + "억";
		} else {
			result = firstAmt + "억" + addCommas(lastAmt) +"만";
		}
	} else {
		result = addCommas(amt) +"만";
	}
	return result;
}

/**
 * 금액 억 표기
 * @param amt
 * @returns {String}
 */
function wonToStr3(amt) {
	var result = amt;
	
	if (amt >= 100000000) {
		var firstAmt;
		var lastAmt;
		var cnt;
		
		firstAmt = parseInt(amt / 100000000, 10);
		cnt = String(firstAmt).length;
		lastAmt = parseInt(parseInt(String(amt).substring(cnt), 10) / 10000, 10);
		
		if (lastAmt == 0) {
			result = firstAmt + "억";
		} else {
			result = firstAmt + "억" + addCommas(lastAmt) +"만";
		}
	} else if (amt >= 10000) {
		result = parseInt(amt / 10000, 10);
		result = addCommas(result) + "만";
	}
	
	return result;
}


/**
 * 문자열 제거
 */
function removePrefix(str) {
	return str.substring(2, str.length);
}


/**
 * 상령일 구하기
 * @param ymd
 * @returns {String}
 */
function getInsYmd(ymd) {
	
	var insYmd = ""; // 최종 상령일자 YMD

    if(ymd == "" || ymd.length != 8) return "";
    
    var today = new Date();	
    var tYear = today.getFullYear(); 				// 현재 년도
    var month = parseInt(ymd.substring(4,6),10);	// 입력한 생일 월
    var day   = parseInt(ymd.substring(6,8),10);	// 입력한 생일 일

    var tmpMonth ;	// 상령월 계산
	var tmpYear ; 	// 상령년도 계산

	// 생일에서 -6개월 처리한 날짜 
	var minInsDate = new Date(tYear,month-1-6,day);

	// 생일에서 -6개월한 처리한 날짜가 오늘보다 작은경우는 +6개월이 상령이고,
	// 그렇치 않은경우는 -6개월이 상령일이 된다. 
	if (minInsDate.getTime() < today.getTime()){
		tmpMonth = month + 6;
	}else{
		tmpMonth = month - 6;
	}
	
	tmpYear = tYear;			// 년도 계산
	if (tmpMonth > 12){	// 12월이 넘어갈경우 년도 +1 년
		tmpMonth = tmpMonth - 12;
		tmpYear = tYear + 1;
	}
	
	// 계산된 년,월,일 입력하여 Date 형태로 변경
	var calcYmd = new Date(tmpYear,tmpMonth-1,day);
	var calcYear = (calcYmd.getFullYear()).toString();
	var calcMonth = (calcYmd.getMonth()+1).toString();
	var calcDay = (calcYmd.getDate()).toString();
	
    if (calcMonth.length < 2) calcMonth = "0" + calcMonth;
    if (calcDay.length < 2) calcDay = "0" + calcDay;	
	
    insYmd = calcYear+calcMonth+calcDay;
    
	return insYmd;
	
}

/**
 * input, textarea - 글자수 제한
 * @param aro_name - this
 * @param ari_max - '제한숫자'
 * @param contByte - 글자수 출력 id값
 */
function checkByte2(aro_name, ari_max, contByte) {
	var ls_str = aro_name.value;	// 이벤트가 일어난 컨트롤의 value 값
	
	var li_str_len = ls_str.length; // 전체길이
	viewCount2(li_str_len, ari_max, contByte);
	// 변수초기화
	var li_max = ari_max; // 제한할 글자수 크기
	var i = 0; // for문에 사용
	var li_byte = 0; // 한글일경우는 2 그밗에는 1을 더함
	var li_len = 0; // substring하기 위해서 사용
	var ls_one_char = ""; // 한글자씩 검사한다
	var ls_str2 = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.
	
	for (i=0; i< li_str_len; i++) {
		// 한글자추출
		ls_one_char = ls_str.charAt(i);
		
		// 한글이면 2를 더한다.
		if (escape(ls_one_char).length > 4){
//			li_byte += 2;	//바이트일 경우
			li_byte ++;		//글자수일 경우
		}else{ // 그밗의 경우는 1을 더한다.
			li_byte++;
		}
		
		// 전체 크기가 li_max를 넘지않으면
		if (li_byte <= li_max) {
			li_len = i + 1;
		}
	}
	
	// 전체길이를 초과하면
	if (li_byte > li_max) {
		alert( li_max + " 글자를 초과 입력할 수 없습니다. \n초과된 내용은 자동으로 삭제 됩니다. ");
		ls_str2 = ls_str.substr(0, li_len);
		aro_name.value = ls_str2;
//		$("#"+contByte).html("(<em>"+ ari_max + "</em>/"+ari_max+"자)");
		$("#"+contByte).text(ari_max);
		
	}
	
	aro_name.focus(); 
}

function viewCount2(str, ari_max, contByte){
	$("#"+contByte).html(str);
}

function n_logging(prodCd,tab,dept, product) {
	 var _n_logging_image = new Image();
	 _n_logging_image.src = "/m/log.html?page=" + prodCd + "&tab=" + tab + "&dept=" + dept + "&product=" + product ;
}

function calc_logging(param) {
	 var _n_logging_image = new Image();
	 _n_logging_image.src = "/m/log.html?calc=" + param;
}

function getProductName(type, tool) {
	var result = "";
	if(type=="1"){ result = "cancer";					//암
	}else if(type=="2"){ result = "term";				//정기
	}else if(type=="3"){ result = "accident";			//상해
	}else if(type=="4"){ result = "esaving";			//저축
	}else if(type=="5"){ result = "annuity";			//연금저축
	}else if(type=="7"){ result = "iannuity";			//연금
	}else if(type=="8"){ 
		if(tool == 'ga'){
			result = "Vsaving";
		}else{
			result = "variablesaving";
		}
	}else if(type=="9"||type=="10"||type=="11"||type=="12"||type=="13"||type=="14"||type=="16"||type=="17"){
		result = "medical";
	}
	
	return result;
}

//Kakao.init('5f7b7290abab7a6c7f34fd8b5f80fbc0');

function sendPlanToKakao(type) {
	//	상품 풀네임
	
	var url = location.origin + "/m";// + location.pathname;//"http://localhost:8080/m/";
	var pcUrl = location.origin;
	var imgSrc = 'https://direct.samsunglife.com' + '/resources/mobile/images/kakao';
	//var imgSrc = window.location.hostname + '/resources/mobile/images/kakao/';
	
	switch (type) {
	case "1":
		url += "/cancer.eds";
		pcUrl += "/cancer.eds";
		imgSrc += '/cancer.png';
		break;
	case "2":
		url += "/term.eds";
		pcUrl += "/term.eds";
		imgSrc += '/term.png';
		break;
	case "3":
		url += "/accident.eds";
		pcUrl += "/accident.eds";
		imgSrc += '/accident.png';
		break;
	case "4":
		url += "/esaving.eds";
		pcUrl += "/esaving.eds";
		imgSrc += '/esaving.png';
		break;
	case "5":
		url += "/annuity.eds";
		pcUrl += "/annuity.eds";
		imgSrc += '/annuity.png';
		break;
	case "7":
		url += "/iAnnuity.eds";
		pcUrl += "/iAnnuity.eds";
		imgSrc += '/iAnnuity.png';
		break;
	case "8":
		url += "/variableSaving.eds";
		pcUrl += "/variableSaving.eds";
		imgSrc += '/variableSaving.png';
		break;
	case "9":
	case "10":
	case "11":
	case "12":
	case "13":
	case "14":
	case "16":
	case "17":
		url += "/medical.eds";
		pcUrl += "/medical.eds";
		imgSrc += '/medical.png';
		break;
	case "15":
		url += "/dental.eds";
		pcUrl += "/dental.eds";
		imgSrc += '/dental.png';
		break;
	}
	
	
	if (typeof(calculatorForm) != "undefined") {
		url += "?kakao=" + calculatorForm.planSeq + "&org=cmail&pro=event&area=kakao";
		pcUrl += "?kakao=" + calculatorForm.planSeq + "&org=cmail&pro=event&area=kakao";
		
		/*Kakao.Link.sendTalkLink({
			label: calculatorForm.prdtnm,
			image:{
				src:imgSrc,
				width: '500',
		        height: '500'
			},
			webButton: {
	 	        text: '설계내역 바로가기',
	 	        url: url
	 	    }
		});*/
		/* 보장성은 calculatorForm.premium 이 없음
		 * Kakao.Link.sendDefault({
			objectType : 'commerce',
			content : {
				title : calculatorForm.prdtnm,
				imageUrl : imgSrc,
				link : {
					mobileWebUrl : url,
					webUrl : pcUrl
				},
				imageWidth : 800,
				imageHeight : 800
			},
			commerce :{
				regularPrice : calculatorForm.premium
			},
			buttons : [
			           {
			        	   title : '설계내역 바로가기',
			        	   link : {
			        		   mobileWebUrl : url,
			        		   webUrl : pcUrl
			        	   }
			           },
			           {
			        	   title : '이벤트 둘러보기',
			        	   link : {
			        		   mobileWebUrl : 'https://direct.samsunglife.com/m/event/eventList.eds',
			        		   webUrl : 'https://direct.samsunglife.com/event/list.eds'
			        	   }			        	   
			           }
			],
			installTalk : true
		});*/
		Kakao.Link.sendDefault({
			objectType : 'feed',
			content : {
				title : calculatorForm.prdtnm,
				imageUrl : imgSrc,
				link : {
					mobileWebUrl : url,
					webUrl : pcUrl
				},
				description : "이벤트 응모에 참여해보세요",
				imageWidth : 800,
				imageHeight : 800
			},
			buttons : [
			           {
			        	   title : '설계내역 바로가기',
			        	   link : {
			        		   mobileWebUrl : url,
			        		   webUrl : pcUrl
			        	   }
			           },
			           {
			        	   title : '이벤트 응모하기',
			        	   link : {
			        		   mobileWebUrl : 'https://direct.samsunglife.com/m/event/view.eds?id=1910&page=1',
			        		   webUrl : 'https://direct.samsunglife.com/event/view.eds?id=1910&page=1'
			        	   }			        	   
			           }
			],
			installTalk : true,
			social : {
				
			}
		});
		
		setTimeout(function(){
			getEventInfo('EVT10');
		}, 1000);
	} else {
		alert("상품의 계산 내역을 가져올수 없습니다.");
	}
}

// 이벤트 페이지 관련 카카오톡 링크 메세지
function sendEventToKakao(id, title, imgsrc) {
	//alert("id : " + id + "\ntitle : " + title + "\nimgSrc : " + imgSrc);
	
	var url = location.origin + "/m/event/view.eds?id=" + id;
	var imgSrc = imgsrc;
		
	//Kakao.init('5f7b7290abab7a6c7f34fd8b5f80fbc0');
	
	/*Kakao.Link.sendTalkLink({
		label: title,
		image:{
			src:imgSrc,
			width: '500',
	        height: '500'
		},
		webButton: {
 	        text: title,
 	        url: url
 	    }
	});*/
	Kakao.Link.sendDefault({
		objectType : 'feed',
		content : {
			title : title,
			imageUrl : imgSrc,
			link : {
				mobileWebUrl : url
			},
			description : "",
			imageWidth : 800,
			imageHeight : 800
		},
		buttons : [
		           {
		        	   title : '이벤트 참여하기',
		        	   link : {
		        		   mobileWebUrl : url
		        	   }
		           }
		],
		installTalk : true,
		social : {
			
		}
	});
}

/**
 * 이벤트 새창 및 팝업 띄움
 * EVT01: 간편설계
 * EVT03: 1단계
 * EVT05: 2단계
 * EVT06: 청약 완료
 * EVT07: 간편설계 저장
 * 이벤트 정보 확인
 * @param eventCode
 */
/*
function getEventInfo(eventCode) {
	var insuranceType = "";
	$.ajax({
		type : "POST",
		url : "/event/getEventInfo.eds",
		dataType : 'json',
		data : {
			'eventCode' : eventCode,
			'insuranceType' : insuranceType,
			'mobileCheck' : 'Y'
		},
		success : function(result) {
			if (result.success) {
				var eventId = result.eventId;
				eventid = result.eventId; // 전역 변수에 이벤트 번호 할당 (레이어 이벤트 팝업 응모 용도)
				var eventType = Number(result.eventType);
				var eventExtra = result.eventExtra;

				$.ajax({
					type : "POST",
					url : "/event/eventViewJson.eds",
					dataType : 'json',
					data : {
						'id' : eventId,
						'page' : 1
					},
					success : function(result) {
						if (result.success) {
							try {
								$.each(result.view.attachments, function(){
									if (this.type == 2) {
										$('#commonEventPop1img').html('<img src="' + this.fullPath + '" alt="' + this.description + '"><em>진행중</em>');
									}
								});
								$('#commonEventTitle').html(result.view.title);
								$('#commonEventDate').text(formatDate(result.view.startDate) + ' ~ ' + formatDate(result.view.endDate));
								if (result.view.rcmdTelCheck == 'Y') {
									$('#mobileRecommendPhoneArea').show();
								}
								if (result.view.popEventApplyCheck1 == 'Y') {
									$('#mobileKey1').html(result.view.popEventApplyKey1);
									$('#mobilePopEventApplyKey1').attr('placeholder', result.view.popEventApplyValue1);
									$('#mobilePopEventApplyKey1Area').show();
								}
								if (result.view.popEventApplyCheck2 == 'Y') {
									$('#mobileKey2').html(result.view.popEventApplyKey2);
									$('#mobilePopEventApplyKey2').attr('placeholder', result.view.popEventApplyValue2);
									$('#mobilePopEventApplyKey2Area').show();
								}
								if (result.view.popEventApplyCheck3 == 'Y') {
									$('#mobileKey3').html(result.view.popEventApplyKey3);
									$('#mobilePopEventApplyKey3').attr('placeholder', result.view.popEventApplyValue3);
									$('#mobilePopEventApplyKey3Area').show();
								}
							} catch (e) {
							}
						}
					},
					error : function() {
						alert('서버와 통신 중 오류가 발생했습니다.');
					}
				});

				var isPopup = true;

				// 이벤트 상세화면 확인(directEventView_) 및 일주일간 보지않기(popEventCookie)
				if ((typeof $.cookie("directEventView" + eventId) == 'undefined' && eventId == 1485) ||
						(typeof $.cookie("popEventCookie" + eventId) != 'undefined' && $.cookie("popEventCookie" + eventId) == 'Y')) {
					isPopup = false;
				}

				// 스크린의 크기
				//var screenWidth = screen.availWidth;
				//var screenHeight = screen.availHeight;
				// 창의 포지션
				//var pX = (screenWidth-pWidth) / 2;
				//var pY = (screenHeight-pHeight) / 2;
				//var settings = 'left=' + pX + ', top=' + pY + ',width=' + pWidth + ',height=' + pHeight + ',status=no, menubar=no, toolbar=no, scrollbars=yes, location=no';

				if (isPopup){
					// eventType(0:맞춤설계, 2:퀴즈, 3:설문, 5:기타)
					if (eventType == 2 || eventType == 3) {
						try {
							// if (confirm('응모가능한 이벤트가 있습니다.\n팝업 차단되어 있는 경우에는 먼저 팝업차단을 해제하셔야 합니다.\n확인하시겠습니까?')) {
								window.open('/m/event/view.eds?id=' + eventId, '_blank');
							// }
						} catch (e) {
							alert('새창 열기 중 오류가 발생했습니다.');
						}
					}
					// 맞춤설계형 응모팝업
					if (eventType == 0) {
						// if (confirm('응모가능한 이벤트가 있습니다.\n확인하시겠습니까?')) {
							eventid = result.eventId;
							mobileLayerPopEvent1.openOutput();
							$('#mobileEventPop1Name').focus();
						// }
					}

					// 창 크기
					if (eventType == 5) {
						try {
							if (eventExtra.mobile_popupUrl != '' && $.cookie("popEventCookie" + eventId) !== 'Y') {
								// if (confirm('응모가능한 이벤트가 있습니다.\n팝업 차단되어 있는 경우에는 먼저 팝업차단을 해제하셔야 합니다.\n확인하시겠습니까?')) {
								//window.open(eventExtra.mobile_popupUrl + '?id=' + eventId, 'width=820, height=700, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no');
								// }
								$('#container').after('<div id="eventContainer"></div><a href="#eventLayer" id="btnEventLayer" style="display:none;">btnEventLayer</a>');
								$('#eventContainer').load(eventExtra.mobile_popupUrl + '?id=' + eventId, function(){
									$plugin.popmodal($('#eventLayer'),{
										overlay : false,
										position_auto : false,
										scroll_doc : false,
										callback_after : function(){
											$('#btnEventLayer').click();
										}
									});
									$('html,body').animate({scrollTop : 0},0.1);
								});
							}
						} catch(e) {
						}
					}
				}
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다.');
		}
	});
}
*/

/**
 * 이벤트 새창 및 팝업 띄움
 * EVT01: 간편설계
 * EVT03: 1단계
 * EVT05: 2단계
 * EVT06: 청약 완료
 * EVT07: 간편설계 저장
 * 이벤트 정보 확인
 * @param eventCode
 */
function getEventInfo(eventCode, p_insuranceType) {
	
	var insuranceType = p_insuranceType == undefined ? "0" : p_insuranceType;
	
	$.ajax({
		type : "POST",
		url : "/event/getEventInfo.eds",
		dataType : 'json',
		data : {
			'eventCode' : eventCode,
			'insuranceType' : insuranceType,
			'mobileCheck' : 'Y'
		},
		success : function(result) {
			if (result.success) {
				var eventId = result.eventId;
				eventid = result.eventId; // 전역 변수에 이벤트 번호 할당 (레이어 이벤트 팝업 응모 용도)
				var eventType = Number(result.eventType);
				var eventExtra = result.eventExtra;

				$.ajax({
					type : "POST",
					url : "/event/eventViewJson.eds",
					dataType : 'json',
					data : {
						'id' : eventId,
						'page' : 1
					},
					success : function(result) {
						if (result.success) {
							try {
								$.each(result.view.attachments, function(){
									if (this.type == 5) {
										$('#commonEventPop1img').html('<img src="' + this.fullPath + '" alt="' + this.description + '"><em>진행중</em>');
									}
								});
								$('#commonEventTitle').html(result.view.title);
								$('#commonEventDate').text(formatDate(result.view.startDate) + ' ~ ' + formatDate(result.view.endDate));
								if (result.view.rcmdTelCheck == 'Y') {
									$('#mobileRecommendPhoneArea').show();
								}
								if (result.view.popEventApplyCheck1 == 'Y') {
									$('#mobileKey1').html(result.view.popEventApplyKey1);
									$('#mobilePopEventApplyKey1').attr('placeholder', result.view.popEventApplyValue1);
									$('#mobilePopEventApplyKey1Area').show();
								}
								if (result.view.popEventApplyCheck2 == 'Y') {
									$('#mobileKey2').html(result.view.popEventApplyKey2);
									$('#mobilePopEventApplyKey2').attr('placeholder', result.view.popEventApplyValue2);
									$('#mobilePopEventApplyKey2Area').show();
								}
								if (result.view.popEventApplyCheck3 == 'Y') {
									$('#mobileKey3').html(result.view.popEventApplyKey3);
									$('#mobilePopEventApplyKey3').attr('placeholder', result.view.popEventApplyValue3);
									$('#mobilePopEventApplyKey3Area').show();
								}
							} catch (e) {
							}
						}
					},
					error : function() {
						alert('서버와 통신 중 오류가 발생했습니다.');
					}
				});

				var isPopup = true;

				// 일주일간 보지않기 체크가 되어있으면
				if ((typeof $.cookie("directEventView" + eventId) == 'undefined' && eventId == 1485) ||
						(typeof $.cookie("popEventCookie" + eventId) != 'undefined' && $.cookie("popEventCookie" + eventId) == 'Y')) {
					isPopup = false;
				}

				if (isPopup){
					// eventType(0:맞춤설계, 2:퀴즈, 3:설문, 5:기타)
					if (eventType == 2 || eventType == 3) {
						try {
							// if (confirm('응모가능한 이벤트가 있습니다.\n팝업 차단되어 있는 경우에는 먼저 팝업차단을 해제하셔야 합니다.\n확인하시겠습니까?')) {
								window.open('/m/event/view.eds?id=' + eventId, '_blank');
							// }
						} catch (e) {
							alert('새창 열기 중 오류가 발생했습니다.');
						}
					}
					// 맞춤설계형 응모팝업
					if (eventType == 0) {
						// if (confirm('응모가능한 이벤트가 있습니다.\n확인하시겠습니까?')) {
							eventid = result.eventId;
							mobileLayerPopEvent1.openOutput();
							$('#mobileEventPop1Name').focus();
						// }
					}

					// 창 크기
					if (eventType == 5) {
						try {
							if (eventExtra.mobile_popupUrl != '' && $.cookie("popEventCookie" + eventId) !== 'Y') {
								// if (confirm('응모가능한 이벤트가 있습니다.\n팝업 차단되어 있는 경우에는 먼저 팝업차단을 해제하셔야 합니다.\n확인하시겠습니까?')) {
								//window.open(eventExtra.mobile_popupUrl + '?id=' + eventId, 'width=820, height=700, status=no, menubar=no, toolbar=no, scrollbars=yes, location=no');
								// }
								$('#container').after('<div id="eventContainer"></div><a href="#eventLayer" id="btnEventLayer" style="display:none">btnEventLayer</a>');
								$('#eventContainer').load(eventExtra.mobile_popupUrl + '?id=' + eventId, function(){
									$plugin.popmodal($('#eventLayer'),{
										overlay : false,
										position_auto : false,
										scroll_doc : false,
										callback_after : function(){
											$('#btnEventLayer').click();
										}
									});
									$('html,body').animate({scrollTop : 0},0.1);
								});
							}
						} catch(e) {
						}
					}
				}
			}
		},
		error : function() {
			alert('서버와 통신 중 오류가 발생했습니다.');
		}
	});
}

/**
 * element length limit
 * @param obj
 * @param value
 */
function setObjLength(obj, value) {
	if (obj.val().length > value) { 
		obj.val( obj.val().substr(0, value) ); 
	}
}

/**
 * Array 중복 체크
 * @param arr
 * @returns {Array}
 */
function eliminateDuplicates(arr) {
	var i, len = arr.length, out = [], obj = {};
	for (var i = 0; i < len; i++) {
		obj[arr[i]] = 0;
	}
	for (i in obj) {
		out.push(i);
	}
	return out;
}

/*
var test = [];
test[0] = 1;
test[1] = 2;
test[2] = 2;

alert(eliminateDuplicates(test));
*/
