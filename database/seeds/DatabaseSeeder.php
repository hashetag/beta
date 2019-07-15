<?php

use App\Empresa;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

  public function run()
  {
    DB::statement('SET FOREIGN_KEY_CHECKS = 0');
    //Role::truncate();
    Empresa::truncate();
    User::truncate();

    Empresa::create([
      'isAdmin' => 1,
      'name' => 'WeOnMart',
      'email' => 'weonmart12@gmail.com',
      'password' => bcrypt('Fourmie7'),
      'groupe_id' => 1,
      'city_id' => 1,
      'remember_token' => str_random(10),
    ]);
/*
    Empresa::create([
      'role_id' => 2,
      'name' => 'Empresa',
      'email' => 'empresa@gmail.com',
      'password' => bcrypt('Fourmie7'),
      'groupe_id' => 2,
      'city_id' => 1,
      'remember_token' => str_random(10),

    ]);*/

    User::create([
      'name' => 'Ange',
      'email' => 'ange@gmail.com',
      'password' => bcrypt('Fourmie7'),
      'remember_token' => str_random(10),
    ]);
  }
}
