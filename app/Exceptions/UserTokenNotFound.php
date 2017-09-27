<?php

namespace App\Exceptions;

class UserTokenNotFound extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'User Token Not Found Exception: This Resource Can Only Be Loaded With Authorized User Token'],404);
    }
}
