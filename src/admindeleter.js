//Este archivo elimina los usuarios o administradores de la base de datos

import { pool } from './db.js'

import { Router } from 'express'

const router = Router();

//Nota: Confirmar si se desea eliminar el usuario desde el frontend
router.delete('/eliminaradmin', async (req, res) => {
    try {
    const { username } = req.body;
    const [quantity] = await pool.query(`SELECT * FROM admins`);
    if (quantity.length === 1){

        return res.json({"Mensaje:":"No se pueden eliminar todos los usuarios!"})
    }
    const [existinguser] = await pool.query(`SELECT * FROM admins WHERE username = ?`,
        [username]);
        if (existinguser.length === 0){
           
            return res.json({"Mensaje:":"Admin no existe!"})

        }
        else{
            try {
                //Si el usuario a eliminar es el actual, destruir la sesion
                if (req.session.user === username){
                    const [result] = await pool.query('DELETE FROM admins WHERE username = ?',[username])
                 if (result.affectedRows > 0){
                    req.session.destroy();
                     return res.status(200).json({Login:false, "Mensaje": `Se ha eliminado el admin ${username}` })}
                 else{
                     return res.status(404).json({ "Error": `No existe el administrador ${username}` })
                 }}
                 else{
                        const [result] = await pool.query('DELETE FROM admins WHERE username = ?',[username])
                     if (result.affectedRows > 0){
                         return res.status(200).json({ "Mensaje": `Se ha eliminado el admin ${username}` })
                     }else{
                         return res.status(404).json({ "Error": `No existe el administrador ${username}` })
                     }            
             } 
        }catch (error) {
            res.status(500).json({ "Error": ` ${error}` })
        }     
    } 
}catch (error) {
    return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
}
})

export default router;