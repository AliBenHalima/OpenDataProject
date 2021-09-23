<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventType extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    protected $table = 'eventtypes';

    public function evenements()
    {
        return $this->hasMany(Evenement::class,'etablissement_id');
    }
}
