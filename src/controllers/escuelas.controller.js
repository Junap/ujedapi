import { pool } from '../db.js'

//Obtener todas las Escuelas
export const todasEscuelas = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM escuelas')
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Obtener una escuela por su ID
export const unaEscuela = async (req, res) => {
    try {
       const { idescuela } = req.body;
        const [result] = await pool.query('SELECT * FROM escuelas WHERE idescuela = ?',[idescuela])
        if (result.length===0){
            return res.status(400).json({ "Error": `La escuela no existe.` })
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

//Obtener escuelas por su AREA (para mostrar en la pagina principal)
export const escuelasporAreayCiudad = async (req, res) => {
    try {
       const { area, ciudad } = req.body;
        const [result] = await pool.query('SELECT idescuela, area, nombre, abreviatura FROM escuelas WHERE area = ? AND ciudad = ? ORDER BY area',[area, ciudad])
        if (result.length===0){
            return res.status(400).json({ "Error": `El area no existe o no hay escuelas en el area.` })
        }
        res.json(result)
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}


export const insertarEscuela = async (req, res) => {
    try {
        const { ciudad, area, nombre, abreviatura, descripcion, direccion, 
        urlmapa, urlweb, contacto, mision, vision, objetivos, bolsatrabajo, urlbotr, servicios } = req.body

        //Manejo de error "La escuela ya existe en la tabla"
            const [existingc] = await pool.query(`SELECT * FROM escuelas WHERE abreviatura = ? AND ciudad = ?`, [abreviatura, ciudad])
            if (existingc.length === 1){
                return res.status(400).json({ "Error": `La escuela con sede en ${ciudad}: ${abreviatura} ya existe en la tabla.` })
            }
            else{
                const [existing] = await pool.query(`SELECT * FROM escuelas WHERE abreviatura = ?`, [abreviatura])
            if (existing.length === 1){
                return res.status(400).json({ "Error": `La escuela con abreviatura: ${abreviatura} ya existe en la tabla.` })
            }else{
                //Insercion de datos
                const [result] = await pool.query(`INSERT INTO escuelas(ciudad, area, nombre, abreviatura,
                    descripcion, direccion, urlmapa, urlweb, contacto, mision, vision, objetivos, bolsatrabajo,
                    urlbotr, servicios) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [ciudad, area, nombre, abreviatura, descripcion, direccion, urlmapa, urlweb, contacto,
                    mision, vision, objetivos, bolsatrabajo, urlbotr, servicios])
                    res.json({
                        "Mensaje: ": `Se ha insertado ${result.affectedRows} escuela`,
                        "idnuevo": result.insertId
                    })
                    }
            }  
    
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

export const actualizarEscuela = async (req, res) => {
    try {
        const { idescuela, ciudad, area, nombre, abreviatura, descripcion, direccion, 
        urlmapa, urlweb, contacto, mision, vision, objetivos, bolsatrabajo, urlbotr, servicios } = req.body

        //Verificacion de existencia
        const [existing] = await pool.query(`SELECT * FROM escuelas WHERE idescuela = ?`, [idescuela])

        if (existing.length < 1) {
            return res.status(400).json({ "Error": `La Escuela no existe.` })
        }
        //Manejo de datos iguales
        const [existingn] = await pool.query(`SELECT * FROM escuelas WHERE 
        idescuela = ? 
        AND ciudad = ? AND area = ? AND nombre = ? AND abreviatura = ? AND IFNULL(descripcion, '') = IFNULL(?, '') AND IFNULL(direccion, '') = IFNULL(?, '')
        AND urlmapa = ? AND IFNULL(urlweb, '') = IFNULL(?, '') AND contacto = ? AND mision = ? AND vision = ? AND IFNULL(objetivos, '') = IFNULL(?, '')
        AND IFNULL(bolsatrabajo, '') = IFNULL(?, '') AND IFNULL(urlbotr, '') = IFNULL(?, '') AND IFNULL(servicios, '') = IFNULL(?, '')`, 
        [idescuela, ciudad, area, nombre, abreviatura, descripcion, direccion, urlmapa, urlweb, contacto, mision, vision,
        objetivos, bolsatrabajo, urlbotr, servicios])

        if (existingn.length > 0) {
            return res.status(400).json({ "Error": `Los valores que se intentan actualizar son los mismos que los actuales` })
        }
        else{
        //Si la abreviatura de la actual escuela es el mismo, insertar sin problema
        const [existingt] = await pool.query(`SELECT * FROM escuelas WHERE abreviatura = ? AND idescuela = ?`, [abreviatura, idescuela])
        if (existingt.length === 1){
                //Insercion de datos
            const [result] = await pool.query(`UPDATE escuelas SET 
            ciudad = IFNULL(?, ciudad), 
            area = IFNULL(?, area),
            nombre = IFNULL(?, nombre),
            abreviatura = IFNULL(?, abreviatura),
            descripcion = IFNULL(?, descripcion),
            direccion = IFNULL(?, direccion),
            urlmapa = IFNULL(?, urlmapa),
            urlweb = IFNULL(?, urlweb),
            contacto = IFNULL(?, contacto),
            mision = IFNULL(?, mision),
            vision = IFNULL(?, vision),
            objetivos = IFNULL(?, objetivos),
            bolsatrabajo = IFNULL(?, bolsatrabajo),
            urlbotr = IFNULL(?, urlbotr),
            servicios = IFNULL(?, servicios)
            WHERE idescuela = ?`,
            [ ciudad, area, nombre, abreviatura, descripcion, direccion, urlmapa, urlweb, contacto, mision, vision,
            objetivos, bolsatrabajo, urlbotr, servicios, idescuela])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la escuela.` })
        }
        }else{
            //Manejo de abreviaturas iguales
            const [existings] = await pool.query(`SELECT * FROM escuelas WHERE abreviatura = ?`, [abreviatura])
            if (existings.length > 0){
                return res.status(400).json({ "Error": `La abreviatura de la escuela tiene que ser diferente a todas las demas` })}
                else{
            //Insercion de datos
            const [result] = await pool.query(`UPDATE escuelas SET 
            ciudad = IFNULL(?, ciudad), 
            area = IFNULL(?, area),
            nombre = IFNULL(?, nombre),
            abreviatura = IFNULL(?, abreviatura),
            descripcion = IFNULL(?, descripcion),
            direccion = IFNULL(?, direccion),
            urlmapa = IFNULL(?, urlmapa),
            urlweb = IFNULL(?, urlweb),
            contacto = IFNULL(?, contacto),
            mision = IFNULL(?, mision),
            vision = IFNULL(?, vision),
            objetivos = IFNULL(?, objetivos),
            bolsatrabajo = IFNULL(?, bolsatrabajo),
            urlbotr = IFNULL(?, urlbotr),
            servicios = IFNULL(?, servicios)
            WHERE idescuela = ?`,
            [ ciudad, area, nombre, abreviatura, descripcion, direccion, urlmapa, urlweb, contacto, mision, vision,
            objetivos, bolsatrabajo, urlbotr, servicios, idescuela])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la escuela.` })
        }
                }
        }
        }

        
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}

export const eliminarEscuela = async (req, res) => {
    try {
        const { idescuela } = req.body
        const [result] = await pool.query(`DELETE FROM escuelas WHERE idescuela = ?`, [idescuela])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Escuela eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la escuela con id: ${idescuela}` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}