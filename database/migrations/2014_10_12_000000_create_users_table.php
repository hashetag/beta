<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{

  public function up()
  {
    Schema::create('users', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('provider_uid')->nullable();
      $table->string('provider')->nullable();
      $table->string('name');
      $table->string('email')->unique();
      $table->string('password')->nullable();
      $table->string('avatar')->default('avatar.jpg');
      $table->string('phone')->nullable();
      $table->text('address')->nullable();
      $table->string('zipcode')->nullable();
      $table->string('city')->nullable();
      $table->string('state')->nullable();
      $table->double('latitud')->nullable();
      $table->double('longitud')->nullable();
      $table->string('slug')->nullable();
      $table->boolean('status')->default(1);
      $table->boolean('verified')->default(false);
      $table->timestamp('email_verified_at')->nullable();
      $table->rememberToken();
      $table->timestamps();
    });

    /*Reviews table*/
    /*Schema::create('users_social', function (Blueprint $table) {
      $table->unsignedBigInteger('user_id');
      $table->string('provider');
      $table->string('provider_uid');

      $table->foreign('user_id')->references('id')->on('users');
    });*/
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('users');
    //Schema::dropIfExists('users_social');
  }
}
