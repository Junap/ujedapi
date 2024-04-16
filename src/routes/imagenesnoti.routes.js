//Rutas para el manejo las RELACIONES entre Noticias y sus imagenes
import {Router} from 'express'
import { asignacionPrincipal, borrarNoticiadeIMAGEN, borrarNoticiasdeIMAGEN, borrarfotodeNoticia, borrarfotosdeNoticia, selectallfotosenNoticia } from '../controllers/imgenesnoti.controller.js'

const router = Router()

//Ruta para obtener todas las fotos que aparecen en cierta noticia
router.get('/obtenerfotosN', selectallfotosenNoticia)

//Ruta para asignar una imagen determinada con una noticia determinada
router.post('/asignarfoto', asignacionPrincipal)

//Eliminar la relacion entre determinada noticia a UNA imagen (se debe incluir un campo "principal" booleano para determinar si se elimina la principal o otra)
router.delete('/eliminarenlaceN', borrarfotodeNoticia)

//Eliminar la relacion entre determinada noticia a TODAS sus imagenes
router.delete('/eliminarenlacesN', borrarfotosdeNoticia)

//Eliminar la relacion entre determinada imagen y determinada Noticia
router.delete('/eliminarenlaceI', borrarNoticiadeIMAGEN)

//Eliminar la relacion entre determinada imagen y TODAS las noticias donde aparezca
router.delete('/eliminarenlacesI', borrarNoticiasdeIMAGEN)

export default router