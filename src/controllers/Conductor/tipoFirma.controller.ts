
import { Request, Response } from 'express'
import TipoFirma from '../../models/Conductor/tipoFirma';

export const crearTipoFirma = async ( req : Request, res : Response ) => {

    try{
        
        const { tipo } = req.body;

        const nuevoTipoFirma = new TipoFirma({ 
            tipo : tipo.toUpperCase(), 
            userCreated: req.currentUser
        });

        await nuevoTipoFirma.save();

        res.json( nuevoTipoFirma );

    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json({ msg: 'No se pudo crear el tipo de firma. Contancte con el Administrador. '})
    }
}