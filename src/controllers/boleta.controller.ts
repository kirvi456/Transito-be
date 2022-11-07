
import { Request, Response } from 'express'
import { formatFinalError, getErrorMessage } from '../helpers/error-messages';
import Boleta from '../models/boleta';
import Conductor from '../models/Conductor/conductor';
import readXlsxFile from 'read-excel-file/node';
import path from 'path';
import { subirArchivo } from '../helpers/subir-archivo';
import { BuscarTipoPlaca } from '../helpers/db-validators/tipoPlaca.validator';
import { BuscarArticulo } from '../helpers/db-validators/articulo.validator';
import { BuscarAgente } from '../helpers/db-validators/agente.validators';
import { BuscarBoleta } from '../helpers/db-validators/boleta.validators';
import { BuscarConductor } from '../helpers/db-validators/conductor.validators';
import { BuscarVehiculo } from '../helpers/db-validators/vehiculo.validators';
import Vehiculo from '../models/Vehiculo/Vehiculo';

const formatearAgente = ( agenteNo : string ) : string => {
    if(agenteNo.length === 1 ) return '00' + agenteNo;
    if(agenteNo.length === 2 ) return '0' + agenteNo;
    if(agenteNo.length === 3 ) return '' + agenteNo;
    return '000';
}



export const obtenerBoletasPublic = async ( req : Request, res : Response ) => {

    try {

        const { tipoPlaca = '000', noPlaca = '' } = req.query;

        const boletas: any = await Boleta.find({ 
            'vehiculo.tipoPlaca': tipoPlaca,
            'vehiculo.noPlaca': noPlaca,
            estado: 'EMITIDA'
        })
        .populate('firma', 'tipo')
        .populate('agente', 'nombre chapa')
        .populate('articulo', 'no desc valor')
        .populate('conductor.tipoLicencia', 'tipo desc')
        .populate('vehiculo.tipoPlaca', 'tipo')
        .populate('vehiculo.marca', 'marca')
        .populate('vehiculo.color', 'color')
        .populate('vehiculo.tipo', 'tipo')

        res.json({ result : boletas });

    } catch ( error ){
        console.log( error )
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    
    }

}


export const createFromFile = async ( req : Request, res : Response ) => {
    try{


        const archivo = path.join(
            __dirname,
            '../uploads/exceltmp',
            await subirArchivo( req.files!, 'excel', '/exceltmp/', '' )
        )


        readXlsxFile(archivo, {dateFormat: 'dd/mm/yy'})
        .then( ( rows : any[] ) => {

            

                let counter = 0;
            
                const inserts = rows.map( ( row : any ) => {
                    return new Promise( async ( resolve, reject )  => {
                        try {
                            const noboleta = row[0];
                            const fecha = (new Date(row[1].toString())).getTime();
                            const nombre = row[2].toString();
                            const tipoPlacaString = row[3].toString().split('-')[0];
                            const noPlaca = row[3].toString().split('-')[1];
                            const agenteStr = formatearAgente(row[4].toString());
                            const articuloStr = row[5].toString().replace(' ', '.');
                            const valor = Number(row[6].toString().replace('Q.','').replace('.00',''));

                            const tipoPlaca = await BuscarTipoPlaca( tipoPlacaString );
                            if( !tipoPlaca ) 
                                throw new Error('No se encontro tipo de placa ' + tipoPlaca + ' en boleta ' + noboleta);

                            const articulo = await BuscarArticulo(articuloStr);
                            if( !articulo ) 
                                throw new Error('No se encontro ariticulo ' + articulo + ' en boleta ' + noboleta);

                            const agente = await BuscarAgente( agenteStr );
                            if( !agente ) 
                                throw new Error('No se encontro agente ' + agente + ' en boleta ' + noboleta);


                            const firma = '6357f0186052529e73c19e0f';
                            const lugar = 'San José Pinula';

                            const conductor = {
                                nombre,
                                tipoLicencia: '6357f17b6052529e73c19e2f',
                                noLicencia: '0000 00000 0000',
                                folioLicencia: '00',
                                licenciaBloqueada: false,
                                genero: 'SIN ESPECIFICAR'
                            }

                            const vehiculo = {
                                tipoPlaca,
                                noPlaca,
                                marca: '6357fb664df530ce3d80c94c',
                                color: '63580785dc8c3af56994376c',
                                tipo: '63580d9dd02dcd0897f6a1d1',
                                noTarjeta: '00000000',
                                nit: '000000000'
                            }

                            const userCreated = req.currentUser;

                            const nuevaBoleta = new Boleta({ 
                                noboleta, 
                                fecha, 
                                firma,
                                lugar,
                                conductor, 
                                vehiculo,
                                agente, 
                                articulo,
                                userCreated
                            });

                            await nuevaBoleta.save();
                            counter = counter + 1;

                        } catch ( error ){
                            console.log( error )
                            reject( formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
                        }
                        resolve( '' );
                    })    

                })

                Promise.all(inserts)
                .then( () => res.json({msg: 'Boletas registradas'}))
                .catch( ( error ) => { res.status(500).json({ error }) })
            

        })


    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    }
}


export const borrarFromFile = async ( req : Request, res : Response ) => {
    try{


        const archivo = path.join(
            __dirname,
            '../uploads/exceltmp',
            await subirArchivo( req.files!, 'excel', '/exceltmp/', '' )
        )


        readXlsxFile(archivo, {dateFormat: 'dd/mm/yy'})
        .then( (rows : any) => {

            let bar = new Promise( (resolve, reject )  => {

                rows.forEach( async( row : any ) => {
                    try {
                        const noboleta = row[0];
                        

                        await Boleta.findOneAndDelete({ noboleta });



                    } catch ( error ){
                        console.log( error )
                        reject( formatFinalError(error, 'No se pudo borrar la boleta. Contancte con el Administrador. '))
                    }
                })    

                resolve('');
            })

            bar
            .then(( ) => {res.json({msg: 'voletas borradas'})})
            .catch( ( error )=> res.status(500).json(error))

        })


    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    }
}

export const createFromFileFake = async ( req : Request, res : Response ) => {
    try{


        const archivo = path.join(
            __dirname,
            '../uploads/exceltmp',
            await subirArchivo( req.files!, 'excel', '/exceltmp/', '' )
        )


        readXlsxFile(archivo, {dateFormat: 'dd/mm/yy'})
        .then( ( rows : any[] ) => {

            

            
                const inserts = rows.map( ( row : any ) => {
                    return new Promise( async ( resolve, reject )  => {
                        try {
                            const noboleta = row[0];
                            const fecha = (new Date(row[1].toString())).getTime();
                            console.log(row[1])
                            const nombre = row[2].toString();
                            const tipoPlacaString = row[3].toString().split('-')[0];
                            const noPlaca = row[3].toString().split('-')[1];
                            const agenteStr = formatearAgente(row[4].toString());
                            const articuloStr = row[5].toString().replace(' ', '.');
                            const valor = Number(row[6].toString().replace('Q.','').replace('.00',''));


                            const boleta = await BuscarBoleta( noboleta );
                            if( boleta ) 
                                throw new Error('Boleta ya registrada ' + noboleta);


                            const tipoPlaca = await BuscarTipoPlaca( tipoPlacaString );
                            if( !tipoPlaca ) 
                                throw new Error('No se encontro tipo de placa ' + tipoPlaca + ' en boleta ' + noboleta);

                            const articulo = await BuscarArticulo(articuloStr);
                            if( !articulo ) 
                                throw new Error('No se encontro ariticulo ' + articulo + ' en boleta ' + noboleta);

                            const agente = await BuscarAgente( agenteStr );
                            if( !agente ) 
                                throw new Error('No se encontro agente ' + agente + ' en boleta ' + noboleta);


                            const firma = '6357f0186052529e73c19e0f';
                            const lugar = 'San José Pinula';

                            const conductor = {
                                nombre,
                                tipoLicencia: '6357f17b6052529e73c19e2f',
                                noLicencia: '0000 00000 0000',
                                folioLicencia: '00',
                                licenciaBloqueada: false,
                                genero: 'SIN ESPECIFICAR'
                            }

                            const vehiculo = {
                                tipoPlaca,
                                noPlaca,
                                marca: '6357fb664df530ce3d80c94c',
                                color: '63580785dc8c3af56994376c',
                                tipo: '63580d9dd02dcd0897f6a1d1',
                                noTarjeta: '00000000',
                                nit: '000000000'
                            }


                            const nuevaBoleta = new Boleta({ 
                                noboleta, 
                                fecha, 
                                firma,
                                lugar,
                                conductor, 
                                vehiculo,
                                agente, 
                                articulo
                            });


                        } catch ( error ){
                            console.log( error )
                            reject( formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
                        }
                        resolve( '' );
                    })    

                })

                Promise.all(inserts)
                .then( () => res.json({msg: 'Boletas registradas'}))
                .catch( ( error ) => { res.status(500).json({ error }) })
            

        })


    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo borrar la boleta. Contancte con el Administrador. '))
    }
}

export const crearBoleta = async ( req : Request, res : Response ) => {

    try{
        
        const { noboleta, fecha, lugar, firma, conductor, vehiculo, agente, articulo } = req.body;

        const userCreated = req.currentUser;


        // Buscar conductor 
        const conductorEncontrado = await BuscarConductor( conductor.tipoLicencia, conductor.noLicencia );
        // Buscar vehiculo 
        const vehiculoEncontrado = await BuscarVehiculo( vehiculo.tipoPlaca, vehiculo.noPlaca );

        const nuevaBoleta = new Boleta({ 
            noboleta, 
            fecha, 
            conductor: conductorEncontrado ?? conductor, 
            vehiculo: vehiculoEncontrado ?? vehiculo,
            agente, 
            articulo,
            lugar,
            firma,
            userCreated
        });

        // Registrar Conductor si no estaba registrado
        if( !conductorEncontrado && conductor.noLicencia !== 'NO SE CONSIGNO') {
            const nuevoConductor = new Conductor({ 
                ...conductor,
                nombre: conductor.nombre.toUpperCase(),
                noLicencia: conductor.noLicencia.toUpperCase().replaceAll(' ', '' ) ,
            });
            await nuevoConductor.save();
        }

        // Registrar Vehiculo si no estaba registrado
        if( !vehiculoEncontrado ) {
            const nuevoVehiculo = new Vehiculo({ 
                ...vehiculo,
                noPlaca: vehiculo.noPlaca.toUpperCase().replaceAll(' ', '' ) ,
            });
            await nuevoVehiculo.save();
        }

        

        await nuevaBoleta.save();

        res.json( nuevaBoleta );

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    }
}