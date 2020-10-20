import express, { json } from 'express';

const app = express();
app.use(json());

app.get('/', (request, response) => response.json({ message: 'Hello, TypeScript!'}));

app.listen(3000, () => console.log('Server started on port 3000'));

