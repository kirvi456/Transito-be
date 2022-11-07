import Conductor from "../../models/Conductor/conductor";
import { getErrorMessage } from "../error-messages";

export const BuscarConductor = async ( tipoLicencia : string, noLicencia: string ) => {
    try{

        const conductor = await Conductor.findOne( { 
            tipoLicencia: tipoLicencia.trim(), 
            noLicencia : noLicencia.toUpperCase().replaceAll( ' ', '' )
        });

        return conductor  ? conductor : undefined;

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}