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
    /* Has Roles when using toArray() returns permissions and roles attributes */
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

    /* For Vue Authorization (Inside UserMutator) */
    protected $appends = ['all_permissions','can'];

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

    public function orders() 
    {
        return $this->hasMany(Order::class);
    }


    public function sponsor()
    {
        return $this->belongsTo(User::class, 'sp_id');
    }

    public function referrals()
    {
        return $this->hasMany(User::class, 'sp_id');
    }

    public static function last()
    {
        return self::latest()->first();
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            /* Our Default Referral Link if No Cookie Is Present */
            $user->sp_id = optional(User::first())->id;
            /* change this */
            $sponsorID = \Cookie::get('sponsor');
            
            /* if cookie is present */
            if ($sponsorID) {
                $sponsor = User::find($sponsorID);
                $user->sp_id = $sponsor->id;
            }
            /* override cookie with current request */
            if($sponsorID = request()->sponsor_id){
                $sponsor = User::find($sponsorID);
                $user->sp_id = $sponsor->id;
            }

        });
    }

}
