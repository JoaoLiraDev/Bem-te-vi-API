const mysql = require('../config/db').pool;
const jwt = require('jsonwebtoken');
const login = require('../middleware/login');
const { inspect, format } = require('util');
const JSON5 = require('json5')

exports.getAgendamentos = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select title, DATE_FORMAT( startDate, "%Y-%m-%d %H:%m" ) AS startDate , DATE_FORMAT( endDate, "%Y-%m-%d %H:%m" ) AS endDate, ID_AGENDAMENTO as id, location from Agendamentos order by ID_AGENDAMENTO asc',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        mensagem: "Falha ao realizar agendamento"
                    });
                };
                
            
                res.status(200).send({
                    mensagem: "Agendamento realizado com sucesso",
                    Query_result: result
                });
            }
        );
    });
};

exports.getAgendamentosFormatado = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(
            'select title, DATE_FORMAT( startDate, "%d/%m/%Y - %H:%m" ) AS startDate , DATE_FORMAT( endDate, "%d/%m/%Y - %H:%m" ) AS endDate, ID_AGENDAMENTO as id, location from Agendamentos order by ID_AGENDAMENTO asc',
            (error, result, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        mensagem: "Falha ao realizar agendamento"
                    });
                };
                
            
                res.status(200).send({
                    mensagem: "Agendamento realizado com sucesso",
                    Query_result: result
                });
            }
        );
    });
};

exports.postCadastroPront = (req, res, next) => {
    console.log(req.usuario);
    const pront = {
        NOME_PACIENTE: req.body.NOME_PACIENTE,
        DT_NASC: req.body.DT_NASC,
        IDADE: req.body.IDADE,
        TRIMESTRE : req.body.TRIMESTRE,
        PERCEP_VISUAL_SENSORIAL: req.body.PERCEP_VISUAL_SENSORIAL,
        FORMAS_GEOMETRICAS: req.body.FORMAS_GEOMETRICAS, 
        CORES_PRIMARIAS: req.body.CORES_PRIMARIAS, 
        RELACAO_OBJ_FIGURAS: req.body.RELACAO_OBJ_FIGURAS,
        SEGURA_LAPIS: req.body.SEGURA_LAPIS,
        SEGURA_GIZ: req.body.SEGURA_GIZ,
        CONCENTRACAO: req.body.CONCENTRACAO,
        LENTIDAO: req.body.LENTIDAO, 
        CANSAR_FACIL: req.body.CANSAR_FACIL, 
        ORDENS: req.body.ORDENS,
        COMUNICACAO: req.body.COMUNICACAO,
        SENTIMENTOS: req.body.SENTIMENTOS,
        COERENCIA_ORDEM: req.body.COERENCIA_ORDEM,
        OBJ_FINALIDADE: req.body.OBJ_FINALIDADE,
        PREFERENCIA: req.body.PREFERENCIA,
        NUMEROS_1: req.body.NUMEROS_1,
        NUMEROS_2: req.body.NUMEROS_2,
        NUMEROS_3: req.body.NUMEROS_3,
        CONTAR_NUM_LETRAS: req.body.CONTAR_NUM_LETRAS,
        NUM_QUANT: req.body.NUM_QUANT,
        RELACIONA_CONJUNTOS: req.body.RELACIONA_CONJUNTOS,
        RELACIONA_SEQUENCIA: req.body.RELACIONA_SEQUENCIA,
        RECONHECER_NUM: req.body.RECONHECER_NUM,
        EXPRESSAO_ORAL_ESCRITA: req.body.EXPRESSAO_ORAL_ESCRITA,
        VOCABULARIO: req.body.VOCABULARIO,
        RELACAO_ESCRITA_FALA: req.body.RELACAO_ESCRITA_FALA,
        PRONUNCIA_PALAVRAS: req.body.PRONUNCIA_PALAVRAS,
        RECUSA_FALA: req.body.RECUSA_FALA,
        RECONHECER_FIGURA: req.body.RECONHECER_FIGURA,
        VERBALIZA: req.body.VERBALIZA,
        DIZ_NOME_PROP: req.body.DIZ_NOME_PROP,
        DIZ_NOME_PESSOA_CONHECIDAS: req.body.DIZ_NOME_PESSOA_CONHECIDAS,
        NOMEIA_DESENHO: req.body.NOMEIA_DESENHO,
        LIVROS_REVISTAS: req.body.LIVROS_REVISTAS,
        DIS_VOGAIS: req.body.DIS_VOGAIS,
        DIS_ALFABETO: req.body.DIS_ALFABETO,
        RESPONSAVEL: req.body.RESPONSAVEL,
        OBSERVACAO: req.body.OBSERVACAO
    };
    mysql.getConnection((error, conn) => {
        conn.query(
            `INSERT INTO Prontuario_psicopedagogia(
                NOME_PACIENTE,
                DT_NASC,
                IDADE,
                TRIMESTRE ,
                PERCEP_VISUAL_SENSORIAL,
                FORMAS_GEOMETRICAS, 
                CORES_PRIMARIAS, 
                RELACAO_OBJ_FIGURAS,
                SEGURA_LAPIS,
                SEGURA_GIZ,
                CONCENTRACAO,
                LENTIDAO, 
                CANSAR_FACIL, 
                ORDENS,
                COMUNICACAO,
                SENTIMENTOS,
                COERENCIA_ORDEM,
                OBJ_FINALIDADE,
                PREFERENCIA,
                NUMEROS_1,
                NUMEROS_2,
                NUMEROS_3,
                CONTAR_NUM_LETRAS,
                NUM_QUANT,
                RELACIONA_CONJUNTOS,
                RELACIONA_SEQUENCIA,
                RECONHECER_NUM,
                EXPRESSAO_ORAL_ESCRITA,
                VOCABULARIO,
                RELACAO_ESCRITA_FALA,
                PRONUNCIA_PALAVRAS,
                RECUSA_FALA,
                RECONHECER_FIGURA,
                VERBALIZA,
                DIZ_NOME_PROP,
                DIZ_NOME_PESSOA_CONHECIDAS,
                NOMEIA_DESENHO,
                LIVROS_REVISTAS,
                DIS_VOGAIS,
                DIS_ALFABETO,
                RESPONSAVEL,
                OBSERVACAO
            )VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
            [pront.NOME_PACIENTE,pront.DT_NASC,parseInt(pront.IDADE),pront.TRIMESTRE,pront.PERCEP_VISUAL_SENSORIAL,pront.FORMAS_GEOMETRICAS,pront.CORES_PRIMARIAS,pront.RELACAO_OBJ_FIGURAS,pront.SEGURA_LAPIS,pront.SEGURA_GIZ,pront.CONCENTRACAO,pront.LENTIDAO,pront.CANSAR_FACIL,pront.ORDENS,pront.COMUNICACAO,pront.SENTIMENTOS,pront.COERENCIA_ORDEM,pront.OBJ_FINALIDADE,pront.PREFERENCIA,pront.NUMEROS_1,pront.NUMEROS_2,pront.NUMEROS_3,pront.CONTAR_NUM_LETRAS,pront.NUM_QUANT,pront.RELACIONA_CONJUNTOS,pront.RELACIONA_SEQUENCIA,pront.RECONHECER_NUM,pront.EXPRESSAO_ORAL_ESCRITA,pront.VOCABULARIO,pront.RELACAO_ESCRITA_FALA,pront.PRONUNCIA_PALAVRAS,pront.RECUSA_FALA,pront.RECONHECER_FIGURA,pront.VERBALIZA,pront.DIZ_NOME_PROP,pront.DIZ_NOME_PESSOA_CONHECIDAS,pront.NOMEIA_DESENHO,pront.LIVROS_REVISTAS,pront.DIS_VOGAIS,pront.DIS_ALFABETO,pront.RESPONSAVEL,pront.OBSERVACAO],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Questão cadastrada com sucesso!",
                    id_prontuario: resultado.insertId,
                    ProntuarioCadastrado: pront
                });
            }
        );
    });

}

exports.updateQuest = (req, res, next) => {
    const quest = {
        ano: req.body.ano,
        trimestre: req.body.trimestre,
        materia: req.body.materia,
        autor: req.body.autor,
        conteudo: req.body.conteudo,
        descricao: req.body.descricao,

    };
    mysql.getConnection((error, conn) => {
        conn.query(`UPDATE questions SET SERIE = ?, TRIMESTRE = ?, DISCIPLINA = ?, AUTOR = ?, CONTEUDO = ?, DESCRICAO = ? where ID_QUEST = ?`,
            [quest.ano, quest.trimestre, quest.materia, quest.autor, quest.conteudo, quest.descricao, req.params.id_quest],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Questão atualizada com sucesso!",
                    QuestaoCadastrada: quest
                });
            }
        );
    });

}

exports.deleteAgendamento = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        conn.query(`delete from Agendamentos where ID_AGENDAMENTO = ?`,
            [req.params.id_agendamento],
            (error, result, field) => {
                conn.release();
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null,
                        mensagem: "Falha ao cancelar agendamento!"
                    });
                };

                res.status(200).send({
                    mensagem: "Agendamento cancelado com sucesso!"
                });
            }
        );
    });
};


exports.postCadastroAgendamento = (req, res, next) => {
    console.log(req.usuario);
    const Agendamento = {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        location: req.body.location
    };
    mysql.getConnection((error, conn) => {
        conn.query(
            'INSERT INTO Agendamentos(title,startDate,endDate,location)VALUES(?,?,?,?)',
            [Agendamento.title, Agendamento.startDate, Agendamento.endDate, Agendamento.location],
            (error, resultado, field) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                };

                res.status(201).send({
                    mensagem: "Agendamento realizado com sucesso!",
                    id_Agendamento: resultado.insertId,
                    Agendamento_Cadastrado: Agendamento
                });
            }
        );
    });

}