<?php

namespace App\Http\Controllers\Api\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Http\Resources\User\User as UserResouce;
use App\Exceptions\UserNotFound;
use App\Exceptions\RevokeAdminUpdate;

class PermissionRolesController extends Controller
{
    public function __construct()
    {
        $this->middleware(['role:admin'],['except' => ['getAllPermissions','getAllRoles']]);
    }
    // get a authenticated user
    public function getAllPermissions()
    {
       return Permission::all()->pluck('name')->toArray(); 
    }
    // All Permissions Inherited From Roles Assigned to a User
    public function getAllRoles()
    {
        return Role::all()->pluck('name')->toArray();
    }

    public function syncRoles($id,Request $request)
    {
        if($request->user()->id === $id){
            throw new RevokeAdminUpdate;
        }
        $user = User::find($id);
        if($user){
            $user->syncRoles($request->roles);
            return (new UserResouce($user->load('profile','referralLink', 'roles', 'permissions')))->additional(['message' => 'Roles Updated!']);
        }else{
            throw new UserNotFound;
        }
    }

    public function syncPermissions($id,Request $request)
    {
        if($request->user()->id === $id){
            throw new RevokeAdminUpdate;
        }
        $user = User::find($id);
        if($user){
            $user->syncPermissions($request->permissions);
            return (new UserResouce($user->load('profile','referralLink', 'roles', 'permissions')))->additional(['message' => 'Permissions Updated!']);
        }else{
            throw new UserNotFound;
        }
    }
}
