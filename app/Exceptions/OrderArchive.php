<?php

namespace App\Exceptions;

use Illuminate\Http\Request;

class OrderArchive extends \Exception

{
    public function render(Request $request)
    {
        return response()->json(['message' => 'Order#'.$request->order->id.' Archived!'],404);
    }
}