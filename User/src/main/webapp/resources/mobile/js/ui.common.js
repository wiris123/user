/* **********************************************
 * 네임스페이스 생성
*********************************************** */
;(function(window, $){
	'use strict';

	var global = "$utils", nameSpace = "SAMSUNGLIFE.utils", nameSpaceRoot = null;

	function createNameSpace(identifier, module){
		var win = window, name = identifier.split('.'), p, i = 0;
		if(!!identifier){
			for (i = 0; i < name.length; i += 1){
				if(!win[ name[ i ] ]){
					if(i === 0){
						win[ name[ i ] ] = {};
						nameSpaceRoot = win[ name[ i ] ];
					} else {
						win[ name[ i ] ] = {};
					}
				}
				win = win[ name[ i ] ];
			}
		}
		if(!!module){
			for (p in module){
				if(!win[ p ]){
					win[ p ] = module[ p ];
				} else {
					throw new Error("module already exists! >> " + p);
				}
			}
		}
		return win;
	}
	if(!!window[ global ]){
		throw new Error("already exists global!> " + global);
	}
	/* ---------------------------------------------------------------------------
		namespace SAMSUNGLIFE.utils

		* 네임스페이스 생성
		* method namespace
		* memberof SAMSUNGLIFE.utils
		* param {Object} identifier 구분자
		* param {Object} module 네임스페이스 하위로 생성 할 객체
		* return createNameSpace
		* example
	--------------------------------------------------------------------------- */
	window[ global ] = createNameSpace(nameSpace, {
		namespace : function(identifier, module){
			return createNameSpace(identifier, module);
		}
	});
})(window, jQuery);

var ui;
var main_visual;
var ui_nav_scroll;
var ui_scroll_nav = new Array();
var ui_anicss = false;

/* **********************************************
 * SAMSUNGLIFE.common
*********************************************** */
;(function(window, $) {
	'use strict';

	ui = $utils.namespace('SAMSUNGLIFE.common', {
		/* ***************************************************
		 * ui script 초기화
		 * @methods init
		 * @memberof SAMSUNGLIFE.common
		**************************************************** */
		setUiLayout : function(){
			/* 전체메뉴 */
			$plugin.popmodal($('#asideMenu'), {
				overlay : false,
				position_auto : false,
				load_only : true,
				scroll_doc : false,
				scroll_doc_class : 'popopen2',
				modal_type : 'toggle',
				callback_load : function(){
					if($('#uiMenuScroll').length){
						ui_nav_scroll = new iScroll('uiMenuScroll',{
							onBeforeScrollStart: function(e) {
								// 더블클릭 이벤트 방지(android)
								e.preventDefault();
							},
							onScrollStart: function(e) {
								// 더블클릭 이벤트 방지(ios)
								e.stopImmediatePropagation();
							},
							bounce: false
						});
					}

					$plugin.togglecon($('.list-menu > li > a'),{
						toggle_type : 'tab',
						selector_group : true,
						selector : '.list-menu > li',
						selector_con : '> ul',
						callback_after : function(){
							ui_nav_scroll.refresh();
						}
					});
				},
				callback_after : function(){
				}
			});

			/* 하단 고정컨텐츠(바로가기메뉴) */
			$plugin.popmodal($('#asideFloatQuick'),{
				overlay_click : true,
				position_auto : false,
				modal_type : 'toggle',
				scroll_doc : false,
				scroll_doc_type : 'event',
				callback_load : function(){
					// 온정 이벤트 임시
					$('#asideFloatQuick').find('.box-temp').hide();
				},
				callback_after : function(){
					// 온정 이벤트 임시
					$('#asideFloatQuick').find('.box-temp').show();
				}
			});

			/*  linemap영역 : 셀렉트박스 디자인 */
			$('.nav-path').selectdesign({
				containerClass : 'nav-path',
				onClass : 'nav-on',
				list : 'ul',
				selectEl : 'li'
			});
		},
		/* ***************************************************
			폼객체 디버깅(placeholder : textarea)
		**************************************************** */
		setPlaceholder : function(){
			$('.placeholder').each(function(){
				if($(this).val()!="") $(this).addClass("valueon");
				else $(this).removeClass("valueon");
			});
			$(document).on('focus click', 'textarea.placeholder', function(){
				$(this).addClass("valueon");
			})
			.on('blur keyup change', 'textarea.placeholder, input.required', function(){
				if($(this).val()=="") $(this).removeClass("valueon");
				else $(this).addClass("valueon");
			})

			$(document).on('click', '.form-textarea > label', function(){
				$('#'+$(this).attr('for')).focus();
			});
		},
		/* ***************************************************
			폼객체 디버깅(체크/라디오)
		**************************************************** */
		setFormCheck : function(){

			$('input:checked').prev('label').addClass('on');
			$('input:not(:checked)').prev('label').removeClass('on');

			$('input:disabled').prev('label').removeClass('on').addClass('disabled');
			$('input:not(:disabled)').prev('label').removeClass('disabled');

			$(document).on('click', 'input[type="radio"], input[type="checkbox"]', function(){
				var $that = $(this);
				if ($that.is('input[type="checkbox"]')) {
					if($that.prop('checked')) $that.prev().addClass('on');
					else $that.prev().removeClass('on');
				} else if ($that.is('input[type="radio"]')) {
					$('input[name="'+ $that.attr('name') +'"]').each(function() {
						if (this == $that[0]) $(this).prev().addClass('on');
						else $(this).prev().removeClass('on');
					});
					if($that.parent('.label-star').length>0){
						$that.prevAll().addClass('on');
					}
				}
			})
			.on('focus', 'input[type="radio"], input[type="checkbox"]', function() {
				$(this).prev().addClass('focus');
			})
			.on('blur', 'input[type="radio"], input[type="checkbox"]', function() {
				$(this).prev().removeClass('focus');
			});

			$(document).on('click', '.form-email .label-check2 input[type="checkbox"]', function(){
				if($(this).prop('checked')) $(this).parents('.form-email').addClass('on');
				else $(this).parents('.form-email').removeClass('on');
			});
		},
		/* ***************************************************
			스크롤배너
		**************************************************** */
		contentScroll : function(){
			/* 페이징, 이동버튼 모두 */
			$('[data-banner="nav-all"] ul').bxSlider({
				useCSS: ui_anicss,
				infiniteLoop : false,
				hideControlOnEnd : true,
				oneToOneTouch : false
			});

			/* 페이징만 */
			$('[data-banner="nav-page"]:not([data-scroll="auto"]) ul').bxSlider({
				useCSS: ui_anicss,
				controls : false,
				infiniteLoop : false,
				oneToOneTouch : false,
				onSlideLoad : function(){
					if(nav_page_container!=null) nav_page_container.refresh();
				}
			});
			$('[data-banner="nav-page"][data-scroll="auto"] ul').bxSlider({
				useCSS: ui_anicss,
				controls : false,
				auto : true,
				pause : 2000,
				oneToOneTouch : false
			});

			/* 컨텐츠만 */
			if($('[data-banner="nav-none"] ul').children().length > 1){
				$('[data-banner="nav-none"] ul').bxSlider({
					useCSS: ui_anicss,
					controls : false,
					pager : false,
					auto : true,
					pause : 2000,
					oneToOneTouch : false
				});
			}

			/* 이동버튼만
			$('[data-banner="nav-controls"] ul').bxSlider({
				pager : false,
				infiniteLoop : false,
				oneToOneTouch : false
			});*/
		},
		/* ***************************************************
			스크롤탭 설정(Iscroll)
		**************************************************** */
		setScrollTab : function(){
			/* 스크롤탭 */
			var nav_scroll = $('.nav-scroll');
			nav_scroll.each(function(index){
				var nav_scroll_id = $(this).prop('id');
				var nav_scroll_list = $(this).find('> ul');
				var nav_scroll_width = 5;
				var nowIdx = 0;
				
				nav_scroll_list.find('> li').each(function(index){
					nav_scroll_width += $(this).outerWidth(true);
					if($(this).hasClass('on')){
						nowIdx = $(this).index(); 
					}
				});
				nav_scroll_list.css({"width":nav_scroll_width});

				ui_scroll_nav['ui'+nav_scroll_id] = new IScroll('#'+nav_scroll_id, {
					snap: 'li',
					scrollX : true,
					scrollY : false,
					mouseWheel: true,
					scrollbars: false,
					preventDefault: false
				});

				if(typeof ui_scroll_nav['ui'+nav_scroll_id].pages[nowIdx] != 'undefined'){
					ui_scroll_nav['ui'+nav_scroll_id].goToPage(nowIdx, 0);
				}else{
					ui_scroll_nav['ui'+nav_scroll_id].scrollToElement('li.on',400);
				}
				
				if(nav_scroll.find('.btn_prev')){
					nav_scroll.find('.btn_prev').click(function(){
						ui_scroll_nav['ui'+nav_scroll_id].prev(1000);
						return false;
					});
				}
				
				if(nav_scroll.find('.btn_next')){
					nav_scroll.find('.btn_next').click(function(){
						ui_scroll_nav['ui'+nav_scroll_id].next(1000);
						return false;
					});
				}
			});
		},
		/* ***************************************************
			선택객체위치 자동스크롤(영역)
		**************************************************** */
		autoScroll : function(element){
			var target_value = element.offset().top;
			if($('#uiNavFloat').length){
				target_value = target_value - $('#uiNavFloat').outerHeight();
			}
			$('html,body').animate({scrollTop : target_value},400);
		},
		/* ***************************************************
			선택객체위치 자동스크롤(폼객체)
		**************************************************** */
		targetScroll : function(element){
			var target_value = element.offset().top - element.outerHeight();
			if($('#uiNavFloat').length){
				target_value = target_value - $('#uiNavFloat').outerHeight();
			}
			$('html,body').animate({scrollTop : target_value},400);
			element.focus();
		},
		/* ***************************************************
			토글컨텐츠 선언
		**************************************************** */
		contentToggle : function(){
			/* 게시판형 */
			$plugin.togglecon($('.list-toggle > li > a'),{
				selector_group : true,
				selector : '.list-toggle > li',
				selector_btn : '> a',
				selector_con : ' > div'
			});

			/* 폼형 */
			$plugin.togglecon($('[data-toggle="form"] .toggle'),{
				selector : '[data-toggle="form"]',
				selector_btn : '.toggle',
				selector_con : '.con'
			});

			/* 약관 */
			$plugin.togglecon($('.form-agree > fieldset .toggle'),{
				selector_group : true,
				selector : '.form-agree > fieldset',
				selector_con : '.con'
			});
		},
		/* ***************************************************
			상품상세페이지
		**************************************************** */
		productEffect : function(){

			var ui_skip_nav = new Array();

			//상품기본탭
			if($('.product-tab').length>0){
				$plugin.togglecon($('.product-tab li > a'),{
					toggle_type : 'tab',
					selector_group : true,
					selector : '.product-tab li',
					selector_btn : '> a',
					selector_con : '#href',
					class_open : "on",
					callback_after : function(){
						//자동스크롤이동
						if($('#wrapper').hasClass('scrolling')){
							var scroll_value = $(".product-con.on").offset().top - $('#uiNavFloat').outerHeight(true);
							$('html,body').animate({scrollTop : scroll_value},600);
						}

						//스킵네비게이션 재호출
						var skip_id = $(".product-con.on").attr('id')+"Skip";
						var bxSetting = {
							controls : false,
							infiniteLoop : false,
							slideWidth : $(window).outerWidth()-30,
							minSlides : 2,
							maxSlides : 2
						}

						if(ui_skip_nav[skip_id] && ui_skip_nav[skip_id].reloadSlider){
							ui_skip_nav[skip_id].reloadSlider(bxSetting);
						}else{
							ui_skip_nav[skip_id] = $("#"+skip_id).find('> ul').bxSlider(bxSetting);
						}
					}
				});
			}

			//상세탭 스킵네비게이션
			var nav_skip = $('.menu-skip');
			nav_skip.each(function(index){
				var nav_skip_id = $(this).prop('id');
				var nav_skip_list = $(this).find('> ul');
				ui_skip_nav[nav_skip_id] = nav_skip_list.bxSlider({
					controls : false,
					infiniteLoop : false,
					slideWidth : nav_skip_list.outerWidth(),
					minSlides : 2,
					maxSlides : 2
				});
			});

			//상품서브 스킵네비
			$(document).on('click', '.menu-skip li a', function(e){
				e.preventDefault();
				var target_scroll = $("#"+$(this).prop('href').split("#")[1]).offset().top - 100;
				$('html,body').animate({scrollTop : target_scroll},400);
			});

			//계산결과 탭
			$plugin.togglecon($('.list-result li > a'),{
				toggle_type : 'tab',
				selector_group : true,
				selector : '.list-result > li',
				selector_btn : '> a',
				selector_con : '> .box',
				class_open : "on",
			});

			//스크롤 시 상단 고정영역 셀렉트박스를 통한 페이지이동
			$(document).on('change', '.nav-product select', function(){
				location.href=$(this).val();
			});

			//상세탭 : 필요성에서 강점으로 이동버튼
			$(document).on('click', '.detail-tab1 .btn-link', function(){
				$('.product-tab a[href="#uiTabProduct2"]').trigger('click');
			});
		},
		/* ***************************************************
			스크롤제어
		**************************************************** */
		scrollFixed : function(){
			var $base_position = 0;
			var $base_scroll = $('#header').height();
			var $base_height = 0;

			//fixed컨텐츠 기준 스크롤 체크 : fixed컨텐츠 스타일변경용
			if($('#wrapper #uiNavFloat:visible').length){
				$base_position = $('#uiNavFloat').offset().top;

				$(window).on('scroll',function(e){
					if($('#wrapper').hasClass('scrolling')){
						if($(window).scrollTop() <= $base_position){
							$('#wrapper').removeClass('scrolling');
						}
					}else{
						if($(window).scrollTop() >= $('#uiNavFloat').outerHeight() + $('#uiNavFloat').offset().top){
							$base_position = $('#uiNavFloat').offset().top;
							$('#wrapper').addClass('scrolling');
						}
					}
				});
			}
			//header 기준 스크롤 체크 : 상단으로 이동 버튼용
			$(window).on('scroll',function(e){
				if(!$('body').hasClass('popopen')){
					if($(window).scrollTop() >= $base_scroll){
						$('body').addClass('scroll');
					}else{
						$('body').removeClass('scroll');
					}
				}
			});

			/* 상단으로 이동버튼 : 기타 */
			$(document).on('click', '.btn-top', function(e){
				e.preventDefault(e);
				$('html,body').animate({scrollTop : 0},400);
			});
		},
		/* ***************************************************
			초기화선언
		**************************************************** */
		init: function() {
			ui.setUiLayout();			//기본레이아웃 설정
			ui.setFormCheck();		//라디오 및 체크박스 css디버깅용
			ui.contentScroll();		//스크롤컨텐츠 설정
			ui.contentToggle();		//토글컨텐츠설정
			ui.setPlaceholder();		//placeholder 설정(textarea)
			ui.productEffect();		//상품결과페이지
			ui.scrollFixed();			//scroll fixed 컨텐츠 설정
			ui.setScrollTab();			//scroll tab 설정

			/* 단순안내 레이어팝업 호출선언 */
			$('[data-pop="auto-call"]').each(function(){
				$plugin.popmodal($('#'+$(this).attr('id')));
			});

			/*
			window.addEventListener('load',function(){
				document.body.style.height = (document.documentElement.clientHeight + 5) + 'px';
				setTimeout(scrollTo, 0,0,1);
			},false);
			*/
		}
	});

	$(document).ready(ui.init);

} )(window, jQuery);

/* **********************************************
 * PLUGIN [popmodal]
 * 레이어팝업
*********************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$utils'].namespace('SAMSUNGLIFE.plugins', {
		popmodal : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.popmodal",
				methods = {},
				el = element,
				el_idvalue = element.attr('id'),
				el_ev = $('[href="#'+el_idvalue+'"]'),
				length = el.size(),
				pops = [],
				popmodals,
				defaults = {
					overlay : true,
					overlay_fixed : false,
					overlay_click : false,
					class_overlay : "modal-overlay",
					class_open : "open",
					selector_close : '.ui-close',
					selector_return : false,
					position_top : null,
					position_target : false,
					position_auto : true,
					load_display : false,
					load_img : false,
					load_animation : false,
					load_only : false,
					load_only_expect : false,
					scroll_doc : true,
					scroll_doc_type : 'class',
					scroll_doc_class : 'popopen',
					auto_focus : false,
					modal_type : "modal",
					callback_before: null,
					callback_load : null,
					callback_after: null
				};

			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					pops.push(window[short].popmodal($(tar), options));
				});
				return pops;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				popmodal.init : 초기화
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
				//methods.validation();
			};

			/* ---------------------------------------------------------------------------
				popmodal.initVars : 변수 초기화
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					id : pluginName + "-" + new Date().getTime(),
					pop : null,
					pop_ev : null,
					pop_close : null,
					popWidth : null,
					popHeight : null,
					modal : null,
					modalTop : null,
					active : false,
					overflow : null,
					scroll_value : null
				};
			};

			/* ---------------------------------------------------------------------------
				popmodal.initEvent : 이벤트 초기화
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				el.vars.pop = $("#"+el_idvalue);

				$(document).on("click.popmodal", 'a[href="#'+el_idvalue+'"]', function(event) {
					event.preventDefault();
					var href = el_ev.filter("a").attr("href") || el_ev.find("a").attr("href");
					el.vars.pop_ev = $(this);

					if(el.options.modal_type=="toggle"){
						if(!methods.display()){
							methods.pop();
						}else{
							methods.close();
						}
					}else{
						if(!methods.display()){
							methods.pop();
						}
					}
				});

				if(el.options.load_display){
					methods.popCall();
				}
			};

			/* ---------------------------------------------------------------------------
				popmodal.validation : href 값에 대한 element 유효성 검사.
			--------------------------------------------------------------------------- */
			methods.validation = function(){
			};

			/* ---------------------------------------------------------------------------
				popmodal.pop : 팝업 호출
			--------------------------------------------------------------------------- */
			methods.pop = function(){
				//변수설정
				el.vars.overflow = $("body").css("overflow");
				el.vars.popWidth = el.vars.pop.width();
				el.vars.popHeight = el.vars.pop.height();

				if(el.options.load_only){
					popmodals.each(function(index){
						if(popmodals[index]!=el && !popmodals[index].options.load_only_expect){
							popmodals[index].closeOutput();
						}
					});
				}

				if (typeof el.options.callback_before === 'function'){
					if(!el.options.callback_before.call(el.vars.pop_ev)) return;
				};

				//레이어팝업 출력
				methods.popShow();

				//브라우저 리사이즈시
				$(window).resize(function(){
					methods.setResize();
				});

				if(el.options.overlay_fixed){
					$(window).on("scroll",function(){
						if (!!el.vars.modal){
							el.vars.modal.css({ marginTop : $(window).scrollTop()*(-1) });
						}
					});
				}

			};
			/* ---------------------------------------------------------------------------
				popmodal.pop : 팝업 호출
			--------------------------------------------------------------------------- */
			methods.popCall = function(){
				el.vars.pop = el;
				if(el.options.selector_return) el.vars.pop_ev = $(el.options.selector_return);
				methods.pop();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popShow : 팝업 출력
			--------------------------------------------------------------------------- */
			methods.popShow = function(){
				el.vars.active = true;
				if(el.options.load_only_expect){
					$('body').addClass('ui-banner-open');
				}

				if(el.options.load_animation){
					el.vars.pop.slideDown(function(){
						$(this).addClass(el.options.class_open);
					});
				}else{
					el.vars.pop.addClass(el.options.class_open);
				}
				if(el.vars.pop_ev!=null) el.vars.pop_ev.addClass(el.options.class_open);

				//닫기버튼포커스 및 이벤트설정
				if (!!el.options.selector_close){
					el.vars.pop_close = el.find(el.options.selector_close);
					if(el.vars.pop_close){
						if(el.options.auto_focus) el.vars.pop_close.eq(0).focus();
						else $(el.vars.pop_ev).focus();
					}
					el.vars.pop_close.off("click.popmodal").on("click.popmodal", function(event){
						event.preventDefault();
						methods.close();
					});
				}

				//바닥페이지 스크롤설정
				if(!el.options.scroll_doc){
					if(el.options.scroll_doc_type=="class"){
						el.vars.scroll_value = $(window).scrollTop();
						$('body').addClass(el.options.scroll_doc_class);
						$('html,body').animate({scrollTop : 0},0.1);
					}
					else{
						$('body').bind('touchmove.Modal', function(e){e.preventDefault()});
					}
				}

				//이미지로드 후 레이어팝업 포지션 재설정시
				if(el.options.load_img){
					el.vars.pop.find("img").load(function(){
						methods.setResize();
					});
				}

				//로드 콜백함수 실행
				if (typeof el.options.callback_load === 'function'){
					el.options.callback_load.call(el.vars.pop);
				};

				//위치조정
				methods.setResize();

				//모달출력
				methods.modalCreate();
			};
			/* ---------------------------------------------------------------------------
				popmodal.setResize : 팝업 위치설정
			--------------------------------------------------------------------------- */
			methods.setResize = function(){
				if(el.options.position_auto){
					var browser_width = $(window).width();
					var browser_height = $(window).height();
					var layer_width = el.vars.pop.outerWidth();
					var layer_height = el.vars.pop.outerHeight();
					var margin_left = Math.floor(layer_width /2) * (-1) + 'px';
					var position_top = $(window).scrollTop() + ((browser_height-layer_height)/2);

					if(browser_height<=layer_height) position_top = $(window).scrollTop();
					if(el.options.position_top) position_top  = el.options.position_top + $(window).scrollTop();

					if(el.options.position_target){
						el.vars.pop.css({
							"top" : el.vars.pop_ev.position().top
						});
					}else{
						el.vars.pop.css({
							"top" : position_top
						});
					}
				}
			};
			/* ---------------------------------------------------------------------------
				el.close : 팝업 닫기 실행(외부호출)
			--------------------------------------------------------------------------- */
			el.closeOutput = function(){
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				el.close : 팝업 열기 실행(외부호출)
			--------------------------------------------------------------------------- */
			el.openOutput = function(etarget){
				if(etarget){
					if(etarget.tagName=="SPAN") etarget = $(etarget).parent();
					el.vars.pop_ev = $(etarget);
				}
				methods.popCall();
			};
			/* ---------------------------------------------------------------------------
				el.openCheck : 팝업 디스플레이 상태
			--------------------------------------------------------------------------- */
			el.openCheck = function(){
				return methods.display();
			};
			methods.display = function(){
				return el.vars.active;
			};
			/* ---------------------------------------------------------------------------
				popmodal.close : 팝업 닫기 실행
			--------------------------------------------------------------------------- */
			methods.close = function(){
				if (typeof el.options.callback_after === 'function'){
					el.options.callback_after.call();
				};
				methods.popHide();
			};
			/* ---------------------------------------------------------------------------
				popmodal.popHide : 팝업 숨기기
			--------------------------------------------------------------------------- */
			methods.popHide = function(){
				$(window).off("resize.popmodal");

				if(el.options.load_only_expect){
					$('body').removeClass('ui-banner-open');
				}

				if (!!el.vars.pop){
					if(el.options.load_animation){
						el.vars.pop.slideUp(function(){
							$(this).removeClass(el.options.class_open);
						});
					}else{
						el.vars.pop.removeClass(el.options.class_open);
					}
					if(el.vars.pop_ev!=null) el.vars.pop_ev.removeClass(el.options.class_open);
				}

				methods.modalRemove();

				if (!!el.vars.this_close){
					el.vars.this_close.off("click.popmodal");
				}
				el.vars.active = false;

				//if(!!el.vars.pop_ev) el.vars.pop_ev.focus();

				if(!el.options.scroll_doc){
					if(el.options.scroll_doc_type=="class"){
						$('body').removeClass(el.options.scroll_doc_class);
						if(!!el.vars.pop_ev) $('html,body').scrollTop(el.vars.scroll_value);
					}
					else{
						$('body').unbind('touchmove.Modal');
					}
				}

				el.vars.scroll_value = null;
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalCreate : 모달생성
			--------------------------------------------------------------------------- */
			methods.modalCreate = function(zindex){
				if (!!el.options.overlay){
					var id = el_idvalue + "Overlay";
					if(!el.vars.modal){
						var modal_el = $('<div id="' + id + '" class="'+el.options.class_overlay+'"></div>')
						el.before(modal_el);
						el.vars.modal = modal_el;

						el.vars.modal = el.vars.modal.css({
							"width" : $(document).width(),
							"height" : $(document).height()
						});

						if(el.options.overlay_fixed){
							el.vars.modal.css({ marginTop : $(window).scrollTop()*(-1) });
						}

						if(el.options.overlay_click){
							el.vars.modal.on("click.popmodal", function(event){
								methods.close();
							});
						}
					}
				}
			};
			/* ---------------------------------------------------------------------------
				popmodal.modalRemove : 모달삭제
			--------------------------------------------------------------------------- */
			methods.modalRemove = function(){
				if (!!el.vars.modal){
					el.vars.modal.off("click.popmodal");
					el.vars.modal.remove();
					el.vars.modal = null;
				}
			};

			methods.init();

			popmodals = $(document).data(pluginName);
			if (!popmodals){
				popmodals = $([]);
			}

			if ($.inArray(el, popmodals) === -1){
				popmodals.push(el);
			}
			$(document).data(pluginName, popmodals);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);

/* **********************************************
 * PLUGIN [togglecon]
 * 토글컨텐츠
*********************************************** */
;(function(window, $){
	'use strict';
	var short = '$plugin';

	window[short] = window['$utils'].namespace('SAMSUNGLIFE.plugins', {
		togglecon : function(element, options){
			var version = "0.0.1",
				pluginName = "publish.togglecon",
				methods = {},
				el = element,
				length = el.size(),
				toggles = [],
				togglecons,
				defaults = {
					toggle_type : 'toggle',
					selector_group : false,
					selector : '[data-toggle="wrapper"]',
					selector_btn : '[data-toggle="btn"]',
					selector_con : '[data-toggle="content"]',
					selector_close : '[data-toggle="close"]',
					event_btn : 'click',
					class_open : "open",
					auto_scroll : false,
					txt_state : false,
					txt_state_open : "열기",
					txt_state_close : "닫기",
					callback_before : null,
					callback_after : null
				};

			if (length < 1) return;
			if (length > 1){
				el.each(function(i, tar){
					toggles.push(window[short].togglecon($(tar), options));
				});
				return toggles;
			}
			if (el.data(pluginName)) return;

			/* ---------------------------------------------------------------------------
				togglecon.init : 초기화
			--------------------------------------------------------------------------- */
			methods.init = function(){
				methods.initVars();
				methods.initEvent();
			};

			/* ---------------------------------------------------------------------------
				togglecon.initVars : 변수 초기화
			--------------------------------------------------------------------------- */
			methods.initVars = function(){
				el.options = $.extend({}, defaults, options);
				el.vars = {
					this_group : null,
					this_wrapper : null,
					this_btn : null,
					this_con : null,
					this_close : null,
					this_index : 0
				};
			};

			/* ---------------------------------------------------------------------------
				togglecon.initEvent : 이벤트 초기화
			--------------------------------------------------------------------------- */
			methods.initEvent = function(){
				el.vars.this_btn = el;
				el.vars.this_wrapper = el.parents(el.options.selector);

				if(el.options.selector_con=="#href") el.vars.this_con = $(el.vars.this_btn.attr("href"));
				else el.vars.this_con = el.vars.this_wrapper.find(el.options.selector_con);

				if(el.vars.this_wrapper.hasClass(el.options.class_open)){
					el.vars.this_con.addClass(el.options.class_open);
				}

				/* 이벤트설정 */
				el.vars.this_btn.off('click.togglecon').on('click.togglecon', function(event) {
					event.preventDefault();

					if (!el.vars.this_con.hasClass(el.options.class_open) || el.options.toggle_type=="tab" ) {
						methods.conShow();
					} else {
						methods.conHide();
					}

					if (typeof el.options.callback_after === 'function'){
						el.options.callback_after.call(el.vars);
					};
				});
			};

			/* ---------------------------------------------------------------------------
				togglecon.conShow : 컨텐츠 열기
			--------------------------------------------------------------------------- */
			methods.conShow = function(){

				if(el.options.selector_group){
					el.vars.this_wrapper.siblings().removeClass(el.options.class_open);
					el.vars.this_wrapper.siblings().find(el.options.selector_con).removeClass(el.options.class_open);

					if(el.options.txt_state){
						el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
							$(this).attr('title',$(this).attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
						});
					}
				}

				el.vars.this_wrapper.addClass(el.options.class_open);
				el.vars.this_con.addClass(el.options.class_open);

				if(el.options.txt_state){
					el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_open,el.options.txt_state_close));
				}

				if(el.options.selector_con=="#href" && el.options.selector_group){
					el.vars.this_wrapper.siblings().find(el.options.selector_btn).each(function(){
						$($(this).attr('href')).removeClass(el.options.class_open);
					});
				}

				if(el.options.auto_scroll){
					var scroll_value = $(el.vars.this_con).offset().top;
					$('html,body').animate({scrollTop : scroll_value},400);
				}

				//닫기버튼 이벤트설정
				if (!!el.options.selector_close){
					el.vars.this_close = el.vars.this_wrapper.find(el.options.selector_close);
					el.vars.this_close.off("click.togglecon").on("click.togglecon", function(event){
						event.preventDefault();
						methods.conHide();
						$(el.vars.this_btn).focus();
					});
				}
			};
			/* ---------------------------------------------------------------------------
				togglecon.conHide : 컨텐츠 닫기
			--------------------------------------------------------------------------- */
			methods.conHide = function(){

				el.vars.this_wrapper.removeClass(el.options.class_open);
				el.vars.this_con.removeClass(el.options.class_open);

				if(el.options.txt_state){
					el.vars.this_btn.attr('title',el.vars.this_btn.attr('title').replace(el.options.txt_state_close,el.options.txt_state_open));
				}

				if (el.vars.this_close){
					el.vars.this_close.off("click.togglecon");
				}
			};

			methods.init();

			togglecons = $(document).data(pluginName);

			if (!togglecons){
				togglecons = $([]);
			}

			if ($.inArray(el, togglecons) === -1){
				togglecons.push(el);
			}
			$(document).data(pluginName, togglecons);
			el.data(pluginName, el);
			return el;
		}
	});
})(window, jQuery);

/***********************************************
* selectbox list
************************************************/
;(function($) {

	$.fn.selectdesign = function(options){
		return this.each(function(){
			var opts = $.extend({}, $.fn.selectdesign.defaults, options || {});
			options = options || {};
			var $cont = $(this);
			var $headline = $cont.find(opts.headline).eq(0);
			var $list = $cont.find(opts.list);
			var $list_option = $list.find(opts.selectEl);
			var $list_option_e = $list.find(opts.selectEvent);
			var $cont_name = $list_option_e.eq(0).attr("name");

			//데이터초기화
			var $selected_index = 0;

			if($list.find("."+opts.selectedClass).length){
				$selected_index = $list_option.index($list.find(opts.selectEl+"."+opts.selectedClass));
				var default_text = $list_option_e.eq($selected_index).html();
			}else{
				var default_text = $headline.html();
			}

			$list.addClass("hd");

			if(opts.headlineDefault){
				$headline.empty().append(opts.headlineDefault);
			}else{
				$headline.empty().append(default_text);
			}

			if(opts.focusFlag) $headline.focus();

			//옵션리스트 열기/닫기
			$headline.unbind();
			$headline
				.bind("click",function(event){
					event.stopPropagation();
					event.preventDefault();
					if($cont.hasClass(opts.onClass)){ selectClose(); }
					else{ selectOpen();}
				})
				.bind("focus",function(){$cont.addClass(opts.focusClass);})
				.bind("blur",function(){$cont.removeClass(opts.focusClass);});

			$(document).bind('click', function() {
				if($cont.hasClass(opts.onClass)){ selectClose(); }
			});

			//옵션선택이벤트
			$list_option_e.unbind();
			$list_option_e
				.bind("click",function(event){
					$list_option.removeClass(opts.selectedClass);
					$(this).parent().addClass(opts.selectedClass);

					$headline.empty().append($(this).html());
					if(this.href.indexOf('#none') != -1) event.preventDefault();

					//selectClose();
					if(typeof opts.callBack === 'function') {
						return opts.callBack.call(this);;
					}
				})
				.bind("focus mouseover",function(){
					$cont.addClass(opts.focusClass);
					$(this).parent().addClass("focus");
				})
				.bind("blur mouseout",function(){
					$cont.removeClass(opts.focusClass);
					$(this).parent().removeClass("focus");
				});

			//셀렉트오픈
			function selectOpen(){
				$("."+opts.onClass).removeClass(opts.onClass);
				$cont.addClass(opts.onClass);
				$cont.parents(".wrap").addClass("wrap-on");
				$list.removeClass("hd");
				//selectUlPos();
			}

			//셀렉트close
			function selectClose(){
				$cont.removeClass(opts.onClass);
				$list.addClass("hd");
				$cont.parents(".wrap").removeClass("wrap-on");
				$headline.focus();
			}

			//셀렉트옵션 포지션
			function selectUlPos(){
				var containerPosY = $cont.offset().top,
				docHeight = jQuery(window).height(),
				scrollTop = jQuery(window).scrollTop();
				newUIHeight = $list.outerHeight();
				containerPosY = containerPosY - scrollTop + newUIHeight + $cont.outerHeight();
				if($("#footer")) containerPosY += $("#footer").outerHeight()+10;

				if (containerPosY >= docHeight){
					$list.css({
						top : (-1)*newUIHeight
					});
				}
			}

		});
	}

	$.fn.selectdesign.defaults = {
		containerClass : "select-list",
		onClass : "select-on",
		focusClass : "focus",
		headline : ".headline",
		headlineDefault : false,
		list : ".list-option",
		selectEl : "li",
		selectEvent : "a",	//a / input
		selectedClass : "selected",
		listWidth : 220,
		callBack : null,
		focusFlag : false
	};

})(jQuery);

/***********************************************
* 메인 비주얼 슬라이드
************************************************/
;(function(window, $) {
	var main = 'main';
	window[main] = $utils.namespace('SAMSUNGLIFE.main', {
		visualSlide : function() {
			// 초기 슬라이드 영역 화면에서 숨김 처리 해제
			$('.main-visual').css('visibility', 'visible');

			main_visual = $('.main-visual .list').bxSlider({
				startSlide: 0,
				controls : false,
				infiniteLoop: false,
				auto : true,
				oneToOneTouch : false,
				pause : 4000,
				onSliderLoad : function(index){
					animate($('.visual1'), 1, index);
				},
				onSlideBefore: function(obj, oldIndex, index, slider) {
					if (index > oldIndex) {
						dir = 1;
					} else {
						dir = 0;
					}
					animate(obj, dir, index);
				},
				onSlideAfter : function(obj, oldIndex, index, slider){
					$(main_visual.selector).find('> li').removeClass('on');
					obj.addClass('on');
					if (index == main_visual.getSlideCount() - 1 && slider.interval) {
						setTimeout(function() {
							main_visual.goToSlide(0);
						}, 3500);
					}
				}

			});

			var tween;
			function animate(obj, dir, index) {
				var el = obj;
				var pos = {
					'text': {
						x: dir > 0 ? '120%' : '-120%'
					},
					'btn': {
						'x': dir > 0 ? '50%' : '-50%',
						'autoAlpha': 0
					},
					'aniBox': {
						'x': dir > 0 ? '120%' : '-120%',
						'autoAlpha': 0,
						'delay': 0.1
					},
					'subAni': {
						'y': '20%',
						'autoAlpha': 0,
						'delay': 0.1
					}
				};
				//console.log(pos);
				el.text = el.find('.txt');
				el.btn = el.find('.btn');
				el.aniBox = el.find('.ani-box');
				el.subAni = el.find('.sub-ani');
				el.minutes = el.find('.minutes');
				el.hours = el.find('.hours');

				TweenMax.killAll();
				TweenMax.set(el.text, {'visibility': 'hidden', 'opacity': 1, x: '0%'});
				TweenMax.set(el.btn, {'visibility': 'hidden', 'opacity': 1, x: '0%'});
				TweenMax.set(el.aniBox, {'visibility': 'hidden', 'opacity': 1, y: '0%', x: '0%', scale: 1});
				TweenMax.set(el.subAni, {'visibility': 'hidden', 'opacity': 1, x: '0%'});
				TweenMax.set(el.minutes, {rotation: 0});
				TweenMax.set(el.hours, {rotation: 90});

				TweenMax.from(el.text, 0.8, {x: pos.text.x, autoAlpha: 0});
				TweenMax.from(el.btn, 0.8, {x: pos.btn.x, autoAlpha: pos.btn.autoAlpha});
				TweenMax.from(el.aniBox, 0.8, {x: pos.aniBox.x, autoAlpha: pos.aniBox.autoAlpha, delay: pos.aniBox.delay, onComplete: function() {

					tween = TweenMax.from(el.subAni, 0.4, {y: pos.subAni.y, autoAlpha: pos.subAni.autoAlpha, onComplete: function() {
						var count = 0;
						if (index === 0) {

							intervalId = setInterval(function() {
								if (count > 5) {
									clearInterval(intervalId);
									return;
								}
								count += 1;
								el.subAni.toggleClass('click');
							}, 300);
						}

						if (index === 1 || index === 3) {
							TweenMax.from(el.minutes, 1.5, {css: {rotation: -360}, repeat: 0, ease: Power0.easeNone});
							//TweenMax.from(el.hours, 1, {css: {rotation: -270}, repeat: 0, ease: Power0.easeNone});
						}

						if (index === 2) {
							TweenMax.to(el.subAni, 0.8, {x: 63, scale: 0.9, delay: 0.1, repeat: 0, repeatDelay: 0.7, yoyo: true, ease: Power3.easeInOut});
						}

					}});
				}});

			}
		},

		contentScroll: function() {
			var scroll = this.pageScroll();
			var el = $('.btn-up');
			var pos = $('#content').offset().top - $('#header').height();
			//var t1 = TweenMax.to(window, 1, {scrollTo: {y: pos}, ease: Power2.easeOut, paused: true});
			var t2 = TweenMax.to(el, 1, {rotation: -180, ease: Power2.easeOut, paused: true});
			//t1.stop() ;
			el.on('click', function(e) {
				e.stopPropagation();

				e.preventDefault();
				$(this).toggleClass('active');
				if ($(this).hasClass('active')) {
					//t1.play();
					//t2.play();
					scroll.scrollTo(0, -1*($("#uiMainVisual").outerHeight(true)), 1000);
					$('#wrapper').addClass('srollpage');
				}
				//} else {
					//t1.reverse();
					//t2.reverse();
				//	scroll.scrollTo(0, 0, 1000);
				//	$('#wrapper').removeClass('srollpage')
				//}
			});
		},

		pageScroll: function() {

			var nav_page_container = new iScroll('scrollpage',{
				onScrollMove : function(e){
					if(this.y<(-15)) $('#wrapper').addClass('srollpage');
					else $('#wrapper').removeClass('srollpage');
				},
				onBeforeScrollStart: function(e) {
					// 더블클릭 이벤트 방지(android)
					e.preventDefault();
				},
				onScrollStart: function(e) {
					// 더블클릭 이벤트 방지(ios)
					e.stopImmediatePropagation();
				},
				bounce: false
			});

			setTimeout(function(){
				nav_page_container.refresh();
			},100);

			return nav_page_container;
		},

		init: function() {
			this.visualSlide();
			this.contentScroll();
			this.pageScroll();
		}
	});

	$(function() {
		//window[main].init();
	})

})(window, jQuery);