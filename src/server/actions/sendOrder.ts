import {createOrder, DishDto} from '../services/order';
import {Procedure} from "../Rpc/Procedure";
import {RouteHandler} from "../routes";
import {Response} from "../Rpc/Response";

const sendOrderAction: RouteHandler = (procedure: Procedure): Response => {
    const dishes: DishDto[] = Array.isArray(procedure.params.dishes) ? procedure.params.dishes : [procedure.params.dishes]

    let order;
    try {
        order = createOrder(dishes);
    } catch (error) {
        return { id: procedure.id, error: 'An error occurred during order create: ' + error, result: null};
    }

    return { id: procedure.id, error: null, result: order }
};

export default sendOrderAction
