import { Schema, model } from 'mongoose';
import agente from './agente';
import articulo from './articulo';
import tipoFirma from './Conductor/tipoFirma';
import tipoLicencia from './Conductor/tipoLicencia';

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
    }
})

const BoletaSchema = new Schema({
    noboleta:{
        type: Number,
        required: [true, 'Se debe indicar el número de la boleta']
    },
    fecha:{
        type: String,
        required: [true, 'Se debe indicar la fecha y hora de la multa']
    },
    lugar:{
        type: String,
        required: [true, 'Se debe indicar el lugar de la multa']
    },
    firma: {
        type: Schema.Types.ObjectId,
        ref: tipoFirma,
        required: [true, 'Se debe indicar si firmo o no']
    },
    agente: {
        type: Schema.Types.ObjectId,
        ref: agente,
        required: [true, 'Se debe especificar el agente']
    },
    articulo: {
        type: Schema.Types.ObjectId,
        ref: articulo,
        required: [true, 'Se debe especificar el articulo2']
    },
    conductor: {
        type: ConductorSchema
    },
});

export default model('Boleta', BoletaSchema);