<?php

namespace App\Exceptions;

class OrderArchive extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Order#'.$request->order->id.' Archived!'],404);
    }
}