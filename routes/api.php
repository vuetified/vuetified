<?php
Route::group(['middleware' => ['auth:api']], function () {

    Route::post('/@me', 'Api\UsersController@me')->name('api.@me');
    Route::post('/users', 'Api\UsersController@index')->name('api.user.index');
    Route::post('/users/username/{username}', 'Api\UsersController@findByUsername')->name('api.user.findByUsername');
    Route::post('/users/email/{email}', 'Api\UsersController@findByEmail')->name('api.user.findByEmail');
    Route::post('/users/{id}', 'Api\UsersController@show')->name('api.user.show');

    Route::get('/permissions', 'Api\Auth\PermissionRolesController@getAllPermissions')->name('api.permissions.index');
    Route::get('/roles', 'Api\Auth\PermissionRolesController@getAllRoles')->name('api.roles.index');
    Route::post('/users/{id}/syncRoles', 'Api\Auth\PermissionRolesController@syncRoles')->name('api.user.roles.sync');
    Route::post('/users/{id}/syncPermissions', 'Api\Auth\PermissionRolesController@syncPermissions')->name('api.user.permissions.sync');


    Route::get('/users/{id}/activateLink', 'Api\Link\ActivationController@activateLink')->name('api.user.link.activate');
    Route::get('/users/{id}/deactivateLink', 'Api\Link\ActivationController@deactivateLink')->name('api.user.link.deactivate');

    Route::post('/users/settings/updateAccount', 'Api\Settings\SettingsController@updateAccount')->name('api.user.updateAccount');
    Route::post('/users/settings/updateProfile', 'Api\Settings\SettingsController@updateProfile')->name('api.user.updateProfile');
    Route::post('/users/settings/updateContactDetails', 'Api\Settings\SettingsController@updateContactDetails')->name('api.user.updateContactDetails');
    Route::post('/users/settings/updateSocialLink', 'Api\Settings\SettingsController@updateSocialLink')->name('api.user.updateSocialLink');
    Route::post('/users/settings/updateReferralLink', 'Api\Settings\SettingsController@updateReferralLink')->name('api.user.updateReferralLink');

    Route::post('/getAuth', 'Api\Auth\ACLController@getAuth')->name('api.auth.getAuth');
    Route::post('/auth/check', 'Api\Auth\LoginController@check')->name('api.auth.check');

    Route::get('/getPermissionsViaRoles', 'Api\Auth\ACLController@getPermissionsViaRoles')->name('api.auth.getPermissionsViaRoles');
    Route::get('/getDirectPermissions', 'Api\Auth\ACLController@getDirectPermissions')->name('api.auth.getDirectPermissions');
    Route::get('/getAllPermissions', 'Api\Auth\ACLController@getAllPermissions')->name('api.auth.getAllPermissions');
    Route::get('/hasPermissionTo', 'Api\Auth\ACLController@hasPermissionTo')->name('api.auth.hasPermissionTo');
    Route::get('/hasAnyPermission', 'Api\Auth\ACLController@hasAnyPermission')->name('api.auth.hasAnyPermission');

    Route::get('/getRoles', 'Api\Auth\ACLController@getRoles')->name('api.auth.getRoles');
    Route::get('/hasRole', 'Api\Auth\ACLController@hasRole')->name('api.auth.hasRole');
    Route::get('/hasAnyRole', 'Api\Auth\ACLController@hasAnyRole')->name('api.auth.hasAnyRole');
    Route::get('/hasAllRoles', 'Api\Auth\ACLController@hasAllRoles')->name('api.auth.hasAllRoles');

    Route::post('/auth/logout', 'Api\Auth\LoginController@logout')->name('api.auth.logout');
});

Route::post('/auth/register', 'Api\Auth\RegisterController@register')->name('api.auth.register');
Route::post('/auth/login', 'Api\Auth\LoginController@login')->name('api.auth.login');
Route::post('/auth/refresh', 'Api\Auth\LoginController@refresh')->name('api.auth.refresh');
Route::post('/auth/social', 'Api\Auth\SocialAuthController@socialAuth')->name('api.auth.social');
Route::post('/sendResetEmail', 'Api\Auth\ForgotPasswordController@sendResetEmail')->name('api.auth.forgotpassword');

Route::post('/resetPassword', 'Api\Auth\ResetPasswordController@resetPassword')->name('api.auth.reset-password');

Route::get('/categories', 'Api\CategoriesController@index')->name('api.category.index');
Route::get('/categories/{slug}', 'Api\CategoriesController@show')->name('api.category.show');

Route::get('/products', 'Api\ProductsController@index')->name('api.product.index');
Route::get('/products/{slug}', 'Api\ProductsController@show')->name('api.product.show');
Route::post('/products/{slug}/edit', 'Api\ProductsController@update')->name('api.product.update');
Route::post('/products/{slug}/uploadImage', 'Api\ProductsController@uploadImage')->name('api.product.uploadImage');

Route::post('/orders/{order}/toggle/paid', 'Api\Order\ToggleOrderController@togglePaid')->name('api.toggle.paid');
Route::post('/orders/{order}/toggle/sent', 'Api\Order\ToggleOrderController@toggleSent')->name('api.toggle.sent');
Route::post('/orders/{order}/toggle/received', 'Api\Order\ToggleOrderController@toggleReceived')->name('api.toggle.received');
Route::post('/orders/{order}/toggle/done', 'Api\Order\ToggleOrderController@toggleDone')->name('api.toggle.done');

Route::post('/orders/{order}/destroy', 'Api\Order\OrderController@destroy')->name('api.order.destroy')->middleware('can:delete_order,order');
Route::post('/orders/{order}/customer-details', 'Api\Order\OrderDetailsConstroller@updateCustomerDetails')->name('api.orders.customer_details');
Route::post('/orders/{order}/shipping-details', 'Api\Order\OrderDetailsConstroller@updateShippingDetails')->name('api.orders.shipping_details');
Route::post('/orders/{order}/payment-details', 'Api\Order\OrderDetailsConstroller@updatePaymentDetails')->name('api.orders.payment_details');
Route::post('/orders/{order}/shipment-details', 'Api\Order\OrderDetailsConstroller@updateShipmentDetails')->name('api.orders.shipment_details');

Route::post('/orders/{order}/receipts', 'Api\Media\ReceiptUploadController@upload')->name('api.media.receiptUploader');

// Route::post('/checkout', 'Api\CheckoutController@checkout')->name('api.product.show');
// Checkout Will Save A New Order For Specific Authenticated User
