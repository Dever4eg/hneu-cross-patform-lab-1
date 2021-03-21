const net = require('net')
const client = new net.Socket()

const port = parseInt(process.env.PORT || '54321')
const host = process.env.HOST || '127.0.0.1'

client.connect(port, host, () => {
    console.log('Connected to server')
    client.write('Hello From Client')
    client.end()
})
