<?php
/* Cart Web Api */
Route::get('/gateways', function(){
   return  \App\Gateway::all();
})->name('api.gateway.index');
Route::get('/couriers', function(){
    return  \App\Courier::all();
 })->name('api.courier.index');
Route::post('/cart/add', 'Api\Cart\CartController@add')->name('api.cart.add');
Route::post('/cart/update', 'Api\Cart\CartController@update')->name('api.cart.update');
Route::post('/cart/delete', 'Api\Cart\CartController@delete')->name('api.cart.delete');
Route::post('/cart/destroy', 'Api\Cart\CartController@destroy')->name('api.cart.destroy');
Route::post('/orders/create', 'Api\Order\OrderController@create')->name('api.order.create');
/* Vue Wilcard Route Catcher */
Route::get('/{vue?}', function () {
    return view('app');
})->where('vue', '[\/\w\.-]*')->name('app');