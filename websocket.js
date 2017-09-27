require('dotenv').config()

const env = process.env
const EchoServer = require('laravel-echo-server')

const options = {
    authHost: env.APP_URL,
    devMode: env.APP_DEBUG,
    authEndpoint: '/broadcasting/auth',
    clients: {
        appId: env.ECHO_CLIENT_ID,
        key: env.ECHO_CLIENT_KEY
    },
    database: 'redis',
    databaseConfig: {
        redis: {},
        sqlite: {
            databasePath: '/database/laravel-echo-server.sqlite'
        }
    },
    host: env.ECHO_DOMAIN,
    port: 6001,
    protocol: env.ECHO_PROTOCOL,
    socketio: {
        wsEngine: 'uws'
    },
    sslCertPath: env.ECHO_CERTPATH,
    sslKeyPath: env.ECHO_KEYPATH,
    sslCertChainPath: env.ECHO_CERTCHAINPATH,
    sslPassphrase: env.ECHO_PASSPHRASE
}

EchoServer.run(options)
