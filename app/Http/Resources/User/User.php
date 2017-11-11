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
            'contact_details' => json_decode($this->contact_details,true),
            'social_links' => json_decode($this->social_links,true),
            'profile' => $this->when($this->profile,[
                'first_name' => $this->when($this->profile, optional($this->profile)->first_name),
                'last_name' => $this->when($this->profile, optional($this->profile)->last_name),
                'contact_no' => $this->when($this->profile, optional($this->profile)->contact_no),
                'address_1' => $this->when($this->profile, optional($this->profile)->address_1),
                'address_2' => $this->when($this->profile, optional($this->profile)->address_2),
                'city' => $this->when($this->profile, optional($this->profile)->city),
                'country' => $this->when($this->profile, optional($this->profile)->country),
                'zip_code' => $this->when($this->profile, optional($this->profile)->zip_code),
                'state_province' => $this->when($this->profile, optional($this->profile)->state_province),
            ]),
            'referral_link' => $this->when($this->referralLink,[
                'id' => $this->when($this->referralLink, optional($this->referralLink)->id),
                'link' => $this->when($this->referralLink, optional($this->referralLink)->link),
                'active' => $this->when($this->referralLink, optional($this->referralLink)->active),
                'sp_link_id' => $this->when($this->referralLink, optional($this->referralLink)->sp_link_id),
                'sp_user_id' => $this->when($this->referralLink, optional($this->referralLink)->sp_user_id),
            ]),
            /* override user roles attribute from Spatie */
            'roles' => $this->when($this->roles, $this->getRoleNames()),
            /* override user permissions attribute from Spatie */
            'permissions' => $this->all_permissions,
            'can' => $this->can,
            /* Load The Role For Specific User Conditionally (UserMutator) */
            'isAdmin' => $this->when($this->isAdmin(), true),
            'isCustomer' => $this->when($this->isCustomer(), true),
            'isMerchant' => $this->when($this->isMerchant(), true),
            'isReseller' => $this->when($this->isReseller(), true),
        ];
    }
}
