import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface IUsuarioToken {
  usuarioId: string | undefined,
  token: string,
}

const UsuarioTokenSchema = new Mongoose.Schema<IUsuarioToken>({
  usuarioId: { type: Mongoose.Types.ObjectId, ref: 'usuarios', required: true },
  token: { type: String }
});

// Metodo para la conversion de datos de consulta
mongoToJson(UsuarioTokenSchema);

export default Mongoose.model<IUsuarioToken>('usuario_tokens', UsuarioTokenSchema);