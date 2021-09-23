<?php

namespace App\Models;

use App\Models\User;
use App\Models\privilege;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class role extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function privileges()
    {
        return $this->belongsToMany(privilege::class)->withTimestamps();;
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
