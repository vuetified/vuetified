<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMedia;

class Order extends Model implements HasMedia
{
    use HasMediaTrait;

    protected $casts = [
        'customer_details' => 'array', 
        'shipping_details' => 'array',
        'done' => 'boolean'
    ];

    protected $dates = ['created_at', 'updated_at'];

    /*  */
    protected $appends = ['receipt'];

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

    public static function last()
    {
        return static::all()->last();
    }

    public function getReceiptAttribute()
    {
        return optional($this->getMedia('receipts')->first())->getUrl();
    }
}
