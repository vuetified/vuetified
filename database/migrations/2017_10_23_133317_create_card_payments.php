<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('gateway_id'); // has the info of secret key and api key
            $table->string('transaction_no')->nullable(); // stripe ID
            $table->string('account_name')->nullable(); // Card Name
            $table->string('account_no')->nullable(); // Card No. (save only last 4 digit)
            $table->string('card_brand')->nullable(); // Card No. (save only last 4 digit)
            $table->double('amount', 15, 2);
            $table->string('currency')->default('PHP');
            $table->boolean('paid')->default(0);
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
        Schema::dropIfExists('card_payments');
    }
}
