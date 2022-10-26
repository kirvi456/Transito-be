import { Schema, model } from 'mongoose';
import usuario from '../usuario';

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
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el tipo licencia']
    }
});


TipoLicenciaSchema.methods.toJSON = function() {
    const {__version, __v, userCreated, createdAt, active, ...tipoLicencia} = this.toObject();
    return tipoLicencia;
}

export default model('TipoLicencia', TipoLicenciaSchema);