<?php

namespace App\Http\Controllers\UserController;

use App\Models\role;
use App\Models\privilege;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PrivilegesController extends Controller
{
    /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
      // $etab = Etablissement::find(1);
      $privilege = privilege::find(5);
      return ['privilege'=>$privilege];
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

      $privilege = new privilege([
          'name'=>$request->name,

      ]);
      try{
          $privilege->save();
          return ['success'=>true,'message'=>'privilege Saved '];

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
      $privilege = privilege::find($id);
      return ['privilege'=>$privilege];
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
  // {   dd($request->all());
      {
      $privilege = privilege::find($id);
      if($privilege){
          $privilege->name=$request->name;
          $privilege->save();
          return ['success'=>true,'message'=>'privilege Updated '];
      }
      return ['success'=>false,'message'=>'privilege doesn\'t exist '];

  }


  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
      $privilege = privilege::find($id);
      if($privilege){
          $privilege->delete();
          return ['success'=>true,'message'=>'privilege deleted '];
      }
      return ['success'=>false,'message'=>'privilege doesn\'t exist '];

  }
}
