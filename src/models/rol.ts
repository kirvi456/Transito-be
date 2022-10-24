import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El rol es obligatorio']
    },
    createdAt: {
        type: Number,
        required: [true, 'Se debe definir la fecha de creacion'],
        default: () => ( ( new Date() ).getTime() )
    }
});

export default model('Role', RoleSchema);