<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Observers\UserObserver;
use App\Observers\LinkObserver;
use App\User;
use App\Link;
use App\Observers\CheckMeOutObserver;
use App\CheckMeOut;

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
        CheckMeOut::observe(CheckMeOutObserver::class);
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
