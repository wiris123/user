
//var vAOS = '<script language="javascript" src="/plugin/aos/aosmgr_common.js"></script>';

function fn_SecureModule(){
	//document.write(vAOS);
	//window.setTimeout(usr_start_onload, 100);
	window.setTimeout(astx_init, 100);
}

//보안모듈 설치페이지 이동
function installPage() {
	window.location.href = "/plugin/installSecurityModule.html?url="+encodeURIComponent(window.location.pathname);
}

// ASTx 초기화
function astx_init() {
	$ASTX2.init(
		function onSuccess() {
			$ASTX2.setE2EAllExceptInputs();
			$ASTX2.initNonE2E();
		},
		function onFailure() {
			var errno = $ASTX2.getLastError();
			if(errno == $ASTX2_CONST.ERROR_NOTINST) {
				//installPage();
			}else {
				 // error handling
			alert("ASTx ERROR : "+errno);
			}
		},
		1000
	);
}

//AOS 초기화
function usr_start_onload() {
	
	if (!aos_is_new()) {
		installPage();
	} else {
		aos_set_authinfo("aosmgr_samsunglife.html");
		aos_set_subclsid("40", "59B0298B-A7B5-4045-A34E-377EDF7BCB8E");
		aos_set_submimetype("40", "application/ahnlab/asp/npmkd25sp");
		aos_set_option("mkd_protect_level", "default");
		aos_write_object();
		aos_start_ex();
	}
}

//http/https 혼용 사이트에서 https로 서비스 이용해야 할 경우
function redirectSSLService() {
	if(document.location.hostname != "llounge.samsunglife.com" && document.location.hostname != "ldirect.samsunglife.com") {
		if (window.location.protocol != "https:") {
			window.location.replace("https" + window.location.href.substring(4));
			return true;
		}
	}
}

function fnCheckInstall() {
	
	var isInstallAOS  = false;
	var isInstallXW   = false;
	var isInstallIMPdf = false;
	var pdfObj = null;
	
	try {
		if (aos_is_new() == false) {	
		} else {
			isInstallAOS = true;
		}
	} catch (e) {}
	
	try {
		if (!XecureWeb.IsNeedUpdate()) {
			isInstallXW = true;
		} 
	} catch (e) {}
	
	if (navigator.appName == "Microsoft Internet Explorer") {
		try {
			pdfObj = new ActiveXObject('Inpion.IMPdfViewer.1');
		} catch (e) {
		}
	} else {
		
		var pdfMime = navigator.mimeTypes["application/x-impdfviewer"];
		if (typeof pdfMime != "undefined") {
			pdfObj = "";
		}
	}
	
	if( pdfObj !=null) isInstallIMPdf = true;
	
	//alert("isInstallAOS :: " + isInstallAOS + " isInstallXW :: "+ isInstallXW + " isInstallIMPdf :: " + isInstallIMPdf)
	
	return isInstallAOS && isInstallXW && isInstallIMPdf;
}


fn_SecureModule();
