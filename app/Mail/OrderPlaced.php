<?php

namespace App\Mail;

use App\Gateway;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class OrderPlaced extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $gateway;
    public $items;
    public $tax;
    public $total;
    public $subtotal;
    public $shipping_fee;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Gateway $gateway,$items,$tax,$total,$subtotal,$shipping_fee)
    {
        $this->gateway = $gateway;
        $this->items = $items;
        $this->tax = $tax;
        $this->total = $total;
        $this->subtotal = $subtotal;
        $this->shipping_fee = $shipping_fee;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.orders.placed')->with([
            'gateway' => $this->gateway,
            'items' => $this->items,
            'subtotal' => $this->subtotal,
            'tax' => $this->tax,
            'total' => $this->total,
            'shippping_fee' => $this->shipping_fee,
        ]);
    }
}
