<?php

namespace App;

use App\Empresa;
use App\Product;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  protected $table = 'categories';
  protected $fillable = ['empresa_id', 'name', 'description', 'slug'];

  public function empresa()
  {
    return $this->belongsTo(Empresa::class);
  }

  public function products()
  {
    return $this->hasMany(Product::class);
  }
}
