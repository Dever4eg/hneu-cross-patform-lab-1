import ResponseJsonDeserializer from "./ResponseJsonDeserializer";
import ResponseDeserializerInterface from "./ResponseDeserializerInterface";
import ResponseXmlDeserializer from "./ResponseXmlDeserializer";

const FORMAT_DESERIALIZER_MAP: { [key: string]: ResponseDeserializerInterface } = {
    json: new ResponseJsonDeserializer(),
    xml: new ResponseXmlDeserializer(),
}

class ResponseDeserializerFactory {
    createDeserializer(format: string): ResponseDeserializerInterface {
        if (!FORMAT_DESERIALIZER_MAP[format]) {
            throw new Error(`Unsupported format given: ${format}`)
        }

        return FORMAT_DESERIALIZER_MAP[format]
    }
}

export default ResponseDeserializerFactory
