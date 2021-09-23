<?php

namespace App\Http\Controllers\SujetDocumentsController;

use Illuminate\Http\Request;
use App\Models\SujetDocument;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SujetDocumentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sujet = SujetDocument::get();
        return ['success'=>true,'sujets'=>$sujet];
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
        try{
            $validator= $request->validate([
                'nom'=>['required']
            ]);

            $sujetdocument = new SujetDocument([
                'nom'=>$request->nom,

            ]);


                $sujetdocument->save();
                return ['success'=>true,'message'=>'Sujet Document Saved '];

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
        $sujetdocument = SujetDocument::find($id);
        return ['success'=>true,'sujetdocuments'=>$sujetdocument];
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
        $sujetdocument = SujetDocument::find($id);
        if($sujetdocument){
            $sujetdocument->documents()->delete();

            DB::table('sujet_documents')->where('id', '=', $id)->delete();
            return ['success'=>true,'message'=>'Sujet deleted',];
        }
        return ['success'=>false,'message'=>'Sujet doesn\'t exist '];
    }
}
