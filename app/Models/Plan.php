<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Libs\Common;
use App\Libs\DbCommon;
use DB;

class Plan extends Model
{
    //テーブル名のセット
    protected $table = 'plan';
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

    //USERID取得
    public function fetchOneUserId($id, $user){
        $data = DB::table($this->table)->where('id', $id)->where('user_id', $user)->get();
        $data = DbCommon::toArrayData($data);
        if($data){
            return $data[0];
        }
    }


    //データ作成
    public function createRow($data, $user_id){

        DB::table($this->table)->insert(
            array(
                'user_id' => $user_id,
                'name' => $data['name'],
                'name2' => $data['name2'],
                'created_at' => Common::getNow(),
                'updated_at' => Common::getNow()
            )
        );
    }

    //データ更新
    public function updateRow($data, $user_id){
        DB::table($this->table)
        ->where('id',$data['id'])
        ->update(
            array(
                'name' => $data['name'],
                'name2' => $data['name2'],
                'updated_at' => Common::getNow()
            )
        );
    }
}
