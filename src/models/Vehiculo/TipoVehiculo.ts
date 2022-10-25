import { Schema, model } from 'mongoose';

const TipoVehiculoSchema = new Schema({
    tipo: {
        type : String,
        required: [true, 'Se debe de especificar el tipo']
    },
    active: {
        type: Boolean,
        default: true
    }
});


TipoVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, ...tipoVehiculo} = this.toObject();
    return tipoVehiculo;
}

export default model('TipoVehiculo', TipoVehiculoSchema);