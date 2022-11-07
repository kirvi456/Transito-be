import { Router } from 'express'
import { check } from 'express-validator';
import { crearTipoFirma, getTipoFirma } from '../controllers/Conductor/tipoFirma.controller';
import { TipoFirmaNoRepetido } from '../helpers/db-validators/tipofirma.validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    getTipoFirma
)

router.post(
    '/',
    [
        check('tipo', 'Se debe especificar el nombre del agente').not().isEmpty(),
        check('tipo').custom( TipoFirmaNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearTipoFirma
)

export default router;