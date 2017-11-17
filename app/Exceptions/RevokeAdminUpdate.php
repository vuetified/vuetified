<?php

namespace App\Exceptions;

class RevokeAdminUpdate extends \Exception

{
    public function render($request)
    {
        if($request->wantsJson()){
        return response()->json(['message' => 'Modifying Super Admin is Not Allowed!'],404);
        }
        return redirect(\Config::get('app.url'));
    }
}
