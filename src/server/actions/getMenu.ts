import { getMenu } from '../services/menu';

const serializeMenuItems = (menu) => menu.reduce((payload, dish) => {
    const { id, name, price, weight } = dish;

    return payload + `${id}%${name}%${price}%${weight}` + '\n';
}, '');

export default (sock) => {
    const menu = getMenu();
    const payload = serializeMenuItems(menu);

    console.log('Sending menu to the client');
    sock.write(payload);
    sock.end();
};
