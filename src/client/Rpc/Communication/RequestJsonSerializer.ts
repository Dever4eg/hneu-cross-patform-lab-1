import RequestSerializerInterface from "./RequestSerializerInterface";
import {Procedure} from "../Procedure";

class RequestJsonSerializer implements RequestSerializerInterface
{
    serialize(procedure: Procedure): string
    {
        return JSON.stringify(procedure)
    }
}

export default RequestJsonSerializer
