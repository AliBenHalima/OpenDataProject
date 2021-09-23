<?php

namespace App\Models;

use App\Models\FormInput;
use App\Models\FormRequests;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Formulaire extends Model
{    protected $fillable = ['code', 'designation','etablissement_id','formtype','accepted'];

    use HasFactory;

    public function inputs()
    {
      return $this->belongsToMany(Input::class)->withPivot('id','input_id','required');
    }

    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class,'etablissement_id');

    }

    // public function formrequests()
    // {
    //     return $this->hasManyThrough(FormRequests::class, FormInput::class);
    // }

}


