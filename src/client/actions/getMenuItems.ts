import { build as buildProcedure } from "../Rpc/Procedure";
import { send } from "../Rpc/Client";

export default async () => {
    const response = await send(buildProcedure('get_menu'))
    const { result: menu } = response

    menu.forEach(({ id, uuid, name, price, weight }) => {
        console.log(`${id} (${uuid}): ${name}, ${weight}g, $${price}`);
    });
};
