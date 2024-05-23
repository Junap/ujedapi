//Este archivo de rutas es una extension de las rutas para 
//escuelas, el cual maneja los directorios de las mismas
import {Router} from 'express'

import {insertarDirectorio, eliminarDirectorios,
 eliminarPuesto} from '../controllers/escuelas.directorios.controller.js'

const router = Router()

//Inserta un puesto y su nombre en una escuela
router.post('/insertar', insertarDirectorio)

//Elimina todos los directorios de una escuela
router.delete('/eliminartodos', eliminarDirectorios)

//Elimina los campos que coincidan con el puesto proporcionado en la escuela proporcionada
router.delete('/eliminar', eliminarPuesto)

export default router