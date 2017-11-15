<?php

namespace App\Exceptions;

class LinkNotFound extends \Exception

{
    public function render($request)
    {
        if($request->wantsJson()){
        return response()->json(['message' => 'Link Not Found Exception: '.$request->referrallink.' not found.'],404);
        }
        return redirect(\Config::get('app.url'));
    }
}
