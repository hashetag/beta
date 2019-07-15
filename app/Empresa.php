<?php

namespace App;

use App\City;
use App\Groupe;
use App\Type;
use App\Category;
use App\Product;
use App\Order;
use App\Review;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Empresa extends Authenticatable
{
    use Notifiable;

    protected $guard = 'empresa';
    //protected $table = 'empresas';

    protected $fillable = [
        'isAdmin', 'name', 'email', 'password', 'groupe_id', 'city_id', 'type_id', 'cuit', 'avatar', 'phone', 'address', 'openhours', 'openhours_2', 'minimum', 'latitud','longitud', 'slug', 'website',
    ];

   
    protected $hidden = [
        'password', 'remember_token',
    ];

    
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

  
  public static function navigation()
  {
    return auth()->check() ? auth()->empresa()->role->name : 'guest' ;
  }


    public function groupes()
  {
    return $this->belongsTo(Groupe::class);
  }

  public function cities()
  {
    return $this->belongsTo(City::class);
  }

  public function types()
  {
    return $this->belongsTo(Type::class);
  }

  public function categories()
  {
    return $this->hasMany(Category::class);
  }

  public function products()
  {
    return $this->hasMany(Product::class);
  }

  public function orders()
  {
    return $this->hasMany(Order::class);
  }

  public function reviews()
  {
    return $this->hasMany(Review::class);
  }
}
