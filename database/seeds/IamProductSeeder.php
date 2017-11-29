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
                'featured' => true
            ],
            [
                'name' => 'Coffee Mix with Glutathione',
                'image' => '/img/products/coffee-mix-with-glutathione.jpg',
                'price' => 900,
                'category_id' => 3,
                'featured' => true
            ],
            [
                'name' => 'Coffee Mix With Tongkat-Ali',
                'image' => '/img/products/coffee-mix-with-tongkat-ali.jpg',
                'price' => 750,
                'category_id' => 3,
                'featured' => true
            ],
            [
                'name' => 'Grape Juice With Garcinia Cambogia',
                'image' => '/img/products/grape-juice-with-garcinia-cambogia.jpg',
                'price' => 900,
                'category_id' => 3,
                'featured' => true
            ],
            [
                'name' => 'Organic Pure Barley Capsules',
                'image' => '/img/products/organic-pure-barley-capsules.jpg',
                'price' => 1550,
                'category_id' => 3,
                'featured' => true
            ],
            [
                'name' => 'Organic Pure Barley Powdered Drink',
                'image' => '/img/products/organic-pure-barley-powdered-drink.jpg',
                'price' => 900,
                'category_id' => 3,
                'featured' => true
            ]
        ];
        foreach($products as $product){
            Product::create($product);
        }

        $foodcarts = [
            [
                'name' => 'Mang Siomai Standard',
                'image' => '/img/products/mang-siomai.jpg',
                'price' => 112000,
                'category_id' => 2,
            ],
            [
                'name' => 'Mang Siomai Collapsible',
                'image' => '/img/products/mang-siomai.jpg',
                'price' => 67200,
                'category_id' => 2,
                'featured' => true
            ],
            [
                'name' => 'Hongkong Fried Noodles Standard',
                'image' => '/img/products/hongkong-fried-noodles.jpg',
                'price' => 112000,
                'category_id' => 2,
            ],
            [
                'name' => 'Hongkong Fried Noodles Collapsible',
                'image' => '/img/products/hongkong-fried-noodles.jpg',
                'price' => 67200,
                'category_id' => 2,
                'featured' => true
            ],
            [
                'name' => 'Dumpling King Standard',
                'image' => '/img/products/dumpling-king.jpg',
                'price' => 112000,
                'category_id' => 2,
            ],
            [
                'name' => 'Dumpling King Collapsible',
                'image' => '/img/products/dumpling-king.jpg',
                'price' => 67200,
                'category_id' => 2,
                'featured' => true
            ],
            [
                'name' => 'Chinky Pao Standard',
                'image' => '/img/products/chinky-pao.jpg',
                'price' => 112000,
                'category_id' => 2,
            ],
            [
                'name' => 'Chinky Pao Collapsible',
                'image' => '/img/products/chinky-pao.jpg',
                'price' => 67200,
                'category_id' => 2,
                'featured' => true
            ]
        ];
        foreach($foodcarts as $cart){
            Product::create($cart);
        }

        $packages = [
            [
                'name' => 'Pay LITE',
                'image' => '/img/packages.png',
                'excerpt' => '6 Organic Pure Barley Powdered Drink',
                'description' => 'Add All Variation of Products',
                'price' => 2800,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper A',
                'image' => '/img/packages.png',
                'excerpt' => '6 Boxes: Pure Barley Powder',
                'price' => 5400,
                'description' => 'Add All Variation of Products',
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper B',
                'image' => '/img/packages.png',
                'excerpt' => '2 Boxes: Pure Barley Powder,1 Box: Pure Barley Capsules,1 Box: Choco Barley,1 Box: Coffee with Glutathione,1 Box: Coffee with Tongkat-Ali',
                'price' => 5600,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper C',
                'image' => '/img/packages.png',
                'excerpt' => '3 Boxes: Pure Barley Powder,2 Box: Pure Barley Capsules',
                'price' => 5800,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper D',
                'image' => '/img/packages.png',
                'excerpt' => '3 Boxes: Pure Barley Powder,2 Box: Coffee with Glutathione,2 Box: Coffee with Tongkat-Ali',
                'price' => 5700,
                'category_id' => 1,
            ],
            [
                'name' => 'Cooper E',
                'image' => '/img/packages.png',
                'excerpt' => '1 Piece: Standard scalar Energy Pendant',
                'price' => 6000,
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze A',
                'image' => '/img/packages.png',
                'excerpt' => '13 Boxes: Pure Barley Powder',
                'price' => 11700,
                'description' => 'Add All Variation of Products',
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze B',
                'image' => '/img/packages.png',
                'excerpt' => '4 Boxes: Pure Barley Powder,2 Boxes: Pure Barley Capsules,2 Boxes: Choco Barley,2 Boxes: Coffee with Glutathione,2 Boxes: Coffee with Tongkat-Ali',
                'price' => 11200,
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze C',
                'image' => '/img/packages.png',
                'excerpt' => '6 Boxes: Pure Barley Powder,4 Boxes: Pure Barley Capsules',
                'price' => 11600,
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze D',
                'image' => '/img/packages.png',
                'excerpt' => '6 Boxes: Pure Barley Powder,4 Boxes: Coffee with Glutathione,4 Boxes: Coffee with Tongkat-Ali',
                'price' => 11400,
                'category_id' => 1,
            ],
            [
                'name' => 'Bronze E',
                'image' => '/img/packages.png',
                'excerpt' => '1 Piece: Standard scalar Energy Pendant,3 Boxes: Pure Barley Powder',
                'price' => 11200,
                'category_id' => 1,
            ],
            [
                'name' => 'Silver A',
                'image' => '/img/packages.png',
                'excerpt' => '25 Boxes: Pure Barley Powder',
                'description' => 'Add All Variation of Products',
                'price' => 22500,
                'category_id' => 1,
            ],
            [
                'name' => 'Silver B',
                'image' => '/img/packages.png',
                'excerpt' => '8 Boxes: Pure Barley Powder,4 Boxes: Pure Barley Capsules,4 Boxes: Choco Barley,4 Boxes: Coffee with Glutathione,4 Boxes: Coffee with Tongkat-Ali',
                'price' => 22400,
                'category_id' => 1,
            ],
            [
                'name' => 'Silver C',
                'image' => '/img/packages.png',
                'excerpt' => '11 Boxes: Pure Barley Powder,8 Boxes: Pure Barley Capsules',
                'price' => 22300,
                'category_id' => 1,
            ],
            [
                'name' => 'Silver D',
                'image' => '/img/packages.png',
                'excerpt' => '12 Boxes: Pure Barley Powder,8 Boxes: Coffee with Glutathione,8 Boxes: Coffee with Tongkat-Ali',
                'price' => 22800,
                'category_id' => 1,
            ],
            [
                'name' => 'Silver E',
                'image' => '/img/packages.png',
                'excerpt' => '1 Piece: Standard scalar Energy Pendant,1 Piece: Elite scalar Energy Pendant,4 Boxes: Pure Barley Powder,3 Boxes: Coffee with Glutathione,3 Boxes: Coffee with Tongkat-Ali',
                'price' => 22300,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold A',
                'image' => '/img/packages.png',
                'excerpt' => '50 Boxes: Pure Barley Powder',
                'description' => 'Add All Variation of Products',
                'price' => 45000,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold B',
                'image' => '/img/packages.png',
                'excerpt' => '16 Boxes: Pure Barley Powder,8 Boxes: Pure Barley Capsules,8 Boxes: Choco Barley,8 Boxes: Coffee with Glutathione,8 Boxes: Coffee with Tongkat-Ali',
                'price' => 44800,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold C',
                'image' => '/img/packages.png',
                'excerpt' => '22 Boxes: Pure Barley Powder,16 Boxes: Pure Barley Capsules',
                'price' => 44600,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold D',
                'image' => '/img/packages.png',
                'excerpt' => '3 Pieces: Elite Scalar Energy Pendant,2 Pieces: Standard Scalar Energy Pendant,4 Boxes: Pure Barley Powder,4 Boxes: Pure Barley Capsules,4 Boxes: Choco Barley,4 Box: Coffee with Glutathione,4 Box: Coffee with Tongkat-Ali',
                'price' => 44300,
                'category_id' => 1,
            ],
            [
                'name' => 'Gold E',
                'image' => '/img/packages.png',
                'excerpt' => '3 Pieces: Elite Scalar Energy Pendant,2 Pieces: Standard Scalar Energy Pendant,3 Boxes: Pure Barley Powder,3 Box: Coffee with Glutathione,3 Box: Coffee with Tongkat-Ali',
                'price' => 44600,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum A',
                'image' => '/img/packages.png',
                'excerpt' => '125 Boxes: Pure Barley Powder',
                'description' => 'Add All Variation of Products',
                'price' => 112500,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum B',
                'image' => '/img/packages.png',
                'excerpt' => '20 Boxes: Pure Barley Powder,20 Boxes: Pure Barley Capsules,20 Boxes: Choco Barley,32 Boxes: Coffee with Glutathione,32 Boxes: Coffee with Tongkat-Ali',
                'price' => 112000,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum C',
                'image' => '/img/packages.png',
                'excerpt' => '6 Pieces: Elite Scalar Energy Pendant,5 Pieces: Standard Scalar Energy Pendant,9 Boxes: Pure Barley Powder,8 Boxes: Pure Barley Capsules,4 Boxes: Choco Barley,5 Boxes: Coffee with Glutathione,5 Boxes: Coffee with Tongkat-Ali',
                'price' => 112000,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum D',
                'image' => '/img/packages.png',
                'excerpt' => '3 Pieces: Elite Scalar Energy Pendant,30 Boxes: Pure Barley Powder,40 Box: Coffee with Glutathione,40 Box: Coffee with Tongkat-Ali',
                'price' => 112500,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum E',
                'image' => '/img/packages.png',
                'excerpt' => '1 Complete set of Platinum Franchise Package',
                'price' => 112500,
                'category_id' => 1,
            ],
            [
                'name' => 'Platinum F',
                'image' => '/img/packages.png',
                'excerpt' => '1 Complete set of Titanium Franchise Package,3 Pieces: Elite Scalar Energy Pendant,2 Pieces: Standard Scalar Energy Pendant,3 Boxes: Pure Barley Powder,3 Box: Coffee with Glutathione,3 Box: Coffee with Tongkat-Ali',
                'description' => 'Add All Variation of Products',
                'price' => 112500,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium A',
                'image' => '/img/packages.png',
                'excerpt' => '75 Boxes: Pure Barley Powder',
                'description' => 'Add All Variation of Products',
                'price' => 67500,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium B',
                'image' => '/img/packages.png',
                'excerpt' => '19 Boxes: Pure Barley Powder,12 Boxes: Pure Barley Capsules,14 Boxes: Choco Barley,14 Boxes: Coffee with Glutathione,14 Boxes: Coffee with Tongkat-Ali',
                'price' => 67200,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium C',
                'image' => '/img/packages.png',
                'excerpt' => '33 Boxes: Pure Barley Powder,24 Boxes: Pure Barley Capsules',
                'price' => 66900,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium D',
                'image' => '/img/packages.png',
                'excerpt' => '4 Pieces: Elite Scalar Energy Pendant,2 Pieces: Standard Scalar Energy Pendant,10 Boxes: Pure Barley Powder,6 Boxes: Choco Barley,4 Box: Coffee with Glutathione,4 Box: Coffee with Tongkat-Ali',
                'price' => 67000,
                'category_id' => 1,
            ],
            [
                'name' => 'Titanium Package E',
                'image' => '/img/packages.png',
                'excerpt' => '1 Complete set of Titanium Franchise Package',
                'price' => 67200,
                'category_id' => 1,
            ],
            [
                'name' => 'Jade A',
                'image' => '/img/packages.png',
                'excerpt' => '25 Boxes: Organic Face Cream,25 Boxes: Organic Body Cream,50 Boxes: Garcinia Cambogia,30 Boxes: Barley Powder,10 Boxes: Coffee with Glutathione,10 Boxes: Coffee with Tongkat-Ali,10 Boxes: Choco Barley,10 Boxes:Barley Capsule',
                'price' => 216250,
                'category_id' => 1,
            ],
            [
                'name' => 'Jade B',
                'image' => '/img/packages.png',
                'excerpt' => '225 Boxes: Garcinia Cambogia',
                'price' => 202500,
                'category_id' => 1,
            ],
            [
                'name' => 'Jade C',
                'image' => '/img/packages.png',
                'excerpt' => '50 Boxes: Organic Face Cream,50 Boxes: Organic Body Cream',
                'price' => 212500,
                'category_id' => 1,
            ],
            [
                'name' => 'Jade D',
                'image' => '/img/packages.png',
                'excerpt' => '60 Boxes: Garcinia Cambogia,50 Boxes: Barley Powder,25 Boxes: Organic Face Cream,25 Boxes: Organic Body Cream',
                'price' => 205250,
                'category_id' => 1,
            ],

        ];
        foreach($packages as $package){
        Product::create($package);
        }
    }
}
