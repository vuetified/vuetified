<?php

namespace App\Exceptions;

class OrderNotFound extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Order with ID: '.$request->order.' Not Found!'],404);
    }
}