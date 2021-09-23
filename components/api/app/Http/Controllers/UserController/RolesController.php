<?php

namespace App\Http\Controllers\UserController;

use App\Models\role;
use App\Models\privilege;
use Illuminate\Http\Request;
use App\Models\Etablissement;
use App\Http\Controllers\Controller;

class RolesController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
    public function index()
    {
        $role = role::get();
        return ['role'=>$role];
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
        $validator= $request->validate([
           'name'=>['required'],
       ]);

        $role = new role([
           'name'=>$request->name,

       ]);
        try {
            $role->save();
            foreach ($request->all() as $key=>$value) {
                if ($key!="name") {
                    $priv = privilege::find($value);
                    $role->privileges()->attach($priv);
                }
            }

            return ['success'=>true,'message'=>'role Saved '];
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
        $role = role::find($id);
        return ['role'=>$role->privileges];
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
        $role = role::find($id);
        if ($role) {
            $role->name=$request->name;
            $role->save();

            return ['success'=>true,'message'=>'role Updated '];
        }
        return ['success'=>false,'message'=>'role doesn\'t exist '];
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $role = role::find($id);
        if ($role) {
            $role->delete();
            return ['success'=>true,'message'=>'role deleted '];
        }
        return ['success'=>false,'message'=>'role doesn\'t exist '];
    }
}
