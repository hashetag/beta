<?php

namespace App;

use App\Empresa;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
  protected $table = 'cities';
  protected $fillable = ['city', 'state', 'zipcode', 'latitud', 'longitud', 'country'];

  public function empresas()
  {
    return $this->hasMany(Empresa::class);
  }

}
