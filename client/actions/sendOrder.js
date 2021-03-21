const { connect } = require("../tcp")

module.exports = () => {
    connect(client => {
        const ids = process.argv.slice(3)

        if (ids.length === 0) {
            console.log('Select dish Ids')
            process.exit()
        }

        let payload = 'send_order\n' + ids.join(':1\n')

        client.write(payload)
        client.on('data', data => {
            console.log('Received data from server: ' + data)
        })
        client.end()
    })
}
