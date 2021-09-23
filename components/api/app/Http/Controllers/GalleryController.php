<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Gallery;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class GalleryController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:update galleries,api', ['only' => ['update']]);
        $this->middleware('permission:show galleries,api', ['only' => ['show']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $Gallery = Gallery::with('etablissements','users')->get();
        return  ['success'=>true,'Gallery'=>$Gallery];
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
        try {
            $validator= $request->validate([
                'sujet'=>['required'],
                'description'=>['required'],
                'date'=>['required'],
                'etablissement_id'=>['required'],
                'contenu'=>['required'],
            ]);

            $arr=  [
                'sujet'=>$request->sujet,
                'description'=>$request->description,
                'date'=> date('Y-m-d H:i', strtotime($request->date)),
                'user_id'=>Auth::user()->id,
                'etablissement_id'=>$request->etablissement_id,
          ];

            $galerie = Gallery::create($arr);

            foreach ($request->contenu as $piece) {
                $fileName = Str::random(20).'_'.$piece->getClientOriginalName();
                $piece->storeAs('Gallery/Images', $fileName, 'public');

                $piece = new Image([
                        'name'=>$piece->getClientOriginalName(),
                        'gallery_id'=>$galerie->id
                    ]);

                $piece->contenu=$fileName;
                $piece->save();
            }

            return ['success'=>true,'message'=>' Image Saved '];
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
        if(Gallery::find($id)==null){
            return response()->json(['error' => 'Not Found.'],404);
        }
         $gallery = Gallery::with('images')->where('id', '=', $id)
        ->first();
        return ['success'=>true,'galleries'=>$gallery];
    }

    public function GetGalleriesByEtab($id)
    {
        $Gallery = Gallery::with('etablissements','users','images')->where('etablissement_id','=',$id)->get();
        return  ['success'=>true,'Gallery'=>$Gallery];
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
            'sujet'=>['required'],
            'description'=>['required'],
            'date'=>['required'],
        ]);

        $gallery = Gallery::find($id);
        if ($gallery) {
            $gallery->update([
                'sujet' => $request->sujet,
                'description'=>$request->description,
                'date'=> date('Y-m-d H:i', strtotime($request->date)),
            ]);
            return ['success'=>true,'message'=>'gallery Updated '];
        }
        return ['success'=>false,'message'=>'gallery doesn\'t exist '];

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
            $gallery = Gallery::find($id);
            if ($gallery) {
                $gallery->images()->delete();
                DB::table('galleries')->where('id', '=', $id)->delete();
                return ['success'=>true,'message'=>'gallery deleted',];
            }
            return ['success'=>false,'message'=>'gallery doesn\'t exist '];
        } catch (\Exception $exception) {
            return response([
            'success'=>false,'message'=>$exception->getMessage()
        ]);
        }
    }

    public function GetFullGallery($id){
        try {
                  $gallery =Gallery::with('images')
                  ->where('galleries.etablissement_id', '=', $id)
                  ->get();
                  $permissionNames = auth()->user()->getAllPermissions();

                    return ['success'=>true,'galleries'=>$gallery,'permissionNames'=>$permissionNames];
                } catch (\Exception $exception) {
                    return response([
                    'success'=>false,'message'=>$exception->getMessage()
                ]);
                }
            }

    public function DeleteImage($id){
        $image = Image::find($id);
        if($image){
            $image->delete();
            return ['success'=>true,'message'=>'image deleted '];
        }
        return ['success'=>false,'message'=>'image doesn\'t exist '];

    }

    public function AddImage(Request $request,$id){
        try{
        foreach ($request->contenu as $piece) {
            $fileName = Str::random(20).'_'.$piece->getClientOriginalName();
            $piece->storeAs('Gallery/Images', $fileName, 'public');

            $piece = new Image([
                'name'=>$piece->getClientOriginalName(),
                'gallery_id'=>$id
            ]);

            $piece->contenu=$fileName;
            $piece->save();
        }
        return ['success'=>true,'message'=>' Image Saved '];
    } catch (\Exception $exception) {
        return response([
                'success'=>false,'message'=>$exception->getMessage()
            ]);
    }
    }



}
