<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id');
            $table->string('name')->comment('categoria de productos');
            $table->string('description')->nullable();
            $table->string('slug')->unique();
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('empresa_id')->references('id')->on('empresas');
        });


        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id');
            $table->unsignedBigInteger('category_id');
            $table->string('name')->comment('Nombre del producto');
            $table->text('description')->nullable();
            $table->string('code')->nullable();
            $table->string('picture');
            $table->decimal('price', 11,2);
            $table->decimal('discount', 11,2)->nullable;
            $table->integer('stock');
            $table->string('slug')->unique();
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('empresa_id')->references('id')->on('empresas');
            $table->foreign('category_id')->references('id')->on('categories');
        });

        Schema::create('product_colors', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('p_id');
            $table->string('color');
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('p_id')->references('id')->on('products');
        });

        Schema::create('product_sizes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('p_id');
            $table->string('size');
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('p_id')->references('id')->on('products');
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('p_id');
            $table->string('image');
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('p_id')->references('id')->on('products');
        });

        Schema::create('product_details', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('p_id');
            $table->text('detail')->nullable();
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
        Schema::dropIfExists('categories');
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_colors');
        Schema::dropIfExists('product_sizes');
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('product_details');
    }
}
