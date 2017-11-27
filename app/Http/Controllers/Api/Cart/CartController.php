<?php

namespace App\Http\Controllers\Api\Cart;

use Cart;
use App\Product;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    // form input sky, qty
    public function add(Request $request)
    {
        $product = Product::find($request->id);
        $cart = [];
        $cart['id'] = $product->id;
        $cart['name'] = $product->name;
        if($request->has('qty')){
            $cart['qty'] = $request->qty;
        }
        $cart['price'] = $product->price;
        if($request->has('options')){
            $cart['options'] = $request->options;
        }
        $cartItem = Cart::add($cart);
        
        // $cartItem->associate('Product');

        $items = Cart::content();
        // cartItem $row->id , $row->qty , $row->name, $row->price, $row->options 
        // or $row->model->[product_attributes]
        $tax = Cart::tax();
        $total = Cart::total();
        $subtotal = Cart::subtotal();
        $count = Cart::content()->count();
        
        return response()->json([
            'cart' => 
                    [
                    'items' => $items, 
                    'tax' => $tax,
                    'subtotal' => $subtotal,
                    'total' => $total,
                    'count' => $count,
                    'item' => $cartItem
                    ],
            'message' => 'Product Added To Cart'
        ],200);
    }

    // form input row->id , qty
    public function update(Request $request)
    {
        $cartItem = Cart::update($request->rowId, $request->qty);

        // Access in front end $row->qty , $row->model->name, $row->model->price
        $items = Cart::content(); 
        $tax = Cart::tax();
        $total = Cart::total();
        $subtotal = Cart::subtotal();
        $count = Cart::content()->count();

        return response()->json([
            'cart' => 
                    [
                    'items' => $items,
                    'tax' => $tax,
                    'subtotal' => $subtotal,
                    'total' => $total,
                    'count' => $count,
                    'item' => $cartItem
                    ],
            'message' => 'Product Qty Updated'
        ],200);

    }

    public function delete(Request $request)
    {
        $cartItem = Cart::remove($request->rowId);

        // Access in front end $row->qty , $row->model->name, $row->model->price
        $items = Cart::content(); 
        $tax = Cart::tax();
        $total = Cart::total();
        $subtotal = Cart::subtotal();
        $count = Cart::content()->count();

        return response()->json([
            'cart' => 
                    [
                    'items' => $items,
                    'tax' => $tax,
                    'subtotal' => $subtotal,
                    'total' => $total,
                    'count' => $count
                    ],
            'message' => 'Cart Item Deleted'
        ],200);
        
    }

    public function destroy()
    {
        Cart::destroy();
        // Access in front end $row->qty , $row->model->name, $row->model->price
        $items = Cart::content();
        $tax = Cart::tax();
        $total = Cart::total();
        $subtotal = Cart::subtotal();
        $count = Cart::content()->count();

        return response()->json([
            'cart' => 
                    [
                    'items' => $items,
                    'tax' => $tax,
                    'subtotal' => $subtotal,
                    'total' => $total,
                    'count' => $count
                    ],
            'message' => 'Cart was Emptied'
        ],200);
    }
}

// Create A Cart Store
// We Save the Cart In Local Storage and Persist it... 

// Note Needede Since we will persist the Cart in Local Storage

// Saving Cart Instance
// Cart::store('username'); where username is Id or username

// Restoring Cart Instance
//Cart::restore('username'); where username is Id or username