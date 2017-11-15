<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(GatewaySeeder::class);
        $this->call(CourierSeeder::class);
        $this->call(IamProductSeeder::class);
        // $this->call(CategorySeeder::class);
        // $this->call(ProductSeeder::class);
        $this->call(RolesAndPermissionsSeeder::class);
        $this->call(AdminSeeder::class);
        \Artisan::call('passport:client', [
        '--password' => true,
        '-n'    => true,
        ]);
        $this->call(UsersSeeder::class);
    }
}
