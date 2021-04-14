import ResponseDeserializerInterface from "./ResponseDeserializerInterface";
import {Response} from "../Response";
import xml2js from "xml2js";
import { promisify } from "util";
const parseXml = promisify(xml2js.parseString)

class ResponseXmlDeserializer implements ResponseDeserializerInterface {
    async deserialize(buffer: Buffer): Promise<Response> {
        const { response } = await parseXml(
            buffer.toString(),
            { explicitArray: false }
        )
        return response
    }
}

export default ResponseXmlDeserializer
