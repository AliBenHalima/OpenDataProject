<?php

namespace App\Models;

use App\Models\User;
use App\Models\privilege;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class roles extends Model
{
    use HasFactory;
    // public function user()
    // {
    //   return $this->belongsToMany(User::class,'model_has_roles','model_id','role_id');
    // }


    public function users()
    {
        return $this->hasMany(User::class,'model_has_roles','model_id','role_id');
    }
}
