<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrders extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // User Has many Orders
        Schema::create('orders', function(Blueprint $table){
            $table->increments('id');
            $table->unsignedBigInteger('user_id');
            $table->json('cart');
            $table->nullableMorphs('payment');
            $table->json('profile')->nullable();
            $table->json('address')->nullable();
            $table->nullableMorphs('shipment');
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
        Schema::dropIfExists('orders');
    }
}
