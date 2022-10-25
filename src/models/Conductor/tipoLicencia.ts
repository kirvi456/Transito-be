import { Schema, model } from 'mongoose';

const TipoLicenciaSchema = new Schema({
    tipo: {
        type : String,
        required: [true, 'Se debe especificar el tipo de licencia'],
        unique: true
    },
    desc: {
        type : String,
        required: [true, 'Se debe de especificar la descripción del tipo de licencia']
    },
    active: {
        type: Boolean,
        default: true
    }
});


TipoLicenciaSchema.methods.toJSON = function() {
    const {__version, __v, ...tipoLicencia} = this.toObject();
    return tipoLicencia;
}

export default model('TipoLicencia', TipoLicenciaSchema);