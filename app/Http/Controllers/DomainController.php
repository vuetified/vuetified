<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DomainController extends Controller
{
    public function sponsor($username)
    {
        if(!request()->cookie('sponsor')){
            \Cookie::queue(\Cookie::make('sponsor', $username->id));
         }
        return view('app')->withCookie(cookie('sponsor', $username));
    }

    public function app()
    {
        // Default Sponsor
        if(!request()->cookie('sponsor')){
        \Cookie::queue(\Cookie::make('sponsor', \Vuetified::user()->first()->id));
        }
        return view('app');
    }
}
