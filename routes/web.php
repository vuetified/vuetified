<?php
/* Cart Web Api */
Route::post('/cart/add', 'Api\Cart\CartController@add')->name('api.cart.add');
Route::post('/cart/update', 'Api\Cart\CartController@update')->name('api.cart.update');
Route::post('/cart/delete', 'Api\Cart\CartController@delete')->name('api.cart.delete');
Route::post('/cart/destroy', 'Api\Cart\CartController@delete')->name('api.cart.destroy');
/* Vue Wilcard Route Catcher */
Route::get('/{vue?}', function () {
    return view('app');
})->where('vue', '[\/\w\.-]*')->name('app');