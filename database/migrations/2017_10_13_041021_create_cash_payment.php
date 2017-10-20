<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCashPayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cash_payments',function(Blueprint $table){
            $table->increments('id');
            $table->unsignedBigInteger('gateway_id');
            $table->string('receipt_no')->nullable();
            $table->string('payee');
            $table->string('contact_no');
            $table->double('amount', 15, 2);
            $table->string('currency')->default('PHP');
            $table->text('uploads');
            $table->boolean('paid');
            $table->timestamp('date_paid');
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
        Schema::dropIfExists('cash_payments');
    }
}
