import { v4 } from 'uuid';
import { getMenu } from './menu';
import logger from '../libs/logger';
import {OrderDish, Order} from "../entities/order";

export interface DishDto {
    id: string,
    count: number
}

const orders = [];

export const createOrder = (dishes: DishDto[]): Order => {
    const menu = getMenu();

    const orderDishes: OrderDish[] = [];

    for (let dish of dishes) {
        const { id, count } = dish;
        const menuItem = menu.find(item => item.id === id);

        if (!menuItem) {
            throw new Error(`Dish with id ${id} not found`);
        }

        orderDishes.push({ dish: menuItem, count: count });
    }

    const order = {
        id: v4(),
        dishes: orderDishes,
        sum: orderDishes.reduce((sum, item) => sum + item.count * item.dish.price, 0),
    }

    orders.push(order);

    logger.info('Orders %o', orders);

    return order;
}
