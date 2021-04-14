import RequestSerializerInterface from "./RequestSerializerInterface";
import RequestJsonSerializer from "./RequestJsonSerializer";

const FORMAT_DESERIALIZER_MAP: { [key: string]: RequestSerializerInterface } = {
    json: new RequestJsonSerializer(),
}

class RequestSerializerFactory {
    createSerializer(format: string): RequestSerializerInterface {
        if (!FORMAT_DESERIALIZER_MAP[format]) {
            throw new Error(`Unsupported format given: ${format}`)
        }

        return FORMAT_DESERIALIZER_MAP[format]
    }
}

export default RequestSerializerFactory
