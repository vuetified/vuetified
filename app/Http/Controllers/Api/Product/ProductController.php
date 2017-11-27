<?php

namespace App\Http\Controllers\Api\Product;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
        $data = request()->validate([
            'name' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'slug' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'category_id' => [
                'present',
                Rule::exists('products')->where(function ($query) {
                    $query->where('category_id', $request->category_id);
                }),
            ],
            'sku' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'excerpt' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/',
                'max:65535'
            ],
            'description' => [
                'present',
                'regex:/(^[A-Za-z0-9 ]+$)+/',
                'max:65535'
            ],
            'options' => [
                'present',
            ],
            'currency' => [
                'present',
            ],
            
        ]);
        $product->fill($data);
        $save = $product->save();
        if($save){
            return 'success';
        }
        


    }

    private function uploaded($request,$key)
    {
        $storage_path = storage_path('app/public/'.$this->getBucket());
        $file = $request->file($key);
        return $file->move($storage_path, $file->getClientOriginalName() . '.' . $file->getClientOriginalExtension());
    }

    private function getBucket()
    {
        if($request->hasFile('image')){
            return 'products';
        }
        if($request->has('photos')){
           return  'gallery';
        }
    }

    private function rules(Request $request)
    {
        return [
            'image' => [
                'present',
                'mimes:jpeg,bmp,png,gif',
                'max:10000'
            ],
            'photos' => [
                'present',
                'mimes:jpeg,bmp,png,gif',
                'max:10000'
            ],
        ];
    }

    public function backup()
    {
        if($request->has('name')){
            array_push($data,['name' => $request->name]);

        }
        if($request->has('slug')){
            array_push($data,['slug' => $request->slug]);
        }
        if($request->has('sku')){
            array_push($data,['sku' => $request->sku]);
        }
        if($request->has('excerpt')){
            array_push($data,['excerpt' => $request->excerpt]);
        }
        if($request->has('description')){
            array_push($data,['description' => $request->description]);
        }
        if($request->has('options')){
            array_push($data,['options' => $request->options]);
        }
        if($request->has('category_id')){
            array_push($data,['category_id' => $request->category_id]);
        }
        if($request->has('currency')){
            array_push($data,['currency' => $request->currency]);
        }
        if($request->hasFile('image')){
            $file = $request->file('image');
            array_push($data,['image' => $image]);
        }
        if($request->has('photos')){
            $file = $request->file('photo');
            array_push($data,['photos' => $request->photos]);
        }

        

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all(),'message' => 'Form Validation Error!'],409);
        }
    }


}
