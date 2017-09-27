<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\Resource;
use App\Role;

class User extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'username' => $this->username,
            'email' => $this->email,
            'photo_url' => $this->photo_url,
            'profile' => $this->when($this->profile,[
                'first_name' => $this->when($this->profile, optional($this->profile)->first_name),
                'last_name' => $this->when($this->profile, optional($this->profile)->last_name),
                'profile_pic' => $this->when($this->profile, optional($this->profile)->profile_pic),
                'about_me' => $this->when($this->profile, optional($this->profile)->about_me),
                'location' => $this->when($this->profile, optional($this->profile)->location),
            ]),
            'referral_link' => $this->when($this->referralLink,[
                'id' => $this->when($this->referralLink, optional($this->referralLink)->id),
                'link' => $this->when($this->referralLink, optional($this->referralLink)->link),
                'active' => $this->when($this->referralLink, optional($this->referralLink)->active),
                'sp_link_id' => $this->when($this->referralLink, optional($this->referralLink)->sp_link_id),
                'sp_user_id' => $this->when($this->referralLink, optional($this->referralLink)->sp_user_id),
            ]),
            'roles' => $this->when($this->hasAnyRole(Role::all()), $this->getRoleNames()),
            'permissions' => $this->getAllPermissions()->pluck('name')->toArray(),
            /* Load The Role For Specific User Conditionally */
            'isAdmin' => $this->when($this->isAdmin(), true),
            'isCustomer' => $this->when($this->isCustomer(), true),
            'isMerchant' => $this->when($this->isMerchant(), true),
            'isReseller' => $this->when($this->isReseller(), true),
        ];
    }
}
