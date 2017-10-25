<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $casts = [
        'customer_details' => 'array', 
        'shipping_details' => 'array',
        'done' => 'boolean'
    ];

    protected $dates = ['created_at', 'updated_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payment()
    {
        return $this->morphTo();
    }

    public function shipment()
    {
        return $this->morphTo();
    }
}
