import {Router} from 'express'
import{todasCarreras, insertarCarrera, actualizarCarrera, eliminarCarrera} from '../controllers/carreras.controller.js'

const router = Router();

router.get('/obtener', todasCarreras)

router.post('/insertar', insertarCarrera)

router.patch('/actualizar', actualizarCarrera)

router.delete('/eliminar', eliminarCarrera)

export default router