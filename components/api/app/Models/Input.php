<?php

namespace App\Models;
use App\Models\FormInput;
use App\Models\Formulaire;
use App\Models\FormRequests;
use App\Models\FormulaireInput;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Input extends Model
{    protected $fillable = ['label', 'label','type','options','textBoxtypes'];

    use HasFactory;

    public function formulaires()
    {
      return $this->belongsToMany(Formulaire::class)->withPivot('formulaire_id');
    }

    public function formrequests()
    {
        return $this->hasManyThrough(FormRequests::class, FormulaireInput::class,'input_id','formulaire_input_id');
    }





    // public function forulaireinputs()
    // {
    //   return $this->belongsToMany(FormInput::class)->withPivot('formulaire_id');
    // }

}
