<?php

namespace App\Observers;

use App\CheckMeOut;
use Keygen;
use Hash;

class CheckMeOutObserver
{
    /**
     * Listen to the User created event.
     *
     * @param  User  $user
     * @return void
     */
    public function creating(CheckMeOut $checkmeout)
    {
        // If We Didnt Passed Any  Id On CheckMeout Creation then We Generate One
        if(is_null($checkmeout->id) && !is_numeric($checkmeout->id)){
            $checkmeout->id = CheckMeOut::generateUniqueID();
        }
        
    }

    /**
     * Listen to the User deleting event.
     *
     * @param  User  $user
     * @return void
     */
    public function deleting(User $user)
    {
        //
    }

}