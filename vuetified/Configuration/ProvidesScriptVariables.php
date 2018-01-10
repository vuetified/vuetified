<?php

namespace Vuetified\Configuration;

use Vuetified\Vuetified;
use Illuminate\Support\Facades\Auth;
use Vuetified\Contracts\InitialFrontendState;
use App\Exceptions\UserTokenNotFound;

trait ProvidesScriptVariables
{
    /**
     * Get the default JavaScript variables for Spark.
     *
     * @return array
     */
    public static function scriptVariables()
    {
        return [
            'csrfToken' => csrf_token(),
            'env' => config('app.env'),
            'api_endpoint' => config('app.domain').'/api',
            'site'  => config('site'), // Should Be Fetch From DB Settings
            'menu' => config('menu'), // Should Be Fetch From DB Menu and GroupMenu
            'grouplinks' => config('grouplinks'),
            'theme' => config('theme'),
            'cart' => self::getCart(),
            'sponsor' => self::getSponsor(),
            'adwords' => self::getAdwordsTagKeys(),
            'checkmeout' => self::getCheckMeOutKeys()
            // This will only be Loaded for Authenticated users
            // Specifically Admin Role
            // Hmmf maybe we can use Resource to Dynamically Load this stuff?
            // 'widgets' => [
            //     'productCounter' => self::getProducts(), // admin
            //     'usersCounter' => self::getUsersCount(), // admin
            //     'activeUsersCounter' => self::getActiveUsersCounter(), // admin
            //     'totalPendingIncome' => self::getTotalPendingIncome(),
            //     'totalPaidIncome' => self::getTotalPaidIncome(), // admin
            //     'totalRefund' => self::getTotalRefund(), //admin
            //     'placedOrderCounter' => self::getPlacedOrders(), // customer
            //     'pendingOrderCounter' => self::getPendingOrders(), // customer
            //     'paidOrderCounter' => self::getPaidOrders(), // customer
            //     'deliveredOrderCounter' => self::getDeliveredOrders(), // customer
            // ],
        ];
    }

    protected static function getState()
    {
       return Vuetified::call(InitialFrontendState::class.'@forUser', [Auth::user()]);
    }
    protected static function getCart()
    {
       return Vuetified::call(InitialFrontendState::class.'@getCart');
    }

    protected static function getSponsor()
    {
        if($link = request()->referrallink){
            $user = Vuetified::user()->find($link->user_id);
            return [
                'user_id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'profile' => $user->profile,
                'contact_details' => json_decode($user->contact_details,true),
                'social_links' => json_decode($user->social_links,true)
            ];
        }
        // We Will Return a Default Sponsor
        else{
            $user = Vuetified::user()->first()->load('profile');
            return [
                'user_id' => $user->id,
                'name' => $user->name,
                'username' => $user->username,
                'profile' => $user->profile,
                'contact_details' => json_decode($user->contact_details,true),
                'social_links' => json_decode($user->social_links,true)
            ];
        }
    }

    protected static function getAdwordsTagKeys()
    {
        // Get the User adwords key by User link being used , if not is given use the admin link
        // to fetch the adwords credentials
        return [
            'key' => config('services.adwords.key'),
            'send_to' => config('services.adwords.send_to'),
        ];
    }
    protected static function getCheckMeOutKeys()
    {
        return [
            'api_key' => config('services.checkmeout.api_key'),
            'secret_key' => config('services.checkmeout.secret_key'),
        ];

        $user = request()->user();
        if(!user){
            throw new UserTokenNotFound;
        }
        $token = $user->checkmeout->token;
        return [
            'token' => $token,
        ];
    }

}

