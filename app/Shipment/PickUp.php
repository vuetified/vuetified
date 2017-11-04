<?php

namespace App\Shipment;

use Illuminate\Database\Eloquent\Model;
use App\Courier;
use App\Order;

class PickUp extends Model
{
    protected $table = "pick_up_locations";

    protected $casts = [
        'shipping_fee' => 'double',
        'sent' => 'boolean',
        'received' => 'boolean'
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'date_sent',
        'date_received'
    ];

    public function courier()
    {
        return $this->belongsTo(Courier::class);
    }

    public function shipments()
    {
        return $this->morphMany(Order::class, 'shipment');
    }
}
