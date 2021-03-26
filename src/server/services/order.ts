const { getMenu } = require('./menu');

const orders = [];

function* createIdGenerator() {
    let id = 1;

    while (true) {
        yield id++;
    }
}

const idGenerator = createIdGenerator();

export const createOrder = (dishes) => {
    const menu = getMenu();

    const orderDishes = [];

    for (let dish of dishes) {
        const { id, count } = dish;
        const menuItem = menu.find(item => item.id === id);

        if (!menuItem) {
            throw new Error(`Dish with id ${id} not found`);
        }

        orderDishes.push({ dish: menuItem, count: parseInt(count) });
    }

    const order = {
        id: idGenerator.next().value,
        dishes: orderDishes,
        sum: orderDishes.reduce((sum, item) => sum + item.count * item.dish.price, 0),
    }

    orders.push(order);

    console.log('Orders', orders);

    return order;
}
