import { Router } from 'express'
import { check } from 'express-validator';
import { borrarFromFile, crearBoleta, createFromFile, createFromFileFake, obtenerBoletasConductor, obtenerBoletasNoBoleta, obtenerBoletasPublic, obtenerBoletasVehiculo } from '../controllers/boleta.controller';
import { ExisteAgente } from '../helpers/db-validators/agente.validators';
import { ExisteArticulo } from '../helpers/db-validators/articulo.validator';
import { BoletaNoRepetido } from '../helpers/db-validators/boleta.validators';
import { ExisteTipoLicencia } from '../helpers/db-validators/tipolicencia.validators';
import { TipoPlacaExiste } from '../helpers/db-validators/tipoPlaca.validator';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin, tieneRol } from '../middlewares/validar-roles';
import { ExisteMarcaVehiculo } from '../helpers/db-validators/Vehiculo/marcavehiculo.validators';
import { ExisteColorVehiculo } from '../helpers/db-validators/Vehiculo/colorvehiculo.validators';
import { ExisteTipoVehiculo } from '../helpers/db-validators/Vehiculo/tipovehiculo.validators';


const router = Router();

router.get(
    '/public',
    [

    ],
    obtenerBoletasPublic
)

router.get(
    '/boleta',
    [   
        check('noboleta', 'Se debe especificar el número de boleta').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    obtenerBoletasNoBoleta
)

router.get(
    '/conductor',
    [   
        check('nombre', 'Se debe especificar el conductor').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    obtenerBoletasConductor
)


router.get(
    '/vehiculo',
    [   
        check('tipoPlaca', 'Se debe especificar el tipo de placa').not().isEmpty(),
        check('tipoPlaca', 'Se debe especificar el tipo de placa').isMongoId(),
        check('noPlaca', 'Se debe especificar el número de placa').not().isEmpty(),
        validarJWT,
        validarCampos
    ],
    obtenerBoletasVehiculo
)

router.post(
    '/filefake',
    [
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createFromFileFake
)

router.post(
    '/file',
    [
        validarJWT,
        esAdmin,
        validarCampos
    ],
    createFromFile
)

router.delete(
    '/file',
    [
        validarJWT,
        esAdmin,
        validarCampos
    ],
    borrarFromFile
)

router.post(
    '/',
    [
        check('noboleta', 'Se debe especificar el número de la boleta').not().isEmpty(),
        check('noboleta').custom( BoletaNoRepetido ),
        check('fecha', 'Se debe especificar la fecha de la boleta').not().isEmpty(),
        check('agente', 'Se debe especificar el agente').not().isEmpty(),
        check('agente', 'Se debe especificar el agente').isMongoId(),
        check('agente').custom( ExisteAgente ),
        check('articulo', 'Se debe especificar el artículo').not().isEmpty(),
        check('articulo', 'Se debe especificar el artículo').isMongoId(),
        check('articulo').custom( ExisteArticulo ),
        check('firma', 'Se debe especificar el tipo de firma').not().isEmpty(),
        check('firma', 'Se debe especificar el tipo de firma').isMongoId(),

        check('conductor.nombre', 'Se debe especificar el nombre del conductor').not().isEmpty(),
        check('conductor.tipoLicencia', 'Se debe especificar el tipo de licencia').not().isEmpty(),
        check('conductor.tipoLicencia', 'Se debe especificar el tipo de licencia').isMongoId(),
        check('conductor.tipoLicencia').custom( ExisteTipoLicencia ),
        check('conductor.noLicencia', 'Se debe especificar el número de licencia').not().isEmpty(),
        check('conductor.folioLicencia', 'Se debe especificar el folio de licencia').not().isEmpty(),
        check('conductor.licenciaBloqueada', 'Se debe especificar si la licencia no esta bloqueada').not().isEmpty(),
        check('conductor.licenciaBloqueada', 'Se debe especificar si la licencia no esta bloqueada').isBoolean(),
        check('conductor.genero', 'Se debe especificar el genero del conductor').not().isEmpty(),
        
        check('vehiculo.tipoPlaca', 'Se debe especificar el número de placa').not().isEmpty(),
        check('vehiculo.tipoPlaca').custom( TipoPlacaExiste ),
        check('vehiculo.noPlaca', 'Se debe especificar el número de placa').not().isEmpty(),
        check('vehiculo.marca', 'Se debe especificar la marca del vehiculo').not().isEmpty(),
        check('vehiculo.marca').custom( ExisteMarcaVehiculo ),
        check('vehiculo.color', 'Se debe especificar el color del vehiculo').not().isEmpty(),
        check('vehiculo.color').custom( ExisteColorVehiculo ),
        check('vehiculo.tipo', 'Se debe especificar el tipo del vehiculo').not().isEmpty(),
        check('vehiculo.tipo').custom( ExisteTipoVehiculo ),

        
        validarJWT,
        tieneRol(['DIGITADOR', 'ADMIN']),
        validarCampos
    ],
    crearBoleta
)

export default router;