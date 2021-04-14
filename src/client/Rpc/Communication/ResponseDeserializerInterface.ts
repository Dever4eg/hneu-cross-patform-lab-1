import { Response } from "../Response";

export default interface ResponseDeserializerInterface {
    deserialize(buffer: Buffer): Response|Promise<Response>
}
