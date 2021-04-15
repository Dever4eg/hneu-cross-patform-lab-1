import {Procedure} from "../Procedure";
import RequestDeserializerInterface from "./RequestDeserializerInterface";

class RequestJsonDeserializer implements RequestDeserializerInterface
{
    deserialize(buffer: Buffer): Procedure
    {
        const { id, method, params } = JSON.parse(buffer.toString())
        return { id, method, params }
    }
}

export default RequestJsonDeserializer
