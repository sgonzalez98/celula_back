import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface IUsuario {
  nombre: string,
  usuario: string,
  clave: string,
  isAdmin: number,
  estado: string,
};

const UsuarioSchema = new Mongoose.Schema<IUsuario>({
  nombre: { type: String, required: true },
  usuario: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  isAdmin: { type: Number, required: true },
  estado: { type: String, required: true },
});

// Metodo para la conversion de datos de consulta
mongoToJson(UsuarioSchema);

export default Mongoose.model<IUsuario>('usuarios', UsuarioSchema);