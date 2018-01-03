<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;

class CheckMeOut extends Model 
{
    protected $table = 'check_me_out';

    public $incrementing = false;

    protected $fillable = [
        'user_id', 'id', 'token', 'api_key', 'secret_key'
    ];

    protected $dates = ['created_at', 'updated_at'];
    /**
     * Save Access Token to the Database
     *
     * @param [Array] $data = ['id','token','user_id']
     * @return void
     */
    public static function findOrCreate($data)
    {
        $checkmeout = new static;
        $checkmeout = $checkmeout->find($data['id']);
        if(!$checkmeout){
            $checkmeout->id = $data['id'];
            $checkmeout->token = $data['token'];
            if(optional(request()->user())->id){
                $checkmeout->user_id = request()->user()->id;
            }
            return tap($checkmeout->save());
        }
        return $checkmeout;
        
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