<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWeonmartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //about us, Our Story , Logo , Telephone, Address, etc
        Schema::create('weonmarts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); 
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        //Private Chat From User to WeOnMart
        Schema::create('weonmart_user_chats', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->text('message')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users');
        });

        //Private Chat From Empresa to WeOnMart
        Schema::create('weonmart_empresa_chat', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('empresa_id');
            $table->text('message')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('empresa_id')->references('id')->on('empresas');
        });

        //User testimonios on WenOnMart
        Schema::create('weonmart_testimonios', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('empresa_id')->nullable();
            $table->float('rating', 10, 2)->nullable();
            $table->text('comment')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();

            $table->foreign('empresa_id')->references('id')->on('empresas');
        });

        //FAQ, 
        Schema::create('weonmart_faq', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); 
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        //Terms & Conditions, 
        Schema::create('weonmart_terms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title'); 
            $table->string('subtitle')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        //Blog
        Schema::create('weonmart_blog', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('image')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        //Forum
        Schema::create('weonmart_forum', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('title');
            $table->text('description')->nullable();
            $table->text('image')->nullable();
            $table->boolean('status')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('weonmarts');
        Schema::dropIfExists('weonmart_user_chat');
        Schema::dropIfExists('weonmart_empresa_chat');
        Schema::dropIfExists('weonmart_testimonios');
        Schema::dropIfExists('weonmart_faq');
        Schema::dropIfExists('weonmart_terms');
        Schema::dropIfExists('weonmart_blog');
        Schema::dropIfExists('weonmart_forum');
    }
}
