<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Gloudemans\Shoppingcart\Contracts\Buyable;
use Gloudemans\Shoppingcart\CanBeBought;

class Product extends Model implements Buyable
{
    use Sluggable,SluggableScopeHelpers,CanBeBought;

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ],
            'sku' => [
                'source' => 'name'
            ]
        ];
    }

    public function reservedSlugs()
    {
        return ['admin', 'support', 'api', 'administrator','helpdesk','customer-support','forum','blog','shop','billing','products','category', 'categories'];
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public static function findBySku($sku)
    {
        return self::whereSku($sku)->first();
    }
}
