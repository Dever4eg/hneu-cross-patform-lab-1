import { loadPackageDefinition, Server, ServerCredentials } from "@grpc/grpc-js";
import { loadSync as loadProtoSync } from "@grpc/proto-loader";
import logger from "./libs/logger";
import { getMenu } from "./services/menu";
import {createOrder, DishDto} from "./services/order";

const PROTO_PATH = __dirname + '/grpc/proto/restaurant.proto';

const PORT = process.env.port || 50051;

const packageDefinition = loadProtoSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const proto: any = loadPackageDefinition(packageDefinition).restaurant;

const getMenuCallback = (call, callback) => {
    const { requestId } = call.request
    const menu = getMenu()
    callback(null, { requestId, result: menu });
}

const sendOrderCallback = (call, callback) => {
    const { requestId, dishes }: { dishes: DishDto[], requestId: string } = call.request
    try {
        const order = createOrder(dishes)
        callback(null, { requestId, result: order, error: null })
    } catch (error) {
        callback(null, { requestId, error: error.message })
    }
}

const server = new Server();

server.addService(proto.Restaurant.service, {
    getMenu: getMenuCallback,
    sendOrder: sendOrderCallback
});

server.bindAsync(`0.0.0.0:${PORT}`, ServerCredentials.createInsecure(), () => {
    server.start();
    logger.info(`Listening on 0.0.0.0:${PORT}`)
});
