import { Schema, model } from 'mongoose';
import usuario from './usuario';

const AgenteSchema = new Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    chapa: {
        type: String,
        required: [true, 'El número de chapa es requerido'],
        unique: true
    },
    genero: {
        type: String,
        required: [true, 'El genero es requerido'],
    },
    createdAt: {
        type: Number,
        required: true,
        default: () => ( new Date() ).getTime()
    },
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: usuario,
        required: [true, 'Se dene especificar quien creo el agente']
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
});


AgenteSchema.methods.toJSON = function() {
    const {__version, __v, ...agente} = this.toObject();
    return agente;
}

export default model('Agente', AgenteSchema);