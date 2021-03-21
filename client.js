const { printUsageInfo } = require('./client/usage')
const supportedCommands = require('./client/commands')

const [,,command] = process.argv

if (!command || !supportedCommands.has(command)) {
    printUsageInfo()
    process.exit(-1)
}

const action = supportedCommands.get(command)

action.handler()
