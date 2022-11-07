import Vehiculo from "../../models/Vehiculo/Vehiculo";
import { getErrorMessage } from "../error-messages";

export const BuscarVehiculo = async ( tipoPlaca : string, noPlaca: string ) => {
    try{

        const vehiculo = await Vehiculo.findOne( { 
            tipoPlaca: tipoPlaca.trim(), 
            noPlaca : noPlaca.toUpperCase().replaceAll( ' ', '' )
        });

        return vehiculo  ? vehiculo : undefined;

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}