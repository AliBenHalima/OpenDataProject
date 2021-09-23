<?php

namespace App\Http\Controllers\FormController;

use App\Models\form;
use App\Models\Element;
use App\Models\ElementValue;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class FormController extends Controller
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
            $form = new form([
                'name'=>$request[0]["title"]
            ]);
            $form->save();
            foreach ($request->all() as $question) {
                if (!isset($question["title"])) {
                    $element = new Element([
                    'name'=>$question['label'],
                    'value'=>$question['value'],
                    'required'=>$question['required'],
                    'answerType'=>$question['answerType'],
                ]);
                    $form->elements()->save($element);

                    foreach ($question['options'] as $option) {
                        $elementvalue = new ElementValue([
                        'name'=>$option['option'],
                        'value'=>$option['option']
                    ]);
                        $element->elementvalues()->save($elementvalue);
                    }
                }
            }
                return ['success'=>true,'message'=>'Form Saved ','Form'=>$form->id];
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
        $form = form::with('elements.elementvalues')->where("id","=",$id)->first();
        return ['success'=>true,'form'=>$form];
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
