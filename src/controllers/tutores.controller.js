import { pool } from '../db.js'

export const todosTutores = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tutorestesis')
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

export const insertarTutor = async (req, res) => {
    try {
        const { idtesis, nombre } = req.body

        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO tutorestesis(idtesis, nombre) VALUES (?, ?)`,
            [idtesis, nombre])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} tutor`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarTutor = async (req, res) => {
    try {

        const { idtesis, nombre, idtutor } = req.body
        const [existing] = await pool.query(`SELECT * FROM tesis WHERE idtesis = ?`, [idtesis])
        console.log(existing)

        if (existing.length < 1) {
            return res.status(400).json({ "Error": `La tesis no existe.` })
        }

        //Insercion de datos
        const [result] = await pool.query(`UPDATE tutorestesis SET 
        idtesis = IFNULL(?, idtesis), 
        nombre = IFNULL(?, nombre)
        WHERE idtutor = ?`,
            [idtesis, nombre, idtutor])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
        }
        else {
            res.json({ "Mensaje: ": ` No existe el tutor.` })
        }
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarTutor = async (req, res) => {
    try {
        const { idtutor } = req.body
        let [result] = await pool.query(`DELETE FROM tutorestesis WHERE idtutor = ?`, [idtutor])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Tutor eliminado con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe el tutor.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}