import { Router } from 'express'
import { check } from 'express-validator';
import { obtenerConductor } from '../controllers/Conductor/conductor.controller';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        check('tipoLicencia', 'Se debe especificar el tipo de licencia').not().isEmpty(),
        check('tipoLicencia', 'Se debe especificar el tipo de licencia').isMongoId(),
        check('noLicencia', 'Se debe especificar el número de licencia').not().isEmpty(),
        validarCampos
    ],
    obtenerConductor
)

export default router;