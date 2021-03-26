import { getMenu, MenuItemDto } from '../services/menu';
import { Socket } from 'net';
import logger from '../libs/logger';

const serializeMenuItems = (menu: MenuItemDto[]): string => menu.reduce((payload, dish) => {
    const { id, uuid, name, price, weight } = dish;

    return payload + `${id}%${uuid}%${name}%${price}%${weight}` + '\n';
}, '');

const serializeMenuItemsToJson = (menu: MenuItemDto[]): string => JSON.stringify(menu);

const serializeMenuItemsToXML = (menu: MenuItemDto[]): string => {
    const itemsData = menu.reduce((result: string, item: MenuItemDto) => {
        return result + `
<element>
    <id>${item.id}</id>
    <name>${item.name}</name>
    <price>${item.price}</price>
    <uuid>${item.uuid}</uuid>
    <weight>${item.weight}</weight>
</element>
`
    }, '');

    return `
<?xml version="1.0" encoding="UTF-8"?>
<root>
    ${itemsData}
</root>`
};

const FORMAT_SERIALIZER_MAP = {
    'json': serializeMenuItemsToJson,
    'xml': serializeMenuItemsToXML,
    'awful': serializeMenuItems,
}

export default (sock: Socket, buffer, params) => {
    const { format } = params

    const menu = getMenu();
    const payload = FORMAT_SERIALIZER_MAP[format](menu);

    logger.info('Sending menu to the client');
    sock.write(payload);
    sock.end();
};
