const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const sql = require('../conection')

router.post("/usuario",
[
    body('usuarioAnt').not().isEmpty().isString(),
    body('usuario').not().isEmpty().isString(),
    body('nombre').not().isEmpty().isString(),
    body('contrasena').not().isEmpty().isString(),
    body('tallerista').not().isEmpty().isBoolean(),
    body('coordinador').not().isEmpty().isBoolean(),
    body('administrador').not().isEmpty().isBoolean(),
],
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success:false, err:errors})
        return
    }
    let body = req.body
    sql.query(`UPDATE usuario SET usuario=?,nombre=?,contrasena=?,tallerista=?,coordinador=?,administrador=? WHERE usuario=?`,
     [body.usuario,body.nombre,body.contrasena, body.tallerista,body.coordinador,body.administrador,body.usuarioAnt],(sqlErr,sqlRes) => {
        if(sqlErr){
            res.send({
                    success:false, 
                    err: sqlErr.message,
                    code: sqlErr.code
                })
            return
        }
        res.send({
            success:true
        })
    })
}
)


module.exports = router