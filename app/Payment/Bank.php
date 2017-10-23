<?php

namespace App\Payment;

use Illuminate\Database\Eloquent\Model;
use App\Gateway;
use App\Order;

class Bank extends Model
{
    protected $table = "bank_payments";

    protected $casts = [
        'uploads' => 'array',
    ];

    public function gateway()
    {
        return $this->belongsTo(Gateway::class);
    }

    public function payments()
    {
        return $this->morphMany(Order::class, 'payment');
    }
}
