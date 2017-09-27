<?php

namespace App\Traits;

use Keygen\Keygen;
use App\Link;
use App\SocialAccount;
use App\Profile;
use Illuminate\Support\Str;

trait UserMutator
{
    public function setEmailAttribute($email)
    {
        $this->attributes['email'] = $email;
    }
    public function setUsernameAttribute($username)
    {
        // Make Username Lowercase plus Use Underscore on spaces
        $this->attributes['username'] = strtolower(str_replace(' ', '_', $username));
    }

    public function getPhotoUrlAttribute($value)
    {
        return empty($value) ? 'https://www.gravatar.com/avatar/'.md5(Str::lower($this->email)).'.jpg?s=200&d=mm' : url($value);
    }

    public function setPasswordAttribute($password)
    {
        $this->attributes['password'] = bcrypt($password);
    }

    public static function findByUsername($username)
    {
        return self::whereUsername($username)->first();
    }

    public static function findByEmail($email)
    {
        return self::whereEmail($email)->first();
    }

    public function scopeWhereCan($query, $ability)
    {
    $query->where(function ($query) use ($ability) {
        // direct
        $query->whereHas('abilities', function ($query) use ($ability) {
            $query->byName($ability);
        });
        // through roles
        $query->orWhereHas('roles', function ($query) use ($ability) {
             $query->whereHas('abilities', function ($query) use ($ability) {
                 $query->byName($ability);
             });
         });
     });
    }

    public function findForPassport($identifier) {
        return $this->orWhere('email', $identifier)->orWhere('username', $identifier)->first();
    }

    public function socialAccounts()
    {
        return $this->hasMany(SocialAccount::class);
    }

    public function referralLink()
    {
        return $this->hasOne(Link::class);
    }

    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function isAdmin()
    {
        return $this->hasRole('admin');
    }

    public function isCustomer()
    {
        return $this->hasRole('customer');
    }

    public function isMerchant()
    {
        return $this->hasRole('merchant');
    }

    public function isReseller()
    {
        return $this->hasRole('reseller');
    }
}