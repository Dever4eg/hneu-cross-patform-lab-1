import { getMenu } from '../../services/menu';
import {Procedure} from "../Rpc/Procedure";
import {RouteHandler} from "../routes";
import {Response} from "../Rpc/Response";

const getMenuAction: RouteHandler = (procedure: Procedure): Response => {
    const menu = getMenu();

    return { id: procedure.id, error: null, result: menu }
};

export default getMenuAction
