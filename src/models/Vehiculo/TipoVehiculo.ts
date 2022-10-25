import { Schema, model } from 'mongoose';
import usuario from '../usuario';

const TipoVehiculoSchema = new Schema({
    tipo: {
        type : String,
        required: [true, 'Se debe de especificar el tipo']
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
        required: [true, 'Se dene especificar quien creo el tipo']
    }
});


TipoVehiculoSchema.methods.toJSON = function() {
    const {__version, __v, ...tipoVehiculo} = this.toObject();
    return tipoVehiculo;
}

export default model('TipoVehiculo', TipoVehiculoSchema);