import { Schema, model } from 'mongoose';
import agente from './agente';
import articulo from './articulo';
import tipoFirma from './Conductor/tipoFirma';
import tipoLicencia from './Conductor/tipoLicencia';
import tipoPlaca from './tipoPlaca';
import usuario from './usuario';
import ColorVehiculo from './Vehiculo/ColorVehiculo';
import MarcaVehiculo from './Vehiculo/MarcaVehiculo';
import TipoVehiculo from './Vehiculo/TipoVehiculo';

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

const VehiculoSchema = new Schema ({
    tipoPlaca: {
        type: Schema.Types.ObjectId,
        ref: tipoPlaca,
        required: [true, 'Se debe de especificar el tipo de placa']
    },
    noPlaca: {
        type: String,
        required: [true, 'Se debe especificar el numero de placa'],
    },
    marca: {
        type: Schema.Types.ObjectId,
        ref: MarcaVehiculo,
        required: [true, 'Se debe de especificar el tipo de placa']
    },
    color: {
        type: Schema.Types.ObjectId,
        ref: ColorVehiculo,
        required: [true, 'Se debe de especificar el tipo de placa']
    },
    tipo: {
        type: Schema.Types.ObjectId,
        ref: TipoVehiculo,
        required: [true, 'Se debe de especificar el tipo de placa']
    },
    noTarjeta: {
        type: String,
        required: [true, 'Se debe especificar el numero de tarjeta'],
        default: '----'
    },
    nit: {
        type: String,
        required: [true, 'Se debe especificar el numero de nit'],
        default: '----'
    },
})

const PagoSchema = new Schema({
    pagoTipo: {
        type: String,
        required: [true, 'Se debe especificar tipo de pago'],
        default: 'NO PAGADA'
    },
    recibo: {
        type: String,
    },
    reciboImage: {
        type: String,
    }
})

const BoletaSchema = new Schema({
    noboleta:{
        type: Number,
        required: [true, 'Se debe indicar el número de la boleta'],
        unique: true
    },
    fecha:{
        type: Number,
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
    vehiculo: {
        type: VehiculoSchema
    },
    estado: {
        type: String,
        required: true,
        default: 'EMITIDA'
    },
    pago: {
        type: PagoSchema
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el articulo']
    },
});

BoletaSchema.methods.toJSON = function() {
    const {__version, __v, pw, ...boleta} = this.toObject();
    return boleta;
}

export default model('Boleta', BoletaSchema);