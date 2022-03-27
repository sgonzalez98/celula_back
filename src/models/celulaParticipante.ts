import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface IParticipante {
  celulaId: string | undefined,
  nombre: string,
  telefono: string,
  edad: number,
}

const CelulaParticipanteSchema = new Mongoose.Schema<IParticipante>({
  celulaId: { type: Mongoose.Types.ObjectId, ref: 'celulas', required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  edad: { type: Number },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaParticipanteSchema);

export default Mongoose.model<IParticipante>('celulas_participantes', CelulaParticipanteSchema);