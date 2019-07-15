<?php

namespace App;

use App\Empresa;
use App\Category;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
  protected $table = 'products';
  protected $fillable = ['empresa_id', 'category_id', 'name', 'description', 'code', 'picture', 'price', 'discount', 'stock', 'slug'];

  public function empresa()
  {
    return $this->belongsTo(Empresa::class);
  }

  public function category()
  {
    return $this->belongsTo(Category::class);
  }

  public function presetPrice()
  {
    return money_format('$%i', $this->price / 100);
  }
}
