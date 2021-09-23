<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
class UserController extends Controller
{
    public function __construct()

    {
        $this->middleware('permission:view users,api', ['only' => ['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $users_withRoles =DB::table('roles')
        ->join('model_has_roles','model_has_roles.role_id', '=', 'roles.id')
        ->join('users','model_has_roles.model_id', '=', 'users.id')
        ->join('etablissements','users.etablissement_id','=','etablissements.id')
            ->select('users.*','roles.id as role_id' ,'roles.name as role_name','etablissements.id as Etab_id','etablissements.nom as etab_nom')
                 ->get();

        return ['success'=>true,'users'=>$users_withRoles,'permissions'=>auth()->user()->getAllPermissions()];
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
        try {
            $user = DB::table('users')
                ->where('users.id', '=', $id)
                ->first();

            $etablissement = DB::table('etablissements')
            ->where('etablissements.id', '=', $user->etablissement_id)
            ->first(); // to get a record rather than a collection

            return ["success"=>true,'message'=>$etablissement];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
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
    { if(!$request->nom ||
        !$request->description ||
        !$request->addresse){

        return ['success'=>false,'message'=>'verify your data '];
        }
        try {
            $user = User::find($id);
            if ($user) {
                $user->nom=$request->name;
                $user->email=$request->email;
                $user->password=Hash::make($request->password);
                $user->address=$request->address;
                $user->etablissement_id=$request->etablissement_id;

                $fileName = Str::random(10).'_'.$request->photo->getClientOriginalName();
                $request->photo->storeAs('images/Users', $fileName, 'public');

                $user->photo=$fileName;
                $user->assignRole($request->role);
                $user->save();

                return ['success'=>true,'message'=>'user Updated '];
            }
        }
    catch(\Exception $exception){
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

        $user = User::find($id);
        if($user){
            $user->delete();
            return ['success'=>true,'message'=>'user deleted',];
        }
        return ['success'=>false,'message'=>'user doesn\'t exist '];

    }

    public function filterUserByEtab($id)
    {
        try {
            $users_withRoles =DB::table('roles')
            ->join('model_has_roles','model_has_roles.role_id', '=', 'roles.id')
            ->join('users','model_has_roles.model_id', '=', 'users.id')
            ->join('etablissements','users.etablissement_id','=','etablissements.id')
            ->where('etablissement_id', '=', $id)
                ->select('users.*','roles.id as role_id' ,'roles.name as role_name','etablissements.id as Etab_id','etablissements.nom as etab_nom')
                     ->get();

            return ["success"=>true,'message'=>$users_withRoles];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }

    public function GetUserOfEtab($id)
    {
        try {
            $etabs = DB::table('etablissements')
                ->where('etablissements.id', '=', $id)
                ->get();
            return ["success"=>true,'message'=>$etabs];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }

    public function GetUserRole($id){
        try {

            $role =DB::table('roles')
                    ->join('model_has_roles', function ($join)use($id) {
                        $join->on('model_has_roles.role_id', '=', 'roles.id')
                             ->where('model_has_roles.model_id', '=', $id);
                    })
                    ->get();

            return ["success"=>true,'message'=>$role];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }

    public function GetUser_withEtab($id){
        if(User::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }
        if (Gate::allows('view-own-profile', $id)) {

        try {
            $user =DB::table('roles')
        ->join('model_has_roles', 'model_has_roles.role_id', '=', 'roles.id')
        ->join('users', 'model_has_roles.model_id', '=', 'users.id')
        ->join('etablissements', 'users.etablissement_id', '=', 'etablissements.id')
            ->select('users.*', 'roles.id as role_id', 'roles.name as role_name', 'etablissements.id as Etab_id', 'etablissements.nom as etab_nom')
            ->where('users.id', '=', $id)
            ->first();
            $permissionNames = auth()->user()->getAllPermissions();
            return ["success"=>true,'message'=>$user,'permissionNames'=>$permissionNames];
        } catch (\Exception $exception) {
            return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
        }
    }
                else{
                    return response()->json(['error' => 'Not authorized.'],403);
                }
    }
    public function Get_Self_ProfileInfo(){
        try {
        $user =DB::table('roles')
        ->join('model_has_roles','model_has_roles.role_id', '=', 'roles.id')
        ->join('users','model_has_roles.model_id', '=', 'users.id')
        ->join('etablissements','users.etablissement_id','=','etablissements.id')
            ->select('users.*','roles.id as role_id' ,'roles.name as role_name','etablissements.id as Etab_id','etablissements.nom as etab_nom')
            ->where('users.id', '=', auth()->user()->id)
            ->first();
            $permissionNames = auth()->user()->getAllPermissions();
                 return ["success"=>true,'message'=>$user,'permissionNames'=>$permissionNames];

                } catch (\Exception $exception) {
                    return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
                }

    }

    public function UsersByETabID($id){
            $users_withRoles =DB::table('roles')
            ->join('model_has_roles','model_has_roles.role_id', '=', 'roles.id')
            ->join('users','model_has_roles.model_id', '=', 'users.id')
            ->join('etablissements','users.etablissement_id','=','etablissements.id')
            ->where('users.Etablissement_id','=',$id)
                ->select('users.*','roles.id as role_id' ,'roles.name as role_name','etablissements.id as Etab_id','etablissements.nom as etab_nom')
                     ->get();

            return ['success'=>true,'users'=>$users_withRoles,'permissions'=>auth()->user()->getAllPermissions()];
        }
}
