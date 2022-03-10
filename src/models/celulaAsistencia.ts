import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

const CelulaAsistenciaSchema = new Mongoose.Schema({
  celulaDesarrolloId: { type: Mongoose.Types.ObjectId, ref: 'celulas_desarrollos', required: true },
  celulaParcicipanteId: { type: Mongoose.Types.ObjectId, ref: 'celulas_participantes', required: true },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaAsistenciaSchema);

export default Mongoose.model('celulas_asistencias', CelulaAsistenciaSchema);