<?php

namespace App;


use App\User;
use Illuminate\Database\Eloquent\Model;

class SocialUser extends User
{
  protected $table = 'users';
  protected $fillable = ['user_id', 'provider', 'provider_uid'];

  public function users()
  {
    return $this->belongsTo(User::class);
  }

}
