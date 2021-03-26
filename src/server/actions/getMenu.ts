import { getMenu } from '../services/menu';

const serializeMenuItems = (menu) => menu.reduce((payload, dish) => {
    const { id, uuid, name, price, weight } = dish;

    return payload + `${id}%${uuid}%${name}%${price}%${weight}` + '\n';
}, '');

export default (sock) => {
    const menu = getMenu();
    const payload = serializeMenuItems(menu);

    console.log('Sending menu to the client');
    sock.write(payload);
    sock.end();
};
