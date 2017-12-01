<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Gateway;
use App\Courier;

class GatewayController extends Controller
{
    public function getGateways(){
        return  Gateway::all();
    }

    public function getCouriers(){
        return  Courier::all();
    }
}
