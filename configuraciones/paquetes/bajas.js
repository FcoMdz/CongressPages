const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const sql = require('../conection')


router.post('/conferencia',
[
    body('nombre').not().isEmpty().isString()
],
(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success: false, err: errors})
        return
    }
    let body = req.body
    sql.query(`DELETE FROM conferencia WHERE nombre=?`, 
        [body.nombre], (sqlErr, sqrRes) => {
        if(sqlErr){
            res.send({
                success: false,
                err: sqlErr
            })
            return
        }
        res.send({
            success: true
        })
    })
})

router.post('/taller',
[
    body('nombre').not().isEmpty().isString()
],
(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success: false, err: errors})
        return
    }
    let body = req.body
    sql.query(`DELETE FROM taller WHERE nombre=?`, 
        [body.nombre], (sqlErr, sqrRes) => {
        if(sqlErr){
            res.send({
                success: false,
                err: sqlErr
            })
            return
        }
        res.send({
            success: true
        })
    })
})
router.post('/alumno',
[
    body('usuario').not().isEmpty().isString()
],
(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success: false, err: errors})
        return
    }
    let body = req.body
    sql.query(`DELETE FROM usuario WHERE usuario=?`, 
        [body.usuario], (sqlErr, sqrRes) => {
        if(sqlErr){
            res.send({
                success: false,
                err: sqlErr
            })
            return
        }
        res.send({
            success: true
        })
    })
})

module.exports = router