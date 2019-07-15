<?php

namespace App;

use App\Empresa;
use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
  protected $table = 'types';
  protected $fillable = ['name', 'description', 'slug'];
  public $timestamps = false;

 
  public function empresa()
  {
    return $this->hasMany(Empresa::class);
  }
}
