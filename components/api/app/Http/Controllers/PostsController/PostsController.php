<?php

namespace App\Http\Controllers\PostsController;

use App\Models\Post;
use App\Models\PieceJointe;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Database\Eloquent\Model;

class PostsController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:view posts,api', ['only' => ['show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::with('etablissements')->get();
        $permissionNames = auth()
            ->user()
            ->getAllPermissions();
        return [
            'success' => true,
            'posts' => $posts,
            'permissionNames' => $permissionNames,
        ];
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
                'name' => ['required'],
                'description' => ['required'],
                'sujet' => ['required'],
                // 'user_id'=>['required'],
                'etablissement_id' => ['required'],
                'piece' => ['required'],
            ]);

            $arr = [
                'name' => $request->name,
                'description' => $request->description,
                'sujet' => $request->sujet,
                'user_id' => Auth::user()->id,
                'etablissement_id' => $request->etablissement_id,
            ];

            $post = Post::create($arr);

            foreach ($request->piece as $piece) {
                $fileName =
                    Str::random(20) . '_' . $piece->getClientOriginalName();
                $piece->storeAs('documents/Posts', $fileName, 'public');

                $piece = new PieceJointe([
                    'name' => $piece->getClientOriginalName(),
                    'post_id' => $post->id,
                ]);

                $piece->contenu = $fileName;
                $piece->save();
            }

            return ['success' => true, 'message' => ' Post Saved '];
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
        if (Post::find($id) == null) {
            return response()->json(['error' => 'Not Found.'], 404);
        }
        if (Gate::allows('view-post', Post::find($id))) {
            $post = Post::find($id);
            return ['success' => true, 'posts' => $post];
        } else {
            return response()->json(['error' => 'Not authorized.'], 403);
        }

        // $post =  DB::table('posts')->where('etablissement_id', '=', $id)
        // ->get();
        // return ['success'=>true,'posts'=>$post];
    }
    public function getpostByEtab($id)
    {
        $post = Post::where('etablissement_id', '=', $id)
            ->with('users.roles', 'etablissements', 'piecejointes')
            ->get();
        if (auth()->user() == null) {
            return ['success' => true, 'posts' => $post];
        }
        $permissionNames = auth()
            ->user()
            ->getAllPermissions();
        return [
            'success' => true,
            'posts' => $post,
            'permissionNames' => $permissionNames,
        ];
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
    public function updatePost(Request $request, $id)
    {
        if (Gate::allows('update-post', Post::find($id))) {
            try {
                $validator = $request->validate([
                    'name' => ['required'],
                    'description' => ['required'],
                    'sujet' => ['required'],
                    'etablissement_id' => ['required'],
                    'piece' => ['required'],
                ]);
                $arr = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'sujet' => $request->sujet,
                    'user_id' => Auth::user()->id,
                    'etablissement_id' => $request->etablissement_id,
                ];
                $post = Post::find($request->id);
                DB::table('posts')
                    ->where('id', '=', $post->id)
                    ->update($arr);

                DB::table('piecejointes')
                    ->where('post_id', '=', $post->id)
                    ->delete();

                foreach ($request->piece as $piece) {
                    $fileName =
                        Str::random(20) . '_' . $piece->getClientOriginalName();
                    $piece->storeAs('documents/Posts', $fileName, 'public');

                    $piece = new PieceJointe([
                        'name' => $piece->getClientOriginalName(),
                        'post_id' => $post->id,
                    ]);

                    $piece->contenu = $fileName;
                    $piece->save();
                }

                return ['success' => true, 'message' => ' Post Saved '];
            } catch (\Exception $exception) {
                return response([
                    'success' => false,
                    'message' => $exception->getMessage(),
                ]);
            }
        } else {
            return response()->json(['error' => 'Not authorized.'], 403);
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
            $post = Post::find($id);
            if ($post) {
                $post->piecejointes()->delete();
                DB::table('posts')
                    ->where('id', '=', $id)
                    ->delete();
                return ['success' => true, 'message' => 'post deleted'];
            }
            return ['success' => false, 'message' => 'post doesn\'t exist '];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function GetFullPosts($id)
    {
        try {
            $posts = DB::table('posts')
                ->join(
                    'etablissements',
                    'etablissements.id',
                    '=',
                    'posts.etablissement_id'
                )
                ->join('piecejointes', 'piecejointes.post_id', '=', 'posts.id')
                ->where('posts.id', '=', $id)
                ->select(
                    'posts.*',
                    'etablissements.nom as etablissements_nom',
                    'piecejointes.name as piecejointes_name',
                    'piecejointes.contenu as contenu'
                )
                ->get();
            return ['success' => true, 'posts' => $posts];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function GetPostwithRole($id)
    {
        if (Post::find($id) == null) {
            return response()->json(['error' => 'Not Found.'], 404);
        }

        $post = Post::where('id', '=', $id)
            ->with('users.roles', 'etablissements', 'piecejointes')
            ->first();
        return ['success' => true, 'posts' => $post];
    }
}
