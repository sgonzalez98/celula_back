import express, { Request, Response } from 'express';
import { port } from './config/global';

const app = express();

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
