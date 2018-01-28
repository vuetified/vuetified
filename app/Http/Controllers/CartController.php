<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckMeOutTrait;

class CartController extends Controller
{
    use CheckMeOutTrait;

    public function checkout($sponsor = null)
    {
        // return $sponsor;
        if(!$sponsor){
            return 'No SPONSOR';
        }
        return $sponsor;
        
    }

}
