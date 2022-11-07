
import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import ColorVehiculo from '../../models/Vehiculo/ColorVehiculo';


export const obtenerColores = async ( req : Request, res : Response ) => {
    try{

        const colores = await ColorVehiculo.find({active: true});

        res.json({ result: colores });

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo obtener los colores. Contancte con el Administrador. '))
    }
}

export const crearColorVehiculo = async ( req : Request, res : Response ) => {

    try{
        
        const { color } = req.body;

        const nuevoColorVehiculo = new ColorVehiculo({ 
            color : color.toUpperCase(), 
            userCreated: req.currentUser
        });

        await nuevoColorVehiculo.save();

        res.json( nuevoColorVehiculo );

    } catch ( error ) {
        console.log( error )
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la color. Contancte con el Administrador. '))
    }
}