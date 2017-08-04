const webp = require('./webpack');
module.exports = {
  env: process.env.NODE_ENV || process.env.npm_package_config_env,
  locale: process.env.LOCALE || process.env.npm_package_config_locale,
  serverPort: process.env.SERVER_PORT || process.env.npm_package_config_serverPort,
  serverHost: process.env.SERVER_HOST || process.env.npm_package_config_serverHost,
  publicPath: process.env.PUBLIC_PATH || process.env.npm_package_config_publicPath,
  build(options = {}){
    return webp(Object.assign(options, module.exports));
  }
};
