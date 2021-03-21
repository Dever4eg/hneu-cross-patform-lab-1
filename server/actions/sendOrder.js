const { createOrder } = require('./../services/order');

const serializeOrder = (order) => {
    const { id, dishes, sum } = order;

    const serializedItems = dishes.reduce((result, { dish, count }) => {
        const { id, name, price, weight } = dish;

        return result + `${id}%${name}%${price}%${weight}%${count}` + '\n';
    }, '');

    return `orderId=${id};sum=${sum}\n` + serializedItems;
};

module.exports = (sock, data) => {
    data = data.toString();
    const [, ...rows] = data.split('\n');

    const dishes = rows.map((row) => {
        const [id, count] = row.split(':');

        return { id, count };
    });

    let order;
    try {
        order = createOrder(dishes);
    } catch (error) {
        sock.write('An error occurred during order create: ' + error);
        sock.end();
        return;
    }

    const payload = serializeOrder(order);
    sock.write(payload);
    sock.end();
};
