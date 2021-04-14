import { printUsageInfo } from './usage';
import supportedCommands from './commands';
import minimist from 'minimist'

const [,,command] = process.argv;

const supportedFormats = ['json', 'xml']

const argv = minimist(process.argv.slice(2), {
    alias: {
        format: 'f',
    },
    default: {
        format: 'json',
    }
})

const format = argv.format

if (!supportedFormats.includes(format)) {
    console.log('Unsupported format given, possible formats: ' + supportedFormats.join(', '))
    process.exit(0);
}

if (!command || !supportedCommands.has(command)) {
    printUsageInfo(supportedCommands);
    process.exit(0);
}

const action = supportedCommands.get(command);

action.handler({ format });
