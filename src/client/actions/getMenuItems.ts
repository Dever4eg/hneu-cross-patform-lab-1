import { build as buildProcedure } from "../Rpc/Procedure";
import { send } from "../Rpc/Client";

export default async ({ format }) => {
    const response = await send(buildProcedure('get_menu'), { format })
    const { result: menu } = response

    menu.forEach(({ id, uuid, name, price, weight }) => {
        console.log(`${id} (${uuid}): ${name}, ${weight}g, $${price}`);
    });
};
