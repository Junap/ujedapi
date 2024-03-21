//En este archivo se encuentran las definiciones de las rutas para la tabla de alumnos
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /alumnos
//ejemplo: localhost:3000/alumnos/obtener

import {Router} from 'express'
import{actualizarAlumno, eliminarAlumno, insertarAlumno, todosAlumnos} from '../controllers/alumnos.controller.js'

const router = Router();

router.get('/obtener', todosAlumnos)

router.post('/insertar', insertarAlumno)

router.patch('/actualizar', actualizarAlumno)

router.delete('/eliminar',eliminarAlumno)

export default router