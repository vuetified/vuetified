<?php

namespace App\Http\Controllers\Api\Order;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Exceptions\OrderNotFound;
use App\Exceptions\OrderDone;

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

    public function toggleSent(Request $request)
    {
        $order = $this->checkOrder($request);
        $this->isMarkDone($request,$order);
        $message = 'On-Hold';
        $gateway = $order->payment;
        $courier = $order->shipment;
        if($gateway->paid){
            $courier->sent = $request->toggle;
            $courier->save();
            
            if($courier->sent){
                $message = 'Sent';
            }
            return response()->json([
                'message' => 'Order #'.$order->id.' Status: '.$message
                ],200);
        }else {
            $message = 'Confirm Order Payment First!';
            return response()->json([
                'message' => $message
                ],400);
        }
        

    }
    
    public function toggleReceived(Request $request)
    {
        $order = $this->checkOrder($request);
        $message = 'Pending';
        $this->isMarkDone($request,$order);
        $courier = $order->shipment;
        if($courier->sent){
            $courier = $order->shipment;
            $courier->received = $request->toggle;
            $courier->save();
            if($courier->received){
                $message = 'Received';
            }
            return response()->json([
                'message' => 'Order #'.$order->id.' Status: '.$message
                ],200);
        }else {
            $message = 'Order Not Yet Sent!';
            return response()->json([
                'message' => $message
                ],400);
        }

    }

    public function toggleDone(Request $request)
    {
        $order = $this->checkOrder($request);
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


    private function checkOrder(Request $request)
    {
        $order = Order::find($request->order);
        if(!$order){
            throw new OrderNotFound;
        }
        return $order;
    }

    private function isMarkDone(Request $request,$order)
    {
        if($order && $order->done){
            throw new OrderDone;
        }
    }
}
