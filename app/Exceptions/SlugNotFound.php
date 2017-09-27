<?php

namespace App\Exceptions;

class SlugNotFound extends \Exception

{
    public function render($request)
    {
        return response()->json(['message' => 'Slug Not Found Exception: '.$request->slug.' slug not found.'],404);
    }
}
