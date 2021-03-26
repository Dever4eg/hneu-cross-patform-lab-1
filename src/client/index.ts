import { printUsageInfo } from './usage';
import supportedCommands from './commands';

const [,,command] = process.argv;

if (!command || !supportedCommands.has(command)) {
    printUsageInfo(supportedCommands);
    process.exit(0);
}

const action = supportedCommands.get(command);

action.handler();
