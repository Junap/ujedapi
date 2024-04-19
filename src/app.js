//Enrutador principal del servidor
import session from 'express-session'
import express from 'express'
import rutasPublicas from './routes/publicgets.routes.js'
import login from './login.js'
import rutasCarreras from './routes/carreras.routes.js'
import rutasAlumnos from './routes/alumnos.routes.js'
import rutasTesis from './routes/tesis.routes.js'
import rutasTutores from './routes/tutores.routes.js'
import rutasMaestros from './routes/maestros.routes.js'
import rutasMaterias from './routes/materias.routes.js'
import rutasImagenes from './routes/imagenes.routes.js'
import rutasNoticias from './routes/noticias.routes.js'
import rutasRelacionesN from './routes/imagenesnoti.routes.js'
import rutasEscuelas from './routes/escuelas.routes.js'
import rutasRelacionesCr from './routes/carreraesc.routes.js'
import rutasEscuelasDirectorios from './routes/escuelas.directorios.routes.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PATCH", "DELETE"],
    credentials: true
}))

app.use(session({
    secret: 'X^_o7XN-N)g=1)f$wCWUmyY2}Xg6&Bq7[AyDSrOqXAe{K!tL1u',
    resave: false,
    saveUninitialized: true,
    cookie: {
        name: 'UJED',
        //Path por defecto a donde se enviara al cliente cuando exista la sesion
        path: '/',
        maxAge: 5 * 60 * 60 * 1000
    }
}));

app.use('/uploads', express.static('./src/uploads',))
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Usa de la logica del inicio de sesion
app.use(login);

//Rutas para el publico general
app.use(rutasPublicas);

//Funcion interceptadora
function isAuthenticated (req, res, next){
    //console.log(req.session);
    if (req.session.user) next()
    //Si el usuario no ha iniciado sesion se redigira a el siguiente endpoint (Ejecutar aqui el redireccionamiento a una pagina de log-in/register)
    else return res.send("Inicia sesion por favor")
    //res.redirect('/login')
};

//Uso de la funcion para autenticar la sesion del usuario
app.use(isAuthenticated);

app.use('/admin/relescuelas',rutasRelacionesCr);
app.use('/admin/escuelas',rutasEscuelas)
app.use('/admin/escuelas/dir',rutasEscuelasDirectorios)
app.use('/admin/noticias',rutasNoticias)
app.use('/admin/relnotis',rutasRelacionesN)
app.use('/admin/imagenes', rutasImagenes);
app.use('/admin/carreras',rutasCarreras);
app.use('/admin/alumnos',rutasAlumnos);
app.use('/admin/tesis',rutasTesis);
app.use('/admin/tutores', rutasTutores);
app.use('/admin/maestros', rutasMaestros);
app.use('/admin/materias', rutasMaterias);

export default app
