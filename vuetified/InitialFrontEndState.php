<?php

namespace Vuetified;

use Vuetified\Contracts\InitialFrontendState as Contract;
use Cart;

class InitialFrontendState implements Contract
{

    public function forUser($user)
    {
        return $this->getData();
    }

    public function getCart()
    {
        $items = Cart::content();
        // cartItem $row->id , $row->qty , $row->name, $row->price, $row->options 
        // or $row->model->[product_attributes]
        $tax = Cart::tax();
        $total = Cart::total();
        $subtotal = Cart::subtotal();
        $count = Cart::content()->count();

        return [
                'items' => $items, 
                'tax' => $tax,
                'subtotal' => $subtotal,
                'total' => $total,
                'count' => $count
                ];
    }

    private function getData() {
        
        $data = array_merge(array(),['user' => auth()->user()]);
        // Merge Some More Data If Needed
        return $data;
    }
}
