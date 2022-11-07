
import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import TipoLicencia from '../../models/Conductor/tipoLicencia';

export const getTipoLicencia = async ( req : Request, res : Response ) => {
    try{

        const firmas = await TipoLicencia.find({active: true});

        res.json({ result: firmas });

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener las licencias. Contancte con el Administrador. '))
    }
}

export const crearTipoLicencia = async ( req : Request, res : Response ) => {

    try{
        
        const { tipo, desc } = req.body;

        const nuevoTipoLicencia = new TipoLicencia({ 
            tipo : tipo.toUpperCase(), 
            desc: desc.toUpperCase(), 
            userCreated: req.currentUser
        });

        await nuevoTipoLicencia.save();

        res.json( nuevoTipoLicencia );

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear las licencias. Contancte con el Administrador. '))
    }
}