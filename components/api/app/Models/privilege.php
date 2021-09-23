<?php

namespace App\Models;

use App\Models\role;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class privilege extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function roles()
    {
        return $this->belongsToMany(role::class)->withTimestamps();;
    }
}
