<?php

namespace App\Exceptions;

use Illuminate\Http\Request;

class OrderDone extends \Exception

{
    public function render(Request $request)
    {
        return response()->json(['message' => 'Undone Order#'.$request->order->id.' To Update'],404);
    }
}