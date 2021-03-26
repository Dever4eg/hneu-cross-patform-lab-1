export const printUsageInfo = (supportedCommands) => {
    console.log('Usage: client [OPTIONS] COMMAND');
    console.log('Commands:');

    supportedCommands.forEach(({ description }, name) => {
        console.log(`\t${name}:\t\t${description}`);
    });
};
