<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCoinPayments extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coin_payments', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedBigInteger('gateway_id'); // has the info of secret key and api key
            $table->string('transaction_no')->nullable(); // bitcoin transaction
            $table->string('account_name')->nullable(); // bitcoin address
            $table->string('account_no')->nullable(); // note needed
            $table->double('amount', 16, 8); // satoshi
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
        Schema::dropIfExists('coin_payments');
    }
}
