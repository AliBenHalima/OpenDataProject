<?php

namespace App\Http\Controllers\Formulaire;

use App\Models\Tentative;
use App\Models\FormRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class TentativeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        // $tentative = Tentative::with('formulaireinputs')->where("id","=",$id)->get();
        $tentative = FormRequests::with('formulaireinputs')->where("tentative_id","=",$id)->get();
        return ['success'=>true,'tentative'=>$tentative];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tentative = Tentative::find($id);
        if($tentative){
             $tentative->forminp()->detach();
            $tentative->delete();
            return ['success'=>true,'message'=>'tentative deleted',];
        }
        return ['success'=>false,'message'=>'tentative doesn\'t exist '];
    }

    public function accepttentative(Request $request, $id)
    {
        // return $request->all();
        try{
            $validator= $request->validate([
                'is_accepted'=>['required'],
            ]);
            $tentative = Tentative::find($id);
            $tentative->update(['accepted' => $request->is_accepted]);
            // Tentative::where('id', $id)->update(array('accepted' => $request->is_accepted));
if($request->is_accepted==true){
    return ['success'=>true,'message'=>'tentative accepted',];
}else{
    return ['success'=>true,'message'=>'tentative accepted',];
}


            }catch(\Exception $exception){
                return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
            }
    }
}
