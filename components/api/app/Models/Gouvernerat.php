<?php

namespace App\Models;

use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gouvernerat extends Model
{
    protected $fillable = ['name', 'etablissement_id'];
    use HasFactory;
    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class);

    }
}
