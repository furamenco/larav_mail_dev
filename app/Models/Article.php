<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libs\DbCommon;
use DB;

class Article extends Model
{
    //テーブル名のセット
	protected $table = 'article_main';
	//主キーのセット
	protected $guarded = array('article_id');
	//自動タイムスタンプ
	public $timestamps = false;


	//全件取得
	public function fetchAll(){
		$data = DB::table($this->table)->where('article_delete_flg', 0)->get();
		return DbCommon::toArrayData($data);
	}
}
