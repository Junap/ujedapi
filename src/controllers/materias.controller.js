import { pool } from '../db.js'

export const todasMaterias = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM materias')
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

//Obtener una materia por su ID
export const unaMateria = async (req, res) => {
    try {
        const { idmateria } = req.body
        const [result] = await pool.query('SELECT * FROM materias WHERE idmateria = ?', [idmateria])
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

export const insertarMateria = async (req, res) => {
    try {
        const { idcarrera, nombre, semestre } = req.body
        //Manejo de materias duplicadas
        const [existing] = await pool.query(`SELECT * FROM materias WHERE idcarrera = ? AND nombre = ? AND semestre = ?`, [idcarrera, nombre, semestre])

        if (existing.length >= 1){
            return res.status(400).json({ "Error": `La Materia ${nombre} en esta carrera ya existe.` })
        }
        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO materias(idcarrera, nombre, semestre) VALUES (?, ?, ?)`,
            [idcarrera, nombre, semestre])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} materia`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarMateria = async (req, res) => {
    try {
        
        const { idmateria, idcarrera, nombre, semestre} = req.body
        const [existing] = await pool.query(`SELECT * FROM materias WHERE idmateria = ?`, [idmateria])

        if (existing.length < 1){
            return res.status(400).json({ "Error": `La Materia no existe.` })
        }

        //Manejo de materias duplicadas
        const [existings] = await pool.query(`SELECT * FROM materias WHERE idmateria = ? AND idcarrera = ? AND nombre = ? AND semestre = ?`, [idmateria, idcarrera, nombre, semestre])

        if (existings.length > 0){
            return res.status(400).json({ "Error": `Los valores que se intentan actualizar son iguales a los anteriores` })
        }
        
        //Insercion de datos
        const [result] = await pool.query(`UPDATE materias SET 
        idcarrera = IFNULL(?, idcarrera), 
        nombre = IFNULL(?, nombre),
        semestre = IFNULL(?, semestre)
        WHERE idmateria = ?`,
            [idcarrera, nombre, semestre, idmateria])
            if (result.affectedRows > 0) {
                res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
            }
            else {
                res.json({ "Mensaje: ": ` No existe la materia.` })
            }
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarMateria = async (req, res) => {
    try {
        const { idmateria } = req.body
        let [result] = await pool.query(`DELETE FROM materias WHERE idmateria = ?`, [idmateria])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Materia eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la materia.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}