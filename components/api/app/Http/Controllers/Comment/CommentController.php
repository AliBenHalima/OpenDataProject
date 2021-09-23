<?php

namespace App\Http\Controllers\Comment;

use App\Models\User;
use GuzzleHttp\Client;
use App\Models\Comment;
use App\Models\Evenement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;
class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $response_data=null;
    try{
        $validator= $request->validate([
            'event_id'=>['required'],
            'message'=>['required'],
        ]);

        $event = Evenement::find($request->event_id);

          $client = new Client();

          $res = $client->request('POST','http://127.0.0.1:5000/api/post', [
              'form_params' => [
                  'comment' => $request->message,
              ]
          ]);


          if ($res->getStatusCode() == 200) {
              $response_data = $res->getBody()->getContents();
          }

          else{
             return['success'=>false,'message'=>'accuracy error'];
          }

        $classification=null;
        $response_data=number_format($response_data,10);
        if((float)$response_data > 0.7){
          $classification="positive";
        }else if((float)$response_data <0.3){
          $classification="negative";
        }else{
          $classification="neutral";
        }

          $event->users()->attach(auth()->user()->id,[
            'message' => $request->message,
            'accuracy'=>$response_data,
            'classification'=>$classification
          ]);
          return ['success'=>true,'message'=>'Comment Saved'];


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
        // return $request->all();
        try{
            $validator= $request->validate([
                'comment_id'=>['required'],
                'updatedtext'=>['required'],
            ]);

            $comment = Comment::find($request->comment_id);
            $comment->message= $request->updatedtext;

            $client = new Client();

            $res = $client->request('POST','http://127.0.0.1:5000/api/post', [
                'form_params' => [
                    'comment' => $request->updatedtext
                ]
            ]);

            if ($res->getStatusCode() == 200) {
                $response_data = $res->getBody()->getContents();
            }
            else{
               return['success'=>false,'message'=>'accuracy error'];
            }

            $classification=null;
        $response_data=number_format($response_data,10);
        if((float)$response_data > 0.7){
          $classification="positive";
        }else if((float)$response_data <0.3){
          $classification="negative";
        }else{
          $classification="neutral";
        }
            $comment->accuracy=$response_data;
            $comment->classification=$classification;
            $comment->save();
              return ['success'=>true,'message'=>'Comment Updated'];

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
        try{
            $comment = Comment::find($id);
            $comment->userss()->detach();
            $comment->delete();
              return ['success'=>true,'message'=>'Comment Deleted'];

            }catch(\Exception $exception){
                return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
            }
    }

    public function SendMailToUsers(Request $request){
        try{
            $validator= $request->validate([
                'message'=>['required'],
                'users'=>['required'],
            ]);

            foreach ($request->users as $user_id) {
                $user = User::where('id', $user_id)->first();
                if (!$user) {
                    return ["success"=>false,'message','user does not exist'];
                }
                $x= $request->message;
                $f=$user_id;
                Mail::send('emails.AboutEvent', ['Message'=>$request->message,'User'=>$user->name], function (Message $message) use ($request,$user) {
                    $message->to($user->email);
                    $message->subject($request->subject);
                });


                if (count(Mail::failures()) > 0) {
                    return ['success'=>false,'message'=>'Mail does not exsist'];
                }
                return ["success"=>true,'message'=>'Mail sent'];
            }

        }catch(\Exception $exception){
            return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
        }
    }
}
