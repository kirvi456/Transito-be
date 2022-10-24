import { Schema, model } from 'mongoose';
import usuario from './usuario';

const TipoPlacaSchema = new Schema({
    tipo: {
        type: String,
        required: [true, 'Se debe especificar el tipo de placa'],
        unique: [true, 'Ya existe este rubro registrado']
    },    
    desc: {
        type: String,
        required: [true, 'Se debe especificar la descripción'],
    },    
    active:{
        type: Boolean,
        required: true,
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
})

TipoPlacaSchema.methods.toJSON = function() {
    const {__version, __v, createdAt, userCreated, ...tipoPlaca} = this.toObject();
    return tipoPlaca;
}


export default model('TipoPlaca', TipoPlacaSchema)