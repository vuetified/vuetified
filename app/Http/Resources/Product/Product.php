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
            'category_id' => $this->category_id,
            'currency' => $this->currency,
            'sku' => $this->sku,
            'name' => $this->name,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'photos' => $this->photos,
            'options' => $this->options,
            'inCart' => false,
            'qty' => 0
        ];
    }
}
