
import { Request, Response } from 'express'
import TipoLicencia from '../../models/Conductor/tipoLicencia';

export const crearTipoLicencia = async ( req : Request, res : Response ) => {

    try{
        
        const { tipo, desc } = req.body;

        const nuevoTipoLicencia = new TipoLicencia({ 
            tipo : tipo.toUpperCase(), 
            desc: desc.toUpperCase()
        });

        await nuevoTipoLicencia.save();

        res.json( nuevoTipoLicencia );

    } catch ( error ) {
        console.log( error )
        res.status( 500 ).json({ msg: 'No se pudo crear el tipo de licencia. Contancte con el Administrador. '})
    }
}