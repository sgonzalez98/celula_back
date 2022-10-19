import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface ICelula {
  ministerio: string,
  usuarioId: string | undefined,
  lugar: string,
  dia: string,
  hora: string,
  descripcion: string,
  estado: string,
}

const CelulaSchema = new Mongoose.Schema<ICelula>({
  ministerio: { type: String, required: true },
  usuarioId: { type: Mongoose.Types.ObjectId, ref: 'usuarios', required: true },
  lugar: { type: String },
  dia: { type: String, required: true },
  hora: { type: String, required: true },
  descripcion: { type: String },
  estado: { type: String, required: true },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaSchema);

export default Mongoose.model<ICelula>('celulas', CelulaSchema);