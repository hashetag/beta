<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
	protected $table = 'carts';
  protected $fillable = ['session_id', 'p_id', 'empresa_id', 'user_id', 'p_name', 'p_desc', 'picture', 'p_code', 'color', 'size', 'qty'];
}
