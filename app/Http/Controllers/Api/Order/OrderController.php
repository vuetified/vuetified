<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Courier;
use Cart;
use App\Mail\OrderPlaced;

class OrderController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api');
    }
    public function create(Request $request)
    {
        $this->isGatewayValid($request);
        /* create new Order */
        $order = $this->addOrder($request);
        /* create new Payment */
        $this->newPayment($request,$order);
        /* create new Courier */
        $this->newShipment($request,$order);
        /* load order relationships */
        $order->load('user','shipment.courier','payment.gateway');
        /* Destroy Cart */
        Cart::destroy();
        \Mail::to($request->user())
        ->queue(new OrderPlaced($order));
        return response()->json([
            'message' => 'Order Placed!'
        ],200);
    }

    private function isGatewayValid(Request $request)
    {
        $gateway = Gateway::find($request->mop['id']);
        if(!$gateway){
            return response()->json([
                'message' => 'Cant Find Payment Gateway Provided!'
            ],400);
        }

    }

    private function addOrder(Request $request)
    {
        $order = new Order();
        $order->user_id = optional($request->user())->id;
        $order->cart = json_encode($request->cart);
        $order->customer_details = json_encode($request->customer_details);
        if($request->has('shipping_details')){
            $order->shipping_details =json_encode($request->shipping_details);
        }
        return $order;
    }

    private function newPayment(Request $request, $order)
    {
        $mop = new $request->mop['model'];
        $mop->gateway_id = $request->mop['id'];
        $mop->amount = $request->cart['total'];
        $mop->save();
        $mop->payments()->save($order);
    }

    private function newShipment(Request $request, $order)
    {
        $courier = Courier::find($request->courier['id']);
        $shipment = new $request->courier['model'];
        $shipment->courier_id = optional($courier)->id;
        $shipment->shipping_fee = $courier->details['rate'];
        $shipment->save();
        $shipment->shipments()->save($order);
    }
}