//Rutas para el manejo de publicaciones (PDF) y sus portadas
import {Router} from 'express'
import { subirPublicacion, asignarPortada, borrarPublicacion } from '../controllers/publicaciones.controller.js'

const router =  Router()

//Ruta para subir una publicacion (solo con el pdf y sus campos: nombre, categoria y fecha)
router.post('/subir', subirPublicacion)

//Ruta para asignar y subir una portada a una publicacion
router.post('/asignarportada', asignarPortada)

//Ruta para eliminar una publicacion y sus archivos enlazados mediante su id
router.delete('/borrar', borrarPublicacion)


export default router