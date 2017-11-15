<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Exceptions\OrderArchive;

class OrderDetailsConstroller extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','can:update,order']);
    }

    public function updateCustomerDetails(Order $order,Request $request)
    {
        $this->isMarkDone($order);

        $order->customer_details = json_encode($request->customer_details);

        $order->save();

        return response()->json([
            'message' => 'Order #'.$order->id.' Updated: Customer Details'
            ],200);
    }

    public function updateShippingDetails(Order $order,Request $request)
    {
        $this->isMarkDone($order);

        $order->shipping_details = json_encode($request->shipping_details);

        $order->save();

        return response()->json([
            'message' => 'Order #'.$order->id.' Updated: Shipping Details'
            ],200);
    }

    public function updatePaymentDetails(Order $order,Request $request)
    {
        $this->isMarkDone($order);
        $gateway = $order->payment;
        if($gateway){
            $gateway->transaction_no = $request->transaction_no;
            $gateway->account_name = $request->account_name;
            $gateway->account_no = $request->account_no;
            $gateway->amount = $request->amount;
            $gateway->currency = $request->currency;
            $gateway->date_paid = $request->date_paid;
            $gateway->save();
            return response()->json([
                'message' => 'Order #'.$order->id.' Updated: Payment Details'
                ],200);
        }else {
            return response()->json([
                'message' => 'Order #'.$order->id.' Failed To Update: No Payment Model Associated!'
                ],200);
        }
        
    }

    public function updateShipmentDetails(Order $order,Request $request)
    {
        $this->isMarkDone($order);
        $shipment = $order->shipment;
        if($shipment){
            $shipment->tracking_no = $request->tracking_no;
            $shipment->sent = $request->sent;
            $shipment->date_sent = $request->date_sent;
            $shipment->received = $request->received;
            $shipment->date_received = $request->date_received;
            $shipment->save();
            return response()->json([
                'message' => 'Order #'.$order->id.' Updated: Shipment Details'
                ],200);
        }else{
            return response()->json([
                'message' => 'Order #'.$order->id.' Failed To Update: No Shipment Model Associated!'
                ],400);
        }
        
    }

    private function isMarkDone($order)
    {
        if($order && $order->done){
            throw new OrderArchive;
        }
    }
}
