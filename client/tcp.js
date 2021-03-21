const net = require('net');

const client = new net.Socket();
const port = parseInt(process.env.PORT || '54321');
const host = process.env.HOST || '127.0.0.1';

client.on('error', (error) => {
    console.log(`Failed to connect: ${error}`);
});

const connect = (handler) => {
    return client.connect(port, host, () => handler(client));
};

module.exports = { connect };
