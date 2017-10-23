<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Gateway;
use App\Courier;
use Cart;

class OrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function create(Request $request)
    {
        
        $order = new Order();
        $order->user_id = optional($request->user())->id;
        $order->cart = json_encode($request->cart);
        $order->customer_details = json_encode($request->customer_details);
        $order->shipping_details =json_encode($request->shipping_details);
        $mop = new $request->mop['model'];
        $mop->gateway_id = $request->mop['id'];
        $mop->amount = $request->cart['total'];
        $mop->save();
        $mop->payments()->save($order);
        $courier = new $request->courier['model'];
        $courier->courier_id = $request->courier['id'];
        if($request->has('shipping_fee')){
        $courier->shipping_fee = $request->shipping_fee;
        }
        $courier->save();
        $courier->shipments()->save($order);

        Cart::destroy();

        return response()->json([
            // 'order' => $order,
            // 'mop' => $mop,
            'message' => 'Order Placed!'
        ],200);
    }
}