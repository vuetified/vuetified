<?php

namespace App\Providers;

// use Carbon\Carbon;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        /* Register Passport Routes */
        Passport::routes();

        /* Add Expiration to Access Token */
        // Passport::tokensExpireIn(Carbon::now()->addDays(15));
        // Passport::refreshTokensExpireIn(Carbon::now()->addDays(30));

        /* Add Scope */

        // Passport::tokensCan([
        //     'place-orders' => 'Place orders',
        //     'check-status' => 'Check order status',
        // ]);
    }
}
