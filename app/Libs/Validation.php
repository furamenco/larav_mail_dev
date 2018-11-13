<?php
namespace app\Libs;
use App\Libs\Common;
class Validation
{
    //planチェック
    public static function plan($pram) {
        $err = false;
        $name_max = 10;
        $name2_max = 10;

        if(empty($pram['name'])){
            $err['name'] = "必須項目です";
        }else if(!Common::checkMax($pram['name'], $name_max)){
            $err['name'] = $name_max."文字までです";
        }

        if(!empty($pram['name2']) && !Common::checkMax($pram['name2'], $name2_max)){
            $err['name2'] = $name2_max."文字までです";
        }

        return $err;
    }
}