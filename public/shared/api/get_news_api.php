<?php
if($_GET['key'] == 'commit'){
	//クラス読込み
	require_once("../../system/common/config/setup.php");
	require_once($_DOCUMENT_SYSTEM_ROOT."common/class/json.class.php");
	require_once($_DOCUMENT_SYSTEM_ROOT."common/class/mysqldb.exec.class.php");
	//初期化
	$arr_json = array();
	$err_flg = false;
	$setting = $_ARR_SETTING;
	
	//DB接続
	$objDB = new DbExec(HOST_NAME, DB_USER, DB_PASSWORD, DB_NAME);
	if(!$objDB->dbOpen($gConn, $errMsg)){ if(!(!$_DEBUG_MODE && $err_flg = true)){ die($errMsg."<br>".$sql); } }
	
	//SQL
	$sql = "";
	$sql .= "SELECT ";
	$sql .= "article_id, ";
	$sql .= "article_title, ";
	$sql .= "article_title_top, ";
	$sql .= "article_image1, ";
	$sql .= "article_image2, ";
	$sql .= "article_image3, ";
	$sql .= "article_view_year, ";
	$sql .= "article_view_date, ";
	$sql .= "article_last_update ";
	$sql .= "FROM ";
	$sql .= "article_main ";
	$sql .= "WHERE ";
	$sql .= "article_delete_flg=0 ";
	$sql .= "AND article_display=0 ";
	$sql .= "AND article_status=0 ";
	$sql .= "ORDER BY article_view_date DESC, ";
	$sql .= "article_last_update DESC;";
	
	if(!$objDB->rsOpen($rec_set, $sql, $errMsg)){ if(!(!$_DEBUG_MODE && $err_flg = true)){ die($errMsg."<br>".$sql); } }
	$rec_cnt = mysql_num_rows($rec_set);
	if($rec_cnt > $_TOP_NEWS_COUNT){ $rec_cnt = $_TOP_NEWS_COUNT; }
	
	for($i = 0; $i < $rec_cnt; $i++){
		$row = mysql_fetch_array($rec_set, MYSQL_ASSOC);
		$arr_json[$i]['id'] = $row['article_id'];
		$arr_json[$i]['title'] = htmlspecialchars($row['article_title'], ENT_QUOTES);
		$arr_json[$i]['title_top'] = nl2br(htmlspecialchars($row['article_title_top'], ENT_QUOTES));
		if(strlen($row['article_image2']) > 0){
			$arr_json[$i]['image'] = $_IMAGE_PATH_1.$row['article_image2'];
		}else{
			$arr_json[$i]['image'] = $_TOP_NO_IMAGE;
		}
		$arr_json[$i]['date'] = date("Y年m月d日", strtotime($row['article_view_date']));
	}
	
	//JSONで出力
	//print_r($arr_json);
	$objJson = new Json;
	header("Content-Type:application/json");
	header("Cache-Control:no-cache, no-store");
	header("Pragma:no-cache");
	print $objJson->json_encode($arr_json);
}else{
	header('Location: /');
}
?>
