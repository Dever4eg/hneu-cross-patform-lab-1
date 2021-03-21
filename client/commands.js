const getMenuItemsAction = require('./actions/getMenuItems');
const sendOrderAction = require('./actions/sendOrder');

const supportedCommands = new Map();

supportedCommands.set('get_menu', {
    description: 'list of dishes',
    handler: getMenuItemsAction,
})

supportedCommands.set('send_order', {
    description: 'create order with selected dishes',
    handler: sendOrderAction,
})

module.exports = supportedCommands;
