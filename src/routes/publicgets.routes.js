//En este archivo se encuentran las definiciones de las rutas para TODAS las tablas que contienen informacion Publica para su uso en la pagina
//PARA USAR LAS RUTAS: estar en el metodo GET y usar su prefijo adecuado depende de la tabla de la cual se quiera sacar la informacion
//ejemplo: localhost:3000/tesis/obtener

import {Router} from 'express'
import { todosTutores, unTutor} from '../controllers/tutores.controller.js'
import {todasMaterias, unaMateria} from '../controllers/materias.controller.js'
import {todasCarreras, unaCarrera} from '../controllers/carreras.controller.js'
import {todasTesis, unaTesis} from '../controllers/tesis.controller.js'
import {unaNoticia, todasNoticias, unaNoticiaTitulo} from '../controllers/noticias.controller.js'

const router = Router();

//Obtener noticia por id
router.get('/noticias/obtener', unaNoticia)

//Obtener noticia por su titulo
router.get('/noticias/obtenerxtitulo', unaNoticiaTitulo)

//Obtener todas las noticias
router.get('/noticias/obtenertodas', todasNoticias)

//Obtener todas las carreras
router.get('/carreras/obtener', todasCarreras)

router.get('/carreras/obtener1', unaCarrera)

router.get('/materias/obtener', todasMaterias)

router.get('/materias/obtener1', unaMateria)

router.get('/tesis/obtener', todasTesis)

router.get('/tesis/obtener1', unaTesis)

router.get('/tutores/obtener', todosTutores)

router.get('/tutores/obtener1', unTutor)

export default router