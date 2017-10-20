<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{

    protected $casts = [
        'profile' => 'array', 
        'address' => 'array'
    ];

    protected $dates = ['created_at', 'updated_at'];

    public function buyer()
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
