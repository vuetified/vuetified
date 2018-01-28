<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckMeOutTrait;
use GuzzleHttp\RequestOptions;
use App\CheckMeOut;
use App\Exceptions\UserTokenNotFound;
use App\Product;
use App\Exceptions\CheckMeOutNotAuthorized;
use App\User;

class CheckMeOutController extends Controller
{
    use CheckMeOutTrait;
    /**
     * Add Check me Out Access Token to CheckMeOut Model
     *
     * @return mixed
     */
    //! NOT BEING USED!!!!
    public function login(Request $request)
    {
        $this->addOption([
            // GuzzleHttp\RequestOptions::JSON => ['email' => $request->email, 'password' => $request->password]
            RequestOptions::JSON => ['email' => $request->email, 'password' => $request->password]
        ]);
        $data = $this->checkmeout('POST','/auth/login');
        if(!$data){
            throw new CheckMeOutNotAuthorized;
        }
        $checkmeout = CheckMeOut::findOrCreate($data);
        return response()->json(['checkmeout' => $checkmeout, 'message' => 'Checkmeout Account Authenticated'],200);
       
    }

    public function getProducts(Request $request)
    {
        
        $this->setToken($request);

        $data = $this->checkmeout('GET','/products');
        return $data;
    }

    public function getReceptacles()
    {
        $data = $this->checkmeout('GET','/receptacles');
        return $data;
        $receptacles = [];
        foreach($data as $key => $value){
            $receptacles[] = ['id' => $data[$key]['id'], 'name' => $data[$key]['name'],'dimension' => $data[$key]['short_description']];
        }
        
        return $receptacles;
    }
    //! NOT BEING USED !!!!
    public function addItem($sponsor = null,Request $request)
    {
        //! Fetch Correct Config Keys
        $this->getConfigKeys($sponsor);
        //! add logic to determine what type of receptacles we will use
        $receptacles =  $this->getReceptacles();
        $this->setToken($request);
        //! maybe we can sign our own jwt token here instead of needing user access token to get the stored access_token
        $product = Product::find($request->product_id);

        $this->addOption([
            RequestOptions::MULTIPART => 
            [
                [
                    'name'     => 'product_photo',
                    'contents' => fopen(public_path($product->image), 'r')
                ],
                [
                    'name' => 'name',
                    'contents' => $product->name // we should better use here a referral link or site link 
                    // like shop.test orders
                ],
                [
                    'name' => 'amount',
                    'contents' => $product->price // this should be the subtotal
                ],
                [
                    'name' => 'stock_quantity', // we only need 1
                    'contents' => 1
                ],
                [
                    'name' => 'receptacle',
                    'contents' => $large // computed receptacle size to use
                ],
                [
                    'name' => 'description',
                    'contents' => $product->description // cart items , try use </br> to separate each item
                ],
            ]
            
        ]);
        $data = $this->checkmeout('POST','/products');

        return $data;
    }
    //! CHECKOUT OR CHECKMEOUT
    public function addItems($sponsor = null,Request $request)
    {
        //! Fetch Correct Config Keys
        $this->getConfigKeys($sponsor);
        $str = $request->subtotal;
        $subtotal = (double)filter_var($str, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        
        $image = '';
        
        $name = '';

        $description = '';
        
        $ids = $request->products;
        if(count($ids) < 2){
            $product = Product::find($ids[0]);
            $image = $product->image;
            $name = $product->name;
            $description = strip_tags(mb_strimwidth($product->description, 0, 250, "..."));
            $description = $description ? $description : $product->name;
        }
        else {
            $products =  Product::findMany($ids);
            $name = 'Collection Of Product';
            $image = '/img/checkout.png';
            $description = '';
            foreach(\Cart::content() as $row) {
                $description .= ' '.'('.$row->qty.')'.' ' . $row->name . ' ';
            }

        }
        $this->setToken($request);
        $this->addOption([
            RequestOptions::MULTIPART => 
            [
                [
                    'name'     => 'product_photo',
                    'contents' => fopen(public_path($image), 'r')
                ],
                [
                    'name' => 'name',
                    'contents' => $name // we should better use here a referral link or site link 
                    // like shop.test orders
                ],
                [
                    'name' => 'amount',
                    'contents' => $subtotal // this should be the subtotal
                ],
                [
                    'name' => 'stock_quantity', // we only need 1
                    'contents' => 1
                ],
                [
                    'name' => 'receptacle',
                    'contents' => $request->receptacle // computed receptacle size to use
                ],
                [
                    'name' => 'description',
                    'contents' => $description // cart items , try use </br> to separate each item
                ],
            ]
            
        ]);
        $data = $this->checkmeout('POST','/products');
        return 'https://www.checkmeout.ph/I/'.$data['slug'];
    }

    public function fetchKeys(Request $request)
    {
        $user = $request->user();
        if(!$user){
            throw new UserTokenNotFound;
        }
        return $user->checkmeout;
    }

    public function addKeys(Request $request)
    {
        $user = $request->user();
        if(!$user){
            throw new UserTokenNotFound;
        }
        $checkmeout = $user->checkmeout;
        if(!$checkmeout){
            //! Create a New CheckmeOut Model
            $checkmeout = new CheckMeOut;
            $checkmeout->user_id = $user->id;
            //! we either add another field call checkmeout_id
            //! remove incrementing false
            $checkmeout->id = null;
            $checkmeout->api_key = $request->api_key;
            $checkmeout->secret_key = $request->secret_key;
            $checkmeout->save();
            return response()->json([
                'message' => 'CheckMeOut Api Keys Created!',
                'user_id' => $user->id,
                'api_key' => $checkmeout->api_key,
                'secret_key' => $checkmeout->secret_key
                ]);
        }else{
            //! Update CheckMeOut Keys
            $checkmeout->api_key = $request->api_key;
            $checkmeout->secret_key = $request->secret_key;
            $checkmeout->save();
            return response()->json([
                'message' => 'CheckMeOut Api Keys Saved!',
                'user_id' => $user->id,
                'api_key' => $checkmeout->api_key,
                'secret_key' => $checkmeout->secret_key
            ]);
        }
        
    }


}
