import { Schema, model } from 'mongoose';

const BoletaFakeSchema = new Schema({
    noboleta:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    fecha:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    infractor:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    placa:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    agente:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    articulo:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    monto:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
});

export default model('BoletaFake', BoletaFakeSchema);