<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ['message', 'user_id','evenement_id','accuracy','classification','created_at','updated_at'];

    public function users()
    {
      return $this->belongsToMany(User::class,'interactions')->withPivot('id','is_liked','created_at','user_id','comment_id');
    }

    public function user()
    {
      return $this->belongsTo(User::class,'user_id');
    }

    public function userss()
    {
      return $this->belongsToMany(User::class,'interactions');
    }

}
