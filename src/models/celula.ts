import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

const CelulaSchema = new Mongoose.Schema({
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

export default Mongoose.model('celulas', CelulaSchema);