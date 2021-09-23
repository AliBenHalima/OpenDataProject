<?php

namespace App\Http\Controllers\Formulaire;

use App\Models\FormInput;
use App\Models\Tentative;
use App\Models\Formulaire;
use Illuminate\Support\Str;
use App\Models\FormRequests;
use Illuminate\Http\Request;
use App\Models\FormulaireInput;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;

class FormulaireController extends Controller
{
    public function __construct()
    {
        // $this->middleware('permission:create etablissements,api', ['only' => ['store']]);
        // $this->middleware('permission:update etablissements,api', ['only' => ['update']]);
        // $this->middleware('permission:view forms,api', ['only' => ['GetFormulaireByID']]);
        // $this->middleware('permission:delete etablissements,api', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $formulaires = Formulaire::with('inputs','etablissements')->get();
        // $tentatives = FormInput::with('tentatives','formulaires')->groupBy('formulaire_id')->get();
        $tentatives = FormInput::with('tentatives')->get();

        // $tentatives = FormInput::whereHas('formulaires', function($q){
        //     $q->where('id','=', 11);
        // })->get();

        // with('tentatives','formulaires')->groupBy('formulaire_id')->get();
        $permissionNames = auth()->user()->getAllPermissions();

        return ['success'=>true,'formulaires'=>$formulaires,'tentatives'=>$tentatives,'permissionNames'=>$permissionNames];
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
            $form = new Formulaire([
                'designation'=>$request[0]["title"],
                'code'=>Str::random(10),
                'etablissement_id'=>$request[0]["etablissement_id"],
                'formtype'=>$request[0]["formtype"],
            ]);
            $form->save();

            foreach ($request->all() as $question) {

                if (!isset($question["title"])) {
                    $form->inputs()->attach($question["input_id"], [
                        'required' => $question["required"],
                      ]);

                    }
                }

                return ['success'=>true,'message'=>'Form Saved ','Form'=>$form->id];
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
        // $tentative = Tentative::find($id);
        // $formulairereq =FormRequests::with('formulaireinputs')->where('tentative_id','=',$id)->first();

        // $formulaire_id=$formulairereq['formulaireinputs']->formulaire_id;

        // $formulaire = Formulaire::with(['inputs.formrequests' =>
        // function ($query) use ($id){
        //     $query->where('tentative_id','=',$id);
        // }])
        // ->where("id","=",$formulaire_id)->first();
        // return ['success'=>true,'formulaire'=>$formulaire];
        if(Formulaire::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }


        $formulaire = Formulaire::with('inputs','etablissements')
        ->where("id","=",$id)->first();
        return ['success'=>true,'formulaire'=>$formulaire];




        // works also

        // $formulaire = FormulaireInput::with(['tentatives' =>
        // function ($query) use ($id){
        //     $query->where('tentatives.id','=',$id);
        // }
        // ])->get();

        // return ['success'=>true,'formulaire'=>$formulaire];
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
   {}

    public function UpdateFormulaire(Request $request, $id)
    {
        try{
            $form=Formulaire::find($id);
            Formulaire::where("id",$id)->update(["designation" =>$request[0]["title"]
            // ,'etablissement_id'=>$request[0]["etablissement_id"]
           ]);

            $stack=[];
            foreach ($request->all() as $question) {

            // $form->inputs()->
            //     $form->inputs()->detach();


if (!isset($question["title"])) {
    array_push($stack, $question["input_id"]);
//    $element= FormInput::where([['formulaire_id','=',$id],['input_id','=',$question["input_id"]]]);
    $element= DB::table('formulaire_input')->where('formulaire_id', '=', $id)->where('input_id', '=', $question["input_id"])->first();

    if (!isset($element)) {
        $form->inputs()->attach($question["input_id"], ['required' => $question["required"]]);

    } else {
        $form->inputs()->updateExistingPivot($question["input_id"], array('required' => $question["required"]));
    }
}
                // foreach ($stack as &$value) {
            // $delete_element= DB::table('formulaire_input')->where('formulaire_id','=',$id)->where('input_id','=',$value)->first();

            // $delete_element = DB::table('formulaire_input')->where('formulaire_id', '=', $id);

            //    $delete_element->where(function ($query)use ($stack,$id) {
            //     foreach ($stack as &$value) {
            //         $query->orWhere('input_id', '=', $value);
            //         }
            // });

            // $result = $delete_element->pluck('input_id')->toArray();

                }
                $existant_elements= DB::table('formulaire_input')->where('formulaire_id','=',$id)->pluck('input_id','id')->toArray();

                foreach ($existant_elements as $key => $value) {
                    if(!in_array((string)$value, $stack)){
                        DB::table('formrequests')->where('formulaire_input_id','=',$key)->delete();
                        DB::table('formulaire_input')->where('formulaire_id', '=', $id)->where('input_id', '=', $value)->delete();
                    }
                    }
                return ['success'=>true,'message'=>'Form Saved ','Form'=>$form->id];
            }catch(\Exception $exception){
                return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
            }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $form = Formulaire::find($id);
        // $form_input=FormulaireInput::where('formulaire_id','=',$id)->get();
        // $tentatives = Tentative::where
        // $form_input->tentatives()->detach()
        // if($etablissement){
        //     $etablissement->gouvernerats()->delete();
        //     $etablissement->users()->delete();
        //     DB::table('etablissements')->where('id', '=', $id)->delete();
        //     return ['success'=>true,'message'=>'Etablissement deleted',];
        // }
        // return ['success'=>false,'message'=>'Etablissement doesn\'t exist '];

    }

    public function GetFormulaireFullData(Request $request, $id)
    {
        if(Formulaire::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }
        if (Gate::allows('update-form', Formulaire::find($id))) {



       $formulaire = Formulaire::with('inputs')->where("id","=",$id)->first();
    //    $tentative = Tentative::with('formulaireinputs')->where("id","=",$formulaire->id)->get();

        //    $formrequest = FormRequests::where(['formulaireinputs' => function ($query) use ($formulaire) {
        //     $query->where('formulaire_id','=',$formulaire->id);
        // }])->get();

        $formrequest = DB::table('formrequests')
            ->join('formulaire_input', 'formulaire_input.id', '=', 'formrequests.formulaire_input_id')
            ->where('formulaire_input.formulaire_id', '=', $formulaire->id)
            ->distinct()->count('tentative_id');
            // ->get();

       $tentatives = FormInput::with('tentatives')->where("formulaire_id","=",$formulaire->id)->first();

       $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'formulaire'=>$formulaire,'formrequest'=>$formrequest,'tentatives'=>$tentatives,'permissionNames'=>$permissionNames];
    }
    else{
        return response()->json(['error' => 'Not authorized.'],403);
    }
    }


    public function TableFieldsValues(Request $request){
        try{
        $validator= $request->validate([
            'table'=>['required'],
            'field'=>['required'],
        ]);

         $data = DB::table($request->table)->select($request->field)
            ->get();
            return ['success'=>true,'data'=>$data];

        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }
    }

    public function GetFormulaireByID($id)
    {
        try{
             $formulaires = Formulaire::with('inputs','etablissements')->where('etablissement_id','=',$id)->get();
             return ['success'=>true,'formulaires'=>$formulaires];

            }catch(\Exception $exception){
                return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
            }
    }
    public function User_GetFormulaireByID($id)
    {
        try{
             $formulaires = Formulaire::with('inputs','etablissements')->where('etablissement_id','=',$id)->get();
             return ['success'=>true,'formulaires'=>$formulaires];

            }catch(\Exception $exception){
                return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
            }
    }






}
