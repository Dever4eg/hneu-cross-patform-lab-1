import net, { Socket } from 'net';
import routes from './routes';
import minimist from 'minimist'
import logger from './libs/logger';
import RequestDeserializerFactory from "./Rpc/Communication/RequestDeserializerFactory";
import ResponseSerializerFactory from "./Rpc/Communication/ResponseSerializerFactory";

const supportedFormats = ['json', 'xml']

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
    console.log('Unsupported format given, possible formats: ' + supportedFormats.join(', '))
    process.exit(0);
}

const index = net.createServer();

index.listen(port, host, () => {
    logger.info(`TCP Server is running on ${host}:${port}`);
});

const sockets = new Map();

const requestDeserializerFactory = new RequestDeserializerFactory()
const requestDeserializer = requestDeserializerFactory.createDeserializer(format)

const responseSerializerFactory = new ResponseSerializerFactory()
const responseSerializer = responseSerializerFactory.createSerializer(format)

index.on('connection', (sock: Socket) => {
    const clientId = `${sock.remoteAddress}:${sock.remotePort}`;

    logger.info(`Client connected: ${clientId}`);
    sockets.set(clientId, sock);

    sock.on('data', (data) => {
        logger.info(`Received data: ${data}`);

        const procedure = requestDeserializer.deserialize(data)

        if (!routes.has(procedure.method)) {
            sock.write(`Wrong command received "${procedure.method}"`);
            sock.end();
            return;
        }

        const handler = routes.get(procedure.method);
        const response = handler(procedure, { format });
        const payload = responseSerializer.serialize(response)

        logger.info(`Sending response: ${payload}`)

        sock.write(payload);
        sock.end();
    });

    sock.on('close', () => {
        sockets.delete(clientId);
        logger.info(`Client connection closed: ${clientId}`);
    });
});
