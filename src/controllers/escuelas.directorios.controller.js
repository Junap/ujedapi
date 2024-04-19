//Controlador para la tabla de directorios (que depende de la tabla de escuelas)
import { pool } from '../db.js'

//Obtener los directorios de cierta escuela
export const directoriosEscuela = async (req, res) => {
    try {
        const {idescuela} = req.body
        const [result] = await pool.query('SELECT puesto, nombre FROM directorios WHERE idescuela = ?', [idescuela])
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Insertar un directorio en determinada escuela
export const insertarDirectorio = async (req, res) => {
    try {
       const { idescuela, puesto, nombre } = req.body;
        const [existing] = await pool.query('SELECT * FROM directorios WHERE idescuela = ? AND puesto = ?',[idescuela, puesto])
        if(existing.length > 0){
            return res.status(400).json({ "Error": `La escuela ya tiene un(a) ${puesto}.` })
        }
        else{
        const [result] = await pool.query('INSERT INTO directorios (idescuela, puesto, nombre) VALUES (? , ? , ?)',[idescuela, puesto, nombre])
        if (result.affectedRows > 0){
            return res.status(200).json({ "Mensaje": `Se ha insertado un(a) nuevo(a) ${puesto}.` })
        }
        }
        
        
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Eliminar todos los directorios de una escuela
export const eliminarDirectorios = async (req, res) => {
    try {
       const { idescuela } = req.body;
        const [result] = await pool.query('DELETE FROM directorios WHERE idescuela = ?',[idescuela])
        if (result.affectedRows > 0){
            return res.status(200).json({ "Mensaje": `Se han eliminado los directorios` })
        }else{
            return res.status(400).json({ "Error": `No existen directorios en la escuela.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Eliminar un  directorio de una escuela
export const eliminarPuesto = async (req, res) => {
    try {
       const { idescuela, puesto } = req.body;
        const [result] = await pool.query('DELETE FROM directorios WHERE idescuela = ? AND puesto = ?',[idescuela, puesto])
        if (result.affectedRows > 0){
            return res.status(200).json({ "Mensaje": `Se ha eliminado el puesto ${puesto}` })
        }else{
            return res.status(400).json({ "Error": `No existen registros del puesto ${puesto}` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}