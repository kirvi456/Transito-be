import { Router } from 'express'
import { check } from 'express-validator';
import { obtenerVehiculo } from '../controllers/Vehiculo/vehiculo.controller';
import validarCampos from '../middlewares/validar-campos';
import validarJWT from '../middlewares/validar-jwt';

const router = Router();

router.get(
    '/',
    [
        validarJWT,
        check('tipoPlaca', 'Se debe especificar el tipo de placa').not().isEmpty(),
        check('tipoPlaca', 'Se debe especificar el tipo de placa').isMongoId(),
        check('noPlaca', 'Se debe especificar el número de placa').not().isEmpty(),
        validarCampos
    ],
    obtenerVehiculo
)

export default router;