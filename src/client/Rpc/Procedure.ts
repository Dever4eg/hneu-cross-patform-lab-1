import { v4 as uuidV4 } from "uuid";

export interface Procedure {
    id: string,
    method: string,
    params: any
}

const build = (method: string, params: any = {}): Procedure => {
    return {
        id: uuidV4(),
        method,
        params
    }
}

export { build }
