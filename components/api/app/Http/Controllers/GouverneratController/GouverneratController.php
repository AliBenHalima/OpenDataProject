<?php

namespace App\Http\Controllers\GouverneratController;

use App\Models\Gouvernerat;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GouverneratController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $gouvernerat = Gouvernerat::get();
        return ['gouvernerats'=>$gouvernerat];
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
        $validator= $request->validate([
            'name'=>['required'],
            'etablissement_id'=>['required'],
        ]);

        $gouvernerat = new Gouvernerat([
            'name'=>$request->name,
            'etablissement_id'=>$request->etablissement_id,
        ]);
        try{
            $gouvernerat->save();
            return ['success'=>true,'message'=>' Gouvernerat Saved '];

        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $gouvernerat = Gouvernerat::find($id);
        return ['success'=>true,'gouvernerat'=>$gouvernerat];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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

        $gouvernerat = Gouvernerat::find($id);
        if($gouvernerat){
            $gouvernerat->name=$request->name;
            $gouvernerat->etablissement_id=$request->etablissement_id;
            $gouvernerat->save();
            return ['success'=>true,'message'=>'gouvernerat Updated '];
        }
        return ['success'=>false,'message'=>'gouvernerat doesn\'t exist '];

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $gouvernerat = Gouvernerat::find($id);
        if($gouvernerat){
            $gouvernerat->delete();
            return ['success'=>true,'message'=>'gouvernerat deleted '];
        }
        return ['success'=>false,'message'=>'gouvernerat doesn\'t exist '];

    }
}
