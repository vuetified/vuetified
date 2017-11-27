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

    public function uploadImage(Request $request,$slug)
    {
        
        $path = Storage::putFile('image', $request->file('image'));
        return $path;
        $validator = \Validator::make($request->all(), [
            'file' => [
                'required',
                'mimes:jpeg,bmp,png,psd,pdf,ppt,pptx,doc,docx,dotx,xls,txt,odt',
                'max:10000'
            ],
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all(),'message' => 'Failed To Upload Image'],409);
        }
        $product = Product::findBySlug($slug);
        return $file = $this->uploaded($request,'image');
    }

    private function uploaded($request,$key)
    {
        $storage_path = storage_path('app/public/'.$this->getBucket($request));
        $file = $request->file($key);
        return $file->move($storage_path, $file->getClientOriginalName() . '.' . $file->getClientOriginalExtension());
    }

    private function getBucket($request)
    {
        if($request->hasFile('image')){
            return 'products';
        }
        if($request->has('photos')){
           return  'gallery';
        }
    }
}
