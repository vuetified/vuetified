<?php

namespace App\Shipment;

use Illuminate\Database\Eloquent\Model;
use App\Courier;
use App\Order;

class DoorToDoor extends Model
{
    protected $table = "door_to_doors";

    protected $casts = [
        'uploads' => 'array',
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
