<?php

namespace App\Http\Controllers\Api;

use App\Product;
use App\Category;
use Illuminate\Http\Request;
use App\Exceptions\SlugNotFound;
use App\Http\Controllers\Controller;
use App\Http\Resources\Category\CategoryCollection;
use App\Http\Resources\Product\Product as ProductResource;


class CategoriesController extends Controller
{
    public function index()
    {
        /* to Display properly with pagination, make sure we dynamically determine, 
         * what is the paginate number needed 
         */
        
        return new CategoryCollection(Category::all()->paginate(3));
    }
    public function show($category)
    {
        $category = Category::findBySlug($category);
        if(!$category){
            throw new SlugNotFound;
        }
        $product = Product::where('category_id',$category->id)->get()->paginate(12);
        return ProductResource::collection($product);
       
    }
}
