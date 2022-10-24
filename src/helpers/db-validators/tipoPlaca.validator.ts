import TipoPlaca from "../../models/tipoPlaca";
import { getErrorMessage } from "../error-messages";

export const TipoPlacaNoRepetido = async ( tipoPlaca : string ) => {
    try{

        const tipo = await TipoPlaca.findOne( { tipo: tipoPlaca } );

        if( tipo )
            throw new Error(`El tipo de placa <${ tipoPlaca }> ya se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}