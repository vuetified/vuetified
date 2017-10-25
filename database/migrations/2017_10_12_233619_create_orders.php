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
            $table->unsignedBigInteger('user_id')->nullable();
            $table->json('cart')->nullable();
            $table->json('customer_details')->nullable();
            $table->json('shipping_details')->nullable();
            $table->nullableMorphs('payment');
            $table->nullableMorphs('shipment');
            $table->boolean('done')->default(0);
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
