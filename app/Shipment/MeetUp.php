<?php

namespace App\Shipment;

use Illuminate\Database\Eloquent\Model;
use App\Courier;
use App\Order;

class MeetUp extends Model
{
    protected $table = "meet_ups";

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
