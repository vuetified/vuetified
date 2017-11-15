<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\Resource;
use App\Role;
use App\Http\Resources\User\Sponsor as SponsorResource;
use App\Http\Resources\User\Link as LinkResource;
use App\Http\Resources\User\Profile as ProfileResource;

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
            /* list all contact info the user has (publicly available) in homepage */
            'contact_details' => json_decode($this->contact_details,true),
            /* list all social links the user has (publicly available) in homepage */
            'social_links' => json_decode($this->social_links,true),
            /* load the user profile that will be use as default for payment and shipment */
            'profile' => new ProfileResource($this->whenLoaded('profile')),
            /* load referral link details */
            'referral_link' => new LinkResource($this->whenLoaded('referralLink')),
            /* load sponsor and link details */
            'sponsor' =>  new SponsorResource($this->whenLoaded('sponsor')),
            /* list all roles */
            'roles' => $this->when($this->roles, $this->getRoleNames()),
            /* list all users inherited permissions from any role */
            'permissions' => $this->all_permissions,
            /* list all granted permissions to a user */
            /* use mainly in our vue auth permission check */
            'can' => $this->can,
            /* specific role check */
            /* use mainly in our vue auth role check */
            'isAdmin' => $this->when($this->isAdmin(), true),
            'isCustomer' => $this->when($this->isCustomer(), true),
            'isMerchant' => $this->when($this->isMerchant(), true),
            'isReseller' => $this->when($this->isReseller(), true),
        ];
    }
}
