//Punto de entrada de el servidor
//usar comando para ejecutar: npm run start
import app from './app.js'
import {PORT} from './config.js'

app.listen(PORT)
console.log(`Servidor corriendo en el puerto: ${PORT}`)