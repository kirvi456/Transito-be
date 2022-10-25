import ColorVehiculo from "../../../models/Vehiculo/ColorVehiculo";
import { getErrorMessage } from "../../error-messages";

export const ColorVehiculoNoRepetido = async ( color : string ) => {
    try{

        const colorVehiculo = await ColorVehiculo.findOne( { color } ).collation({ locale: 'es', strength: 2 });

        if( colorVehiculo )
            throw new Error(`La color <${ color }> ya se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteColorVehiculo = async ( id : string ) => {
    try{

        const colorVehiculo = await ColorVehiculo.findById( id );

        if( !colorVehiculo )
            throw new Error(`La color no se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}