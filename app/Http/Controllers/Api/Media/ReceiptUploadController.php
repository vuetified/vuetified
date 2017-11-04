<?php

namespace App\Http\Controllers\Api\Media;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;
use App\Exceptions\OrderArchive;

class ReceiptUploadController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api','can:update,order']);
    }

    public function upload(Order $order, Request $request)
    {
        $this->isMarkDone($order);
        $file = $order->getMedia('receipts')->first();
        if(!$file){
            /* add new receipt */
            $order->getMedia('receipts');
            $order->addMediaFromRequest('file')
            ->preservingOriginal()
            ->toMediaCollection('receipts');
        }else {
            /* delete old receipt and replace with new one */
            $file->delete();
            $order->getMedia('receipts');
            $order->addMediaFromRequest('file')
            ->preservingOriginal()
            ->toMediaCollection('receipts');
        }
        $order = $order->fresh();
        $order->load(['shipment.courier', 'payment.gateway'])->toArray();
        return response()->json([
            'order' => $order,
            'message' => 'Receipt Uploaded'
        ],200);
    }

    private function isMarkDone($order)
    {
        if($order && $order->done){
            throw new OrderArchive;
        }
    }
}
