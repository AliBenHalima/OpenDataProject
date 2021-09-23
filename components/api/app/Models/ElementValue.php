<?php

namespace App\Models;

use App\Models\Element;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ElementValue extends Model
{
    use HasFactory;
    protected $fillable = ['name','value','element_id'];
    protected $table = 'element_values';


    public function elements()
    {
        return $this->belongsTo(Element::class);

    }
}
