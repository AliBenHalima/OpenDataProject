<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormInput extends Model
{    protected $fillable = ['id','required','formulaire_id','input_id'];

    protected $table = 'formulaire_input';

    use HasFactory;

    public function formulaires()
    {
        return $this->belongsTo(Formulaire::class, 'formulaire_id');
    }

    public function inputs()
    {
        return $this->belongsTo(Input::class,'input_id');
    }

    public function formrequests()
    {
        return $this->belongsTo(formrequests::class,'formulaire_input_id');
    }

    public function tentatives()
    {
      return $this->belongsToMany(Tentative::class,'formrequests','formulaire_input_id','tentative_id')->withPivot('formulaire_input_id','tentative_id');
    }


}
