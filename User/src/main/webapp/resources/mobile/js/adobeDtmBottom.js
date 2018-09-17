
	if(typeof _satellite != "undefined" && _satellite){
		_satellite.pageBottom();
	}else{
		// 개발,검증 시 빈 객체 선언
		var _satellite = {
				track : function(){}
		};
	}
	