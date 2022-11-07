import { Schema, model } from 'mongoose';
import tipoLicencia from './tipoLicencia';

const ConductorSchema = new Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    tipoLicencia: {
        type: Schema.Types.ObjectId,
        ref: tipoLicencia,
        required: [true, 'Se debe de especificar el tipo de licencia']
    },
    noLicencia: {
        type: String,
        required: [true, 'Se debe de especificar el número de licencia']
    },
    folioLicencia: {
        type: String, 
        required: [true, 'Se debe especificar el folio de licencia'],
        default : () => '',
    },
    licenciaBloqueada: {
        type: Boolean,
        required: [true, 'Se debe especificar si la licencia esta bloqueada'],
        default: false
    },
    genero: {
        type: String,
        required: [true, 'Se debe especificar el genero del conductor']
    },
    nit: {
        type: String,
        required: [true, 'Se debe especificar el numero de nit'],
        default: '----'
    },
})

export default model('Conductore', ConductorSchema);