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

export const BuscarArticulo = async ( no : string ) => {
    try{

        const articulo = await Articulo.findOne( { no } ).collation({ locale: 'es', strength: 2 });

        if( !articulo )
            throw new Error(`El artículo <${ no }> no se encuentra registrado.`);

        return articulo._id;

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteArticulo = async ( id : string ) => {
    try{

        const articulo = await Articulo.findById( id );

        if( !articulo )
            throw new Error(`El artículo no se encuentra registrado.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}