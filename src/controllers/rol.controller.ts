import { Request, Response } from 'express'
import Rol from '../models/rol';

export const crearRol = async ( req : Request, res : Response ) => {

    try{
        
        const { nombre } = req.body;

        const nuevoRol = new Rol({nombre});

        await nuevoRol.save();

        res.json( nuevoRol );

    } catch ( error ) {
        res.status( 500 ).json({ msg: 'No se pudo crear el rol. Contancte con el Administrador. '})
    }
}