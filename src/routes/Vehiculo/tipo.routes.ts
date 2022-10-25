import { Router } from 'express'
import { check } from 'express-validator';
import { crearTipoVehiculo } from '../../controllers/Vehiculo/tipoVehiculo.controller';
import { TipoVehiculoNoRepetido } from '../../helpers/db-validators/Vehiculo/tipovehiculo.validators';
import validarCampos from '../../middlewares/validar-campos';
import validarJWT from '../../middlewares/validar-jwt';
import { esAdmin } from '../../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        check('tipo', 'Se debe especificar la tipo del vehiculo').not().isEmpty(),
        check('tipo').custom( TipoVehiculoNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearTipoVehiculo
)

export default router;