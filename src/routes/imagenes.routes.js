//Rutas para el manejo de imagenes en bruto (sin relacion alguna)
import {Router} from 'express'
import { borrarFoto, obtenerfotoporID, obtenerfotoporURL, obtenertodasImagenes, subirFoto } from '../controllers/imagenes.controller.js'


const router =  Router()

//Ruta para conseguir el id de una imagen en particular
router.get('/getfotourl', obtenerfotoporURL)

//Ruta para conseguir el url de una imagen en particular
router.get('/getfotoid', obtenerfotoporID)

//Ruta para conseguir todas las imagenes
router.get('/getallimagenes', obtenertodasImagenes)

//Ruta para subir una imagen al servidor (sin asignar)
//Nota: Solo se puede subir una imagen a la vez
router.post('/subirfoto', subirFoto)

//Ruta para eliminar una foto del servidor y o la referencia a la base de datos mediante su id
router.delete('/borrarfoto', borrarFoto)


export default router