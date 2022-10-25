
import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import TipoPlaca from '../models/tipoPlaca';

export const crearTipoPlaca = async ( req : Request, res : Response ) => {

    try{
        
        const { tipoPlaca } = req.body;

        const nuevoTipoPlaca = new TipoPlaca({ 
            tipo : tipoPlaca.toUpperCase(), 
            userCreated: req.currentUser
        });

        await nuevoTipoPlaca.save();

        res.json( nuevoTipoPlaca );

    } catch ( error ) {
        console.log( error )
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear el tipo de placa. Contancte con el Administrador. '))
    }
}