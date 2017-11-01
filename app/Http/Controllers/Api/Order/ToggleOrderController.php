<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Exceptions\OrderDone;

class ToggleOrderController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','can:update,order']);
    }

    public function togglePaid(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
        $message = 'Unpaid';
        $gateway = $order->payment;
        $gateway->paid = $request->toggle;
        $gateway->save();
        if($gateway->paid){
           $message = 'Paid';
        }
        return response()->json([
        'message' => 'Order #'.$order->id.' Status: '.$message
        ],200);
        
    }

    public function toggleSent(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
        $message = 'On-Hold';
        $gateway = $order->payment;
        $courier = $order->shipment;
        $courier->sent = $request->toggle;
        $courier->save();
        
        if($courier->sent){
            $message = 'Sent';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);
        
    }
    
    public function toggleReceived(Order $order,Request $request)
    {
        $this->isMarkDone($request,$order);
        $message = 'Pending';
        $courier = $order->shipment;
        $courier = $order->shipment;
        $courier->received = $request->toggle;
        $courier->save();
        if($courier->received){
            $message = 'Received';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);
        $message = 'Order Not Yet Sent!';
        return response()->json([
            'message' => $message
            ],400);
    }

    public function toggleDone(Order $order,Request $request)
    {
        $message = 'On-Progress';
        $order->done = $request->toggle;
        $order->save();
        if($order->done){
            $message = 'Completed';
        }
        return response()->json([
            'message' => 'Order #'.$order->id.' Status: '.$message
            ],200);
    }

    private function isMarkDone(Request $request,$order)
    {
        if($order && $order->done){
            throw new OrderDone;
        }
    }
}
