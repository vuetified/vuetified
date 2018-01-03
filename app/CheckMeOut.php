<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckMeOut extends Model 
{
    protected $table = 'check_me_out';

    public $incrementing = false;

    protected $fillable = [
        'user_id', 'id', 'token'
    ];

    protected $dates = ['created_at', 'updated_at'];
    /**
     * Save Access Token to the Database
     *
     * @param [Array] $data = ['id','token','user_id']
     * @return void
     */
    public static function saveToken($data)
    {
        $checkmeout = new static;
        $checkmeout->id = $data['id'];
        $checkmeout->token = $data['token'];
        $checkmeout->user_id = $data['user_id'];
        $checkmeout->save();
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function last()
    {
        return self::latest()->first();
    }
}