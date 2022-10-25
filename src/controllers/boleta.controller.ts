
import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Boleta from '../models/boleta';

export const crearBoleta = async ( req : Request, res : Response ) => {

    try{
        
        const { noboleta, fecha, conductor, agente, articulo } = req.body;

        const nuevaBoleta = new Boleta({ 
            noboleta, fecha, conductor, agente, articulo
        });

        await nuevaBoleta.save();

        res.json( nuevaBoleta );

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    }
}