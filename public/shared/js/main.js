// ============================================================
// ＠＠
// メイン処理
// 
// %update / 2013.02.20
// 
// %use / jquery
// %use / jquery cookie
// ============================================================

// 名前の衝突をふせぐために名前空間を用意する
var MAIN;
if( ( MAIN && ( (typeof MAIN !== 'object') || !('isNamespace' in MAIN) ) ) || (MAIN === false) || (MAIN === 0) ) {
	throw new Error('"MAIN" already exists! You cannot define "MAIN".');
} else if( MAIN && ('isNamespace' in MAIN) ) {
	throw new Error('Namespace "MAIN" already exists!');
}
MAIN = {};  // 名前空間用のオブジェ生成
MAIN.toString = function() { return '[object MAIN(is Namespace)]'; };
MAIN.isNamespace = true;


// ------------------
// 【定数・変数】
// ------------------

// 画像ロールオーバー
MAIN.roOver = {  
clsroOver :	'rollover' //,ロールオーバーのCSSセレクタ
}

// カレント処理
MAIN.CrNavi = {
strCrNavi : '_on', //カレント時画像に付加する文字列
//▼グローバルナビ
slcGlvNaviArea : '#GNaviArea', //グローバルナビエリアのCSSセレクタ
regGlvNavi : 'crGlbNavi[^ ]+', //トリガークラスの正規表現
//▼サブナビ
slcSubNaviArea : '#SNaviArea', //サブナビエリアのCSSセレクタ
regSubNavi : 'crSubNavi[^ ]+' //,トリガークラスの正規表現
}

// スムースページスクロール
MAIN.smScloll = {
speedScroll : 0.4,  // スクロールスピード（sec）
clsSmScloll : 'smoothScroll', //スムースページスクロールのクラス
winTopPx : 0 //ウインドウトップ座標
}

// ポップアップ
MAIN.popUp = {
slcBtn : '.openPopup', //ポップアップ実行ボタンのCSSセレクタ
slcData : '.popupData' //ポップアップの引数を格納するCSSセレクタ
}

// 文字サイズ切替
MAIN.setFont = {
slcResizeArea : '#MainContentArea', //フォントサイズ変更エリアのCSSセレクタ
slcSetFtArea : '#SetFontSize', // フォントサイズ変更ボタンエリアのCSSセレクタ
slcSetFtBtn : '#SetFontSize .setFont' //フォントサイズ変更ボタンのCSSセレクタ
}

MAIN.clsHide = 'cmHide' // 非表示用のクラス名
MAIN.clsCr = 'cmCurrent' // カレント時に付加するのクラス

// ------------------
// 【関数】
// ------------------
// ■ポップアップ
// %param / url:String / URL
// %param / [name:String] / ウインドウ名（default:''）
// %param / [width:Number] / 幅（default:700）
// %param / [height:Number] / 高さ（default:660）
// %param / [opt:String] / 幅、高さ以外のオプション用の文字列（default:'toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1'）
// ------
// %return / :Window / 新規ウィンドウ（失敗のときは『null』）
MAIN.openPopup = function(url, name, width, height, opt) {
	if( (url === '') || (typeof url !== 'string') ) { return null; }

	name = ( (name !== '') && (typeof name === 'string') )? name : '';
	width = ( (width > 0) && (width !== null) && (width !== '') && (! isNaN(width) ) && (typeof width !== 'object') && (typeof width !== 'boolean') )? parseInt(width) : 700;
	height = ( (height > 0) && (height !== null) && (height !== '') && (! isNaN(height)  ) && (typeof height !== 'object') && (typeof height !== 'boolean') )? parseInt(height) : 660;
	opt = ( (opt !== '') && (typeof opt === 'string') )? opt : 'toolbar=0,location=0,directories=0,status=0,menubar=1,scrollbars=1,resizable=1';

	opt = 'width=' + width + ',height=' + height + ',' + opt;
	return window.open(url, name, opt);
};

// ■ポップアップをとじる
// %param / なし
MAIN.closePopup = function(){ 
	var nvua = navigator.userAgent; 
	if(nvua.indexOf('MSIE') >= 0){ 
		if(nvua.indexOf('MSIE 5.0') == -1) { 
			top.opener = ''; 
		} 
	} 
	else if(nvua.indexOf('Gecko') >= 0){ 
		top.name = 'CLOSE_WINDOW'; 
		wid = window.open('','CLOSE_WINDOW'); 
	} 
	top.close(); 
}

// ■透過PNGフェード処理対応
// %param / target //ターゲットのCSSセレクタ（img）を指定
MAIN.fncAddAIL = function(target) {
	//IE7,8の時だけ処理
	strUAgent = window.navigator.appVersion.toLowerCase(); //ユーザエージェント
	if(strUAgent.indexOf('msie 7.') != -1 || strUAgent.indexOf('msie 8.') != -1){
		$(target).each(function(){
			if(($(this).attr('src').indexOf('.png') != -1) && ($(this).parent().hasClass('addAIL') == false)){
				var img = new Image();
				img.src = $(this).attr('src');
				$(this).wrapAll('<span class="addAIL"></span>');
				$(this).parent('.addAIL').css({
					'height':  img.height + 'px',
					'width':  img.width + 'px',
					'display': 'block',
					'cursor': 'pointer',
					'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + $(this).attr('src') + '", sizingMethod="scale")'
				});
				$(this).css('visibility', 'hidden');
			}
		});
	}
}

// ■CUD切替処理
// %param / なし
MAIN.fncSetCUDMode = function () {
	if ( $.cookie('CUDMode') == 'CUDOn' ) {
		$('#ContentWrap').addClass('changeCUD');
		$('.changeCUDImg img').each(function() {
			$(this).attr('src', $(this).attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1'+'_cud'+'$2'));
			$(this).attr('src', $(this).attr('src').replace(/^(.+)_cud_cud(\.[a-z]+)$/, '$1'+'_cud'+'$2'));
			//console.log($(this).attr('src'));
        });
		$('.changeCUDImg .addAIL').each(function() {
			$(this).css('filter', $(this).css('filter').replace(/([^\.]+).png([^ ]+)/, '$1'+'_cud.png'+'$2'));
			$(this).css('filter', $(this).css('filter').replace(/([^\.]+)_cud_cud.png([^ ]+)/, '$1'+'_cud.png'+'$2'));
			//console.log($(this).css('filter'));
        });
	}else {
		$.cookie('CUDMode', 'CUDOff', { path: '/', expires: '' });
		$('#ContentWrap').removeClass('changeCUD');
		$('.changeCUDImg img').each(function() {
        	$(this).attr('src', $(this).attr('src').replace(/^(.+)_cud(\.[a-z]+)$/, '$1$2'));
		});
		$('.changeCUDImg .addAIL').each(function() {
    		$(this).css('filter', $(this).css('filter').replace(/([^\.]+)_cud.png([^ ]+)/, '$1'+'.png'+'$2'));
			//console.log($(this).css('filter'));
        });
	}
	var strMode = $.cookie('CUDMode');
	$('#PgCUDBtn01 a .pgCUDBtn01Item').removeClass(MAIN.clsHide);
	$('#PgCUDBtn01 a #' + strMode).addClass(MAIN.clsHide);
}
 


// ------------------------------------------------------------
// ▼処理
// ------------------------------------------------------------

$(document).ready( function() {
	
	// ==============================
	// ■グローバルナビ　カレント処理
	( function() {
		
		//トリガークラス取得
		var clsTrigger = 0;
		clsTrigger = $('body').attr('class').match( new RegExp(MAIN.CrNavi.regGlvNavi));
		//alert(clsTrigger);//DEBUG
		var slcTarget = MAIN.CrNavi.slcGlvNaviArea + ' .' + clsTrigger + ' img.' + MAIN.roOver.clsroOver;
		//alert(slcTarget);//DEBUG
		if( slcTarget !==  null ){
			//ターゲットをカレント
			var tUrl = $(slcTarget).attr('src');
			if( tUrl !==  undefined ){
				$(slcTarget).attr('src',$(slcTarget)
				.attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1'+MAIN.CrNavi.strCrNavi+'$2'))
				.removeClass(MAIN.roOver.clsroOver);
			}
		};
	
	} )();
	// /==============================
	
	// ==============================
	// ■サブナビ　カレント処理
	( function() {
		
		//トリガークラス取得
		var clsTrigger = $('body').attr('class').match( new RegExp(MAIN.CrNavi.regSubNavi));
		//alert(clsTrigger);//DEBUG
		var slcTarget = MAIN.CrNavi.slcSubNaviArea + ' .' + clsTrigger;
		//alert(slcTarget);//DEBUG
		if( slcTarget !==  null){
			$(slcTarget).append('<span class="crNaviBdr">&nbsp;</span>');
		};
		
	} )();
	// /==============================
	
	// ==============================
	// ■グローバルナビ 下層ナビ表示切替
	( function() {
		
		//幅の制御
		$('.glbNaviNest').each(function() {
            $(this).removeClass(MAIN.clsHide);
			var numNaviWidth = 0;
			$(this).find('.glbNestList01').each(function() {
               numNaviWidth = numNaviWidth + $(this).outerWidth({margin: true}); 
            });
			$(this).addClass(MAIN.clsHide);
			$(this).css('width', numNaviWidth + 'px');
        });
		//表示切替
		$(MAIN.CrNavi.slcGlvNaviArea + ' li').hover(function(){
			$(this).find('.glbNaviNest').removeClass(MAIN.clsHide);
			//$(this).find('img').removeClass('rollover');
		},function(){
			$(this).find('.glbNaviNest').addClass(MAIN.clsHide);
			//$(this).find('img').addClass('rollover');
		});
	
	} )();
	// /==============================
	
	
	// ==============================
	// ■画像ロールオーバー
	$('.' + MAIN.roOver.clsroOver).live('mouseover', function(){
		MAIN.roOver.flg = true
		$(this).attr('src',$(this).attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1'+'_on'+'$2')); 
	
	}).live('mouseout', function(){
		MAIN.roOver.flg = false
		$(this).attr('src',$(this).attr('src').replace(/^(.+)_on(\.[a-z]+)$/, '$1$2')); 
	
	}).each( function(){
		//プリロード
        $('<img>').attr('src',$(this).attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1'+'_on'+'$2'));
		//プリロード
        $('<input>').attr('src',$(this).attr('src').replace(/^(.+)(\.[a-z]+)$/, '$1'+'_on'+'$2'));
    });
	// /==============================
	
							
	// ==============================
	// ■ポップアップ
	$(MAIN.popUp.slcBtn).click(function() {
      
		var attrUrl = $(this).attr('href');
		var attrData = $(this).children(MAIN.popUp.slcData).html().split(' ');
		//alert('▼データチェック\nurl : ' + attrUrl + '\nタイトル : ' + attrData[0] + '\n幅 : ' + attrData[1] + '\n高さ : ' + attrData[2] + '\nそのほか設定 : ' + attrData[3]); //DEBUG
		MAIN.openPopup(attrUrl, attrData[0], attrData[1], attrData[2], attrData[3]);
		return false;
	  
	});
	// /==============================
	
	
	// ==============================
	// ■スムースページスクロール
	$('.' + MAIN.smScloll.clsSmScloll).click(function() {
      
		// スクロールの速度
		var speed = MAIN.smScloll.speedScroll*1000;
		// アンカーの値取得
 		var href= $(this).attr('href');
		// 移動先を取得
		var target = $(href == '#' || href == '' ? 'html' : href);
		// 移動先を数値で取得
		var position = target.offset().top - MAIN.smScloll.winTopPx;
		// スムーススクロール
 		$($.browser.safari ? 'body' : 'html').animate({scrollTop:position}, speed, 'swing');
	  
		return false;
	  
	});
	// /==============================
	
	// ==============================
	// ■サイド背景制御
	( function() {
		
		//サイド背景、コンテンツの幅制御
		var fncResizeWidth = function() {
			var numWinWidth = $(window).width();
			//背景のポジションとサイズ変更
			if($('#ContentWrap').hasClass('sideBgOn')) {
				var numSideWidth = (numWinWidth - 1130) * 0.5;
				if (numSideWidth < 45) {
					$('#SideBgL').css('background-position', 'right');
					$('#SideBgR').css('background-position', 'left');
				}else if (numSideWidth >= 45) {
					$('#SideBgL').css('background-position', 'left');
					$('#SideBgR').css('background-position', 'right');
				}
				$('.sideBg01').css('width', numSideWidth + 75 + 'px');
			}
			//コンテンツ幅の調整
			if (numWinWidth < 1130 && numWinWidth >= 980) {
				$('#ContentWrap').css('min-width', numWinWidth + 'px');
			}
		}
		//処理実行
		if($('#ContentWrap').hasClass('sideBgOn')) {
			$('#SideBgArea').removeClass(MAIN.clsHide);
		}
		fncResizeWidth();
		//ウインドウリサイズ時再計算
		$(window).resize(function() {
			fncResizeWidth();
		});
		
	} )();
	// /==============================
	
	// ==============================
	// ■フッター背景制御
	( function() {
		
		//サイド背景の幅制御
		var fncResizeWidth = function() {
			var numWinWidth = $(window).width();
			var numTargetWidth = ((numWinWidth - 980) * 0.5) + 90;
			//背景のポジション変更
			if (numTargetWidth < (166)) {
				$('#FooterBg').css('background-position', 'right');
			}else {
				$('#FooterBg').css('background-position', 'left');
			}
			$('#FooterBg').css('width', numTargetWidth + 'px');
		}
		//処理実行
		fncResizeWidth();
		//ウインドウリサイズ時再計算
		$(window).resize(function() {
			fncResizeWidth();
		});
		
	} )();
	// /==============================
	
	// ==============================
	// ■CUD切替処理
	( function() {
		
		MAIN.fncSetCUDMode();
		//ボタンクリック実行処理
		$('#PgCUDBtn01 a').click( function() {
			//クッキー更新
			var strMode = $(this).find('.pgCUDBtn01Item').not('.' + MAIN.clsHide).attr('id');
			$.cookie('CUDMode', strMode, { path: '/', expires: '' });
			MAIN.fncSetCUDMode();
			return false
		});
		
	} )();
	// /==============================
	
	// ==============================
	// ■ページトップアンカーリンクの表示切替
	( function() {
		
		//初期状態対応
		$('#FooterLink01').hide();
		var blnShowFlg = false;
		if ($(window).scrollTop() > 200) { 
			var blnShowFlg = true;
			$('#FooterLink01').show();
		}
		//スクロール時処理実行
		$(window).scroll(function(){
			var y = $(this).scrollTop();
			if ((y > 200) && (blnShowFlg == false)) {
				blnShowFlg = true;
				$('#FooterLink01').stop(true, true).fadeIn(500);
			}else if((y < 200) && (blnShowFlg == true)) {
				blnShowFlg = false;
				$('#FooterLink01').stop(true, true).fadeOut(500);
			}
		});
		
	} )();
	// /==============================
	
	// ==============================
	// ■ページトップ固定表示
	( function() {
		
		//ターゲットの初期位置取得
		//グローバルナビ
		var numGnaviOffTop = null;
		if ($('.fixedTopGnavi').size() > 0){
			numGnaviOffTop = $('.fixedTopGnavi').offset().top;
		}
		//コンテンツエリアの固定要素
		var numBoxOffTop = null;
		if ($('.fixedTopBox').size() > 0){
			numBoxOffTop = $('.fixedTopBox').offset().top;
			$('.fixedTopBox').wrapAll('<div class="fixedTopBoxWrap"></div>');
			$('.fixedTopBoxWrap').css('height', $('.fixedTopBox').outerHeight({margin: true}));
			//ウインドウトップの値を格納
			MAIN.smScloll.winTopPx = $('.fixedTopBox').outerHeight();
		}
		//固定表示関数
		var fncPosFixed = function() {
			//スクロール位置取得
			var numScrollTop = $(window).scrollTop();
			//グローバルナビ
			if(numGnaviOffTop !== null && numGnaviOffTop > numScrollTop) {
				$('.fixedTopGnavi').removeClass('cmFixedTop');
			}else if(numGnaviOffTop !== null && numGnaviOffTop <= numScrollTop)  {
				$('.fixedTopGnavi').addClass('cmFixedTop');
			}
			//コンテンツエリアの固定要素
			if(numBoxOffTop !== null && numBoxOffTop > numScrollTop) {
				$('.fixedTopBox').removeClass('cmFixedTop');
			}else if(numBoxOffTop !== null && numBoxOffTop <= numScrollTop)  {
				$('.fixedTopBox').addClass('cmFixedTop');
			}
		}
		//実行処理
		fncPosFixed();
		$(window).scroll(function() {
            fncPosFixed();
        });
		
	} )();
	// /==============================
	
	// ==============================
	// ■ラジオボタンによる表示切替
	( function() {
		
		var fncRadioChange = function() {
			$('.radioChange input.cmIptRadio01').each(function() {
            	if ($(this).attr('id') !== '' && $(this).attr('id') !== null) {
					var numTargetID = $(this).attr('id').match(new RegExp('RdoChgID[0-9][0-9]')); 
					var numTargetNum = numTargetID[0].slice(8, 10);
					//表示切替
					if ($(this).attr('checked') == true) {
						$('#RadioChangeArea' + numTargetNum + ' img').eq(0).removeClass(MAIN.clsHide);
						$('#RadioChangeArea' + numTargetNum + ' img').eq(1).addClass(MAIN.clsHide);
					}else {
						$('#RadioChangeArea' + numTargetNum + ' img').eq(1).removeClass(MAIN.clsHide);
						$('#RadioChangeArea' + numTargetNum + ' img').eq(0).addClass(MAIN.clsHide);
					}
				}
			});
		}
		//実行処理
		fncRadioChange();
		$('.radioChange input.cmIptRadio01').click(function(e) {
            fncRadioChange();
        });
		
	} )();
	// /==============================

}) // ready()

$(window).unload( function(e) {


} );  // unload()