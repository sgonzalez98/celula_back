import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

const CelulaParticipanteSchema = new Mongoose.Schema({
  celulaId: { type: Mongoose.Types.ObjectId, ref: 'celulas', required: true },
  nombre: { type: String, required: true },
  apellido: { type: String },
  telefono: { type: String, required: true },
  edad: { type: Number },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaParticipanteSchema);

export default Mongoose.model('celulas_participantes', CelulaParticipanteSchema);