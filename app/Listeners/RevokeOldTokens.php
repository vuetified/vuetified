<?php

namespace App\Listeners;

use Laravel\Passport\Events\AccessTokenCreated;
use App\User;

class RevokeOldTokens
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AccessTokenCreated  $event
     * @return void
     */
    public function handle(AccessTokenCreated $newtoken)
    {
        User::find($newtoken->userId)->tokens()->where('id', '!=' $newtoken->tokenId)->where('client_id',$newtoken->clientId)->delete();
    }
}
