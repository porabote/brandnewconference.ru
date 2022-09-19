'use strict';
const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

class ChatServer {

  start = (domain, port) => {

    const PORT = process.env.PORT || 8000
    const clients = [];
    const storage = {}

    const server = https.createServer({
      cert: fs.readFileSync('/var/www/porabote/data/www/brandnewconference.ru/.cert/cert.crt'),
      key: fs.readFileSync('/var/www/porabote/data/www/brandnewconference.ru/.cert/key.key'),
    });

    const wss = new WebSocket.Server({server});

    wss.on('connection', (ws) => {

      ws.on('message', (function (ws) {
        return function incoming(message) {
          console.log('received %s', message);
          wss.broadcast(JSON.stringify(message));
          //
          // if (message == 'close') {
          //   ws.close();
          // } else if (message == 'shutdown') {
          //   ws.close();
          //   wss.close();
          //   console.log('Connection was closed');
          //   process.exit();
          // }
        }
      })(ws));

     // wss.broadcast({msg: 'Data refreshed'});
    });


    server.listen(8000, 'brandnewconference.ru', function listening() {

      const ws = new WebSocket(`wss://brandnewconference.ru:${server.address().port}`);

      ws.on('open', function open() {
        ws.send('WebSockets is open');
      });

      // ws.on('message', (msg) => {
      //   console.log(msg)
      //  //wss.broadcast(msg);
      //   //ws.send(msg);
      // })

    });



    wss.broadcast = (data) => {

      if (typeof data !== "string") {
        data = JSON.stringify(data)
      }

      wss.clients.forEach(function each(client) {
        console.log(77)
        client.send(data);
      });
    };

  }

}

//export default new ChatServer();
const server = new ChatServer();
server.start();