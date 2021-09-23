<?php

namespace App\Http\Controllers\UserController;


use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class RoleSpatieController extends Controller
{
    public function __construct()
    {
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $role = Role::get();
        $permissionNames = auth()->user()->getAllPermissions();

        return ['role'=>$role,'permissionNames'=>$permissionNames];
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
    {  try {
        $validator= $request->validate([
        'name'=>['required'],
        'permission'=>['required'],
    ]);

            $role = Role::create(['name' =>$request->name]);
            $role->syncPermissions($request->permission);
            return ['success'=>true,'message'=>'Role Saved ','role'=>$role];
        } catch (\Exception $exception) {
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
        $role = Role::find($id);
        return ['success'=>true,'role'=>$role];
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

        try {
        $validator= $request->validate([
            'name'=>['required'],
            'permission'=>['required'],
        ]);


        $role = Role::find($id);
        if ($role) {
            $role->name=$request->name;
            $role->syncPermissions($request->permission);
            $role->save();

            return ['success'=>true,'message'=>'role Updated '];
        }
        return ['success'=>false,'message'=>'role doesn\'t exist '];
    } catch (\Exception $exception) {
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
        try {
            $role = Role::find($id);
            if ($role) {
            $users=User::get();

            foreach ($users as $user) {
               if( $user->hasRole($role)){
                return ['success'=>false,'message'=>'Cant delete role, already affected to a user '];
                }
        }
                $role->delete();
                return ['success'=>true,'message'=>'role deleted '];
            }
            return ['success'=>false,'message'=>'role doesn\'t exist '];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }
    function GetRole_Permissions(Request $request){

        try {
            $validator= $request->validate([
                'id'=>['required'],
            ]);

        $role = Role::find($request->id);
       $permissions= $role->getAllPermissions();

    } catch (\Exception $exception) {
        return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
    }
        return ['success'=>true , 'permissions'=>$permissions];

    }
}
