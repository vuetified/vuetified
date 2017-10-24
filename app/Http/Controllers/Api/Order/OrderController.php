<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
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
        /* create new Order */
        $order = new Order();
        $order->user_id = optional($request->user())->id;
        $order->cart = json_encode($request->cart);
        $order->customer_details = json_encode($request->customer_details);
        if($request->has('shipping_details')){
            $order->shipping_details =json_encode($request->shipping_details);
        }
        /* create new Payment */
        $mop = new $request->mop['model'];
        $mop->gateway_id = $request->mop['id'];
        $mop->amount = $request->cart['total'];
        $mop->save();
        $mop->payments()->save($order);
        /* create new Courier */
        $courier = Courier::find($request->courier['id']);
        $shipment = new $request->courier['model'];
        $shipment->courier_id = optional($courier)->id;
        $shipment->shipping_fee = $courier->details['rate'];
        $shipment->save();
        $shipment->shipments()->save($order);
        /* Destroy Cart */
        Cart::destroy();

        return response()->json([
            'message' => 'Order Placed!'
        ],200);
    }
}