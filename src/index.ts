//import express, { json } from 'express';
import { Item } from './domain/item';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';
import { config } from './config';
import {swaggerRouter} from './router';

const app = new Koa();

const runningPort = process.env.port || config.port;

app
    .use(swaggerRouter.routes())
    .use(swaggerRouter.allowedMethods())
    .use(bodyParser())
    .listen(runningPort);

console.log(`Server started at runnig port ${runningPort}`);




//const app = express();
// app.use(json());

// app.get('/', (request, response) => response.json(new Item("Item")));

// app.listen(3000, () => console.log('Server started on port 3000'));

