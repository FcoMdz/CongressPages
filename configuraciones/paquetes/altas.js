const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const sql = require('../conection')
router.post("/alumno",
[
    body('usuario').not().isEmpty().isString(),
    body('nombre').not().isEmpty().isString(),
    body('contrasena').not().isEmpty().isString(),
    body('coordinador').not().isEmpty().isBoolean(),
    body('tallerista').not().isEmpty().isBoolean(),
    body('administrador').not().isEmpty().isBoolean(),
],
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success:false, err:errors})
        return
    }
    let body = req.body
    sql.query(`INSERT INTO usuario (usuario,nombre,contrasena,tallerista,coordinador,administrador) 
                VALUES (?,?,?,?,?,?)`, [body.usuario,body.nombre,body.contrasena,body.tallerista,body.coordinador,body.administrador],(sqlErr,sqlRes) => {
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


router.post("/insertTaller",
[
    body('nombre').not().isEmpty().isString(),
    body('descripcion').not().isEmpty().isString(),
    body('capacidad').not().isEmpty().isNumeric(),
],
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success:false, err:errors})
        return
    }
    let body = req.body
    sql.query(`INSERT INTO taller (nombre, descripcion, capacidad) 
                VALUES (?,?,?)`, [body.nombre,body.descripcion, body.capacidad],(sqlErr,sqlRes) => {
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
router.post("/conferencia",
[
    body('conferencista').not().isEmpty().isString(),
    body('nombreConferencia').not().isEmpty().isString(),
    body('descripcion').not().isEmpty().isString(),
    body('capacidad').not().isEmpty().isNumeric(),
],
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success:false, err:errors})
        return
    }
    let body = req.body
    sql.query(`INSERT INTO conferencia (nombre, conferencista, descripcion, capacidad) 
                VALUES (?,?,?,?)`, [body.nombreConferencia,body.conferencista,body.descripcion, body.capacidad],(sqlErr,sqlRes) => {
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

