import RequestSerializerInterface from "./RequestSerializerInterface";
import {Procedure} from "../Procedure";
import { Builder as XMLBuilder } from 'xml2js';

class RequestXmlSerializer implements RequestSerializerInterface
{
    serialize(procedure: Procedure): string
    {
        const builder = new XMLBuilder()
        return builder.buildObject({ procedure })
    }
}

export default RequestXmlSerializer
