<?php

namespace App\Exceptions;

use Illuminate\Http\Request;

class CheckMeOutNotAuthorized extends \Exception

{
    public function render(Request $request)
    {
        if($request->wantsJson()){
        return response()->json(['message' => 'Failed To Authenticate Checkmeout Account'],404);
        }
        return redirect(\Config::get('app.url'));
    }
}
