<?php

namespace App;

use App\Order;
use App\Review;
use App\SocialUser;
use App\Testimonio;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';

    protected $fillable = [
       'name', 'email', 'password', 'avatar', 'phone', 'address', 'latitud','longitud', 'slug',
    ];

   
    protected $hidden = [
        'password', 'remember_token',
    ];

    
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    
    public static function navigation()
    {
        return auth()->check() ? auth()->user()->role->name : 'guest' ;
    }

    public function users_social()
    {
        return $this->hasMany(SocialUser::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function reviews()
    {
       return $this->hasMany(Review::class);
    }

    public function testimonios()
    {
        return $this->hasMany(Testimonio::class);
    }
}
