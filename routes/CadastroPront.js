const express = require('express');
const router = express.Router();
const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const controllerQuest = require('../controllers/Cadastro-controller');

router.get('/all', login.opcional, controllerQuest.getAgendamentos);

router.get('/allFormatado', login.opcional, controllerQuest.getAgendamentosFormatado);

router.get('/prontuarios', login.opcional, controllerQuest.getDadosPront);

router.get('/prontuarios/:id_pront', login.opcional, controllerQuest.getDadosProntId);

router.post('/prontuarios/paciente', login.opcional, controllerQuest.getAllDadosProntPaciente);

router.post('/paciente', login.opcional, controllerQuest.getAllDadosPaciente);

router.post('/cadastroProntuario', controllerQuest.postCadastroPront);

router.post('/agendamentos', controllerQuest.postCadastroAgendamento);

router.patch('/atualiza/:id_quest', login.obrigatorio, controllerQuest.updateQuest);

router.delete('/delete_agendamento/:id_agendamento', login.obrigatorio, controllerQuest.deleteAgendamento)

router.patch('/atualizaProntuario/:id_pront', login.obrigatorio, controllerQuest.patchAtualizaPront);

module.exports = router;