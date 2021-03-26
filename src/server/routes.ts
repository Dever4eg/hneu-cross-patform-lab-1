import getMenu from './actions/getMenu';
import sendOrder from './actions/sendOrder';

const commands = new Map();

commands.set('get_menu', { handler: getMenu });
commands.set('send_order', { handler: sendOrder });

export default commands;
