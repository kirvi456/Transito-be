import { Router } from 'express'
import { check } from 'express-validator';
import { crearTipoPlaca, obtenerPublic } from '../controllers/tipoPlaca.controller';
import { TipoPlacaNoRepetido } from '../helpers/db-validators/tipoPlaca.validator';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';
import { esAdmin } from '../middlewares/validar-roles';

const router = Router();

router.get('/public',
    [

    ],
    obtenerPublic
)

router.get('/',
    [
        validarJWT,
        validarCampos
    ],
    obtenerPublic
)

router.post(
    '/',
    [
        check('tipoPlaca', 'Se debe especificar el tipo de placa').not().isEmpty(),
        check('tipoPlaca').custom( TipoPlacaNoRepetido ),
        check('desc', 'Se debe especificar la descripcion del tipo de placa').not().isEmpty(),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearTipoPlaca
)

export default router;