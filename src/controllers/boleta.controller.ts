
import { Request, Response } from 'express'
import { formatFinalError, getErrorMessage } from '../helpers/error-messages';
import Boleta from '../models/boleta';
import readXlsxFile from 'read-excel-file/node';
import fs from 'fs'
import path from 'path';
import { subirArchivo } from '../helpers/subir-archivo';
import { BuscarTipoPlaca } from '../helpers/db-validators/tipoPlaca.validator';
import { BuscarArticulo } from '../helpers/db-validators/articulo.validator';
import { BuscarAgente } from '../helpers/db-validators/agente.validators';

const formatearAgente = ( agenteNo : string ) : string => {
    if(agenteNo.length === 1 ) return '00' + agenteNo;
    if(agenteNo.length === 2 ) return '0' + agenteNo;
    if(agenteNo.length === 3 ) return '' + agenteNo;
    return '000';
}


export const createFromFile = async ( req : Request, res : Response ) => {
    try{


        const archivo = path.join(
            __dirname,
            '../uploads/exceltmp',
            await subirArchivo( req.files!, 'excel', '/exceltmp/', '' )
        )

        let contador = 0;

        readXlsxFile(archivo, {dateFormat: 'dd/mm/yy'})
        .then((rows) => {
            rows.forEach( async( row : any ) => {
                const noboleta = row[0];
                const fecha = (new Date(row[1].toString())).getTime();
                const nombre = row[2].toString();
                const tipoPlacaString = row[3].toString().split('-')[0];
                const noPlaca = row[3].toString().split('-')[1];
                const agenteStr = formatearAgente(row[4].toString());
                const articuloStr = row[5].toString().replace(' ', '.');
                const valor = Number(row[6].toString().replace('Q.','').replace('.00',''));

                const tipoPlaca = await BuscarTipoPlaca( tipoPlacaString );

                const articulo = await BuscarArticulo(articuloStr)

                const agente = await BuscarAgente( agenteStr )

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

                contador++;
                nuevaBoleta.save();

            })    
            
            
        })
        .then( () => {
            res.json({msg: 'Boletas procesadas: ' + contador })
        })
        
    } catch ( error ) {
        console.log(error)
        res.status(400).json({error: 'error'})
    }
}

export const createFromFileFake = async ( req : Request, res : Response ) => {
    try{


        const archivo = path.join(
            __dirname,
            '../uploads/exceltmp',
            await subirArchivo( req.files!, 'excel', '/exceltmp/', '' )
        )

        let contador = 0;

        readXlsxFile(archivo, {dateFormat: 'dd/mm/yy'})
        .then((rows) => {
            rows.forEach( async( row : any ) => {
                const noboleta = row[0];
                const fecha = (new Date(row[1].toString())).getTime();
                const nombre = row[2].toString();
                const tipoPlacaString = row[3].toString().split('-')[0];
                const noPlaca = row[3].toString().split('-')[1];
                const agenteStr = formatearAgente(row[4].toString());
                const articuloStr = row[5].toString().replace(' ', '.');
                const valor = Number(row[6].toString().replace('Q.','').replace('.00',''));

                const tipoPlaca = await BuscarTipoPlaca( tipoPlacaString );

                const articulo = await BuscarArticulo(articuloStr)

                const agente = await BuscarAgente( agenteStr )

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

                contador++;

            })    
            
            
        })
        .then( () => {
            res.json({msg: 'Boletas procesadas: ' + contador })
        })
        
    } catch ( error ) {
        console.log(error)
        res.status(400).json({error: 'error'})
    }
}

export const crearBoleta = async ( req : Request, res : Response ) => {

    try{
        
        const { noboleta, fecha, conductor, vehiculo, agente, articulo } = req.body;

        const nuevaBoleta = new Boleta({ 
            noboleta, 
            fecha, 
            conductor, 
            vehiculo,
            agente, 
            articulo
        });

        await nuevaBoleta.save();

        res.json( nuevaBoleta );

    } catch ( error ) {
        res
        .status(500)
        .json(formatFinalError(error, 'No se pudo crear la boleta. Contancte con el Administrador. '))
    }
}