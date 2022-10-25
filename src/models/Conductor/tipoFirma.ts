import { Schema, model } from 'mongoose';

const TipoFirmaSchema = new Schema({
    tipo: {
        type : String,
        required: [true, 'Se debe especificar el tipo de firma'],
        unique: true
    },
    active: {
        type: Boolean,
        default: true
    }
});


TipoFirmaSchema.methods.toJSON = function() {
    const {__version, __v, ...tipoFirma} = this.toObject();
    return tipoFirma;
}

export default model('TipoFirma', TipoFirmaSchema);