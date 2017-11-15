<?php

use Faker\Generator as Faker;
use App\User;

$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'username' => $faker->unique()->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => 'secret',
        'remember_token' => str_random(10),
    ];
});
