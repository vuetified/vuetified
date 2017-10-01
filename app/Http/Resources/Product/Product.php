<?php

namespace App\Http\Resources\Product;

use Illuminate\Http\Resources\Json\Resource;

class Product extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'category' => $this->whenLoaded('category'),
            'sku' => $this->sku,
            'name' => $this->name,
            'slug' => $this->slug,
            'summary' => $this->summary,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'gallery' => $this->gallery,
            'stock' => $this->stock,
            'rating_cache' => $this->rating_cache,
            'rating_count' => $this->rating_count,
            'available' => $this->available,
            'options' => $this->options,
            'inCart' => false,
            'qty' => 0
        ];
    }
}
