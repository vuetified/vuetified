# Laravel Vuetify Realtime Starter App
<p align="center">
<img src="https://user-images.githubusercontent.com/28816690/30248403-c4681e22-9659-11e7-9ed9-7e3f58ae061d.png"/>
</p>

## Server and development requirements

**Latest as of now:**

- Node (^8.5.0) && NPM (^5.3.0)
- Redis (^3.2.100)
- PHP (^7.1)
- Composer (^1.4.1)
- VSCODE Insiders && Plugins (ESLINT)
- Laravel Echo Server(^1.3.1)
- Laravel Passport (^3.0.0)
- Laravel Mix (^1.4.3)
- Laravel Valet for Windows (^2.0.8)
- Vue (^2.4.4)
- Vuetify (^0.16.4)

## Installation


```php
git clone https://github.com/vuetified/vuetified.git Vuetified
cd Vuetified
cp .env.example .env
composer install
php artisan key:generate
php artisan passport:keys 
php artisan migrate:fresh --seed 
yarn install
```

## Configuration

### Laravel Echo Server Usage

Generate Laravel Echo Server Keys

```
php artisan echo:generate
```
Laravel Echo Server is Off By Default To Use it Modify .env file

```
ECHO_ON=true
ECHO_PROTOCOL=http
ECHO_CLIENT_ID=
ECHO_CLIENT_KEY=
ECHO_DOMAIN=localhost
// For HTTPS Config Leave Empty if not Using HTTPS
ECHO_CERTPATH=
ECHO_KEYPATH=
ECHO_CERTCHAINPATH=
ECHO_PASSPHRASE=
```
Our Socket.io.js Will Be Loaded Depending if ECHO_ON = true

app.blade.php 
```php
@if(config('echo.realtime'))
<script src="//{{ Request::getHost() }}:6001/socket.io/socket.io.js"></script>
@endif
```

#### Using SQLite (testing) purposes

By Default Our websocket.js uses Redis, if You Are using redis no need to Do this

```
touch laravel-echo-server.sqlite
```

Also change your Broadcast Driver to log instead of Redis

```
BROADCAST_DRIVER=log
```
Go to websocket.js change redis to sqlite as preferred database
```
database: 'sqlite',
    databaseConfig: {
        redis: {},
        sqlite: {
            databasePath: '/database/laravel-echo-server.sqlite'
        }
    },
```

### Enable Broadcasting in Your Laravel App (required)

Uncomment this on config/app.php

```
// App\Providers\BroadcastServiceProvider::class,
```

### Run Laravel Echo Server

```
node websocket
```

## Run Laravel Mix

```
npm run watch
```

### Adding Channels

routes/channels.php

```php
Broadcast::channel('App.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});
// Add Here Other Broadcast Channels
```
## Initial State Provider 

We Can Use Global Window App Object In Our Vuetified Project

resources/assets/views/partials/state.blade.php

```php
<script>
    window.App = {!! json_encode(array_merge(
        Vuetified::scriptVariables(), [
            // Add Key and Value Here You Want to Added to Initial State
        ]
    ))!!}
</script>

```
All The Initial State Is Being Provided By:

Vuetified\Configuration\ProvidesScriptVariables.php

```php 
public static function scriptVariables()
    {
        return [
            'csrfToken' => csrf_token(),
            'env' => config('app.env'),
            'api_endpoint' => config('app.domain').'/api',
            // Vuetified Front End Related
            'site'  => config('site'), // Should Be Fetch From DB Settings
            'menu' => config('menu'), // Should Be Fetch From DB Menu and GroupMenu
            'grouplinks' => config('grouplinks'),
            'theme' => config('theme')
        ];
    }
```

### Vuetify Front End Configuration

Main Theme For Our Webpack Can Be Found In
resources/assets/stylus/app.styl

```scss
$theme := {
  primary: $gold
  accent: $accent
  secondary: $indigo.darken-4
  info: $teal.lighten-2
  warning: $yellow.accent-4
  error: $red.darken-4
  success: $lime.lighten-1
}

```
- Set Up Site Meta Data 

Modify: config/site.php

Used in resources/assets/js/mixins/theme.js

- Set Up Sidebar Menu Link and Group Menu Links for LeftSidebar.vue

Modify: config/menu.php ,config/grouplinks.php


- Set Up Theme Class Object

Refer to Vuetify Color Scheme : https://vuetifyjs.com/style/colors

This Servers as An Override to The app.styl file

config/theme.php
```php
return [
    'dark' => true,
    'primary' => 'red darken-2',
    'accent' => 'red accent-2',
    'secondary' => 'grey lighten-1',
    'info'   => 'blue lighten-1',
    'warning' => 'amber darkern-2',
    'error'  => 'red accent-4',
    'success' => 'green lighten-2'
];
```

We Can Use This Theme Using A Mixin In Our Project

anyvuefile.vue
```
import Theme from '../mixins/theme'
export default {
mixins: [Theme]
}
```
We Can Now Use The Class Object As Such

```html
<template>
<p :class="[primaryClass]"> </p>
</template>
```

check resources/assets/mixins/theme.js 
for more ClassObject We Can Dynamically Bind to Our Component

## Vue File Structure

Root
resources/assets/js 
```
- /components
- /forms
- /layouts
- /mixins
- /pages
- /partials
- /routes
- /services
- /store
app.js
App.vue
bootstrap.js
router.js
routes.js
store.js
```

## Vue Routing

we can use a global object routes()
using laravel named routes courtesy of ziggy

```js
{
    path: route('api.user.idex'),
    component: Users
},
```
Ready for Big Project : Using Route Group files

Available Routes:
```
authRoutes.js
categoryRoutes.js
errorRoutes.js
homeRoutes.js
productRoutes.js
profileRoutes.js
```

This is Imported in routes.js

and routes.js is being used by router.js


## App State(Vuex)
Our State Is Being Stored at Local Storage , Also the access_token is used both in local storage and cookie (for routes authentication)

## Vuetified Auth Scaffold Using Laravel Passport

We Have A Full Authentication In Vuetified App
```
/login
/register
/forgotpassword
```
