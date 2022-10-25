import { Router } from 'express'
import { check } from 'express-validator';
import { crearColorVehiculo } from '../../controllers/Vehiculo/colorVehiculo.controller';
import { ColorVehiculoNoRepetido } from '../../helpers/db-validators/Vehiculo/colorvehiculo.validators';
import validarCampos from '../../middlewares/validar-campos';
import validarJWT from '../../middlewares/validar-jwt';
import { esAdmin } from '../../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        check('color', 'Se debe especificar el color del vehiculo').not().isEmpty(),
        check('color').custom( ColorVehiculoNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearColorVehiculo
)

export default router;