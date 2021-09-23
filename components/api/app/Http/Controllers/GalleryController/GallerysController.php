<?php

namespace App\Http\Controllers\GalleryController;

use App\Models\Image;
use App\Models\Galerie;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class GallerysController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Galerie::get();
        return ['success' => true, 'posts' => $posts];
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
            $validator = $request->validate([
                'sujet' => ['required'],
                'description' => ['required'],
                'date' => ['required'],
                'etablissement_id' => ['required'],
                'piece' => ['required'],
            ]);

            $arr = [
                'sujet' => $request->sujet,
                'description' => $request->description,
                'date' => date('Y-m-d H:i', strtotime($request->date_debut)),
                'user_id' => Auth::user()->id,
                'etablissement_id' => $request->etablissement_id,
            ];

            $galerie = Galerie::create($arr);

            foreach ($request->contenu as $contenu) {
                $fileName =
                    Str::random(20) . '_' . $contenu->getClientOriginalName();
                $contenu->storeAs('Gallery/Images', $fileName, 'public');

                $image = new Image([
                    'name' => $contenu->getClientOriginalName(),
                    'gallery_id' => $galerie->id,
                ]);

                $image->contenu = $fileName;
                $image->save();
            }

            return ['success' => true, 'message' => ' Image Saved '];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
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
