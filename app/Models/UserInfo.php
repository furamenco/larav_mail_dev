<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libs\DbCommon;
use DB;

class UserInfo extends Model
{
	//テーブル名のセット
	protected $table = 'users_info';
	//主キーのセット
	protected $guarded = array('id');
	//自動タイムスタンプ
	public $timestamps = true;


	//全件取得
	public function fetchAll(){
		$data = DB::table($this->table)->get();
		return DbCommon::toArrayData($data);
	}
}
