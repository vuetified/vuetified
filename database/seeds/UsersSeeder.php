<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Link;
use App\Profile;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /* customer */
        factory(User::class, 1)->create()->each(function ($user) {
            $sponsor = User::findByUsername('admin');
            $user->referralLink()->save(factory(Link::class)->make());
            $currentLink = $user->referralLink;
            $currentLink->sp_user_id = optional($sponsor)->id;
            $currentLink->sp_link_id = optional($sponsor->referralLink)->id;
            $currentLink->save();
            $user->sp_id = optional($sponsor)->id;
            $user->assignRole('customer');
            $user->save();
            $profile = factory(Profile::class,1)->create()->first();
            $user->profile()->save($profile);
        });
        /* merchant */
        factory(User::class, 1)->create()->each(function ($user) {
            $sponsor = User::findByUsername('admin');
            $user->referralLink()->save(factory(Link::class)->make());
            $currentLink = $user->referralLink;
            $currentLink->sp_user_id = optional($sponsor)->id;
            $currentLink->sp_link_id = optional($sponsor->referralLink)->id;
            $currentLink->save();
            $user->sp_id = optional($sponsor)->id;
            $user->assignRole('merchant');
            $user->save();
            $profile = factory(Profile::class,1)->create()->first();
            $user->profile()->save($profile);
        });
        /* reseller */
        factory(User::class, 1)->create()->each(function ($user) {
            $sponsor = User::findByUsername('admin');
            $user->referralLink()->save(factory(Link::class)->make());
            $currentLink = $user->referralLink;
            $currentLink->sp_user_id = optional($sponsor)->id;
            $currentLink->sp_link_id = optional($sponsor->referralLink)->id;
            $currentLink->save();
            $user->sp_id = optional($sponsor)->id;
            $user->assignRole('reseller');
            $user->save();
            $profile = factory(Profile::class,1)->create()->first();
            $user->profile()->save($profile);
        });
    }
}
