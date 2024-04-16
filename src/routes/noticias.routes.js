//En este archivo se encuentran las definiciones de las rutas para la tabla de noticias
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /noticias
//ejemplo: localhost:3000/noticias/obtener
import {Router} from 'express'
import { actualizarNoticia, eliminarNoticia, insertarNoticia, todasNoticias, unaNoticia, unaNoticiaTitulo } from '../controllers/noticias.controller.js'


const router =  Router()

//Obtener noticia por id
router.get('/obtener', unaNoticia)

//Obtener todas las noticias
router.get('/obtenertodas', todasNoticias)

//Obtener noticia por su titulo
router.get('/obtenerxtitulo', unaNoticiaTitulo)

//Insertar una noticia
router.post('/insertar', insertarNoticia)

//Actualizar una noticia
router.patch('/actualizar', actualizarNoticia)

//Eliminar noticia por id
router.delete('/eliminar', eliminarNoticia)



export default router