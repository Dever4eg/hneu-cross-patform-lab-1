const { connect } = require("../tcp")

module.exports = () => {
    connect(client => {
        client.write('get_menu')
        client.on('data', data => {
            // todo: add logs
            console.log('Received data from server: ' + data)
        })
        client.end()
    })
}
