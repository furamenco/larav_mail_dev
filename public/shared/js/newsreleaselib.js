//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
//
// ニュースリリース読込み
//
// 依存関係　：　jquery
//
//
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/
clsNewsReleaseLib = new Object();
clsNewsReleaseLib = function(){
	//********************************************************
	//プロパティ
	//********************************************************

	//JSONオブジェクト
	this.objJSON = new Object();

	//パス
	this.strAjaxPath = "api/get_news_api";

	//********************************************************
	//コンストラクタ
	//********************************************************
	// jqueryの『$』を置き換える

	if(! $plj) { var $plj = jQuery; }

	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	//
	// 共通メソッド
	//
	//++++++++++++++++++++++++++++++++++++++++++++++++++++++++

	//********************************************************
	//初期化処理
	//********************************************************
	this.init = function(){
		//$plj(document).ready(function(){
		$plj.event.add(window, 'load', function(){
		//ウィンドウロードのタイミングでjson取得
			$plj.ajax({ type : "GET",
				scriptCharset: 'utf-8',
				url : nw.strAjaxPath,
				data: "key=commit",
				dataType:"json",
				success : nw.setNewsRelease,
				error : nw.setError});
		});
	}
	//********************************************************
	//JSON取得処理
	//********************************************************
	this.setNewsRelease = function(json){
		nw.objJSON = json;
		nw.showList();
	}
	//********************************************************
	//AJAX取得エラー
	//********************************************************
	this.setError = function(XMLHttpRequest, textStatus, errorThrown){
		alert(textStatus);
	}
	//********************************************************
	//ニュースリリース表示（HTML作成）
	//********************************************************
	this.showList = function(){
		var strHTML = "";
		for(var i = 0; i < nw.objJSON.length; i++){
			if(i < 2){
				strHTML += '<li class="pgPicUpItem">';
				strHTML += '<p class="pgNewsImg">';
				strHTML += '<img src="' + nw.objJSON[i]['image'] + '" alt="サムネイル画像"  /></p>';
				strHTML += '<p><span class="pgDate">' + nw.objJSON[i]['article_view_date'] + '</span>';
				strHTML += '<a href="/newsrelease/detail.php?id=' + nw.objJSON[i]['article_id'] + '">';
				if(nw.objJSON[i]['article_title_top'].length > 0){
					strHTML += nw.objJSON[i]['article_title_top'] + '</a></p>';
				}else{
					strHTML += nw.objJSON[i]['article_title'] + '</a></p>';
				}
				strHTML += '</li>';
			}else{
				strHTML += '<li class="pgTxtItem">';
				strHTML += '<p><span class="pgDate">' + nw.objJSON[i]['article_view_date'] + '</span>';
				strHTML += '<a href="/newsrelease/detail.php?id=' + nw.objJSON[i]['article_id'] + '">';
				strHTML += nw.objJSON[i]['article_title'] + '</a></p>';
				strHTML += '</li>';
			}
		}
		$plj("#PgNewsList").html(strHTML);
	}
	//********************************************************
	//GETパラメータ取得
	//********************************************************
	this.getParam = function(){
		var strQuery = window.location.search.substring(1);
		var astrParams = strQuery.split('&');
		var aobjQuery = new Array();

		for (var i=0; i<astrParams.length; i++) {
			if (astrParams[i].indexOf('=') < 0){ continue; }
			var aobjTemp = astrParams[i].split('=');
			aobjQuery[aobjTemp[0]] = aobjTemp[1];
		}
		return aobjQuery;
	}

	//********************************************************
	//デバッグ用　配列確認
	//********************************************************
	this.sprint_r = function(obj, maxlevel, maxitem) {
		if (!maxlevel)  maxlevel = 4;
		if (!maxitem)   maxitem = 150;
		var txt = "";
		var count_obj = 0;
		function _output(str) {
			txt += str + "\n";
		}
		function _print_r(obj, name, level) {
			var s = "";
			if (obj == undefined || level > maxlevel) return;
			for (var i = 0; i < level; i++) { s += " | "; }
			s += " - " + name + ":" + typeof(obj) + "=" + obj;
			_output(s);
			if (name == "document" || typeof(obj) != "object") return;
			for (var key in obj ) {
				if (count_obj++ > maxitem) return;
				_print_r(obj[key], key, level + 1);
			}
		}
		_print_r(obj, "*", 0);
		return txt;
	}
	//********************************************************
}
//_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/_/

//**********************************************************
//初期化
//**********************************************************
nw = new clsNewsReleaseLib();
nw.init();
