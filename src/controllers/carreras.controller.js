import { pool } from '../db.js'

export const todasCarreras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM carreras')
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

export const insertarCarrera = async (req, res) => {
    try {
        const { area, nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion } = req.body

        //Manejo de error "La carrera ya existe en la tabla"
        const [existing] = await pool.query(`SELECT * FROM carreras WHERE nombre = ?`, [nombre])
        if (existing.length > 0) {
            return res.status(400).json({ "Error": `La carrera ${nombre} ya existe en la tabla.` })
        }
        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO carreras(area, nombre, descripcion, objetivos,
        metas, relprof, empleosasp, duracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [area, nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} carrera`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.sendStatus(500).json({ "Error": ` ${error}` })
    }

}
// idc = Id Carrera
export const actualizarCarrera = async (req, res) => {
    try {
        const { idc, area, nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion } = req.body
        let [result] = await pool.query(`UPDATE carreras SET 
        area = IFNULL(?, area),
        nombre = IFNULL(?, nombre),
        descripcion = IFNULL(?, descripcion),
        objetivos = IFNULL(?, objetivos),
        metas = IFNULL(?, metas),
        relprof = IFNULL(?, relprof),
        empleosasp = IFNULL(?, empleosasp),
        duracion = IFNULL(?, duracion)
        WHERE idcarrera = ?`,
            [area, nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion, idc])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
        }
        else {
            res.json({ "Mensaje: ": ` No existe el registro ${idc}` })
        }
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}
// idc = Id Carrera
export const eliminarCarrera = async (req, res) => {
    try {
        const { idc } = req.body
        let [result] = await pool.query(`DELETE FROM carreras WHERE idcarrera = ?`, [idc])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Carrera eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la carrera con id: ${idc}` })
        }
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}