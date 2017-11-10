<?php

namespace App\Exceptions;

class UsernameNotFound extends \Exception

{
    public function render($request)
    {
        if($request->wantsJson()){
        return response()->json(['message' => 'Username Not Found Exception: '.$request->username.' not found.'],404);
        }
        return redirect(\Config::get('app.url'));
    }
}
