<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Cviebrock\EloquentSluggable\Sluggable;
use Spatie\Permission\Traits\HasRoles;
use Laravel\Passport\HasApiTokens;
use App\Traits\UserMutator;
use App\Traits\GenerateUniqueID;
use App\Notifications\PasswordResetNotification;

class User extends Authenticatable
{
    use HasApiTokens,Notifiable, Sluggable, UserMutator, HasRoles, GenerateUniqueID;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    public $incrementing = false;

    public function getRouteKeyName()
    {
        return 'id';
    }
    
    protected $fillable = [
        'name', 'email', 'password', 'username'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $dates = ['created_at', 'updated_at'];

    public function sluggable()
    {
        return [
            'username' => [
                'source' => 'name'
            ]
        ];
    }

    public function reservedSlugs()
    {
        return ['admin', 'support', 'api', 'administrator','helpdesk','customer-support','forum','blog','shop','billing','products','category', 'categories'];
    }
    // Override the Built In PasswordResetNotification by Laravel
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordResetNotification($token));
    }

}
