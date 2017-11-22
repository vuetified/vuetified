<?php

namespace App\Exceptions;

use Illuminate\Http\Request;

class OrderNotFound extends \Exception

{
    public function render(Request $request)
    {
        return response()->json(['message' => 'Order with ID: '.$request->order.' Not Found!'],404);
    }
}