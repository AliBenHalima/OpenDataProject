<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Sujet;
use App\Models\Message;
use Illuminate\Http\Request;
use App\Events\PrivateMessages;
use App\Events\PodcastProcessed;
use Illuminate\Support\Facades\DB;
use Pusher\Laravel\Facades\Pusher;
use Illuminate\Support\Facades\Auth;

class chatcontroller extends Controller
{
    public function send(Request $request)
    {
        try {
            event(new PodcastProcessed("Hello", "World"));
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }

    public function sujets(Request $request)
    {
        try {

            return ['success'=>true,'sujets'=>Sujet::all()];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }

    public function messages(Request $request,$sujet_id)
    {
        try {
            $messages=Message::where('sujet_id','=',$sujet_id)
            ->with('user')
            ->orderBy('created_at','DESC')
            ->get();
            return ['success'=>true,'messages'=>$messages];

        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }

    public function saveMessage(Request $request)
    {
        try {
                $msg = new Message();
                $msg->contenu = $request->contenu;
                $msg->user_id = Auth::user()->id;
                $msg->etablissement_id =Auth::user()->etablissement_id;
                $msg->sujet_id =$request->sujet_id;
                $msg->save();

                broadcast(new PodcastProcessed(Auth::user(),$msg->load('users')))->toOthers();

            return ['success'=>true,'message'=>$msg];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }


    public function fetchMessaged(Request $request)
    {
        try {

            return ['success'=>true,'messages'=>Message::with('users')->get()];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }

    public function PrivateMsg(Request $request,User $user)
    {
        $PrivateCommunications =Message::with('users')
        ->where(['user_id'=>Auth::user()->id,'receiver_id'=>$user->id])
        ->orWhere(function($query) use($user){
            $query->where(['user_id'=>$user->id,'receiver_id'=>Auth::user()->id]);
        })->get();

        return ['success'=>true,'users'=>$PrivateCommunications];
    }

    public function ConvPrivateMsg(Request $request)
    {
        try {


            $users = User::get();
            $UsersWithConv=[] ;
            foreach ($users as $user) {

        $PrivateCommunications =Message::with('users')
        ->where(['user_id'=>Auth::user()->id,'receiver_id'=>$user->id])
        ->orWhere(function($query) use($user){
            $query->where(['user_id'=>$user->id,'receiver_id'=>Auth::user()->id]);
        })->latest()->take(1)->first();

        if(!is_null($PrivateCommunications))
                array_push($UsersWithConv, $PrivateCommunications);
            else{
                if($user->id != Auth::user()->id)
                array_push($UsersWithConv, User::find($user->id));
            }
            }
            return ['success'=>true,'conversations'=>$UsersWithConv];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }

    }

    public function savePrivateMessage(Request $request)
    {
        try {
                $msg = new Message();
                $msg->contenu = $request->contenu;
                $msg->user_id = Auth::user()->id;
                $msg->etablissement_id =Auth::user()->etablissement_id;
                $msg->receiver_id =$request->receiver_id;
                $msg->save();

                broadcast(new PrivateMessages($msg->load('users')))->toOthers();

            return ['success'=>true,'message'=>$msg];
        } catch (\Exception $exception) {
            return response([
        'success'=>false,'message'=>$exception->getMessage()
    ]);
        }
    }

    public function check(Request $request)
    {
        try {
            return[Auth::check()];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }
    public function MyConv(Request $request)
    {
        $PrivateCommunications =DB::table('messages')
        ->where([
            ['user_id','=',Auth::user()->id],['receiver_id','<>',null]
            ])
        ->orWhere(function($query){
            $query->where([['receiver_id','=',Auth::user()->id],['user_id','<>',Auth::user()->id]]);
        })->select('receiver_id','user_id')->Groupby('receiver_id','user_id')
        ->get() ;

        return ['success'=>true,'users'=>$PrivateCommunications];
    }


}
