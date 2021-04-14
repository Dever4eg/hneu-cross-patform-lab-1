import ResponseSerializerInterface from "./ResponseSerializerInterface";
import {Response} from "../Response";
import { Builder as XMLBuilder } from 'xml2js';

class ResponseJsonSerializer implements ResponseSerializerInterface
{
    serialize(response: Response): string
    {
        const builder = new XMLBuilder({  })
        return builder.buildObject({ response })
    }
}

export default ResponseJsonSerializer
