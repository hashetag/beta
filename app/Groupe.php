<?php

namespace App;

use App\Empresa;
use Illuminate\Database\Eloquent\Model;

class Groupe extends Model
{
  protected $table = 'groupes';
  protected $fillable = ['name', 'description', 'logo', 'color', 'slug'];

  public function empresa()
  {
    return $this->hasMany(Empresa::class);
  }
}
