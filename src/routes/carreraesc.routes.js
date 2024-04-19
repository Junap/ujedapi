//Rutas para el manejo de las relaciones entre CARRERAS Y ESCUELAS
import {Router} from 'express'
import { selectallcarrerasenEscuela, asignacionPrincipal, BorrarCarreraDeEscuela, BorrarCarreraDeEscuelas, BorrarCarrerasDeEscuela } from '../controllers/carreraesc.controller.js'


const router =  Router()

//Ruta para obtener todas las carreras en determinada escuela
router.get('/obtenerallCE', selectallcarrerasenEscuela)

//Asignar una carrera a una escuela
//Requiere idcarrera e idescuela
router.post('/asignarcarrera', asignacionPrincipal)

//Eliminar carrera de escuela
//Requiere idcarrera e idescuela
router.delete('/eliminarRelacion', BorrarCarreraDeEscuela)

//Eliminar carreras de escuela
//Requiere solo idescuela
router.delete('/eliminarcarrerasE', BorrarCarrerasDeEscuela)

//Eliminar carrera de escuelas
//Requiere solo idcarrera
router.delete('/eliminarcarreraE', BorrarCarreraDeEscuelas)




export default router