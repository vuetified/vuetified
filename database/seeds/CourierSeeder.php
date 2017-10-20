<?php
use Illuminate\Database\Seeder;
use App\Courier;

class CourierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $file = public_path('couriers.json');
        $couriers = file_get_contents($file);
        $couriers = json_decode($couriers,true);
        foreach($couriers as $courier){
            Courier::create($courier);
        }
        
        
    }
}