import { Router } from 'express'
import { check } from 'express-validator';
import { crearBoleta } from '../controllers/boleta.controller';
import { ExisteAgente } from '../helpers/db-validators/agente.validators';
import { ExisteArticulo } from '../helpers/db-validators/articulo.validator';
import { BoletaNoRepetido } from '../helpers/db-validators/boleta.validators';
import { ExisteTipoLicencia } from '../helpers/db-validators/tipolicencia.validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

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
        
        check('conductor.nombre', 'Se debe especificar el nombre del conductor').not().isEmpty(),
        check('conductor.tipoLicencia', 'Se debe especificar el tipo de licencia').not().isEmpty(),
        check('conductor.tipoLicencia', 'Se debe especificar el tipo de licencia').isMongoId(),
        check('conductor.tipoLicencia').custom( ExisteTipoLicencia ),
        check('conductor.noLicencia', 'Se debe especificar el número de licencia').not().isEmpty(),
        check('conductor.folioLicencia', 'Se debe especificar el folio de licencia').not().isEmpty(),
        check('conductor.licenciaBloqueada', 'Se debe especificar si la licencia no esta bloqueada').not().isEmpty(),
        check('conductor.licenciaBloqueada', 'Se debe especificar si la licencia no esta bloqueada').isBoolean(),
        check('conductor.genero', 'Se debe especificar el genero del conductor').not().isEmpty(),
        
        
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearBoleta
)

export default router;