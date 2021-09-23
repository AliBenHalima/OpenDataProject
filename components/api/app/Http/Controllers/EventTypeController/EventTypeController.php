<?php

namespace App\Http\Controllers\EventTypeController;

use App\Models\EventType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $eventType = EventType::get();
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'eventTypes'=>$eventType,'permissionNames'=>$permissionNames];
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
                'name'=>['required']
            ]);

            $eventType = new EventType([
                'name'=>$request->name,
            ]);
                $eventType->save();
                return ['success'=>true,'message'=>'eventType  Saved '];

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
        $eventType = EventType::find($id);
        return ['success'=>true,'eventType'=>$eventType];
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
        $eventType = EventType::find($id);
        if($eventType){
            $eventType->documents()->delete();
            DB::table('eventtypes')->where('id', '=', $id)->delete();
            return ['success'=>true,'message'=>'eventType deleted',];
        }
        return ['success'=>false,'message'=>'eventType doesn\'t exist '];
    }
}
