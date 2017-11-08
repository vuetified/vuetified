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
                'name' => 'Supplements',
                'image' => '/img/products.jpg'
            ],
        ];
        foreach($categories as $category){
            Category::create($category);
        }
        $products = [
            [
                'name' => 'Choco Barley Powdered Drink',
                'image' => '/img/products/choco-barley-powdered-drink.jpg',
                'price' => 700,
                'category_id' => 3,
            ],
            [
                'name' => 'Coffee Mix with Glutathione',
                'image' => '/img/products/coffee-mix-with-glutathione.jpg',
                'price' => 900,
                'category_id' => 3,
            ],
            [
                'name' => 'Coffee Mix With Tongkat-Ali',
                'image' => '/img/products/coffee-mix-with-tongkat-ali.jpg',
                'price' => 750,
                'category_id' => 3,
            ],
            [
                'name' => 'Grape Juice With Garcinia Cambogia',
                'image' => '/img/products/grape-juice-with-garcinia-cambogia.jpg',
                'price' => 900,
                'category_id' => 3,
            ],
            [
                'name' => 'Organic Pure Barley Capsules',
                'image' => '/img/products/organic-pure-barley-capsules.jpg',
                'price' => 1550,
                'category_id' => 3,
            ],
            [
                'name' => 'Organic Pure Barley Powdered Drink',
                'image' => '/img/products/organic-pure-barley-powdered-drink.jpg',
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
                'image' => '/img/products/mang-siomai.jpg',
                'price' => 67200,
                'category_id' => 2,
            ],
            [
                'name' => 'Hongkong Fried Noodles',
                'image' => '/img/products/hongkong-fried-noodles.jpg',
                'price' => 67200,
                'category_id' => 2,
            ],
            [
                'name' => 'Dumpling King',
                'image' => '/img/products/dumpling-king.jpg',
                'price' => 67200,
                'category_id' => 2,
            ],
            [
                'name' => 'Chinky Pao',
                'image' => '/img/products/chinky-pao.jpg',
                'price' => 67200,
                'category_id' => 2,
            ]
        ];
        foreach($foodcarts as $cart){
            Product::create($cart);
        }

        // $packages = [
        //     [
        //         'name' => 'Bronze Package A',
        //         'image' => '/img/products/bronze-package-a',
        //         'excerpt' => '6 Organic Pure Barley Powdered Drink',
        //         'price' => 5873,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Bronze Package B',
        //         'image' => '/img/products/bronze-package-b',
        //         'excerpt' => '6 Grape Juice With Garcinia Cambogia',
        //         'price' => 5873,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Cooper Package A',
        //         'image' => '/img/products/copper-package-a',
        //         'excerpt' => '12 Organic Pure Barley Powdered Drink',
        //         'price' => 11731,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Cooper Package B',
        //         'image' => '/img/products/copper-package-b',
        //         'excerpt' => '12 Grape Juice With Garcinia Cambogia',
        //         'price' => 11731,
        //         'category_id' => 1,
        //     ],


        //     [
        //         'name' => 'Gold Package A',
        //         'image' => '/img/products/gold-package-a',
        //         'excerpt' => '50 Boxes Organic Pure Barley Powdered Drink',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package B',
        //         'image' => '/img/products/gold-package-b',
        //         'excerpt' => '16 Boxes Organic Pure Barley Powdered Drink, 8 Boxes Organic Pure Barley Capsule, 1 Box Choco Barley Powered Drink, 1 Box Coffee Mix with Glutathione, 1 Box Coffee Mix with Tongkat Ali',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package C',
        //         'image' => '/img/products/gold-package-c',
        //         'excerpt' => '22 Boxes Organic Pure Barley Powdered Drink, 16 Boxes Organic Pure Barley Capsule',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package D',
        //         'image' => '/img/products/gold-package-d',
        //         'excerpt' => '1 Silver Elite Scalar Energy Pendant, 1 Elite Gold Scalar Energy Pendant, 1 Elite Black Scalar Energy Pendant, 4 Boxes Organic Pure Barley Powdered Drink, 1 Box Organic Pure Barley Capsule, 1 Box Choco Barley Powered Drink, 1 Box Coffee Mix with Glutathione, 1 Box Coffee Mix with Tongkat Ali' ,
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package E1',
        //         'image' => '/img/products/gold-package-e1',
        //         'excerpt' => '1 Silver Elite Scalar Energy Pendant, 1 Elite Gold Scalar Energy Pendant, 1 Elite Black Scalar Energy Pendant, 1 Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink, 1 Box Coffee Mix with Tongkat Ali, 36 Boxes Grape Juice With Garcinia Cambogia, 8 Boxes Organic Pure Barley Capsule',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package E2',
        //         'image' => '/img/products/gold-package-e2',
        //         'excerpt' => '1 Silver Elite Scalar Energy Pendant, 1 Elite Gold Scalar Energy Pendant, 1 Elite Black Scalar Energy Pendant, 1 Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink, 1 Box Coffee Mix with Tongkat Ali, 35 Boxes Grape Juice With Garcinia Cambogia, 15 Boxes Organic Pure Barley Capsule' ,
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package E3',
        //         'image' => '/img/products/gold-package-e3',
        //         'excerpt' => '1 Silver Elite Scalar Energy Pendant, 1 Elite Gold Scalar Energy Pendant, 1 Elite Black Scalar Energy Pendant, 1 Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink, 1 Box Coffee Mix with Tongkat Ali,3 Pieces Elite Scalar Pendant, 12 Boxes Grape Juice With Garcinia Cambogia, 10 Boxes  Organic Pure Barley Powdered Drink',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Gold Package E4',
        //         'image' => '/img/products/gold-package-e4',
        //         'excerpt' => '1 Silver Elite Scalar Energy Pendant, 1 Elite Gold Scalar Energy Pendant, 1 Elite Black Scalar Energy Pendant, 1 Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink, 1 Box Coffee Mix with Tongkat Ali, 50 Boxes Grape Juice With Garcinia Cambogia',
        //         'price' => 46877,
        //         'category_id' => 1,
        //     ],


        //     [
        //         'name' => 'Titanium Package A',
        //         'image' => '/img/products/titanium-package-a',
        //         'excerpt' => 'Titanuim Package',
        //         'price' => 70308,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Titanium Package B',
        //         'image' => '/img/products/titanium-package-b',
        //         'excerpt' => 'Titanuim Package + 1 Collapsible Cart',
        //         'price' => 100434,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Titanium Package C',
        //         'image' => '/img/products/titanium-package-c',
        //         'excerpt' => 'Titanuim Package + 1 Standard Cart',
        //         'price' => 121354,
        //         'category_id' => 1,
        //     ],
            

        //     [
        //         'name' => 'Platinum Package A',
        //         'image' => '/img/products/platinum-package-a',
        //         'excerpt' => '125 Boxes Organic Pure Barley Powdered Drink',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package B',
        //         'image' => '/img/products/platinum-package-b',
        //         'excerpt' => '20 Boxes Organic Pure Barley Powdered Drink or 20  Boxes Choco Barley Powered Drink or 20 Boxes Organic Pure Barley Capsules, 32 Boxes Coffee Mix with  Glutathione or 32 Boxes Coffee with Tongkat Ali',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package C',
        //         'image' => '/img/products/platinum-package-c',
        //         'excerpt' => '6 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black) or 6 Pieces Standard Scalar Energy Pendant, 9 boxes Organic Pure Barley Powdered Drink, 8 Boxes Organic Pure Barley Capsules, 5 Boxes Coffee Mix with Glutathione, 5 Boxes Coffee Mix with Tongkat Ali, 4 Boxes Choco Barley Powered Drink',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package D',
        //         'image' => '/img/products/platinum-package-d',
        //         'excerpt' => '3 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black) or 3 Pieces Standard Scalar Energy Pendant, 30 Boxes Organic Pure Barley Powdered Drink, 40 Boxes Coffee Mix with Glutathione or 40 Boxes Coffee Mix with Tongkat Ali',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package E1',
        //         'image' => '/img/products/platinum-package-e1',
        //         'excerpt' => '1 Complete Set of Titanium Franchise Package, 3 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black),2 Pieces Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink or 3 Boxes Coffee Mix with Glutathione or 3 Boxes Coffee Mix with Tongkat Ali, 76 Boxes Grape Juice With Garcinia Cambogia, 28 Boxes Organic Pure Barley Capsules',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package E2',
        //         'image' => '/img/products/platinum-package-e2',
        //         'excerpt' => '1 Complete Set of Titanium Franchise Package, 3 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black),2 Pieces Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink or 3 Boxes Coffee Mix with Glutathione or 3 Boxes Coffee Mix with Tongkat Ali, 75 Boxes Grape Juice With Garcinia Cambogia ,50 Boxes Organic Pure Barley Powdered Drink',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package E3',
        //         'image' => '/img/products/platinum-package-e3',
        //         'excerpt' => '1 Complete Set of Titanium Franchise Package, 3 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black),2 Pieces Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink or 3 Boxes Coffee Mix with Glutathione or 3 Boxes Coffee Mix with Tongkat Ali, 3 Pieces Elite Scalar Pendant, 3 Pieces  Standard Scalar Pendant, 50 Boxes Grape Juice With Garcinia Cambogia, 26 Boxes Organic Pure Barley Powdered Drink',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],
        //     [
        //         'name' => 'Platinum Package E4',
        //         'image' => '/img/products/platinum-package-e4',
        //         'excerpt' => '1 Complete Set of Titanium Franchise Package, 3 Pieces Elite Scalar Energy Pendant (Silver/Gold/Black),2 Pieces Standard Scalar Energy Pendant, 3 Boxes Organic Pure Barley Powdered Drink or 3 Boxes Coffee Mix with Glutathione or 3 Boxes Coffee Mix with Tongkat Ali, 125 Boxes Grape Juice With Garcinia Cambogia',
        //         'price' => 117170,
        //         'category_id' => 1,
        //     ],

        // ];
        // foreach($packages as $package){
        // Product::create($package);
        // }
    }
}
