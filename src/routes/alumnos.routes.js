import {Router} from 'express'
import{actualizarAlumno, eliminarAlumno, insertarAlumno, todosAlumnos} from '../controllers/alumnos.controller.js'

const router = Router();

router.get('/obtener', todosAlumnos)

router.post('/insertar', insertarAlumno)

router.patch('/actualizar', actualizarAlumno)

router.delete('/eliminar',eliminarAlumno)

export default router