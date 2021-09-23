<?php

namespace App\Models;

use App\Models\User;
use App\Models\Image;
use App\Models\Gallery;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gallery extends Model
{

protected $fillable = ['sujet', 'description','user_id','etablissement_id','date'];

    use HasFactory;

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class,'etablissement_id');

    }

    public function users()
    {
        return $this->belongsTo(User::class,'user_id');

    }

}
