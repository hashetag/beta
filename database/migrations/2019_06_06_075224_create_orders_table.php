<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {

    Schema::create('orders_requested', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('ticket');
      $table->unsignedBigInteger('user_id');
      $table->unsignedBigInteger('user_email');
      $table->unsignedBigInteger('empresa_id');
      $table->decimal('subtotal', 11,2);
      $table->decimal('shipping', 11,2);
      $table->decimal('total', 11,2);
      $table->string('payment_status')->nullable();
      $table->boolean('aproved')->default(0);
      $table->timestamps();


      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('empresa_id')->references('id')->on('empresas');
    });

    Schema::create('order_phases', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('name')->unique();
      $table->text('description')->nullable();
    });

    DB::table('order_phases')->insert(array('id' => '1', 'name' => 'Pendiente'));
    DB::table('order_phases')->insert(array('id' => '2', 'name' => 'Aprobado'));
    DB::table('order_phases')->insert(array('id' => '3', 'name' => 'Rechazado'));
    DB::table('order_phases')->insert(array('id' => '4', 'name' => 'Cancelado'));

    Schema::create('orders', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('ticket');
      $table->unsignedBigInteger('user_id');
      $table->unsignedBigInteger('empresa_id');
      $table->decimal('subtotal', 11,2);
      $table->decimal('shipping', 11,2);
      $table->decimal('total', 11,2);
      $table->string('payment_method')->nullable();
      $table->string('payment_status')->nullable();
      $table->unsignedBigInteger('phase_id')->default(1);
      $table->boolean('delivered')->default(0);
      $table->timestamps();


      $table->foreign('phase_id')->references('id')->on('order_phases');
      $table->foreign('user_id')->references('id')->on('users');
      $table->foreign('empresa_id')->references('id')->on('empresas');
    });


    Schema::create('order_details', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->unsignedBigInteger('ticket');
      $table->unsignedBigInteger('p_id');
      $table->decimal('price', 11,2);
      $table->string('color')->nullable();
      $table->string('size')->nullable();
      $table->unsignedBigInteger('qty');
      $table->timestamps();


      $table->foreign('p_id')->references('id')->on('products');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('order_phases');
    Schema::dropIfExists('orders');
    Schema::dropIfExists('order_details');
    Schema::dropIfExists('orders_requested');
  }
}
