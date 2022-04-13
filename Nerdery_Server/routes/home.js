'use strict';

module.exports = function (server, CONFIG) {
    server.route({
        method: 'GET',
        path: '/',
        handler: async function (request, h) {
            return { info: 'success!' }
            // return h.file('../../starter_files/index.html');
        }
      });
//   server.route({
//       method: 'GET',
//       path: '/',
//       options: {
//           auth: 'simple'
//       },
//       handler: function (request, h) {
//         return h.file('../../starter_files/index.html');
//       },
//   });
};