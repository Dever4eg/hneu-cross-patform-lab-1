import { Socket } from 'net'
import getMenu from './actions/getMenu';
import sendOrder from './actions/sendOrder';

interface Route {
    handler: (sock: Socket, data: Buffer, params: any) => void
}

const routes: Map<string, Route> = new Map();

routes.set('get_menu', { handler: getMenu });
routes.set('send_order', { handler: sendOrder });

export default routes;
