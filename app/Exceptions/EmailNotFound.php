<?php

namespace App\Exceptions;

class EmailNotFound extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Email Not Found Exception: '.$request->email.' not found.'],404);
    }
}
