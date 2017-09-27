<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Observers\UserObserver;
use App\Observers\LinkObserver;
use App\User;
use App\Link;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);
        Link::observe(LinkObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}
