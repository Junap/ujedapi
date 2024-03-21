//Punto de entrada de el servidor
//usar comando de prueba para ejecutar: npm run test
import app from './app.js'
import {PORT} from './config.js'

app.listen(PORT)
console.log(`Servidor corriendo en el puerto: ${PORT}`)