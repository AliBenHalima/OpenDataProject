<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormRequests extends Model
{
    protected $fillable = ['value','formulaire_input_id','tentative_id'];
    protected $table = 'formrequests';

    use HasFactory;

    public function formulaireinputs()
    {
        return $this->belongsTo(FormInput::class,'formulaire_input_id');
    }

    public function tentatives()
    {
        return $this->belongsTo(Tentative::class,'tentative_id');
    }
}
