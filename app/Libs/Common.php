<?php
namespace app\Libs;

use Carbon\Carbon;

class Common
{
    public static function getNow(){
        return Carbon::now();
    }

    //概要：文字数制限チェック（最大）
    //引数1：対象文字列
    //引数2：指定文字数
    //引数3：文字コード　デフォルト utf8
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkMax($value, 10, "SJIS");
    public static function checkMax($value, $count, $char="UTF-8"){
        if(mb_strlen($value, $char) > $count){
            return false;
        }else{
            return true;
        }
    }

    //概要：文字数制限チェック（最小）
    //引数1：対象文字列
    //引数2：指定文字数
    //引数3：文字コード　デフォルト utf8
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkMin($value, 10, "SJIS");
    public static function checkMin($value, $count, $char="UTF-8"){
        if(mb_strlen($value, $char) < $count){
            return false;
        }else{
            return true;
        }
    }

    //概要：メールアドレスチェック
    //引数1：対象メールアドレス
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkMail($address);
    public static function checkMail($value){
        if(preg_match("/^[0-9A-Za-z!#\$%&'\*\+-\/=\?\^_`\{\}\|~\.]+@[0-9A-Za-z\-~]+\.[0-9A-Za-z\-\.]+$/", $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：半角数字チェック
    //引数1：対象文字列
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkNum($value);
    public static function checkNum($value){
        if(preg_match("/^[0-9]+$/", $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：半角英数字チェック
    //引数1：対象文字列
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkHalfSize($value);
    public static function checkHalfSize($value){
        if(preg_match("/^[0-9A-Za-z]+$/", $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：全角カタカナチェック
    //引数1：対象文字列
    //引数2：動作モード　1：UTF8
    //戻り値：ture = OK  false = NG
    //使用例：Common::heckZenKata($value, 1);
    public static function checkZenKata($value, $mode=0){
        $char = "";
        if($mode == 1){
            mb_regex_encoding("UTF-8");
            $char = "u";
        }
        $patarn = "/^[ァ-ヶー]+$/".$char;
        if(preg_match($patarn, $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：半角カタカナチェック
    //引数1：対象文字列
    //引数2：動作モード　1：UTF8
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkHanKata($value, 1);
    public static function checkHanKata($value, $mode=0){
        $char = "";
        if($mode == 1){
            mb_regex_encoding("UTF-8");
            $char = "u";
        }
        $patarn = "/^[ｧ-ﾝﾞﾟ]+$/".$char;
        if(preg_match($patarn, $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：全角ひらがなチェック
    //引数1：対象文字列
    //引数2：動作モード　1：UTF8
    //戻り値：ture = OK  false = NG
    //使用例：Common::checkZenHira($value, 1);
    public static function checkZenHira($value, $mode=0){
        $char = "";
        if($mode == 1){
            mb_regex_encoding("UTF-8");
            $char = "u";
        }
        $patarn = "/^[ぁ-んー]+$/".$char;
        if(preg_match($patarn, $value)){
            return true;
        }else{
            return false;
        }
    }

    //概要：郵便番号チェック
    //引数1：対象文字列
    //引数2：動作モード  0=ハイフンあり    1=ハイフンなし
    //戻り値：ture = OK  false = NG
    //使用例：checkZip($value, 0);
    public static function checkZip($value, $mode){
        switch($mode){
            case 0:
                if(preg_match("/^[0-9]{3}-[0-9]{4}$/", $value)){
                    return true;
                }else{
                    return false;
                }
                break;
            case 1:
                if(preg_match("/^[0-9]{7}$/", $value)){
                    return true;
                }else{
                    return false;
                }
                break;
            default:
                return false;
                break;
        }
    }

    //概要：電話番号チェック
    //引数1：対象文字列
    //引数2：動作モード  0=ハイフンあり    1=ハイフンなし
    //戻り値：ture = OK  false = NG
    //使用例：checkTel($value, 1);
    public static function checkTel($value, $mode){
        switch($mode){
            case 0:
                //固定電話１
                if(preg_match("/^0[0-9]{1}-[0-9]{4}-[0-9]{4}$/", $value)){
                    return true;
                    //固定電話２
                }elseif(preg_match("/^0[0-9]{2}-[0-9]{3}-[0-9]{4}$/", $value)){
                    return true;
                    //固定電話３
                }elseif(preg_match("/^0[0-9]{3}-[0-9]{2}-[0-9]{4}$/", $value)){
                    return true;
                    //固定電話４
                }elseif(preg_match("/^0[0-9]{4}-[0-9]{1}-[0-9]{4}$/", $value)){
                    return true;
                    //IP電話
                }elseif(preg_match("/^050-[0-9]{4}-[0-9]{4}$/", $value)){
                    return true;
                    //PHS
                }elseif(preg_match("/^070-[0-9]{4}-[0-9]{4}$/", $value)){
                    return true;
                    //フリーダイアル
                }elseif(preg_match("/^0120-[0-9]{3}-[0-9]{3}$/", $value)){
                    return true;
                    //携帯電話１
                }elseif(preg_match("/^0[8-9]0-[0-9]{4}-[0-9]{4}$/", $value)){
                    return true;
                    //携帯電話２
                }elseif(preg_match("/^0[8-9]0-[0-9]{3}-[0-9]{5}$/", $value)){
                    return true;
                }else{
                    return false;
                }
                break;
            case 1:
                //固定電話
                if(preg_match("/^0[0-9]{9}$/", $value)){
                    return true;
                    //IP電話
                }elseif(preg_match("/^050[0-9]{8}$/", $value)){
                    return true;
                    //携帯電話
                }elseif(preg_match("/^0[8-9]0[0-9]{8}$/", $value)){
                    return true;
                }else{
                    return false;
                }
                break;
            default:
                return false;
                break;
        }
    }


    //概要：URLチェック
    //引数1：対象文字列
    //戻り値：ture = OK  false = NG
    //使用例：is_url($value);
    public static function checkUrl($value){
        if(preg_match('/^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/', $value)){
            return true;
        } else {
            return false;
        }
    }







}