import Articulo from "../../models/articulo";
import { getErrorMessage } from "../error-messages";

export const ArticuloNoRepetido = async ( no : string ) => {
    try{

        const articulo = await Articulo.findOne( { no } ).collation({ locale: 'es', strength: 2 });

        if( articulo )
            throw new Error(`El artículo <${ no }> ya se encuentra registrado. <${ articulo.desc }>`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}