import MarcaVehiculo from "../../../models/Vehiculo/MarcaVehiculo";
import { getErrorMessage } from "../../error-messages";

export const MarcaVehiculoNoRepetido = async ( marca : string ) => {
    try{

        const marcaVehiculo = await MarcaVehiculo.findOne( { marca } ).collation({ locale: 'es', strength: 2 });

        if( marcaVehiculo )
            throw new Error(`La marca <${ marca }> ya se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}

export const ExisteMarcaVehiculo = async ( id : string ) => {
    try{

        const marcaVehiculo = await MarcaVehiculo.findById( id );

        if( !marcaVehiculo )
            throw new Error(`La marca no se encuentra registrada.`)

    } catch ( error ) {        
        console.log( error );
        throw new Error( getErrorMessage(error) );
    }
}