<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PieceJointe extends Model
{
    use HasFactory;
    protected $fillable = ['name','post_id','contenu'];
    protected $table = 'piecejointes';
    public function posts()
    {
        return $this->belongsTo(Post::class);

    }
}
