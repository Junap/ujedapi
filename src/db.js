//Archivo de configuraciones para la base de datos

import mysql from 'mysql2/promise'
import {DB_DATABASE,DB_HOST,DB_PASSWORD,DB_PORT,DB_USER} from './config.js'

export const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE,
    waitForConnections: true,
})