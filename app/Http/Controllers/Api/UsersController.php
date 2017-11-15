<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\User;
use App\Http\Resources\User\User as UserResouce;
use App\Exceptions\UserTokenNotFound;
use App\Exceptions\UsernameNotFound;
use App\Exceptions\EmailNotFound;
use App\Http\Resources\User\UserCollection;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware(['role:admin'],['except' => ['me']]);
    }

    public function index(Request $request)
    {
        return new UserCollection(User::all()->load('profile','referralLink', 'roles', 'permissions', 'sponsor.referralLink')->paginate(10));
    }

    public function show($id)
    {
        $user = User::with('profile','referralLink', 'roles', 'permissions')->find($id);
        return new UserResouce($user);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        if(!$user){
            throw new UserTokenNotFound;
        }
        return new UserResouce($user->load('profile','referralLink', 'roles', 'permissions'));
    }

    public function findByUsername($username)
    {
        $user = User::findByUsername($username);
        if(!$user){
            throw new UsernameNotFound;
        }
        return new UserResouce($user->load('profile','referralLink', 'roles', 'permissions'));
    }

    public function findByEmail($email)
    {
        $user = User::findByEmail($email);
        if(!$user){
            throw new EmailNotFound;
        }
        return new UserResouce($user->load('profile','referralLink', 'roles', 'permissions'));
    }

    
}
