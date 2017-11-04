<?php

namespace App\Http\Controllers\Api\Media;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Order;

class ReceiptUploadController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth:api']);
    }

    public function upload(Order $order, Request $request)
    {
        $payment = $order->payment;
        // return $path;
        $payment->addMediaFromRequest('file')
        ->preservingOriginal()
        ->toMediaCollection('receipts', 'local');

        // $payment->getMedia('receipts')->first()
            // ->getPath()
            // getUrl()
        // $payment->getFirstMedia('receipts')
            // getUrl() // this will get the original image
            // getUrl('thumb')
        // $payment->getFirstMediaUrl('receipts', 'thumb')
        return $payment->getMedia();
    }
}
