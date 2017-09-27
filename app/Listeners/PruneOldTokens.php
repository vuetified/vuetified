<?php

namespace App\Listeners;

use Laravel\Passport\Events\RefreshTokenCreated;
use Illuminate\Support\Facades\DB;

class PruneOldTokens
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
     * @param  RefreshTokenCreated  $event
     * @return void
     */
    public function handle(RefreshTokenCreated $newtoken)
    {
        DB::table('oauth_refresh_tokens')
        ->where('id', '<>', $newtoken->refreshTokenId)
        ->where('access_token_id', $newtoken->accessTokenId)
        ->delete();
    }
}
