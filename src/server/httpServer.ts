import express from "express";
import { getMenu } from "./services/menu";
import {createOrder, DishDto} from "./services/order";
import bodyParser  from "body-parser";
import logger from "./libs/logger";

const port = process.env.PORT || 8081;

const app = express();

app.use(bodyParser.json());

app.get('/dishes', (req, res) => {
    const menu = getMenu();
    res.send({ status: 'ok', result: menu });
})

app.post('/orders', (req, res) => {
    const dishes: DishDto[] = req.body.dishes
    try {
        const order = createOrder(dishes)
        res.send({ status: 'ok', result: order })
    } catch (error) {
        res.send({ status: 'error', error: error.message })
    }
})

app.listen(port, () => {
    logger.info(`App listening port ${port}`)
})