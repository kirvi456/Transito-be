import { Router } from 'express'
import { check } from 'express-validator';
import { crearArticulo, obtenerArticulos } from '../controllers/articulo.controller';
import { ArticuloNoRepetido } from '../helpers/db-validators/articulo.validator';
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
    obtenerArticulos
)

router.post(
    '/',
    [
        check('desc', 'Se debe especificar la descripción del artículo').not().isEmpty(),
        check('valor', 'Se debe especificar el valor del artículo').not().isEmpty(),
        check('no', 'Se debe especificar el número del artículo').not().isEmpty(),
        check('no').custom( ArticuloNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearArticulo
)

export default router;