import Mongoose from 'mongoose';
import { mongoToJson } from '../utilities';

interface IDesarrollo {
  celulaId: string | undefined,
  fecha: Date,
  tema: string,
  textosBiblicos: string,
  observacion: string
}

const CelulaDesarrolloSchema = new Mongoose.Schema<IDesarrollo>({
  celulaId: { type: Mongoose.Types.ObjectId, ref: 'celulas', required: true },
  fecha: { type: Date, required: true },
  tema: { type: String, required: true },
  textosBiblicos: { type: String },
  observacion: { type: String },
});

// Metodo para la conversion de datos de consulta
mongoToJson(CelulaDesarrolloSchema);

export default Mongoose.model<IDesarrollo>('celulas_desarrollos', CelulaDesarrolloSchema);