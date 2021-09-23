<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ['name','gallery_id','contenu'];
    use HasFactory;

    public function galleries()
    {
        return $this->belongsTo(Gallery::class);

    }
}
