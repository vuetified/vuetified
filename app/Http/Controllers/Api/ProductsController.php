<?php

namespace App\Http\Controllers\Api;

use App\Product;
use Illuminate\Http\Request;
use App\Exceptions\SlugNotFound;
use App\Http\Controllers\Controller;
use App\Http\Resources\Product\ProductCollection;
use App\Http\Resources\Product\Product as ProductResource;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function index()
    {
        return new ProductCollection(Product::with('category')->paginate(12));
    }
    public function show($slug)
    {
        $product = Product::findBySlug($slug);
        if(!$product){
            throw new SlugNotFound;
        }
        return new ProductResource($product);
    }

    public function update(Request $request,$slug)
    {
        $data = request()->validate([
            'name' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'price' => [
                'present',
                'regex:/^\d*(\.\d{1,2})?$/'
            ],
            'slug' => [
                'present',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
            ],
            'category_id' => [
                'present',
                Rule::exists('products')->where(function ($query) {
                    $query->where('category_id', request()->category_id);
                }),
            ],
            'sku' => [
                'present',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'
            ],
            'excerpt' => [
                'present',
                'max:65535'
            ],
            'description' => [
                'present',
                'max:65535'
            ],
            'options' => [
                'present',
            ],
            'currency' => [
                'present',
            ],
        ]);
        $product = Product::findBySlug($slug);
        $product->options = json_encode($data['excerpt']);
        if(!$product){
            throw new SlugNotFound;
        }
        /* strip html */
        $data['description'] = clean($data['description']);
        $product->fill($data);
        $save = $product->save();
        if($save){
            return new ProductResource($product);
        }

    }
    public function uploadGalleryImages(Request $request,$slug)
    {
        $validator = \Validator::make($request->all(), [
            'photos' => [
                'required',
                'mimes:jpeg,bmp,png,gif',
                'max:10000'
            ],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all(),'message' => 'Failed To Upload Image'],409);
        }
        $product = Product::findBySlug($slug);
        $path = $this->uploaded($request,'photos');
        $path = str_replace("public","",$path);
        $photos = $product->photos;
        if(is_null($photos)){
            $photos[0] = $path;
        }else{
            array_push($photos,$path);
        }
        $product->photos = $photos;
        $product->save();
        return  response()->json(['path' => $path,'message' => 'Product Image Uploaded!'],200);
    }
    public function uploadImage(Request $request,$slug)
    {   
        $validator = \Validator::make($request->all(), [
            'image' => [
                'required',
                'mimes:jpeg,bmp,png,gif',
                'max:10000'
            ],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all(),'message' => 'Failed To Upload Image'],409);
        }
        $product = Product::findBySlug($slug);
        $path = $this->uploaded($request,'image');
        $path = str_replace("public","",$path);
        $product->image =$path;
        $product->save();
        return  response()->json(['path' => $path,'message' => 'Product Image Uploaded!'],200);
    }

    private function uploaded($request,$key)
    {
        return $path = Storage::putFile('public/'.$this->getBucket($request), $request->file($key));
    }

    private function getPath($request)
    {
        return $storage_path = storage_path('app/public/'.$this->getBucket($request));
    }

    private function getBucket($request)
    {
        if($request->hasFile('image')){
            return 'products';
        }
        if($request->has('photos')){
           return  'photos';
        }
    }
}
