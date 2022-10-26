import { Schema, model } from 'mongoose';
import usuario from '../usuario';

const ColorVehiculoSchema = new Schema({
    color: {
        type : String,
        required: [true, 'Se debe de especificar el color']
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
        required: [true, 'Se dene especificar quien creo el color']
    }
});


ColorVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, userCreated, createdAt, active, ...colorVehiculo} = this.toObject();
    return colorVehiculo;
}

export default model('ColorVehiculo', ColorVehiculoSchema);