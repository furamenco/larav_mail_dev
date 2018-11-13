// ============================================================
// ＠＠
// パララックス
// 
// %update / 2013.03.11
// 
// %use / jquery
// ============================================================

// 名前の衝突をふせぐために名前空間を用意する
var PRLLX;
if( ( PRLLX && ( (typeof PRLLX !== 'object') || !('isNamespace' in PRLLX) ) ) || (PRLLX === false) || (PRLLX === 0) ) {
	throw new Error('"PRLLX" already exists! You cannot define "PRLLX".');
} else if( PRLLX && ('isNamespace' in PRLLX) ) {
	throw new Error('Namespace "PRLLX" already exists!');
}
PRLLX = {};  // 名前空間用のオブジェ生成
PRLLX.toString = function() { return '[object PRLLX(is Namespace)]'; };
PRLLX.isNamespace = true;


// ------------------
// 【定数・変数】
// ------------------
PRLLX.arySetPosX = []; // X座標の移動距離を格納する配列
PRLLX.arySetPosY = []; // Y座標の移動距離を格納する配列
PRLLX.arySetOpcy = []; // 透過アニメーションの初期透過度を格納する配列
PRLLX.aryPosX = [];    // 要素のX座標を格納する配列
PRLLX.aryPosY = [];    // 要素のY座標を格納する配列
PRLLX.aryStartY = [];  // アニメーション開始するスクロール座標を格納する配列
PRLLX.aryEndY = [];    // アニメーションが終了するスクロール座標を格納する配列


// ------------------
// 【関数】
// ------------------

// ========================================
// ■初期設定
// %param / none
PRLLX.fncSetDefPos = function() {
	$('.moveParallax .parallaxObj').each(function() {
		//要素の高さを親要素に指定して高さを確保する
		$(this).closest('.moveParallax').css('height', $(this).height() + 'px');
		
		//各情報を取得
        var arySetData = $(this).attr('class').match( new RegExp('setParallax_([^ ]+)'));
		var arySetPos = arySetData[0].split('_');
		
		//各情報を配列に格納
		PRLLX.arySetPosX.push(parseInt(arySetPos[1]));
		PRLLX.arySetPosY.push(parseInt(arySetPos[2]));
		PRLLX.arySetOpcy.push(parseInt(arySetPos[3]));
		PRLLX.aryPosX.push(parseInt($(this).css('left')));
		PRLLX.aryPosY.push(parseInt($(this).css('top')));
    });
}
//fncSetDefPos /===========================

// ========================================
// ■各要素のスクロール開始、終了位置計算
// %param / none
PRLLX.fncSetPos = function() {
	//最大スクロール量を計算
	var numMaxScroll = $(document).height() - $(window).height();
	
	$('.moveParallax .parallaxObj').each(function() {
		//各情報を取得
		var numStartY = parseInt($(this).offset().top - ($(window).height() * 0.75 ));
		if (numStartY < 0) { numStartY = 0 }
		var numEndY = parseInt($(this).offset().top - ($(window).height() * 0.25 ));
		if (numEndY > numMaxScroll) {
			numEndY = numMaxScroll;
			numStartY = numStartY - (numEndY - numMaxScroll);
		}
		//各情報を配列に格納
		PRLLX.aryStartY.push(numStartY);
		PRLLX.aryEndY.push(numEndY);
	});
}
//fncSetPos /===========================

// ========================================
// ■パララックス効果
// %param / y //スクロール座標
PRLLX.fncMoveParallx = function(y) {
	var numIndex = 0;
	$('.moveParallax .parallaxObj').each(function() {
		//アニメーション待機
		if(PRLLX.aryStartY[numIndex] > y) {
			$(this).css({
				left: PRLLX.aryPosX[numIndex] + PRLLX.arySetPosX[numIndex] + 'px',
				top: PRLLX.aryPosY[numIndex] + PRLLX.arySetPosY[numIndex] + 'px',
				opacity: (PRLLX.arySetOpcy[numIndex] * 0.01)
			});
		//動作中	
		}else if (PRLLX.aryStartY[numIndex] <= y && PRLLX.aryEndY[numIndex] > y){
			var numTimePx = PRLLX.aryEndY[numIndex] - PRLLX.aryStartY[numIndex];
			var moveX = (PRLLX.arySetPosX[numIndex] / numTimePx) * (y - PRLLX.aryStartY[numIndex]);
			var moveY = (PRLLX.arySetPosY[numIndex] / numTimePx) * (y - PRLLX.aryStartY[numIndex]);
			var numOpacity = ((1 - (PRLLX.arySetOpcy[numIndex] * 0.01)) / numTimePx) * (y - PRLLX.aryStartY[numIndex]);
			$(this).css({
				left: parseInt( PRLLX.aryPosX[numIndex] + PRLLX.arySetPosX[numIndex] - moveX ) + 'px',
				top: parseInt( PRLLX.aryPosY[numIndex] + PRLLX.arySetPosY[numIndex] - moveY ) + 'px',
				opacity: (PRLLX.arySetOpcy[numIndex] * 0.01) + numOpacity
			});
		//アニメーション完了	
		}else {
			$(this).css({
				left: PRLLX.aryPosX[numIndex] + 'px',
				top: PRLLX.aryPosY[numIndex] + 'px',
				opacity: 1
			});
		}
		numIndex++;
	});
}
//fncMoveParallx /===========================


// ------------------------------------------------------------
// ▼実行処理
// ------------------------------------------------------------

$(document).ready( function() {
	
}) // ready()

$(window).load( function() {
	
	var numScrollY = $(window).scrollTop(); //スクロール座標
	
	//初期設定
	PRLLX.fncSetDefPos();
	PRLLX.fncSetPos();
	
	//初期位置調整のために実行
	PRLLX.fncMoveParallx(numScrollY);
	
	//スクロールで処理実行
	$(window).scroll(function() {
		numScrollY = $(this).scrollTop();
		PRLLX.fncMoveParallx(numScrollY);
	});
	
	//ウインドウリサイズで再計算実行
	$(window).resize(function() {
        PRLLX.fncSetPos();
		numScrollY = $(this).scrollTop();
		PRLLX.fncMoveParallx(numScrollY);
    });
	
} );  // load()