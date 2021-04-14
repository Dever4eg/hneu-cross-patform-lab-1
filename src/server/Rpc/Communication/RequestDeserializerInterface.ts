import {Procedure} from "../Procedure";

export default interface RequestDeserializerInterface
{
    deserialize(buffer: Buffer): Procedure|Promise<Procedure>
}
