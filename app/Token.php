<?php

namespace App;

use Laravel\Passport\Token as Model;

class Token extends Model
{
    protected $table = 'oauth_access_tokens';
}