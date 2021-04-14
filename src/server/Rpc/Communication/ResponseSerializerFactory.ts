import ResponseSerializerInterface from "./ResponseSerializerInterface";
import ResponseJsonSerializer from "./ResponseJsonSerializer";

const FORMAT_SERIALIZER_MAP: { [key: string]: ResponseSerializerInterface } = {
    json: new ResponseJsonSerializer(),
}

class ResponseSerializerFactory {
    createSerializer(format: string): ResponseSerializerInterface {
        if (!FORMAT_SERIALIZER_MAP[format]) {
            throw new Error(`Unsupported format given: ${format}`)
        }

        return FORMAT_SERIALIZER_MAP[format]
    }
}

export default ResponseSerializerFactory