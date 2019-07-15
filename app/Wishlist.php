<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wishlist extends Model
{
  protected $table = 'wishlists';
  protected $fillable = ['session_id', 'p_id', 'empresa_id', 'user_id', 'color', 'size', 'qty'];
}
