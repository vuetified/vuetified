<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Cviebrock\EloquentSluggable\SluggableScopeHelpers;

class Category extends Model
{
    use Sluggable, SluggableScopeHelpers;
    
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function reservedSlugs()
    {
        return ['admin', 'support', 'api', 'administrator','helpdesk','customer-support','forum','blog','shop','billing','products','category', 'categories'];
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
