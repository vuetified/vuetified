<?php

use Illuminate\Database\Seeder;
use App\Category;
use App\Product;

class IamProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Packages',
                'image' => '/img/packages.png'
            ],
            [
                'name' => 'Food Cart',
                'image' => '/img/foodcart.png'
            ],
            [
                'name' => 'Amazing Products',
                'image' => '/img/products.jpg'
            ],
        ];
        foreach($categories as $category){
            Category::create($category);
        }
        $products = [
            [
                'name' => 'Amazing Choco Barley Powered Drink',
                'image' => '/img/products/choco-barley',
                'price' => 700,
                'category_id' => 3,
            ],
            [
                'name' => 'Amazing Coffee Mix with Glutathione',
                'image' => '/img/products/coffee-with-gluta',
                'price' => 900,
                'category_id' => 3,
            ],
            [
                'name' => 'Amazing Coffee Mix With Tongkat-Ali',
                'image' => '/img/products/coffee-with-tongkat-ali',
                'price' => 750,
                'category_id' => 3,
            ],
            [
                'name' => 'Amazing Grape Juice With Garcinia Cambogia',
                'image' => '/img/products/grape-juice-with-garcinia-cambogia',
                'price' => 900,
                'category_id' => 3,
            ],
            [
                'name' => 'Amazing Organic Pure Barley Capsules',
                'image' => '/img/products/grape-juice-with-garcinia-cambogia',
                'price' => 1550,
                'category_id' => 3,
            ],
            [
                'name' => 'Amazing Organic Pure Barley Powered Drink',
                'image' => '/img/products/grape-juice-with-garcinia-cambogia',
                'price' => 900,
                'category_id' => 3,
            ]
        ];
        foreach($products as $product){
            Product::create($product);
        }

        $foodcarts = [
            [
                'name' => 'Mang Siomai',
                'image' => '/img/products/mang-siomai',
                'price' => 700,
                'category_id' => 2,
            ],
            [
                'name' => 'Hongkong Fried Noodles',
                'image' => '/img/products/hongkong-fried-noodles',
                'price' => 900,
                'category_id' => 2,
            ],
            [
                'name' => 'Dumpling King',
                'image' => '/img/products/dumpling-king',
                'price' => 750,
                'category_id' => 2,
            ],
            [
                'name' => 'Chinky Pao',
                'image' => '/img/products/chinky-pao',
                'price' => 900,
                'category_id' => 2,
            ]
        ];
        foreach($foodcarts as $cart){
            Product::create($cart);
        }

        $packages = [
            [
                'name' => 'Bronze Package A',
                'image' => '/img/products/bronze-package-a',
                'price' => 5873,
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze Package B',
                'image' => '/img/products/bronze-package-b',
                'price' => 5873,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper Package A',
                'image' => '/img/products/copper-package-a',
                'price' => 11731,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper Package B',
                'image' => '/img/products/copper-package-b',
                'price' => 11731,
                'category_id' => 1,
            ],


            [
                'name' => 'Gold Package A',
                'image' => '/img/products/gold-package-a',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package B',
                'image' => '/img/products/gold-package-b',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package C',
                'image' => '/img/products/gold-package-c',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package D',
                'image' => '/img/products/gold-package-d',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package E',
                'image' => '/img/products/gold-package-e',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package F',
                'image' => '/img/products/gold-package-f',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package G',
                'image' => '/img/products/gold-package-g',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package H',
                'image' => '/img/products/gold-package-h',
                'price' => 46877,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold Package I',
                'image' => '/img/products/gold-package-i',
                'price' => 46877,
                'category_id' => 1,
            ],


            [
                'name' => 'Titanium Package A',
                'image' => '/img/products/titanium-package-a',
                'price' => 70308,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium Package A',
                'image' => '/img/products/titanium-package-b',
                'price' => 100434,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium Package C',
                'image' => '/img/products/titanium-package-c',
                'price' => 121354,
                'category_id' => 1,
            ],
            

            [
                'name' => 'Platinum Package A',
                'image' => '/img/products/platinum-package-a',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package B',
                'image' => '/img/products/platinum-package-b',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package C',
                'image' => '/img/products/platinum-package-c',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package D',
                'image' => '/img/products/platinum-package-d',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package E',
                'image' => '/img/products/platinum-package-e',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package F',
                'image' => '/img/products/platinum-package-f',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package G',
                'image' => '/img/products/platinum-package-g',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package H',
                'image' => '/img/products/platinum-package-h',
                'price' => 117170,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum Package I',
                'image' => '/img/products/platinum-package-i',
                'price' => 117170,
                'category_id' => 1,
            ]
        ];
        foreach($packages as $package){
        Product::create($package);
        }
    }
}
