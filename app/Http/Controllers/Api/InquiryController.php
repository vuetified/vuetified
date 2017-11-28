<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Mail\InquirySent;
use App\User;

class InquiryController extends Controller
{
    public function inquiry(Request $request)
    {
        $data = request()->validate([
            'name' => [
                'required',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'email' => [
                'required',
                'email'
            ],
            'contact_no' => [
                'present',
                'regex:/^\+?\d+$/'
            ],
            'subject' => [
                'required'
            ],
            'message' => [
                'required'
            ],
        ]);
        $user = User::find(request()->sponsor_id);
        if($user){
            \Mail::to($user)
            ->queue(new InquirySent($data));
            return response()->json(['message' => 'Mail Sent!'],200);
        }else{
            return response()->json(['message' => 'Failed To Send Message'],400);
        }
        
    }
}
