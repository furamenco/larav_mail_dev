<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Article;
use App\Models\Plan;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $plan = new Plan();
    	//$art = new Article();
    	//$data[] = array('article_title' => 'aaaaaa', 'article_note' => 'bbbbbbb');
    	//$datas = $art->fetchAll();
    	$data = $plan->fetchAll();
    	//print_r($data);
    	//print_r($datas2);
    	return view('home')->with(compact('data'));
    }



}
