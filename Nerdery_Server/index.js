'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');
const AuthBearer = require('hapi-auth-bearer-token');
const Inert = require('@hapi/inert');
const CONFIG = require('./config');

const init = async () => {

  const server = Hapi.server({
    port: CONFIG.port,
    host: 'localhost',
    // routes: {
    //     files: {
    //         relativeTo: Path.join(__dirname, 'public')
    //     }
    // }
  }); 

  await server.register(AuthBearer);
  await server.register(Inert);





  server.auth.strategy('simple', 'bearer-access-token', {
    allowQueryToken: false,
    validate: async (request, token, h) => {
      const isValid = token === CONFIG.token;
      const credentials = { token };
      return { isValid, credentials };
    }
  });

  server.auth.default('simple');

  server.route({
    method: 'GET',
    path: '/',
    handler: async function (request, h) {
        return { info: 'success!' }
        // return h.file('../../starter_files/index.html');
    }
  });






  // require('./auth')(server, CONFIG);
  // require('./routes/home')(server, CONFIG);
  // require('./routes/snacks')(server, CONFIG);
  // require('./routes/images')(server, CONFIG);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);

  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();