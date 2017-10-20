<?php
use Illuminate\Database\Seeder;
use App\Gateway;

class GatewaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = public_path('gateways.json');
        $gateways = file_get_contents($file);
        $gateways = json_decode($gateways,true);
        foreach($gateways as $gateway){
            Gateway::create($gateway);
        }
    }
}