import { Schema, model } from 'mongoose';

const MarcaVehiculoSchema = new Schema({
    marca: {
        type : String,
        required: [true, 'Se debe de especificar la marca']
    },
    active: {
        type: Boolean,
        default: true
    }
});


MarcaVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, ...marcaVehiculo} = this.toObject();
    return marcaVehiculo;
}

export default model('MarcaVehiculo', MarcaVehiculoSchema);