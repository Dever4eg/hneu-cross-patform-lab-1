import { connect } from '../tcp';

const deserializeData = (payload) => {
    return payload
        .toString()
        .split('\n')
        .filter(line => !!line)
        .map(line => {
            const [id, uuid, name, price, weight] = line.split('%')

            return {
                id: parseInt(id),
                uuid: uuid,
                name: name,
                price: parseInt(price),
                weight: parseInt(weight),
            }
        });
};

export default () => {
    connect((client) => {
        client.write('get_menu');
        client.on('data', (data) => {
            const menu = deserializeData(data);
            console.log('Menu received from server:');

            menu.forEach(({ id, uuid, name, price, weight }) => {
                console.log(`${id} (${uuid}): ${name}, ${weight}g, $${price}`);
            });
        });
        client.end();
    });
};
