<?php 
declare(strict_types=1);

namespace App\Traits;

use Illuminate\Http\Request;
use App\Exceptions\UserTokenNotFound;
use GuzzleHttp\Client;
use App\User;

trait CheckMeOutTrait 
{
    public $client;
    public $options = [];
    public static $host = 'checkmeout.ph';
    public static $protocol ='https';
    public static $version = 'v1';
    public static $api='api';
    public static $based_url = 'https://api.checkmeout.ph/v1';
    public $api_key = null;
    public $secret_key = null;

    public function __construct(Client $client)
    {
        $this->client = $client;
    }
    /*
     * Make Api Call To Check Me Out function
     *
     * @param string $method
     * @param string $segment
     * @param array $options
     * @return array
     */
    public function checkmeout(string $method = 'GET', string $segment = '/') : array 
    {
        //! segment should start with trailing slash /
        if(strpos($segment,"/") === 0){
            $endpoint = $this->setEndpoint($segment);
        }else{
            $segment = '/'.$segment;
            $endpoint = $this->setEndpoint($segment);
        }
        
        $response = $this->client->request($method, $endpoint,$this->getOptions());
        $data = $response->getBody()->getContents();
        $data = json_decode($data,true);
        return $data;
    }

    public static function getBasedURL() : string
    {
        return self::$protocol . '://' . self::$api . '.' . self::$host . '/' . self::$version;
    }

    public function setEndpoint($segment) : string
    {
        return self::getBasedURL() . $segment;
    }
    private function __base64_encode_safe($data, $flag = true)
	{
		return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
	}
    private function _sign($header, $payload, $secret_key, $alg = 'HS256')
	{
		// Build the data to be signed.
		$data = $this->__base64_encode_safe( json_encode($header), true) . '.' . $this->__base64_encode_safe(json_encode($payload), true);
		
		// Sign it.
		switch (strtolower($alg)) {
			case 'hs256':
				$signature = $this->__base64_encode_safe(hash_hmac('sha256', $data, $secret_key, true), true);
				break;
			default:
				throw new \Exception('The requested hashing algorithm is not supported.', 401);
		}
		
		return $signature;
    }

    private function generateJWT()
	{
		$header = [
			'alg' => 'HS256',
			'typ' => 'JWT'
        ];
        
        $payload = [
			'iat' => time(),
			'sub' => $this->api_key//$user->checkmeout->api_key
        ];
        $signature = $this->_sign($header, $payload, $this->secret_key); // $user->checkmeout->secret_key
		
		return $this->__base64_encode_safe(json_encode($header), true) . '.' . $this->__base64_encode_safe(json_encode($payload), true) . '.' . $signature;
    }
    public function getConfigKeys($sponsor){
        $user = User::find(optional($sponsor)->user_id);
        $keys = [];
        //! If User Set Up His CheckMeOut Api Key and Secret Use it
        if(!is_null($sponsor) && optional($user->checkmeout)->api_key && optional($user->checkmeout)->secret_key){
            $keys = [
                'api_key' => optional($user->checkmeout)->api_key,
                'secret_key' => optional($user->checkmeout)->secret_key
            ];
        }
        //! We Will Use A Default One Which is On The Config File
        else {
            $keys = [
                'api_key' => config('checkmeout.api_key'),
                'secret_key' => config('checkmeout.secret_key')
            ];
        }
        $this->api_key = $keys['api_key'];
        $this->secret_key = $keys['secret_key'];
    }
    public function setToken(Request $request) : void
    {
        $token = $this->generateJWT(); //! generate token using api_key and secret_key
        if($token){
            $authorization = ['headers' =>
            [
                'Authorization' => 'Bearer '.$token
            ],
        ];
            $this->addOption($authorization);
        }
    }

    public function addHeader(array $header) : void
    {
        if(!array_key_exists('headers',$this->options)){
            array_push($this->options, ['headers' => []]);
        }
        array_merge($this->options['headers'],$header);
    }

    public function getOptions() : array
    {
        return $this->options;
    }

    public function addOption(array $option) : void
    {
        $options = $this->options;
        $this->options = array_merge($options,$option);
    }

}