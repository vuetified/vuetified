<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostalStationCourier extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('postal_mail', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('courier_id')->nullable();
            $table->double('shipping_fee', 15, 2)->default(0);
            $table->string('currency')->default('PHP');
            $table->string('tracking_no')->nullable();
            $table->string('postal_location')->nullable();
            $table->string('postal_address')->nullable();
            $table->boolean('sent')->default(0);
            $table->timestamp('date_sent');
            $table->boolean('received')->default(0);
            $table->timestamp('date_received')->nullable();
            $table->text('uploads');
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
        Schema::dropIfExists('postal_mail');
    }
}