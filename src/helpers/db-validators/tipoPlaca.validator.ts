import TipoPlaca from "../../models/tipoPlaca";
import { getErrorMessage } from "../error-messages";

export const TipoPlacaNoRepetido = async ( tipoPlaca : string ) => {
    try{

        const tipo = await TipoPlaca.findOne( { tipo: tipoPlaca } ).collation({ locale: 'es', strength: 2 });

        if( tipo )
            throw new Error(`El tipo de placa <${ tipoPlaca }> ya se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const BuscarTipoPlaca = async ( tipoPlaca : string ) => {
    try{

        const tipo = await TipoPlaca.findOne( { tipo: tipoPlaca } ).collation({ locale: 'es', strength: 2 });

        if( !tipo )
            throw new Error(`El tipo de placa <${ tipoPlaca }> no se encuentra registrado`)
        return tipo._id;
    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const TipoPlacaExiste = async ( id : string ) => {
    try{

        const tipo = await TipoPlaca.findById( id );

        if( tipo )
            throw new Error(`El tipo de placa no se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}