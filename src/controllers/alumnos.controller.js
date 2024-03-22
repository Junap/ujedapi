import { pool } from '../db.js'

export const todosAlumnos = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM alumnos')
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

export const insertarAlumno = async (req, res) => {
    try {
        const { idcarrera, semestre, matricula, nombre, correo, telefono, horario } = req.body
        //Manejo de errores "El alumno ya existe" y "la carrera no existe"
        const [existings] = await pool.query(`SELECT * FROM alumnos WHERE matricula = ?`, [matricula])
        const [existingc] = await pool.query(`SELECT * FROM carreras WHERE idcarrera = ?`, [idcarrera])

        if (existings.length > 0) {
            return res.status(400).json({ "Error": `El alumno ${nombre} ya existe en la tabla.` })
        }else if(existingc.length < 1){
            return res.status(400).json({ "Error": `La carrera con id ${idcarrera} no existe.` })
        }
        //Insercion de datos
        else{
        const [result] = await pool.query(`INSERT INTO alumnos(idcarrera, semestre, matricula, nombre,
        correo, telefono, horario) VALUES (IFNULL(?, NULL), ?, ?, ?, ?, ?, IFNULL(?, NULL))`,
            [idcarrera, semestre, matricula, nombre, correo, telefono, horario])
             res.json({
                "Mensaje: ": `Se ha insertado ${result.affectedRows} alumno`,
                "idnuevo": result.insertId
            })
        }
    } catch (error) {
        //Manejo de otros errores
         return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarAlumno = async (req, res) => {
    try {
        const {idalumno, idcarrera, semestre, matricula, nombre, correo, telefono, horario } = req.body
        let [result] = await pool.query(`UPDATE alumnos SET 
        idcarrera = IFNULL(?, idcarrera),
        semestre = IFNULL(?, semestre),
        matricula = IFNULL(?, matricula),
        nombre = IFNULL(?, nombre),
        correo = IFNULL(?, correo),
        telefono = IFNULL(?, telefono),
        horario = IFNULL(?, horario)
        WHERE idalumno = ?`,
            [idcarrera, semestre, matricula, nombre, correo, telefono, horario, idalumno ])
        if(result.affectedRows >0){
            res.json({"Mensaje: ":" Actualizacion realizada con Exito!"})
        }
        else{
            res.json({"Mensaje: ":` No existe el registro ${idalumno}`})
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarAlumno = async (req, res) => {
    try {
        const { idalumno } = req.body
        let [result] = await pool.query(`DELETE FROM alumnos WHERE idalumno = ?`,[ idalumno ])
        if(result.affectedRows >0){
            res.json({"Mensaje: ":` Alumno eliminado con Exito!`})
        }
        else{
            res.json({"Mensaje: ":` No existe el alumno con id: ${idalumno}`})
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}