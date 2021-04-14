import getMenu from './actions/getMenu';
import sendOrder from './actions/sendOrder';
import {Procedure} from './Rpc/Procedure';
import {Response} from './Rpc/Response';

export type RouteHandler = (procedure: Procedure, params: any) => Response

const routes: Map<string, RouteHandler> = new Map();

routes.set('get_menu', getMenu);
routes.set('send_order', sendOrder);

export default routes;
