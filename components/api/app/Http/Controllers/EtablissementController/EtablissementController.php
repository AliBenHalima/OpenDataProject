<?php

namespace App\Http\Controllers\EtablissementController;


use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Etablissement;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;


class EtablissementController extends Controller
{
     public function __construct()
    {
        $this->middleware('permission:update etablissements,api', ['only' => ['showEtablissement']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $etablissement = Etablissement::get();
         if(auth()->user()==null){
            return ['success'=>true,'etablissements'=>$etablissement];
         }
                     $permissionNames = auth()->user()->getAllPermissions();
            return ['success'=>true,'etablissements'=>$etablissement,'permissionNames'=>$permissionNames];
    }

    public function AllEtabs()
    {
        $etablissement = Etablissement::get();
        if (auth()->user()==null) {
            return ['success'=>true,'etablissements'=>$etablissement];
        }
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'etablissements'=>$etablissement,'permissionNames'=>$permissionNames];
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

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
            'nom'=>['required'],
            'description'=>['required'],
            'short_description'=>['required'],
            'addresse'=>['required'],
            'photo'=>['required'],
            'email'=>['required'],
            'phone_number'=>['required'],
            'color'=>['required'],
            'mapLocation'=>['required'],
        ]);

        $etablissement = new Etablissement([
            'nom'=>$request->nom,
            'description'=>$request->description,
            'email'=>$request->email,
            'phone_number'=>$request->phone_number,
            'color'=>$request->color,
            'addresse'=>$request->addresse,
            'mapLocation'=>$request->mapLocation,
            'short_description'=>$request->short_description,
        ]);

        if(!empty($request->video)){
            $etablissement->video=$request->video;
        }

        $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
        $request->photo->storeAs('images/Etablissements', $fileName, 'public');
        $etablissement->photo = $fileName;
            $etablissement->save();
            return ['success'=>true,'message'=>'Saved '];

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
        $etablissement = DB::table('etablissements')->where('id','=',$id)->get();
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'etablissements'=>$etablissement,'permissionNames'=>$permissionNames];
    }

    public function showEtablissement($id)
    {
        if(Etablissement::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }
        if (Gate::allows('view-etablissement', Etablissement::find($id))) {
            $etablissement = DB::table('etablissements')->where('id','=',$id)->get();
            $permissionNames = auth()->user()->getAllPermissions();
            return ['success'=>true,'etablissements'=>$etablissement,'permissionNames'=>$permissionNames];
        }
        else{
            return response()->json(['error' => 'Not authorized.'],403);
        }
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
            return $request->all();
            if(!$request->nom ||
            !$request->description ||
            !$request->addresse){

            return ['success'=>false,'message'=>'verify your data '];
            }

        $etablissement = Etablissement::find($id);
        if($etablissement){
            if(!empty($request->photo)){
                $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
                $request->photo->storeAs('images/Etablissements', $fileName, 'public');
                $etablissement->photo = $fileName;
            }
            $etablissement->nom=$request->nom;
            $etablissement->description=$request->description;
            $etablissement->addresse=$request->addresse;
            $etablissement->save();

            return ['success'=>true,'message'=>'Etablissement Updated '];
        }
        return ['success'=>false,'message'=>'Etablissement doesn\'t exist '];

    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $etablissement = Etablissement::find($id);
        if($etablissement){
            $etablissement->gouvernerats()->delete();
            $etablissement->users()->delete();
            DB::table('etablissements')->where('id', '=', $id)->delete();
            return ['success'=>true,'message'=>'Etablissement deleted',];
        }
        return ['success'=>false,'message'=>'Etablissement doesn\'t exist '];

    }

    public function EditEtab(Request $request, $id){
        if(!$request->nom ||
        !$request->description ||
        !$request->short_description ||
        !$request->mapLocation ||
        !$request->email ||
        !$request->phone_number ||
        !$request->color ||
        !$request->isMain ||
        !$request->addresse){

        return ['success'=>false,'message'=>'verify your data '];
        }
    $etablissement = Etablissement::find($id);
    if($etablissement){
        if(!empty($request->photo)){
            $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
            $request->photo->storeAs('images/Etablissements', $fileName, 'public');
            $etablissement->photo = $fileName;
        }
        if(!empty($request->video)){
            $etablissement->video=$request->video;
        }
        $etablissement->nom=$request->nom;
        $etablissement->description=$request->description;
        $etablissement->addresse=$request->addresse;
        $etablissement->short_description=$request->short_description;
        $etablissement->mapLocation=$request->mapLocation;
        $etablissement->color=$request->color;
        $etablissement->email=$request->email;
        $etablissement->phone_number=$request->phone_number;

        if($request->isMain=="true"){
         DB::table('etablissements')->update(array('isMain' => 0));

            $etablissement->isMain=1;
        }
        else{
            $etablissement->isMain=0;
        }
        $etablissement->save();
        return ['success'=>true,'message'=>'Etablissement Updated '];
    }
    return ['success'=>false,'message'=>'Etablissement doesn\'t exist '];
    }
}
