<?php

namespace App\Http\Controllers\EvenementController;

use App\Models\Comment;
use App\Models\Evenement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class EvenementController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $event = Evenement::get();
        return ['success'=>true,'event'=>$event];
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
    public function store(Request $request){

        try{
            $validator= $request->validate([
                'titre'=>['required'],
                'description'=>['required'],
                'localisation'=>['required'],
                'date_debut'=>['required'],
                'date_fin'=>['required'],
                'etablissement_id'=>['required'],
                'eventtype_id'=>['required'],
            ]);

            $event = new Evenement([
                'titre'=>$request->titre,
                'description'=>$request->description,
                'localisation'=>$request->localisation,
                'date_debut'=> date('Y-m-d H:i', strtotime($request->date_debut)),
                'date_fin'=> date('Y-m-d H:i', strtotime($request->date_fin)),
                'etablissement_id'=>$request->etablissement_id,
                'eventtype_id'=>$request->eventtype_id
            ]);
                if(!empty($request->photo)){
                    $fileName = Str::random(20).'_'.$request->photo->getClientOriginalName();
                    $request->photo->storeAs('documents/Events', $fileName, 'public');
                    $event->photo=$fileName;
                }

                $event->save();
                return ['success'=>true,'message'=>'Event Saved ','event'=>$event->id,'eventimage'=>$event->photo];

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
        if(Evenement::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }
        $event  = Evenement::with('etablissements','eventtypes','users.comments')->where('evenements.id','=',$id)->get();
        $comments = Comment::with('users','user')->where('evenement_id','=',$id)->get();
        $similarEvents=Evenement::with('etablissements','eventtypes')->where('eventtype_id','=',$event[0]->eventtype_id)->where('id','<>',$event[0]->id)->take(2)->get();
        return ['success'=>true,'events'=>$event,'similarEvents'=>$similarEvents,'comments'=>$comments];
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

    public function eventByEtab($id)
    {
        $event  = DB::table('evenements')->where('etablissement_id','=',$id)->get();
        if(auth()->user()==null){
            return ['success'=>true,'events'=>$event];
        }
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'events'=>$event,'permissionNames'=>$permissionNames];
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
    }

    public function UpdateEvent(Request $request, $id)
    {
        try{
        $validator= $request->validate([
            'titre'=>['required'],
            'description'=>['required'],
            'localisation'=>['required'],
            'date_debut'=>['required'],
            'date_fin'=>['required'],
            'etablissement_id'=>['required'],
            'eventtype_id'=>['required'],
        ]);

    $event = Evenement::find($id);
    if($event){
        $event->titre=$request->titre;
        $event->description=$request->description;
        $event->localisation=$request->localisation;
        $event->date_debut=date('Y-m-d H:i', strtotime($request->date_debut));
        $event->date_fin=date('Y-m-d H:i', strtotime($request->date_fin));
        $event->etablissement_id=$request->etablissement_id;
        $event->eventtype_id=$request->eventtype_id;

            if(!empty($request->photo)){
          $fileName = Str::random(20).'_'.$request->photo->getClientOriginalName();
          $request->photo->storeAs('documents/Events', $fileName, 'public');
              $event->photo=$fileName;
                }
                $event->save();

        return ['success'=>true,'message'=>'event Updated','eventimage'=>$event->photo];
    }
    return ['success'=>false,'message'=>'event doesn\'t exist '];
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
        try
        {
        $event = Evenement::find($id);
        if($event){
            DB::table('evenements')->where('id', '=', $id)->delete();
            return ['success'=>true,'message'=>'events deleted',];
        }
        return ['success'=>false,'message'=>'events doesn\'t exist '];
    }catch(\Exception $exception){
        return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
    }
    }


    public function GetFullEvents()
    {
        $event = Evenement::with('etablissements','eventtypes','users')->get();
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'event'=>$event,'permissionNames'=>$permissionNames];
    }

    public function GetFullEventsByID($id)
    {
        $event = Evenement::with('etablissements','eventtypes')->where("etablissement_id","=",$id)->get();
        return ['success'=>true,'event'=>$event];
    }

    public function GetFullEventsID($id)
    {
        $event = Evenement::with('etablissements','eventtypes','users')->where("etablissement_id","=",$id)->get();
        $permissionNames = auth()->user()->getAllPermissions();
        return ['success'=>true,'event'=>$event,'permissionNames'=>$permissionNames];
    }
}
