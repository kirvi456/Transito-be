
import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import TipoFirma from '../../models/Conductor/tipoFirma';



export const getTipoFirma = async ( req : Request, res : Response ) => {
    try{

        const firmas = await TipoFirma.find({active: true});

        res.json({ result: firmas });

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener las firmas. Contancte con el Administrador. '))
    }
}

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
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear el tipo de firma. Contancte con el Administrador. '))
    }
}