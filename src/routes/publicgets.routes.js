//En este archivo se encuentran las definiciones de las rutas para TODAS las tablas que contienen informacion Publica para su uso en la pagina
//PARA USAR LAS RUTAS: estar en el metodo GET y usar su prefijo adecuado depende de la tabla de la cual se quiera sacar la informacion
//ejemplo: localhost:3000/tesis/obtener

import {Router} from 'express'
import { todosTutores, unTutor} from '../controllers/tutores.controller.js'
import {todasMaterias, unaMateria} from '../controllers/materias.controller.js'
import {todasCarreras, unaCarrera} from '../controllers/carreras.controller.js'
import {todasTesis, unaTesis} from '../controllers/tesis.controller.js'
import {unaNoticia, todasNoticias, unaNoticiaTitulo} from '../controllers/noticias.controller.js'
import {todasEscuelas, unaEscuela, escuelasporAreayCiudad} from '../controllers/escuelas.controller.js'
import {directoriosEscuela} from '../controllers/escuelas.directorios.controller.js'
import { PublicacionesxCategoria } from '../controllers/publicaciones.controller.js'


const router = Router();

//Obtener noticia por id
router.get('/noticias/obtener', unaNoticia)

//Obtener noticia por su titulo
router.get('/noticias/obtenerxtitulo', unaNoticiaTitulo)

//Obtener todas las noticias
router.get('/noticias/obtenertodas', todasNoticias)

//Obtener todas las carreras
router.get('/carreras/obtener', todasCarreras)

//Ruta para conseguir una sola carrera (requiere su id)
router.get('/carreras/obtener1', unaCarrera)

//Ruta para conseguir todas las escuelas
router.get('/escuelas/obtener', todasEscuelas)

//Ruta para conseguir una sola escuela (requiere su id)
router.get('/escuelas/obtener1', unaEscuela)

//Ruta para conseguir las escuelas en determinada area y ciudad (requiere area y ciudad)
router.get('/escuelas/obtenerAC', escuelasporAreayCiudad)

//Obtener todos los directorios de una escuela determinada
router.get('/escuelas/dir/obtener', directoriosEscuela)

//Ruta para conseguir todas las materias
router.get('/materias/obtener', todasMaterias)

//Ruta para conseguir una sola materia (requiere su id)
router.get('/materias/obtener1', unaMateria)

//Ruta para conseguir todas las tesis
router.get('/tesis/obtener', todasTesis)

//Ruta para conseguir una tesis (requiere su id)
router.get('/tesis/obtener1', unaTesis)

//Ruta para conseguir todos los tutores
router.get('/tutores/obtener', todosTutores)

//Ruta para conseguir un solo tutor (requiere su id)
router.get('/tutores/obtener1', unTutor)

//Ruta para conseguir todas las publicaciones por categoria (requiere la categoria en el req.body)
router.get('/publicaciones/obtener', PublicacionesxCategoria)


export default router