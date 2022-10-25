import { Schema, model } from 'mongoose';

const ColorVehiculoSchema = new Schema({
    color: {
        type : String,
        required: [true, 'Se debe de especificar el color']
    },
    active: {
        type: Boolean,
        default: true
    }
});


ColorVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, ...colorVehiculo} = this.toObject();
    return colorVehiculo;
}

export default model('ColorVehiculo', ColorVehiculoSchema);