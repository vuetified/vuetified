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
        'sku' => $faker->numerify('sku-##########'),
        'name' => ucwords($faker->word),
        'excerpt' => $faker->paragraph,
        'description' => $faker->randomHtml(2,3),
        'price' => $faker->numberBetween(0, 100),
        'image' => $faker->imageUrl($width = 640, $height = 480),
        'photos' => json_encode($images),
    ];
});
