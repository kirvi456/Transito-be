import Agente from "../../models/agente";
import { getErrorMessage } from "../error-messages";

export const AgenteNoRepetido = async ( chapa : string ) => {
    try{

        const agente = await Agente.findOne( { chapa } ).collation({ locale: 'es', strength: 2 });

        if( agente )
            throw new Error(`El agente <${ chapa }> ya se encuentra registrado. <${ agente.nombre }>`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteAgente = async ( id : string ) => {
    try{

        const agente = await Agente.findById( id );

        if( !agente )
            throw new Error(`El agente no se encuentra registrado.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}