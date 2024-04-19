//Rutas para el manejo de escuelas
import {Router} from 'express'
import {insertarEscuela, eliminarEscuela, actualizarEscuela} from '../controllers/escuelas.controller.js'


const router = Router()

router.post('/insertar', insertarEscuela)

router.patch('/actualizar', actualizarEscuela)

router.delete('/eliminar', eliminarEscuela)



export default router