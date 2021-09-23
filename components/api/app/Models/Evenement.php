<?php

namespace App\Models;

use App\Models\User;
use App\Models\EventType;
use App\Models\Etablissement;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Evenement extends Model
{
    use HasFactory;
    protected $fillable = ['titre', 'description','localisation','date_debut','date_fin','etablissement_id','eventtype_id'];

    public function etablissements()
    {
        return $this->belongsTo(Etablissement::class,'etablissement_id');
    }

    public function eventtypes()
    {
        return $this->belongsTo(EventType::class,'eventtype_id');
    }

    public function users()
    {
      return $this->belongsToMany(User::class,'comments')->withPivot('id','message','accuracy','classification','created_at','user_id','evenement_id');
    }


}
