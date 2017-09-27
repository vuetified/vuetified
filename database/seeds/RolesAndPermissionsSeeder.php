<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run()
	{
    	// Reset cached roles and permissions
        app()['cache']->forget('spatie.permission.cache');

        // create permissions
        Permission::create(['name' => 'edit_profile']);

        Permission::create(['name' => 'edit_theme']);
        Permission::create(['name' => 'edit_site']);
        Permission::create(['name' => 'edit_config']);

        Permission::create(['name' => 'add_media']);
        Permission::create(['name' => 'edit_media']);
        Permission::create(['name' => 'delete_media']);
        Permission::create(['name' => 'view_media']);

        Permission::create(['name' => 'add_product']);
        Permission::create(['name' => 'edit_product']);
        Permission::create(['name' => 'delete_product']);
        Permission::create(['name' => 'view_products']);

        Permission::create(['name' => 'add_user']);
        Permission::create(['name' => 'edit_user']);
        Permission::create(['name' => 'delete_user']);
        Permission::create(['name' => 'view_users']);
        
        Permission::create(['name' => 'add_reseller']);
        Permission::create(['name' => 'edit_reseller']);
        Permission::create(['name' => 'delete_reseller']);
        Permission::create(['name' => 'view_resellers']);

        Permission::create(['name' => 'add_order']);
        Permission::create(['name' => 'edit_order']);
        Permission::create(['name' => 'delete_order']);
        Permission::create(['name' => 'view_orders']);


        // Admin
        $role = Role::create(['name' => 'admin']);
        $role->givePermissionTo('edit_profile');

        $role->givePermissionTo('edit_theme');
        $role->givePermissionTo('edit_site');
        $role->givePermissionTo('edit_config');

        $role->givePermissionTo('add_media');
        $role->givePermissionTo('edit_media');
        $role->givePermissionTo('delete_media');
        $role->givePermissionTo('view_media');

        $role->givePermissionTo('add_product');
        $role->givePermissionTo('edit_product');
        $role->givePermissionTo('delete_product');
        $role->givePermissionTo('view_products');

        $role->givePermissionTo('add_user');
        $role->givePermissionTo('edit_user');
        $role->givePermissionTo('delete_user');
        $role->givePermissionTo('view_users');

        $role->givePermissionTo('add_reseller');
        $role->givePermissionTo('edit_reseller');
        $role->givePermissionTo('delete_reseller');
        $role->givePermissionTo('view_resellers');

        $role->givePermissionTo('add_order');
        $role->givePermissionTo('edit_order');
        $role->givePermissionTo('delete_order');
        $role->givePermissionTo('view_orders');

        // Merchant
        $role = Role::create(['name' => 'merchant']);
        $role->givePermissionTo('edit_profile');
        $role->givePermissionTo('edit_config');

        $role->givePermissionTo('add_media');
        $role->givePermissionTo('edit_media');
        $role->givePermissionTo('delete_media');
        $role->givePermissionTo('view_media');

        $role->givePermissionTo('add_reseller');
        $role->givePermissionTo('edit_reseller');
        $role->givePermissionTo('delete_reseller');
        $role->givePermissionTo('view_resellers');
        // Reseller
        $role = Role::create(['name' => 'reseller']);
        $role->givePermissionTo('edit_profile');
        $role->givePermissionTo('edit_config');

        $role->givePermissionTo('add_media');
        $role->givePermissionTo('edit_media');
        $role->givePermissionTo('delete_media');
        $role->givePermissionTo('view_media');

        $role->givePermissionTo('view_orders');
        // Customer
        $role = Role::create(['name' => 'customer']);
        $role->givePermissionTo('edit_profile');
        $role->givePermissionTo('edit_config');

        $role->givePermissionTo('add_media');
        $role->givePermissionTo('edit_media');
        $role->givePermissionTo('delete_media');
        $role->givePermissionTo('view_media');

        $role->givePermissionTo('add_order');
        $role->givePermissionTo('edit_order');
        $role->givePermissionTo('delete_order');
        $role->givePermissionTo('view_orders');
        
    }
}