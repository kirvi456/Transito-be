import { Schema, model } from 'mongoose';
import usuario from './usuario';

const ArticuloSchema = new Schema({
    desc: {
        type : String,
        required: [true, 'La descipción del articulo es necesaria']
    },
    no: {
        type: String,
        required: [true, 'El número de articulo es requerido'],
        unique: true
    }, 
    valor: {
        type: Number,
        required: [true, 'Se debe especificar el valor del artículo']
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


ArticuloSchema.methods.toJSON = function() {
    const {__version, __v, ...articulo} = this.toObject();
    return articulo;
}

export default model('Articulo', ArticuloSchema);