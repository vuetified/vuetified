<?php

namespace App\Exceptions;

class UsernameNotFound extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Username Not Found Exception: '.$request->username.' not found.'],404);
    }
}
