const express = require('express')
const {body, validationResult} = require('express-validator')
const router = express.Router()
const sql = require('../conection')



router.get('/conferencia',(req, res) => {
    sql.query(`SELECT * from conferencia`, (sqlErr, sqlRes) => {
        if(sqlErr){
            res.send({success:false, err: sqlErr.message})
            return
        }
        res.send(sqlRes)
    })
})

router.get('/taller',(req, res) => {
    sql.query(`SELECT * from taller`, (sqlErr, sqlRes) => {
        if(sqlErr){
            res.send({success:false, err: sqlErr.message})
            return
        }
        res.send(sqlRes)
    })
})

router.get('/usuario',(req, res) => {
    sql.query(`SELECT * from usuario`, (sqlErr, sqlRes) => {
        if(sqlErr){
            res.send({success:false, err: sqlErr.message})
            return
        }
        res.send(sqlRes)
    })
})
router.get('/tallerista',(req, res) => {
    sql.query(`SELECT * from usuario where tallerista = 1`, (sqlErr, sqlRes) => {
        if(sqlErr){
            res.send({success:false, err: sqlErr.message})
            return
        }
        res.send(sqlRes)
    })
})

router.post("/getusr",
[
    body('usuario').not().isEmpty().isString()
],
(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({success:false, err:errors})
        return
    }
    let body = req.body
    sql.query(`select * from usuario WHERE usuario=?`, 
    [body.usuario], (sqlErr, sqlRes) => {
    if(sqlErr){
        res.send({
            success: false,
            err: sqlErr
        })
        return
    }
    
    res.send({
        sqlRes
    })
})
}
)
module.exports = router