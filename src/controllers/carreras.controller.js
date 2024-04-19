import { pool } from '../db.js'

//Obtener todas las Carreras
export const todasCarreras = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM carreras')
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Obtener una carrera por su ID
export const unaCarrera = async (req, res) => {
    try {
       const { idcarrera } = req.body;
        const [result] = await pool.query('SELECT * FROM carreras WHERE idcarrera = ?',[idcarrera])
        if (result.length===0){
            return res.status(400).json({ "Error": `La carrera no existe.` })
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}


export const insertarCarrera = async (req, res) => {
    try {
        const { nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion } = req.body

        //Manejo de error "La carrera ya existe en la tabla"
        const [existing] = await pool.query(`SELECT * FROM carreras WHERE nombre = ?`, [nombre])
        if (existing.length > 0) {
            return res.status(400).json({ "Error": `La carrera ${nombre} ya existe en la tabla.` })
        }
        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO carreras(nombre, descripcion, objetivos,
        metas, relprof, empleosasp, duracion) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [ nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} carrera`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarCarrera = async (req, res) => {
    try {
        const { idcarrera, nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion } = req.body
        const [result] = await pool.query(`UPDATE carreras SET 
        nombre = IFNULL(?, nombre),
        descripcion = IFNULL(?, descripcion),
        objetivos = IFNULL(?, objetivos),
        metas = IFNULL(?, metas),
        relprof = IFNULL(?, relprof),
        empleosasp = IFNULL(?, empleosasp),
        duracion = IFNULL(?, duracion)
        WHERE idcarrera = ?`,
            [ nombre, descripcion, objetivos, metas, relprof, empleosasp, duracion, idcarrera])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
        }
        else {
            res.json({ "Mensaje: ": ` No existe el registro ${idcarrera}` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarCarrera = async (req, res) => {
    try {
        const { idcarrera } = req.body
        const [result] = await pool.query(`DELETE FROM carreras WHERE idcarrera = ?`, [idcarrera])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Carrera eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la carrera con id: ${idcarrera}` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}