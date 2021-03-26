import net, { Socket } from 'net';
import routes from './routes';
import minimist from 'minimist'

const supportedFormats = ['json', 'xml', 'awful']

const argv = minimist(process.argv.slice(2), {
    alias: {
        format: 'f',
    },
    default: {
        format: 'json',
    }
})

const port = parseInt(process.env.PORT || '54321');
const host = process.env.HOST || '127.0.0.1';
const format = argv.format

if (!supportedFormats.includes(format)) {
    console.log('Unsupported format given, possible formats: xml, json')
    process.exit(0);
}

const index = net.createServer();

index.listen(port, host, () => {
    console.log(`TCP Server is running on ${host}:${port}`);
});

const sockets = new Map();

index.on('connection', (sock: Socket) => {
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

        const route = routes.get(action);
        route.handler(sock, data, { format });
    });

    sock.on('close', () => {
        sockets.delete(clientId);
        console.log(`Client connection closed: ${clientId}`);
    });
});
