module.exports = (sock) => {
    sock.write('some data...')
    sock.end()
}
