import { Router } from 'express'
import { check } from 'express-validator';
import { crearAgente, obtenerAgentes } from '../controllers/agente.controller';
import { AgenteNoRepetido } from '../helpers/db-validators/agente.validators';
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
    obtenerAgentes
)

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del agente').not().isEmpty(),
        check('chapa', 'Se debe especificar la chapa del agente').not().isEmpty(),
        check('genero', 'Se debe especificar el genero del agente').not().isEmpty(),
        check('chapa').custom( AgenteNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearAgente
)

export default router;