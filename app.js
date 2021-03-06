const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const BodyParser = require('body-parser');
const rotaCadastro = require('./routes/Usuarios')
const rotaCadastroProntuario = require('./routes/CadastroPront');
const rotaMaterias = require('./routes/materias');


app.use(morgan('dev'));
app.use(cors());
app.use(BodyParser.urlencoded({urlencoded: false})); //apenas dados simples
app.use(BodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin,  X-Requested-With, Content-Type, Accept, Authorization');
    
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

app.use('/Usuarios', rotaCadastro);
app.use('/CreateProntuario', rotaCadastroProntuario);
app.use('/Materias', rotaMaterias);


app.use((req, res, next) => {
    const erro = new Error("Não encontrado")
    erro.status = 404;
    next(erro);
});

app.use((error,req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        err: {
            mensagem: error.mensagem
        }
    });
});

module.exports = app;