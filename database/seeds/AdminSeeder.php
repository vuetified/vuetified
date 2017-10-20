<?php
use Illuminate\Database\Seeder;
use App\User;
use App\Link;
use App\Profile;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'name' => config('admin.name'),
            'email' => config('admin.email'),
            'password' => config('admin.password'),
            'username' => config('admin.username')
        ]);
        $user->assignRole('admin');
        $link = new Link();
        $link->link = $user->username;
        $link->active = true;
        $link->date_activated = \Carbon\Carbon::now();

        $user->referralLink()->save($link);
        $link->save();
        $link->sp_user_id = null;
        $link->save();
        $profile = Profile::create([
            'first_name' => 'John',
            'last_name'  => 'Doe',
        ]);
        $user->profile()->save($profile);
        
        
    }
}