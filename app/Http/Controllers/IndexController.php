<?php

namespace App\Http\Controllers;

//use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Article;
use DB;

class IndexController extends Controller
{
	public function index()
	{
		$data = DB::select('select * from article_main');
		$db = new Article();
		print_r($db->fetchAll());
		//print_r($data);
		$arr = array(
				'user_id' => 'https://haniwaman.com/eclipse-direct/',
				'user_name' => '山田太郎',
				'user_mail' => 'dq10@quest.jp',
		);
		return view('index')->with(compact('arr'));
		//return view('index', compact($arr));
	}

	public function getNewsApi(Request $request)
	{
		if($request->has('key') && $request->input('key') == "commit"){
			header('Content-type: application/json');
			$db = new Article();
			echo json_encode($db->fetchAll());

		}
	}
}
