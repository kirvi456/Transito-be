import Boleta from "../../models/boleta";
import { getErrorMessage } from "../error-messages";

export const BoletaNoRepetido = async ( noboleta : number ) => {
    try{

        const boleta = await Boleta.findOne( { noboleta } ).collation({ locale: 'es', strength: 2 });

        if( boleta )
            throw new Error(`La boleta <${ noboleta }> ya se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}