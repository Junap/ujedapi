//En este archivo se encuentran las definiciones de las rutas para la tabla de noticias
//PARA USAR LAS RUTAS: estar en el metodo adecuado y poner el prefijo /noticias
//ejemplo: localhost:3000/noticias/obtener
import {Router} from 'express'
import { actualizarNoticia, eliminarNoticia, insertarNoticia } from '../controllers/noticias.controller.js'


const router =  Router()


//Insertar una noticia
router.post('/insertar', insertarNoticia)

//Actualizar una noticia
router.patch('/actualizar', actualizarNoticia)

//Eliminar noticia por id
router.delete('/eliminar', eliminarNoticia)



export default router