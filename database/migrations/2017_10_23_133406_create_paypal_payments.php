<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaypalPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paypal_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('gateway_id'); // has the info of secret key and api key
            $table->string('transaction_no')->nullable(); // payment id of paypal
            $table->string('account_name')->nullable(); // paypal email
            $table->string('account_no')->nullable(); // nothing related to paypal
            $table->double('amount', 15, 2);
            $table->string('currency')->default('PHP'); // transactions['amount']['currency']
            $table->boolean('paid')->default(0); // update when paypal is paid
            $table->timestamp('date_paid')->nullable(); // Day Payment is Settled
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
        Schema::dropIfExists('paypal_payments');
    }
}
