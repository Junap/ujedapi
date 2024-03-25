//En este archivo se encuentran las definiciones de las rutas para la tabla de maestros
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /maestros
//ejemplo: localhost:3000/maestros/obtener

import { Router } from 'express'
import { actualizarMaestro, eliminarMaestro, insertarMaestro, todosMaestros } from '../controllers/maestros.controller.js'

const router = Router();

router.get('/obtener', todosMaestros)

router.post('/insertar', insertarMaestro)

router.patch('/actualizar', actualizarMaestro)

router.delete('/eliminar', eliminarMaestro)

export default router