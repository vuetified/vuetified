<?php

namespace App\Exceptions;

class UserNotFound extends \Exception

{
    public function render($request)
    {
        if($request->wantsJson()){
        return response()->json(['message' => 'User ID: '.$request->id .' Not Found!'],404);
        }
        return redirect(\Config::get('app.url'));
    }
}
