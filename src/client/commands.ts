import getMenuItemsAction from './actions/getMenuItems';
import sendOrderAction from './actions/sendOrder';

const supportedCommands = new Map();

supportedCommands.set('get_menu', {
    description: 'list of dishes',
    handler: getMenuItemsAction,
})

supportedCommands.set('send_order', {
    description: 'create order with selected dishes',
    handler: sendOrderAction,
})

export default supportedCommands
