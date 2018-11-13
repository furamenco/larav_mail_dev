<?php
namespace app\Libs;
class DbCommon
{
    //オブジェクトを配列に変換
	public static function toArrayData($arr) {
    	$ret_data = array();
    	foreach($arr as $row){
    		$ret_data[] = (array)$row;
    	}
        return $ret_data;
    }
}