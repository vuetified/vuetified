<?php

namespace App\Exceptions;

class OrderDone extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Undone Order#'.$request->order->id.' To Update'],404);
    }
}