import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Articulo from '../models/articulo';

export const crearArticulo = async ( req : Request, res : Response ) => {

    try{
        
        const { desc, no, valor } = req.body;

        const nuevoArticulo = new Articulo({ 
            desc, 
            no : no.toUpperCase(), 
            valor,
            userCreated : req.currentUser 
        });

        await nuevoArticulo.save();

        res.json( nuevoArticulo );

    } catch ( error ) {

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear el agente. Contancte con el Administrador. '))
    }
}