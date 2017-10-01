<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::post('/cart/add', 'Api\Cart\CartController@add')->name('api.cart.add');
Route::post('/cart/update', 'Api\Cart\CartController@update')->name('api.cart.update');
Route::post('/cart/delete', 'Api\Cart\CartController@delete')->name('api.cart.delete');
Route::post('/cart/destroy', 'Api\Cart\CartController@delete')->name('api.cart.destroy');

Route::get('/{vue?}', function () {
    return view('app');
})->where('vue', '[\/\w\.-]*')->name('app');