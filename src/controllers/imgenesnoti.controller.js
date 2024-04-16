//Controlador para las RELACIONES entre una o varias imagenes a una o varias Noticias
//Nota: Una Noticia solo puede tener UNA imagen principal y tantas secundarias como se quiera

import { pool } from '../db.js'

//Ruta para obtener todas las fotos que aparecen en cierta noticia
export const selectallfotosenNoticia = async (req, res) => {
    try {

        const { idnoticia } = req.body
        const [result] = await pool.query(`
        SELECT imagenes.idimagen, imagenes.url, imagenesnoti.principal
        FROM imagenes
        JOIN imagenesnoti ON imagenes.idimagen = imagenesnoti.idimagen
        JOIN noticias ON noticias.idnoticia = imagenesnoti.idnoticia
        WHERE noticias.idnoticia = ?`, [idnoticia])
        if(result.length < 1){
            return res.status(404).json({ "Mensaje": `No existen imagenes relacionadas a esta noticia` })
        }
        else{
            res.json(result)
        }
        

    } catch (error) {
        return res.status(500).json({ "Mensaje": "Ha ocurrido un error" })
    }

}

//Ruta para asignar una imagen determinada con una noticia determinada
export const asignacionPrincipal = async (req, res) => {
    try {
        // Nota: El valor de "principal" tiene que ser true o false
        const { idimagen, idnoticia } = req.body;
        let { principal } = req.body;
        
        // Conversión del valor boolean a tinyint
        principal = principal ? 1 : 0;
        
        // Verificación de imagen principal
        const [princExist] = await pool.query('SELECT * FROM imagenesnoti WHERE idnoticia = ? AND principal = 1', [idnoticia]);
        
        // Si ya existe una imagen principal, y se intenta insertar otra, mostrar un mensaje de error
        if (princExist.length > 0 && principal === 1) {
            return res.status(500).json({ "Mensaje": "Esta noticia ya tiene una imagen principal" });
        }
        
        // Verificación de imagen existente relacionada a una noticia
        const [existing] = await pool.query('SELECT * FROM imagenesnoti WHERE idimagen = ? AND idnoticia = ? AND principal = ?', [idimagen, idnoticia, principal]);
        
        // Si ya existe la imagen para esta noticia con el mismo estado principal, mostrar un mensaje de error
        if (existing.length > 0) {
            return res.status(500).json({ "Mensaje": "Esta noticia ya contiene esta imagen" });
        }
        
        // Si no se cumplen las verificaciones anteriores, se hace la relación
        await pool.query('INSERT INTO imagenesnoti(idimagen, idnoticia, principal) VALUES (?, ?, ?)', [idimagen, idnoticia, principal]);
        
        return res.status(200).json({ "Mensaje": `Imagen enlazada con éxito!` });
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` });
    }
}

//Eliminar la relacion entre determinada noticia a UNA imagen (principal o no)
export const borrarfotodeNoticia = async (req, res) => {
    try {
        const { idnoticia } = req.body
        let { principal } = req.body
        
        principal = principal ? 1 : 0;
       
        const [result] = await pool.query(`DELETE FROM imagenesnoti WHERE idnoticia = ? AND principal = ?`, [idnoticia, principal])
        if(result.affectedRows < 1 ){
            return res.status(404).json({ "Mensaje": `No existe esta relacion` })
        }
        else{
            return res.status(200).json({ "Mensaje": `Relacion eliminada!` })
        }
        
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}

//Eliminar la relacion entre determinada noticia a TODAS sus imagenes 
export const borrarfotosdeNoticia = async (req, res) => {
    try {
        const { idnoticia } = req.body
       
        const [result] = await pool.query(`DELETE FROM imagenesnoti WHERE idnoticia = ?`, [idnoticia])
        if(result.affectedRows < 1 ){
            return res.status(404).json({ "Mensaje": `No existe(n) esta(s) relacion(es)` })
        }
        else{
            return res.status(200).json({ "Mensaje": `Relacion(es) eliminada(s)!` })
        }
        
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
}

//Eliminar la relacion entre determinada imagen y las noticias donde aparezca
export const borrarNoticiasdeIMAGEN = async (req, res) => {
    try {
        const { idimagen } = req.body
        const [result] = await pool.query(`DELETE FROM imagenesnoti WHERE idimagen = ?`, [idimagen])
        if(result.affectedRows < 1 ){
            return res.status(404).json({ "Mensaje": `No existen relaciones` })
        }
        else{
            return res.status(200).json({ "Mensaje": `Eliminadas ${result.affectedRows} relaciones de la imagen ${idimagen}` })
        }
        
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }




}

//Eliminar la relacion entre determinada imagen y determinada Noticia
export const borrarNoticiadeIMAGEN = async (req, res) => {
    try {
        const { idimagen, idnoticia } = req.body
        const [result] = await pool.query(`DELETE FROM imagenesnoti WHERE idimagen = ? AND idnoticia = ?`, [idimagen, idnoticia])
        if(result.affectedRows < 1 ){
            return res.status(404).json({ "Mensaje": `No existen relaciones` })
        }
        else{
            return res.status(200).json({ "Mensaje": `Eliminada la relacion entre la noticia: ${idnoticia} y la imagen: ${idimagen}` })
        }
        
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }

}


