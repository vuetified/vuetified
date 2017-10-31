<?php

namespace App\Exceptions;

class OrderDone extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Failed To Update Order#'.$request->order],404);
    }
}