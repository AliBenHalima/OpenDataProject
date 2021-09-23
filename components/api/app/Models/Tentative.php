<?php

namespace App\Models;

use App\Models\FormInput;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Tentative extends Model
{
    protected $fillable = ['code', 'etat','accepted'];

    use HasFactory;

    public function formulaireinputs()
    {
      return $this->belongsToMany(FormInput::class,'formrequests','formulaire_input_id','tentative_id')->withPivot('id','formulaire_input_id','tentative_id');
    }

    public function forminp()
    {
      return $this->belongsToMany(FormInput::class,'formrequests');
    }
}
// 'formulaire_input_id'
