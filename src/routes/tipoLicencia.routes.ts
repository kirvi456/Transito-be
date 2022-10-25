import { Router } from 'express'
import { check } from 'express-validator';
import { crearTipoLicencia } from '../controllers/Conductor/tipoLicencia.controller';
import { TipoLicenciaNoRepetido } from '../helpers/db-validators/tipolicencia.validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        check('tipo', 'Se debe especificar el nombre del agente').not().isEmpty(),
        check('desc', 'Se debe especificar la chapa del agente').not().isEmpty(),
        check('tipo').custom( TipoLicenciaNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearTipoLicencia
)

export default router;