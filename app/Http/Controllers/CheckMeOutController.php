<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Traits\CheckMeOutTrait;
use GuzzleHttp\RequestOptions;
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
        return $data;
    }
}
