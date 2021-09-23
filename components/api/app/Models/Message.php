<?php

namespace App\Models;

use App\Models\User;
use App\Models\Sujet;
// use Laravel\Passport\Bridge\User;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;
    protected $fillable = ['contenu', 'user_id','etablissement_id','sujet_id'];

    public function users()
    {
        return $this->belongsTo(User::class,'user_id'); // real user importation ?

    }
    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class);

    }
    public function sujets()
    {
        return $this->belongsTo(Sujet::class);

    }
}



