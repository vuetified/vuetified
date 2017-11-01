<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Exceptions\OrderDone;

class OrderDetailsConstroller extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','can:update,order']);
    }

    public function updateCustomerDetails(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);  
    }

    public function updateShippingDetails(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
    }

    public function updatePaymentDetails(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
    }

    private function isMarkDone(Request $request,$order)
    {
        if($order && $order->done){
            throw new OrderDone;
        }
    }
}
