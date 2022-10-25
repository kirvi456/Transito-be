
import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import MarcaVehiculo from '../../models/Vehiculo/MarcaVehiculo';

export const crearMarcaVehiculo = async ( req : Request, res : Response ) => {

    try{
        
        const { marca } = req.body;

        const nuevoMarcaVehiculo = new MarcaVehiculo({ 
            marca : marca.toUpperCase()
        });

        await nuevoMarcaVehiculo.save();

        res.json( nuevoMarcaVehiculo );

    } catch ( error ) {
        console.log( error )
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la marca. Contancte con el Administrador. '))
    }
}