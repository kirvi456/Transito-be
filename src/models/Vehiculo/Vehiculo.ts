import { Schema, model } from 'mongoose';
import tipoPlaca from '../tipoPlaca';
import ColorVehiculo from './ColorVehiculo';
import MarcaVehiculo from './MarcaVehiculo';
import TipoVehiculo from './TipoVehiculo';

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
    }
})

export default model('Vehiculo', VehiculoSchema);