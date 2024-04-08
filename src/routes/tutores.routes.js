//En este archivo se encuentran las definiciones de las rutas para la tabla de tutores
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /tutores
//ejemplo: localhost:3000/tutores/obtener

import { Router } from 'express'
import { insertarTutor, actualizarTutor, eliminarTutor } from '../controllers/tutores.controller.js'

const router = Router();

router.post('/insertar', insertarTutor)

router.patch('/actualizar', actualizarTutor)

router.delete('/eliminar', eliminarTutor)

export default router