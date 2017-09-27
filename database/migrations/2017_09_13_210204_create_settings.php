<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSettings extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->nullable();
            $table->string('title');
            $table->string('description');
            $table->string('keywords');
            $table->string('meta');
            $table->json('logo');
            $table->json('theme');
            $table->text('custom_css');
            $table->text('social_media');
            $table->string('default_language');
            $table->string('default_currency');
            $table->string('support_email');
            $table->json('contact_nos');
            $table->string('business_address');
            $table->text('terms');
            $table->text('refund_policy');
            $table->text('disclaimer');
            $table->string('paypal_config');
            $table->text('bank_accounts');
            $table->text('mobile_accounts');
            $table->string('stripe_config');
            $table->string('pickup_location');
            $table->text('courriers');
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
        Schema::dropIfExists('settings');
    }
}
