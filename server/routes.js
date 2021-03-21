const getMenu = require('./actions/getMenu')

const commands = new Map()

commands.set('get_menu', {
    handler: getMenu
})

module.exports = commands
