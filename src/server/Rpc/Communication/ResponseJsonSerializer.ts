import ResponseSerializerInterface from "./ResponseSerializerInterface";
import {Response} from "../Response";

class ResponseJsonSerializer implements ResponseSerializerInterface
{
    serialize(response: Response): string
    {
        return JSON.stringify(response)
    }
}

export default ResponseJsonSerializer
