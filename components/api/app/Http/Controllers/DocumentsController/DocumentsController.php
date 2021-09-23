<?php

namespace App\Http\Controllers\DocumentsController;

use Exception;
use App\Models\Document;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SujetDocument;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DocumentsController extends Controller
{
    public function __construct()
    {
        // $this->middleware('permission:create documents,api', ['only' => ['store']]);
        // $this->middleware('permission:update roles,api', ['only' => ['update']]);
        $this->middleware('permission:view documents,api', [
            'only' => ['index', 'AllDocuments', 'AllDocumentsByID'],
        ]);
        // $this->middleware('permission:delete roles,api', ['only' => ['destroy']]);
        // $this->middleware('CheckRole')->only(['AllDocuments']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $documents = Document::get();
        return ['success' => true, 'documents' => $documents];
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
                'nom' => ['required'],
                'description' => ['required'],
                'contenu' => 'required|mimes:pdf',
                'etablissement_id' => ['required'],
                'sujet_document_id' => ['required'],
            ]);

            $document = new Document([
                'nom' => $request->nom,
                'description' => $request->description,
                'contenu' => $request->contenu,
                'etablissement_id' => $request->etablissement_id,
                'sujet_document_id' => $request->sujet_document_id,
            ]);
            $fileName =
                Str::random(20) .
                '_' .
                $request->contenu->getClientOriginalName();
            $request->contenu->storeAs('documents/Users', $fileName, 'public');

            $document->contenu = $fileName;

            $document->save();
            return [
                'success' => true,
                'message' => 'Document Saved ',
                'document' => $document,
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
        $document = DB::table('documents')
            ->where('etablissement_id', '=', $id)
            ->get();
        return ['success' => true, 'documents' => $document];
    }

    public function GetFullDocumentsByETab($id)
    {
        $documents = Document::with('etablissements', 'sujetdocuments')
            ->where('etablissement_id', '=', $id)
            ->get();

        $Sujets = DB::table('sujet_documents')
            ->join(
                'documents',
                'sujet_documents.id',
                '=',
                'documents.sujet_document_id'
            )
            ->where('documents.etablissement_id', '=', $id)
            ->select('sujet_documents.id', 'sujet_documents.nom')
            ->distinct()
            ->get();

        return [
            'success' => true,
            'documents' => $documents,
            'Sujets' => $Sujets,
        ];
    }

    public function GetFullDocuments()
    {
        $documents = Document::with('etablissements', 'sujetdocuments')
            ->where('etablissement_id', '=', $id)
            ->get();

        $Sujets = DB::table('sujet_documents')
            ->join(
                'documents',
                'sujet_documents.id',
                '=',
                'documents.sujet_document_id'
            )
            ->select('sujet_documents.id', 'sujet_documents.nom')
            ->distinct()
            ->get();

        return [
            'success' => true,
            'documents' => $documents,
            'Sujets' => $Sujets,
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
    }

    public function updateDocument(Request $request, $id)
    {
        try {
            $validator = $request->validate([
                'nom' => ['required'],
                'description' => ['required'],
                'contenu' => 'mimes:pdf',
                'etablissement_id' => ['required'],
                'sujet_document_id' => ['required'],
            ]);

            $document = Document::find($id);
            if ($document) {
                $document->nom = $request->nom;
                $document->description = $request->description;
                $document->etablissement_id = $request->etablissement_id;
                $document->sujet_document_id = $request->sujet_document_id;

                if ($request->contenu) {
                    $fileName =
                        Str::random(10) .
                        '_' .
                        $request->contenu->getClientOriginalName();
                    $request->contenu->storeAs(
                        'documents/Users',
                        $fileName,
                        'public'
                    );

                    $document->contenu = $fileName;
                }

                $document->save();

                return [
                    'success' => true,
                    'message' => 'document Updated ',
                    'filename' => $fileName,
                ];
            }
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
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
            $document = Document::find($id);
            if ($document) {
                DB::table('documents')
                    ->where('id', '=', $id)
                    ->delete();
                return ['success' => true, 'message' => 'documents deleted'];
            }
            return [
                'success' => false,
                'message' => 'documents doesn\'t exist ',
            ];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function AllDocuments(Request $request)
    {
        try {
            $documents = DB::table('documents')
                ->join(
                    'etablissements',
                    'etablissements.id',
                    '=',
                    'documents.etablissement_id'
                )
                ->join(
                    'sujet_documents',
                    'sujet_documents.id',
                    '=',
                    'documents.sujet_document_id'
                )
                ->select(
                    'documents.*',
                    'etablissements.nom as etablissements_nom',
                    'sujet_documents.nom as sujet_document_nom'
                )
                ->get();

            $permissionNames = auth()
                ->user()
                ->getAllPermissions();
            return [
                'success' => true,
                'documents' => $documents,
                'permissionNames' => $permissionNames,
            ];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function AllDocumentsByID(Request $request, $id)
    {
        try {
            $documents = DB::table('documents')
                ->join(
                    'etablissements',
                    'etablissements.id',
                    '=',
                    'documents.etablissement_id'
                )
                ->join(
                    'sujet_documents',
                    'sujet_documents.id',
                    '=',
                    'documents.sujet_document_id'
                )
                ->where('documents.etablissement_id', '=', $id)
                ->select(
                    'documents.*',
                    'etablissements.nom as etablissements_nom',
                    'sujet_documents.nom as sujet_document_nom'
                )
                ->get();

            $permissionNames = auth()
                ->user()
                ->getAllPermissions();
            return [
                'success' => true,
                'documents' => $documents,
                'permissionNames' => $permissionNames,
            ];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }

    public function DocsByEtabID($id)
    {
        try {
            $documents = DB::table('documents')
                ->join(
                    'etablissements',
                    'etablissements.id',
                    '=',
                    'documents.etablissement_id'
                )
                ->join(
                    'sujet_documents',
                    'sujet_documents.id',
                    '=',
                    'documents.sujet_document_id'
                )

                ->where('documents.etablissement_id', '=', $id)
                ->select(
                    'documents.*',
                    'etablissements.nom as etablissements_nom',
                    'sujet_documents.nom as sujet_document_nom'
                )
                ->get();
            return ['success' => true, 'documents' => $documents];
        } catch (\Exception $exception) {
            return response([
                'success' => false,
                'message' => $exception->getMessage(),
            ]);
        }
    }
}
