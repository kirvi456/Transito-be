import { Request, Response } from 'express'
import { formatFinalError } from '../../helpers/error-messages';
import Conductor from '../../models/Conductor/conductor'


export const obtenerConductor = async ( req : Request, res : Response ) => { 

    try {
        
        const { tipoLicencia, noLicencia } = req.query;

        const conductor = await Conductor.findOne({ 
            tipoLicencia, 
            noLicencia: (noLicencia as string).toUpperCase().replaceAll(' ', '' ) 
        })

        res.json({result: conductor});

    } catch( error ){
        res
        .status(500)
        .json(formatFinalError(error, 'No encontro conductor. '))
    }

}
