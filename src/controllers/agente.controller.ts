import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Agente from '../models/agente';

export const obtenerAgentes = async ( req : Request, res : Response ) => { 

    try {
        
        const agentes = await Agente.find({ active: true });

        res.json({ result: agentes });

    } catch( error ){
        res
        .status(500)
        .json(formatFinalError(error, 'No encontro agentes. '))
    }

}

export const crearAgente = async ( req : Request, res : Response ) => {

    try{
        
        const { nombre, chapa, genero } = req.body;

        const nuevoAgente = new Agente({ 
            nombre : nombre.toUpperCase(), 
            chapa : chapa.toUpperCase(), 
            genero : genero.toUpperCase(), 
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