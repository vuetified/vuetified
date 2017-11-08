<?php

namespace App\Mail;

use App\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderPlaced extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $order;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $cart = json_decode($this->order->cart,true);
        return $this->markdown('emails.orders.placed')->with([
            'gateway' => $this->order->payment->gateway,
            'items' => $cart['items'],
            'subtotal' => $cart['subtotal'],
            'tax' => $cart['tax'],
            'total' => $cart['total'],
            'net_total' => $this->getNetTotal($cart['tax'],$cart['subtotal'],optional($this->order->shipment)->shipping_fee),
            'shipping_fee' => optional($this->order->shipment)->shipping_fee,
            'courier' => optional($this->order->shipment)->courier,
            'payment_type' => str_after($this->order->payment_type, 'App\\Payment\\'),
            'currency' => $this->order->payment->currency
        ]);
    }

    private function getFloat($val)
    {
        return floatval(str_replace( ',', '', $val ));
    }

    private function getNetTotal($tax,$subtotal,$fee)
    {
        return number_format($this->getFloat($tax) + $this->getFloat($subtotal) + $this->getFloat($fee));
    }
}
