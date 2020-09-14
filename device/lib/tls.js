//node.js deps
var tls = require('tls');

//npm deps

//app deps

function buildBuilder(mqttClient, opts) {
   var connection;

   connection = tls.connect(opts);

   function handleTLSerrors(err) {
      mqttClient.emit('error', err);
      connection.end();
   }

   connection.on('secureConnect', function() {
      if (!connection.authorized) {
         connection.emit('error', new Error('TLS not authorized'));
      } else {
         connection.removeListener('error', handleTLSerrors);
      }
   });

   connection.on('error', handleTLSerrors);
   return connection;
}

module.exports = buildBuilder;
