<?php

namespace App\Models;

use App\Models\Etablissement;
use App\Models\SujetDocument;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'description','contenu','etablissement_id','sujet_document_id'];

    public function sujetdocuments()
    {
        return $this->belongsTo(SujetDocument::class,'sujet_document_id');

    }
    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class,'etablissement_id');

    }

}
