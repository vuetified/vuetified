<?php
Route::get('/getPanelStats', 'Api\Order\OrderController@getPanelStats')->name('api.panel.stats');

Route::get('cmo/login', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->post('https://api.checkmeout.ph/v1/auth/login', [
        GuzzleHttp\RequestOptions::JSON => ['email' => $request->email, 'password' => $request->password]
    ]);
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    $cmo_id = $data['id'];
    $token = $data['token'];
    //! we need to save this token in our database
    return $token;
});
Route::get('cmo/getProducts', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/products', [
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ]
    ]);
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/addItem', function(){

    $client = new \GuzzleHttp\Client();
    $small = 'b85cc79e-2938-4ef2-8f91-a44a389bdb36';
    $medium = '295c6173-2dd1-4cb4-95a2-80235d3e2321';
    $large = '334d617c-5f22-4057-93c6-3bbf988d7237';
    $image = public_path().'/img/foodcart1.png';

    $response = $client->request('POST','https://api.checkmeout.ph/v1/products', [
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
        //! if there is an image of the product we need to upload the image
        GuzzleHttp\RequestOptions::MULTIPART => [
            [
                'name'     => 'product_photo',
                'contents' => fopen($image, 'r')
            ],
            [
                'name' => 'name',
                'contents' => 'production'
            ],
            [
                'name' => 'amount',
                'contents' => 100
            ],
            [
                'name' => 'stock_quantity',
                'contents' => 5
            ],
            [
                'name' => 'receptacle',
                'contents' => $large
            ],
            [
                'name' => 'description',
                'contents' => 'my description'
            ],
            [
                'name' => 'rating',
                'contents' => 5
            ],
            [
                'name' => 'sku',
                'contents' => 'production-sku'
            ],

        ],
    ]);
    return $response;
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getReceptacles', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/receptacles');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getpickupAddress', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/pickupAddress',[
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
    ]);
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});

Route::get('cmo/getSettings', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/settings/payments');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getProvinces', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/locations/countries/PH/provinces');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getCities', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/locations/provinces/29456/cities');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getDistricts', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/locations/cities/29457/districts');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});



Route::get('cmo/getUsers', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/users',[
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
    ]);
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/trackOrders', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/f3/orders/0585-4623-MHPS');
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getOrders', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->get('https://api.checkmeout.ph/v1/f3/orders',[
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
    ]);
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/addOrder', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->post('https://api.checkmeout.ph/v1/checkout',[
        'headers' => [
            'Authorization' => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
        GuzzleHttp\RequestOptions::JSON => 
        [
        'product' => 'phto-41e65bc71', 
        'payment_method' => 'cod',
        'name' => 'power', 
        'phone_number' => 12123123123, 
        'email' => 'test@gmail.com',
        'line_1' => 'line1',
        'line_2' => 'test',
        'state' => 'asdasd',
        'city' => 'test',
        'district' => 'test',
        'postal_code' => 'asdasdasd'
        ],
    ]);
    //! we need to get the tracking number here so we can https://api.checkmeout.ph/v1/f3/orders/0585-4854-SHJD
    //! $data['tracking_number']
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/getOrder', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->post('https://api.checkmeout.ph/v1/f3/orders/0585-4854-SHJD',[
        'headers' => [
            'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
        ],
        GuzzleHttp\RequestOptions::JSON => 
        [
        'name' => 'phto', 
        'amount' => 100, 
        'stock_quantity' => 1, 
        'receptacle' => 'test',
        'description' => 'my description',
        'rating' => 5,
        'sku' => 'product sku',
        ],
    ]);
    //! we need to get here organization->external_id
    //! so we can query https://api.checkmeout.ph/v1/f3/orders/0585-4854-SHJD/confirm?obo=9af4dede-5257-452e-9f5d-a07c536e0c2e
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});
Route::get('cmo/bulkUpload', function(){
    $client = new \GuzzleHttp\Client();
    $response = $client->post('https://api.checkmeout.ph/v1/importProducts',
        [
            'headers' => [
                'Authorization' => 'Bearer ' . 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1MTQ4NjY2NDIsInN1YiI6IjQ5NzlhNWMwNjhhNjU0NzI4MzM1MDNmZDIyZDFkYmQzIn0.bZwKIiz2MlRofIuch_ssDsrSMawUfjyNEl-2BnU2LaM'
            ],
            GuzzleHttp\RequestOptions::JSON => 
            [
            'name' => 'guzzle', 
            'amount' => 100, 
            'stock_quantity' => 1, 
            'receptacle' => $large,
            'description' => 'my description',
            'sku' => 'product sku',
            ]
        ]
);
    
    $data = $response->getBody()->getContents();
    $data = json_decode($data,true);
    return $data;
});

Route::get('/gateways', 'GatewayController@getGateways')->name('api.gateway.index');
Route::get('/couriers', 'GatewayController@getCouriers')->name('api.gateway.index');
Route::post('/cart/add', 'Api\Cart\CartController@add')->name('api.cart.add');
Route::post('/cart/update', 'Api\Cart\CartController@update')->name('api.cart.update');
Route::post('/cart/delete', 'Api\Cart\CartController@delete')->name('api.cart.delete');
Route::post('/cart/destroy', 'Api\Cart\CartController@destroy')->name('api.cart.destroy');
Route::post('/orders/create', 'Api\Order\OrderController@create')->name('api.order.create');
/* Vue Wilcard Route Catcher */

Route::domain('{referrallink}.'.config('app.domain'))->group(function () {
    Route::get('/{vue?}', 'DomainController@sponsor')->where('vue', '[\/\w\.-]*')->name('sponsor');
});

Route::get('/{vue?}', 'DomainController@app')->where('vue', '[\/\w\.-]*')->name('app');