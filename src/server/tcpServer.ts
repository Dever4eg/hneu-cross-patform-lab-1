import net, { Socket } from 'net';
import routes from './tcp/routes';
import minimist from 'minimist'
import logger from './libs/logger';
import RequestDeserializerFactory from "./tcp/Rpc/Communication/RequestDeserializerFactory";
import ResponseSerializerFactory from "./tcp/Rpc/Communication/ResponseSerializerFactory";
import {Procedure} from "./tcp/Rpc/Procedure";
import {Response} from "./tcp/Rpc/Response";

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

const processRequest = (procedure: Procedure): Response => {
    if (!routes.has(procedure.method)) {
        return { id: procedure.id, error: `Wrong method received ${procedure.method}` , result: null};
    }

    const handler = routes.get(procedure.method);
    return handler(procedure, { format });
}

index.on('connection', (sock: Socket) => {
    const clientId = `${sock.remoteAddress}:${sock.remotePort}`;

    logger.info(`Client connected: ${clientId}`);
    sockets.set(clientId, sock);

    sock.on('data', async (data) => {
        logger.info(`Received data: ${data}`);

        const procedure = await requestDeserializer.deserialize(data)
        const response = processRequest(procedure)
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
