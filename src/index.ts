import express, { json } from 'express';
import { Item } from './domain/item';

const app = express();
app.use(json());

app.get('/', (request, response) => response.json(new Item("Item")));

app.listen(3000, () => console.log('Server started on port 3000'));

