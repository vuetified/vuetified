<?php

use Faker\Generator as Faker;
use App\Link;
use App\User;

$factory->define(Link::class, function (Faker $faker) {
    return [
        'link' => $faker->unique()->userName,
        'active' => true,
        'date_activated' => \Carbon\Carbon::now(),
    ];
});
