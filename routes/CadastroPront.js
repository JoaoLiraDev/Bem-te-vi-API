const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const controllerQuest = require('../controllers/Cadastro-controller');

router.get('/all', login.opcional, controllerQuest.getAgendamentos);

router.get('/allFormatado', login.opcional, controllerQuest.getAgendamentosFormatado);

router.post('/cadastroProntuario', controllerQuest.postCadastroPront);

router.post('/agendamentos', controllerQuest.postCadastroAgendamento);

router.patch('/atualiza/:id_quest', login.obrigatorio, controllerQuest.updateQuest);

router.delete('/delete_agendamento/:id_agendamento', login.obrigatorio, controllerQuest.deleteAgendamento)

module.exports = router;