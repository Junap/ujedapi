//Controlador para las RELACIONES entre carreras y escuelas
//Nota: una escuela puede tener carreras siempre y cuando sean diferentes entre si
//

import { pool } from '../db.js'

//Ruta para obtener todas las carreras que aparecen en cierta escuela
export const selectallcarrerasenEscuela = async (req, res) => {
    try {

        const { idescuela } = req.body
        const [result] = await pool.query(`
        SELECT carreras.idcarrera, carreras.nombre, escuelas.ciudad, escuelas.area
        FROM carreras
        JOIN carreraesc ON carreraesc.idcarrera = carreras.idcarrera
        JOIN escuelas ON escuelas.idescuela = carreraesc.idescuela
        WHERE escuelas.idescuela = ?`, [idescuela])
        if(result.length < 1){
            return res.status(404).json({ "Mensaje": `No existen carreras relacionadas a esta escuela` })
        }
        else{
            res.json(result)
        }
        

    } catch (error) {
        return res.status(500).json({ "Mensaje" : `Ha ocurrido un error ${error}` })
    }

}

//Ruta para asignar una imagen determinada con una noticia determinada
export const asignacionPrincipal = async (req, res) => {
    try {

        const { idcarrera, idescuela } = req.body;
        
        // Verificación de relacion existente
        const [existing] = await pool.query('SELECT * FROM carreraesc WHERE idcarrera = ? AND idescuela = ?', [idcarrera, idescuela]);
        if (existing.length > 0){
            return res.status(400).json({ "Mensaje": `Esta relacion ya existe` });
        }
        //else{
        // Verificacion de carrera relacionada
        //    const [existingc] = await pool.query('SELECT * FROM carreraesc WHERE idcarrera = ?', [idcarrera]);
        //    if (existingc.length > 0){
        //    return res.status(400).json({ "Mensaje": `Esta carrera ya existe en una escuela` });
        //}
        else{
            const [result] = await pool.query('INSERT INTO carreraesc(idcarrera, idescuela) VALUES (? , ?)', [idcarrera, idescuela]);

            if (result.affectedRows > 0){
                return res.status(200).json({ "Mensaje": `Relacion Exitosa!` })
            }
        }
            
        }
     catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` });
    }
}

//Eliminar la relacion entre una carrera y una escuela
export const BorrarCarreraDeEscuela = async (req, res) => {
    try {
        const { idcarrera, idescuela } = req.body
       
        const [result] = await pool.query(`DELETE FROM carreraesc WHERE idcarrera = ? AND idescuela = ?`, [idcarrera, idescuela])
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

//Eliminar la relacion entre determinada escuela a TODAS sus carreras 
export const BorrarCarrerasDeEscuela = async (req, res) => {
    try {
        const { idescuela } = req.body
       
        const [result] = await pool.query(`DELETE FROM carreraesc WHERE idescuela = ?`, [idescuela])
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

//Eliminar carrera de escuelas
export const BorrarCarreraDeEscuelas = async (req, res) => {
    try {
        const { idcarrera } = req.body
       
        const [result] = await pool.query(`DELETE FROM carreraesc WHERE idcarrera = ?`, [idcarrera])
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