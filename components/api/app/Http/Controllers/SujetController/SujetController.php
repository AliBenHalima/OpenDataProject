<?php

namespace App\Http\Controllers\SujetController;

use App\Models\Sujet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class SujetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sujet = Sujet::get();
        return ['success' => true, 'sujets' => $sujet];
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
        try {
            $validator = $request->validate([
                'name' => ['required'],
                'etablissement_id' => ['required'],
            ]);

            $sujet = Sujet::create([
                'name' => $request->name,
                'etablissement_id' => $request->etablissement_id,
            ]);
            return [
                'success' => true,
                'message' => 'Sujet  Saved ',
                'sujet' => $sujet,
            ];
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
        $sujet = DB::table('sujets')
            ->where('etablissement_id', '=', $id)
            ->get();
        return ['success' => true, 'sujets' => $sujet];
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
        $sujet = Sujet::find($id);
        if ($sujet) {
            $sujet->messages()->delete();

            DB::table('sujets')
                ->where('id', '=', $id)
                ->delete();
            return ['success' => true, 'message' => 'Sujet deleted'];
        }
        return ['success' => false, 'message' => 'Sujet doesn\'t exist '];
    }
}
