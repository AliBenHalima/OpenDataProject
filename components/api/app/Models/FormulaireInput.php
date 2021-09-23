<?php

namespace App\Models;

use App\Models\FormulaireInput;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormulaireInput extends Model
{
    protected $fillable = ['value','formulaire_input_id','tentative_id'];
    protected $table = 'formulaire_input';

    use HasFactory;

    public function formulaireinputs()
    {
        return $this->belongsTo(FormulaireInput::class,'formulaire_input_id');
    }

    public function tentatives()
    {
        return $this->belongsToMany(Tentative::class,'formrequests','formulaire_input_id','tentative_id')->withPivot('formulaire_input_id','tentative_id');
    }
}
