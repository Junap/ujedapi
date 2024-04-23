import { pool } from '../db.js'
import { fileupload, imgupload } from '../pdfhandler.js'
import { FILESIZE, IMGSIZE } from '../config.js'
import multer from 'multer'
import fs from 'fs'


export const subirPublicacion = async (req, res) => {
    //Al momento de configurar el formulario para subir archivos poner el campo de archivo con el nombre 'file'
    fileupload.single('file')(req, res, async function (err) {
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
            const { nombre, categoria, fecha } = req.body
            let urlpdf = req.file.path
            //Recortar el valor para su almacenamiento
            urlpdf = urlpdf.substring(25)
            //Insertar la referencia en la base de datos
            const [existing] = await pool.query(`SELECT * FROM publicaciones WHERE nombre = ? AND categoria = ? AND fecha = ?`, [nombre, categoria, fecha])
            if (existing.length > 0) {
                //Si ya existe, eliminar el archivo recien subido
                fs.unlink(req.file.path, async (err) => {
                    if(err){
                        return res.status(500).json({ 'Mensaje': `Error eliminando el archivo sin enlace` })
                    }
                    else{console.log('Eliminado el archivo sin enlace')}
                    return res.status(500).json({ 'Mensaje': `Ya existe esta publicacion!` })
                })
                
            }
            else {
                const [si] = await pool.query(`INSERT INTO publicaciones(nombre, categoria, urlpdf, fecha) VALUES (?, ?, ?, ?)`, [nombre, categoria, urlpdf, fecha])
                if (si.affectedRows > 0) {
                    res.status(500).json({ 'Mensaje': `Se ha subido correctamente el archivo con el id: ${si.insertId}` })
                }
            }

        } catch (error) {
            return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
        }
    })
}

export const asignarPortada = async (req, res) => {
    try {
        //Al momento de configurar el formulario para subir archivos poner el campo de archivo con el nombre 'publicacion'
        imgupload.single('portada')(req, res, async function (err) {
            const { idpublicacion } = req.body
            //Verificacion de existencia de publicacion
            const [exists] = await pool.query(`SELECT * FROM publicaciones WHERE idpublicacion = ?`, [idpublicacion])
            if (exists.length > 0) {
                //Verificacion de portada existente
                const [ptexists] = await pool.query(`SELECT (urlportada) FROM publicaciones WHERE idpublicacion = ?`, [idpublicacion])
                if (ptexists[0].urlportada != null) {
                    //Si ya existe, eliminar el archivo recien subido
                    fs.unlink(req.file.path, async (err) => {
                        if(err){
                            return res.status(500).json({ 'Mensaje': `Error eliminando la portada sin enlace` })
                        }
                        else{
                        console.log('Eliminada la portada sin enlace')}
                        return res.status(500).json({ 'Mensaje': `La publicacion ${idpublicacion} ya tiene portada` })
                    })
                }
                else {
                    //Si el error es especifico de Multer
                    if (err instanceof multer.MulterError) {
                        if (err == "MulterError: File too large") {
                            //Si el error es que el archivo es demasiado grande, muestra el siguiente mensaje
                            return res.status(500).json({ "Mensaje": `El archivo es demasiado grande, el limite en tamaño es: ${IMGSIZE} mb` })
                        }
                        return res.status(500).json({ "Mensaje": `Ha ocurrido un error en Multer: ${err}` })
                        //Si el error es de algun otro lugar
                    } else if (err) {
                        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${err}` })
                    }
                    //Todo salio correctamente
                    try {
                        //Recortar el valor para su almacenamiento
                        let urlportada = req.file.path
                        urlportada = urlportada.substring(25)
                        //Insertar la referencia en la base de datos
                        const [si] = await pool.query(`UPDATE publicaciones SET urlportada = IFNULL(?, urlportada) WHERE idpublicacion = ?`, [urlportada, idpublicacion])
                        if (si.affectedRows > 0) {
                            res.status(200).json({ 'Mensaje': `Se ha subido correctamente la portada de la publicacion: ${idpublicacion}` })
                        }
                        else {
                            res.status(400).json({ 'Mensaje': `No existe la publicacion` })
                        }
                    } catch (error) {
                        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
                    }
                }
    
            } else {
                return res.status(404).json({ 'Mensaje': `No existe la publicacion ${idpublicacion}` })
    
            }
    
    
        })

} catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }

    
}










export const borrarPublicacion = async (req, res) => {

    try {
        //Se requiere solo el id de la publicacion
        const { idpublicacion } = req.body
        const [result] = await pool.query(`SELECT * FROM publicaciones WHERE idpublicacion = ?`, [idpublicacion])

        if (result.length < 1) {
            throw new Error("Esta publicacion no existe en la base de datos")
        }
        const urlpdf = `src\\uploads\\publications\\` + result[0].urlpdf
        const urlimg = `src\\uploads\\publications\\` + result[0].urlportada
        //Eliminar el archivo del servidor
        fs.unlink(urlpdf, async (err) => {
            if (err) {
                console.log('El archivo no existe')
                //Si por algun motivo el archivo no existe pero si su referencia, eliminarla
                const [result] = await pool.query(`DELETE FROM publicaciones WHERE idpublicacion = ?`, [idpublicacion])
                if (result.affectedRows > 0) {
                    return res.status(200).json({ "Mensaje": `El archivo no existe, pero se ha eliminado la publicacion!` })
                }
                //Si lo anterior no se cumple continuar correctamente
            } else {
                console.log('Archivo eliminado')
                //Eliminar la publicacion
                const [result] = await pool.query(`DELETE FROM publicaciones WHERE idpublicacion = ?`, [idpublicacion])
                if (result.affectedRows > 0) {
                    console.log('Publicacion eliminada')
                    //Eliminar la imagen de la portada
                    fs.unlink(urlimg, async (err) => {
                        if (err) {
                            console.log('La publicacion no tenia portada')
                            return res.status(200).json({ "Mensaje": `Se ha eliminado la publicacion, pero esta no tenia portada` })
                        } else {
                            console.log('portada eliminada')
                            return res.status(200).json({ "Mensaje": `Se ha eliminado la publicacion!` })
                        }

                    })
                }

            }
        })
    } catch (error) {

        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}

//Obtener publicaciones por categoria
export const PublicacionesxCategoria = async (req, res) => {
    try {
        const { categoria } = req.body
        const [result] = await pool.query(`SELECT * FROM publicaciones WHERE categoria = ? ORDER BY idpublicacion DESC`, [categoria])
        if (result.length < 1) {
            return res.status(404).json({ "Mensaje": `No existen publicaciones en la categoria ${categoria}` })
        }
        else {
            res.json(result)
        }

    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}
