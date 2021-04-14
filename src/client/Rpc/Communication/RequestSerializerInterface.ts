import {Procedure} from "../Procedure";

export default interface RequestSerializerInterface
{
    serialize(procedure: Procedure): string
}
