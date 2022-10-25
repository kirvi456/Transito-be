import { Router } from 'express'
import { check } from 'express-validator';
import { crearMarcaVehiculo } from '../../controllers/Vehiculo/marcaVehiculo.controller';
import { MarcaVehiculoNoRepetido } from '../../helpers/db-validators/Vehiculo/marcavehiculo.validators';
import validarCampos from '../../middlewares/validar-campos';
import validarJWT from '../../middlewares/validar-jwt';
import { esAdmin } from '../../middlewares/validar-roles';

const router = Router();

router.post(
    '/',
    [
        check('marca', 'Se debe especificar la marca del vehiculo').not().isEmpty(),
        check('marca').custom( MarcaVehiculoNoRepetido ),
        validarJWT,
        esAdmin,
        validarCampos
    ],
    crearMarcaVehiculo
)

export default router;