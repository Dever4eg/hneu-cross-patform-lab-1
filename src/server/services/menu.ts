import { v4 } from 'uuid';

export const getMenu = () => {
    return [
        {
            id: '1',
            uuid: v4(),
            name: 'Спагетти',
            price: 150,
            weight: 600,
        },
        {
            id: '2',
            uuid: v4(),
            name: 'Борщ',
            price: 250,
            weight: 500,
        },
    ];
};
