const net = require('net');
const routes = require('./server/routes');

const port = parseInt(process.env.PORT || '54321');
const host = process.env.HOST || '127.0.0.1';

const server = net.createServer();

server.listen(port, host, () => {
    console.log(`TCP Server is running on ${host}:${port}`);
});

let sockets = new Map();

server.on('connection', (sock) => {
    const clientId = `${sock.remoteAddress}:${sock.remotePort}`;

    console.log(`Client connected: ${clientId}`);
    sockets.set(clientId, sock);

    sock.on('data', (data) => {
        console.log(`Received data: ${data}`);

        const [action] = data.toString().split('\n') || [data.toString()];

        if (!routes.has(action)) {
            sock.write(`Wrong command received "${action}"`);
            sock.end();
            return;
        }

        const command = routes.get(action);
        command.handler(sock, data);
    });

    sock.on('close', () => {
        sockets.delete(clientId);
        console.log(`Client connection closed: ${clientId}`);
    });
});
