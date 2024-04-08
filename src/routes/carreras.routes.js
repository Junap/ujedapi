//En este archivo se encuentran las definiciones de las rutas para la tabla de carreras
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /carreras
//ejemplo: localhost:3000/carreras/obtener

import {Router} from 'express'
import{insertarCarrera, actualizarCarrera, eliminarCarrera} from '../controllers/carreras.controller.js'

const router = Router();

router.post('/insertar', insertarCarrera)

router.patch('/actualizar', actualizarCarrera)

router.delete('/eliminar', eliminarCarrera)

export default router