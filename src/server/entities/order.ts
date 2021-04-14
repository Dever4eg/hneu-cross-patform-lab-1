import { MenuItemDto } from "./menu";

export interface Order
{
    id: string,
    dishes: OrderDish[],
    sum: number
}

export interface OrderDish
{
    dish: MenuItemDto,
    count: number
}
