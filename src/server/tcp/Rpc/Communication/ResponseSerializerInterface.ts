import {Response} from "../Response";

export default interface ResponseSerializerInterface
{
    serialize(response: Response): string
}
