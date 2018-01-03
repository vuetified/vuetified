<?php 
declare(strict_types=1);

namespace App\Traits;

use Illuminate\Http\Request;
use App\Exceptions\UserTokenNotFound;
use GuzzleHttp\Client;

trait CheckMeOutTrait 
{
    public $client;
    public $options = [];
    public static $host = 'checkmeout.ph';
    public static $protocol ='https';
    public static $version = 'v1';
    public static $api='api';
    public static $based_url = 'https://api.checkmeout.ph/v1';

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

    public function setToken(Request $request) : void
    {
        $user = $request->user();
        if(!$user){
            throw new UserTokenNotFound;
        }
        $token = $user->cmo->token;
        if($token){
            $authorization = ['Authorization' => 'Bearer '.$token];
            if(!array_key_exists('headers',$this->options)){
                array_push($this->options, ['headers' => []]);
            }
            $this->options = array_merge($this->options['headers'],$authorization);
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