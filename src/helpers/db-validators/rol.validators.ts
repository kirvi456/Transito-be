import Rol from "../../models/rol";
import { getErrorMessage } from "../error-messages";

export const RolNoRepetido = async ( nombre : string ) => {
    try{

        const rol = await Rol.findOne( { nombre } );

        if( rol )
            throw new Error(`El rol <${ nombre }> ya se encuentra registrado`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}