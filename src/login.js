import { Router } from 'express'
import bcrypt from 'bcrypt'
import { pool } from './db.js'

const router = Router()
const saltRounds = 10


router.get('/check',(req,res)=>{
    if( req.session.user ){
        return res.json({valid: true,username: req.session.user})
    }else{
        return res.json({valid:false})
    }
})

router.post('/registrar', async (req, res) => {
    try {
    const { username, password } = req.body;
    const [existinguser] = await pool.query(`SELECT * FROM admins WHERE username = ?`,
        [username]);
        if (existinguser.length > 0){

            return res.json({"Mensaje:":"Usuario ya existe!"})

        }

    //Esta variable encripta la contraseña para su almacenamiento en la base     
    const hashpass = bcrypt.hashSync(password, saltRounds);
    const [result] = await pool.query(`INSERT INTO admins (username, password) VALUES (?,?)`,
        [username, hashpass])
    if (result.affectedRows > 0) {

        res.json({"Mensaje:":"Usuario registrado con exito!"})
        
        //Espacio para ejecutar redireccionamiento

        req.session.regenerate(function (err) {
            if (err) next(err)
        
            // store user information in session, typically a user id
            req.session.user = username
        
            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
              if (err) return next(err)

              //redireccionar al homepage de admins 
              //res.redirect('/admin')
              //res.send('Hola admin')
            })
          })

    }
    else {
        res.json({Login:false})
    }
        
    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
    

})

router.post('/iniciar', async (req, res) => {
    try {
        const { username, password } = req.body;
        const [result] = await pool.query(`SELECT * FROM admins WHERE username = ?`, [username])
        if (result.length >= 1) {
            const [pass] = await pool.query(`SELECT password FROM admins WHERE username = ?`, [username])
            const compPass = bcrypt.compareSync(password, pass[0].password)
            if (compPass) {
                
                req.session.regenerate(function (err) {
                    if (err) next(err)
                    
                    // store user information in session, typically a user id
                    req.session.user = username
                    
                
                    // save the session before redirection to ensure page
                    // load does not happen before session is saved
                    req.session.save(function (err) {
                      if (err) return next(err)
                      //redireccionar al homepage de admins
                      res.json({Login:true, user: req.session.user})
                      //res.send('Hola admin')
                    })
                  })

            }
            else {
                res.json({ "Mensaje: ": "Credenciales incorrectas" })
            }
        }
        else {
            res.json({ "Mensaje: ": "No existe el usuario" })
        }

    } catch (error) {
        return res.status(500).json({ "Mensaje": `Ha ocurrido un error ${error}` })
    }
})


export default router