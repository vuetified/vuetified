<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;

class ToggleOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function togglePaid(Request $request)
    {
       // check if own the order or you are admin
       $order = $this->checkOrder($request);
       $gateway = $order->payment;
       $gateway->paid = $request->toggle;
       $gateway->save();
       $message = 'Unpaid';
       if($gateway->paid){
           $message = 'Paid';
       }
       return response()->json([
        'message' => 'Order #'.$order->id.' Status: '.$message
        ],200);
    }

    public function toggleSent(Request $request)
    {
        $order = $this->checkOrder($request);
        $courier = $order->shipment;
        $courier->sent = $request->toggle;
        $courier->save();
        $message = 'On-Hold';
        if($courier->sent){
            $message = 'Sent';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);

    }
    
    public function toggleReceived(Request $request)
    {
        $order = $this->checkOrder($request);
        $courier = $order->shipment;
        $courier->received = $request->toggle;
        $courier->save();
        $message = 'Pending';
        if($courier->sent){
            $message = 'Received';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);

    }

    public function toggleDone(Request $request)
    {
        $order = $this->checkOrder($request);
        $order->done = $request->toggle;
        $order->save();
        $message = 'On-Progress';
        if($order->done){
            $message = 'Completed';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);
    }

    private function checkOrder(Request $request)
    {
        $order = Order::find($request->order);
        if(!$order){
            return response()->json([
                'message' => 'Order with ID: '.$request->order.' Not Found!'
            ],400);
        }
        return $order;
    }
}
