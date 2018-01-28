<?php
Route::get('/getPanelStats', 'Api\Order\OrderController@getPanelStats')->name('api.panel.stats');
Route::get('/gateways', 'GatewayController@getGateways')->name('api.gateway.index');
Route::get('/couriers', 'GatewayController@getCouriers')->name('api.gateway.index');
Route::post('/cart/add', 'Api\Cart\CartController@add')->name('api.cart.add');
Route::post('/cart/update', 'Api\Cart\CartController@update')->name('api.cart.update');
Route::post('/cart/delete', 'Api\Cart\CartController@delete')->name('api.cart.delete');
Route::post('/cart/destroy', 'Api\Cart\CartController@destroy')->name('api.cart.destroy');
Route::post('/orders/create', 'Api\Order\OrderController@create')->name('api.order.create');

/* Vue Wilcard Route Catcher */
Route::domain('{referrallink}.'.config('app.domain'))->group(function () {
    //! HardCoded Links Make Sure To Change This On CheckOutDiaglog.vue line 94
    Route::post('/api/cmo/addItems', 'CheckMeOutController@addItems')->name('api.cmo.addItems.referral');
    Route::get('/{vue?}', 'DomainController@sponsor')->where('vue', '[\/\w\.-]*')->name('sponsor');
});
//! HardCoded Links Make Sure To Change This On CheckOutDiaglog.vue line 94
Route::post('/api/cmo/addItems', 'CheckMeOutController@addItems')->name('api.cmo.addItems.main');
Route::get('/{vue?}', 'DomainController@app')->where('vue', '[\/\w\.-]*')->name('app');