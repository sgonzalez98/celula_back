import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

const UsuarioSchema = new Mongoose.Schema({
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  rol: { type: String, required: true },
  estado: { type: String, required: true },
});

// Metodo para la conversion de datos de consulta
mongoToJson(UsuarioSchema);

export const Usuario = Mongoose.model('usuarios', UsuarioSchema);