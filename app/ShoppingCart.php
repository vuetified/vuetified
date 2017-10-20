<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ShoppingCart extends Model
{
    protected $table = 'shoppingcart';

    public static function deleteCartRecord($identifier, $instance = 'default')
    {
        $cart = self::where('identifier' , $identifier)->where('instance', $instance);
        $cart->delete();
    }
    // ShoppingCart::deleteCartRecord($identifier, 'default');
    // Our Identifier Should be Order ID or Auth ID
    // If Authenticated We Should Use User ID if not , we Should Use Randor Hash ID
    // With Cart Save On DB , WE Dont Need to Rely on Session Anymore
    // But We Need the Identifier Save in the Local Storage (Current Order)
}
