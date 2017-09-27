<?php

use Faker\Generator as Faker;
use App\Product;

$factory->define(Product::class, function (Faker $faker) {
    $images = [];
    $count = 5;
    for ($i=0; $i < $count ; $i++) { 
        array_push($images,$faker->imageUrl($width = 640, $height = 480));
    }
    return [
        'name' => ucwords($faker->word),
        'stock' => $faker->numberBetween(0, 100),
        'sku' => $faker->numerify('sku-#####'),
        'price' => $faker->numberBetween(0, 100),
        'summary' => $faker->paragraph,
        'description' => $faker->randomHtml(2,3),
        'image' => $faker->imageUrl($width = 640, $height = 480),
        'gallery' => json_encode($images),
        'rating_cache' => $faker->randomDigit,
        'rating_count' => $faker->randomDigit,
    ];
});
