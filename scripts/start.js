const {server} = require('../src/server');
const config = require('../config');

const app = server(config);
app.start().then(() => {
  console.log(`Listening on ${config.serverHost}:${config.serverPort}`);
}).catch((error) => {
  app.stop();
  console.log('Error', error);
});
