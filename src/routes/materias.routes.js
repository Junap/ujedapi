//En este archivo se encuentran las definiciones de las rutas para la tabla de materias
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /materias
//ejemplo: localhost:3000/materias/obtener

import { Router } from 'express'
import { todasMaterias, insertarMateria, actualizarMateria, eliminarMateria} from '../controllers/materias.controller.js'

const router = Router();

router.get('/obtener', todasMaterias)

router.post('/insertar', insertarMateria)

router.patch('/actualizar', actualizarMateria)

router.delete('/eliminar', eliminarMateria)

export default router