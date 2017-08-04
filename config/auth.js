 const { serverHost, serverPort, env, FB_KEY, FB_SECRET } = require('./')
 const authConfig = {
    development: {
        server: { host: `${serverHost}:${serverPort}`, protocol: 'http'},
        facebook: {
            key: FB_KEY,
            secret: FB_SECRET,
            callback: '/auth/handle_facebook',
            scope: [
                'email',
                'public_profile'
            ]
        }
    },
    production: {
        server: { host: `${serverHost}:${serverPort}`, protocol: 'https'},
        facebook: {
        }
    }
};
module.exports = authConfig[env];
