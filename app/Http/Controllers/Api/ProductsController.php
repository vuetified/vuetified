<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;
use App\Exceptions\SlugNotFound;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductCollection;
use App\Http\Resources\Product\Product as ProductResource;

class ProductsController extends Controller
{
    public function index()
    {
        return new ProductCollection(Product::with('category')->paginate(10));
    }
    public function show($slug)
    {
        $product = Product::findBySlug($slug);
        if(!$product){
            throw new SlugNotFound;
        }
        return new ProductResource($product);
    }
}
