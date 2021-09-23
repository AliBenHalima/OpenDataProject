<?php

namespace App\Models;

use App\Models\Post;
use App\Models\Sujet;
use App\Models\Gallery;
use App\Models\Message;
use App\Models\Evenement;
use App\Models\Gouvernerat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etablissement extends Model
{
    use HasFactory;
    protected $fillable = ['nom', 'description','addresse','email', 'color','mapLocation','phone_number','short_description'];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function gouvernerats()
    {
        return $this->hasMany(Gouvernerat::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class,'document_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function sujets()
    {
        return $this->hasMany(Sujet::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function evenements()
    {
        return $this->hasMany(Evenement::class);
    }

    public function galleries()
    {
        return $this->hasMany(Gallery::class);
    }

}
