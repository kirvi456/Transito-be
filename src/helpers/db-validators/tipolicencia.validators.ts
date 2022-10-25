import TipoLicencia from "../../models/Conductor/tipoLicencia";
import { getErrorMessage } from "../error-messages";

export const TipoLicenciaNoRepetido = async ( tipo : string ) => {
    try{

        const tipoLicencia = await TipoLicencia.findOne( { tipo } ).collation({ locale: 'es', strength: 2 });

        if( tipoLicencia )
            throw new Error(`El tipo de licencia <${ tipo }> ya se encuentra registrado.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteTipoLicencia = async ( id : string ) => {
    try{

        const tipoLicencia = await TipoLicencia.findById( id );

        if( !tipoLicencia )
            throw new Error(`El tipo de licencia no existe.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}