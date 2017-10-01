<?php

use Illuminate\Database\Seeder;
use App\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = Category::all();
        foreach($categories as $category){
           $products =  factory(App\Product::class,12)->create(); 
           foreach($products as $product){
            $category->products()->save($product);
           }
        }
    }
}
