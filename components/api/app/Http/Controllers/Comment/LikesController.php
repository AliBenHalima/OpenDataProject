<?php

namespace App\Http\Controllers\Comment;

use App\Models\Comment;
use App\Models\Interaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class LikesController extends Controller
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
        try{
            $validator= $request->validate([
                'comment_id'=>['required'],
                'is_liked'=>['required'],
            ]);

            $interaction = Interaction::where([
                ['comment_id', '=', $request->comment_id],
                ['user_id', '=', auth()->user()->id]
            ])->first();

                if(empty($interaction)){
                    $interactions =Interaction::updateOrCreate([
                        'comment_id' => $request->comment_id, 'user_id' => auth()->user()->id],['is_liked'=> $request->is_liked]
                    );
                    return ['success'=>true,'message'=>'Comment liked'];

                }
                if (!empty($interaction) && $interaction['is_liked']==$request->is_liked) {
                    $interaction->delete();
                    return ['success'=>true,'message'=>'Like removed'];
                }

                if (!empty($interaction) && $interaction['is_liked']!=$request->is_liked) {
                    $interactions =Interaction::updateOrCreate([
                        'comment_id' => $request->comment_id, 'user_id' => auth()->user()->id],['is_liked'=> $request->is_liked]
                    );
                    return ['success'=>true,'message'=>'Comment liked'];
                }
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
        //
    }
}
