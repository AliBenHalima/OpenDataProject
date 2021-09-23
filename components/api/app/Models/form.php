<?php

namespace App\Models;

use App\Models\Element;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class form extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function elements()
    {
        return $this->hasMany(Element::class);
    }
}
