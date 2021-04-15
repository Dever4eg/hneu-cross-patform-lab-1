import {Procedure} from "../Procedure";
import RequestDeserializerInterface from "./RequestDeserializerInterface";
import xml2js from "xml2js";

class RequestXmlDeserializer implements RequestDeserializerInterface
{
    async deserialize(buffer: Buffer): Promise<Procedure>
    {
        const { procedure } = await xml2js.parseStringPromise(buffer.toString(), { explicitArray: false })
        return procedure
    }
}

export default RequestXmlDeserializer
