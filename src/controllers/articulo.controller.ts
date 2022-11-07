import { Request, Response } from 'express'
import { formatFinalError } from '../helpers/error-messages';
import Articulo from '../models/articulo';


export const obtenerArticulos = async ( req : Request, res : Response ) => { 

    try {
        
        const articulos = await Articulo.find({ active: true });

        res.json({ result: articulos });

    } catch( error ){
        res
        .status(500)
        .json(formatFinalError(error, 'No encontro articulos. Consulte con el Administrador'))
    }

}

export const crearArticulo = async ( req : Request, res : Response ) => {

    try{
        
        const { desc, no, valor } = req.body;

        const nuevoArticulo = new Articulo({ 
            desc : desc.toUpperCase(), 
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