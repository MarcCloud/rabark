const config = require('../../../config');
const FB = require('fb');

module.exports = new FB.Facebook({app_id: config.FB_KEY, app_secret: config.FB_SECRET });
