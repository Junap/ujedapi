import { pool } from '../db.js'

export const todasNoticias = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM noticias')
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

//Obtener una noticia por su ID
export const unaNoticia = async (req, res) => {
    try {
        const { idnoticia } = req.body
        const [result] = await pool.query('SELECT * FROM noticias WHERE idnoticia = ?', [idnoticia])
        res.json(result)
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

//Obtener una noticia por su titulo
export const unaNoticiaTitulo = async (req, res) => {
    try {
        const { titulo } = req.body
        const [result] = await pool.query('SELECT * FROM noticias WHERE titulo = ?', [titulo])
        if (result.length < 1 ) {
            return res.status(400).json({ "Error": `No existen noticias con ese titulo` })
        }
        else{
            res.json(result)
        }
    } catch (error) {
        res.send(500).json({ "Error": ` ${error}` })
    }

}

//Insertar una Noticia
export const insertarNoticia = async (req, res) => {
    try {
        const { titulo, descorta, descripcion } = req.body
        //Manejo de noticias duplicadas
        const [existing] = await pool.query(`SELECT * FROM noticias WHERE titulo = ? OR descorta = ? OR descripcion = ?`, [titulo, descorta, descripcion])

        if (existing.length > 0) {
            return res.status(400).json({ "Error": `La Noticia que intentas insertar tiene contenido duplicado de otra noticia` })
        }
        //Insercion de datos
        const [result] = await pool.query(`INSERT INTO noticias (titulo, descorta, descripcion) VALUES (?, ?, ?)`,
            [titulo, descorta, descripcion])
        res.json({
            "Mensaje: ": `Se ha insertado ${result.affectedRows} noticia`,
            "idnuevo": result.insertId
        })
    } catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

//Actualizar una Noticia
//Nota: Si existe otra noticia con el mismo titulo que otra, se denegara la entrada ya que el campo es unico
//Nota 2: La fecha siempre se actualizara a la actual
export const actualizarNoticia = async (req, res) => {

    try {
        //Verificacion de noticia existente
        const { idnoticia, titulo, descorta, descripcion } = req.body
        const [existing] = await pool.query(`SELECT * FROM noticias WHERE idnoticia = ?`, [idnoticia])

        if (existing.length < 1) {
            return res.status(400).json({ "Error": `La Noticia no existe.` })
        }

        //Manejo de datos iguales
        const [existingn] = await pool.query(`SELECT * FROM noticias WHERE 
        idnoticia = ? 
        AND titulo = ? 
        AND descorta = ? 
        AND descripcion = ?`, [idnoticia, titulo, descorta, descripcion])

        if (existingn.length > 0) {
            return res.status(400).json({ "Error": `Los valores que se intentan actualizar son los mismos que los actuales` })
        }
        else {
            //Si el titulo de la actual noticia es el mismo, insertar sin problema
            const [existingt] = await pool.query(`SELECT * FROM noticias WHERE titulo = ? AND idnoticia = ?`, [titulo, idnoticia])
            if (existingt.length === 1){

                    //Insercion de datos
                const [result] = await pool.query(`UPDATE noticias SET 
                titulo = IFNULL(?, titulo), 
                descorta = IFNULL(?, descorta),
                descripcion = IFNULL(?, descripcion),
                fechapub = IFNULL(CURRENT_TIMESTAMP, fechapub)
                WHERE idnoticia = ?`,
            [titulo, descorta, descripcion, idnoticia])
            if (result.affectedRows > 0) {
                res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
            }
            else {
                res.json({ "Mensaje: ": ` No existe la noticia.` })
            }
            }else{
                //Manejo de titulos iguales
                const [existings] = await pool.query(`SELECT * FROM noticias WHERE titulo = ?`, [titulo])
                if (existings.length > 0){
                    return res.status(400).json({ "Error": `El titulo de la noticia tiene que ser diferente a todos los demas` })}
                    else{
                    //Insercion de datos
                const [result] = await pool.query(`UPDATE noticias SET 
                titulo = IFNULL(?, titulo), 
                descorta = IFNULL(?, descorta),
                descripcion = IFNULL(?, descripcion),
                fechapub = IFNULL(CURRENT_TIMESTAMP, fechapub)
                WHERE idnoticia = ?`,
            [titulo, descorta, descripcion, idnoticia])
            if (result.affectedRows > 0) {
                res.json({ "Mensaje: ": " Actualizacion realizada con Exito!" })
            }
            else {
                res.json({ "Mensaje: ": ` No existe la noticia.` })
            }
                    }
            }
            }
        
        }



     catch (error) {
        //Manejo de otros errores
        return res.status(500).json({ "Error": ` ${error}` })
    }

}

//Eliminar una noticia por ID
//Nota: se eliminaran tambien sus imagenes relacionadas
export const eliminarNoticia = async (req, res) => {
    try {
        const { idnoticia } = req.body
        let [result] = await pool.query(`DELETE FROM noticias WHERE idnoticia = ?`, [idnoticia])
        if (result.affectedRows > 0) {
            res.json({ "Mensaje: ": ` Noticia eliminada con Exito!` })
        }
        else {
            res.json({ "Mensaje: ": ` No existe la Noticia.` })
        }
    } catch (error) {
        res.status(500).json({ "Error": ` ${error}` })
    }

}