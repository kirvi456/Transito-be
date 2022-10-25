import { Schema, model } from 'mongoose';
import usuario from '../usuario';

const MarcaVehiculoSchema = new Schema({
    marca: {
        type : String,
        required: [true, 'Se debe de especificar la marca']
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
        required: [true, 'Se dene especificar quien creo la marca']
    }
});


MarcaVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, ...marcaVehiculo} = this.toObject();
    return marcaVehiculo;
}

export default model('MarcaVehiculo', MarcaVehiculoSchema);