import {send} from "../Rpc/Client";
import {build as buildProcedure} from "../Rpc/Procedure";

export default async () => {
    const ids = process.argv.slice(3);

    if (ids.length === 0) {
        console.log('Select dish Ids');
        process.exit();
    }

    const response = await send(buildProcedure('send_order', {
        dishes: ids.map(id => ({ id, count: 1 }))
    }))

    if (response.error) {
        console.log(`Error returned from server: ${response.error}`)
        return;
    }

    const { result: order } = response

    console.log(`Created order, with id: ${order.id}`);

    order.dishes.forEach(({ name, price, weight, count }) => {
        console.log(`${count} PCS, ${name}, ${weight}g, $${price}`);
    });

    console.log(`Summary cost: $${order.sum}`);
};
