<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBankPayment extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_payments',function(Blueprint $table){
            $table->increments('id');
            $table->unsignedBigInteger('gateway_id');
            $table->string('transaction_no');
            $table->string('account_name');
            $table->string('account_no');
            $table->double('amount', 15, 2);
            $table->string('currency')->default('PHP');
            $table->text('uploads'); // attachment Image Uploads
            $table->boolean('paid');
            $table->timestamp('date_paid'); // Day Payment is Settled
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
        Schema::dropIfExists('bank_payments');
    }
}
