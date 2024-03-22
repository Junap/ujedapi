//En este archivo se encuentran las definiciones de las rutas para la tabla de tesis
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /tesis
//ejemplo: localhost:3000/tesis/obtener

import {Router} from 'express'
import {todasTesis, insertarTesis, actualizarTesis, eliminarTesis} from '../controllers/tesis.controller.js'

const router = Router();

router.get('/obtener', todasTesis)

router.post('/insertar', insertarTesis)

router.patch('/actualizar', actualizarTesis)

router.delete('/eliminar', eliminarTesis)

export default router