<?php 

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Traits\GenerateUniqueID;

class CheckMeOut extends Model
{
    use GenerateUniqueID;

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
        $checkmeout =self::find($data['id']);
        if(!$checkmeout){
            $checkmeout = new static;
            $checkmeout->id = $data['id'];
            $checkmeout->token = $data['token'];
            if(optional(request()->user())->id){
                $checkmeout->user_id = request()->user()->id;
                $checkmeout->save();
            }
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