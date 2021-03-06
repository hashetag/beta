<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('carts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('p_id');
            $table->text('session_id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('user_email')->nullable();
            $table->unsignedBigInteger('empresa_id');
            $table->string('p_name');
            $table->string('p_desc')->nullable();
            $table->string('picture')->nullable();
            $table->string('p_code')->nullable();
            $table->decimal('price', 11,2);
            $table->string('color')->nullable();
            $table->string('size')->nullable();
            $table->unsignedBigInteger('qty');
            $table->timestamps();

            $table->foreign('p_id')->references('id')->on('products');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('empresa_id')->references('id')->on('empresas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('carts');
    }
}
