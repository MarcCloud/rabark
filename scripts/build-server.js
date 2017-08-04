const {VueBuilder} = require('vue-builder');
const {build} = require('../config');
let options = build({mode: 'server'});

let builder = new VueBuilder(options);
builder.build().catch(console.log);
