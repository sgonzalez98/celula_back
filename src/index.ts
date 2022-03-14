import express, { Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { baseUrlApi, port } from './config/global';
import authJwt from './utilities/jwt';
import errorHandler from './utilities/errorHandler';
import mongooseConnection from './utilities/mongoConnection';
import swaggerOptions from './config/swaggerOptions';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);

app.get('/', (request: Request, response: Response) => {
  response.send('Hello World!')
})

// Swagger documentation.
const swagger: RequestHandler = swaggerUi.setup(swaggerOptions);
app.use(`${baseUrlApi}documentation`, swaggerUi.serve, swagger);

// Realizamos conexion a MongoDD
mongooseConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
