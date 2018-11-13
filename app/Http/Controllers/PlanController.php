<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Plan;
use DB;
use App\Libs\Validation;

class PlanController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        session()->regenerate();

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->input('id');
    	//$db = new Article();
    	//$data = $db->fetchAll();
    	//print_r(session()->all());
        //print_r($id);
        if(!empty($id)){
            $plan = new Plan();
            $data = $plan->fetchOneId($id);
            return view('plan_edit')->with(compact('data', 'id'));
        }else{
        	$data = session('param', false);
        	if($data){
        	    $error = session('error', false);
        	    $this->clearSession();
        	    if($error){
        	        return view('plan_edit')->with(compact('data', 'error'));
        	    }else{
        	        return view('plan_edit')->with(compact('data'));
        	    }
        	}
        }

    	return view('plan_edit');
    }

    public function update(Request $request)
    {
        $req = $request->all();
        $err = Validation::plan($req);
        if($err){
            session(['param' => $req]);
            session(['error' => $err]);
            return redirect('plan');
        }
        $plan = new Plan();
        $user = Auth::user();
        if(isset($req['id'])){
            $data = $plan->fetchOneUserId($req['id'], $user->id);//既存チェック
            if($data){
                $plan->updateRow($req, $user->id);//update
            }else{
                $plan->createRow($req, $user->id);//create
            }
        }else{
            $plan->createRow($req, $user->id);//create
        }
        //return view('test');
        return redirect('plan');
    }


    //セッションクリア
    public function clearSession()
    {
        session()->forget('error');
        session()->forget('param');
        //print_r(session()->all());
    }
}
