import Mongoose from 'mongoose';
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
}, { versionKey: false, id: true });

CelulaSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: function(_, ret) {
    delete ret['_id'];
    return ret;
  }
});

CelulaSchema.virtual('usuario', {
  ref: 'usuarios',
  localField: 'usuarioId',
  foreignField: '_id',
  justOne: true,
});

export default Mongoose.model('celulas', CelulaSchema);