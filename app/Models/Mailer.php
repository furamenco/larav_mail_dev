<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libs\Common;
use App\Libs\DbCommon;
use DB;

class Mailer extends Model
{
    //テーブル名のセット
    protected $table = 'cron_mailer';
    //主キーのセット
    protected $guarded = array('id');
    //自動タイムスタンプ
    public $timestamps = true;

    //全件取得
    public function fetchAll(){
        $data = DB::table($this->table)->get();
        return DbCommon::toArrayData($data);
    }

    //ID取得
    public function fetchOneId($id){
        $data = DB::table($this->table)->where('id', $id)->get();
        $data = DbCommon::toArrayData($data);
        if($data){
            return $data[0];
        }
    }
}
