import Mongoose from 'mongoose';
import { mongoConnectionString } from '../config/global';

// Conneccion de base de datos mongoose.
const mongooseConnection = () => {
  Mongoose.connect(mongoConnectionString)
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Conexion a Mongo realizada');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err);
    });
};

export default mongooseConnection;