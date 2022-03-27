import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface IAsistencia {
  celulaDesarrolloId: string | undefined,
  celulaParcicipanteId: string | undefined
}

const CelulaAsistenciaSchema = new Mongoose.Schema<IAsistencia>({
  celulaDesarrolloId: { type: Mongoose.Types.ObjectId, ref: 'celulas_desarrollos', required: true },
  celulaParcicipanteId: { type: Mongoose.Types.ObjectId, ref: 'celulas_participantes', required: true },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaAsistenciaSchema);

export default Mongoose.model<IAsistencia>('celulas_asistencias', CelulaAsistenciaSchema);