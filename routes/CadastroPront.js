const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const controllerQuest = require('../controllers/Cadastro-controller');

router.get('/all', login.opcional, controllerQuest.getAllQuests);

router.get('/user', login.obrigatorio, controllerQuest.getUserQuests);

router.post('/cadastroProntuario', controllerQuest.postCadastroPront);

router.patch('/atualiza/:id_quest', login.obrigatorio, controllerQuest.updateQuest);

router.delete('/delete_quest/:id_quest', login.obrigatorio, controllerQuest.deleteQuest)

module.exports = router;