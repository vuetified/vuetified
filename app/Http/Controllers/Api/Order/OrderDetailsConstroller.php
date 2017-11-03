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
        $this->isMarkDone($request,$order);

        $order->customer_details = json_encode($request->customer_details);

        $order->save();

        return response()->json([
            'message' => 'Order #'.$order->id.' Updated: Customer Details'
            ],200);
    }

    public function updateShippingDetails(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);

        $order->shipping_details = json_encode($request->shipping_details);

        $order->save();

        return response()->json([
            'message' => 'Order #'.$order->id.' Updated: Shipping Details'
            ],200);
    }

    public function updatePaymentDetails(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
        $gateway = $order->payment;
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
    }

    private function isMarkDone(Request $request,$order)
    {
        if($order && $order->done){
            throw new OrderArchive;
        }
    }
}