<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProducts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('category_id')->nullable();
            $table->string('sku')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->text('description')->nullable();
            $table->double('price', 15, 2);
            $table->string('image')->nullable();
            $table->json('gallery')->nullable();
            $table->integer('stock')->default(0);
            $table->float('rating_cache', 2, 1)->default(0);
            $table->integer('rating_count')->default(0);
            $table->boolean('available')->default(0);
            $table->json('options')->nullable();
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
        Schema::dropIfExists('products');
    }
}
