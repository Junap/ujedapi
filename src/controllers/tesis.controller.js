import { pool } from '../db.js'

export const todasTesis = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tesis')
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

export const insertarTesis = async (req, res) => {
    try {
        const { idalumno, nombre, generacion, enlace} = req.body

        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO tesis(idalumno, nombre, generacion, enlace) VALUES (?, ?, ?, ?)`,
            [idalumno, nombre, generacion, enlace])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} tesis`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarTesis = async (req, res) => {
    try {
        
        const { idtesis, idalumno, nombre, generacion, enlace} = req.body
        const [existing] = await pool.query(`SELECT * FROM alumnos WHERE idalumno = ?`, [idalumno])

        if (existing.length < 1){
            return res.status(400).json({ "Error": `El Alumno no existe.` })
        }

        //Insercion de datos
        const [result] = await pool.query(`UPDATE tesis SET 
        idalumno = IFNULL(?, idalumno), 
        nombre = IFNULL(?, nombre),
        generacion = IFNULL(?, generacion),
        enlace = IFNULL(?, enlace)
        WHERE idtesis = ?`,
            [idalumno, nombre, generacion, enlace, idtesis])
            if (result.affectedRows > 0) {
                res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
            }
            else {
                res.json({ "Mensaje: ": ` No existe la tesis.` })
            }
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarTesis = async (req, res) => {
    try {
        const { idtesis } = req.body
        let [result] = await pool.query(`DELETE FROM tesis WHERE idtesis = ?`, [idtesis])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Tesis eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la tesis.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}