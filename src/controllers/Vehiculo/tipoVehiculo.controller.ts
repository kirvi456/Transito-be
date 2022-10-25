
import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import TipoVehiculo from '../../models/Vehiculo/TipoVehiculo';

export const crearTipoVehiculo = async ( req : Request, res : Response ) => {

    try{
        
        const { tipo } = req.body;

        const nuevoTipoVehiculo = new TipoVehiculo({ 
            tipo : tipo.toUpperCase(), 
            userCreated: req.currentUser
        });

        await nuevoTipoVehiculo.save();

        res.json( nuevoTipoVehiculo );

    } catch ( error ) {
        console.log( error )
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear el tipo. Contancte con el Administrador. '))
    }
}