<?php

namespace App\Models;

use App\Models\ElementValue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Element extends Model
{
    use HasFactory;

    protected $fillable = ['name','value','required','answerType','form_id'];


    public function elementvalues()
    {
        return $this->hasMany(ElementValue::class);
    }
    public function forms()
    {
        return $this->belongsTo(form::class,'form_id');

    }
}
