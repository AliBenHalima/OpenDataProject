<?php

namespace App\Http\Controllers\Formulaire;

use App\Models\Input;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InputsController extends Controller
{
    public function __construct()
    {
        // $this->middleware('permission:create etablissements,api', ['only' => ['store']]);
        // $this->middleware('permission:update etablissements,api', ['only' => ['update']]);
        // $this->middleware('permission:create forms,api', ['only' => ['index']]);
        // $this->middleware('permission:delete etablissements,api', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $inputs = Input::get();
        if(auth()->user()==null){
            return ['success'=>true,'inputs'=>$inputs];
         }
         $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'inputs'=>$inputs,'permissionNames'=>$permissionNames];
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
        // return json_encode($request->options);
        // return $request->all();

        try{
            $validator= $request->validate([
                'label'=>['required'],
                'type'=>['required'],
                'options'=>[''],
                'textBoxtypes'=>[''],
                'CheckboxType'=>[''],
                'relationship_label'=>[''],
            ]);

            $input = new Input([
                'label'=>$request->label,
                'type'=>$request->type,
                'options'=>$request->options,
                'textBoxtypes'=>$request->textBoxtypes,

            ]);

                if(!empty($request->CheckboxType)){
                $input->textBoxtypes= $request->CheckboxType;
                }

                if(!empty($request->relationship_label)){
                    $input->relationship_value= $request->relationship_label;
                    }

                $input->save();
                return ['success'=>true,'message'=>'input Saved '];

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
        //
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
        //
    }
}
