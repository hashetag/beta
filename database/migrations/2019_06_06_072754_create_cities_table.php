<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('city');
            $table->string('state');
            $table->string('zipcode')->nullable();
            $table->double('latitud')->nullable();
            $table->double('longitud')->nullable();    
            $table->string('country')->default('Argentina');
            $table->boolean('status')->default(1);
            $table->timestamps();
        });

        DB::table('cities')->insert(array('city' => 'Ciudad Autonoma Buenos Aires', 'state' => 'Buenos Aires', 'zipcode' => 'C1420', 'latitud' => '-34.603333', 'longitud' => '-58.381667', 'country' => 'Argentina'));
        DB::table('cities')->insert(array('city' => 'La Plata', 'state' => 'Buenos Aires', 'zipcode' => 'B1900', 'latitud' => '-34.921111', 'longitud' => '-57.954444', 'country' => 'Argentina'));
        DB::table('cities')->insert(array('city' => 'Rosario', 'state' => 'Santa Fe', 'zipcode' => 'S2000', 'latitud' => '-32.955139', 'longitud' => '-60.666667', 'country' => 'Argentina'));
        DB::table('cities')->insert(array('city' => 'Cordoba', 'state' => 'Cordoba', 'zipcode' => 'X5000', 'latitud' => '-31.416667', 'longitud' => '-64.183333', 'country' => 'Argentina'));
        DB::table('cities')->insert(array('city' => 'Mendoza', 'state' => 'Mendoza', 'zipcode' => 'M5500', 'latitud' => '-32.883333', 'longitud' => '-68.816667', 'country' => 'Argentina'));
        DB::table('cities')->insert(array('city' => 'Ushuaia', 'state' => 'Tierra del Fuego', 'zipcode' => 'V9410', 'latitud' => '-54.801944', 'longitud' => '-68.303056', 'country' => 'Argentina'));
        

        Schema::create('groupes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->comment('Categoria de Empresa');
            $table->string('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('color')->nullable();
            $table->string('slug')->nullable();
            $table->boolean('status')->default(1);

            $table->timestamps();
        });

        DB::table('groupes')->insert(array('name' => 'Librería', 'slug' => 'libreria'));
        DB::table('groupes')->insert(array('name' => 'Tienda de Ropa', 'slug' => 'ropa'));
        DB::table('groupes')->insert(array('name' => 'Perfumería', 'slug' => 'Perfumeria'));
        DB::table('groupes')->insert(array('name' => 'Zapatería', 'slug' => 'zapateria'));
        DB::table('groupes')->insert(array('name' => 'Electronica', 'slug' => 'electronica'));
        DB::table('groupes')->insert(array('name' => 'Tienda de Mascota', 'slug' => 'mascota'));
        DB::table('groupes')->insert(array('name' => 'Vinoteca', 'slug' => 'vinoteca'));
        DB::table('groupes')->insert(array('name' => 'Electrodomestico', 'slug' => 'electrodomestico'));
        

        Schema::create('types', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('name')->unique()->comment('typo de Empresa');
          $table->text('description')->nullable();
          $table->string('slug')->nullable();
          $table->boolean('status')->default(1);
        });

        DB::table('types')->insert(array('id' => '1', 'name' => 'Fabrica', 'description' => 'Venta desde Fabrica'));
        DB::table('types')->insert(array('id' => '2', 'name' => 'Mayorista', 'description' => 'Empresa mayorista'));
        DB::table('types')->insert(array('id' => '3', 'name' => 'Minorista', 'description' => 'Empresa Minorista'));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cities');
        Schema::dropIfExists('groupes');
        Schema::dropIfExists('types');
    }
}
