const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;
const player = require('play-sound')(opts = {});
const deviceModule = require('./device');
const cmdLineProcess = require('./lib/cmdline');
// const Gpio = require('onoff').Gpio;
// const led = new Gpio(17, 'out');
// const button = new Gpio(4, 'in', 'both');

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.use(express.static(path.join(__dirname, 'build')));

io.on('connection', (socket) => {
  socket.on('timer start', () => {
    player.play('boxing-bell-3-rings.wav', function (err) {
      if (err) throw err;
    });
  });

  socket.on('timer reset', () => {
    player.play('1up.wav', function (err) {
      if (err) throw err
    });
  });

  socket.on('timer warning', () => {
    player.play('claps1.wav', function (err) {
      if (err) throw err
    });
  });

  socket.on('timer end', () => {
    player.play('horn.mp3', function (err) {
      if (err) throw err
    });
  });
});

// An api endpoint that returns a short list of items
app.get('/api/getList', (req, res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// button.watch((err, value) => {
//   if (err) {
//     throw err;
//   }

//   if (value) {
//     io.emit('mobile start', 120);
//   }

//   led.writeSync(value);
// });

// process.on('SIGINT', _ => {
//   led.unexport();
//   button.unexport();
// })

function processTest(args) {

  const device = deviceModule({
    keyPath: args.privateKey,
    certPath: args.clientCert,
    caPath: args.caCert,
    clientId: args.clientId,
    region: args.region,
    baseReconnectTimeMs: args.baseReconnectTimeMs,
    keepalive: args.keepAlive,
    protocol: args.Protocol,
    port: args.Port,
    host: args.Host,
    debug: args.Debug
  });

  device.subscribe('topic_2');

  device
    .on('connect', function () {
      console.log('connect');
    })
  device
    .on('close', function () {
      console.log('close');
    })
  device
    .on('reconnect', function () {
      console.log('reconnect');
    })
  device
    .on('offline', function () {
      console.log('offline');
    })
  device
    .on('error', function (error) {
      console.log('error', error);
    })
  device
    .on('message', function (topic, payload) {
      const payloadObj = JSON.parse(payload);
      if (payloadObj.directive === 'mobile start') {
        io.emit(payloadObj.directive, payloadObj.timeInSeconds);
      } else if (payloadObj.directive === 'mobile reset') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile stop') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile add p1 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile subtract p1 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile clear p1 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile add p2 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile subtract p2 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile clear p2 point') {
        io.emit(payloadObj.directive);
      } else if (payloadObj.directive === 'mobile add p1 name') {
        io.emit(payloadObj.directive, payloadObj.playerOneName);
      } else if (payloadObj.directive === 'mobile add p2 name') {
        io.emit(payloadObj.directive, payloadObj.playerTwoName);
      } else {
        console.error('Error directive unrecognized', payloadObj.directive);
      }
    });
}

module.exports = cmdLineProcess

if (require.main === module) {
  cmdLineProcess('connect to the AWS IoT service and publish/subscribe to topics using MQTT, test modes 1-2',
    process.argv.slice(2), processTest)
}

