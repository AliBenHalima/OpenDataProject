<?php

namespace App\Models;

use App\Models\Message;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sujet extends Model
{
    use HasFactory;
    protected $fillable = ['name','etablissement_id'];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class);

    }
}
