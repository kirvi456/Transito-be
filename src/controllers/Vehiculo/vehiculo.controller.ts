import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import Vehiculo from '../../models/Vehiculo/Vehiculo';


export const obtenerVehiculo = async ( req : Request, res : Response ) => { 

    try {
        
        const { tipoPlaca, noPlaca } = req.query;

        const vehiculo = await Vehiculo.findOne({ 
            tipoPlaca, 
            noPlaca: (noPlaca as string).toUpperCase().replaceAll(' ', '' ) 
        })

        res.json({result: vehiculo});

    } catch( error ){
        res
        .status(500)
        .json(formatFinalError(error, 'No encontro vehiculo. Contacte con el Administrador.'))
    }

}
