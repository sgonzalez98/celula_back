import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

const CelulaDesarrolloSchema = new Mongoose.Schema({
  celulaId: { type: Mongoose.Types.ObjectId, ref: 'celulas', required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  tema: { type: String, required: true },
  textosBibiclos: { type: String },
  observacion: { type: String },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaDesarrolloSchema);

export default Mongoose.model('celulas_desarrollos', CelulaDesarrolloSchema);