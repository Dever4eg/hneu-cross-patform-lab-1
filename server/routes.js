const getMenu = require('./actions/getMenu')
const sendOrder = require('./actions/sendOrder')

const commands = new Map()

commands.set('get_menu', { handler: getMenu })
commands.set('send_order', { handler: sendOrder })

module.exports = commands
