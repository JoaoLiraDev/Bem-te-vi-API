const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;

router.get('/materias', (req, res, next) => {
    mysql.getConnection((error, conn)=> {
        conn.query(
        'select * from materias order by materia asc',
        (error, resultado, field) => {
            conn.release();
            if(error){
                return res.status(500).send({
                    error: error,
                    response: null
                });
            };
            res.status(200).send({
                mensagem: "Matérias",
                Query_result: resultado
            });
        }
    );
});
});


module.exports = router;