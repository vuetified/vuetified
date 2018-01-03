<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckMeOutTrait;
use GuzzleHttp\RequestOptions;
use App\CheckMeOut;
class CheckMeOutController extends Controller
{
    use CheckMeOutTrait;
    /**
     * Add Check me Out Access Token to CheckMeOut Model
     *
     * @return mixed
     */
    public function login(Request $request)
    {
        $this->addOption([
            // GuzzleHttp\RequestOptions::JSON => ['email' => $request->email, 'password' => $request->password]
            RequestOptions::JSON => ['email' => $request->email, 'password' => $request->password]
        ]);
        $data = $this->checkmeout('POST','/auth/login');
        $checkmeout = CheckMeOut::findOrCreate($data);
        if($checkmeout->token){
        return response()->json(['checkmeout' => $checkmeout,'message' => 'Checkmeout Account Authenticated'],200);
            
        }else{
            return response()->json(['message' => 'Failed To Authenticate Checkmeout Account']);
        }
    }

    public function getProducts(Request $request)
    {
        
        $this->setToken($request);

        $data = $this->checkmeout('GET','/products');
        return $data;
    }


}
