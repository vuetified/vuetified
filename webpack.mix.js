let mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    output: {
        chunkFilename: mix.inProduction() ? '[name].[chunkhash].js' : '[name].js'
    }
})

mix.js('resources/assets/js/app.js', 'public/js')
    .extract([
        'lodash', 'axios', 'jquery', 'vue', 'vuex', 'vue-router'
    ])
    // .sourceMaps()
mix.stylus('resources/assets/stylus/app.styl', 'public/css')
if (mix.inProduction()) {
    mix.version()
    mix.disableNotifications()
}
/* 
 * Comment out if you want to Use BrowserSync
 *
 * 
require('dotenv').config()
const env = process.env
mix.browserSync({
    proxy: env.APP_DOMAIN
})
 *
 */
