'use strict';

const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

class ChatServer {

    start = (domain, port) => {

        const PORT = process.env.PORT || 3000
        const clients = [];
        const storage = {}

        const server = https.createServer({
            cert: fs.readFileSync('../.cert/cert.crt'),
            key: fs.readFileSync('../.cert/key.key')
        });

        const wss = new WebSocket.Server({ server });

        wss.setClientID = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
            }
            return s4() + s4() + '-' + s4();
        };

        wss.broadcast = (data) => {

            if (typeof data !== "string") {
                data = JSON.stringify(data)
            }

            wss.clients.forEach(function each(client) {
                client.send(data);
            });
        };

        wss.on('connection', (ws) => {

            ws.id = wss.setClientID();

            storage[ws.id] = [];

            ws.on('message', (function(ws){ return function incoming(message) {

                console.log('received %s', message);
                //   ws.send(message);
                storage[ws.id].push(message)
                console.log(storage);
                wss.broadcast(message);

                if (message == 'close'){
                    ws.close();
                } else if (message == 'shutdown'){
                    ws.close();
                    wss.close();
                    console.log('Connection was closed');
                    process.exit();
                }
            }})(ws));

            wss.broadcast({msg: 'NEW USER JOINED'});
        });



        server.listen(4000, 'thyssen24.ru', function listening() {

            const ws = new WebSocket(`wss://thyssen24.ru:${server.address().port}`);

            ws.on('open', function open() {
                ws.send('WebSockets is open');
            });

            ws.on('message', (msg) => {
                console.log(msg)
                console.log(8989)
                //ws.send(msg);
            })

        });

    }

}

//export default new ChatServer();
const server = new ChatServer();
server.start();