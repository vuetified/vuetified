<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use App\Link;
use App\Profile;
use App\CheckMeOut;
use App\Rules\CheckSponsor;
use Illuminate\Http\Request;
use Laravel\Passport\Client;
use App\Traits\IssueTokenTrait;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;

class RegisterController extends Controller
{
    use IssueTokenTrait;

	private $client;

	public function __construct(){
		$this->client = Client::first();
	}

    public function register(Request $request)
	{
		/* validate request input */
		request()->validate([
			'name' => 'required',
    		'username' => 'required|email',
    		'password' => 'required|min:6|confirmed',
			'password_confirmation' => 'required',
			'role' => [
				'sometimes',
				'required',
				'exists:roles,name'
			],
			'sponsor' => [
				'sometimes',
				'required',
				/* will check for userid if correct */
				new CheckSponsor
			]
		]);
	    /* create user account */
    	$user = User::create([
			'name' => request('name'),
    		'email' => request('username'),
    		'password' => request('password')
		]);

		/* create an empty profile */
		$profile = new Profile();
		$user->profile()->save($profile);

		/* attach specific role */
		if ($request->has('role')) {
			$user->assignRole(request('role'));
		}
		/* attach default role */
		else {
			$user->assignRole('customer');
		}
		/* create a new link for this account */
		$link = new Link();
		$link->link = $user->username;
		$user->referralLink()->save($link);

		$checkmeout = new CheckMeOut;
		$user->checkmeout()->save($checkmeout);
		/* issue new access_token */
    	return $this->issueToken($request, 'password');
    }
}