import TipoFirma from "../../models/Conductor/tipoFirma";
import { getErrorMessage } from "../error-messages";

export const TipoFirmaNoRepetido = async ( tipo : string ) => {
    try{

        const tipoFirma = await TipoFirma.findOne( { tipo } ).collation({ locale: 'es', strength: 2 });

        if( tipoFirma )
            throw new Error(`El tipo de firma <${ tipo }> ya se encuentra registrado.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteTipoFirma = async ( id : string ) => {
    try{

        const tipoFirma = await TipoFirma.findById( id );

        if( !tipoFirma )
            throw new Error(`El tipo de firma no existe.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}