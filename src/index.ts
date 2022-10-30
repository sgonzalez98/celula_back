import express, { RequestHandler } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { baseUrlApi, port } from './config/global';
import authJwt from './utilities/jwt';
import errorHandler from './utilities/errorHandler';
import mongooseConnection from './utilities/mongoConnection';
import swaggerOptions from './config/swaggerOptions';

// Rutas
import usuarioRoutes from './routes/usuario';
import celulaRoutes from './routes/celula';

const app = express();

// Registramos Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());

// Registramos rutas
app.use(`${baseUrlApi}usuario`, usuarioRoutes);
app.use(`${baseUrlApi}celula`, celulaRoutes);

// Swagger documentation.
const swagger: RequestHandler = swaggerUi.setup(swaggerOptions);
app.use(`${baseUrlApi}documentation`, swaggerUi.serve, swagger);

// Middleware Errores
app.use(errorHandler);

// Realizamos conexion a MongoDD
mongooseConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});