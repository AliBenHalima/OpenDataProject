<?php

namespace App\Models;

use App\Models\Post;
use App\Models\roles;
use App\Models\Comment;
use App\Models\Gallery;
use App\Models\Message;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Models\Role;

class User extends Authenticatable implements CanResetPassword
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;
    protected $guard_name = 'api';
    protected $fillable = ['name', 'password', 'email','address','photo','etablissement_id','role_id','Bio'];
    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class);

    }
    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function Galleries()
    {
        return $this->hasMany(Gallery::class);
    }

    public function evenements()
    {
      return $this->belongsToMany(Evenement::class,'comments')->withPivot('id','user_id','evenement_id');
    }

    // public function roles()
    // {
    //   return $this->belongsToMany(Role::class,'model_has_roles','model_id','role_id');
    // }

    public function comments()
    {
        return $this->belongsToMany(Comment::class,'interactions')->withPivot('id','is_liked','created_at','user_id','comment_id');
    }



    // public function roles()
    // {
    //     return $this->belongsTo(role::class);

    // }

}
