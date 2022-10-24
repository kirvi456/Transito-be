import { Router } from 'express'
import { check } from 'express-validator';
import { crearRol } from '../controllers/rol.controller';
import { RolNoRepetido } from '../helpers/db-validators/rol.validators';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        check('nombre', 'Se debe especificar el nombre del rol').not().isEmpty(),
        check('nombre').custom( RolNoRepetido ),
        
        validarCampos
    ],
    crearRol
)

export default router;