<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Courier extends Model
{
    use Sluggable;

    protected $table = 'couriers';
    
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
