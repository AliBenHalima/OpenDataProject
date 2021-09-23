<?php

namespace App\Http\Controllers\UserController;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;

class PermissionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permission = Permission::get();
        return ['permission'=>$permission];
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
        ]);

         try{
            $permission = Permission::create(['name' =>$request->name]);
            return ['success'=>true,'message'=>'Permission Saved '];

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
        try{
        $permission = Permission::find($id);
        if ($permission) {
        $permission->delete();

        return ['success'=>true,'message'=>'permission deleted '];
    }
    return ['success'=>false,'message'=>'permission doesn\'t exist '];
} catch (\Exception $exception) {
    return response([
    'success'=>false,'message'=>$exception->getMessage()
]);
} }
public function GetRolesAndPermissions(){

}
}
