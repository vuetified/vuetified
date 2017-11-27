<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;
use Gloudemans\Shoppingcart\Contracts\Buyable;
use Gloudemans\Shoppingcart\CanBeBought;
use Spatie\MediaLibrary\Media;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMediaConversions;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;

class Product extends Model implements Buyable, HasMediaConversions
{

    use Sluggable,SluggableScopeHelpers,CanBeBought,HasMediaTrait;

    protected $fillable = [
        'name', 'slug', 'category_id', 'sku', 'excerpt', 'description', 'options', 'currency'
    ];

    protected $casts = [
        'options' => 'array', 
    ];

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
    /* uses laravel queue system , use laravel horizon */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('thumb')
              ->width(150)
              ->height(150)
              ->sharpen(10);
    }
}
