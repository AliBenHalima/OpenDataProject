<?php

namespace App\Http\Controllers\Formulaire;

use App\Models\FormInput;
use App\Models\Tentative;
use App\Models\Formulaire;
use Illuminate\Support\Str;
use App\Models\FormRequests;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class FormRequestController extends Controller
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
        try{
            $tentative = new Tentative([
            'etat'=>"pending",
            'code'=>Str::random(10)

        ]);
        $tentative->save();

            foreach ($request->all() as $input_id=>$value) {
                $test = json_encode($value);
            $form_input = FormInput::find($input_id);

                if(is_array($value)){
                    return   json_encode($value);
                    return    implode(",",$value);

            $form_input->tentatives()->attach($tentative->id,[
                'value' => implode(",",$value)
              ]);
                }

                else if ($request->hasFile($input_id)){
                    $fileName = Str::random(5).'_'.$value->getClientOriginalName();
                    $value->storeAs('Formulaire/Files', $fileName, 'public');
                    $form_input->tentatives()->attach($tentative->id,[
                        'value' => $fileName
                      ]);
                }
                else{
            $form_input->tentatives()->attach($tentative->id,[
                'value' => $value
              ]);
                }
            }
                return ['success'=>true,'message'=>'Form Saved ','Form'=>$form_input];
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
        $tentative = Tentative::find($id);
        $formulairereq =FormRequests::with('formulaireinputs')->where('tentative_id','=',$id)->first();
        $formulaire_id=$formulairereq['formulaireinputs']->formulaire_id;
        $formulaire = Formulaire::with(['inputs.formrequests' =>
        function ($query) use ($id){
            $query->where('tentative_id','=',$id);
        }])
        ->where("id","=",$formulaire_id)->first();
        return ['success'=>true,'formulaire'=>$formulaire,'tentative'=>Tentative::find($id)];
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
