import { Schema, model } from 'mongoose';
import usuario from '../usuario';

const TipoFirmaSchema = new Schema({
    tipo: {
        type : String,
        required: [true, 'Se debe especificar el tipo de firma'],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el tipo de firma']
    }
});


TipoFirmaSchema.methods.toJSON = function() {
    const {__version, __v, ...tipoFirma} = this.toObject();
    return tipoFirma;
}

export default model('TipoFirma', TipoFirmaSchema);