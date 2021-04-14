import RequestDeserializerInterface from "./RequestDeserializerInterface";
import RequestJsonDeserializer from "./RequestJsonDeserializer";
import RequestXmlDeserializer from "./RequestXmlDeserializer";

const FORMAT_DESERIALIZER_MAP: { [key: string]: RequestDeserializerInterface } = {
    json: new RequestJsonDeserializer(),
    xml: new RequestXmlDeserializer(),
}

class RequestDeserializerFactory {
    createDeserializer(format: string): RequestDeserializerInterface {
        if (!FORMAT_DESERIALIZER_MAP[format]) {
            throw new Error('Unsupported format')
        }

        return FORMAT_DESERIALIZER_MAP[format]
    }
}

export default RequestDeserializerFactory