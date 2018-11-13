// ============================================================
// ＠＠
// TOPページ用
// 
// %update / 2012.12.11
// 
// %use / jquery
// ============================================================

// 名前の衝突をふせぐために名前空間を用意する
var TOP;
if( ( TOP && ( (typeof TOP !== 'object') || !('isNamespace' in TOP) ) ) || (TOP === false) || (TOP === 0) ) {
	throw new Error('"TOP" already exists! You cannot define "TOP".');
} else if( TOP && ('isNamespace' in TOP) ) {
	throw new Error('Namespace "TOP" already exists!');
}
TOP = {};  // 名前空間用のオブジェ生成
TOP.toString = function() { return '[object TOP(is Namespace)]'; };
TOP.isNamespace = true;


// ------------------
// 【定数・変数】
// ------------------

// ■メインビジュアル切替
TOP.mVisAnime = {
	timerID : null, // タイマーID
	slcMVisArea : '#MainVisualArea', // メインビジュアルエリアのCSSセレクタ
	slcMVisImg : '#MainVisualArea #MainVisInr #MainVisImg', // スライドイメージのCSSセレクタ
	slcMVisBtn : '#MainVisualArea #MainVisInr #MainVisBtn' //, ボタンリストのCSSセレクタ
}

// ------------------
// 【関数】
// ------------------
// なし


// ------------------------------------------------------------
// ▼処理
// ------------------------------------------------------------

$(document).ready( function() {
							
	// ==============================
	// ■スライドメインビジュアル切替
	( function() {
		
		
	} )();
	// /==============================
	
}) // ready()

$(window).unload( function(e) {
	
	// タイマークリア
	if(TOP.mVisAnime.timerID !== null) {
		clearTimeout(TOP.timerID);
	}

} );  // unload()