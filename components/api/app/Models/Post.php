<?php

namespace App\Models;

use App\Models\User;
use App\Models\PieceJointe;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'sujet','user_id','etablissement_id'];

    public function users()
    {
        return $this->belongsTo(User::class,'user_id');

    }

    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class,'etablissement_id');

    }

    public function piecejointes()
    {
        return $this->hasMany(PieceJointe::class);
    }

}
