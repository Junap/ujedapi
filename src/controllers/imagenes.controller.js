import { pool } from '../db.js'
import { upload } from '../imagehandler.js'
import multer from 'multer'
import fs from 'fs'


export const subirFoto = async (req, res) => {
    //Al momento de configurar el formulario para subir imagenes poner el campo de archivo con el nombre 'foto'
    upload.single('foto')(req, res, async function (err) {
        //Si el error es especifico de Multer
        if (err instanceof multer.MulterError) {
            if (err == "MulterError: File too large") {
                //Si el error es que el archivo es demasiado grande, muestra el siguiente mensaje
                return res.status(500).json({ "Mensaje": `El archivo es demasiado grande, el limite en tamaño es: ${FILESIZE} mb` })
            }
            return res.status(500).json({ "Mensaje": `Ha ocurrido un error en Multer: ${err}` })
            //Si el error es de algun otro lugar
        } else if (err) {
            return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${err}` })
        }
        //Todo salio correctamente
        try {
            //Guardamos el valor del url de la imagen
            const urlimg = req.file.path
            //Insertamos el url en la tabla de imagenes
            const [si] = await pool.query(`INSERT INTO imagenes(url) VALUES (?)`, [urlimg])
            //Si todo sale bien, enviar un mensaje
            if (si.affectedRows > 0) {
                res.json({ 'Mensaje: ': `Se ha insertado correctamente la imagen con el id: ${si.insertId}` })
            }

        } catch (error) {
            return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
        }
    })
}


export const borrarFoto = async (req, res) => {

    try {
        //Se requiere solo el id de la imagen
        const { idimagen } = req.body
        let [urlimagen] = await pool.query(`SELECT url FROM imagenes WHERE idimagen = ?`, [idimagen])
        if (urlimagen.length < 1) {
            throw new Error("Esta imagen no existe en la base de datos")
        }
        urlimagen = urlimagen[0].url
        //Eliminar la imagen del servidor
        fs.unlink(urlimagen, async (err) => {
            if (err) {
                console.log('El archivo no existe')
                //Si por algun motivo la imagen no existe pero si su referencia, eliminarla
                const [result] = await pool.query(`DELETE FROM imagenes WHERE idimagen = ?`, [idimagen])
                if (result.affectedRows > 0) {
                    return res.status(200).json({ "Mensaje": `El archivo no existe, pero se ha eliminado la referencia a la imagen con exito!` })
                }
                //Si lo anterior no se cumple continuar correctamente
            } else {
                console.log('Archivo eliminado exitosamente');
                //Si se eliminó del servidor, eliminar la referencia de la base de datos
                const [result] = await pool.query(`DELETE FROM imagenes WHERE idimagen = ?`, [idimagen])

                if (result.affectedRows > 0) {

                    return res.status(200).json({ "Mensaje": `Se ha eliminado la imagen con exito!` })
                }
                else {
                    res.status(404).json({ "Mensaje": `La imagen no esta registrada` })
                }
            }
        })
    } catch (error) {

        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}


export const obtenerfotoporID = async (req, res) => {
    try {
        const { idimagen } = req.body
        const [result] = await pool.query(`SELECT url FROM imagenes WHERE idimagen = ?`, [idimagen])
        if( result.length < 1){
            return res.status(404).json({ "Mensaje": `No existe la imagen` })
        }
        else{
            res.json(result)
        }

    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}



export const obtenerfotoporURL = async (req, res) => {
    try {
        const { url } = req.body
        const [result] = await pool.query(`SELECT * FROM imagenes WHERE url = ?`, [url])
        if( result.length < 1){
            return res.status(404).json({ "Mensaje": `No existe la imagen` })
        }
        else{
            res.json(result)
        }

    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}


export const obtenertodasImagenes = async (req, res) => {
    try {
        const [result] = await pool.query(`SELECT * FROM imagenes`)
        res.json(result)


    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}