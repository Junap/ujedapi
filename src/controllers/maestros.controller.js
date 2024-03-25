import { pool } from '../db.js'

export const todosMaestros = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM maestros')
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

export const insertarMaestro = async (req, res) => {
    try {
        const { nombre, telefono, especialidad, horario, turno} = req.body

        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO maestros( nombre, telefono, especialidad, horario, turno) VALUES ( ?, ?, ?, ?, ?)`,
            [ nombre, telefono, especialidad, horario, turno])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} maestro`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarMaestro = async (req, res) => {
    try {
        const { idmaestro, nombre, telefono, especialidad, horario, turno} = req.body

        //Insercion de datos
        const [result] = await pool.query(`UPDATE maestros SET 
        nombre = IFNULL(?, nombre), 
        telefono = IFNULL(?, telefono),
        especialidad = IFNULL(?, especialidad),
        horario = IFNULL(?, horario),
        turno = IFNULL(?, turno)
        WHERE idmaestro = ?`,
            [nombre, telefono, especialidad, horario, turno, idmaestro])
            if (result.affectedRows > 0) {
                res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
            }
            else {
                res.json({ "Mensaje: ": ` No existe el maestro.` })
            }
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarMaestro = async (req, res) => {
    try {
        const { idmaestro } = req.body
        let [result] = await pool.query(`DELETE FROM maestros WHERE idmaestro = ?`, [idmaestro])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Maestro eliminado con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe el maestro.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}