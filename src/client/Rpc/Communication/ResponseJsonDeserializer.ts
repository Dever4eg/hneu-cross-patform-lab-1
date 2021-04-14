import ResponseDeserializerInterface from "./ResponseDeserializerInterface";
import {Response} from "../Response";

class ResponseJsonDeserializer implements ResponseDeserializerInterface {
    deserialize(buffer: Buffer): Response {
        const { id, error, result } = JSON.parse(buffer.toString())
        return { id, error, result }
    }
}

export default ResponseJsonDeserializer
