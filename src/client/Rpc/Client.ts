import RequestSerializerFactory from "./Communication/RequestSerializerFactory";
import {connect} from "../tcp";
import {Socket} from "net";
import {Procedure} from "./Procedure";
import {Response} from "./Response";
import ResponseDeserializerFactory from "./Communication/ResponseDeserializerFactory";

const serializerFactory = new RequestSerializerFactory();
const deserializerFactory = new ResponseDeserializerFactory();

const send = (procedure: Procedure,  { format }): Promise<Response> => {
    return new Promise((resolve, reject) => {
        const serializer = serializerFactory.createSerializer(format)
        const deserializer = deserializerFactory.createDeserializer(format)

        connect((client: Socket) => {

            const payload = serializer.serialize(procedure)

            client.write(payload)

            client.on('data', (data) => {
                resolve(deserializer.deserialize(data))
            });

            client.on('error', (error) => {
                reject(error)
            });

            client.end();
        });
    })
}

export { send }
