import TipoVehiculo from "../../../models/Vehiculo/TipoVehiculo";
import { getErrorMessage } from "../../error-messages";

export const TipoVehiculoNoRepetido = async ( tipo : string ) => {
    try{

        const tipoVehiculo = await TipoVehiculo.findOne( { tipo } ).collation({ locale: 'es', strength: 2 });

        if( tipoVehiculo )
            throw new Error(`El tipo <${ tipo }> ya se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteTipoVehiculo = async ( id : string ) => {
    try{

        const tipoVehiculo = await TipoVehiculo.findById( id );

        if( !tipoVehiculo )
            throw new Error(`El tipo no se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}