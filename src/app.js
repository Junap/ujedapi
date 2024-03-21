//Enrutador principal del servidor

import rutasCarreras from './routes/carreras.routes.js'
import rutasAlumnos from './routes/alumnos.routes.js'
import express from 'express'

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/carreras',rutasCarreras);
app.use('/alumnos',rutasAlumnos);

export default app
