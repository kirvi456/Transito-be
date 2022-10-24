import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Agente from '../models/agente';

export const crearAgente = async ( req : Request, res : Response ) => {

    try{
        
        const { nombre, chapa, genero } = req.body;

        const nuevoAgente = new Agente({ 
            nombre, 
            chapa : chapa.toUpperCase(), 
            genero, 
            userCreated : req.currentUser 
        });

        await nuevoAgente.save();

        res.json( nuevoAgente );

    } catch ( error ) {

        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear el agente. Contancte con el Administrador. '))
    }
}