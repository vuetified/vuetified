<?php

use Faker\Generator as Faker;
use App\Category;

$factory->define(Category::class, function (Faker $faker) {
    return [
        'name' => ucwords($faker->word),
        'image' => $faker->imageUrl($width = 640, $height = 480)
    ];
});
