<?php

namespace App\Models;

use App\Models\Document;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SujetDocument extends Model
{
    use HasFactory;
    protected $fillable = ['nom'];
    // protected $table = 'sujetdocuments';

    public function documents()
    {
        return $this->hasMany(Document::class,'document_id');
    }
}
