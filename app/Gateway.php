<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Gateway extends Model
{

    use Sluggable;

    protected $table = 'gateways';

    protected $casts = [
        'details' => 'array', 
    ];

    protected $fillable = [
        'name', 'group', 'avatar', 'details'
    ];

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
